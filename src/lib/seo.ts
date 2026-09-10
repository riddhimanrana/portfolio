import type { OgInput } from "@/lib/og";

export const SITE = {
  url: "https://riddhimanrana.com",
  name: "Riddhiman Rana",
  title: "Riddhiman Rana | Developer, Researcher & Founder",
  description:
    "Riddhiman Rana is a developer, researcher, and founder building thoughtful software at the intersection of product and real-world impact.",
  twitter: "@riddhimanrana",
  email: "contact@riddhimanrana.com",
  sameAs: [
    "https://github.com/riddhimanrana",
    "https://www.linkedin.com/in/riddhimanrana/",
    "https://youtube.com/@riddhimanrana",
  ],
} as const;

/** Open Graph images for the static pages; blog posts derive theirs from frontmatter. */
export const OG_PAGES: Record<string, OgInput> = {
  default: {
    kicker: "riddhiman rana",
    title: "hi, i'm riddhiman.",
    subtitle: "i build products i'm truly proud of and believe in.",
    tags: ["Dicy", "Let's Assist", "USACO Platinum"],
  },
  projects: {
    kicker: "projects",
    title: "Projects",
    subtitle: "Apps, tools and experiments across web, mobile, and applied AI.",
  },
  awards: {
    kicker: "awards",
    title: "Awards",
    subtitle: "Honors from USACO, USAAIO, AMC, Math Kangaroo and more.",
  },
  blog: {
    kicker: "blog",
    title: "Blog",
    subtitle: "Writing on building products, self-hosting, and what I learn along the way.",
  },
  ideology: {
    kicker: "ideology",
    title: "How I think about building",
    subtitle: "Ideas from working on Dicy, Let's Assist and Orion.",
  },
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  jobTitle: "Developer, researcher and founder",
  description: SITE.description,
  sameAs: SITE.sameAs,
  affiliation: { "@type": "EducationalOrganization", name: "Dougherty Valley High School" },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  author: { "@type": "Person", name: SITE.name, url: SITE.url },
};

export function blogPostingJsonLd(post: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    keywords: post.tags.join(", "),
    url: `${SITE.url}/blog/${post.slug}`,
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
    image: `${SITE.url}/og/blog/${post.slug}.png`,
    author: { "@type": "Person", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Person", name: SITE.name, url: SITE.url },
  };
}
