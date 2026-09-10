export type AwardDifficulty = "major" | "notable" | "honorable";

export interface Award {
  id: string
  name: string
  description: string
  detailedDescription: string
  date: string
  image: string
  difficulty: AwardDifficulty
  link?: string
  submissionLink?: string
  isIconRoundedFull?: boolean // Changed from iconRadius: number
}

import type { OptimizedImage } from "./image";

/** Award with its image resolved by the page (see src/lib/images.ts). */
export type AwardView = Omit<Award, "image"> & { image: OptimizedImage };
