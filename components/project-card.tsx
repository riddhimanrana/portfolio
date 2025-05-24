"use client"

import type { Project } from "@/types/project"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { SiGithub } from "react-icons/si"

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4 flex flex-wrap gap-2">
        {project.tags.slice(0, 2).map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 2 && (
          <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-full">
            +{project.tags.length - 2}
          </span>
        )}
        <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-full ml-auto">
          {project.year}
        </span>
      </div>
      {/* <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg?height=400&width=600"}
          alt={project.title}
          fill
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=400&width=600"
          }}
        />
      </div> */}
      <div className="px-5 pb-6">
        <div className="flex items-center gap-2.5 mb-2">
          {project.logo && (
            <div className="relative w-7 h-7 flex-shrink-0">
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
          <h3 className="text-xl font-bold">{project.title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{project.tagline}</p>
        <div className="flex space-x-4">
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <SiGithub className="h-5 w-5" />
            </a>
          )}
          {project.projectLink && (
            <a
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
