"use client"

import { useState, useEffect, useMemo } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Search, Calendar, Filter, X, Trophy, Grid, LayoutList, Medal, Award as AwardIcon, Star, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { AwardGrid } from "@/components/award-grid"
import { AwardDetail } from "@/components/award-detail"
import { AwardTimelineNav } from "@/components/award-timeline"
import { AwardTimeline } from "@/components/award-list"
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
    difficulty: ["major", "notable", "honorable"],
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
      difficulty: ["major", "notable", "honorable"],
      year: []
    })
    setSearchQuery("")
  }

  return (
    <div className="min-h-screen  text-gray-900 dark:text-gray-100 transition-all duration-300">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            {/* <Trophy className="w-8 h-8 md:w-10 md:h-10 text-yellow-500 mr-3" /> */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Awards & Achievements
            </h1>
            {/* <Trophy className="w-8 h-8 md:w-10 md:h-10 text-yellow-500 ml-3" /> */}
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            A showcase of recognitions and accomplishments throughout my academic journey.
          </p>
          <div className="flex items-center justify-center mt-4 space-x-6 text-sm">
            <div className="flex items-center">
              <Medal className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-gray-600 dark:text-gray-400">{awards.filter(a => a.difficulty === 'major').length} Major</span>
            </div>
            <div className="flex items-center">
              <AwardIcon className="w-4 h-4 text-amber-500 mr-1" />
              <span className="text-gray-600 dark:text-gray-400">{awards.filter(a => a.difficulty === 'honorable').length} Honorable</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-purple-500 mr-1" />
              <span className="text-gray-600 dark:text-gray-400">{awards.filter(a => a.difficulty === 'notable').length} Notable</span>
            </div>
            
          </div>
        </motion.div>

        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Mobile timeline toggle - show on small screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:hidden order-2"
          >
            <details className="group bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
              <summary className="p-4 cursor-pointer flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-white" /> Timeline Navigation
                </h2>
                <span className="group-open:rotate-180 transition-transform">
                  <ChevronDown className="w-4 h-4 text-white" />
                </span>
              </summary>
              <div className="px-4 pb-4 max-h-0 overflow-hidden opacity-0 
                    group-open:max-h-60 group-open:overflow-y-auto group-open:opacity-100
                    transition-all duration-300 ease-in-out">
                <AwardTimelineNav
                  awards={awards}
                  selectedId={selectedId}
                  onSelectAward={setSelectedId}
                />
              </div>
            </details>
          </motion.div>

          {/* Desktop sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden lg:block lg:col-span-1 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg p-6 h-[calc(100vh-12rem)] sticky top-24 overflow-y-auto order-1"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Calendar className="mr-2 h-5 w-5 dark:text-white" /> Timeline
            </h2>
            <AwardTimelineNav
              awards={awards}
              selectedId={selectedId}
              onSelectAward={setSelectedId}
            />
          </motion.div>

          {/* Main content area */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {/* Search and filter controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 md:mb-8"
            >
              <div className="flex flex-col gap-4">
                {/* Search and View Toggle Row */}
                <div className="flex flex-row gap-2">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search awards, descriptions..."
                      className="pl-10 py-3 md:py-4 bg-white/80 dark:bg-gray-800/80 border border-gray-300/50 dark:border-gray-600/50 rounded-xl text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-sm transition-all duration-300"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex-shrink-0 flex gap-2">
                    {/* Filter button with popover for mobile */}
                    <Popover>
                      <PopoverTrigger asChild className="md:hidden">
                        <button className="flex items-center px-3 bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md">
                          <Filter className="w-4 h-4" />
                          <span className="sr-only">Filters</span>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-2xl">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold flex items-center">
                              <Filter className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                              Filter Awards
                            </h3>
                            {(activeFilters.difficulty.length < 3 || activeFilters.year.length > 0) && (
                              <button
                                onClick={resetFilters}
                                className="text-xs bg-red-500 hover:underline flex items-center"
                              >
                                <X className="w-3.5 h-3.5 mr-1" /> Clear All
                              </button>
                            )}
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty</h4>
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => toggleDifficultyFilter("major")}
                                className={`px-3 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all duration-200 shadow-sm hover:shadow-md
                                  ${activeFilters.difficulty.includes("major")
                                    ? "bg-blue-500 text-white border-0 shadow-blue-200 dark:shadow-blue-900/50"
                                    : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-300/50 dark:border-gray-600/50 hover:bg-blue-50 dark:hover:bg-blue-900/20"}`}
                              >
                                <Medal className="w-3.5 h-3.5" /> Major
                              </button>
                              
                              <button
                                onClick={() => toggleDifficultyFilter("honorable")}
                                className={`px-3 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all duration-200 shadow-sm hover:shadow-md
                                  ${activeFilters.difficulty.includes("honorable")
                                    ? "bg-amber-500 text-white border-0 shadow-amber-200 dark:shadow-amber-900/50"
                                    : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-300/50 dark:border-gray-600/50 hover:bg-amber-50 dark:hover:bg-amber-900/20"}`}
                              >
                                <AwardIcon className="w-3.5 h-3.5" /> Honorable
                              </button>
                              
                              <button
                                onClick={() => toggleDifficultyFilter("notable")}
                                className={`px-3 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all duration-200 shadow-sm hover:shadow-md
                                  ${activeFilters.difficulty.includes("notable")
                                    ? "bg-purple-500 text-white border-0 shadow-purple-200 dark:shadow-purple-900/50"
                                    : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-300/50 dark:border-gray-600/50 hover:bg-purple-50 dark:hover:bg-purple-900/20"}`}
                              >
                                <Star className="w-3.5 h-3.5" /> Notable
                              </button>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Year</h4>
                            <div className="flex flex-wrap gap-2">
                              {availableYears.map(year => (
                                <button
                                  key={year}
                                  onClick={() => toggleYearFilter(year)}
                                  className={`px-3 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all duration-200 shadow-sm hover:shadow-md
                                    ${activeFilters.year.includes(year)
                                      ? "bg-indigo-500 text-white border-0 shadow-indigo-200 dark:shadow-indigo-900/50"
                                      : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-300/50 dark:border-gray-600/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"}`}
                                >
                                  <Calendar className="w-3.5 h-3.5" /> {year}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>

                    {/* View Toggle */}
                    <Tabs defaultValue="grid" onValueChange={(value) => setViewMode(value as "grid" | "timeline")} className="sm:w-48">
                      <TabsList className="w-full bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm shadow-sm rounded-xl">
                        <TabsTrigger 
                          value="grid" 
                          className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
                        >
                          <Grid className="w-4 h-4 sm:mr-1.5" />
                          <span className="hidden sm:inline">Grid</span>
                        </TabsTrigger>
                        <TabsTrigger 
                          value="timeline" 
                          className="flex-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
                        >
                          <LayoutList className="w-4 h-4 sm:mr-1.5" />
                          <span className="hidden sm:inline">List</span>
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>

                {/* Filter section - visible on desktop only */}
                <div className="hidden md:flex flex-wrap gap-2 items-center">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mr-2 text-sm">
                    <Filter className="w-4 h-4 mr-1.5" />Filters:
                  </div>

                  {/* Difficulty filters */}
                  <button
                    onClick={() => toggleDifficultyFilter("major")}
                    className={`px-3 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all duration-200 shadow-sm hover:shadow-md
                      ${activeFilters.difficulty.includes("major")
                        ? "bg-blue-500 text-white border-0 shadow-blue-200 dark:shadow-blue-900/50"
                        : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-300/50 dark:border-gray-600/50 hover:bg-blue-50 dark:hover:bg-blue-900/20"}`}
                  >
                    <Medal className="w-3.5 h-3.5" /> Major
                  </button>

                  <button
                    onClick={() => toggleDifficultyFilter("honorable")}
                    className={`px-3 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all duration-200 shadow-sm hover:shadow-md
                      ${activeFilters.difficulty.includes("honorable")
                        ? "bg-amber-500 text-white border-0 shadow-amber-200 dark:shadow-amber-900/50"
                        : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-300/50 dark:border-gray-600/50 hover:bg-amber-50 dark:hover:bg-amber-900/20"}`}
                  >
                    <AwardIcon className="w-3.5 h-3.5" /> Honorable
                  </button>

                  <button
                    onClick={() => toggleDifficultyFilter("notable")}
                    className={`px-3 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all duration-200 shadow-sm hover:shadow-md
                      ${activeFilters.difficulty.includes("notable")
                        ? "bg-purple-500 text-white border-0 shadow-purple-200 dark:shadow-purple-900/50"
                        : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-300/50 dark:border-gray-600/50 hover:bg-purple-50 dark:hover:bg-purple-900/20"}`}
                  >
                    <Star className="w-3.5 h-3.5" /> Notable
                  </button>

                  {/* Year filters */}
                  {availableYears.slice(0, 3).map(year => (
                    <button
                      key={year}
                      onClick={() => toggleYearFilter(year)}
                      className={`px-3 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all duration-200 shadow-sm hover:shadow-md
                          ${activeFilters.year.includes(year)
                            ? "bg-indigo-500 text-white border-0 shadow-indigo-200 dark:shadow-indigo-900/50"
                            : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-300/50 dark:border-gray-600/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"}`}
                    >
                      <Calendar className="w-3.5 h-3.5" /> {year}
                    </button>
                  ))}

                  {/* Clear filters button */}
                  {(activeFilters.difficulty.length < 3 || activeFilters.year.length > 0 || searchQuery) && (
                    <button
                      onClick={resetFilters}
                      className="px-3 py-2 rounded-full text-xs font-medium bg-red-500 text-white border-0 flex items-center gap-1.5 shadow-sm hover:shadow-md shadow-red-200 dark:shadow-red-900/50 transition-all duration-200"
                    >
                      <X className="w-3.5 h-3.5" /> Clear All
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Award Detail View */}
            <AnimatePresence>
              {selectedAward && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  className="mb-6 md:mb-8 overflow-hidden"
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
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-4 md:mt-6"
              >
                <Tabs defaultValue={viewMode} value={viewMode}>
                  <TabsContent value="grid" className="mt-0">
                    <AwardGrid
                      awards={filteredAwards}
                    />
                  </TabsContent>
                  <TabsContent value="timeline" className="mt-0">
                    <AwardTimeline awards={filteredAwards} />
                  </TabsContent>
                </Tabs>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-16 md:py-20 bg-gradient-to-br from-gray-50/50 to-blue-50/30 dark:from-gray-900/50 dark:to-blue-950/30 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm shadow-sm"
              >
                <div className="max-w-md mx-auto">
                  <div className="relative mb-6">
                    <Trophy className="relative w-16 h-16 md:w-20 md:h-20 mx-auto text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    No awards found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base mb-6 leading-relaxed">
                    Try adjusting your search terms or filters to discover more achievements.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reset Filters
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
