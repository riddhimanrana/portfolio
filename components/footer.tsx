"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="site-shell pb-8 pt-6">
      <Separator />
      <div className="flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Riddhiman Rana · Designed and built from scratch.
        </p>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link
              href="https://github.com/riddhimanrana"
              target="_blank"
              aria-label="GitHub"
            >
              <Github />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href="mailto:contact@riddhimanrana.com" aria-label="Email">
              <Mail />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
