"use client";

import { animate, createScope, stagger } from "animejs";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function AnimatedDiffusion({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = createScope({
      root,
      mediaQueries: {
        reducedMotion: "(prefers-reduced-motion: reduce)",
      },
    }).add((self) => {
      if (!self || self.matches.reducedMotion) return;

      animate(".diffusion-orb", {
        x: [
          { to: "6vw", duration: 8000 },
          { to: "-5vw", duration: 10000 },
          { to: 0, duration: 8000 },
        ],
        y: [
          { to: "-3rem", duration: 9000 },
          { to: "2rem", duration: 9000 },
          { to: 0, duration: 8000 },
        ],
        scale: [
          { to: 1.08, duration: 8500 },
          { to: 0.94, duration: 9000 },
          { to: 1, duration: 7500 },
        ],
        delay: stagger(900),
        loop: true,
        ease: "inOut(2)",
      });
    });

    return () => scope.revert();
  }, []);

  return (
    <div
      ref={root}
      className={cn("home-diffusion-field", className)}
      aria-hidden="true"
    >
      <div className="diffusion-orb diffusion-orb-left" />
      <div className="diffusion-orb diffusion-orb-center" />
      <div className="diffusion-orb diffusion-orb-right" />
      <div className="diffusion-horizon" />
    </div>
  );
}
