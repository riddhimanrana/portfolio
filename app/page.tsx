"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Code, Briefcase, Cpu, Trophy, GraduationCap, ExternalLink } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { ContactModal } from "@/components/contact-modal"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [contactModalOpen, setContactModalOpen] = useState(false)

  // Theme toggle handler
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Handle mounting for theme
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Contact Modal */}
      <ContactModal 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
      />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Hero Section */}
        <section id="about" className="py-8 sm:py-16">
          <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400">
          <span>Founder of</span>
          <Link 
            href="https://lets-assist.com" 
            target="_blank"
            rel="noopener noreferrer" 
            className="flex items-center hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-100 group ml-2"
          >
            <Image
            src="/letsassist-logo.png"
            alt="Let's Assist Logo"
            width={36}
            height={36}
            className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform"
            />
            <span className="inline-flex items-center">
            Let's Assist
            <ExternalLink className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
          </Link>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 flex flex-wrap items-center gap-2"
        >
          <span>Hey, I'm</span>
          <div className="rounded-2xl transition-transform hover:scale-105 duration-300">
            <Image 
              src="/profile.jpeg" 
              alt="Riddhiman Rana" 
              width={48} 
              height={48} 
              className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] -rotate-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.4)] border-2 border-white dark:border-gray-700"
            />
          </div>
          <span className="relative inline-flex items-center">
            <span className="block sm:hidden">Riddhiman</span>
            <span className="hidden sm:block">Riddhiman Rana</span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 dark:bg-blue-400"></span>
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-3xl md:text-4xl font-medium sm:font-semibold mb-6 flex flex-wrap items-center gap-2"
        >
          <span>And I'm a</span>
          <span className="flex items-center">
            <Code className="inline-block mr-2 h-6 w-6 sm:h-8 sm:w-8 p-1 bg-gray-200 dark:bg-gray-800 rounded-md" /> 
            Web Developer
          </span>
          <span>and</span>
          <span className="flex items-center">
            <Cpu className="inline-block mr-2 h-6 w-6 sm:h-8 sm:w-8 p-1 bg-gray-200 dark:bg-gray-800 rounded-md" /> 
            Competitive Programmer
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden sm:flex flex-col sm:flex-row gap-3 mb-6"
        >
          <Link 
            href="https://dvhs.srvusd.net/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-sm bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            Freshman at Dougherty Valley High School
          </Link>
          <div className="flex items-center text-sm bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
            <Trophy className="mr-2 h-4 w-4" />
            USACO Gold Contestant
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link
            href="/projects"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300 flex items-center justify-center"
          >
            View Projects <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
          <button
            onClick={() => setContactModalOpen(true)}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md transition-colors duration-300 text-center"
          >
            Contact Me
          </button>
        </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-8 sm:py-16 bg-gray-50 dark:bg-gray-900 rounded-3xl">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center mb-8"
              >
          <div className="p-2 bg-gray-200 dark:bg-gray-800 rounded-xl shadow-md mr-3">
            <Briefcase className="h-8 w-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold">Meet some of my work</h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-950 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="p-4 flex flex-wrap gap-2">
              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full">
                UI Design
              </span>
              <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 px-3 py-1 rounded-full">
                Framer Development
              </span>
              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-full">
                2025
              </span>
            </div>
            <div className="h-64 px-6 relative overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Tesla Landing Page"
                width={600}
                height={400}
                className="object-cover w-full h-full rounded-2xl "
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Tesla Landing Page</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Tesla is a pioneering electric vehicle and clean energy company founded by Elon Musk, known for its high-performance electric cars.
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
            className="bg-white dark:bg-gray-950 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="p-4 flex flex-wrap gap-2">
              <span className="text-xs bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-100 px-3 py-1 rounded-full">
                Product Design
              </span>
              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-full">
                2024
              </span>
            </div>
            <div className="h-64 px-6 relative overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Grok Dashboard"
                width={600}
                height={400}
                className="object-cover rounded-2xl w-full h-full"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Grok Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Grok is a generative AI chatbot developed by Elon Musk's company, xAI. Launched in November of 2023, Grok is designed to be a more conversational and creative AI assistant.
              </p>
              <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center">
                View Project <ExternalLink className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </motion.div>
              </div>
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
              <button
                onClick={() => setContactModalOpen(true)}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                Contact
              </button>
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
