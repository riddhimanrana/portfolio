import type React from "react"
import { cn } from "@/lib/utils"

interface SectionShellProps {
  children: React.ReactNode
  className?: string
  /** Tighter padding variant for dense sections */
  compact?: boolean
}

/**
 * Shared wrapper for every page section.
 * Provides consistent vertical rhythm and max-width constraint.
 * Use this instead of ad-hoc py-* on every section.
 */
export function SectionShell({ children, className, compact = false }: SectionShellProps) {
  return (
    <section className={cn(compact ? "py-8" : "py-12 sm:py-16", className)}>
      {children}
    </section>
  )
}
