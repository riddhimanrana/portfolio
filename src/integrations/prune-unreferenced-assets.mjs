import { readdir, readFile, rm, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

// Astro integration: after the static build, delete image files in dist/_astro
// that nothing in dist references. Importing an image (even lazily, via
// import.meta.glob) makes Vite emit the original file next to the optimized
// derivatives, so a 4.5 MB source photo would otherwise be deployed alongside
// its 72 kB webp. Only images are considered; scripts and styles are left alone.
const IMAGE_RE = /\.(png|jpe?g|webp|avif|gif|svg)$/i;
const TEXT_RE = /\.(html|css|js|mjs|json|xml|txt)$/i;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : [full];
    })
  );
  return files.flat();
}

export default function pruneUnreferencedAssets() {
  return {
    name: "prune-unreferenced-assets",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const dist = fileURLToPath(dir);
        const assetsDir = join(dist, "_astro");
        const files = await walk(dist);

        const referenced = new Set();
        for (const file of files.filter((f) => TEXT_RE.test(f))) {
          const text = await readFile(file, "utf8");
          for (const match of text.matchAll(/_astro\/([A-Za-z0-9._-]+)/g)) referenced.add(match[1]);
        }

        let removed = 0;
        let bytes = 0;
        for (const file of files.filter((f) => f.startsWith(assetsDir) && IMAGE_RE.test(f))) {
          const name = relative(assetsDir, file);
          if (referenced.has(name)) continue;
          bytes += (await stat(file)).size;
          await rm(file);
          removed += 1;
        }
        logger.info(`removed ${removed} unreferenced image file(s), ${(bytes / 1024 / 1024).toFixed(1)} MB`);
      },
    },
  };
}
