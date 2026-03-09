"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Calendar, ExternalLink } from "lucide-react";

interface Education {
  school: string;
  degree: string;
  logo: string;
  url?: string;
  period: string;
  current?: boolean;
  description?: string; // Added description field
}

export function EducationSection() {
  const educationHistory: Education[] = [
    {
      school: "Dougherty Valley High School",
      degree: "High School Diploma",
      logo: "/logos/dvhs.png",
      url: "https://dvhs.srvusd.net/",
      period: "2024 - 2028",
      current: true,
    },
    {
      school: "Windemere Ranch Middle School",
      degree: "Middle School Diploma",
      logo: "/logos/wrms.png",
      url: "https://wrms.srvusd.net/",
      period: "2021 - 2024",
      description:
        "President's Award for Educational Excellence, CJSF Honors, 3.97uw GPA.", // Added description
    },
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center mb-8 sm:mb-12"
          >
            <div className="p-2 bg-muted rounded mr-3">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-foreground" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">Education</h2>
          </motion.div>

          {/* Mobile Layout (hidden on sm and above) */}
          <div className="space-y-8 sm:hidden">
            {educationHistory.map((education, index) => (
              <motion.div
                key={`mobile-${education.school}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="relative"
              >
                {/* Content */}
                <div
                  className={`p-4 rounded bg-card border ${
                    education.current
                      ? "border-primary/20 shadow-sm"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-center flex-wrap gap-2 mb-2">
                    <span className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                      {education.period}
                    </span>
                    {education.current && (
                      <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                        Current
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-1">
                    {/* Logo - inside the card next to title on mobile */}
                    <div className="h-10 w-10 rounded-lg bg-background border border-border p-1 flex items-center justify-center flex-shrink-0">
                      <Image
                        src={education.logo || "/placeholder.svg"}
                        alt={education.school}
                        width={40}
                        height={40}
                        className="object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    </div>

                    <h3 className="text-lg font-bold flex items-center flex-1">
                      {education.school}
                      {education.url && (
                        <Link
                          href={education.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-muted-foreground/50 hover:text-muted-foreground inline-flex"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-sm">
                    {education.degree}
                  </p>

                  {education.current && (
                    <div className="mt-3 text-xs text-muted-foreground">
                      <span className="font-medium">
                        Sophomore at Dougherty Valley High School
                      </span>
                      , Played in School Track & Field team in Sprints for 24-25
                      Season. Honors/AP Coursework: AP Calc AB, AP CS A, Honors
                      Physics, Honors Chem
                    </div>
                  )}
                  {education.description && !education.current && (
                    <div className="mt-3 text-xs text-muted-foreground">
                      {education.description}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Layout (hidden on xs, visible from sm onwards) */}
          <div className="hidden sm:block space-y-12">
            {educationHistory.map((education, index) => (
              <motion.div
                key={`desktop-${education.school}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="flex flex-row gap-10 relative"
              >
                {/* Logo - outside the card on desktop */}
                <div className="flex-none flex flex-col items-center">
                  <div className="h-20 w-20 rounded bg-card border border-border p-2 flex items-center justify-center relative z-10">
                    <Image
                      src={education.logo || "/placeholder.svg"}
                      alt={education.school}
                      width={80}
                      height={80}
                      quality={75}
                      className="rounded-lg object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div
                    className={`p-6 rounded bg-card border ${
                      education.current
                        ? "border-primary/20 shadow-sm"
                        : "border-border"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {education.period}
                      </span>
                      {education.current && (
                        <span className="ml-3 px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                          Current
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold mb-1 flex items-center">
                      {education.school}
                      {education.url && (
                        <Link
                          href={education.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-muted-foreground/50 hover:text-muted-foreground inline-flex"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      )}
                    </h3>

                    <p className="text-muted-foreground mb-2">
                      {education.degree}
                    </p>

                    {education.current && (
                      <div className="mt-4 text-sm text-muted-foreground">
                        <span className="font-medium">
                          Sophomore at Dougherty Valley High School
                        </span>
                        , Honors/AP Coursework: AP Calc AB, AP CS A, Honors
                        Physics, Honors Chem. Junior Varsity Athlete on Track &
                        Field team for 24-25 season.
                      </div>
                    )}
                    {education.description && !education.current && (
                      <div className="mt-4 text-sm text-muted-foreground">
                        {education.description}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
