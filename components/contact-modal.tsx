"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  X, 
  Mail, 
  MessageCircle, 
  Github, 
  Twitter, 
  Youtube, 
  Linkedin,
  Copy,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"

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
      name: "Discord",
      value: "riddhimanrana",
      icon: <MessageCircle className="h-5 w-5" />,
      color: "bg-indigo-500/20 text-indigo-500 dark:text-indigo-400 border-indigo-500/30"
    },
    {
      name: "Email",
      value: "riddhiman.rana@gmail.com",
      icon: <Mail className="h-5 w-5" />,
      link: "mailto:riddhiman.rana@gmail.com",
      color: "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30"
    },
    {
      name: "GitHub",
      value: "riddhimana",
      icon: <Github className="h-5 w-5" />,
      link: "https://github.com/riddhimana",
      color: "bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/30"
    },
    {
      name: "Twitter",
      value: "@riddhimana",
      icon: <Twitter className="h-5 w-5" />,
      link: "https://twitter.com/riddhimana",
      color: "bg-sky-500/20 text-sky-600 dark:text-sky-400 border-sky-500/30"
    },
    {
      name: "LinkedIn",
      value: "riddhiman-rana",
      icon: <Linkedin className="h-5 w-5" />,
      link: "https://linkedin.com/in/riddhiman-rana",
      color: "bg-blue-700/20 text-blue-700 dark:text-blue-400 border-blue-700/30"
    },
    {
      name: "YouTube",
      value: "RiddhimanRana",
      icon: <Youtube className="h-5 w-5" />,
      link: "https://youtube.com/c/RiddhimanRana",
      color: "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30"
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
                duration: 0.3,
                type: "spring",
                stiffness: 400,
                damping: 30,
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Header */}
              <div className="relative p-6 pb-0">
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
                <h2 className="text-2xl font-bold mb-1">Let's Connect</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  You can reach me through any of these platforms
                </p>
              </div>
              
              {/* Contact Methods */}
              <div className="p-6 grid gap-4">
                {contactMethods.map((method) => (
                  <div 
                    key={method.name}
                    className={`rounded-xl border p-4 flex items-center justify-between ${method.color}`}
                  >
                    <div className="flex items-center">
                      <div className="bg-white dark:bg-gray-800 p-2 rounded-lg mr-3 shadow-sm">
                        {method.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{method.name}</p>
                        <p className="text-sm opacity-80">{method.value}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-2"
                        onClick={() => copyToClipboard(method.value, method.name)}
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
                          className="inline-flex h-8 items-center rounded-md px-3 text-xs bg-white dark:bg-gray-800 shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          Open
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Footer */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="mr-2"
                >
                  Close
                </Button>
                <Button 
                  onClick={() => window.open('mailto:riddhiman.rana@gmail.com')}
                >
                  Email Me
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
