"use client"

import type { Project } from "@/types/project"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"
import { GitHubIcon } from "@/components/brand-icons"

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Close modal on escape key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)

    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-sm border border-border bg-card text-card-foreground shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex-1 min-h-0 overflow-y-auto">
                {project.image && (
                  <div className="relative bg-muted p-3">
                    <div className="group relative h-64 overflow-hidden rounded-sm sm:h-72 md:h-80">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="cursor-pointer rounded-sm object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
                      />
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="rounded-sm bg-muted px-3 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="ml-auto hidden rounded-sm bg-muted px-3 py-1 text-xs text-muted-foreground sm:inline">
                      {project.year}
                    </span>
                  </div>

                  <div className="mb-2 flex items-center gap-3">
                    {project.logo && (
                      <div className="relative h-10 w-10 flex-shrink-0">
                        <Image
                          src={project.logo}
                          alt={`${project.title} logo`}
                          fill
                          sizes="(max-width: 640px) 40px, 48px *(max-width: 1024px) 56px, 80px"
                          className="rounded-sm object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none"
                          }}
                        />
                      </div>
                    )}
                    <h2 className="text-2xl font-bold">{project.title}</h2>
                  </div>
                  <p className="mb-6 text-sm font-medium text-muted-foreground sm:text-base">
                    {project.tagline}
                  </p>

                  <div className="prose dark:prose-invert max-w-none">
                    {project.description.split("\n\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-border p-4">
                {project.repoLink && (
                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-sm bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-muted"
                  >
                    <GitHubIcon className="mr-2 size-4" />
                    View Code
                  </a>
                )}
                {project.projectLink && (
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Project
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
