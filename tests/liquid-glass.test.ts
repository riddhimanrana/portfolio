import { beforeEach, describe, expect, it, vi } from "vitest";

import { createLiquidGlass, HERO_MOTION_EVENT, STORAGE_KEY } from "../src/lib/liquid-glass/controller";
import { snapshotScale } from "../src/lib/liquid-glass/snapshot";
import type { LiquidGLOptions, LiquidGLRenderer, LiquidGlassEnv } from "../src/lib/liquid-glass/types";

describe("snapshotScale", () => {
  it("uses the configured resolution when the texture fits", () => {
    expect(snapshotScale(1280, 3000, 2, 16384)).toBe(2);
  });

  it("clamps so the tallest dimension fits the GPU limit", () => {
    // 16384 / 15127 = 1.083, which is what liquidGL itself computes.
    expect(snapshotScale(1270, 15127, 2, 16384)).toBeCloseTo(1.083, 3);
  });

  it("applies the iOS 4096px clamp", () => {
    expect(snapshotScale(390, 10000, 2, 16384, true)).toBeCloseTo(4096 / 10000, 4);
  });

  it("never drops below 0.1", () => {
    expect(snapshotScale(100, 1_000_000, 2, 8192)).toBe(0.1);
  });
});

// ---- controller ------------------------------------------------------------

type Listener = () => void;

function fakeEnv(overrides: Partial<LiquidGlassEnv> = {}) {
  const listeners = new Map<string, Set<Listener>>();
  const timers: Array<{ cb: () => void; ms: number }> = [];
  const idle: Array<() => void> = [];
  const store = new Map<string, string>();
  let renderer: LiquidGLRenderer | undefined;

  const env: LiquidGlassEnv = {
    loadRenderer: vi.fn(async () => (options: LiquidGLOptions) => {
      renderer = makeRenderer();
      return options;
    }),
    getRenderer: () => renderer,
    storage: {
      getItem: (k) => store.get(k) ?? null,
      setItem: (k, v) => void store.set(k, v),
    },
    requestIdle: (cb) => {
      idle.push(cb);
      return () => {};
    },
    addWindowListener: (type, cb) => {
      listeners.set(type, (listeners.get(type) ?? new Set()).add(cb));
      return () => listeners.get(type)?.delete(cb);
    },
    isDocumentHidden: () => false,
    bodyScrollHeight: () => 5000,
    querySelector: () => null,
    setTimeout: (cb, ms) => {
      timers.push({ cb, ms });
      return () => {
        const i = timers.findIndex((t) => t.cb === cb);
        if (i >= 0) timers.splice(i, 1);
      };
    },
    ...overrides,
  };

  return {
    env,
    store,
    fire: (type: string) => listeners.get(type)?.forEach((fn) => fn()),
    runIdle: () => idle.splice(0).forEach((fn) => fn()),
    runTimers: () => timers.splice(0).forEach((t) => t.cb()),
    renderer: () => renderer,
    setRenderer: (r: LiquidGLRenderer | undefined) => (renderer = r),
  };
}

function makeRenderer(): LiquidGLRenderer {
  const canvas = { style: {} as CSSStyleDeclaration } as HTMLCanvasElement;
  const r: LiquidGLRenderer = {
    canvas,
    gl: {} as WebGLRenderingContext,
    texture: null,
    textureHeight: 10000,
    scaleFactor: 2,
    _rafId: 1,
    lenses: [],
    render: vi.fn(),
    captureSnapshot: vi.fn(async () => {
      r.textureHeight = 5000 * r.scaleFactor;
      return true;
    }),
  };
  return r;
}

async function flush() {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

beforeEach(() => {
  vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
    setTimeout(() => cb(0), 0);
    return 1;
  });
  vi.stubGlobal("cancelAnimationFrame", () => {});
});

