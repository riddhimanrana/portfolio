import { expect, test, type Page } from "@playwright/test";

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1280) < 768;

// Astro drops the `ssr` attribute from an <astro-island> once it hydrates.
// Interactions must wait for that or clicks land before React attaches handlers.
const hydrated = (page: Page, componentFile: string) =>
  page.locator(`astro-island[component-url*="${componentFile}"]:not([ssr])`).first().waitFor();

test.describe("shell", () => {
  test("home renders hero, static sections and no console errors", async ({ page }) => {
    const errors: string[] = [];
    const missing: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      // Resource 404s are tracked by URL below; the console line has no URL.
      if (msg.type() === "error" && !msg.text().startsWith("Failed to load resource"))
        errors.push(msg.text());
    });
    page.on("response", (res) => {
      const url = new URL(res.url());
      // /ingest (PostHog proxy) and /_vercel (Speed Insights) exist on Vercel only.
      const vercelOnly = /^\/(ingest|_vercel)\//.test(url.pathname);
      if (res.status() >= 400 && !vercelOnly) missing.push(url.pathname);
    });

    await page.goto("/");
    await expect(page).toHaveTitle(/Riddhiman Rana/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("riddhiman");
    await expect(page.getByRole("heading", { name: "Top awards" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Work experience" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();

    // Static links styled through buttonVariants() (asChild does not work from .astro).
    await expect(page.getByRole("link", { name: "Projects", exact: true }).first()).toHaveClass(/bg-primary/);
    await expect(page.getByRole("link", { name: /Resume/ })).toHaveClass(/border/);

    // Hero entrance signals the navbar (liquid glass waits on it).
    await expect
      .poll(() => page.evaluate(() => (window as any).__portfolioHeroMotionDone === true))
      .toBe(true);

    expect(missing, `missing resources:\n${missing.join("\n")}`).toEqual([]);
    expect(errors, errors.join("\n")).toEqual([]);
  });

  test("nav links reach every page with the right title", async ({ page }) => {
    await page.goto("/");
    const routes: Array<[string, RegExp]> = [
      ["/projects", /^Projects \|/],
      ["/blog", /^Blog \|/],
      ["/awards", /^Awards \|/],
      ["/ideology", /^Ideology \|/],
    ];
    for (const [path, title] of routes) {
      await page.goto(path);
      await expect(page).toHaveTitle(title);
      await expect(page.locator("header .nav-capsule")).toBeVisible();
    }
  });

  test("unknown route serves the 404 page", async ({ page }) => {
    const response = await page.goto("/definitely-not-a-page");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page Not Found" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Go Home/ })).toHaveAttribute("href", "/");
  });

  test("theme toggle flips the html class and persists across navigation", async ({ page }) => {
    await page.goto("/ideology");
    const html = page.locator("html");
    await expect(html).toHaveClass(/dark/); // default theme is dark
    await hydrated(page, "navbar");

    if (isMobile(page)) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page.getByRole("button", { name: "Toggle theme" }).click();
    } else {
      await page.locator("header").getByRole("button", { name: "Settings" }).click();
      await page.getByRole("button", { name: /Switch to light/ }).click();
    }
    await expect(html).not.toHaveClass(/dark/);
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("light");

    await page.goto("/projects");
    await expect(html).not.toHaveClass(/dark/);
  });

  test("mobile sheet lists navigation and closes on selection", async ({ page }) => {
    test.skip(!isMobile(page), "mobile only");
    await page.goto("/");
    await hydrated(page, "navbar");
    await page.getByRole("button", { name: "Open navigation" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toContainText("Riddhiman Rana");
    await dialog.getByRole("link", { name: "awards" }).click();
    await expect(page).toHaveURL(/\/awards$/);
  });
});

test.describe("projects", () => {
  test("clicking a project opens its dialog with links", async ({ page }) => {
    await page.goto("/projects");
    await hydrated(page, "projects-page");
    await page.getByRole("heading", { name: "Let's Assist", exact: true }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { name: "Let's Assist" })).toBeVisible();
    await expect(dialog.getByRole("link", { name: /Visit project/ })).toHaveAttribute(
      "href",
      /lets-assist/
    );
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });
});

test.describe("awards", () => {
  test("deep link selects the award and search filters the timeline", async ({ page }) => {
    await page.goto("/awards?id=usaco-platinum");
    await hydrated(page, "awards-page");
    if (isMobile(page)) {
      await expect(page.getByRole("dialog")).toContainText("USACO Platinum Contest");
      await page.keyboard.press("Escape");
    } else {
      await expect(page.locator("aside")).toContainText("USACO Platinum Contest");
    }

    await page.getByPlaceholder("Search awards").fill("kangaroo");
    const rows = page.locator("main h3");
    await expect(rows).not.toHaveCount(0);
    for (const text of await rows.allInnerTexts()) {
      expect(text.toLowerCase()).toContain("kangaroo");
    }

    await page.getByPlaceholder("Search awards").fill("zzzz-no-match");
    await expect(page.getByText("No matching awards")).toBeVisible();
  });
});

test.describe("blog", () => {
  test("index lists posts newest first with read times", async ({ page }) => {
    await page.goto("/blog");
    const links = page.locator("main a[href^='/blog/']");
    expect(await links.count()).toBeGreaterThanOrEqual(6);
    await expect(links.first()).toContainText(/min read/);
  });

  test("post renders build-time code blocks, working copy button and TOC anchors", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/blog/escaping-icloud-photos");
    await expect(page.getByRole("link", { name: /Back to blog/ })).toHaveClass(/border/);

    // Shiki output with dual-theme variables, no client markdown bundle.
    const firstBlock = page.locator(".code-block").first();
    await expect(firstBlock).toBeVisible();
    await expect(firstBlock.locator("pre.astro-code")).toHaveCount(1);
    const scripts = await page.locator("script[src]").evaluateAll((els) =>
      els.map((el) => (el as HTMLScriptElement).src)
    );
    expect(scripts.some((src) => /markdown|katex|highlighter/i.test(src))).toBe(false);

    // Fence meta title shows in the header.
    await expect(page.locator(".code-block-title", { hasText: "docker-compose.yml" }).first()).toBeVisible();

    // Copy button copies the code.
    const block = page.locator(".code-block", { hasText: "sudo apt update" }).first();
    await block.scrollIntoViewIfNeeded();
    await block.locator(".code-block-copy").click();
    await expect(block.locator(".code-block-copy")).toHaveClass(/copied/);
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("sudo apt update");

    // TOC links resolve to real heading ids in the article.
    if (!isMobile(page)) {
      const hrefs = await page.locator("aside nav a").evaluateAll((els) =>
        els.map((el) => (el as HTMLAnchorElement).getAttribute("href") ?? "")
      );
      expect(hrefs.length).toBeGreaterThan(3);
      for (const href of hrefs) {
        await expect(page.locator(`article [id="${href.slice(1)}"]`)).toHaveCount(1);
      }
    }
  });
});
