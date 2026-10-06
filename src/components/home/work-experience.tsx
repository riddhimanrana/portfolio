import { ArrowUpRight, FileText } from "lucide-react";
import Image from "@/lib/shims/image";
import Link from "@/lib/shims/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { ExperienceView as Experience } from "@/types/experience";

export function WorkExperience({ experiences }: { experiences: Experience[] }) {
  const companies = new Map<string, Experience[]>();
  for (const experience of experiences) {
    const roles = companies.get(experience.title) ?? [];
    roles.push(experience);
    companies.set(experience.title, roles);
  }

  return (
    <Accordion type="multiple" className="border-t border-border">
      {[...companies].map(([company, roles]) => {
        const first = roles[0];
        const grouped = roles.length > 1;

        if (grouped) {
          return (
            <section key={company} aria-label={company} className="border-b border-border py-6">
              <div className="grid grid-cols-[3.25rem_1fr] items-center gap-4">
                <CompanyLogo experience={first} />
                <h3 className="text-base font-medium tracking-[-0.02em] sm:text-lg">
                  {company}
                </h3>
              </div>
              <div className="ml-6 mt-2 border-l border-border pl-11">
                {roles.map((role) => (
                  <AccordionItem
                    key={`${company}-${role.subtext}-${role.date}`}
                    value={`${company}-${role.subtext}-${role.date}`}
                    className="relative border-0"
                  >
                    <span aria-hidden="true" className="absolute -left-12 top-7 size-2 rounded-full bg-muted-foreground ring-4 ring-background" />
                    <AccordionTrigger className="py-5 text-left hover:no-underline">
                      <div className="grid flex-1 gap-1 pr-4 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-5">
                        <span className="text-sm font-medium sm:text-base">{role.subtext}</span>
                        <span className="text-xs leading-5 text-muted-foreground sm:text-right sm:text-sm">
                          {role.date}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5">
                      <RoleDetails experience={role} showWebsite={false} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </div>
              {first.link && <WebsiteLink href={first.link} className="ml-[4.25rem] mt-2" />}
            </section>
          );
        }

        return (
          <AccordionItem key={company} value={company} className="border-border">
            <AccordionTrigger className="py-6 text-left hover:no-underline">
              <div className="grid flex-1 grid-cols-[3.25rem_1fr] items-center gap-4 pr-4 sm:grid-cols-[3.25rem_1fr_auto]">
                <CompanyLogo experience={first} />
                <div>
                  <h3 className="text-base font-medium tracking-[-0.02em] sm:text-lg">{company}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{first.subtext}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground sm:hidden">{first.date}</p>
                </div>
                <p className="hidden max-w-44 text-right text-sm leading-5 text-muted-foreground sm:block">
                  {first.date}
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <div className="ml-[4.25rem] max-w-3xl">
                <RoleDetails experience={first} />
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

function CompanyLogo({ experience }: { experience: Experience }) {
  return (
    <div className="logo-tile size-12 rounded-xl p-1.5">
      <Image
        src={experience.logo.src}
        srcSet={experience.logo.srcSet}
        alt={`${experience.title} logo`}
        width={42}
        height={42}
        className="max-h-full object-contain"
      />
    </div>
  );
}

function WebsiteLink({ href, className }: { href: string; className?: string }) {
  return (
    <Button variant="outline" size="sm" asChild className={className}>
      <Link href={href} target="_blank">
        Visit website
        <ArrowUpRight data-icon="inline-end" />
      </Link>
    </Button>
  );
}

function RoleDetails({ experience, showWebsite = true }: { experience: Experience; showWebsite?: boolean }) {
  return (
    <>
      <ul className="space-y-2 text-sm leading-7 text-muted-foreground sm:text-base">
        {experience.details.split("\n").filter(Boolean).map((detail) => (
          <li key={detail} className="flex gap-3">
            <span aria-hidden="true" className="mt-[0.72rem] size-1 shrink-0 rounded-full bg-current opacity-60" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
      {((showWebsite && experience.link) || experience.paperLink) && (
        <div className="mt-5 flex flex-wrap gap-2">
          {showWebsite && experience.link && <WebsiteLink href={experience.link} />}
          {experience.paperLink && (
            <Button variant="outline" size="sm" asChild>
              <Link href={experience.paperLink} target="_blank">
                Research paper
                <FileText data-icon="inline-end" />
              </Link>
            </Button>
          )}
        </div>
      )}
    </>
  );
}
