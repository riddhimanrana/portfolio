import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

import type { OptimizedImage } from "@/types/image";

// Data files (awards.json, projects.json, experience.json) reference images by
// a root-relative path such as "/awards/usaco.png". Those files live under
// src/assets so Astro can resize and convert them at build time. This module
// is the one place that turns such a path into an optimized image, and it is
// only callable from .astro frontmatter (getImage needs the build context).
// Lazy on purpose: an eager glob makes Vite emit every original file into
// dist/_astro even when only the optimized derivatives are referenced.
const modules = import.meta.glob<ImageMetadata>(
  "/src/assets/**/*.{png,jpg,jpeg,webp,avif,gif,svg}",
  { import: "default" }
);

export async function asset(path: string): Promise<ImageMetadata> {
  const load = modules[`/src/assets${path}`];
  if (!load) throw new Error(`Unknown image asset "${path}" (expected src/assets${path})`);
  return load();
}

interface OptimizeOptions {
  /** Rendered CSS width; 1x and 2x candidates are generated. */
  width: number;
  format?: "webp" | "avif" | "png" | "jpeg";
  quality?: number;
}

export async function optimized(
  path: string,
  { width, format = "webp", quality }: OptimizeOptions
): Promise<OptimizedImage> {
  const source = await asset(path);
  if (source.format === "svg") {
    return { src: source.src, srcSet: "", width: source.width, height: source.height };
  }
  const image = await getImage({ src: source, width, densities: [1, 2], format, quality });
  return {
    src: image.src,
    srcSet: image.srcSet.attribute,
    width: Number(image.attributes.width),
    height: Number(image.attributes.height),
  };
}
