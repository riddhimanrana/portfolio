"use client"

import { useState, useEffect, useMemo } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Search, Calendar, Filter, X, Trophy, Grid, LayoutList } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AwardGrid } from "@/components/award-grid"
import { AwardDetail } from "@/components/award-detail"
import { AwardTimelineNav } from "@/components/award-timeline-nav"
import { AwardTimeline } from "@/components/award-timeline"
import type { Award, AwardDifficulty } from "@/types/award"
import awardsData from "@/data/awards.json"

// Add type assertion for the imported awards
const awards = awardsData as Award[]

export default function AwardsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activeFilters, setActiveFilters] = useState<{
    difficulty: AwardDifficulty[]
    year: string[]
  }>({
    difficulty: ["major", "minor", "honorable"],
    year: []
  })

  // Get available years from awards
  const availableYears = useMemo(() => {
    const years = new Set<string>()
    awards.forEach(award => {
      years.add(new Date(award.date).getFullYear().toString())
    })
    return Array.from(years).sort((a, b) => Number(b) - Number(a))
  }, [])

  // Filter and sort awards
  const filteredAwards = useMemo(() => {
    // Filter by search query and active filters
    const filtered = awards.filter((award) => {
      const searchContent = `${award.name} ${award.description} ${award.detailedDescription}`.toLowerCase()
      const matchesSearch = searchContent.includes(searchQuery.toLowerCase())

      const matchesDifficulty = activeFilters.difficulty.includes(award.difficulty as AwardDifficulty)

      const awardYear = new Date(award.date).getFullYear().toString()
      const matchesYear = activeFilters.year.length === 0 || activeFilters.year.includes(awardYear)

      return matchesSearch && matchesDifficulty && matchesYear
    })

    // Sort by date (newest first)
    return [...filtered].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }, [searchQuery, activeFilters])

  // Get selected award
  const selectedAward = useMemo(() => {
    return filteredAwards.find(award => award.id === selectedId) || null
  }, [selectedId, filteredAwards])

  // Toggle difficulty filter
  const toggleDifficultyFilter = (difficulty: AwardDifficulty) => {
    setActiveFilters(prev => {
      if (prev.difficulty.includes(difficulty)) {
        return {
          ...prev,
          difficulty: prev.difficulty.filter(d => d !== difficulty)
        }
      } else {
        return {
          ...prev,
          difficulty: [...prev.difficulty, difficulty]
        }
      }
    })
  }

  // Toggle year filter
  const toggleYearFilter = (year: string) => {
    setActiveFilters(prev => {
      if (prev.year.includes(year)) {
        return {
          ...prev,
          year: prev.year.filter(y => y !== year)
        }
      } else {
        return {
          ...prev,
          year: [...prev.year, year]
        }
      }
    })
  }

  // Reset filters
  const resetFilters = () => {
    setActiveFilters({
      difficulty: ["major", "minor", "honorable"],
      year: []
    })
    setSearchQuery("")
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 pb-20 transition-colors duration-300">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Awards & Achievements
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of recognitions and accomplishments throughout my academic and professional journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with timeline navigation */}
          <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="hidden lg:block lg:col-span-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 p-4 h-[calc(100vh-12rem)] sticky top-24 overflow-y-auto transition-colors duration-300"
                    >
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Calendar className="mr-2 h-5 w-5" /> Timeline
            </h2>
            <AwardTimelineNav
              awards={awards}
              selectedId={selectedId}
              onSelectAward={setSelectedId}
            />
          </motion.div>

          {/* Main content area */}
          <div className="lg:col-span-3">
            {/* Search and filter controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search awards..."
                    className="pl-10 py-6 bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-blue-500 transition-colors duration-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex-shrink-0 flex gap-2">
                  <Tabs defaultValue="grid" onValueChange={(value) => setViewMode(value as "grid" | "timeline")} className="w-48">
                    <TabsList className="w-full bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                      <TabsTrigger value="grid" className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                        <Grid className="w-4 h-4 mr-1" />
                        Grid
                      </TabsTrigger>
                      <TabsTrigger value="timeline" className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                        <LayoutList className="w-4 h-4 mr-1" />
                        List
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              {/* Filter section */}
              <div className="mt-4 flex flex-wrap gap-2 items-center">
                <div className="flex items-center text-gray-400 mr-2">
                  <Filter className="w-4 h-4 mr-1" /> Filters:
                </div>

                {/* Difficulty filters */}
                <button
                  onClick={() => toggleDifficultyFilter("major")}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5
                    ${activeFilters.difficulty.includes("major")
                      ? "bg-blue-200/30 dark:bg-blue-600/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/50"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-400 border border-gray-300 dark:border-gray-700"}`}
                >
                  <Trophy className="w-3 h-3" /> Major
                </button>

                <button
                  onClick={() => toggleDifficultyFilter("minor")}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5
                    ${activeFilters.difficulty.includes("minor")
                      ? "bg-amber-200/30 dark:bg-amber-600/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/50"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-400 border border-gray-300 dark:border-gray-700"}`}
                >
                  <Trophy className="w-3 h-3" /> Notable
                </button>

                <button
                  onClick={() => toggleDifficultyFilter("honorable")}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5
                    ${activeFilters.difficulty.includes("honorable")
                      ? "bg-purple-200/30 dark:bg-purple-600/30 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/50"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-400 border border-gray-300 dark:border-gray-700"}`}
                >
                  <Trophy className="w-3 h-3" /> Honorable
                </button>

                {/* Year filters dropdown would go here - simplified to top 3 years */}
                {availableYears.slice(0, 3).map(year => (
                  <button
                    key={year}
                    onClick={() => toggleYearFilter(year)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5
                        ${activeFilters.year.includes(year)
                          ? "bg-blue-200/30 dark:bg-blue-600/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/50"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-400 border border-gray-300 dark:border-gray-700"}`}
                  >
                    <Calendar className="w-3 h-3" /> {year}
                  </button>
                ))}

                {/* Clear filters button */}
                {(activeFilters.difficulty.length < 3 || activeFilters.year.length > 0 || searchQuery) && (
                  <button
                    onClick={resetFilters}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-red-900/30 text-red-400 border border-red-500/50 flex items-center gap-1.5"
                  >
                    <X className="w-3 h-3" /> Clear All
                  </button>
                )}
              </div>
            </motion.div>

            {/* Award Detail View */}
            <AnimatePresence>
              {selectedAward && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8 overflow-hidden"
                >
                  <AwardDetail
                    award={selectedAward}
                    onClose={() => setSelectedId(null)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Award Content (Grid or Timeline) */}
            {filteredAwards.length > 0 ? (
              <div className="mt-6">
                <Tabs defaultValue={viewMode} value={viewMode}>
                  <TabsContent value="grid" className="mt-0">
                    <AwardGrid
                      awards={filteredAwards}
                      onAwardClick={setSelectedId}
                      selectedId={selectedId}
                    />
                  </TabsContent>
                  <TabsContent value="timeline" className="mt-0">
                    <AwardTimeline awards={filteredAwards} />
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50/30 dark:bg-gray-900/30 rounded-xl border border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Trophy className="w-16 h-16 mx-auto text-gray-700 mb-4" />
                  <p className="text-gray-400 text-lg mb-2">No awards found matching your criteria.</p>
                  <p className="text-gray-500 max-w-md mx-auto mb-6">
                    Try adjusting your search terms or filters to see more results.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                  >
                    Reset Filters
                  </button>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
