"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
// import { useTheme } from "next-themes"
import { Code, Briefcase, Cpu, Trophy, FileText, ExternalLink } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  // const { theme, setTheme } = useTheme()

  // Theme toggle handler
  // const toggleTheme = () => {
  //   setTheme(theme === "dark" ? "light" : "dark")
  // }

  // Handle mounting for theme
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <section id="about" className="py-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                <Trophy className="inline-block mr-2 h-4 w-4" />
                USACO Gold Medalist
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            >
              Hey, I&apos;m{" "}
              <span className="relative inline-block">
                Riddhiman Rana
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 dark:bg-blue-400"></span>
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold mb-8 flex flex-wrap items-center gap-2"
            >
              And I&apos;m a{" "}
              <span className="flex items-center">
                <Code className="inline-block mr-2 h-8 w-8 p-1 bg-gray-200 dark:bg-gray-800 rounded-md" /> Web Developer
              </span>{" "}
              and{" "}
              <span className="flex items-center">
                <Cpu className="inline-block mr-2 h-8 w-8 p-1 bg-gray-200 dark:bg-gray-800 rounded-md" /> Competitive
                Programmer
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <div className="flex items-center text-sm bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
                <FileText className="mr-2 h-4 w-4" />
                Freshman at Dougherty Valley High School
              </div>
              <div className="flex items-center text-sm bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
                <Briefcase className="mr-2 h-4 w-4" />
                Web Developer
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/projects"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300 flex items-center"
              >
                View Projects <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="#contact"
                className="px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300"
              >
                Contact Me
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center mb-12"
            >
              <Briefcase className="h-10 w-10 p-2 bg-gray-200 dark:bg-gray-800 rounded-md mr-4" />
              <h2 className="text-3xl font-bold">Meet some of my Works</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Project 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg"
              >
                <div className="p-4 flex flex-wrap gap-2">
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full">
                    Web Development
                  </span>
                  <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 px-3 py-1 rounded-full">
                    React
                  </span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-full">
                    2023
                  </span>
                </div>
                <div className="h-64 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Project 1"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Personal Portfolio Website</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    A responsive portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and
                    dark mode support.
                  </p>
                  <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center">
                    View Project <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>

              {/* Project 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg"
              >
                <div className="p-4 flex flex-wrap gap-2">
                  <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-3 py-1 rounded-full">
                    Algorithm
                  </span>
                  <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 px-3 py-1 rounded-full">
                    C++
                  </span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-full">
                    2024
                  </span>
                </div>
                <div className="h-64 bg-gradient-to-br from-green-400 to-teal-500 relative overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Project 2"
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Competitive Programming Solutions</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    A collection of solutions to competitive programming problems from USACO, Codeforces, and other
                    platforms.
                  </p>
                  <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center">
                    View Project <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Riddhiman Rana</h3>
              <p className="text-gray-600 dark:text-gray-400">Web Developer & Competitive Programmer</p>
            </div>
            <div className="flex space-x-6">
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                GitHub
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                LinkedIn
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                Twitter
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                Email
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Riddhiman Rana. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
