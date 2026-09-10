// Minimal static server for the built site, used by Playwright.
//
// `astro preview` daemonizes itself when it detects an agent environment,
// which Playwright's webServer treats as an early exit. This serves dist/ in
// the foreground with the same routing rules Vercel applies: directory
// index files and a real 404 status backed by 404.html.
import { existsSync, statSync } from "node:fs";
import { join, normalize } from "node:path";

const dist = join(import.meta.dirname, "../../dist");
const port = Number(process.env.PORT ?? 4321);

function resolve(pathname: string): { file: string; status: number } {
  const clean = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  const candidates = [
    join(dist, clean),
    join(dist, clean, "index.html"),
    join(dist, `${clean}.html`),
  ];
  for (const file of candidates) {
    if (existsSync(file) && statSync(file).isFile()) return { file, status: 200 };
  }
  return { file: join(dist, "404.html"), status: 404 };
}

Bun.serve({
  port,
  fetch(request) {
    const { pathname } = new URL(request.url);
    const { file, status } = resolve(pathname);
    return new Response(Bun.file(file), { status });
  },
});

console.log(`serving ${dist} on http://localhost:${port}`);
