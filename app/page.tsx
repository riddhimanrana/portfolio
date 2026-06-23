"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ContactDialog } from "@/components/contact-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import experienceData from "@/data/experience.json";

const experienceDescriptions: Record<string, string> = {
  "AlphaStar Academy":
    "Taught advanced Python through the AlphaStar–Carina scholarship program, providing weekly one-on-one instruction and tracking student progress across the academic year.",
  Algoverse:
    "Researched real-time visual perception, persistent memory, and temporal reasoning for privacy-sensitive systems running under tight device constraints.",
  "Mustang Math":
    "Contributed to COMPOSE, the problem-writing platform used by Mustang Math and the Stanford Math Tournament, as part of the competition technology team.",
  "Tulip Coaching":
    "Created and taught project-based Python courses for middle school students, from first-time programmers through a longer advanced curriculum.",
  "Let's Assist":
    "Founded and built a volunteer management platform used by 300+ people. I handle product development, organization onboarding, support, compliance, and expansion.",
  "Windemere Ranch Middle School Coding Club":
    "Helped organize meetings, communicate with members, and create hands-on programming material for students learning the fundamentals.",
  "Boy Scouts of America":
    "Serve with Troop 941 through leadership, outdoor activities, and community service. The troop later became one of the first organizations to use Let's Assist.",
};

const awards = [
  {
    name: "USACO Platinum",
    detail: "USA Computing Olympiad",
    image: "/awards/usaco.png",
  },
  {
    name: "Math Kangaroo International Camp",
    detail: "Represented the United States in Poland",
    image: "/awards/mathkangaroo.jpeg",
  },
  {
    name: "AMC 10 Honor Roll",
    detail: "132 / 150 on the 2025 AMC 10A",
    image: "/awards/maa.jpeg",
  },
  {
    name: "USAAIO Round 1",
    detail: "Artificial intelligence olympiad",
    image: null,
  },
];

const products = [
  {
    name: "Dicy",
    logo: "/icon-192.png",
    href: "https://dicy.app",
    metric: "1,500+ users across 4+ states",
    description:
      "A grade app for Infinite Campus and Schoology with what-if grades, final-grade calculations, and a cleaner experience across iOS, Android, and web.",
  },
  {
    name: "Let's Assist",
    logo: "/logos/lets-assist.png",
    href: "https://lets-assist.com",
    metric: "300+ users",
    description:
      "A volunteer management platform for discovering opportunities, managing signups, and verifying service hours without spreadsheets or paper logs.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function reveal(reduced: boolean | null, delay = 0) {
  return {
    initial: reduced ? false : { opacity: 0, y: 10 },
    whileInView: reduced ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.45, delay, ease },
  };
}

function SectionHeader({
  title,
  href,
}: {
  title: string;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
      <h2 className="text-2xl font-medium tracking-[-0.035em]">{title}</h2>
      {href && (
        <Button variant="ghost" size="sm" className="-mr-3" asChild>
          <Link href={href}>
            View all
            <ArrowUpRight data-icon="inline-end" />
          </Link>
        </Button>
      )}
    </div>
  );
}

export default function Home() {
  const reduced = useReducedMotion();

  return (
    <main>
      <div className="site-shell">
        <motion.section
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          className="max-w-4xl border-b border-border py-16 sm:py-24"
        >
          <h1 className="text-4xl font-medium tracking-[-0.055em] sm:text-6xl">
            Hi, I&apos;m Riddhiman.
          </h1>
          <p className="mt-5 max-w-3xl text-2xl leading-9 tracking-[-0.035em] sm:text-4xl sm:leading-[1.15]">
            I build products I&apos;m truly proud of and believe in.
          </p>
          <div className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            <p>
              I&apos;m a sophomore at Dougherty Valley High School, founder of
              Dicy and Let&apos;s Assist, a USACO Platinum competitor, and an
              applied AI researcher working on Orion.
            </p>
            <p className="mt-4">
              I enjoy taking an idea through the entire process: understanding
              the problem, building the product, finding users, responding to
              competition, and improving it until it becomes genuinely useful.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/projects">Projects</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/resume.pdf" target="_blank">
                <Download data-icon="inline-start" />
                Resume
              </Link>
            </Button>
            <ContactDialog />
          </div>
        </motion.section>

        <section className="py-14 sm:py-20">
          <SectionHeader title="Work experience" />
          <div>
            {experienceData.map((item, index) => {
              const content = (
                <div className="grid grid-cols-[3rem_1fr_auto] items-start gap-x-4 gap-y-3 py-6 sm:grid-cols-[9rem_3.25rem_1fr_auto]">
                  <p className="col-span-3 text-sm leading-6 text-muted-foreground sm:col-span-1">
                    {item.date}
                  </p>
                  <div className="flex size-12 items-center justify-center overflow-hidden rounded-xl border border-border bg-foreground p-1.5">
                    <Image
                      src={item.logo}
                      alt=""
                      width={42}
                      height={42}
                      className="max-h-full object-contain"
                    />
                  </div>
                  <div className="max-w-3xl">
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {item.subtext}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {experienceDescriptions[item.title]}
                    </p>
                  </div>
                  {item.link && (
                    <ArrowUpRight className="mt-1 text-muted-foreground" />
                  )}
                </div>
              );

              return (
                <motion.div key={item.title} {...reveal(reduced, index * 0.025)}>
                  {index > 0 && <Separator />}
                  {item.link ? (
                    <Link
                      href={item.link}
                      target="_blank"
                      className="group block transition-colors hover:text-primary"
                    >
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="pb-14 sm:pb-20">
          <SectionHeader title="Top awards" href="/awards" />
          <div className="grid sm:grid-cols-2">
            {awards.map((award, index) => (
              <motion.div
                key={award.name}
                {...reveal(reduced, index * 0.025)}
                className="grid grid-cols-[3rem_1fr] gap-4 border-b border-border py-5 sm:odd:border-r sm:odd:pr-7 sm:even:pl-7"
              >
                <div className="flex size-12 items-center justify-center overflow-hidden rounded-xl border border-border bg-foreground p-1.5">
                  {award.image ? (
                    <Image
                      src={award.image}
                      alt=""
                      width={40}
                      height={40}
                      className="max-h-full object-contain"
                    />
                  ) : (
                    <span className="text-xs font-semibold text-background">
                      AI
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{award.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {award.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="pb-16 sm:pb-24">
          <SectionHeader title="Products" href="/projects" />
          <div>
            {products.map((product, index) => (
              <motion.div key={product.name} {...reveal(reduced, index * 0.04)}>
                {index > 0 && <Separator />}
                <Link
                  href={product.href}
                  target="_blank"
                  className="group grid gap-4 py-7 sm:grid-cols-[4rem_1fr_auto] sm:items-center"
                >
                  <div className="flex size-16 items-center justify-center overflow-hidden rounded-2xl border border-border bg-foreground p-2">
                    <Image
                      src={product.logo}
                      alt={`${product.name} logo`}
                      width={54}
                      height={54}
                      className="max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-medium">{product.name}</h3>
                      <Badge variant="secondary">{product.metric}</Badge>
                    </div>
                    <p className="mt-2 max-w-3xl leading-7 text-muted-foreground">
                      {product.description}
                    </p>
                  </div>
                  <ArrowUpRight className="text-muted-foreground transition-colors group-hover:text-primary" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <div className="home-diffusion-field min-h-[32rem] sm:min-h-[42rem]" aria-hidden="true" />
    </main>
  );
}
