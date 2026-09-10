// The slice of liquidGL's renderer this integration touches. liquidGL.js is a
// vendored, untyped script (public/scripts/liquidGL.js); everything else about
// it is opaque to us on purpose.
export interface LiquidGLRenderer {
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext | WebGL2RenderingContext;
  texture: WebGLTexture | null;
  textureHeight: number;
  scaleFactor: number;
  _capturing?: boolean;
  _rafId: number | null;
  useExternalTicker?: boolean;
  lenses: Array<{ el: HTMLElement; updateMetrics?: () => void }>;
  render: () => void;
  captureSnapshot: () => Promise<boolean>;
}

export interface LiquidGLOptions {
  target: string;
  snapshot: string;
  resolution: number;
  refraction: number;
  bevelDepth: number;
  bevelWidth: number;
  frost: number;
  magnify: number;
  shadow: boolean;
  specular: boolean;
}

export type LiquidGlassStatus =
  /** Nothing loaded yet (or the effect is switched off). */
  | "idle"
  /** Scripts loading, renderer being created, or the first snapshot in flight. */
  | "loading"
  /** Renderer live; a fresh snapshot is being taken (CSS glass covers the gap). */
  | "capturing"
  /** Renderer live and drawing. */
  | "ready"
  /** WebGL or the scripts are unavailable; the CSS glass is the final state. */
  | "unsupported";

export interface LiquidGlassState {
  enabled: boolean;
  status: LiquidGlassStatus;
}

/** Everything the controller needs from the outside world, so tests can fake it. */
export interface LiquidGlassEnv {
  loadRenderer: () => Promise<((options: LiquidGLOptions) => unknown) | undefined>;
  getRenderer: () => LiquidGLRenderer | undefined;
  storage: Pick<Storage, "getItem" | "setItem"> | null;
  requestIdle: (cb: () => void, timeoutMs: number) => () => void;
  addWindowListener: (type: string, cb: () => void, options?: AddEventListenerOptions) => () => void;
  isDocumentHidden: () => boolean;
  bodyScrollHeight: () => number;
  querySelector: (selector: string) => HTMLElement | null;
  setTimeout: (cb: () => void, ms: number) => () => void;
}
