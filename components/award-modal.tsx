"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Medal, Star, AwardIcon, Calendar, Clock, Sparkles } from "lucide-react";
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
          bgGradient: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/30",
          borderColor: "border-blue-200 dark:border-blue-700",
          accentColor: "bg-blue-500",
          textColor: "text-blue-700 dark:text-blue-400",
          icon: <Medal className="w-5 h-5 text-white" />,
          label: "Major Achievement",
          hasSparkle: true
        };
      case "notable":
        return {
          bgGradient: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/30",
          borderColor: "border-purple-200 dark:border-purple-700",
          accentColor: "bg-purple-500",
          textColor: "text-purple-700 dark:text-purple-400",
          icon: <Star className="w-5 h-5 text-white" />,
          label: "Notable Achievement",
          hasSparkle: false
        };
      default:
        return {
          bgGradient: "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/50 dark:to-amber-800/30",
          borderColor: "border-amber-200 dark:border-amber-700",
          accentColor: "bg-amber-500",
          textColor: "text-amber-700 dark:text-amber-400",
          icon: <AwardIcon className="w-5 h-5 text-white" />,
          label: "Honorable Mention",
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
              className={`relative w-full sm:max-w-2xl lg:max-w-3xl sm:mx-auto bg-white dark:bg-gray-900 sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden ${config.borderColor} sm:border`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header accent */}
              <div className={`h-2 ${config.accentColor}`} />
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>

              {/* Scrollable content */}
              <div className="overflow-y-auto max-h-[calc(90vh-8px)]">
                <div className="p-6 pb-8 sm:p-8">
                  {/* Header section */}
                  <div className="flex items-start gap-4 sm:gap-6 mb-6">
                    {/* Award image */}
                    <div className="flex-shrink-0 relative">
                      <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-lg">
                        {!imageError ? (
                          <Image
                            src={award.image || "/images/placeholder.svg"}
                            alt={award.name}
                            fill
                            className="object-cover rounded-full"
                            onError={() => setImageError(true)}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                            {config.icon}
                          </div>
                        )}
                      </div>
                      
                      {/* Sparkle for major awards */}
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
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${config.accentColor} text-white shadow-sm mb-3`}>
                        {config.icon}
                        <span>{config.label}</span>
                      </div>
                      
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                        {award.name}
                      </h1>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
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
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Description
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {award.description}
                    </p>
                  </div>

                  {/* Detailed description */}
                  {award.detailedDescription && (
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Details
                      </h2>
                      <div className={`p-4 rounded-xl ${config.bgGradient} border ${config.borderColor}`}>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                          {award.detailedDescription}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* External link */}
                  {award.link && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <a
                        href={award.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-4 py-2 ${config.accentColor} hover:opacity-90 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 w-full justify-center`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Details
                      </a>
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
