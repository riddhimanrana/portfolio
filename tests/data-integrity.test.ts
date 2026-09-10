import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";

import awardsData from "../src/data/awards.json";
import projectsData from "../src/data/projects.json";
import experienceData from "../src/data/experience.json";

import { KNOWN_MISSING_BLOG_IMAGES } from "./known-missing";

const root = join(import.meta.dirname, "..");
const assetsDir = join(root, "src/assets");

const awardSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  detailedDescription: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  image: z.string().startsWith("/"),
  difficulty: z.enum(["major", "notable", "honorable"]),
  link: z.string().url().optional(),
  submissionLink: z.string().url().optional(),
  isIconRoundedFull: z.boolean().optional(),
});

const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  image: z.string().startsWith("/").optional(),
  logo: z.string().startsWith("/").optional(),
  tags: z.array(z.string().min(1)).min(1),
  year: z.string().regex(/^\d{4}$/),
  projectLink: z.string().url().optional(),
  repoLink: z.string().url().optional(),
});

const experienceSchema = z.object({
  title: z.string().min(1),
  subtext: z.string().min(1),
  logo: z.string().startsWith("/"),
  date: z.string().min(1),
  details: z.string().min(1),
  link: z.string().url().optional(),
});

describe("awards.json", () => {
  it("matches the Award schema", () => {
    expect(() => z.array(awardSchema).parse(awardsData)).not.toThrow();
  });

  it("has unique ids", () => {
    const ids = awardsData.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every date parses to a valid day", () => {
    for (const award of awardsData) {
      const [y, m, d] = award.date.split("-").map(Number);
      const date = new Date(y, m - 1, d);
      expect(date.getFullYear(), `${award.id} date`).toBe(y);
      expect(date.getMonth(), `${award.id} date`).toBe(m - 1);
      expect(date.getDate(), `${award.id} date`).toBe(d);
    }
  });

  it("every award image exists in public/", () => {
    for (const award of awardsData) {
      expect(existsSync(join(assetsDir, award.image)), award.image).toBe(true);
    }
  });
});

describe("projects.json", () => {
  it("matches the Project schema", () => {
    expect(() => z.array(projectSchema).parse(projectsData)).not.toThrow();
  });

  it("has unique ids", () => {
    const ids = projectsData.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every project logo/image exists in public/", () => {
    for (const project of projectsData) {
      for (const asset of [project.logo, project.image].filter(
        (value): value is string => Boolean(value)
      )) {
        expect(existsSync(join(assetsDir, asset)), asset).toBe(true);
      }
    }
  });
});

describe("experience.json", () => {
  it("matches the Experience schema", () => {
    expect(() => z.array(experienceSchema).parse(experienceData)).not.toThrow();
  });

  it("every experience logo exists in public/", () => {
    for (const experience of experienceData) {
      expect(existsSync(join(assetsDir, experience.logo)), experience.logo).toBe(
        true
      );
    }
  });
});

describe("home page award references", () => {
  it("top award ids on the home page all exist in awards.json", () => {
    const source = readFileSync(
      join(root, "src/pages/index.astro"),
      "utf8"
    );
    const match = source.match(/const topAwardIds = \[([^\]]+)\]/);
    expect(match).not.toBeNull();
    const ids = [...match![1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
    expect(ids.length).toBeGreaterThan(0);
    const awardIds = new Set(awardsData.map((a) => a.id));
    for (const id of ids) {
      expect(awardIds.has(id), `home page references missing award ${id}`).toBe(
        true
      );
    }
  });
});

describe("blog content", () => {
  const blogDir = join(root, "src/content/blog");
  const files = readdirSync(blogDir).filter((f) => f.endsWith(".md"));

  it("has at least one post", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it("every post has complete frontmatter", () => {
    for (const file of files) {
      const raw = readFileSync(join(blogDir, file), "utf8");
      const fm = raw.match(/^---\n([\s\S]*?)\n---/);
      expect(fm, `${file} missing frontmatter`).not.toBeNull();
      for (const key of ["title:", "date:", "excerpt:", "tags:"]) {
        expect(fm![1], `${file} missing ${key}`).toContain(key);
      }
    }
  });

  it("images referenced from posts are relative and exist next to the post", () => {
    for (const file of files) {
      const raw = readFileSync(join(blogDir, file), "utf8");
      const images = [...raw.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)].map((m) => m[1]);
      for (const image of images) {
        if (KNOWN_MISSING_BLOG_IMAGES.has(image)) continue;
        expect(image, `${file} -> ${image} must be relative (./...) so Astro optimizes it`).toMatch(
          /^\.\//
        );
        expect(existsSync(join(blogDir, image)), `${file} -> ${image}`).toBe(true);
      }
    }
  });
});
