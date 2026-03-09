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
      className="group relative bg-card rounded-sm overflow-hidden card-hover cursor-pointer border border-border"
      onClick={onClick}
    >
      <div className="relative p-4 flex flex-wrap gap-1.5">
        {project.tags.slice(0, 2).map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-sm font-medium"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 2 && (
          <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-sm">
            +{project.tags.length - 2}
          </span>
        )}
        <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-sm font-medium ml-auto">
          {project.year}
        </span>
      </div>

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
                className="object-contain rounded-sm"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          )}
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-200">{project.title}</h3>
        </div>
        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm sm:text-base leading-relaxed">{project.tagline}</p>
        <div className="flex space-x-3 pt-3 border-t border-border">
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
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
              className="p-2 rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
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