describe("createLiquidGlass", () => {
  it("starts idle and enabled, honouring a stored preference", () => {
    const f = fakeEnv();
    f.store.set(STORAGE_KEY, "false");
    expect(createLiquidGlass(f.env).getState()).toEqual({ enabled: false, status: "idle" });
    f.store.delete(STORAGE_KEY);
    expect(createLiquidGlass(f.env).getState()).toEqual({ enabled: true, status: "idle" });
  });

  it("does not start while disabled", () => {
    const f = fakeEnv();
    f.store.set(STORAGE_KEY, "false");
    createLiquidGlass(f.env).init({ waitForHero: false });
    f.runIdle();
    expect(f.env.loadRenderer).not.toHaveBeenCalled();
  });

  it("loads, creates the renderer and reports ready once the texture exists", async () => {
    const f = fakeEnv();
    const glass = createLiquidGlass(f.env);
    const seen: string[] = [];
    glass.subscribe(() => seen.push(glass.getState().status));

    glass.init({ waitForHero: false });
    f.runIdle();
    await flush();
    expect(glass.getState().status).toBe("loading");

    f.renderer()!.texture = {} as WebGLTexture;
    await flush();
    await flush();
    expect(glass.getState().status).toBe("ready");
    expect(f.renderer()!.canvas.style.opacity).toBe("1");
    expect(seen).toEqual(["loading", "ready"]);
  });

  it("waits for the hero entrance on the home page, with a fallback timer", () => {
    const f = fakeEnv();
    const glass = createLiquidGlass(f.env);
    glass.init({ waitForHero: true });
    f.runIdle();
    expect(f.env.loadRenderer).not.toHaveBeenCalled();

    f.fire(HERO_MOTION_EVENT);
    f.runIdle();
    expect(f.env.loadRenderer).toHaveBeenCalledTimes(1);

    // The fallback timer must not start a second init.
    f.runTimers();
    f.runIdle();
    expect(f.env.loadRenderer).toHaveBeenCalledTimes(1);
  });

  it("reports unsupported when WebGL/scripts are unavailable", async () => {
    const f = fakeEnv({ loadRenderer: vi.fn(async () => undefined) });
    const glass = createLiquidGlass(f.env);
    glass.init({ waitForHero: false });
    f.runIdle();
    await flush();
    expect(glass.getState().status).toBe("unsupported");
  });

  it("reports capturing while any snapshot is in flight, then ready", async () => {
    const f = fakeEnv();
    const glass = createLiquidGlass(f.env);
    glass.init({ waitForHero: false });
    f.runIdle();
    await flush();
    f.renderer()!.texture = {} as WebGLTexture;
    await flush();
    await flush();

    const seen: string[] = [];
    glass.subscribe(() => seen.push(glass.getState().status));
    await f.renderer()!.captureSnapshot();
    expect(seen).toEqual(["capturing", "ready"]);
  });

  it("recaptures after scrolling only when the page height changed", async () => {
    const f = fakeEnv();
    const glass = createLiquidGlass(f.env);
    glass.init({ waitForHero: false });
    f.runIdle();
    await flush();
    const r = f.renderer()!;
    // Hold the original mock: the controller wraps captureSnapshot on adoption.
    const capture = r.captureSnapshot as ReturnType<typeof vi.fn>;
    r.texture = {} as WebGLTexture;
    await flush();
    await flush();

    const before = capture.mock.calls.length;
    r.textureHeight = 5000 * r.scaleFactor; // matches bodyScrollHeight()
    f.fire("scroll");
    f.runTimers();
    expect(capture.mock.calls.length).toBe(before);

    r.textureHeight = 4000; // stale
    f.fire("scroll");
    f.runTimers();
    expect(capture.mock.calls.length).toBe(before + 1);
  });

  it("toggling off pauses and hides; toggling on resumes and re-snapshots", async () => {
    const f = fakeEnv();
    const glass = createLiquidGlass(f.env);
    glass.init({ waitForHero: false });
    f.runIdle();
    await flush();
    const r = f.renderer()!;
    r.texture = {} as WebGLTexture;
    await flush();
    await flush();

    glass.setEnabled(false);
    expect(glass.getState()).toEqual({ enabled: false, status: "idle" });
    expect(r._rafId).toBeNull();
    expect(r.canvas.style.opacity).toBe("0");
    expect(f.store.get(STORAGE_KEY)).toBe("false");

    glass.setEnabled(true);
    expect(glass.getState().status).toBe("capturing");
    await flush();
    expect(glass.getState().status).toBe("ready");
    expect(r._rafId).not.toBeNull();
    expect(r.canvas.style.opacity).toBe("1");
  });

  it("pauses the loop while the tab is hidden and resumes on return", async () => {
    let hidden = false;
    const f = fakeEnv({ isDocumentHidden: () => hidden });
    const glass = createLiquidGlass(f.env);
    glass.init({ waitForHero: false });
    f.runIdle();
    await flush();
    const r = f.renderer()!;
    r.texture = {} as WebGLTexture;
    await flush();
    await flush();

    hidden = true;
    f.fire("visibilitychange");
    expect(r._rafId).toBeNull();
    hidden = false;
    f.fire("visibilitychange");
    expect(r._rafId).not.toBeNull();
  });
});
