# ADR 0001: Astro with React islands

**Status:** accepted · **Date:** 2026-09-09

## Context

The site was a Next.js 16 App Router project. Almost every page is static content (home, projects, awards, blog, ideology); the interactive parts are small and local: the liquid-glass navbar, the project dialog, awards search and filtering, the point-cloud portrait, the contact dialog, the blog table of contents. The Next build shipped the whole page as client React and rendered blog markdown in the browser (react-markdown, KaTeX, Prism), which made a blog post cost about 1.3 MB of JavaScript.

Three options were weighed during the rewrite: Astro with React islands, Astro with Svelte islands, and staying on Next.js.

## Decision

Astro 7, static output, React islands, deployed on Vercel.

- Next.js is the wrong shape for a static content site: it ships a router and hydrates whole pages for interactivity that lives in a handful of components.
- Svelte islands would trim the ~200 kB React runtime, but only by rewriting twelve working React components (Radix-based shadcn UI, Three.js portrait, dialogs) with no other gain. The runtime is loaded once and cached; the components are the asset.
- Astro renders the static parts to plain HTML, hydrates only the islands that need it, and renders markdown at build time. Blog posts now ship no markdown library at all.

## Consequences

- Interactive components stay React and are placed from `.astro` pages with explicit `client:*` directives. A React component used without a directive is static HTML and must not rely on hooks or browser APIs.
- Full-page navigation. Anything that assumed client-side routing (route change effects, `usePathname`) is gone; the current path is passed in as a prop.
- Blog rendering is the Astro remark/rehype pipeline (`@astrojs/markdown-remark`) with Shiki dual themes. Custom behaviour lives in two small plugins under `src/lib/markdown/`; the old client renderer is deleted.
- Heavy optional dependencies (three.js, posthog-js) are dynamic imports so they never sit on the critical path.
- Revisit only if the site grows real server-side needs (auth, per-request data), which would point at Astro's server output rather than a framework change.
