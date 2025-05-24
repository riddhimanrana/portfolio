"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { X, ExternalLink, Medal, Star, AwardIcon, Eye } from "lucide-react"
import type { Award } from "@/types/award"
import { formatDate } from "@/lib/utils"

interface AwardDetailProps {
  award: Award | null
  onClose: () => void
}

export function AwardDetail({ award, onClose }: AwardDetailProps) {
  const [imageError, setImageError] = useState(false)
  
  if (!award) return null
  
  // Simplified difficulty configurations
  const difficultyConfig = {
    major: {
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-200/30 dark:bg-blue-900/30",
      borderColor: "border-blue-200 dark:border-blue-700/50",
      icon: <Medal className="w-4 h-4" />,
      label: "Major Achievement"
    },
    notable: {
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-200/30 dark:bg-purple-900/30",
      borderColor: "border-purple-200 dark:border-purple-700/50",
      icon: <Star className="w-4 h-4" />,
      label: "Notable Achievement"
    },
    honorable: {
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-200/30 dark:bg-amber-900/30",
      borderColor: "border-amber-200 dark:border-amber-700/50",
      icon: <AwardIcon className="w-4 h-4" />,
      label: "Honorable Mention"
    }
  }
  
  const config = difficultyConfig[award.difficulty]
  
  // Format date
  const formattedDate = new Date(award.date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`relative rounded-xl border ${config.borderColor} ${config.bgColor} shadow-md overflow-hidden`}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
        aria-label="Close"
      >
        <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      </button>
      
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Award Image */}
          <div className="flex-shrink-0">
            <div 
              className={`relative h-14 w-14 overflow-hidden  ${award.isIconRoundedFull ? 'rounded-full shadow-lg' : 'rounded-md'}`}
            >
              {!imageError ? (
                <Image
                  src={award.image || "/placeholder.svg"}
                  alt={award.name}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center ">
                  {config.icon}
                </div>
              )}
            </div>
          </div>
          
          {/* Award Content */}
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${config.color} ${config.bgColor} border ${config.borderColor}`}>
                {config.icon}
                <span>{config.label}</span>
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formattedDate}
              </span>
            </div>
            
            {/* Title and Description */}
            <h2 className="text-base font-bold mb-1 text-gray-900 dark:text-white">
              {award.name}
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              {award.description}
            </p>
            
            {/* Detailed Description - only if available */}
            {award.detailedDescription && (
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-3 max-h-24 overflow-y-auto">
                {award.detailedDescription}
              </div>
            )}
            
            {/* External Links */}
            <div className="flex flex-wrap gap-2 justify-start">
              {award.link && (
                <a
                  href={award.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium ${config.color} hover:underline`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3 h-3" />
                  Visit Website
                </a>
              )}
              {award.submissionLink && (
                <a
                  href={award.submissionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium ${config.color} hover:underline`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Eye className="w-3 h-3" />
                  View Submission
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}