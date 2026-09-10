import { beforeAll, describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import { KNOWN_MISSING_BLOG_IMAGES } from "./known-missing";

// These tests validate the built output. Run `astro build` first (npm run verify does).
const root = join(import.meta.dirname, "..");
const dist = join(root, "dist");
const publicDir = join(root, "public");

const blogSlugs = readdirSync(join(root, "src/content/blog"))
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""));

const expectedRoutes = [
  "index.html",
  "404.html",
  "projects/index.html",
  "awards/index.html",
  "ideology/index.html",
  "blog/index.html",
  ...blogSlugs.map((slug) => `blog/${slug}/index.html`),
];

function collectHtmlFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectHtmlFiles(full));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function routeExists(path: string): boolean {
  const clean = path.replace(/[?#].*$/, "");
  if (clean === "/") return existsSync(join(dist, "index.html"));
  const rel = clean.replace(/^\//, "");
  return (
    existsSync(join(dist, rel)) ||
    existsSync(join(dist, rel, "index.html")) ||
    existsSync(join(dist, `${rel}.html`)) ||
    existsSync(join(publicDir, rel))
  );
}

describe("built output", () => {
  beforeAll(() => {
    if (!existsSync(dist)) {
      throw new Error("dist/ not found — run `bun run build` before the dist tests");
    }
  });

  it("emits every expected route", () => {
    for (const route of expectedRoutes) {
      expect(existsSync(join(dist, route)), route).toBe(true);
    }
  });

  it("emits sitemap and robots artifacts", () => {
    expect(existsSync(join(dist, "sitemap-index.xml"))).toBe(true);
    expect(existsSync(join(dist, "robots.txt"))).toBe(true);
  });

  it("sitemap covers all page routes", () => {
    const sitemapFiles = readdirSync(dist).filter(
      (f) => f.startsWith("sitemap-") && f.endsWith(".xml") && f !== "sitemap-index.xml"
    );
    const sitemap = sitemapFiles
      .map((f) => readFileSync(join(dist, f), "utf8"))
      .join("\n");
    const pages = [
      "/",
      "/projects/",
      "/awards/",
      "/ideology/",
      "/blog/",
      ...blogSlugs.map((slug) => `/blog/${slug}/`),
    ];
    for (const page of pages) {
      expect(sitemap, `sitemap missing ${page}`).toContain(
        `https://riddhimanrana.com${page}`
      );
    }
  });

  it("every internal link and asset in built HTML resolves", () => {
    const htmlFiles = collectHtmlFiles(dist);
    expect(htmlFiles.length).toBeGreaterThanOrEqual(expectedRoutes.length);

    const broken: string[] = [];
    for (const file of htmlFiles) {
      const html = readFileSync(file, "utf8");
      const refs = [
        ...html.matchAll(/(?:href|src)="(\/[^"]*)"/g),
      ].map((m) => m[1]);
      for (const ref of refs) {
        if (ref.startsWith("//")) continue; // protocol-relative external
        if (KNOWN_MISSING_BLOG_IMAGES.has(ref)) continue;
        if (!routeExists(ref)) {
          broken.push(`${file.replace(dist + "/", "")} -> ${ref}`);
        }
      }
    }
    expect(broken, `broken internal references:\n${broken.join("\n")}`).toEqual(
      []
    );
  });

  it("pages render the shared shell (nav + footer + theme script)", () => {
    for (const route of ["index.html", "projects/index.html", "blog/index.html"]) {
      const html = readFileSync(join(dist, route), "utf8");
      expect(html, `${route} missing nav`).toContain("nav-capsule");
      expect(html, `${route} missing theme script`).toContain("prefers-color-scheme");
      expect(html, `${route} missing font preload`).toContain(
        "OverusedGrotesk-VF.woff2"
      );
    }
  });

  it("blog posts are rendered at build time with no client markdown bundle", () => {
    const post = readFileSync(
      join(dist, "blog/escaping-icloud-photos/index.html"),
      "utf8"
    );
    expect(post).toContain("All writing");
    expect(post).toContain('class="code-block"');
    expect(post).toContain('data-title="docker-compose.yml"');
    expect(post).toContain("--shiki-light:");
    expect(post).toContain("--shiki-dark:");
    const scripts = [...post.matchAll(/(?:src|component-url)="(\/_astro\/[^"]+\.js)"/g)].map((m) => m[1]);
    expect(scripts.some((s) => /markdown|katex|highlight/i.test(s))).toBe(false);
    expect(scripts.some((s) => /toc\./.test(s)), "TOC island present").toBe(true);
  });

  it("home page ships three.js only as a lazy chunk", () => {
    const home = readFileSync(join(dist, "index.html"), "utf8");
    const scripts = [...home.matchAll(/(?:src|component-url)="(\/_astro\/[^"]+\.js)"/g)].map((m) => m[1]);
    expect(scripts.some((s) => /three/i.test(s))).toBe(false);
    expect(home).toContain("hero-fade");
    expect(home).toContain("(min-width: 1024px)");
  });

  it("dist/_astro contains no unreferenced image originals", () => {
    const assetsDir = join(dist, "_astro");
    const referenced = new Set<string>();
    for (const file of collectHtmlFiles(dist)) {
      for (const [, name] of readFileSync(file, "utf8").matchAll(/_astro\/([A-Za-z0-9._-]+)/g)) {
        referenced.add(name);
      }
    }
    const images = readdirSync(assetsDir).filter((f) => /\.(png|jpe?g|webp|avif|gif|svg)$/i.test(f));
    expect(images.length).toBeGreaterThan(0);
    const orphans = images.filter((f) => !referenced.has(f));
    expect(orphans, `unreferenced images in dist:\n${orphans.join("\n")}`).toEqual([]);
    // The 4.5 MB portrait source must never ship.
    expect(images.some((f) => /point-cloud-source.*\.jpe?g$/.test(f))).toBe(false);
  });

  it("every page has an absolute Open Graph image that exists, plus JSON-LD", () => {
    for (const route of expectedRoutes.filter((r) => r !== "404.html")) {
      const html = readFileSync(join(dist, route), "utf8");
      const og = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
      expect(og, `${route} og:image`).toMatch(/^https:\/\/riddhimanrana\.com\/og\/.+\.png$/);
      const file = join(dist, new URL(og!).pathname);
      expect(existsSync(file), `${route} -> ${og} missing`).toBe(true);
      expect(statSync(file).size, `${route} og image too small`).toBeGreaterThan(50_000);
      expect(html).toContain('<meta name="twitter:image"');
      expect(html).toContain('<meta property="og:title"');
      expect(html).toContain('<script type="application/ld+json">');
      expect(html).toContain('<link rel="canonical"');
    }
  });

  it("blog posts carry article metadata and BlogPosting structured data", () => {
    const post = readFileSync(join(dist, "blog/escaping-icloud-photos/index.html"), "utf8");
    expect(post).toContain('<meta property="og:type" content="article"');
    expect(post).toContain('<meta property="article:published_time" content="2025-12-23"');
    expect(post).toContain('"@type":"BlogPosting"');
    expect(post).toContain('"datePublished":"2025-12-23"');
  });

  it("emits an RSS feed listing every post", () => {
    const feed = readFileSync(join(dist, "rss.xml"), "utf8");
    for (const slug of blogSlugs) expect(feed).toContain(`/blog/${slug}/`);
    for (const route of ["index.html", "blog/index.html"]) {
      expect(readFileSync(join(dist, route), "utf8")).toContain('type="application/rss+xml"');
    }
  });

  it("no page references a chunk larger than 300 kB eagerly", () => {
    const limit = 300 * 1024;
    const offenders: string[] = [];
    for (const file of collectHtmlFiles(dist)) {
      const html = readFileSync(file, "utf8");
      for (const [, src] of html.matchAll(/(?:src|component-url)="(\/_astro\/[^"]+\.js)"/g)) {
        const size = statSync(join(dist, src)).size;
        if (size > limit) offenders.push(`${file.replace(dist + "/", "")} -> ${src} (${size})`);
      }
    }
    expect(offenders, offenders.join("\n")).toEqual([]);
  });
});
