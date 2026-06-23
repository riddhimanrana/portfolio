"use client";

import { useEffect, useState } from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  GitHubIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/brand-icons";
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
  { name: "blog", path: "/blog" },
  { name: "awards", path: "/awards" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/riddhimanrana",
    icon: GitHubIcon,
    hoverClass: "hover:text-foreground hover:bg-zinc-500/10",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/riddhimanrana/",
    icon: LinkedInIcon,
    hoverClass: "hover:text-[#0a66c2] hover:bg-blue-500/10",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@riddhimanrana",
    icon: YouTubeIcon,
    hoverClass: "hover:text-[#ff0000] hover:bg-red-500/10",
  },
];

export default function NavBar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 w-full py-4 pointer-events-none transition-all duration-300">
      <div className="site-shell">
        <div className="nav-capsule pointer-events-auto">
        <Button variant="ghost" asChild className="rounded-full px-2.5">
          <Link href="/" aria-label="Riddhiman Rana home">
            <Image
              src="/profile1.jpeg"
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
          {socials.map(({ label, href, icon: Icon, hoverClass }) => (
            <Button
              key={label}
              variant="ghost"
              size="icon"
              asChild
              className={cn("rounded-full text-muted-foreground transition-all duration-200", hoverClass)}
            >
              <Link href={href} target="_blank" aria-label={label}>
                <Icon />
              </Link>
            </Button>
          ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-full text-muted-foreground hover:text-foreground ml-1"
            aria-label="Toggle theme"
          >
            {mounted ? (
              resolvedTheme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )
            ) : (
              <span className="size-4 block" />
            )}
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto rounded-full md:hidden">
              <Menu />
              <span className="sr-only">Open navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-full h-full border-none bg-background/95 backdrop-blur-md flex flex-col justify-between p-8"
          >
            <div className="flex flex-col h-full pt-16">
              <div className="flex items-center justify-between mb-10">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-3xl font-bold tracking-tight text-foreground">
                    Riddhiman Rana
                  </SheetTitle>
                  <SheetDescription className="text-muted-foreground mt-1">
                    did you know that only 23% of visitors to my website use mobile?
                  </SheetDescription>
                </SheetHeader>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                  className="rounded-full shrink-0 mr-4"
                  aria-label="Toggle theme"
                >
                  {mounted ? (
                    resolvedTheme === "dark" ? (
                      <Sun className="size-5" />
                    ) : (
                      <Moon className="size-5" />
                    )
                  ) : (
                    <span className="size-5 block" />
                  )}
                </Button>
              </div>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.path}>
                    <Button
                      variant={isActive(item.path) ? "secondary" : "ghost"}
                      asChild
                      className={cn(
                        "h-16 justify-start text-xl rounded-2xl px-6 transition-all",
                        isActive(item.path) 
                          ? "bg-secondary text-foreground font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.1)]" 
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <Link href={item.path}>{item.name}</Link>
                    </Button>
                  </SheetClose>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center justify-between border-t border-border/50 pt-6">
              <p className="text-xs text-muted-foreground">© 2026 Riddhiman Rana</p>
              <div className="flex items-center gap-3">
                {socials.map(({ label, href, icon: Icon, hoverClass }) => {
                  const hoverColor = hoverClass.split(" ").find(c => c.startsWith("hover:text-"));
                  return (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      className={cn("text-muted-foreground transition-colors p-2 rounded-full hover:bg-muted/50", hoverColor)}
                      aria-label={label}
                    >
                      <Icon className="size-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      </div>

      {/* SVG Liquid Glass Refraction Filter */}
      <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }} aria-hidden="true">
        <defs>
          <filter id="liquid-glass">
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.02" numOctaves="3" result="noise" seed="5" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </header>
  );
}
