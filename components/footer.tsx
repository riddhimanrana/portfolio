"use client"
import React, { useEffect, useState } from "react"

const Footer: React.FC = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <footer className="pb-8">
      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Riddhiman Rana. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer