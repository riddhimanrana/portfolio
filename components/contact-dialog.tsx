"use client";

import {
  Copy,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const contactOptions = [
  {
    label: "Email",
    value: "contact@riddhimanrana.com",
    href: "mailto:contact@riddhimanrana.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "riddhimanrana",
    href: "https://www.linkedin.com/in/riddhimanrana/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "riddhimanrana",
    href: "https://github.com/riddhimanrana",
    icon: Github,
  },
  {
    label: "Discord",
    value: "riddhimanrana",
    icon: MessageCircle,
  },
  {
    label: "YouTube",
    value: "@riddhimanrana",
    href: "https://youtube.com/@riddhimanrana",
    icon: Youtube,
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
      <DialogContent className="max-w-md rounded-2xl border-border bg-card/95 p-0 backdrop-blur-2xl">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-medium tracking-[-0.035em]">
            Contact
          </DialogTitle>
          <DialogDescription>
            The best way to reach me is email.
          </DialogDescription>
        </DialogHeader>
        <div className="border-y border-border">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div key={option.label}>
                {index > 0 && <Separator />}
                <div className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 px-6 py-4">
                  <Icon className="size-4 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{option.label}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {option.value}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copy(option.label, option.value)}
                      aria-label={`Copy ${option.label}`}
                    >
                      <Copy />
                    </Button>
                    {option.href && (
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={option.href} target="_blank">
                          {copied === option.label ? "Copied" : "Open"}
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
