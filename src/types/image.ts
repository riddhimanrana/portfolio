/** An image already resized and converted at build time; islands render it as-is. */
export interface OptimizedImage {
  src: string;
  /** 1x/2x candidates; empty for SVG. */
  srcSet: string;
  width: number;
  height: number;
}
