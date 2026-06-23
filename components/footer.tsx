"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GitHubIcon } from "@/components/brand-icons";
import { AnimatedDiffusion } from "@/components/animated-diffusion";

const Footer: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="diffusion-footer-shell relative -mt-12 overflow-visible pt-24 pointer-events-none">
      <div className="footer-diffusion-wrap absolute inset-x-0 top-[-2rem] bottom-0 -z-10 overflow-hidden">
        <AnimatedDiffusion className="footer-diffusion min-h-[22rem] opacity-95" />
      </div>
      <div className="site-shell relative pb-8 pointer-events-auto">
        <Separator />
        <div className="flex flex-row items-center justify-between py-7 gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-pixelta text-sm text-black">
              Built and designed by Riddhiman Rana
            </p>
            <div className="flex items-center gap-2 text-xs text-black/50 font-medium">
              <span className="font-bold text-black">v3</span>
              <span className="size-1 rounded-full bg-black/20" />
              <Link href="https://github.com/riddhimanrana/portfolio/tree/archive/v2" target="_blank" className="hover:text-black hover:underline transition-colors">v2</Link>
              <span className="size-1 rounded-full bg-black/20" />
              <Link href="https://github.com/riddhimanrana/portfolio/tree/archive/v1" target="_blank" className="hover:text-black hover:underline transition-colors">v1</Link>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full text-black hover:text-black size-9"
            >
              <Link
                href="https://github.com/riddhimanrana"
                target="_blank"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full text-black hover:text-black size-9"
            >
              <Link href="mailto:contact@riddhimanrana.com" aria-label="Email">
                <Mail className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
