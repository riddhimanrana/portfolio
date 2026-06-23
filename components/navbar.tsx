"use client";

import { Github, Linkedin, Menu, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "home", path: "/" },
  { name: "projects", path: "/projects" },
  { name: "ideology", path: "/ideology" },
  { name: "blog", path: "/blog" },
  { name: "awards", path: "/awards" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/riddhimanrana", icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/riddhimanrana/",
    icon: Linkedin,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@riddhimanrana",
    icon: Youtube,
  },
];

export default function NavBar() {
  const pathname = usePathname();
  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header className="site-shell pt-5 sm:pt-7">
      <div className="nav-capsule">
        <Button variant="ghost" asChild className="rounded-full px-2.5">
          <Link href="/" aria-label="Riddhiman Rana home">
            <Image
              src="/profile.jpeg"
              alt="Riddhiman Rana"
              width={32}
              height={32}
              className="size-8 rounded-full object-cover"
              priority
            />
            <span className="hidden font-medium tracking-[-0.02em] sm:inline">
              riddhiman rana
            </span>
          </Link>
        </Button>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              asChild
              className={cn(
                "rounded-full px-3 text-muted-foreground hover:text-foreground",
                isActive(item.path) && "bg-secondary/70 text-foreground"
              )}
            >
              <Link href={item.path}>{item.name}</Link>
            </Button>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          {socials.map(({ label, href, icon: Icon }) => (
            <Button
              key={label}
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full text-muted-foreground hover:text-primary"
            >
              <Link href={href} target="_blank" aria-label={label}>
                <Icon />
              </Link>
            </Button>
          ))}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto rounded-full md:hidden">
              <Menu />
              <span className="sr-only">Open navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="border-border bg-background">
            <SheetHeader>
              <SheetTitle>Riddhiman Rana</SheetTitle>
              <SheetDescription>Portfolio navigation</SheetDescription>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-1">
              {navItems.map((item) => (
                <SheetClose asChild key={item.path}>
                  <Button
                    variant={isActive(item.path) ? "secondary" : "ghost"}
                    asChild
                    className="h-12 justify-start"
                  >
                    <Link href={item.path}>{item.name}</Link>
                  </Button>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
