import type { Project } from "@/types/project"
import projectsData from "@/data/projects.json"

export function getAllProjects(): Project[] {
  return projectsData
}

export function getProjectById(id: string): Project | undefined {
  return projectsData.find((project) => project.id === id)
}
