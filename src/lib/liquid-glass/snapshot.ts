// html2canvas adapter for liquidGL snapshots.
//
// liquidGL calls the global `html2canvas` to rasterise <body> into the texture
// the shader refracts. Two things need patching around that call:
//
// 1. html2canvas cannot parse modern colour functions (oklch, color-mix, …),
//    which Tailwind v4 emits everywhere. The cloned document gets those
//    replaced with plain fallbacks, and the navbar itself is blanked out of
//    the snapshot (otherwise the glass would refract a picture of itself).
//    The clone is a live document: CSS transitions would animate towards the
//    blanking styles instead of applying them, and keyframe animations
//    restart from their first frame, so the hero copy would be captured at
//    opacity 0. Transitions are switched off and time-based animations are
//    jumped to their final frame before html2canvas reads any style.
// 2. liquidGL's constructor takes its first snapshot before it has assigned
//    the resolution it derives `scale` from, so that call asks for
//    scale = NaN and would store NaN as the renderer's scaleFactor. The
//    adapter reproduces the library's own formula for that capture and writes
//    the result back so the texture and the UV math agree from frame one.

const UNSUPPORTED_COLOR = /(oklch|oklab|lch|lab|color-mix)\(/i;

const COLOR_PROPS: ReadonlyArray<readonly [string, string]> = [
  ["color", "#e5e7eb"],
  ["background-color", "transparent"],
  ["border-color", "transparent"],
  ["border-top-color", "transparent"],
  ["border-right-color", "transparent"],
  ["border-bottom-color", "transparent"],
  ["border-left-color", "transparent"],
  ["outline-color", "transparent"],
  ["text-decoration-color", "transparent"],
  ["caret-color", "transparent"],
  ["column-rule-color", "transparent"],
  ["text-emphasis-color", "transparent"],
  ["fill", "currentColor"],
  ["stroke", "currentColor"],
  ["stop-color", "transparent"],
  ["flood-color", "transparent"],
  ["lighting-color", "transparent"],
];

const EFFECT_PROPS = ["background", "background-image", "box-shadow", "text-shadow", "filter"] as const;

const CLONE_PATCH_CSS = `
  *, *::before, *::after {
    --tw-ring-color: transparent !important;
    --tw-shadow-color: transparent !important;
    transition: none !important;
  }
  body::before,
  body::after,
  [data-liquid-ignore] {
    content: none !important;
    display: none !important;
  }
  [data-liquid-snapshot-shell] .nav-capsule {
    background: transparent !important;
    border-color: transparent !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
  [data-liquid-snapshot-shell] .nav-capsule::before,
  [data-liquid-snapshot-shell] .nav-glass-pane {
    content: none !important;
    display: none !important;
  }
  [data-liquid-snapshot-shell] .nav-capsule > :not(.nav-glass-pane) {
    opacity: 0 !important;
  }
  .diffusion-name,
  .luxury-gold-text,
  .luxury-silver-text,
  .luxury-bronze-text,
  .award-badge-major span,
  .award-badge-notable span,
  .award-badge-honorable span {
    color: #dbeafe !important;
    background: none !important;
    -webkit-background-clip: border-box !important;
    background-clip: border-box !important;
    filter: none !important;
  }
  :root:not(.dark) .diffusion-name,
  :root:not(.dark) .luxury-gold-text,
  :root:not(.dark) .luxury-silver-text,
  :root:not(.dark) .luxury-bronze-text,
  :root:not(.dark) .award-badge-major span,
  :root:not(.dark) .award-badge-notable span,
  :root:not(.dark) .award-badge-honorable span {
    color: #1d4ed8 !important;
  }
`;

/** Rewrites colours html2canvas cannot parse inside the cloned document. */
export function patchClonedDocument(clonedDoc: Document) {
  const clonedWin = clonedDoc.defaultView;
  if (!clonedWin) return;

  const style = clonedDoc.createElement("style");
  style.textContent = CLONE_PATCH_CSS;
  clonedDoc.head.appendChild(style);

  clonedDoc.querySelectorAll<HTMLElement>("*").forEach((node) => {
    const computed = clonedWin.getComputedStyle(node);
    freezeAnimation(node, computed);
    for (const [prop, fallback] of COLOR_PROPS) {
      const value = computed.getPropertyValue(prop);
      if (value && UNSUPPORTED_COLOR.test(value)) node.style.setProperty(prop, fallback, "important");
    }
    for (const prop of EFFECT_PROPS) {
      const value = computed.getPropertyValue(prop);
      if (!value || !UNSUPPORTED_COLOR.test(value)) continue;
      if (prop === "background" || prop === "background-image") {
        node.style.setProperty("background-image", "none", "important");
        node.style.setProperty("background-color", "transparent", "important");
      } else {
        node.style.setProperty(prop, "none", "important");
      }
    }
  });
}

/**
 * Jumps a time-based keyframe animation to its last frame so the clone shows
 * the element's resting state. Scroll-driven animations (animation-timeline)
 * are left alone: their progress comes from the timeline, not the clock.
 */
function freezeAnimation(node: HTMLElement, computed: CSSStyleDeclaration) {
  const name = computed.animationName;
  if (!name || name === "none") return;
  const timeline = computed.getPropertyValue("animation-timeline");
  if (timeline && timeline !== "auto") return;
  node.style.setProperty("animation-duration", "0s", "important");
  node.style.setProperty("animation-delay", "0s", "important");
  node.style.setProperty("animation-iteration-count", "1", "important");
  node.style.setProperty("animation-fill-mode", "forwards", "important");
}

/**
 * liquidGL's snapshot scale: the configured resolution, clamped so the
 * texture fits the GPU's limit, with the library's iOS 4096px clamp.
 */
export function snapshotScale(
  width: number,
  height: number,
  resolution: number,
  maxTextureSize: number,
  isMobileSafari = false
): number {
  let scale = Math.min(resolution, maxTextureSize / width, maxTextureSize / height);
  if (isMobileSafari) {
    const over = (Math.max(width, height) * scale) / 4096;
    if (over > 1) scale /= over;
  }
  return Math.max(0.1, scale);
}

let maxTextureSizeCache = 0;
function maxTextureSize(): number {
  if (maxTextureSizeCache) return maxTextureSizeCache;
  try {
    const gl =
      document.createElement("canvas").getContext("webgl2") ??
      document.createElement("canvas").getContext("webgl");
    maxTextureSizeCache = Number(gl?.getParameter(gl.MAX_TEXTURE_SIZE)) || 8192;
  } catch {
    maxTextureSizeCache = 8192;
  }
  return maxTextureSizeCache;
}

type Html2Canvas = (element: HTMLElement, options?: Record<string, unknown>) => Promise<HTMLCanvasElement>;

interface GuardOptions {
  resolution: number;
  getRenderer: () => { scaleFactor: number } | undefined;
}

/**
 * Wraps an html2canvas implementation with the clone patch and the
 * first-capture scale fix, and exposes it as the global liquidGL looks for.
 */
export function installHtml2CanvasGuards(html2canvas: Html2Canvas, { resolution, getRenderer }: GuardOptions) {
  const win = window as unknown as { html2canvas?: Html2Canvas; __portfolioHtml2CanvasGuarded?: boolean };
  if (win.__portfolioHtml2CanvasGuarded) return;

  win.html2canvas = (element, options = {}) => {
    const callerIgnore = options.ignoreElements as ((node: Element) => boolean) | undefined;
    const callerOnClone = options.onclone as ((doc: Document, el: HTMLElement) => void) | undefined;

    const scaleWasInvalid = !Number.isFinite(options.scale as number);
    const scale = scaleWasInvalid
      ? snapshotScale(
          (options.width as number) || element.scrollWidth,
          (options.height as number) || element.scrollHeight,
          resolution,
          maxTextureSize(),
          /iPad|iPhone|iPod/.test(navigator.userAgent)
        )
      : (options.scale as number);

    const capture = html2canvas(element, {
      ...options,
      scale,
      ignoreElements: (node: Element) => node.tagName === "CANVAS" || (callerIgnore?.(node) ?? false),
      onclone: (clonedDoc: Document, clonedElement: HTMLElement) => {
        callerOnClone?.(clonedDoc, clonedElement);
        patchClonedDocument(clonedDoc);
      },
    });

    if (!scaleWasInvalid) return capture;
    return capture.then((canvas) => {
      const renderer = getRenderer();
      if (renderer && !Number.isFinite(renderer.scaleFactor)) renderer.scaleFactor = scale;
      return canvas;
    });
  };

  win.__portfolioHtml2CanvasGuarded = true;
}
