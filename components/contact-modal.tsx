"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SiGithub, SiDiscord, SiYoutube, SiLinkedin } from "react-icons/si";
import { Button } from "@/components/ui/button";

import { Copy, Check, ExternalLink, Mail } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContactMethod {
  name: string;
  value: string;
  icon: React.ReactNode;
  link?: string;
  color: string;
  buttonHoverClass?: string;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState<string | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Disable scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const contactMethods: ContactMethod[] = [
    {
      name: "GitHub",
      value: "@riddhimanrana",
      icon: <SiGithub className="h-5 w-5" />,
      link: "https://github.com/riddhimanrana",
      color: "bg-muted text-muted-foreground hover:bg-muted/80",
      buttonHoverClass: "hover:bg-muted",
    },
    {
      name: "Linkedin",
      value: "@riddhimanrana",
      icon: <SiLinkedin className="h-5 w-5" />,
      link: "https://www.linkedin.com/in/riddhimanrana/",
      color: "bg-muted text-muted-foreground hover:bg-muted/80",
      buttonHoverClass: "hover:bg-muted",
    },
    {
      name: "Discord",
      value: "@riddhimanrana",
      icon: <SiDiscord className="h-5 w-5" />,
      color: "bg-muted text-muted-foreground hover:bg-muted/80",
      buttonHoverClass: "hover:bg-muted",
    },
    {
      name: "Email",
      value: "contact@riddhimanrana.com",
      icon: <Mail className="h-5 w-5" />,
      link: "mailto:contact@riddhimanrana.com",
      color: "bg-muted text-muted-foreground hover:bg-muted/80",
      buttonHoverClass: "hover:bg-muted",
    },
    {
      name: "YouTube",
      value: "@riddhimanrana",
      icon: <SiYoutube className="h-5 w-5" />,
      link: "https://youtube.com/@riddhimanrana",
      color: "bg-muted text-muted-foreground hover:bg-muted/80",
      buttonHoverClass: "hover:bg-muted",
    },
  ];

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

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
            <div className="w-full max-w-2xl bg-card rounded-sm shadow-2xl border border-border">
              <div className="p-6 pb-0 flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">
                    Let's Connect
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Reach out through any of these platforms
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-sm hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              <div className="p-6 grid gap-3">
                {contactMethods.map((method) => (
                  <div
                    key={method.name}
                    className={`rounded-sm p-4 flex items-center justify-between transition-colors ${method.color}`}
                  >
                    <div className="flex items-center gap-4">
                      {method.icon}
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {method.value}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          copyToClipboard(method.value, method.name)
                        }
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
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button
                  onClick={() => window.open("mailto:riddhiman.rana@gmail.com")}
                >
                  Send Email
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
