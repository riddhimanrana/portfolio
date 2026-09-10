import type {
  LiquidGLOptions,
  LiquidGLRenderer,
  LiquidGlassEnv,
  LiquidGlassState,
  LiquidGlassStatus,
} from "./types";

// Lifecycle of the liquid-glass navbar effect. One instance per page load.
//
//   idle ──init()──▶ loading ──texture uploaded──▶ ready ◀──▶ capturing
//     ▲                 │                             │
//     └── setEnabled(false) pauses the render loop ◀──┘
//
// The controller owns every decision the navbar used to make inline:
// when to start (after the hero entrance on the home page, otherwise when
// the browser is idle), how "ready" is determined (the renderer's texture
// exists, not a timer), what to do while a fresh snapshot is being taken
// (report `capturing`, so the CSS glass covers the gap instead of a blink),
// pausing while the tab is hidden, and recapturing after theme changes or a
// page-height change that happened during scrolling (which liquidGL drops).
// The UI subscribes and renders the state; it never touches the renderer.

export const STORAGE_KEY = "liquidgl-enabled";
export const HERO_MOTION_EVENT = "portfolio:hero-motion-complete";
const HERO_MOTION_FALLBACK_MS = 1800;
const IDLE_TIMEOUT_MS = 1200;
const THEME_RECAPTURE_DELAY_MS = 180;
const SCROLL_SETTLE_MS = 300;

export const LIQUID_GL_OPTIONS: LiquidGLOptions = {
  target: ".nav-glass-pane",
  snapshot: "body",
  resolution: 2,
  refraction: 0.026,
  bevelDepth: 0.119,
  bevelWidth: 0.057,
  frost: 1,
  magnify: 1.018,
  shadow: true,
  specular: true,
};

export interface LiquidGlassController {
  getState(): LiquidGlassState;
  subscribe(listener: () => void): () => void;
  /** Start loading and initialising. `waitForHero` defers until the hero entrance finishes. */
  init(opts: { waitForHero: boolean }): void;
  setEnabled(enabled: boolean): void;
  /** Re-snapshot after the page changed appearance (theme switch). */
  refresh(): void;
  /** Hide the canvas right before a full-page navigation to avoid a stale flash. */
  hide(): void;
  /** Tear down listeners (React unmount). The renderer itself lives for the page. */
  dispose(): void;
}

