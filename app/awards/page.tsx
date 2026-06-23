"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Award as AwardIcon,
  CalendarDays,
  ExternalLink,
  Eye,
  Medal,
  Search,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import awardsData from "@/data/awards.json";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import type { Award, AwardDifficulty } from "@/types/award";

type DifficultyFilter = "all" | AwardDifficulty;

const awards = [...(awardsData as Award[])].sort(
  (a, b) => parseAwardDate(b.date).getTime() - parseAwardDate(a.date).getTime()
);

const difficultyMeta = {
  major: { label: "Major", icon: Medal },
  notable: { label: "Notable", icon: Star },
  honorable: { label: "Honorable", icon: AwardIcon },
} satisfies Record<AwardDifficulty, { label: string; icon: typeof Medal }>;

function parseAwardDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatAwardDate(date: string, includeYear = true) {
  return parseAwardDate(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(includeYear ? { year: "numeric" } : {}),
  });
}

export default function AwardsPage() {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [selectedId, setSelectedId] = useState(awards[0]?.id ?? "");
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      if (id) {
        const exists = awards.some((a) => a.id === id);
        if (exists) {
          setSelectedId(id);
          if (window.innerWidth < 1024) {
            setMobileDetailOpen(true);
          } else {
            setTimeout(() => {
              const el = document.getElementById(`award-${id}`);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }, 150);
          }
        }
      }
    }
  }, []);

  const filteredAwards = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return awards.filter((award) => {
      const matchesDifficulty =
        difficulty === "all" || award.difficulty === difficulty;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${award.name} ${award.description} ${award.detailedDescription}`
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesDifficulty && matchesQuery;
    });
  }, [query, difficulty]);

  const groupedAwards = useMemo(() => {
    return filteredAwards.reduce<Record<string, Award[]>>((groups, award) => {
      const year = parseAwardDate(award.date).getFullYear().toString();
      groups[year] ??= [];
      groups[year].push(award);
      return groups;
    }, {});
  }, [filteredAwards]);

  const years = Object.keys(groupedAwards).sort(
    (a, b) => Number(b) - Number(a)
  );
  const selectedAward =
    filteredAwards.find((award) => award.id === selectedId) ??
    filteredAwards[0] ??
    null;

  const selectAward = (award: Award, mobile = false) => {
    setSelectedId(award.id);
    if (mobile) setMobileDetailOpen(true);
  };

  return (
    <main className="site-shell py-12 sm:py-16">
      <header className="grid gap-8 border-b border-border/80 pb-9 sm:grid-cols-[1fr_auto] sm:items-end">
        <h1 className="page-title">Awards</h1>
        <div className="grid grid-cols-3 gap-8">
          {(["major", "honorable", "notable"] as AwardDifficulty[]).map(
            (level) => (
              <div key={level}>
                <p
                  className={cn(
                    "text-xl font-medium",
                    level === "major" && "luxury-gold-text",
                    level === "honorable" && "luxury-silver-text",
                    level === "notable" && "luxury-bronze-text"
                  )}
                >
                  {awards.filter((award) => award.difficulty === level).length}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {difficultyMeta[level].label}
                </p>
              </div>
            )
          )}
        </div>
      </header>

      <section className="py-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground z-10" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search awards"
              className="h-11 rounded-xl bg-card/70 pl-9 backdrop-blur-xl"
            />
          </div>

          <ScrollArea className="w-full lg:w-auto">
            <ToggleGroup
              type="single"
              value={difficulty}
              onValueChange={(value) =>
                value && setDifficulty(value as DifficultyFilter)
              }
              variant="outline"
              size="sm"
              className="w-max justify-start"
              aria-label="Filter awards by recognition level"
            >
              <ToggleGroupItem value="all" className="rounded-full px-4">
                All
              </ToggleGroupItem>
              <ToggleGroupItem value="major" className="rounded-full px-4">
                Major
              </ToggleGroupItem>
              <ToggleGroupItem value="honorable" className="rounded-full px-4">
                Honorable
              </ToggleGroupItem>
              <ToggleGroupItem value="notable" className="rounded-full px-4">
                Notable
              </ToggleGroupItem>
            </ToggleGroup>
          </ScrollArea>
        </div>

        {years.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs text-muted-foreground">Jump to</span>
            {years.map((year) => (
              <Button
                key={year}
                variant="ghost"
                size="sm"
                className="h-7 rounded-full px-2.5 text-xs"
                onClick={() =>
                  document
                    .getElementById(`awards-${year}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              >
                {year}
              </Button>
            ))}
          </div>
        )}
      </section>

      {filteredAwards.length > 0 ? (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="relative">
            <div className="absolute bottom-4 left-[0.45rem] top-4 w-px bg-border sm:left-[6.45rem]" />

            <div className="flex flex-col gap-12">
              {years.map((year) => (
                <section
                  key={year}
                  id={`awards-${year}`}
                  className="scroll-mt-8"
                >
                  <div className="mb-4 grid grid-cols-[1rem_1fr] items-center gap-4 sm:grid-cols-[6rem_1rem_1fr]">
                    <div className="hidden sm:block">
                      <h2 className="text-xl font-medium text-primary">{year}</h2>
                      <p className="text-xs text-muted-foreground">
                        {groupedAwards[year].length} entries
                      </p>
                    </div>
                    <span className="relative z-10 h-px w-4 rounded-full bg-border" />
                    <div className="sm:hidden">
                      <h2 className="text-xl font-medium text-primary">{year}</h2>
                    </div>
                  </div>

                  <div className="ml-8 border-y border-border sm:ml-[7.5rem]">
                    {groupedAwards[year].map((award, index) => (
                      <div key={award.id} id={`award-${award.id}`} className="scroll-mt-24">
                        {index > 0 && <Separator />}

                        <button
                          type="button"
                          onClick={() => selectAward(award)}
                          className={cn(
                            "hidden w-full grid-cols-[1fr_auto] items-center gap-5 px-4 py-5 text-left transition-colors hover:bg-accent/50 lg:grid",
                            selectedAward?.id === award.id && "bg-accent/70"
                          )}
                        >
                          <TimelineRow award={award} />
                        </button>

                        <button
                          type="button"
                          onClick={() => selectAward(award, true)}
                          className="grid w-full grid-cols-[1fr_auto] items-center gap-5 px-1 py-5 text-left transition-colors hover:bg-accent/50 lg:hidden"
                        >
                          <TimelineRow award={award} />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-8">
              {selectedAward && <AwardInspector award={selectedAward} />}
            </div>
          </aside>
        </div>
      ) : (
        <Card className="luxury-panel rounded-2xl px-6 py-16 text-center">
          <h2 className="text-xl font-medium">No matching awards</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Try another search or recognition level.
          </p>
          <Button
            variant="outline"
            className="mt-5"
            onClick={() => {
              setQuery("");
              setDifficulty("all");
            }}
          >
            Reset filters
          </Button>
        </Card>
      )}

      <Dialog open={mobileDetailOpen} onOpenChange={setMobileDetailOpen}>
        {selectedAward && (
          <DialogContent className="max-h-[88svh] overflow-y-auto rounded-2xl sm:max-w-xl">
            <DialogHeader className="sr-only">
              <DialogTitle>{selectedAward.name}</DialogTitle>
              <DialogDescription>
                Award details and external links
              </DialogDescription>
            </DialogHeader>
            <AwardInspector award={selectedAward} compact />
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
}

function TimelineRow({ award }: { award: Award }) {
  const meta = difficultyMeta[award.difficulty];
  const Icon = meta.icon;

  return (
    <>
      <div className="grid grid-cols-[3.25rem_1fr] items-center gap-4">
        <div
          className={cn(
            "logo-tile size-[3.25rem] p-1.5",
            award.isIconRoundedFull ? "rounded-full" : "rounded-xl"
          )}
        >
          <Image
            src={award.image}
            alt=""
            width={44}
            height={44}
            quality={75}
            className="max-h-full object-contain"
          />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-medium">{award.name}</h3>
            <Badge
              variant="outline"
              className={cn("gap-1", `award-badge-${award.difficulty}`)}
            >
              <Icon className="size-3" />
              <span>{meta.label}</span>
            </Badge>
            {award.submissionLink && (
              <span className="inline-flex items-center gap-1 text-xs text-primary">
                <Eye className="size-3" />
                Submission
              </span>
            )}
          </div>
          <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {award.description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span>{formatAwardDate(award.date, false)}</span>
        <ArrowUpRight className="size-4" />
      </div>
    </>
  );
}

function AwardInspector({
  award,
  compact = false,
}: {
  award: Award;
  compact?: boolean;
}) {
  const meta = difficultyMeta[award.difficulty];
  const Icon = meta.icon;

  return (
    <Card
      className={cn(
        "luxury-panel overflow-hidden rounded-2xl",
        compact && "border-0 bg-transparent shadow-none"
      )}
    >
      <CardHeader className={cn("p-6", compact && "p-0 pr-6")}>
        <div className="flex items-start justify-between gap-5">
          <div
            className={cn(
              "logo-tile size-16 shrink-0 p-2.5",
              award.isIconRoundedFull ? "rounded-full" : "rounded-2xl"
            )}
          >
            <Image
              src={award.image}
              alt=""
              width={56}
              height={56}
              quality={75}
              className="max-h-full object-contain"
            />
          </div>
          <Badge
            variant="outline"
            className={cn("gap-1", `award-badge-${award.difficulty}`)}
          >
            <Icon className="size-3" />
            <span>{meta.label}</span>
          </Badge>
        </div>

        <CardTitle className="mt-6 text-2xl font-medium leading-tight tracking-tight">
          {award.name}
        </CardTitle>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="size-4" />
          {formatAwardDate(award.date)}
        </div>
      </CardHeader>
      <CardContent className={cn("px-6 pb-6", compact && "px-0 pr-6")}>
        <p className="mt-5 leading-7">{award.description}</p>
        <Separator className="my-5" />

        <div className="flex flex-col gap-4 text-sm leading-7 text-muted-foreground">
          {award.detailedDescription.split("\n\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </CardContent>

      {(award.submissionLink || award.link) && (
        <CardFooter
          className={cn(
            "flex flex-col gap-2 border-t border-border p-4",
            compact && "mt-6 border-t px-0 pb-0 pt-5 sm:flex-row"
          )}
        >
          {award.submissionLink && (
            <Button asChild className="justify-between">
              <Link href={award.submissionLink} target="_blank">
                View submission
                <Eye data-icon="inline-end" />
              </Link>
            </Button>
          )}
          {award.link && (
            <Button variant="outline" asChild className="justify-between">
              <Link href={award.link} target="_blank">
                Organization
                <ExternalLink data-icon="inline-end" />
              </Link>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
