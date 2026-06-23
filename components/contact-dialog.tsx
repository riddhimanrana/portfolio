"use client";

import { useState } from "react";
import { Copy, Check, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DiscordIcon,
  GitHubIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/brand-icons";
import { cn } from "@/lib/utils";

const contactOptions = [
  {
    label: "Email",
    value: "contact@riddhimanrana.com",
    href: "mailto:contact@riddhimanrana.com",
    icon: Mail,
    hoverClass: "hover:bg-sky-500/5 hover:border-sky-500/30",
    iconColor: "text-sky-400/80 group-hover/tile:text-sky-400",
  },
  {
    label: "LinkedIn",
    value: "riddhimanrana",
    href: "https://www.linkedin.com/in/riddhimanrana/",
    icon: LinkedInIcon,
    hoverClass: "hover:bg-blue-500/5 hover:border-blue-500/30",
    iconColor: "text-blue-400/80 group-hover/tile:text-blue-400",
  },
  {
    label: "GitHub",
    value: "riddhimanrana",
    href: "https://github.com/riddhimanrana",
    icon: GitHubIcon,
    hoverClass: "hover:bg-foreground/5 hover:border-foreground/20",
    iconColor: "text-zinc-400 group-hover/tile:text-white",
  },
  {
    label: "Discord",
    value: "riddhimanrana",
    icon: DiscordIcon,
    hoverClass: "hover:bg-indigo-500/5 hover:border-indigo-500/30",
    iconColor: "text-indigo-400/80 group-hover/tile:text-indigo-400",
  },
  {
    label: "YouTube",
    value: "@riddhimanrana",
    href: "https://youtube.com/@riddhimanrana",
    icon: YouTubeIcon,
    hoverClass: "hover:bg-red-500/5 hover:border-red-500/30",
    iconColor: "text-red-400/80 group-hover/tile:text-red-500",
  },
];

export function ContactDialog() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (label: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1600);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Contact</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[440px] border border-border/80 bg-background/95 backdrop-blur-md p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)] sm:rounded-2xl">
        <DialogHeader className="mb-5 pr-10">
          <DialogTitle className="text-2xl font-medium tracking-tight text-foreground lowercase">
            let&apos;s connect
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-1.5 text-xs sm:text-sm lowercase">
            reach out through any of these platforms.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          {contactOptions.map((option) => {
            const Icon = option.icon;
            const isCopied = copied === option.label;
            return (
              <div
                key={option.label}
                className={cn(
                  "group/tile flex items-center justify-between rounded-xl border border-border/40 bg-muted/20 p-3.5 transition-all duration-300 hover:-translate-y-[1px]",
                  option.hoverClass
                )}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary border border-border/50 transition-colors duration-300">
                    <Icon className={cn("size-5 transition-colors duration-300", option.iconColor)} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-none lowercase">
                      {option.label}
                    </p>
                    <p className="truncate text-xs text-muted-foreground mt-1.5 font-mono">
                      {option.value}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-lg hover:bg-foreground/10 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => copy(option.label, option.value)}
                    aria-label={`Copy ${option.label}`}
                  >
                    {isCopied ? (
                      <Check className="size-4 text-emerald-400" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                  {option.href && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-lg hover:bg-foreground/10 text-muted-foreground hover:text-foreground transition-colors"
                      asChild
                    >
                      <Link href={option.href} target="_blank" aria-label={`Open ${option.label}`}>
                        <ExternalLink className="size-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
