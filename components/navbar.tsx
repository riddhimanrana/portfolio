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
  const { resolvedTheme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) return null

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Awards", path: "/awards" },
  ]

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path)

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-background border-b border-border transition-shadow duration-200 ${
          scrolled ? "shadow-sm shadow-black/[0.06] dark:shadow-black/20" : ""
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative h-14 flex items-center">

          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-2 group">
            <Image
              src="/avatar.png"
              alt="Riddhiman Rana"
              width={26}
              height={26}
              loading="eager"
              decoding="async"
              className="rounded-sm"
            />
            <span className="font-semibold text-base tracking-snug text-foreground group-hover:text-primary transition-colors duration-150">
              riddhiman
            </span>
          </Link>

          {/* Desktop nav — centered */}
          <nav className="hidden md:flex items-center gap-1 absolute inset-x-0 justify-center z-0">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`relative px-3 py-1.5 text-sm transition-colors duration-150 ${
                  isActive(item.path)
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right: theme toggle + mobile trigger */}
          <div className="flex items-center gap-1 ml-auto z-10">
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-150"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-150"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={16} strokeWidth={1.75} /> : <Menu size={16} strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="md:hidden fixed inset-x-0 top-14 bg-background border-b border-border z-40"
          >
            <nav className="flex flex-col px-4 py-3 gap-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-2 text-sm rounded transition-colors ${
                    isActive(item.path)
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
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
