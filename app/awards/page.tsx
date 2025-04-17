"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { AwardTimeline } from "@/components/award-timeline"
import type { Award } from "@/types/award"
import awards from "@/data/awards.json"

export default function AwardsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredAwards, setFilteredAwards] = useState<Award[]>([])

  useEffect(() => {
    // Filter awards based on search query
    const filtered = awards.filter((award) => {
      const searchContent = `${award.name} ${award.description} ${award.detailedDescription}`.toLowerCase()
      return searchContent.includes(searchQuery.toLowerCase())
    })

    // Sort by date (newest first)
    const sorted = [...filtered].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    setFilteredAwards(sorted)
  }, [searchQuery])

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pb-20">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Awards & Achievements</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A timeline of recognitions and accomplishments throughout my academic and professional journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search awards..."
              className="pl-10 py-6 bg-gray-800/50 border-gray-700 rounded-xl text-gray-100 placeholder:text-gray-500 focus-visible:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {filteredAwards.length > 0 ? (
          <AwardTimeline awards={filteredAwards} />
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No awards found matching your search.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
