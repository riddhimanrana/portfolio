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
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Theme toggle handler
  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
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
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative h-16 flex items-center">
          {/* Logo (left) */}
          
          <Link href="/" className="relative z-10 flex items-center group">
            <Image
              src="/avatar.png"      // put your avatar file in /public/logo.png
              alt="riddhiman logo"
              width={30}
              height={30}
              loading="eager"
              decoding="async"
            />
            <span className="ml-2 font-semibold text-xl tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">riddhiman</span>
          </Link>

          {/* Desktop Navigation (always centered, independent of logo width) */}
          <nav className="hidden md:flex space-x-1 absolute inset-x-0 justify-center z-0">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === item.path ||
                  (item.path !== "/" && pathname.startsWith(item.path))
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle and Mobile Menu (right) */}
          <div className="flex items-center space-x-2 ml-auto z-10">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-200 text-gray-600 dark:text-gray-400"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
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
