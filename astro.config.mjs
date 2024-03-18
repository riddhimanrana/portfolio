import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";
import pageInsight from "astro-page-insight";
import rehypePrettyCode from "rehype-pretty-code";

export default defineConfig({
  markdown: {
    rehypePlugins: [],
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://shiki.style/themes
      theme: 'catppuccin-macchiato',
    },
  },
  site: 'https://rrcoder0167.is-a.dev',
  integrations: [tailwind({
    nesting: true
  }), icon(), robotsTxt(), pageInsight()],
});