"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

interface BlogPageClientProps {
  posts: BlogPost[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  return (
    <main className="site-shell py-12 sm:py-16">
      <header className="mb-10 border-b border-border/80 pb-9">
        <h1 className="page-title">Blog</h1>
      </header>

      <div className="border-y border-border">
        {posts.map((post, index) => {
          const readTime = Math.max(
            1,
            Math.ceil(post.content.split(/\s+/).length / 200)
          );

          return (
            <div key={post.slug}>
              {index > 0 && <Separator />}
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-4 py-7 sm:grid-cols-[8rem_1fr_auto] sm:items-start"
              >
                <div className="text-sm text-muted-foreground">
                  <p>{formatDate(post.date)}</p>
                  <p className="mt-1">{readTime} min read</p>
                </div>
                <div>
                  <h2 className="text-xl font-medium leading-snug tracking-tight transition-colors group-hover:text-primary sm:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-3xl leading-7 text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
                <ArrowRight className="mt-1 size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
