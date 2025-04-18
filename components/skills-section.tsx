"use client"

import { motion } from "framer-motion"
import { Cpu, Globe, Server, Database, Terminal, Braces } from "lucide-react"

interface Skill {
  name: string
  level: number // 1-5
}

interface SkillCategory {
  name: string
  icon: React.ReactNode
  skills: Skill[]
  color: string
}

export function SkillsSection() {
  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend",
      icon: <Globe className="h-5 w-5" />,
      color: "bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/20",
      skills: [
        { name: "React", level: 5 },
        { name: "Next.js", level: 5 },
        { name: "TypeScript", level: 5 },
        { name: "Tailwind CSS", level: 5 },
        { name: "Framer Motion", level: 4 }
      ]
    },
    {
      name: "Backend",
      icon: <Server className="h-5 w-5" />,
      color: "bg-green-500/10 text-green-500 dark:text-green-400 border-green-500/20",
      skills: [
        { name: "Node.js", level: 4 },
        { name: "Express", level: 4 },
        { name: "Python", level: 5 },
        { name: "FastAPI", level: 4 },
        { name: "GraphQL", level: 3 }
      ]
    },
    {
      name: "Databases",
      icon: <Database className="h-5 w-5" />,
      color: "bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/20",
      skills: [
        { name: "MongoDB", level: 4 },
        { name: "PostgreSQL", level: 4 },
        { name: "Redis", level: 3 },
        { name: "Firestore", level: 4 }
      ]
    },
    {
      name: "Competitive Programming",
      icon: <Braces className="h-5 w-5" />,
      color: "bg-purple-500/10 text-purple-500 dark:text-purple-400 border-purple-500/20",
      skills: [
        { name: "C++", level: 5 },
        { name: "Java", level: 4 },
        { name: "Algorithms", level: 4 },
        { name: "Data Structures", level: 5 },
        { name: "Problem Solving", level: 5 }
      ]
    },
    {
      name: "Developer Tools",
      icon: <Terminal className="h-5 w-5" />,
      color: "bg-red-500/10 text-red-500 dark:text-red-400 border-red-500/20",
      skills: [
        { name: "Git", level: 4 },
        { name: "Docker", level: 3 },
        { name: "VS Code", level: 5 },
        { name: "Linux", level: 4 }
      ]
    }
  ]

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
            <h2 className="text-2xl sm:text-3xl font-bold">Skills & Expertise</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div 
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
              >
                <div className={`px-6 py-4 border-b ${category.color.replace("bg-", "border-")}`}>
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${category.color} mr-3`}>
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div 
                      key={skill.name} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.2 }}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {skill.level === 5 ? "Expert" :
                           skill.level === 4 ? "Advanced" :
                           skill.level === 3 ? "Intermediate" :
                           skill.level === 2 ? "Basic" : "Beginner"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level * 20}%` }}
                          transition={{ duration: 0.5, delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3 }}
                          className={`h-2 rounded-full ${
                            skill.level >= 5 ? "bg-gradient-to-r from-green-400 to-green-500" :
                            skill.level >= 4 ? "bg-gradient-to-r from-blue-400 to-blue-500" :
                            skill.level >= 3 ? "bg-gradient-to-r from-cyan-400 to-cyan-500" :
                            "bg-gradient-to-r from-gray-400 to-gray-500"
                          }`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
