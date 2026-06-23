"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Sun, Moon, SparklesIcon } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

const LIQUID_GL_OPTS = {
  target: ".nav-glass-pane",
  snapshot: "body",
};

const UNSUPPORTED_HTML2CANVAS_COLOR = /(oklch|oklab|lch|lab|color-mix)\(/i;
const SNAPSHOT_COLOR_PROPS = [
  ["color", "#e5e7eb"],
  ["background-color", "transparent"],
  ["border-color", "transparent"],
  ["border-top-color", "transparent"],
  ["border-right-color", "transparent"],
  ["border-bottom-color", "transparent"],
  ["border-left-color", "transparent"],
  ["outline-color", "transparent"],
  ["text-decoration-color", "transparent"],
  ["caret-color", "transparent"],
  ["column-rule-color", "transparent"],
  ["text-emphasis-color", "transparent"],
  ["fill", "currentColor"],
  ["stroke", "currentColor"],
  ["stop-color", "transparent"],
  ["flood-color", "transparent"],
  ["lighting-color", "transparent"],
] as const;
const SNAPSHOT_EFFECT_PROPS = [
  "background",
  "background-image",
  "box-shadow",
  "text-shadow",
  "filter",
] as const;

function installHtml2CanvasSnapshotGuards() {
  const win = window as any;
  if (!win.html2canvas || win.__portfolioHtml2CanvasGuarded) return;

  const originalHtml2Canvas = win.html2canvas;
  win.html2canvas = (element: HTMLElement, options: any = {}) => {
    const callerIgnore = options.ignoreElements;
    const callerOnClone = options.onclone;

    return originalHtml2Canvas(element, {
      ...options,
      ignoreElements: (node: Element) => {
        if (node.tagName === "CANVAS") return true;
        return callerIgnore?.(node) ?? false;
      },
      onclone: (clonedDoc: Document, clonedElement: HTMLElement) => {
        callerOnClone?.(clonedDoc, clonedElement);

        const clonedWin = clonedDoc.defaultView;
        if (!clonedWin) return;

        const clonePatch = clonedDoc.createElement("style");
        clonePatch.textContent = `
          *, *::before, *::after {
            --tw-ring-color: transparent !important;
            --tw-shadow-color: transparent !important;
          }
          body::before,
          body::after,
          .nav-capsule::before {
            content: none !important;
            display: none !important;
          }
        `;
        clonedDoc.head.appendChild(clonePatch);

        clonedDoc.querySelectorAll<HTMLElement>("*").forEach((node) => {
          const style = clonedWin.getComputedStyle(node);
          SNAPSHOT_COLOR_PROPS.forEach(([prop, fallback]) => {
            const value = style.getPropertyValue(prop);
            if (value && UNSUPPORTED_HTML2CANVAS_COLOR.test(value)) {
              node.style.setProperty(prop, fallback, "important");
            }
          });
          SNAPSHOT_EFFECT_PROPS.forEach((prop) => {
            const value = style.getPropertyValue(prop);
            if (!value || !UNSUPPORTED_HTML2CANVAS_COLOR.test(value)) return;
            if (prop === "background" || prop === "background-image") {
              node.style.setProperty("background-image", "none", "important");
              node.style.setProperty("background-color", "transparent", "important");
              return;
            }
            node.style.setProperty(prop, "none", "important");
          });
        });
      },
    });
  };

  win.__portfolioHtml2CanvasGuarded = true;
}

function normalizeLiquidGLTargets() {
  const win = window as any;
  const renderer = win.__liquidGLRenderer__;
  const pane = document.querySelector(".nav-glass-pane");
  if (!renderer || !pane) return;

  renderer.lenses?.forEach((ln: any) => {
    if (ln.el !== pane) {
      ln.el.style.opacity = "";
      ln.el.style.pointerEvents = "";
      ln.el.style.transition = "";
      ln.el = pane;
    }
    ln.updateMetrics?.();
  });
}

function destroyLiquidGL() {
  const win = window as any;
  const renderer = win.__liquidGLRenderer__;
  if (!renderer) return;
  // Cancel the render loop
  if (renderer._rafId) {
    cancelAnimationFrame(renderer._rafId);
    renderer._rafId = null;
  }
  // Reset lens element opacity
  renderer.lenses?.forEach((ln: any) => {
    ln.el.style.opacity = "";
  });
  // Hide the WebGL canvas
  if (renderer.canvas) {
    renderer.canvas.style.opacity = "0";
    renderer.canvas.style.pointerEvents = "none";
  }
}

function reviveLiquidGL() {
  const win = window as any;
  const renderer = win.__liquidGLRenderer__;
  if (!renderer) return;
  // Restart the render loop
  if (!renderer._rafId) {
    const loop = () => {
      renderer.render();
      renderer._rafId = requestAnimationFrame(loop);
    };
    renderer._rafId = requestAnimationFrame(loop);
  }
  if (renderer.canvas) {
    renderer.canvas.style.opacity = "1";
    renderer.canvas.style.pointerEvents = "none";
  }
}

export default function NavBar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [glReady, setGlReady] = useState(false);
  const [glEnabled, setGlEnabled] = useState(true);
  const glEnabledRef = useRef(true);

  // Sync ref so callbacks always see latest value
  useEffect(() => {
    glEnabledRef.current = glEnabled;
  }, [glEnabled]);

  // One-time init. Home page waits until hero motion finishes, then loads glass off the critical path.
  useEffect(() => {
    setMounted(true);

    // Read persisted preference
    const saved = localStorage.getItem("liquidgl-enabled");
    const enabled = saved === null ? true : saved === "true";
    setGlEnabled(enabled);
    glEnabledRef.current = enabled;

    const win = window as any;

    if (win.__liquidGLRenderer__) {
      normalizeLiquidGLTargets();
      setGlReady(true);
      if (!enabled) destroyLiquidGL();
      return;
    }

    if (!enabled) return;

    let timer: NodeJS.Timeout | undefined;
    let fallbackTimer: NodeJS.Timeout | undefined;
    let idleId: number | undefined;
    let started = false;
    let cancelled = false;

    const tryInit = () => {
      if (cancelled) return;
      if (!win.html2canvas || !win.liquidGL) return;
      installHtml2CanvasSnapshotGuards();
      if (timer) { clearInterval(timer); timer = undefined; }
      if (win.__liquidGLRenderer__) { setGlReady(true); return; }

      try {
        win.liquidGL(LIQUID_GL_OPTS);
        setTimeout(() => {
          if (!cancelled) setGlReady(true);
        }, 1100);
      } catch (e) {
        console.error("liquidGL initialization failed:", e);
      }
    };

    const startInit = () => {
      if (started || cancelled) return;
      started = true;
      const run = () => {
        tryInit();
        if (!win.__liquidGLRenderer__) {
          timer = setInterval(tryInit, 100);
        }
      };
      if ("requestIdleCallback" in win) {
        idleId = win.requestIdleCallback(run, { timeout: 1200 });
      } else {
        timer = setTimeout(run, 0);
      }
    };

    const onHeroDone = () => startInit();

    if (pathname === "/" && !win.__portfolioHeroMotionDone) {
      window.addEventListener("portfolio:hero-motion-complete", onHeroDone, { once: true });
      fallbackTimer = setTimeout(startInit, 1800);
    } else {
      startInit();
    }

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
      if (fallbackTimer) clearTimeout(fallbackTimer);
      if (idleId && "cancelIdleCallback" in win) win.cancelIdleCallback(idleId);
      window.removeEventListener("portfolio:hero-motion-complete", onHeroDone);
    };
  }, [pathname]);

  // On pathname change: refresh the snapshot after new page paints.
  useEffect(() => {
    const win = window as any;
    if (!win.__liquidGLRenderer__ || !glEnabledRef.current) return;
    const id = setTimeout(() => {
      win.__liquidGLRenderer__?.captureSnapshot?.();
    }, pathname === "/" ? 1300 : 700);
    return () => clearTimeout(id);
  }, [pathname]);

  // Theme swaps change the captured backdrop. Recapture after next-themes updates the html class.
  useEffect(() => {
    const win = window as any;
    if (!mounted || !win.__liquidGLRenderer__ || !glEnabledRef.current) return;
    const id = setTimeout(() => {
      win.__liquidGLRenderer__?.captureSnapshot?.();
      win.__liquidGLRenderer__?.render?.();
    }, 180);
    return () => clearTimeout(id);
  }, [mounted, resolvedTheme]);

  // Toggle liquid glass on/off
  const toggleGL = () => {
    const next = !glEnabled;
    setGlEnabled(next);
    glEnabledRef.current = next;
    localStorage.setItem("liquidgl-enabled", String(next));

    const win = window as any;

    if (!next) {
      // Turn off: pause the renderer, show CSS glass
      destroyLiquidGL();
      setGlReady(false);
    } else {
      // Turn on: revive or init
      if (win.__liquidGLRenderer__) {
        reviveLiquidGL();
        setGlReady(true);
        // Refresh snapshot for current page
        setTimeout(() => win.__liquidGLRenderer__?.captureSnapshot?.(), 400);
      } else if (win.html2canvas && win.liquidGL) {
        try {
          installHtml2CanvasSnapshotGuards();
          win.liquidGL(LIQUID_GL_OPTS);
          setTimeout(() => setGlReady(true), 1200);
        } catch (e) {
          console.error("liquidGL re-init failed:", e);
        }
      }
    }
  };

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 w-full py-4 transition-all duration-300">
      <div className="site-shell">
        <div
          className={cn(
            "nav-capsule transition-all duration-700",
            !glReady && "nav-capsule-css-fallback"
          )}
          data-liquid-fixed
        >
          <div className="nav-glass-pane" aria-hidden="true" />
          <Button variant="ghost" asChild className="nav-control px-2.5">
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
                  "nav-control px-3",
                  isActive(item.path) && "nav-control-active"
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
    </header>
  );
}
