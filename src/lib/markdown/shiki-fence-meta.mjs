// Shiki transformer for blog code blocks.
//
// Wraps each highlighted <pre> in a .code-block with a header (file icon,
// title from fence meta or the language, copy button) at build time, so a
// post needs no client-side markdown library. A few lines of script on the
// blog page wire up the copy button.
//
//   ```yaml title=docker-compose.yml   ->  header title "docker-compose.yml"
//   ```bash                            ->  header title "bash"
const TITLE_RE = /title=("([^"]+)"|'([^']+)'|(\S+))/;

const svg = (paths, extra = {}) => ({
  type: "element",
  tagName: "svg",
  properties: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ariaHidden: "true",
    ...extra,
  },
  children: paths.map((d) => ({ type: "element", tagName: "path", properties: { d }, children: [] })),
});

// lucide "file-code", "copy" and "check"
const fileIcon = () =>
  svg([
    "M10 12.5 8 15l2 2.5",
    "m14 12.5 2 2.5-2 2.5",
    "M14 2v4a2 2 0 0 0 2 2h4",
    "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z",
  ]);
const copyIcon = () =>
  svg([
    "M8 8m0 2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2z",
    "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
  ], { className: ["code-block-copy-icon"] });
const checkIcon = () => svg(["M20 6 9 17l-5-5"], { className: ["code-block-check-icon"] });

const text = (value) => ({ type: "text", value });
const el = (tagName, properties, children) => ({ type: "element", tagName, properties, children });

export default function shikiFenceMeta() {
  return {
    name: "fence-meta",
    pre(node) {
      const raw = this.options.meta?.__raw ?? "";
      const match = raw.match(TITLE_RE);
      node.properties["data-lang"] = this.options.lang ?? "text";
      if (match) node.properties["data-title"] = match[2] ?? match[3] ?? match[4];
    },
    root(root) {
      const pre = root.children.find((c) => c.type === "element" && c.tagName === "pre");
      if (!pre) return;
      const title = pre.properties["data-title"] ?? pre.properties["data-lang"] ?? "code";

      const header = el("div", { className: ["code-block-header"] }, [
        el("span", { className: ["code-block-title"] }, [fileIcon(), text(String(title))]),
        el(
          "button",
          { type: "button", className: ["code-block-copy"], ariaLabel: "Copy code" },
          [copyIcon(), checkIcon()]
        ),
      ]);

      root.children = [el("div", { className: ["code-block"] }, [header, pre])];
    },
  };
}
