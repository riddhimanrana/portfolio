"use client";

import { useMemo, useState } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import projectsData from "@/data/projects.json";
import { GitHubIcon } from "@/components/brand-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Project } from "@/types/project";

export default function ProjectsPage() {
  const projects = useMemo(() => {
    return [...(projectsData as Project[])].sort(
      (a, b) => Number(b.year) - Number(a.year)
    );
  }, []);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="site-shell py-12 sm:py-16">
      <header className="mb-8">
        <h1 className="page-title">Projects</h1>
      </header>

      <div className="border-t border-border">
        {projects.map((project, index) => (
          <div key={project.id}>
            {index > 0 && <Separator />}
            <article 
              onClick={() => setSelectedProject(project)}
              className="group grid gap-5 py-7 sm:grid-cols-[4rem_1fr_auto] sm:items-center cursor-pointer transition-all hover:bg-muted/30 -mx-4 px-4 rounded-xl"
            >
              <div className="flex size-16 w-16 h-16 shrink-0 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-secondary p-2.5 transition-transform duration-200 group-hover:scale-105">
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
                  <h2 className="text-xl font-medium tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    {project.year}
                  </span>
                </div>
                <p className="mt-2 max-w-3xl leading-7 text-muted-foreground text-sm">
                  {project.tagline}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} className="border border-border/80 bg-secondary/30 text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/60 text-[10px] px-2.5 py-0.5 rounded-full font-medium shadow-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:justify-end" onClick={(e) => e.stopPropagation()}>
                {project.repoLink && (
                  <Button variant="ghost" size="icon" asChild className="rounded-full text-muted-foreground hover:text-foreground">
                    <Link
                      href={project.repoLink}
                      target="_blank"
                      aria-label={`${project.title} source`}
                    >
                      <GitHubIcon className="size-4" />
                    </Link>
                  </Button>
                )}
                {project.projectLink && (
                  <Button variant="ghost" size="icon" asChild className="rounded-full text-muted-foreground hover:text-foreground">
                    <Link
                      href={project.projectLink}
                      target="_blank"
                      aria-label={`Visit ${project.title}`}
                    >
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </article>
          </div>
        ))}
      </div>

      <Dialog
        open={Boolean(selectedProject)}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
      >
        {selectedProject && (
          <DialogContent className="flex max-h-[88svh] w-[min(92vw,48rem)] flex-col overflow-hidden p-0 sm:max-w-3xl">
            <div className="flex min-h-0 flex-1 flex-col">
              <DialogHeader className="shrink-0 px-6 pt-6 pr-12 text-left">
                <div className="mb-2 flex items-center gap-3">
                  <div className="logo-tile size-12 w-12 h-12 aspect-square rounded-xl p-2 bg-card border border-border shrink-0 flex-shrink-0">
                    <Image
                      src={selectedProject.logo || "/avatar.png"}
                      alt=""
                      width={40}
                      height={40}
                      className="max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl tracking-[-0.035em]">
                      {selectedProject.title}
                    </DialogTitle>
                    <DialogDescription>{selectedProject.tagline}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6">
                {selectedProject.image && (
                  <div className="relative mt-2 aspect-video overflow-hidden rounded-2xl border border-border bg-secondary">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 90vw, 720px"
                    />
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <Badge key={tag} className="rounded-full border border-border/80 bg-secondary/30 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground shadow-sm transition-colors hover:bg-secondary/60 hover:text-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-4 text-sm leading-7 text-muted-foreground sm:text-base">
                  {selectedProject.description.split("\n\n").map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <DialogFooter className="shrink-0 gap-2 border-t border-border px-6 py-4 sm:justify-start">
                {selectedProject.projectLink && (
                  <Button asChild>
                    <Link href={selectedProject.projectLink} target="_blank">
                      Visit project
                      <ExternalLink data-icon="inline-end" />
                    </Link>
                  </Button>
                )}
                {selectedProject.repoLink && (
                  <Button variant="outline" asChild>
                    <Link href={selectedProject.repoLink} target="_blank">
                      <GitHubIcon />
                      View code
                    </Link>
                  </Button>
                )}
              </DialogFooter>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
}
