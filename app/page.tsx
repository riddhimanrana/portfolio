"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Code,
  Briefcase,
  Cpu,
  Trophy,
  GraduationCap,
  ExternalLink,
  FileText,
  Globe,
} from "lucide-react";
import { SiGithub, SiYoutube } from "react-icons/si";
import Link from "next/link";
import Image from "next/image";
import { ContactModal } from "@/components/contact-modal";
import { AboutSection } from "@/components/about-section";
import { EducationSection } from "@/components/education-section";
import { SkillsSection } from "@/components/skills-section";
import { WorkExperience } from "@/components/work-experience";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Theme toggle handler
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Handle mounting for theme
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}

        <section id="about" className="py-8 sm:py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="flex flex-wrap items-center text-sm text-muted-foreground">
                <span>Founder of</span>
                <Link
                  href="https://lets-assist.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-primary transition-colors duration-100 group ml-2"
                >
                  <Image
                    src="/logos/lets-assist.png"
                    alt="Let's Assist Logo"
                    width={20}
                    height={20}
                    className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform"
                    sizes="20px"
                    quality={80}
                  />
                  <span className="inline-flex items-center">
                    Let's Assist
                    <span
                      className="overflow-hidden ml-0 w-0 opacity-0 transition-all duration-200 group-hover:ml-1 group-hover:w-3 group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </span>
                </Link>
                <span className="ml-2">and</span>
                <Link
                  href="https://orionlive.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-primary transition-colors duration-100 group ml-2"
                >
                  <Image
                    src="/logos/orion-live.png"
                    alt="Orion Live Logo"
                    width={20}
                    height={20}
                    className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform"
                    sizes="20px"
                    quality={80}
                  />
                  <span className="inline-flex items-center">
                    Orion Live
                    <span
                      className="overflow-hidden ml-0 w-0 opacity-0 transition-all duration-200 group-hover:ml-1 group-hover:w-3 group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </span>
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
              <span>Hi, I'm</span>
              <div className="rounded-2xl transition-transform hover:scale-105 duration-300">
                <Image
                  src="/profile.jpeg"
                  alt="Riddhiman Rana"
                  width={96} // Changed from 160
                  height={96} // Changed from 160
                  className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] -rotate-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.4)] border-2 border-white dark:border-gray-700"
                  sizes="(max-width: 640px) 40px, 60px"
                  quality={100}
                />
              </div>
              <span className="relative inline-flex items-center">
                <span className="block sm:hidden">Riddhiman</span>
                <span className="hidden sm:block">Riddhiman Rana</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary"></span>
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
                <Code className="inline-block mr-2 h-6 w-6 sm:h-8 sm:w-8 p-1 bg-muted rounded" />
                Full Stack Developer
              </span>
              <span>and</span>
              <span className="flex items-center">
                <Cpu className="inline-block mr-2 h-6 w-6 sm:h-8 sm:w-8 p-1 bg-muted rounded" />
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
                className="flex items-center text-sm bg-muted px-4 py-2 rounded-full hover:bg-accent transition-colors"
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                Sophomore at Dougherty Valley High School
              </Link>
                className="flex items-center text-sm bg-muted px-4 py-2 rounded-full"
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
                className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded transition-colors duration-200 flex items-center justify-center"
              >
                View Projects <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-secondary hover:bg-accent text-foreground rounded transition-colors duration-200 flex items-center justify-center border border-border"
              >
                Download Resume
                <FileText className="ml-2 h-4 w-4 opacity-80" />
              </Link>
              <button
                onClick={() => setContactModalOpen(true)}
                className="px-6 py-3 bg-secondary hover:bg-accent text-foreground rounded transition-colors duration-200 text-center"
              >
                Contact Me
              </button>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <AboutSection />

        {/* Work Experience Section */}
        <WorkExperience />

        {/* Education Section */}
        <EducationSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Projects Section */}
        <section
          id="projects"
          className="py-8 sm:py-12 my-6"
        >
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row md:items-center justify-between mb-8"
              >
                <div className="flex items-center mb-3 pt-2 md:mb-0">
                  <div className="p-2 bg-muted rounded mr-3">
                    <Briefcase className="h-8 w-8 " />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    Featured Projects
                  </h2>
                </div>
                {/* <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md">
                  A showcase of my recent work and personal projects
                </p> */}
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-card rounded border border-border card-hover overflow-hidden group p-6"
                >
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    Let&apos;s Assist
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded font-medium">
                      Next.js
                    </span>
                    <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded font-medium">
                      Typescript
                    </span>
                    <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded font-medium">
                      Supabase
                    </span>
                    <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded font-medium">
                      2025
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-5">
                    A comprehensive online volunteering platform that helps
                    organizations and high school CSF programs manage, track,
                    and coordinate volunteering activities for students and
                    communities.
                  </p>

                  <div className="flex items-center gap-5 mt-auto">
                    <Link
                      href="https://github.com/riddhimanrana/lets-assist"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 text-sm font-medium"
                    >
                      <SiGithub className="h-6 w-6" />
                      <span>Code</span>
                    </Link>
                    <Link
                      href="https://lets-assist.com"
                      className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 text-sm font-medium"
                    >
                      <Globe className="h-4.5 w-4.5" />
                      <span>Website</span>
                    </Link>
                  </div>
                </motion.div>

                {/* Orion Live Project */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card rounded border border-border card-hover overflow-hidden group p-6"
                >
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    Orion Live
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded font-medium">
                      Swift
                    </span>
                    <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded font-medium">
                      Apple MLX
                    </span>
                    <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded font-medium">
                      Tensorflow
                    </span>
                    <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded font-medium">
                      FastAPI
                    </span>
                    <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded font-medium">
                      Websocket
                    </span>
                    <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded font-medium">
                      2025
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-5">
                    Orion Live is the world’s first real-time visual
                    intelligence agent that truly remembers and understands the
                    world as it unfolds with a focus on privacy, speed, and
                    always-on context, in a hybrid edge-server architecture.
                  </p>

                  <div className="flex items-center gap-5 mt-auto">
                    <Link
                      href="https://github.com/riddhimanrana/orion"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 text-sm font-medium"
                    >
                      <SiGithub className="h-6 w-6" />
                      <span>Code</span>
                    </Link>
                    <Link
                      href="https://orionlive.ai"
                      className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 text-sm font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="h-4.5 w-4.5" />
                      <span>Website</span>
                    </Link>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex justify-center mt-10"
              >
                <Link
                  href="/projects"
                  className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded transition-colors duration-200 flex items-center justify-center group text-sm font-medium"
                >
                  View All Projects
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
    </div>
  );
}
