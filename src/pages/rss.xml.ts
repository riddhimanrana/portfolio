import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

import { SITE } from "@/lib/seo";

export const GET: APIRoute = async (context) => {
  const posts = (await getCollection("blog")).sort((a, b) => (a.data.date < b.data.date ? 1 : -1));
  return rss({
    title: `${SITE.name} | Blog`,
    description: "Writing on building products, self-hosting, and what I learn along the way.",
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: new Date(`${post.data.date}T00:00:00Z`),
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: "<language>en-us</language>",
  });
};
