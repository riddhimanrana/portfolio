"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { GraduationCap, Calendar, ExternalLink } from "lucide-react"

interface Education {
  school: string
  degree: string
  logo: string
  url?: string
  period: string
  current?: boolean
}

export function EducationSection() {
  const educationHistory: Education[] = [
    {
      school: "Dougherty Valley High School",
      degree: "High School Diploma",
      logo: "/images/dvhs-logo1.png",
      url: "https://dvhs.srvusd.net/",
      period: "2024 - 2028",
      current: true
    },
    {
      school: "Windemere Ranch Middle School",
      degree: "Middle School Diploma",
      logo: "/images/wrms-logo.png", 
      url: "https://wrms.srvusd.net/",
      period: "2021 - 2024"
    }
  ]

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center mb-12"
                >
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl shadow-sm mr-3">
                        <GraduationCap className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold">Education</h2>
                </motion.div>

                <div className="space-y-12">
                    {educationHistory.map((education, index) => (
                        <motion.div
                            key={education.school}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                            className="flex flex-col sm:flex-row gap-6 sm:gap-10 relative"
                        >
                           {/* Timeline connector */}
                            {/* {index < educationHistory.length - 1 && (
                                <div
                                    className="absolute left-10 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 hidden sm:block"
                                />
                            )} */}
                            {/* Logo */}
                            <div className="flex-none flex flex-col items-center order-1">
                                <div className="h-20 w-20 rounded-2xl bg-white dark:bg-gray-900 shadow-md border border-gray-100 dark:border-gray-700 p-2 flex items-center justify-center relative z-10">
                                    <Image
                                        src={education.logo || "/placeholder.svg"}
                                        alt={education.school}
                                        width={64}
                                        height={64}
                                        className="rounded-lg object-contain"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = '/placeholder.svg';
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 order-2">
                                <div
                                    className={`p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border ${
                                        education.current
                                            ? "border-blue-100 dark:border-blue-900/50 shadow-md"
                                            : "border-gray-100 dark:border-gray-800"
                                    }`}
                                >
                                    <div className="flex items-center mb-2">
                                        <Calendar className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {education.period}
                                        </span>
                                        {education.current && (
                                            <span className="ml-3 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                                                Current
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold mb-1 flex items-center">
                                        {education.school}
                                        {education.url && (
                                            <Link
                                                href={education.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 inline-flex"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </Link>
                                        )}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                                        {education.degree}
                                    </p>

                                    {education.current && (
                                        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                            <span className="font-medium">
                                                Freshman at Dougherty Valley High School
                                            </span>
                                            , 4.17w, 4.0uw GPA. Currently taking Honors Chem and
                                            Precalc.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  )
}
