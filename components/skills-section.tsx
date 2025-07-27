"use client";

import { motion } from "framer-motion";
import { Cpu, Globe, Server, Database, Terminal, Braces } from "lucide-react";
import Link from "next/link";

// Updated skill interface with link property
interface Skill {
  name: string;
  color?: string; // Optional color override
  link: string; // URL to the official website or documentation
}

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: Skill[];
  color: string;
}

export function SkillsSection() {
  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend",
      icon: <Globe className="h-5 w-5" />,
      color:
        "bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/20",
      skills: [
        { name: "React", link: "https://react.dev/" },
        { name: "Next.js", link: "https://nextjs.org/" },
        { name: "Astro", link: "https://astro.build/" },
        { name: "Flask", link: "https://flask.palletsprojects.com/" },
        { name: "Tailwind CSS", link: "https://tailwindcss.com/" },
        { name: "Framer Motion", link: "https://www.framer.com/motion/" },
        { name: "Shadcn UI", link: "https://ui.shadcn.com/" },
      ],
    },
    {
      name: "Backend & APIs",
      icon: <Server className="h-5 w-5" />,
      color:
        "bg-green-500/10 text-green-500 dark:text-green-400 border-green-500/20",
      skills: [
        { name: "Node.js", link: "https://nodejs.org/" },
        { name: "FastAPI", link: "https://fastapi.tiangolo.com/" },
        { name: "Django", link: "https://www.djangoproject.com/" },
        { name: "Flask", link: "https://flask.palletsprojects.com/" },
        {
          name: "WebSocket",
          link: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
        },
        { name: "Vercel", link: "https://vercel.com/" },
        { name: "Cloudflare", link: "https://www.cloudflare.com/" },
        { name: "Supabase", link: "https://supabase.com/" },
        { name: "Prisma", link: "https://www.prisma.io/" },
        { name: "Cloudinary", link: "https://cloudinary.com/" },
        { name: "Auth.js", link: "https://authjs.dev/" },
      ],
    },
    {
      name: "AI / Machine Learning",
      icon: <Cpu className="h-5 w-5" />,
      color:
        "bg-yellow-500/10 text-yellow-500 dark:text-yellow-400 border-yellow-500/20",
      skills: [
        { name: "Apple MLX", link: "https://mlx.ai/" },
        {
          name: "CoreML",
          link: "https://developer.apple.com/documentation/coreml",
        },
        { name: "TensorFlow", link: "https://www.tensorflow.org/" },
        { name: "PyTorch", link: "https://pytorch.org/" },
        { name: "Tesseract.js", link: "https://tesseract.projectnaptha.com/" },
      ],
    },
    {
      name: "Databases",
      icon: <Database className="h-5 w-5" />,
      color:
        "bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/20",
      skills: [
        { name: "Supabase", link: "https://supabase.com/" },
        { name: "MongoDB", link: "https://www.mongodb.com/" },
        { name: "PostgreSQL", link: "https://www.postgresql.org/" },
        { name: "Firebase", link: "https://firebase.google.com/" },
        { name: "SQL", link: "https://www.w3schools.com/sql/" },
      ],
    },
    {
      name: "Programming Languages",
      icon: <Braces className="h-5 w-5" />,
      color:
        "bg-purple-500/10 text-purple-500 dark:text-purple-400 border-purple-500/20",
      skills: [
        { name: "Swift", link: "https://swift.org/" },
        { name: "C++", link: "https://isocpp.org/" },
        { name: "Java", link: "https://www.java.com/" },
        {
          name: "JavaScript",
          link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        },
        { name: "TypeScript", link: "https://www.typescriptlang.org/" },
        { name: "Python", link: "https://www.python.org/" },
      ],
    },
    {
      name: "Developer Tools",
      icon: <Terminal className="h-5 w-5" />,
      color: "bg-red-500/10 text-red-500 dark:text-red-400 border-red-500/20",
      skills: [
        { name: "Git", link: "https://git-scm.com/" },
        { name: "Docker", link: "https://www.docker.com/" },
        { name: "VS Code", link: "https://code.visualstudio.com/" },
        { name: "Linux", link: "https://www.linux.org/" },
        { name: "GitHub", link: "https://github.com/" },
        { name: "Postman", link: "https://www.postman.com/" },
        { name: "Figma", link: "https://www.figma.com/" },
      ],
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
            className="flex items-center mb-12"
          >
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-xl shadow-sm mr-3">
              <Cpu className="h-8 w-8 text-green-500 dark:text-green-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Skills & Expertise
            </h2>
          </motion.div>

          {/* Detailed Categories Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
              >
                <div
                  className={`px-6 py-4 border-b ${category.color.replace("bg-", "border-")}`}
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${category.color} mr-3`}>
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        }}
                      >
                        <Link
                          href={skill.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-sm cursor-pointer hover:translate-y-[-2px] hover:scale-105 transform"
                        >
                          {skill.name}
                        </Link>
                      </motion.div>
                    ))}
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
