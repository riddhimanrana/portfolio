import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import projects from "@/data/projects.json";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ProjectsPage() {
  return (
    <main className="site-shell py-12 sm:py-16">
      <header className="mb-10 border-b border-border pb-9">
        <h1 className="page-title">Projects</h1>
      </header>

      <div className="border-y border-border">
        {projects.map((project, index) => (
          <div key={project.id}>
            {index > 0 && <Separator />}
            <article className="group grid gap-5 py-7 sm:grid-cols-[4rem_1fr_auto] sm:items-center">
              <div className="flex size-16 items-center justify-center overflow-hidden rounded-xl border border-border bg-secondary p-2.5">
                <Image
                  src={project.logo || "/avatar.png"}
                  alt={`${project.title} logo`}
                  width={48}
                  height={48}
                  className="max-h-full object-contain"
                />
              </div>

              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-xl font-medium tracking-tight">
                    {project.title}
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    {project.year}
                  </span>
                </div>
                <p className="mt-2 max-w-3xl leading-7 text-muted-foreground">
                  {project.tagline}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1 sm:justify-end">
                {project.repoLink && (
                  <Button variant="ghost" size="icon" asChild>
                    <Link
                      href={project.repoLink}
                      target="_blank"
                      aria-label={`${project.title} source`}
                    >
                      <Github />
                    </Link>
                  </Button>
                )}
                {project.projectLink && (
                  <Button variant="ghost" size="icon" asChild>
                    <Link
                      href={project.projectLink}
                      target="_blank"
                      aria-label={`Visit ${project.title}`}
                    >
                      <ArrowUpRight />
                    </Link>
                  </Button>
                )}
              </div>
            </article>
          </div>
        ))}
      </div>
    </main>
  );
}
