import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";
import pageInsight from "astro-page-insight";


// https://astro.build/config
export default defineConfig({
  markdown: {
    render: [
      '@astrojs/markdown-remark',
      {
        syntaxHighlight: 'shiki',
        shikiConfig: {
          theme: 'nord',
          langs: ['js', 'html', 'css', 'astro'],
          wrap: false,
        },
      },
    ],
  },
  site: 'https://rrcoder0167.is-a.dev',
  integrations: [tailwind({
    nesting: true
  }), icon(), robotsTxt(), pageInsight()]
});