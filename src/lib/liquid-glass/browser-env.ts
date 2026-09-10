import { installHtml2CanvasGuards } from "./snapshot";
import { LIQUID_GL_OPTIONS } from "./controller";
import type { LiquidGLOptions, LiquidGLRenderer, LiquidGlassEnv } from "./types";

// The real-browser implementation of LiquidGlassEnv. Loads html2canvas as a
// lazy chunk from this site (pinned in package.json, no CDN) and the vendored
// liquidGL script on demand, so pages pay for neither until the effect runs.

const LIQUID_GL_SRC = "/scripts/liquidGL.js";

type LiquidGLFactory = (options: LiquidGLOptions) => unknown;

declare global {
  interface Window {
    liquidGL?: LiquidGLFactory;
    __liquidGLRenderer__?: LiquidGLRenderer;
  }
}

const scriptPromises = new Map<string, Promise<void>>();
function loadScript(src: string): Promise<void> {
  let pending = scriptPromises.get(src);
  if (!pending) {
    pending = new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
      if (existing?.dataset.loaded === "true") return resolve();
      const script = existing ?? document.createElement("script");
      script.addEventListener("load", () => {
        script.dataset.loaded = "true";
        resolve();
      });
      script.addEventListener("error", () => reject(new Error(`failed to load ${src}`)));
      if (!existing) {
        script.src = src;
        script.async = true;
        document.head.appendChild(script);
      }
    });
    scriptPromises.set(src, pending);
  }
  return pending;
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function createBrowserEnv(): LiquidGlassEnv {
  return {
    async loadRenderer() {
      if (!supportsWebGL()) return undefined;
      const [{ default: html2canvas }] = await Promise.all([
        import("html2canvas-pro"),
        loadScript(LIQUID_GL_SRC),
      ]);
      // liquidGL looks for a global html2canvas; the guarded wrapper provides it.
      installHtml2CanvasGuards(html2canvas as never, {
        resolution: LIQUID_GL_OPTIONS.resolution,
        getRenderer: () => window.__liquidGLRenderer__,
      });
      return window.liquidGL;
    },
    getRenderer: () => window.__liquidGLRenderer__,
    storage: safeStorage(),
    requestIdle(cb, timeoutMs) {
      const ric = window.requestIdleCallback;
      if (ric) {
        const id = ric(cb, { timeout: timeoutMs });
        return () => window.cancelIdleCallback(id);
      }
      const id = window.setTimeout(cb, 0);
      return () => window.clearTimeout(id);
    },
    addWindowListener(type, cb, options) {
      const target: EventTarget = type === "visibilitychange" ? document : window;
      target.addEventListener(type, cb, options);
      return () => target.removeEventListener(type, cb, options);
    },
    isDocumentHidden: () => document.hidden,
    bodyScrollHeight: () => document.body.scrollHeight,
    querySelector: (selector) => document.querySelector<HTMLElement>(selector),
    setTimeout(cb, ms) {
      const id = window.setTimeout(cb, ms);
      return () => window.clearTimeout(id);
    },
  };
}

function safeStorage(): LiquidGlassEnv["storage"] {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
