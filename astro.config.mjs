// @ts-check
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import rehypePostElements from "./src/lib/markdown/rehype-post-elements.mjs";
import shikiFenceMeta from "./src/lib/markdown/shiki-fence-meta.mjs";

export default defineConfig({
  site: "https://riddhimanrana.com",
  output: "static",
  compressHTML: true,
  integrations: [react(), sitemap()],
  markdown: {
    // Blog posts are rendered at build time. The remark/rehype pipeline is
    // kept (instead of Sätteri) for the small custom plugins above.
    processor: unified({
      rehypePlugins: [rehypePostElements],
    }),
    shikiConfig: {
      themes: { light: "one-light", dark: "dark-plus" },
      defaultColor: false,
      langAlias: { code: "text", env: "dotenv" },
      transformers: [shikiFenceMeta()],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
