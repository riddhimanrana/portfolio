"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const sections = [
  {
    title: "I start with problems I understand personally.",
    paragraphs: [
      "Dicy started because checking my grades through Infinite Campus and Schoology was frustrating. I wanted a faster and clearer way to understand where I stood, calculate possible outcomes, and make decisions before the end of a grading period.",
      "Building it required me to learn far beyond what I knew at the start. I reverse engineered both school systems, built for iOS, Android, and web, and kept adjusting the product around how students actually think about their grades.",
    ],
  },
  {
    title: "I believe in staying with an idea.",
    paragraphs: [
      "Dicy entered a market that already had competitors. I was not first, and other student developers had more users at different points. I also received acquisition offers that would have made it easy to stop.",
      "I kept building because I believed in the product. I improved the design, added features, listened to students, marketed it directly, and expanded it across more than four states. It eventually grew beyond 1,500 users. That experience taught me how much progress can come from staying focused after the idea is no longer new.",
    ],
  },
  {
    title: "Building includes getting people to care.",
    paragraphs: [
      "A working product is only the beginning. With Dicy, I had to explain why students should switch, understand what competitors were doing well, make demos, write launch posts, answer support messages, and speak directly with users.",
      "I enjoy that part of the work. Marketing shows me whether I understand the problem clearly enough to communicate it. It also keeps me close to the people I am building for.",
    ],
  },
  {
    title: "I am willing to handle the work around the software.",
    paragraphs: [
      "Let's Assist is a volunteer management platform, but making it useful involves much more than writing code. I work with organizations on their existing processes, help people adopt the platform, respond to support, and work through district, legal, and compliance requirements.",
      "It currently serves more than 300 users and is actively used by Troop 941. I am also working with larger student organizations and school district staff. Those conversations make the product more grounded and force me to build for real constraints.",
    ],
  },
  {
    title: "I want to keep increasing what I am capable of building.",
    paragraphs: [
      "Orion has pushed me into applied AI, visual perception, memory systems, privacy, and edge computing. It is a different kind of product, but I approach it in the same way: learn the system deeply, build a real prototype, and keep connecting the technical work to a useful experience.",
      "I am still early. My goal is to become someone who can take a difficult idea from the first rough version through engineering, product design, distribution, and long-term use. The projects will change, but I want that level of responsibility to remain.",
    ],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function IdeologyPage() {
  const reduced = useReducedMotion();

  return (
    <main className="site-shell py-14 sm:py-20">
      <motion.header
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="max-w-3xl pb-12 sm:pb-16"
      >
        <h1 className="text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
          How I think about building
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          These are a few ideas I have developed while working on Dicy,
          Let&apos;s Assist, Orion, and the other things I have built. They are
          still changing as I gain more experience.
        </p>
      </motion.header>

      <div className="max-w-3xl border-t border-border">
        {sections.map((section, index) => (
          <motion.section
            key={section.title}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, ease }}
            className="py-9 sm:py-11"
          >
            {index > 0 && <Separator className="-mt-9 mb-9 sm:-mt-11 sm:mb-11" />}
            <h2 className="text-2xl font-medium leading-8 tracking-[-0.035em]">
              {section.title}
            </h2>
            <div className="mt-5 flex flex-col gap-4 leading-7 text-muted-foreground">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      <div className="max-w-3xl border-t border-border pt-8">
        <Button variant="outline" asChild>
          <Link href="/projects">
            View projects
            <ArrowUpRight data-icon="inline-end" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