export function createLiquidGlass(env: LiquidGlassEnv): LiquidGlassController {
  const listeners = new Set<() => void>();
  const cleanups: Array<() => void> = [];
  let state: LiquidGlassState = {
    enabled: readEnabled(env.storage),
    status: "idle",
  };
  let initStarted = false;
  let disposed = false;
  let runLoopPatched = false;

  const emit = () => listeners.forEach((fn) => fn());
  const set = (patch: Partial<LiquidGlassState>) => {
    const next = { ...state, ...patch };
    if (next.enabled === state.enabled && next.status === state.status) return;
    state = next;
    emit();
  };
  const setStatus = (status: LiquidGlassStatus) => set({ status });

  // ---- render loop control -------------------------------------------------
  function pauseLoop(renderer: LiquidGLRenderer) {
    if (renderer._rafId) {
      cancelAnimationFrame(renderer._rafId);
      renderer._rafId = null;
    }
  }

  function resumeLoop(renderer: LiquidGLRenderer) {
    if (renderer._rafId || renderer.useExternalTicker) return;
    const loop = () => {
      renderer.render();
      renderer._rafId = requestAnimationFrame(loop);
    };
    renderer._rafId = requestAnimationFrame(loop);
  }

  function showCanvas(renderer: LiquidGLRenderer, visible: boolean) {
    renderer.canvas.style.opacity = visible ? "1" : "0";
    renderer.canvas.style.pointerEvents = "none";
  }

  // ---- renderer adoption ---------------------------------------------------
  /** Wrap the renderer once so every snapshot (ours or liquidGL's own) is reported. */
  function adopt(renderer: LiquidGLRenderer) {
    if (runLoopPatched) return;
    runLoopPatched = true;

    const original = renderer.captureSnapshot.bind(renderer);
    renderer.captureSnapshot = async () => {
      if (state.enabled && state.status === "ready") setStatus("capturing");
      try {
        return await original();
      } finally {
        if (state.enabled && state.status === "capturing") setStatus("ready");
      }
    };

    cleanups.push(
      env.addWindowListener("visibilitychange", () => {
        if (!state.enabled) return;
        if (env.isDocumentHidden()) pauseLoop(renderer);
        else resumeLoop(renderer);
      })
    );

    // liquidGL drops its own recapture while the page is scrolling and never
    // retries; check once scrolling settles.
    let settle: (() => void) | undefined;
    cleanups.push(
      env.addWindowListener(
        "scroll",
        () => {
          settle?.();
          settle = env.setTimeout(() => {
            if (!state.enabled || renderer._capturing || !Number.isFinite(renderer.scaleFactor)) return;
            const expected = Math.round(env.bodyScrollHeight() * renderer.scaleFactor);
            if (Math.abs(expected - renderer.textureHeight) > 2) void renderer.captureSnapshot();
          }, SCROLL_SETTLE_MS);
        },
        { passive: true }
      )
    );
  }

  /** Resolve once the first texture is uploaded, then report ready. */
  function awaitFirstTexture(renderer: LiquidGLRenderer) {
    const check = () => {
      if (disposed) return;
      if (renderer.texture) {
        adopt(renderer);
        if (state.enabled) {
          showCanvas(renderer, true);
          setStatus("ready");
        } else {
          pauseLoop(renderer);
          showCanvas(renderer, false);
          setStatus("idle");
        }
        return;
      }
      requestAnimationFrame(check);
    };
    requestAnimationFrame(check);
  }

  // ---- init ----------------------------------------------------------------
  async function start() {
    if (initStarted || disposed) return;
    initStarted = true;
    setStatus("loading");

    try {
      const liquidGL = await env.loadRenderer();
      if (disposed) return;
      if (!liquidGL) {
        setStatus("unsupported");
        return;
      }

      liquidGL(LIQUID_GL_OPTIONS);
      const renderer = env.getRenderer();
      if (!renderer) {
        // liquidGL found no WebGL and styled the pane itself; undo that so the
        // CSS glass (which is the fallback) is not tinted twice.
        const pane = env.querySelector(LIQUID_GL_OPTIONS.target);
        if (pane) pane.removeAttribute("style");
        setStatus("unsupported");
        return;
      }
      awaitFirstTexture(renderer);
    } catch (error) {
      console.error("liquid glass: initialisation failed", error);
      setStatus("unsupported");
    }
  }

  function init({ waitForHero }: { waitForHero: boolean }) {
    if (initStarted || !state.enabled) return;
    const kick = () => cleanups.push(env.requestIdle(() => void start(), IDLE_TIMEOUT_MS));
    if (!waitForHero) {
      kick();
      return;
    }
    let done = false;
    const once = () => {
      if (done) return;
      done = true;
      kick();
    };
    cleanups.push(env.addWindowListener(HERO_MOTION_EVENT, once, { once: true }));
    cleanups.push(env.setTimeout(once, HERO_MOTION_FALLBACK_MS));
  }

  // ---- public controls -----------------------------------------------------
  function setEnabled(enabled: boolean) {
    if (enabled === state.enabled) return;
    env.storage?.setItem(STORAGE_KEY, String(enabled));
    const renderer = env.getRenderer();

    if (!enabled) {
      set({ enabled, status: "idle" });
      if (renderer) {
        pauseLoop(renderer);
        showCanvas(renderer, false);
      }
      return;
    }

    if (!renderer) {
      set({ enabled, status: initStarted ? state.status : "idle" });
      if (!initStarted) init({ waitForHero: false });
      return;
    }

    set({ enabled, status: "capturing" });
    resumeLoop(renderer);
    showCanvas(renderer, true);
    // The page may have changed while the effect was off.
    void renderer.captureSnapshot().finally(() => {
      if (state.enabled && state.status === "capturing") setStatus("ready");
    });
  }

  function refresh() {
    const renderer = env.getRenderer();
    if (!renderer || !state.enabled || state.status !== "ready") return;
    cleanups.push(
      env.setTimeout(() => {
        void renderer.captureSnapshot();
        renderer.render();
      }, THEME_RECAPTURE_DELAY_MS)
    );
  }

  function hide() {
    const renderer = env.getRenderer();
    if (!renderer || !state.enabled) return;
    showCanvas(renderer, false);
    setStatus("loading");
  }

  function dispose() {
    disposed = true;
    cleanups.splice(0).forEach((fn) => fn());
    listeners.clear();
  }

  return {
    getState: () => state,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    init,
    setEnabled,
    refresh,
    hide,
    dispose,
  };
}

function readEnabled(storage: LiquidGlassEnv["storage"]): boolean {
  const saved = storage?.getItem(STORAGE_KEY);
  return saved === null || saved === undefined ? true : saved === "true";
}
