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
      className="group relative bg-white dark:bg-gray-900/50 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-200/60 dark:border-gray-800/60"
      onClick={onClick}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none" />
      
      <div className="relative p-4 flex flex-wrap gap-1.5">
        {project.tags.slice(0, 2).map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-md font-medium"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 2 && (
          <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500 px-2.5 py-1 rounded-md">
            +{project.tags.length - 2}
          </span>
        )}
        <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-md font-medium ml-auto">
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
      <div className="relative px-5 pb-6">
        <div className="flex items-center gap-2.5 mb-2">
          {project.logo && (
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src={project.logo}
                alt={`${project.title} logo`}
                width={32}
                height={32}
                quality={80}
                className="object-contain rounded-md"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          )}
          <h3 className="text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{project.title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm sm:text-base leading-relaxed">{project.tagline}</p>
        <div className="flex space-x-3 pt-3 border-t border-gray-100 dark:border-gray-800/50">
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200"
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
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200"
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
