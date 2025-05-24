import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Awards | Riddhiman Rana",
  description: "A showcase of awards, honors, and achievements throughout my academic journey.",
}

export default function AwardsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
