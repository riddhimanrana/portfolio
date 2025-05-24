"use client"

import { useMemo } from "react"
import { Calendar, Trophy, Medal, Star, Award as AwardIcon, Sparkles } from "lucide-react"
import type { Award } from "@/types/award"

interface AwardTimelineNavProps {
  awards: Award[]
  selectedId: string | null
  onSelectAward: (id: string) => void
}

export function AwardTimelineNav({ awards, selectedId, onSelectAward }: AwardTimelineNavProps) {
  // Group awards by year using UTC dates
  const awardsByYear = useMemo(() => {
    const grouped: Record<string, Award[]> = {}
    
    // Sort by date (newest first) using UTC
    const sortedAwards = [...awards].sort((a, b) => {
      const dateA = new Date(a.date + 'T00:00:00Z');
      const dateB = new Date(b.date + 'T00:00:00Z');
      return dateB.getTime() - dateA.getTime();
    });
    
    sortedAwards.forEach(award => {
      const date = new Date(award.date + 'T00:00:00Z');
      const year = date.getUTCFullYear().toString();
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
      {/* Simplified timeline line with solid color */}
      <div className="absolute left-4 top-2 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-600" />
      
      <div className="space-y-6">
        {years.map((year, yearIndex) => (
          <div key={year} className="relative">
            {/* Simplified year header with solid color */}
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center relative z-10 shadow-md">
                <Calendar className="w-4 h-4 text-gray-700 dark:text-white" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {year}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {awardsByYear[year].length} award{awardsByYear[year].length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            {/* Award list with simplified styling */}
            <div className="ml-4 space-y-2">
              {awardsByYear[year].map((award, awardIndex) => {
                const isSelected = selectedId === award.id
                const getDifficultyConfig = (difficulty: string) => {
                  switch (difficulty) {
                    case "major":
                      return {
                        selectedBg: "bg-blue-50 dark:bg-blue-900/30",
                        selectedBorder: "border-blue-300 dark:border-blue-500",
                        selectedShadow: "shadow-blue-100 dark:shadow-blue-900/30",
                        dotColor: "bg-blue-500",
                        textColor: isSelected ? "text-blue-900 dark:text-blue-100" : "text-gray-700 dark:text-gray-300",
                        icon: <Medal className="w-4 h-4 text-blue-500" />
                      }
                    case "notable":
                      return {
                        selectedBg: "bg-purple-50 dark:bg-purple-900/30",
                        selectedBorder: "border-purple-300 dark:border-purple-500",
                        selectedShadow: "shadow-purple-100 dark:shadow-purple-900/30",
                        dotColor: "bg-purple-500",
                        textColor: isSelected ? "text-purple-900 dark:text-purple-100" : "text-gray-700 dark:text-gray-300",
                        icon: <Star className="w-4 h-4 text-purple-500" />
                      }
                    default:
                      return {
                        selectedBg: "bg-amber-50 dark:bg-amber-900/30",
                        selectedBorder: "border-amber-300 dark:border-amber-500",
                        selectedShadow: "shadow-amber-100 dark:shadow-amber-900/30",
                        dotColor: "bg-amber-500",
                        textColor: isSelected ? "text-amber-900 dark:text-amber-100" : "text-gray-700 dark:text-gray-300",
                        icon: <AwardIcon className="w-4 h-4 text-amber-500" />
                      }
                  }
                }

                const config = getDifficultyConfig(award.difficulty)

                return (
                  <button
                    key={award.id}
                    className={`group relative flex items-center pl-4 pr-3 py-3 ml-2 rounded-xl w-full text-left transition-all duration-300 border ${
                      isSelected
                        ? `${config.selectedBg} ${config.selectedBorder} shadow-lg ${config.selectedShadow}`
                        : "bg-white/70 dark:bg-gray-900/70 hover:bg-gray-50 dark:hover:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md"
                    }`}
                    onClick={() => onSelectAward(award.id)}
                  >
                    {/* Simplified decorative dot */}
                    <span
                      className={`w-3 h-3 rounded-full mr-3 flex-shrink-0 ${config.dotColor} shadow-sm`}
                    />
                    
                    {/* Content */}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-sm font-semibold line-clamp-1 ${config.textColor} transition-colors duration-300`}>
                          {award.name}
                        </p>
                        <div className="flex items-center gap-1">
                          {award.difficulty === "major" && (
                            <div>
                              <Sparkles className="w-3 h-3 text-blue-400" />
                            </div>
                          )}
                          {config.icon}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 transition-colors duration-300">
                        {award.description}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {new Date(award.date + 'T00:00:00Z').toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          timeZone: 'UTC'
                        })}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}