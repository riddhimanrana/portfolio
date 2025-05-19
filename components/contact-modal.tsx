"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { 
  SiGithub, 
  SiDiscord, 
  SiYoutube 
} from 'react-icons/si'
import { Button } from "@/components/ui/button"

import { Copy, Check, ExternalLink, Mail } from "lucide-react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ContactMethod {
  name: string
  value: string
  icon: React.ReactNode
  link?: string
  color: string
  buttonHoverClass?: string
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState<string | null>(null)
  
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])
  
  // Disable scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])
  
  const contactMethods: ContactMethod[] = [
    {
      name: "GitHub",
      value: "@rrcoder0167",
      icon: <SiGithub className="h-5 w-5" />,
      link: "https://github.com/rrcoder0167",
      color: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800/80 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800",
      buttonHoverClass: "hover:bg-zinc-300 dark:hover:bg-zinc-700"
    },
    {
      name: "Discord",
      value: "@riddhimanrana",
      icon: <SiDiscord className="h-5 w-5" />,
      color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-100 hover:bg-indigo-200 dark:hover:bg-indigo-900/40",
      buttonHoverClass: "hover:bg-indigo-300 dark:hover:bg-indigo-800/40"
    },
    {
      name: "Email",
      value: "riddhiman.rana@gmail.com",
      icon: <Mail className="h-5 w-5" />,
      link: "mailto:riddhiman.rana@gmail.com",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-900/40",
      buttonHoverClass: "hover:bg-blue-300 dark:hover:bg-blue-800/40"
    },
    {
      name: "YouTube",
      value: "@riddhimanrana",
      icon: <SiYoutube className="h-5 w-5" />,
      link: "https://youtube.com/@riddhimanrana",
      color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-100 hover:bg-red-200 dark:hover:bg-red-900/40",
      buttonHoverClass: "hover:bg-red-300 dark:hover:bg-red-800/40"
    }
  ]
  
  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text)
    setCopied(name)
    setTimeout(() => setCopied(null), 2000)
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800">
              <div className="p-6 pb-0 flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Let's Connect</h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Reach out through any of these platforms
                  </p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <div className="p-6 grid gap-3">
                {contactMethods.map((method) => (
                  <div 
                    key={method.name}
                    className={`rounded-xl p-4 flex items-center justify-between transition-colors ${method.color}`}
                  >
                    <div className="flex items-center gap-4">
                      {method.icon}
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{method.value}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(method.value, method.name)}
                        className={`h-9 w-9 p-0 ${method.buttonHoverClass}`}
                      >
                        {copied === method.name ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      
                      {method.link && (
                        <a 
                          href={method.link} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`h-9 w-9 inline-flex items-center justify-center rounded-md transition-colors ${method.buttonHoverClass}`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button 
                  onClick={() => window.open('mailto:riddhiman.rana@gmail.com')}
                >
                  Send Email
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

