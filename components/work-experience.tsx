"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, ExternalLink, Briefcase, Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import experienceData from '@/data/experience.json'

interface Experience {
  title: string
  subtext: string
  logo: string
  date: string
  details: string
  link?: string
}

export function WorkExperience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section id="experience" className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center mb-8"
        >
          <div className="p-2 bg-muted rounded mr-3">
            <Briefcase className="h-8 w-8 text-foreground" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold">Work Experience</h2>
        </motion.div>

        <div className="space-y-4">
          {experienceData.map((experience: Experience, index: number) => (
            <motion.div
              key={`${experience.title}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="border border-border rounded overflow-hidden bg-card shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div
                onClick={() => toggleExpand(index)}
                className={`flex items-center p-3 sm:p-4 cursor-pointer transition-all duration-300 ${
                  expandedIndex === index 
                  ? 'bg-muted/50'
                  : 'hover:bg-muted/30'
                }`}
              >
                {/* Logo */}
                <div className="h-10 w-10 sm:h-12 sm:w-12 relative flex-shrink-0 rounded-full border border-border overflow-hidden bg-background shadow-sm">
                  <Image
                    src={experience.logo}
                    alt={`${experience.title} logo`}
                    width={48}
                    height={48}
                    quality={80}
                    sizes="(max-width: 640px) 40px, 48px"
                    className="object-contain p-1.5 rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                </div>

                {/* Content */}
                <div className="ml-3 flex-grow overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="text-base font-semibold truncate">
                      {experience.title}
                    </h3>
                    <div className="flex items-center text-xs text-muted-foreground bg-muted rounded-full px-2.5 py-0.5 w-fit">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span className="whitespace-nowrap">{experience.date}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
                    {experience.subtext}
                  </p>
                </div>

                {/* Expand/collapse button */}
                <button 
                  className={`ml-3 p-1.5 rounded-full focus:outline-none flex-shrink-0 transition-colors duration-300 ${
                    expandedIndex === index
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted text-muted-foreground'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(index);
                  }}
                  aria-label={expandedIndex === index ? "Collapse details" : "Expand details"}
                >
                  {expandedIndex === index ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Expandable details section */}
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 sm:p-4 pt-4 border-t border-border bg-muted/20">
                      <div className="prose-sm max-w-none">
                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                          {experience.details}
                        </p>
                      </div>
                      
                      {experience.link && (
                        <Link
                          href={experience.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center text-xs font-medium text-primary hover:text-primary/80 transition-colors group"
                        >
                          Visit website
                          <ExternalLink className="ml-1 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}