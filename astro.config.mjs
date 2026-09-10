// @ts-check
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import pruneUnreferencedAssets from "./src/integrations/prune-unreferenced-assets.mjs";
import rehypePostElements from "./src/lib/markdown/rehype-post-elements.mjs";
import shikiFenceMeta from "./src/lib/markdown/shiki-fence-meta.mjs";

// The PostHog key is public by design (it ships in the client bundle). The
// Vercel project still defines it under the Next.js-era name; accept either
// until the dashboard variable is renamed to PUBLIC_POSTHOG_KEY.
const posthogKey = process.env.PUBLIC_POSTHOG_KEY ?? process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "";

export default defineConfig({
  site: "https://riddhimanrana.com",
  output: "static",
  compressHTML: true,
  integrations: [react(), sitemap(), pruneUnreferencedAssets()],
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
    define: {
      "import.meta.env.PUBLIC_POSTHOG_KEY": JSON.stringify(posthogKey),
    },
  },
});
