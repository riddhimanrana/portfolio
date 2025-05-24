"use client"

import type { Project } from "@/types/project"
import { motion, AnimatePresence } from "framer-motion"
import { X, ExternalLink } from "lucide-react"
import { SiGithub } from "react-icons/si"
import Image from "next/image"
import { useEffect } from "react"

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
            className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with image */}
            {project.image && (
            <div className="relative p-3 bg-gray-50 dark:bg-gray-950">
 
                <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden rounded-lg group">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="rounded-lg object-contain transition-transform duration-500 ease-in-out group-hover:scale-105 cursor-pointer"
                  />
                </div>
              
              
            </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                <span
                  className={`text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-full ml-auto hidden sm:inline ${project.image ? 'ml-auto' : 'mr-10'}`}
                >
                  {project.year}
                </span>
                <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 ml-10 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
              </div>

              <div className="flex items-center gap-3 mb-2">
                {project.logo && (
                  <div className="relative w-10 h-10 flex-shrink-0">
                    <Image
                      src={project.logo}
                      alt={`${project.title} logo`}
                      fill
                      className="object-contain rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                )}
                <h2 className="text-2xl font-bold">{project.title}</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">{project.tagline}</p>

              <div className="prose dark:prose-invert max-w-none">
                {project.description.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Footer with links */}
            <div className="border-t border-gray-200 dark:border-gray-800 p-4 flex justify-end space-x-4">
              {project.repoLink && (
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <SiGithub className="h-5 w-5 mr-2" />
                  View Code
                </a>
              )}
              {project.projectLink && (
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Visit Project
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}