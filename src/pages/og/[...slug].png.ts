import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";

import { renderOgImage, type OgInput } from "@/lib/og";
import { OG_PAGES } from "@/lib/seo";

// One Open Graph image per page: /og/<page>.png and /og/blog/<slug>.png.
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("blog");
  const pages: Array<{ slug: string; input: OgInput }> = [
    ...Object.entries(OG_PAGES).map(([slug, input]) => ({ slug, input })),
    ...posts.map((post) => ({
      slug: `blog/${post.id}`,
      input: {
        kicker: "blog",
        title: post.data.title,
        subtitle: post.data.excerpt,
        tags: post.data.tags,
        date: post.data.date,
      },
    })),
  ];
  return pages.map(({ slug, input }) => ({ params: { slug }, props: { input } }));
};

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgImage(props.input as OgInput);
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000, immutable" },
  });
};
