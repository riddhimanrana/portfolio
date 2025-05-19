"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, ExternalLink, X, Award as AwardIcon, Trophy } from "lucide-react"
import type { Award } from "@/types/award"
import { formatDate } from "@/lib/utils"

interface AwardDetailProps {
  award: Award | null
  onClose: () => void
}

export function AwardDetail({ award, onClose }: AwardDetailProps) {
  const [imageError, setImageError] = useState(false)
  
  if (!award) return null
  
  // Map difficulty to display values
  const difficultyConfig = {
    major: {
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/50",
      icon: <Trophy className="w-5 h-5 text-blue-400" />,
      label: "Major Achievement"
    },
    minor: {
      color: "text-amber-400",
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-500/50",
      icon: <Trophy className="w-5 h-5 text-amber-400" />,
      label: "Notable Achievement"
    },
    honorable: {
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/50",
      icon: <AwardIcon className="w-5 h-5 text-purple-400" />,
      label: "Honorable Mention"
    }
  }
  
  const config = difficultyConfig[award.difficulty]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`rounded-xl border ${config.borderColor} ${config.bgColor} backdrop-blur-md p-6 relative transition-colors duration-300`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700/50 transition-colors duration-300"
        aria-label="Close"
      >
        <X className="w-4 h-4 text-gray-900 dark:text-gray-300 transition-colors duration-300" />
      </button>
      
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="flex-shrink-0 h-24 w-24 md:h-32 md:w-32 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative transition-colors duration-300">
          {!imageError ? (
            <Image
              src={award.image || "/images/placeholder.svg"}
              alt={award.name}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition-colors duration-300">
              <AwardIcon className="w-12 h-12" />
            </div>
          )}
        </div>
        
        <div className="flex-grow">
          <div className="flex flex-wrap gap-2 mb-3">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.color}`}>
              {config.icon}
              {config.label}
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 transition-colors duration-300">
              <Calendar className="w-4 h-4" />
              {formatDate(award.date)}
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white transition-colors duration-300">{award.name}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">{award.description}</p>
          
          <div className="mt-4 mb-4 border-t border-gray-200/50 dark:border-gray-700/50 pt-4 transition-colors duration-300">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white transition-colors duration-300">Details</h3>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line transition-colors duration-300">{award.detailedDescription}</p>
          </div>
          
          {award.link && (
            <a
              href={award.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 mt-2 px-4 py-2 rounded-md ${config.bgColor} ${config.color} transition-colors hover:opacity-90`}
            >
              View Details <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}