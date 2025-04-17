"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, Menu, X } from 'lucide-react'
import { usePathname } from "next/navigation"
import Image from "next/image"

export default function NavBar() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Theme toggle handler
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Handle mounting for theme
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Awards", path: "/awards" },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative h-16 flex items-center">
          {/* Logo (left) */}
          
          <Link href="/" className="relative z-10 flex items-center">
            <Image
              src="/avatar_logo.jpeg"      // put your avatar file in /public/logo.png
              alt="riddhiman logo"
              width={30}
              height={30}
              className="rounded-full"
            />
            <span className="ml-2 font-bold text-xl">riddhiman</span>
          </Link>

          {/* Desktop Navigation (always centered, independent of logo width) */}
          <nav className="hidden md:flex space-x-8 absolute inset-x-0 justify-center z-0">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`transition-colors ${
                  pathname === item.path ||
                  (item.path !== "/" && pathname.startsWith(item.path))
                    ? "text-blue-600 dark:text-blue-400 font-medium"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle and Mobile Menu (right) */}
          <div className="flex items-center space-x-4 ml-auto z-10">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-16 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 z-40"
          >
            <nav className="flex flex-col space-y-4 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`py-2 transition-colors ${
                    pathname === item.path || 
                    (item.path !== "/" && pathname.startsWith(item.path))
                      ? "text-blue-600 dark:text-blue-400 font-medium"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
