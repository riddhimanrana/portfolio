"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, ChevronDown, ExternalLink } from "lucide-react"
import type { Award } from "@/types/award"
import { formatDate } from "@/lib/utils"

interface AwardCardProps {
  award: Award
  isExpanded: boolean
  onToggle: () => void
}

export function AwardCard({ award, isExpanded, onToggle }: AwardCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="mb-8">
      <motion.div
              className={`relative overflow-hidden rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 ${
                award.difficulty === "major" ? "glow" : ""
              } transition-colors duration-300`}
              layoutId={`card-container-${award.id}`}
              onClick={onToggle}
            >
        <div className="p-4 cursor-pointer">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-gray-100/50 dark:bg-gray-700/50 rounded-full overflow-hidden mr-4 relative transition-colors duration-300">
              {!imageError ? (
                <Image
                  src={award.image || "/images/placeholder.svg"}
                  alt={award.name}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs transition-colors duration-300">
                  {award.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">{award.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">{award.description}</p>
            </div>
            <div className="flex items-center ml-4 space-x-3">
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">{formatDate(award.date)}</span>
                <span className="sm:hidden">{new Date(award.date).toLocaleDateString()}</span>
              </div>
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors duration-300" />
              </motion.div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden border-t border-gray-200/50 dark:border-gray-700/50 transition-colors duration-300"
                        >
              <div className="p-4 pt-3">
                <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line transition-colors duration-300">{award.detailedDescription}</p>
                {award.link && (
                  <a
                    href={award.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View details <ExternalLink className="ml-1 h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
