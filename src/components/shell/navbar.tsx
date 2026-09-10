
import { useEffect, useState } from "react";
import { Menu, Sun, Moon, SparklesIcon } from "lucide-react";
import { useTheme } from "@/lib/shims/theme";
import Image from "@/lib/shims/image";
import Link from "@/lib/shims/link";

import { Button } from "@/components/ui/button";
import {
  GitHubIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/shell/brand-icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { OptimizedImage } from "@/types/image";
import { useLiquidGlass } from "@/components/shell/use-liquid-glass";

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

export default function NavBar({
  pathname,
  avatar,
}: {
  pathname: string;
  avatar: OptimizedImage;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const glass = useLiquidGlass({ waitForHero: pathname === "/" });
  const glEnabled = glass.enabled;
  const glReady = glass.status === "ready";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Theme swaps change the captured backdrop; re-snapshot after the class flips.
  useEffect(() => {
    if (mounted) glass.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, resolvedTheme]);

  const toggleGL = () => glass.setEnabled(!glass.enabled);
  const prepareForNavigation = () => glass.hide();

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header
      className="sticky top-0 z-50 w-full py-4 transition-all duration-300"
      data-liquid-snapshot-shell
    >
      <div className="site-shell">
        <div
          className={cn(
            "nav-capsule transition-all duration-700",
            !glReady && "nav-capsule-css-fallback",
            glReady && glEnabled && "nav-capsule-liquid-active"
          )}
          data-liquid-fixed
        >
          <div className="nav-glass-pane" aria-hidden="true" />
          <Button variant="ghost" asChild className="nav-control px-2.5">
            <Link href="/" aria-label="Riddhiman Rana home" onClick={prepareForNavigation}>
              <Image
                src={avatar.src}
                srcSet={avatar.srcSet}
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
                  "nav-control px-3",
                  isActive(item.path) && "nav-control-active"
                )}
              >
                <Link href={item.path} onClick={prepareForNavigation}>{item.name}</Link>
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
                className={cn("nav-control", hoverClass)}
              >
                <Link href={href} target="_blank" aria-label={label}>
                  <Icon />
                </Link>
              </Button>
            ))}

            {/* Settings popover — theme + liquid glass toggle */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="nav-control ml-1"
                  aria-label="Settings"
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
              </PopoverTrigger>
              <PopoverContent
                className="appearance-menu w-56 rounded-2xl border border-border/50 p-2"
                align="end"
                sideOffset={12}
              >
                <div className="flex flex-col gap-0.5">
                  <p className="px-2 py-1.5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60">
                    Appearance
                  </p>

                  {/* Theme toggle */}
                  <button
                    onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-foreground/10"
                  >
                    <span className="flex items-center gap-2.5">
                      {mounted && resolvedTheme === "dark" ? (
                        <Sun className="size-3.5 text-muted-foreground" />
                      ) : (
                        <Moon className="size-3.5 text-muted-foreground" />
                      )}
                      {mounted
                        ? resolvedTheme === "dark"
                          ? "Switch to light"
                          : "Switch to dark"
                        : "Toggle theme"}
                    </span>
                  </button>

                  <div className="my-1 h-px bg-border/40" />

                  {/* Liquid glass toggle */}
                  <button
                    onClick={toggleGL}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-foreground/10"
                  >
                    <span className="flex items-center gap-2.5 text-foreground">
                      <SparklesIcon className="size-3.5 text-muted-foreground" />
                      Liquid glass
                    </span>
                    {/* Pill toggle */}
                    <span
                      className={cn(
                        "relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200",
                        glEnabled ? "bg-primary" : "bg-muted"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block size-3.5 rounded-full bg-white shadow-sm transition-transform duration-200",
                          glEnabled ? "translate-x-4" : "translate-x-0.5"
                        )}
                      />
                    </span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
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
                        <Link href={item.path} onClick={prepareForNavigation}>{item.name}</Link>
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
    </header>
  );
}
