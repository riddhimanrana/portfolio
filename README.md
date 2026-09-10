# Portfolio

This repo contains the source code for my personal portfolio website: [riddhimanrana.com](https://riddhimanrana.com/). This website is completely mobile-responsive and entirely custom designed and created by me, no templates or themes were used. However, the inspiration for this design came from this screenshot that I'd see on a random post, but this designer simply showed a screenshot of the design, and I took it as inspiration to recreate it in my own way and style for my portfolio. You can find the original post [here](https://x.com/heysatya_/status/1943965445104836637).

Mostly performance and SEO optimized and scores between 90-100 on [Lighthouse](https://developer.chrome.com/docs/lighthouse) for most pages, and scores between 80-100 for blog pages.

## Tech stack

* **Framework**: Astro 7, static output, React islands for the interactive parts (see [docs/adr/0001](docs/adr/0001-astro-with-react-islands.md))
* **Styling**: Tailwind CSS v4 (CSS-first tokens) and shadcn/ui
* **Content**: Astro content collections; blog posts render at build time with Shiki dual themes
* **Deployment**: Vercel (`vercel.json` proxies PostHog under `/ingest`)

## Development

```bash
bun install
bun run dev        # dev server on :4321
bun run check      # astro check (types for .astro and .tsx)
bun run test       # vitest: data integrity, utils, built-output checks (run build first)
bun run test:e2e   # builds, then Playwright against the built site (desktop + mobile)
bun run verify     # check + build + vitest + Playwright
```

Environment: `PUBLIC_POSTHOG_KEY` (analytics load only in production builds; the old `NEXT_PUBLIC_POSTHOG_KEY` is accepted as a fallback at build time).

## Layout

```
src/
  assets/       images resized and converted at build time (see CONTEXT.md, "Asset")
  components/   ui/ (shadcn), shell/, home/, projects/, awards/, blog/
  content/blog/ posts, each with its images in a folder of the same name
  data/         awards, projects, experience (JSON, validated by tests)
  integrations/ build hooks (prunes unreferenced image originals from dist)
  layouts/ lib/ pages/ styles/ types/
tests/          vitest (data, utils, built output) and Playwright (tests/e2e)
```

Vocabulary used across code and data lives in [CONTEXT.md](CONTEXT.md).

## License

This project is licensed under the [MIT License](LICENSE).
