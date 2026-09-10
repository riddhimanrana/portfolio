// Rehype plugin for blog post HTML. Replaces the per-element overrides the
// old client-side react-markdown renderer applied.
//
// - Images: lazy loading, async decoding. An alt text starting with "small|"
//   (the convention used by the posts) renders at 400px wide; the prefix is
//   stripped from the alt text.
// - External links open in a new tab with rel="noopener noreferrer".
// - Tables are wrapped so wide ones scroll instead of breaking the layout.
const SMALL_PREFIX = "small|";

function visit(node, fn, parent = null, index = -1) {
  if (!node) return;
  fn(node, parent, index);
  if (Array.isArray(node.children)) {
    // Iterate over a copy: fn may replace children of `node`.
    [...node.children].forEach((child, i) => visit(child, fn, node, i));
  }
}

export default function rehypePostElements() {
  return (tree) => {
    visit(tree, (node, parent, index) => {
      if (node.type !== "element") return;
      const props = (node.properties ??= {});

      if (node.tagName === "img") {
        props.loading = "lazy";
        props.decoding = "async";
        const alt = typeof props.alt === "string" ? props.alt : "";
        const small = alt.startsWith(SMALL_PREFIX);
        if (small) props.alt = alt.slice(SMALL_PREFIX.length);
        props.className = [
          ...(props.className ?? []),
          small ? "post-image-small" : "post-image",
        ];
        return;
      }

      if (node.tagName === "a" && typeof props.href === "string" && /^https?:\/\//.test(props.href)) {
        props.target = "_blank";
        props.rel = "noopener noreferrer";
        return;
      }

      if (node.tagName === "table" && parent && index >= 0 && parent.tagName !== "div") {
        parent.children[index] = {
          type: "element",
          tagName: "div",
          properties: { className: ["post-table"] },
          children: [node],
        };
      }
    });
  };
}
