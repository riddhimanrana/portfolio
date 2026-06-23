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
      <div className="absolute left-4 top-2 bottom-0 w-0.5 bg-border" />
      
      <div className="space-y-6">
        {years.map((year) => (
          <div key={year} className="relative">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center relative z-10">
                <Calendar className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-foreground">
                  {year}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {awardsByYear[year].length} award{awardsByYear[year].length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            <div className="ml-4 space-y-2">
              {awardsByYear[year].map((award) => {
                const isSelected = selectedId === award.id
                const icon = award.difficulty === "major"
                  ? <Medal className="w-4 h-4 text-muted-foreground" />
                  : award.difficulty === "notable"
                  ? <Star className="w-4 h-4 text-muted-foreground" />
                  : <AwardIcon className="w-4 h-4 text-muted-foreground" />

                return (
                  <button
                    key={award.id}
                    className={`group relative flex items-center pl-4 pr-3 py-3 ml-2 rounded-sm w-full text-left transition-all duration-300 border ${
                      isSelected
                        ? "bg-muted border-foreground/30 shadow-sm"
                        : "bg-card border-border hover:bg-muted/60 hover:border-border"
                    }`}
                    onClick={() => onSelectAward(award.id)}
                  >
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis text-foreground transition-colors duration-300">
                          {award.name}
                        </p>
                        <div className="flex items-center gap-1">
                          {award.difficulty === "major" && (
                            <Sparkles className="w-3 h-3 text-yellow-400" />
                          )}
                          {icon}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 transition-colors duration-300">
                        {award.description}
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
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