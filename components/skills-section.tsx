"use client";

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
          name: "WebSockets",
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
    <section className="pb-16 sm:pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4 border-b border-border pb-4 mb-8">
          <h2 className="text-2xl font-medium tracking-[-0.035em] text-foreground">
            Skills & Expertise
          </h2>
        </div>

        <div className="flex flex-col">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.name}
              className="group/row flex flex-col sm:grid sm:grid-cols-[16rem_1fr] sm:items-center border-b border-border/80 py-6 transition-all duration-300 hover:bg-muted/10"
            >
              <div className="flex items-center gap-4 select-none mb-4 sm:mb-0">
                <span className="font-mono text-2xs text-muted-foreground/50 tracking-wider">
                  0{categoryIndex + 1}
                </span>
                <div className="flex items-center gap-2.5 font-medium text-foreground">
                  <span className="text-muted-foreground group-hover/row:text-primary transition-colors duration-300">
                    {category.icon}
                  </span>
                  <span className="tracking-tight text-base">{category.name}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-2 gap-y-1.5">
                {category.skills.map((skill) => (
                  <Link
                    key={skill.name}
                    href={skill.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-muted-foreground rounded-full border border-border/40 bg-secondary/30 transition-all duration-200 hover:text-foreground hover:bg-secondary/70 hover:border-border hover:-translate-y-[0.5px]"
                  >
                    {skill.name}
                    <span className="opacity-0 translate-y-0.5 translate-x-[-2px] text-[10px] transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">
                      ↗
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
