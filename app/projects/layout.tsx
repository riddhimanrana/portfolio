import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects | Riddhiman Rana",
  description: "Explore my projects in web development and competitive programming.",
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
