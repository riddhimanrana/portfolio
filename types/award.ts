export type AwardDifficulty = "major" | "minor" | "honorable";

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
