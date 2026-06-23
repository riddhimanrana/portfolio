"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import experienceData from "@/data/experience.json";

interface Experience {
  title: string;
  subtext: string;
  logo: string;
  date: string;
  details: string;
  link?: string;
}

export function WorkExperience() {
  return (
    <Accordion type="single" collapsible className="border-t border-border">
      {(experienceData as Experience[]).map((experience) => (
        <AccordionItem
          key={experience.title}
          value={experience.title}
          className="border-border"
        >
          <AccordionTrigger className="group py-6 text-left hover:no-underline">
            <div className="grid flex-1 grid-cols-[3.25rem_1fr] items-center gap-4 pr-4 sm:grid-cols-[3.25rem_1fr_auto]">
              <div className="logo-tile size-12 rounded-xl p-1.5">
                <Image
                  src={experience.logo}
                  alt={`${experience.title} logo`}
                  width={42}
                  height={42}
                  className="max-h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-base font-medium tracking-[-0.02em] sm:text-lg">
                  {experience.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {experience.subtext}
                </p>
              </div>
              <p className="hidden max-w-44 text-right text-sm leading-5 text-muted-foreground sm:block">
                {experience.date}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="ml-[4.25rem] max-w-3xl">
              <p className="mb-4 text-sm leading-7 text-muted-foreground sm:hidden">
                {experience.date}
              </p>
              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                {experience.details}
              </p>
              {experience.link && (
                <Button variant="outline" size="sm" className="mt-5" asChild>
                  <Link href={experience.link} target="_blank">
                    Visit website
                    <ArrowUpRight data-icon="inline-end" />
                  </Link>
                </Button>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
