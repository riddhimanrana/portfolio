import type { OptimizedImage } from "./image";

export interface Experience {
  title: string;
  subtext: string;
  logo: string;
  date: string;
  details: string;
  link?: string;
}

/** Experience with its logo resolved by the page (see src/lib/images.ts). */
export type ExperienceView = Omit<Experience, "logo"> & { logo: OptimizedImage };
