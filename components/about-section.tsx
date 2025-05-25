"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { User, Code, Lightbulb, Rocket } from "lucide-react"

export function AboutSection() {
  return (
    <section className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-900 rounded-3xl my-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center mb-12"
          >
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-xl shadow-sm mr-3">
              <User className="h-8 w-8 text-purple-500 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">About Me</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative aspect-square max-w-md mx-auto md:mx-0">
                <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/20 rounded-3xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-purple-500/10 dark:bg-purple-500/20 rounded-3xl transform -rotate-3"></div>
                <div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-gray-200 dark:border-gray-700">
                    <Image
                        src="/aboutme.jpeg"
                        alt="Riddhiman Rana"
                        width={459}   // Changed from 800, match container width
                        height={459}  // Changed from 800, maintain aspect ratio
                        priority
                        sizes="(max-width: 768px) 100vw, 459px"
                        className="object-cover"
                        loading="eager"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = '/profile.jpeg'
                        }}
                    />
                </div>

                {/* Coding badge */}
                <div className="absolute -right-5 -bottom-5 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg border border-gray-200 dark:border-gray-700">
                  <Code className="h-8 w-8 text-blue-500" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-xl sm:text-2xl font-bold">
                Ambitious high schooler with a passion for technology and entrepreneurship
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400">
                Hello! I'm Riddhiman, a freshman at Dougherty Valley High School with a deep love for coding and technology.
                My journey in programming began at the age of 7, when I first discovered the magic of bringing ideas to life through code.
              </p>
              
              <p className="text-gray-600 dark:text-gray-400">
                What started as simple games and animations has evolved into a passion for creating meaningful applications that solve real problems.
                I'm particularly interested in competitive programming, web development, and machine learning.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg mr-3">
                    <Lightbulb className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Innovative Thinker</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Always exploring new ideas and solutions</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg mr-3">
                    <Rocket className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Aspiring Entrepreneur</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Building projects with real-world impact</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
