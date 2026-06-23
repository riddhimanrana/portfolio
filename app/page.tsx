"use client";

import { ArrowUpRight, Download, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useState } from "react";

import { ContactDialog } from "@/components/contact-dialog";
import { HeroProductMap } from "@/components/hero-product-map";
import { WorkExperience } from "@/components/work-experience";
import { SkillsSection } from "@/components/skills-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import awardsData from "@/data/awards.json";

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 15, filter: "blur(3px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay,
      ease: [0.16, 1, 0.3, 1] as const
    }
  })
};

let homeHeroAnimated = false;

const topAwardIds = [
  "usaco-platinum",
  "usaaio-round-1-2026",
  "mathkangaroo-camp-25",
  "amc-10a-25"
];

const topAwards = topAwardIds
  .map((id) => {
    const award = awardsData.find((a) => a.id === id);
    return award
      ? {
          id: award.id,
          name: award.name,
          detail: award.description,
          image: award.image,
        }
      : null;
  })
  .filter((a): a is NonNullable<typeof a> => a !== null);

const products = [
  {
    name: "Dicy",
    logo: "/icon-192.png",
    href: "https://dicy.app",
    metric: "1.5k+ users across 4+ states",
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
  const [shouldAnimateHero, setShouldAnimateHero] = useState(
    () => !homeHeroAnimated
  );
  const heroMotionState = shouldAnimateHero
    ? { initial: "hidden", animate: "visible" }
    : { initial: "visible", animate: "visible" };

  const markHeroMotionComplete = () => {
    if (typeof window === "undefined") return;
    homeHeroAnimated = true;
    setShouldAnimateHero(false);
    (window as any).__portfolioHeroMotionDone = true;
    window.dispatchEvent(new Event("portfolio:hero-motion-complete"));
  };

  return (
    <main>
      <div className="site-shell">
        <section className="grid gap-10 border-b border-border py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <motion.div 
              variants={fadeInVariants} 
              custom={0.0} 
              {...heroMotionState}
              className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
            >
              <span>Founder of</span>
              <Link
                href="https://dicy.app"
                target="_blank"
                className="group inline-flex items-center text-foreground transition-colors hover:text-blue-500 font-medium"
              >
                <Image
                  src="/icon-192.png"
                  alt=""
                  width={18}
                  height={18}
                  className="rounded-full object-contain mr-1"
                  style={{ width: 18, height: 18 }}
                />
                Dicy
                <ExternalLink className="text-blue-500 transition-all duration-300 ease-out opacity-0 scale-50 w-0 group-hover:w-3 group-hover:opacity-100 group-hover:scale-100 group-hover:ml-1 h-3" />
              </Link>
              <span>and</span>
              <Link
                href="https://lets-assist.com"
                target="_blank"
                className="group inline-flex items-center text-foreground transition-colors hover:text-blue-500 font-medium"
              >
                <Image
                  src="/logos/lets-assist.png"
                  alt=""
                  width={18}
                  height={18}
                  className="rounded-full object-contain mr-1"
                />
                Let&apos;s Assist
                <ExternalLink className="text-blue-500 transition-all duration-300 ease-out opacity-0 scale-50 w-0 group-hover:w-3 group-hover:opacity-100 group-hover:scale-100 group-hover:ml-1 h-3" />
              </Link>
            </motion.div>
            
            <motion.h1 
              variants={fadeInVariants} 
              custom={0.1} 
              {...heroMotionState}
              className="text-4xl font-medium tracking-[-0.055em] sm:text-6xl text-foreground"
            >
              hi, i&apos;m <span className="diffusion-name cursor-default">riddhiman</span>.
            </motion.h1>

            <motion.p 
              variants={fadeInVariants} 
              custom={0.25} 
              {...heroMotionState}
              className="mt-5 max-w-3xl text-2xl leading-9 tracking-[-0.035em] sm:text-4xl sm:leading-[1.15]"
            >
              i build products i&apos;m truly{" "}
              <span className="luxury-gold-text">proud</span> of and{" "}
              <span className="luxury-silver-text">believe</span> in.
            </motion.p>

            <motion.div 
              variants={fadeInVariants} 
              custom={0.4} 
              {...heroMotionState}
              className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
            >
              <p>
                I&apos;m a rising junior at Dougherty Valley High School, founder of Dicy and Let&apos;s Assist (1.8k+ users combined)
              , a USACO Platinum competitor, and an
                applied AI researcher working on Orion.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInVariants} 
              custom={0.55} 
              {...heroMotionState}
              onAnimationComplete={markHeroMotionComplete}
              className="mt-8 flex flex-wrap gap-2"
            >
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
            </motion.div>
          </div>

          <HeroProductMap />
        </section>

        <section className="py-14 sm:py-20">
          <SectionHeader title="Top awards" href="/awards" />
          <div className="grid sm:grid-cols-2">
            {topAwards.map((award) => (
              <Link
                key={award.id}
                href={`/awards?id=${award.id}`}
                className="grid grid-cols-[3rem_1fr] gap-4 border-b border-border py-5 sm:odd:border-r sm:odd:pr-7 sm:even:pl-7"
              >
                <div className="logo-tile size-12 rounded-xl p-1.5">
                  <Image
                    src={award.image}
                    alt=""
                    width={40}
                    height={40}
                    className="max-h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{award.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {award.detail}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="pb-14 sm:pb-20">
          <SectionHeader title="Work experience" />
          <WorkExperience />
        </section>

        <section className="pb-16 sm:pb-24">
          <SectionHeader title="Products" href="/projects" />
          <div>
            {products.map((product, index) => (
              <div key={product.name}>
                {index > 0 && <Separator />}
                <Link
                  href={product.href}
                  target="_blank"
                  className="group grid gap-4 py-7 sm:grid-cols-[4rem_1fr_auto] sm:items-center"
                >
                  <div className="logo-tile size-16 rounded-2xl p-2">
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
              </div>
            ))}
          </div>
        </section>

        <SkillsSection />
{/* 

        <section className="border-t border-border py-16 sm:py-24 text-center">
          <h2 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
            Let&apos;s build something together
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            I&apos;m always interested in new opportunities, product design, engineering, or applied AI research.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <ContactDialog />
            <Button variant="outline" asChild>
              <Link href="mailto:contact@riddhimanrana.com">Send an email</Link>
            </Button>
          </div>
        </section> */}
      </div>
    </main>
  );
}
