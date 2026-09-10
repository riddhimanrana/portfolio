export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  image?: string
  logo?: string
  tags: string[]
  year: string
  projectLink?: string
  repoLink?: string
}

import type { OptimizedImage } from "./image";

/** Project with logo/screenshot resolved by the page (see src/lib/images.ts). */
export type ProjectView = Omit<Project, "image" | "logo"> & {
  logo: OptimizedImage;
  image?: OptimizedImage;
};
