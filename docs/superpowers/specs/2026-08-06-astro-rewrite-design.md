# Astro Rewrite — Design

**Date:** 2026-08-06 · **Branch:** `astro-rewrite` · **Goal:** Rewrite the Next.js 16 portfolio as an Astro 5 site with identical content/design, modernized shadcn (Tailwind v4 conventions), and a real test suite.

## Why Astro

The site is overwhelmingly static content (home, projects, awards, blog, ideology) with islands of interactivity (modals, filters, theme, liquid-glass navbar, Three.js hero). Astro's islands architecture ships zero JS for static parts and hydrates only the interactive React components — a natural fit and a large payload win over shipping the whole page as client React.

## Architecture

- **Astro 5** static output (`output: 'static'`), deployed on Vercel as today.
- **@astrojs/react** — existing React components are reused nearly verbatim as islands. Non-interactive React components render to static HTML (no directive); interactive ones get `client:load`/`client:visible`.
- **Tailwind CSS v4** via `@tailwindcss/vite`. The legacy `tailwind.config.ts` + `@config` is dropped; tokens move to CSS-first `@theme inline` per current shadcn conventions, **preserving the existing HSL palette, radius, and every custom utility** (nav-capsule, diffusion fields, luxury text, award badges…).
- **shadcn update**: `components/ui/*` refreshed to the current Tailwind-v4 generation (data-slot attributes, `tw-animate-css`, updated focus/invalid states), same visual tokens. Only the components actually used are kept: button, badge, card, dialog, input, popover, scroll-area, separator, sheet, sonner (replaces the legacy toast/toaster pair), toggle, toggle-group.
- **Content collections** for the blog (`src/content/blog/*.md`, glob loader + zod schema for title/date/excerpt/tags). Raw markdown body still feeds the existing `MarkdownContent` React island (react-markdown + KaTeX + syntax highlighter + copy buttons + custom small|image syntax), keeping the exact current rendering behavior and TOC.
- **Next shims** (`src/lib/`): `Link`→`<a>`, `Image`→`<img>` (assets are unoptimized public files already), `useTheme` → small localStorage/system-preference store replacing next-themes, `pathname` passed from `Astro.url.pathname` as a prop where needed. Blocking inline script in `<head>` sets the `dark` class pre-paint (default dark, system enabled) to avoid FOUC.
- **Liquid glass navbar** preserved: `liquidGL.js` + html2canvas-pro loaded as deferred scripts in the base layout; navbar island keeps init/teardown/toggle logic (pathname-change effects simplify away since Astro does full page loads).

## Routes

| Next route | Astro file | Hydration |
|---|---|---|
| `/` | `src/pages/index.astro` | HomeHero island (framer-motion, contact dialog, Three.js product map `client:load`) |
| `/projects` | `src/pages/projects.astro` | ProjectsPage island (modal state) |
| `/awards` | `src/pages/awards.astro` | AwardsPage island (search/filter/deep-link `?id=`) |
| `/blog` | `src/pages/blog/index.astro` | static (React SSR, no JS) |
| `/blog/[slug]` | `src/pages/blog/[slug].astro` | static header + MarkdownContent/TOC islands |
| `/ideology` | `src/pages/ideology.astro` | static |
| 404 | `src/pages/404.astro` | static |

## SEO / analytics

- Per-page `<title>`/description/OG/Twitter meta in `Layout.astro` (values copied from Next metadata), Google site verification, canonical from `site: 'https://riddhimanrana.com'`.
- **@astrojs/sitemap** replaces next-sitemap; static `public/robots.txt` points at `/sitemap-index.xml`.
- **PostHog**: posthog-js init in a client script, production-only, same key. `/ingest` reverse proxy moves from Next rewrites to `vercel.json` rewrites (platform-level, works for static Astro). Manual `$pageview` capture on load (full page loads make this trivial).
- **Vercel Speed Insights** via `injectSpeedInsights()` from the framework-agnostic entry.
- Env vars renamed `NEXT_PUBLIC_*` → `PUBLIC_*` (Astro convention).

## Testing

1. **Vitest** unit/integration: date/util functions; awards/projects/experience JSON validated against zod schemas (ids unique, dates parse, difficulties valid, referenced image files exist on disk); blog frontmatter completeness; top-award ids on home exist in awards.json.
2. **Build gates**: `astro check` (type-checks .astro + TS) and `astro build` must pass; both wired into `npm test`/CI-style `npm run verify`.
3. **Dist integrity tests** (vitest, post-build): every expected route emitted; every internal `href`/`src` in built HTML resolves to a file or route; sitemap contains all pages.
4. **Manual browser verification**: every page walked in the in-app browser — light + dark, desktop + mobile viewport; console clean; modals, filters, deep links, theme + liquid-glass toggles, KaTeX/code/copy/TOC on a real post.

## Migration mechanics & cleanup

Work happens on `astro-rewrite`; `main` untouched. Old Next files (`app/`, `next.config.mjs`, `next-sitemap.config.js`, `tailwind.config.ts`, eslint-next config, `.next` artifacts) are deleted once the Astro build + tests are green. `public/` assets, `data/*.json`, blog markdown (moved), LICENSE stay. README updated for the new stack. Unused components (about-section, education-section, award-grid/list/timeline/modal variants no longer imported by any page, toast legacy) are dropped after import-graph check.

## Error handling

- Content collection schema failures fail the build (typo'd frontmatter can't ship).
- Missing award/blog assets caught by data-integrity tests.
- 404 page emitted as `404.html` (Vercel serves it natively).
- Liquid glass keeps its CSS-fallback path when WebGL/html2canvas fail, as today.

## Addendum (2026-09-09): audit and hardening pass

Measured after the first port: a blog post referenced 1,350 kB of JavaScript, the home page 1,120 kB, and every page 236 kB of analytics in the layout chunk. Changes made:

- Blog markdown moved from a client React renderer to Astro's build-time pipeline (`@astrojs/markdown-remark`, Shiki dual themes, two small plugins in `src/lib/markdown/`). No post used math, so KaTeX and its remark/rehype plugins were dropped along with react-markdown and react-syntax-highlighter. The table of contents now takes headings from `render(entry)` instead of re-parsing markdown with a regex (whose slugs could differ from the renderer's).
- Home hero entrance is CSS keyframes; framer-motion removed. Static sections render in `index.astro`; only ContactDialog (`client:idle`), HeroProductMap (`client:media` for desktop widths) and WorkExperience (`client:visible`) hydrate. three.js is a dynamic import.
- PostHog and Speed Insights load after idle in production as separate chunks.
- Brand icons inlined; simple-icons removed. lucide-react is the single icon set.
- The first liquidGL snapshot always failed (NaN scale) and retried after 500 ms; the html2canvas wrapper in the navbar now supplies the device scale.
- Playwright end-to-end suite (desktop and mobile) runs against the built output via a small Bun static server, because `astro preview` daemonizes in agent environments.
- Framework decision recorded in `docs/adr/0001-astro-with-react-islands.md`; vocabulary in `CONTEXT.md`.

Result: home 290 kB and a blog post 268 kB of referenced JavaScript, most of it the shared React runtime and navbar.
