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
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <a rel="me" href="https://mastodon.online/@rrcoder0167">
          Mastodon
        </a>
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
                    src="/logos/lets-assist.png"
                    alt="Let's Assist Logo"
                    width={20} // Changed from 36
                    height={20} // Changed from 36
                    className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform"
                    sizes="20px"
                    quality={80}
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
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 flex items-center justify-center"
              >
                View Projects <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
              <button
                onClick={() => setContactModalOpen(true)}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl transition-colors duration-300 text-center"
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
          className="py-8 sm:py-12 bg-gray-50 dark:bg-gray-900 rounded-3xl my-6"
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
                  <div className="p-2 bg-gray-100 dark:bg-gray-600/20 rounded-xl shadow-sm mr-3">
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
                  className="bg-white dark:bg-gray-950 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] border border-gray-100 dark:border-gray-800 group p-6"
                >
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                    Let&apos;s Assist
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 px-2.5 py-1 rounded-full font-medium">
                      Next.js
                    </span>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-2.5 py-1 rounded-full font-medium">
                      Typescript
                    </span>
                    <span className="text-xs bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 px-2.5 py-1 rounded-full font-medium">
                      Supabase
                    </span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2.5 py-1 rounded-full font-medium">
                      2025
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-5">
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
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all inline-flex items-center gap-1.5 text-sm font-medium group-hover:translate-x-0.5 "
                    >
                      <SiGithub className="h-6 w-6" />
                      <span>Code</span>
                    </Link>
                    <Link
                      href="https://lets-assist.com"
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400  inline-flex items-center gap-1.5 text-sm font-medium group-hover:translate-x-0.5 transition-all"
                    >
                      <Globe className="h-4.5 w-4.5" />
                      <span>Website</span>
                    </Link>
                  </div>
                </motion.div>

                {/* Grok Dashboard Project */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white dark:bg-gray-950 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] border border-gray-100 dark:border-gray-800 group p-6"
                >
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                    PyEcoHome Energy Tracker
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-cyan-100 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-200 px-2.5 py-1 rounded-full font-medium">
                      Python
                    </span>
                    <span className="text-xs bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 px-2.5 py-1 rounded-full font-medium">
                      Tkinter
                    </span>
                    <span className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 px-2.5 py-1 rounded-full font-medium">
                      Pandas
                    </span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2.5 py-1 rounded-full font-medium">
                      2022
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-5">
                    A home energy tracker built using python machine learning
                    designed to identify patterns, provide insights, and suggest
                    personalized recommendations to reduce consumption and
                    costs.
                  </p>

                  <div className="flex items-center gap-5 mt-auto">
                    <Link
                      href="https://github.com/riddhimanrana/PyEcoHome-Energy-Tracker"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all inline-flex items-center gap-1.5 text-sm font-medium group-hover:translate-x-0.5"
                    >
                      <SiGithub className="h-6 w-6" />
                      <span>Code</span>
                    </Link>
                    <Link
                      href="https://youtu.be/F_EsDD1HGjE?si=XhfiDFwxzMGKyfAV"
                      className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-all inline-flex items-center gap-1.5 text-sm font-medium group-hover:translate-x-0.5"
                    >
                      <SiYoutube className="h-6 w-6" />
                      <span>Project Demo</span>
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
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 flex items-center justify-center group text-sm font-medium"
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
