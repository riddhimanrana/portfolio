"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, ChevronDown, ExternalLink, Trophy, Award as AwardIcon, Medal, Star, Sparkles, Clock, Eye } from "lucide-react"
import type { Award } from "@/types/award"
import { formatDate } from "@/lib/utils"

interface AwardCardProps {
  award: Award
  isExpanded: boolean
  onToggle: () => void
}

export function AwardCard({ award, isExpanded, onToggle }: AwardCardProps) {
  const [imageError, setImageError] = useState(false)

  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
      case "major":
        return {
          cardBg: "bg-blue-50/80 dark:bg-blue-900/20",
          borderColor: "border-blue-200/60 dark:border-blue-500/30",
          shadowColor: "shadow-blue-100/50 dark:shadow-blue-900/20",
          accentBar: "bg-blue-500",
          badgeBg: "bg-blue-500",
          badgeText: "Major",
          icon: <Medal className="w-4 h-4 text-white" />,
          hasSparkle: true,
          hoverShadow: "hover:shadow-blue-200/60 dark:hover:shadow-blue-800/40"
        }
      case "notable":
        return {
          cardBg: "bg-purple-50/80 dark:bg-purple-900/20",
          borderColor: "border-purple-200/60 dark:border-purple-500/30",
          shadowColor: "shadow-purple-100/50 dark:shadow-purple-900/20",
          accentBar: "bg-purple-500",
          badgeBg: "bg-purple-500",
          badgeText: "Notable",
          icon: <Star className="w-4 h-4 text-white" />,
          hasSparkle: false,
          hoverShadow: "hover:shadow-purple-200/60 dark:hover:shadow-purple-800/40"
        }
      default:
        return {
          cardBg: "bg-amber-50/80 dark:bg-amber-900/20",
          borderColor: "border-amber-200/60 dark:border-amber-500/30",
          shadowColor: "shadow-amber-100/50 dark:shadow-amber-900/20",
          accentBar: "bg-amber-500",
          badgeBg: "bg-amber-500",
          badgeText: "Honorable",
          icon: <AwardIcon className="w-4 h-4 text-white" />,
          hasSparkle: false,
          hoverShadow: "hover:shadow-amber-200/60 dark:hover:shadow-amber-800/40"
        }
    }
  }

  const config = getDifficultyConfig(award.difficulty)
  const timeAgo = new Date().getTime() - new Date(award.date + 'T00:00:00Z').getTime();
  const daysAgo = Math.floor(timeAgo / (1000 * 60 * 60 * 24))
  
  const getTimeAgoText = (days: number) => {
    if (days < 30) return `${days} days ago`
    if (days < 365) return `${Math.floor(days / 30)} months ago`
    return `${Math.floor(days / 365)} years ago`
  }

  return (
    <motion.div
      className="mb-6 sm:mb-8"
    >
      <motion.div
        className={`relative overflow-hidden rounded-2xl ${config.cardBg} backdrop-blur-sm border ${config.borderColor} shadow-lg ${config.shadowColor} ${config.hoverShadow} transition-all duration-300 cursor-pointer group`}
        layoutId={`card-container-${award.id}`}
        onClick={onToggle}
      >
        {/* Decorative top accent bar */}
        <div className={`h-1 w-full ${config.accentBar}`} />
        
        {/* Main content */}
        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-4">
            {/* Enhanced image container */}
            <div className="flex-shrink-0 relative">
              <div
                className={`h-12 w-12 sm:h-14 sm:w-14 transition-shadow duration-300 ${award.isIconRoundedFull ? 'rounded-full' : 'rounded-md'}`}
              >
                {!imageError ? (
                  <Image
                    src={award.image || "/placeholder.svg"}
                    alt={award.name}
                    fill
                    className={`object-cover ${award.isIconRoundedFull ? 'rounded-full' : 'rounded-md'}`}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-lg font-semibold">
                    {award.name.charAt(0)}
                  </div>
                )}
              </div>
              
              {/* Sparkle animation for major awards */}
              {config.hasSparkle && (
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ 
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-400 drop-shadow-sm" />
                </motion.div>
              )}
            </div>
            
            {/* Content section */}
            <div className="flex-1 min-w-0">
              {/* Header with badge */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {award.name}
                  </h3>
                </div>
                
                {/* Achievement badge */}
                <motion.div 
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.badgeBg} shadow-sm text-white text-xs font-medium whitespace-nowrap`}
                  whileHover={{ scale: 1.05 }}
                >
                  {config.icon}
                  <span className="hidden sm:inline">{config.badgeText}</span>
                </motion.div>
              </div>
              
              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base line-clamp-2 mb-3 transition-colors duration-300">
                {award.description}
              </p>
              
              {/* Metadata row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{formatDate(award.date)}</span>
                    <span className="sm:hidden">{new Date(award.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{getTimeAgoText(daysAgo)}</span>
                  </div>
                </div>
                
                {/* Expand indicator */}
                <motion.div 
                  animate={{ rotate: isExpanded ? 180 : 0 }} 
                  transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-sm group-hover:shadow-md transition-shadow duration-300"
                >
                  <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-t border-gray-200/60 dark:border-gray-700/60"
            >
              <div className="p-4 sm:p-6 pt-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  {award.detailedDescription || award.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {award.link && (
                    <a 
                      href={award.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View Details
                    </a>
                  )}
                  {award.submissionLink && (
                    <a 
                      href={award.submissionLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View Submission
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
