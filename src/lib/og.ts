import { readFile } from "node:fs/promises";
import { join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

// Open Graph images (1200x630) rendered at build time with satori. The look
// mirrors the site: near-black ground, blue light field, the gradient name
// treatment from the hero, Overused Grotesk.
export interface OgInput {
  /** Small lowercase label above the title, e.g. "blog" or "riddhimanrana.com". */
  kicker: string;
  title: string;
  subtitle?: string;
  tags?: string[];
  /** ISO date shown for posts. */
  date?: string;
}

const WIDTH = 1200;
const HEIGHT = 630;

let fontsPromise: Promise<{ medium: Buffer; bold: Buffer; avatar: string }> | undefined;

function loadAssets() {
  fontsPromise ??= (async () => {
    const [medium, bold, avatarBytes] = await Promise.all([
      // Resolved from the project root: the bundled module lives in
      // dist/.prerender at build time, so import.meta.url is not usable.
      readFile(join(process.cwd(), "src/assets/fonts/OverusedGrotesk-Medium.ttf")),
      readFile(join(process.cwd(), "src/assets/fonts/OverusedGrotesk-Bold.ttf")),
      readFile(join(process.cwd(), "src/assets/profile1.jpeg")),
    ]);
    return {
      medium,
      bold,
      avatar: `data:image/jpeg;base64,${avatarBytes.toString("base64")}`,
    };
  })();
  return fontsPromise;
}

type Node = { type: string; props: Record<string, unknown> };
const el = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): Node => ({
  type,
  props: { style, ...extra, ...(children === undefined ? {} : { children }) },
});

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export async function renderOgImage(input: OgInput): Promise<Buffer> {
  const { medium, bold, avatar } = await loadAssets();
  const titleSize = input.title.length > 48 ? 60 : input.title.length > 30 ? 70 : 84;

  const tree = el(
    "div",
    {
      width: WIDTH,
      height: HEIGHT,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "64px 72px",
      color: "#eef3f9",
      fontFamily: "Overused Grotesk",
      backgroundColor: "#05080f",
      backgroundImage:
        "radial-gradient(circle at 12% 110%, rgba(52,120,246,0.55), transparent 55%), radial-gradient(circle at 88% 105%, rgba(140,205,255,0.5), transparent 50%), radial-gradient(circle at 50% 130%, rgba(226,240,255,0.65), transparent 45%)",
    },
    [
      // top row: kicker + domain
      el(
        "div",
        { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26, color: "#9fb0c8", letterSpacing: 4 },
        [
          el("div", { display: "flex" }, input.kicker.toLowerCase()),
          el("div", { display: "flex", letterSpacing: 0 }, "riddhimanrana.com"),
        ]
      ),
      // middle: title + subtitle
      el(
        "div",
        { display: "flex", flexDirection: "column", gap: 22, maxWidth: 1000 },
        [
          el(
            "div",
            {
              display: "flex",
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -3,
              backgroundImage: "linear-gradient(125deg, #8fb4ff 0%, #e6f3ff 45%, #5c8fe0 100%)",
              backgroundClip: "text",
              color: "transparent",
            },
            input.title
          ),
          input.subtitle
            ? el("div", { display: "flex", fontSize: 30, lineHeight: 1.35, color: "#b7c3d6", fontWeight: 500 }, input.subtitle)
            : el("div", { display: "flex" }),
        ]
      ),
      // bottom row: author + tags/date
      el(
        "div",
        { display: "flex", justifyContent: "space-between", alignItems: "center" },
        [
          el("div", { display: "flex", alignItems: "center", gap: 18 }, [
            el("img", { width: 56, height: 56, borderRadius: 999, objectFit: "cover" }, undefined, { src: avatar }),
            el("div", { display: "flex", flexDirection: "column" }, [
              el("div", { display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }, "Riddhiman Rana"),
              el("div", { display: "flex", fontSize: 20, color: "#9fb0c8" }, "developer, researcher, founder"),
            ]),
          ]),
          el(
            "div",
            { display: "flex", gap: 10, alignItems: "center" },
            [
              ...(input.date ? [el("div", { display: "flex", fontSize: 22, color: "#9fb0c8", marginRight: 6 }, formatDate(input.date))] : []),
              ...(input.tags ?? []).slice(0, 3).map((tag) =>
                el(
                  "div",
                  {
                    display: "flex",
                    fontSize: 20,
                    padding: "8px 16px",
                    borderRadius: 999,
                    border: "1px solid rgba(159,176,200,0.35)",
                    backgroundColor: "rgba(20,30,48,0.6)",
                    color: "#d6e0ee",
                  },
                  tag
                )
              ),
            ]
          ),
        ]
      ),
    ]
  );

  const svg = await satori(tree as any, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: "Overused Grotesk", data: medium, weight: 500, style: "normal" },
      { name: "Overused Grotesk", data: bold, weight: 700, style: "normal" },
    ],
  });

  return new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } }).render().asPng();
}
