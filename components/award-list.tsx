"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Star, Sparkles, Award as AwardIcon } from "lucide-react";
import { AwardCard } from "./award-list-card";
import type { Award } from "@/types/award";

interface AwardTimelineProps {
  awards: Award[];
}

export function AwardTimeline({ awards }: AwardTimelineProps) {
  // Sort awards by date using UTC
  const sortedAwards = [...awards].sort((a, b) => {
    const dateA = new Date(a.date + 'T00:00:00Z');
    const dateB = new Date(b.date + 'T00:00:00Z');
    return dateB.getTime() - dateA.getTime();
  });

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
      case "major":
        return {
          dotBg: "bg-blue-500",
          glowColor: "shadow-blue-500/50",
          icon: <Medal className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />,
          hasSparkle: true
        }
      case "notable":
        return {
          dotBg: "bg-purple-500",
          glowColor: "shadow-purple-500/50",
          icon: <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />,
          hasSparkle: false
        }
      default:
        return {
          dotBg: "bg-amber-500",
          glowColor: "shadow-amber-500/50",
          icon: <AwardIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />,
          hasSparkle: false
        }
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Timeline line - adjusted position for mobile */}
        <div className="absolute left-2 sm:left-4 md:left-6 top-6 bottom-6 w-0.5 bg-blue-400 dark:bg-blue-600 opacity-60" />
        
        {/* Timeline items */}
        <div className="space-y-5 sm:space-y-8">
          <AnimatePresence>
            {sortedAwards.map((award, index) => {
              const config = getDifficultyConfig(award.difficulty)
              
              return (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: index * 0.1 + 0.3,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  className="relative group"
                >
                  {/* Smaller timeline dot on mobile */}
                  <div className="absolute left-0 top-2 flex items-center justify-center w-4 h-4 sm:w-8 sm:h-8">
                    <motion.div
                      className={`relative w-4 h-4 sm:w-6 sm:h-6 rounded-full ${config.dotBg} shadow-lg ${config.glowColor} flex items-center justify-center`}
                      whileHover={{ scale: 1.1 }}
                      animate={expandedId === award.id ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {config.icon}
                      
                      {/* Smaller sparkle for mobile */}
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
                          <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-300" />
                        </motion.div>
                      )}
                    </motion.div>
                  </div>

                  {/* Reduced margin on mobile to bring cards closer to timeline */}
                  <div className="ml-8 sm:ml-14 md:ml-20">
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <AwardCard
                        award={award}
                        isExpanded={expandedId === award.id}
                        onToggle={() => toggleExpand(award.id)}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Smaller end marker for mobile */}
        <div
          className="absolute left-1 sm:left-2 md:left-3 bottom-0 w-2 h-2 sm:w-4 sm:h-4 rounded-full bg-gray-300 dark:bg-gray-600 shadow-lg"
        />
      </div>
    </div>
  );
}
