# Portfolio

This repo contains the source code for my personal portfolio website: [riddhimanrana.com](https://riddhimanrana.com/). This website is completely mobile-responsive and entirely custom designed and created by me, no templates or themes were used. However, the inspiration for this design came from this screenshot that I'd see on a random post, but this designer simply showed a screenshot of the design, and I took it as inspiration to recreate it in my own way and style for my portfolio. You can find the original post [here](https://x.com/heysatya_/status/1943965445104836637).

Mostly performance and SEO optimized and scores between 90-100 on [Lighthouse](https://developer.chrome.com/docs/lighthouse) for most pages, and scores between 80-100 for blog pages.

## Tech Stack

* **Framework**: Astro (React islands for interactive parts)
* **Styling**: Tailwind CSS v4 + shadcn/ui
* **Content**: Astro content collections (markdown blog)
* **Deployment**: Vercel

## Development

```bash
bun install
bun run dev      # dev server on :4321
bun run verify   # astro check + build + vitest
```

## License

This project is licensed under the [MIT License](LICENSE).
