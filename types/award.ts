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
}
