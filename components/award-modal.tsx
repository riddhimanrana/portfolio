"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Medal, Star, AwardIcon, Calendar, Clock, Sparkles, Eye } from "lucide-react";
import type { Award } from "@/types/award";
import { formatDate } from "@/lib/utils";

interface AwardModalProps {
  award: Award | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AwardModal({ award, isOpen, onClose }: AwardModalProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!award) return null;

  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
      case "major":
        return {
          accentBar: "bg-foreground",
          icon: <Medal className="w-5 h-5" />,
          label: "Major Achievement",
          hasSparkle: true
        };
      
      case "honorable":
        return {
          accentBar: "bg-muted-foreground/60",
          icon: <AwardIcon className="w-5 h-5" />,
          label: "Honorable Mention",
          hasSparkle: false
        };
      default:
        return {
          accentBar: "bg-muted-foreground",
          icon: <Star className="w-5 h-5" />,
          label: "Notable Achievement",
          hasSparkle: false
        };
    }
  };

  const config = getDifficultyConfig(award.difficulty);
  const timeAgo = new Date().getTime() - new Date(award.date + 'T00:00:00Z').getTime();
  const daysAgo = Math.floor(timeAgo / (1000 * 60 * 60 * 24));
  
  const getTimeAgoText = (days: number) => {
    if (days < 30) return `${days} days ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0, y: "100%", scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: "100%", scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full sm:max-w-2xl lg:max-w-3xl sm:mx-auto bg-card sm:rounded-sm border border-border shadow-2xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header accent */}
              <div className={`h-1.5 ${config.accentBar}`} />
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-sm bg-muted hover:bg-muted/80 border border-border"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Scrollable content */}
              <div className="overflow-y-auto max-h-[calc(90vh-6px)]">
                <div className="p-6 pb-8 sm:p-8">
                  {/* Header section */}
                  <div className="flex items-start gap-4 sm:gap-6 mb-6">
                    {/* Award image */}
                    <div className="flex-shrink-0 relative">
                      <div 
                        className={`h-16 w-16 sm:h-20 sm:w-20 relative overflow-hidden ${award.isIconRoundedFull ? 'rounded-full' : 'rounded-sm'}`}
                      >
                        {!imageError ? (
                          <Image
                            src={award.image || "/placeholder.svg"}
                            alt={award.name}
                            fill
                            sizes="(max-width: 640px) 40px, (max-width: 1024px) 56px, 80px"
                            quality={100}
                            priority
                            className={`object-cover ${award.isIconRoundedFull ? 'rounded-full' : 'rounded-sm'}`}
                            onError={() => setImageError(true)}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted rounded-sm">
                            {config.icon}
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
                          <Sparkles className="w-5 h-5 text-yellow-400 drop-shadow-sm" />
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Title and badge */}
                    <div className="flex-1 min-w-0 pr-12">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-sm font-medium bg-muted text-muted-foreground border border-border mb-3">
                        {config.icon}
                        <span>{config.label}</span>
                      </div>
                      
                      <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-2">
                        {award.name}
                      </h1>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(award.date)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{getTimeAgoText(daysAgo)}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-foreground mb-3">
                      Description
                    </h2>
                    <p className="text-foreground/80 leading-relaxed">
                      {award.description}
                    </p>
                  </div>

                  {/* Detailed description */}
                  {award.detailedDescription && (
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-foreground mb-3">
                        Details
                      </h2>
                      <div className="p-4 rounded-sm bg-muted/50 border border-border">
                        <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                          {award.detailedDescription}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* External links */}
                  {(award.link || award.submissionLink) && (
                    <div className="pt-4 border-t border-border">
                      <h3 className="text-md font-semibold text-foreground mb-3">External Links</h3>
                      <div className="flex flex-wrap gap-3">
                        {award.link && (
                          <a
                            href={award.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Visit Website
                          </a>                          
                        )}
                        {award.submissionLink && (
                          <a
                            href={award.submissionLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium bg-muted text-foreground border border-border hover:bg-muted/80 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            View Submission
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
