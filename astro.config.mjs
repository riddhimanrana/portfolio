import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";
import pageInsight from "astro-page-insight";
import expressiveCode, { ExpressiveCodeTheme } from "astro-expressive-code";

const jsoncString = fs.readFileSync(new URL(`./src/styles/catppuccin-macchiato.jsonc`, import.meta.url), 'utf-8')
const catppuccinMacchiato = ExpressiveCodeTheme.fromJSONString(jsoncString)

// https://astro.build/config
export default defineConfig({
  site: 'https://rrcoder0167.is-a.dev',
  integrations: [
  tailwind({
    nesting: true
  }), icon(), robotsTxt(), pageInsight(),
  expressiveCode({
    styleOverrides: {
      codeFontFamily: "JetBrains Mono",
      uiFontFamily: "Inter",
      borderRadius: "0.5rem",
    },
    themes: [catppuccinMacchiato],
  })
]
});