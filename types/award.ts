export interface Award {
  id: string
  name: string
  description: string
  detailedDescription: string
  date: string
  image: string
  difficulty: "major" | "minor" | "honorable"
  link?: string
}
