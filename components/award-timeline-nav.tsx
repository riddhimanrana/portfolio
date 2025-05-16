"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Calendar, Trophy, Award as AwardIcon } from "lucide-react"
import type { Award } from "@/types/award"

interface AwardTimelineNavProps {
  awards: Award[]
  selectedId: string | null
  onSelectAward: (id: string) => void
}

export function AwardTimelineNav({ awards, selectedId, onSelectAward }: AwardTimelineNavProps) {
  // Group awards by year
  const awardsByYear = useMemo(() => {
    const grouped: Record<string, Award[]> = {}
    
    // Sort by date (newest first)
    const sortedAwards = [...awards].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    
    sortedAwards.forEach(award => {
      const year = new Date(award.date).getFullYear().toString()
      if (!grouped[year]) {
        grouped[year] = []
      }
      grouped[year].push(award)
    })
    
    return grouped
  }, [awards])
  
  // Get years in order
  const years = useMemo(() => 
    Object.keys(awardsByYear).sort((a, b) => Number(b) - Number(a)), 
    [awardsByYear]
  )
  
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300/50 dark:bg-gray-700/50 transition-colors duration-300" />
      
      <div className="space-y-5">
        {years.map((year, yearIndex) => (
          <motion.div 
            key={year}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: yearIndex * 0.1 }}
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center relative z-10 transition-colors duration-300">
                <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400 transition-colors duration-300" />
              </div>
              <h3 className="ml-3 text-gray-900 dark:text-white font-medium transition-colors duration-300">{year}</h3>
            </div>
            
            <div className="ml-4 space-y-2">
              {awardsByYear[year].map((award, awardIndex) => (
                <motion.button
                  key={award.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: yearIndex * 0.1 + awardIndex * 0.05 + 0.1 }}
                  className={`flex items-center pl-4 pr-2 py-2 rounded-lg w-full text-left transition-colors duration-300 ${
                    selectedId === award.id
                      ? award.difficulty === "major"
                        ? "bg-blue-50 dark:bg-blue-900 border border-blue-500/30"
                        : award.difficulty === "minor"
                          ? "bg-amber-50 dark:bg-amber-900 border border-amber-500/30"
                          : "bg-purple-50 dark:bg-purple-900 border border-purple-500/30"
                      : "bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => onSelectAward(award.id)}
                >
                  <div className={`w-2 h-2 rounded-full mr-3 flex-shrink-0
                    ${award.difficulty === "major" 
                      ? "bg-blue-500" 
                      : award.difficulty === "minor" 
                        ? "bg-amber-500" 
                        : "bg-purple-500"}`} 
                  />
                  <div className="flex-grow">
                    <p className={`text-sm font-medium line-clamp-1 
                                          ${selectedId === award.id 
                                            ? "text-gray-900 dark:text-white" 
                                            : "text-gray-600 dark:text-gray-400"}`}>
                      {award.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1 transition-colors duration-300">
                      {award.description}
                    </p>
                  </div>
                  {award.difficulty === "major" && <Trophy className="w-3.5 h-3.5 text-blue-400 ml-1.5 flex-shrink-0" />}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}