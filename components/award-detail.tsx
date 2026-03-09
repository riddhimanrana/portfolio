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
  
  const difficultyConfig = {
    major: {
      icon: <Medal className="w-4 h-4" />,
      label: "Major Achievement"
    },
    notable: {
      icon: <Star className="w-4 h-4" />,
      label: "Notable Achievement"
    },
    honorable: {
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
      className="relative rounded-sm border border-border bg-card shadow-md overflow-hidden"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-sm bg-muted hover:bg-muted/80 border border-border"
        aria-label="Close"
      >
        <X className="w-4 h-4 text-muted-foreground" />
      </button>
      
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Award Image */}
          <div className="flex-shrink-0">
            <div 
              className={`relative h-14 w-14 overflow-hidden ${award.isIconRoundedFull ? 'rounded-full shadow-lg' : 'rounded-md'}`}
            >
              {!imageError ? (
                <Image
                  src={award.image || "/placeholder.svg"}
                  alt={award.name}
                  width={56}
                  height={56}
                  quality={80}
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
              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-sm text-xs font-medium bg-muted text-muted-foreground border border-border">
                {config.icon}
                <span>{config.label}</span>
              </span>
              <span className="text-xs text-muted-foreground">
                {formattedDate}
              </span>
            </div>
            
            {/* Title and Description */}
            <h2 className="text-base font-bold mb-1 text-foreground">
              {award.name}
            </h2>
            <p className="text-sm text-foreground/80 mb-3">
              {award.description}
            </p>
            
            {/* Detailed Description - only if available */}
            {award.detailedDescription && (
              <div className="text-xs text-muted-foreground mb-3 max-h-24 overflow-y-auto">
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium bg-muted text-foreground/80 border border-border hover:bg-muted/80 transition-colors"
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium bg-muted text-foreground/80 border border-border hover:bg-muted/80 transition-colors"
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