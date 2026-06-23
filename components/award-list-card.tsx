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
          accentBar: "bg-foreground",
          badgeText: "Major",
          icon: <Medal className="w-3 h-3 sm:w-4 sm:h-4" />,
          hasSparkle: true,
        }
      case "notable":
        return {
          accentBar: "bg-muted-foreground",
          badgeText: "Notable",
          icon: <Star className="w-3 h-3 sm:w-4 sm:h-4" />,
          hasSparkle: false,
        }
      default:
        return {
          accentBar: "bg-muted-foreground/60",
          badgeText: "Honorable",
          icon: <AwardIcon className="w-3 h-3 sm:w-4 sm:h-4" />,
          hasSparkle: false,
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
      className="mb-4 sm:mb-6"
    >
      <motion.div
        className="relative overflow-hidden rounded-sm bg-card border border-border hover:shadow-md transition-all duration-300 cursor-pointer group"
        layoutId={`card-container-${award.id}`}
        onClick={onToggle}
      >
        {/* Decorative top accent bar */}
        <div className={`h-0.5 sm:h-1 w-full ${config.accentBar}`} />
        
        {/* Main content */}
        <div className="p-3 sm:p-4 md:p-6">
          <div className="flex items-start gap-2 sm:gap-4">
            {/* Image container */}
            <div className="flex-shrink-0 relative">
              <div
                className={`h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 relative ${award.isIconRoundedFull ? 'rounded-full' : 'rounded-sm'}`}
              >
                {!imageError ? (
                  <Image
                    src={award.image || "/placeholder.svg"}
                    alt={award.name}
                    fill
                    sizes="(max-width: 640px) 40px, (max-width: 1024px) 56px, 80px"
                    quality={100}
                    className={`object-cover ${award.isIconRoundedFull ? 'rounded-full' : 'rounded-sm'}`}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-sm sm:text-lg font-semibold rounded-sm">
                    {award.name.charAt(0)}
                  </div>
                )}
              </div>
              
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
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 drop-shadow-sm" />
                </motion.div>
              )}
            </div>
            
            {/* Content section */}
            <div className="flex-1 min-w-0">
              {/* Header with badge */}
              <div className="flex items-start justify-between gap-1 sm:gap-2 mb-1 sm:mb-2">
                <div className="flex-1 min-w-0 pr-1">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground line-clamp-2 transition-colors duration-300">
                    {award.name}
                  </h3>
                </div>
                
                <div className="flex-shrink-0 flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-sm bg-muted text-muted-foreground text-xs font-medium whitespace-nowrap">
                  {config.icon}
                  <span className="hidden xs:inline">{config.badgeText}</span>
                </div>
              </div>
              
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base line-clamp-2 mb-2 sm:mb-3 transition-colors duration-300">
                {award.description}
              </p>
              
              {/* Metadata row */}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>{new Date(award.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>{getTimeAgoText(daysAgo)}</span>
                  </div>
                </div>
                
                <motion.div 
                  animate={{ rotate: isExpanded ? 180 : 0 }} 
                  transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                  className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-sm bg-muted transition-all duration-300"
                >
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
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
              className="overflow-hidden border-t border-border"
            >
              <div className="p-3 sm:p-4 md:p-6 pt-3 bg-muted/40">
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed mb-3 sm:mb-4">
                  {award.detailedDescription || award.description}
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {award.link && (
                    <a 
                      href={award.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm text-xs font-medium bg-muted text-foreground/80 hover:bg-muted/80 border border-border transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Visit Website
                    </a>
                  )}
                  {award.submissionLink && (
                    <a 
                      href={award.submissionLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm text-xs font-medium bg-muted text-foreground/80 hover:bg-muted/80 border border-border transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
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