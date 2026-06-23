import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const sections = [
  {
    title: "I build from problems I actually feel.",
    paragraphs: [
      "Dicy started because I was honestly just annoyed. Checking grades through Infinite Campus and Schoology felt way slower and messier than it needed to be, especially when I was trying to figure out where I actually stood in a class or what I needed on the next test.",
      "At first it was just this thing I wanted for myself and my friends, but it slowly became a much bigger project. I had to learn how school systems worked, how to build for iOS, Android, and web, and how to turn a random frustration into something students could actually use every day.",
    ],
  },
  {
    title: "I care about staying with things when they get hard.",
    paragraphs: [
      "Dicy was not the first grades app, and I was not the only student trying to build in this space. There were competitors, other people had users before me, and there were definitely moments where it would have been easier to stop or sell it and move on.",
      "But I kept going because I believed I could make something better. I redesigned things, added features students actually asked for, marketed it myself, answered support messages, and kept pushing it school by school. Seeing it grow past 1,500 users taught me that a lot of progress comes after the exciting beginning is already over.",
    ],
  },
  {
    title: "Building is not just writing the code.",
    paragraphs: [
      "One of the biggest things Dicy taught me is that having a working product is only part of it. I also had to convince people to care. I had to explain why it was useful, make demos, post about it, talk to students, understand what competitors were doing, and keep improving based on what people actually said.",
      "That part used to feel separate from building, but now I see it as part of the same thing. If I cannot explain why something matters, I probably do not understand the problem deeply enough yet.",
    ],
  },
  {
    title: "I try to build things that survive real life.",
    paragraphs: [
      "Let’s Assist has been a different kind of challenge because it is not just a clean software problem. It involves real organizations, real volunteers, real hour tracking, and people who already have their own systems and habits.",
      "Getting it used by more than 300 people and by Troop 941 has shown me how much of building is listening, adjusting, supporting people, and working through the boring but important parts like adoption, process, district requirements, and trust.",
    ],
  },
  {
    title: "I want to keep raising what I am capable of.",
    paragraphs: [
      "With projects like Orion, I am trying to push myself into harder areas like AI, memory, privacy, perception, and edge computing. A lot of it is still early, and there are plenty of moments where I have no idea what I am doing at first, but that is also the part I like.",
      "I do not just want to be someone who can make a nice prototype. I want to become the kind of person who can take a difficult idea from a rough first version all the way through engineering, design, users, distribution, and long-term use. Dicy showed me that I can stay with something. Now I want to keep proving that at a bigger scale.",
    ],
  },
];

export default function IdeologyPage() {
  return (
    <main className="site-shell py-14 sm:py-20">
      <header className="max-w-3xl pb-12 sm:pb-16">
        <h1 className="text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
          How I think about building
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          These are a few ideas I have developed while working on Dicy,
          Let&apos;s Assist, Orion, and the other things I have built. They are
          still changing as I gain more experience.
        </p>
      </header>

      <div className="max-w-3xl border-t border-border">
        {sections.map((section, index) => (
          <section
            key={section.title}
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
          </section>
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
