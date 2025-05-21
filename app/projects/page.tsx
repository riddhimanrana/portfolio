"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Briefcase, Search, X, TagIcon } from "lucide-react"
import { ProjectCard } from "@/components/project-card"
import { ProjectModal } from "@/components/project-modal"
import { getAllProjects } from "@/utils/projects"
import type { Project } from "@/types/project"

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const projects = getAllProjects()

  // Get all unique tags from projects
  const allTags = Array.from(new Set(projects.flatMap((project) => project.tags))).sort()

  // Filter projects based on search query and selected tag
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTag = selectedTag ? project.tags.includes(selectedTag) : true

    return matchesSearch && matchesTag
  })

  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeProjectModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
        >
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-600/20 rounded-lg mr-4 shrink-0">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">My Projects</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Things I've built and worked on</p>
            </div>
          </div>
          
          {/* Search input */}
          <div className="relative w-full md:w-60">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-9 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Tags filter */}
        <div className="mb-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-1.5 pb-2 min-w-max">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                selectedTag === null
                  ? "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/70"
              }`}
            >
              All Projects
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all inline-flex items-center gap-1 ${
                  tag === selectedTag
                    ? "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/70"
                }`}
              >
                <TagIcon className="h-3 w-3" />{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        {filteredProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProjectCard project={project} onClick={() => openProjectModal(project)} />
                </motion.div>
              ))}
            </div>
            
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-10">
              Showing {filteredProjects.length} of {projects.length} projects
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
              <Search className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">No matching projects found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-5 max-w-md mx-auto text-sm">
              {searchQuery ? `No projects match "${searchQuery}"` : "No projects found with the selected filters."}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTag(null);
              }}
              className="px-5 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      {/* Project modal */}
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeProjectModal} />
    </div>
  )
}
