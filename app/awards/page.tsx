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

// Custom hook to check media queries
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQueryList = window.matchMedia(query);
    
    const updateMatches = () => setMatches(mediaQueryList.matches);
    
    // Set initial state
    updateMatches();

    // Listener for changes
    // Using addEventListener if available, otherwise addListener
    try {
      mediaQueryList.addEventListener('change', updateMatches);
    } catch (e) {
      // Fallback for older browsers
      mediaQueryList.addListener(updateMatches);
    }

    return () => {
      try {
        mediaQueryList.removeEventListener('change', updateMatches);
      } catch (e) {
        // Fallback for older browsers
        mediaQueryList.removeListener(updateMatches);
      }
    };
  }, [query]);

  return matches;
};


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
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1023px)"); // lg breakpoint, as sidebar hides below lg

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

  const handleAwardSelection = (id: string) => {
    setSelectedId(id);
    if (isMobile && id) {
      setIsDetailModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    // Delay setting selectedId to null to allow modal exit animation
    setTimeout(() => {
      setSelectedId(null);
    }, 300); // Match modal animation duration
  };

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
    setSelectedId(null) // Also close any open detail/modal
    setIsDetailModalOpen(false)
  }

  return (
    <div className="min-h-screen text-foreground transition-all duration-300">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 md:mb-12"
        >
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-muted text-muted-foreground rounded-sm mr-4 shrink-0">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">
                <span className="md:hidden">Awards</span>
                <span className="hidden md:inline">Awards & Achievements</span>
              </h1>
              <p className="text-muted-foreground text-sm">
                Recognitions and accomplishments
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-start md:justify-end space-x-4 md:space-x-6 text-sm mt-4 md:mt-0">
            <div className="flex items-center">
              <Medal className="w-4 h-4 text-muted-foreground mr-1.5" />
              <span className="text-muted-foreground">{awards.filter(a => a.difficulty === 'major').length} Major</span>
            </div>
            <div className="flex items-center">
              <AwardIcon className="w-4 h-4 text-muted-foreground mr-1.5" />
              <span className="text-muted-foreground">{awards.filter(a => a.difficulty === 'honorable').length} Honorable</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-muted-foreground mr-1.5" />
              <span className="text-muted-foreground">{awards.filter(a => a.difficulty === 'notable').length} Notable</span>
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
            <details className="group bg-card border border-border rounded-sm">
              <summary className="p-4 cursor-pointer flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-foreground" /> Timeline Navigation
                </h2>
                <span className="group-open:rotate-180 transition-transform">
                  <ChevronDown className="w-4 h-4 text-foreground" />
                </span>
              </summary>
              <div className="px-4 pb-4 max-h-0 overflow-hidden opacity-0 
                    group-open:max-h-96 group-open:overflow-y-auto group-open:opacity-100
                    transition-all duration-300 ease-in-out">
                <AwardTimelineNav
                  awards={awards}
                  selectedId={selectedId}
                  onSelectAward={handleAwardSelection}
                />
              </div>
            </details>
          </motion.div>

          {/* Desktop sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden lg:block lg:col-span-1 bg-card border border-border rounded-sm p-6 h-[calc(100vh-12rem)] sticky top-24 overflow-y-auto order-1"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Calendar className="mr-2 h-5 w-5" /> Timeline
            </h2>
            <AwardTimelineNav
              awards={awards}
              selectedId={selectedId}
              onSelectAward={handleAwardSelection}
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
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search awards, descriptions..."
                      className="pl-10 py-3 md:py-4 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground shadow-sm transition-all duration-300"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex-shrink-0 flex gap-2">
                    {/* Filter button with popover for mobile */}
                    <Popover>
                      <PopoverTrigger asChild className="md:hidden">
                        <button className="flex items-center px-3 bg-card border border-border rounded-sm shadow-sm transition-all duration-200 hover:bg-muted">
                          <Filter className="w-4 h-4" />
                          <span className="sr-only">Filters</span>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-4 bg-card border border-border rounded-sm shadow-2xl">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold flex items-center">
                              <Filter className="w-4 h-4 mr-2 text-primary" />
                              Filter Awards
                            </h3>
                            {(activeFilters.difficulty.length < 3 || activeFilters.year.length > 0) && (
                              <button
                                onClick={resetFilters}
                                className="text-xs text-destructive hover:underline flex items-center gap-1"
                              >
                                <X className="w-3.5 h-3.5 mr-1" /> Clear All
                              </button>
                            )}
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="text-sm font-medium text-foreground">Difficulty</h4>
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => toggleDifficultyFilter("major")}
                                className={`px-3 py-2 rounded-sm text-xs font-medium flex items-center gap-1.5 transition-all duration-200
                                  ${activeFilters.difficulty.includes("major")
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-card text-muted-foreground border border-border hover:bg-muted"}`}
                              >
                                <Medal className="w-3.5 h-3.5" /> Major
                              </button>
                              
                              <button
                                onClick={() => toggleDifficultyFilter("honorable")}
                                className={`px-3 py-2 rounded-sm text-xs font-medium flex items-center gap-1.5 transition-all duration-200
                                  ${activeFilters.difficulty.includes("honorable")
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-card text-muted-foreground border border-border hover:bg-muted"}`}
                              >
                                <AwardIcon className="w-3.5 h-3.5" /> Honorable
                              </button>
                              
                              <button
                                onClick={() => toggleDifficultyFilter("notable")}
                                className={`px-3 py-2 rounded-sm text-xs font-medium flex items-center gap-1.5 transition-all duration-200
                                  ${activeFilters.difficulty.includes("notable")
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-card text-muted-foreground border border-border hover:bg-muted"}`}
                              >
                                <Star className="w-3.5 h-3.5" /> Notable
                              </button>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="text-sm font-medium text-foreground">Year</h4>
                            <div className="flex flex-wrap gap-2">
                              {availableYears.map(year => (
                                <button
                                  key={year}
                                  onClick={() => toggleYearFilter(year)}
                                  className={`px-3 py-2 rounded-sm text-xs font-medium flex items-center gap-1.5 transition-all duration-200
                                    ${activeFilters.year.includes(year)
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-card text-muted-foreground border border-border hover:bg-muted"}`}
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
                      <TabsList className="w-full bg-card border border-border shadow-sm rounded-sm">
                        <TabsTrigger 
                          value="grid" 
                          className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-sm transition-all duration-200"
                        >
                          <Grid className="w-4 h-4 sm:mr-1.5" />
                          <span className="hidden sm:inline">Grid</span>
                        </TabsTrigger>
                        <TabsTrigger 
                          value="timeline" 
                          className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-sm transition-all duration-200"
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
                  <div className="flex items-center text-muted-foreground mr-2 text-sm">
                    <Filter className="w-4 h-4 mr-1.5" />Filters:
                  </div>

                  {/* Difficulty filters */}
                  <button
                    onClick={() => toggleDifficultyFilter("major")}
                    className={`px-3 py-2 rounded-sm text-xs font-medium flex items-center gap-1.5 transition-all duration-200
                      ${activeFilters.difficulty.includes("major")
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground border border-border hover:bg-muted"}`}
                  >
                    <Medal className="w-3.5 h-3.5" /> Major
                  </button>

                  <button
                    onClick={() => toggleDifficultyFilter("honorable")}
                    className={`px-3 py-2 rounded-sm text-xs font-medium flex items-center gap-1.5 transition-all duration-200
                      ${activeFilters.difficulty.includes("honorable")
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground border border-border hover:bg-muted"}`}
                  >
                    <AwardIcon className="w-3.5 h-3.5" /> Honorable
                  </button>

                  <button
                    onClick={() => toggleDifficultyFilter("notable")}
                    className={`px-3 py-2 rounded-sm text-xs font-medium flex items-center gap-1.5 transition-all duration-200
                      ${activeFilters.difficulty.includes("notable")
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground border border-border hover:bg-muted"}`}
                  >
                    <Star className="w-3.5 h-3.5" /> Notable
                  </button>

                  {/* Year filters */}
                  {availableYears.map(year => (
                    <button
                      key={year}
                      onClick={() => toggleYearFilter(year)}
                      className={`px-3 py-2 rounded-sm text-xs font-medium flex items-center gap-1.5 transition-all duration-200
                          ${activeFilters.year.includes(year)
                            ? "bg-primary text-primary-foreground"
                            : "bg-card text-muted-foreground border border-border hover:bg-muted"}`}
                    >
                      <Calendar className="w-3.5 h-3.5" /> {year}
                    </button>
                  ))}

                  {/* Clear filters button */}
                  {(activeFilters.difficulty.length < 3 || activeFilters.year.length > 0 || searchQuery) && (
                    <button
                      onClick={resetFilters}
                      className="px-3 py-2 rounded-sm text-xs font-medium bg-destructive text-destructive-foreground flex items-center gap-1.5 transition-all duration-200"
                    >
                      <X className="w-3.5 h-3.5" /> Clear All
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Award Detail View (Inline for Desktop) */}
            <AnimatePresence>
              {selectedAward && !isMobile && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
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
                className="text-center py-16 md:py-20 bg-muted/40 rounded-sm border border-border"
              >
                <div className="max-w-md mx-auto">
                  <div className="relative mb-6">
                    <Trophy className="relative w-16 h-16 md:w-20 md:h-20 mx-auto text-muted-foreground" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3">
                    No awards found
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base mb-6 leading-relaxed">
                    Try adjusting your search terms or filters to discover more achievements.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-sm hover:opacity-90 transition-opacity
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

      {/* Award Detail Modal (For Mobile) */}
      <AnimatePresence>
        {isMobile && isDetailModalOpen && selectedAward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal} // Close on overlay click
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.90, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.90, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()} // Prevent close on content click
            >
              <div className="overflow-y-auto">
                <AwardDetail award={selectedAward} onClose={handleCloseModal} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
