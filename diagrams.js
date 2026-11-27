// Reusable SVG flow diagrams: boxes joined by arrows, with an optional dashed "validation
// boundary" around some of them. Always captioned as illustrative.

import { h } from "./dom.js";

const NS = "http://www.w3.org/2000/svg";

function svg(tag, attrs, ...children) {
  const el = document.createElementNS(NS, tag);
  for (const [key, value] of Object.entries(attrs || {})) el.setAttribute(key, String(value));
  for (const child of children) el.append(child);
  return el;
}

// flow: { nodes: ["Label", "Two\nLines"], boundary: [firstIndex, lastIndex] (optional) }
export function flowDiagram(flow, title) {
  const W = 140;
  const H = 54;
  const GAP = 44;
  const PAD = 16;
  const TOP = flow.boundary ? 34 : 12;
  const n = flow.nodes.length;
  const width = PAD * 2 + n * W + (n - 1) * GAP;
  const height = TOP + H + 18;
  const x = (i) => PAD + i * (W + GAP);

  const root = svg(
    "svg",
    { viewBox: `0 0 ${width} ${height}`, width, height, role: "img", "aria-label": `${title}: ${flow.nodes.map((s) => s.replace("\n", " ")).join(", then ")}` },
    svg(
      "defs",
      {},
      svg("marker", { id: "flow-arrow", viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: "auto" }, svg("path", { d: "M0 0 10 5 0 10z", fill: "#5aa9ff" })),
    ),
  );

  if (flow.boundary) {
    const [a, b] = flow.boundary;
    root.append(
      svg("rect", { x: x(a) - 10, y: TOP - 12, width: x(b) + W - x(a) + 20, height: H + 24, rx: 12, fill: "none", stroke: "#ffb454", "stroke-width": 1.2, "stroke-dasharray": "5 4" }),
      svg("text", { x: x(a) - 4, y: TOP - 18, fill: "#ffb454", "font-size": 10.5, "font-family": "ui-monospace,Menlo,Consolas,monospace" }, "VALIDATION BOUNDARY"),
    );
  }

  flow.nodes.forEach((label, i) => {
    const last = i === n - 1;
    root.append(
      svg("rect", { x: x(i), y: TOP, width: W, height: H, rx: 9, fill: "#111b2a", stroke: i === 0 ? "#4ef0b8" : last ? "#4ef0b8" : "#5aa9ff", "stroke-width": 1.2 }),
    );
    const lines = label.split("\n");
    lines.forEach((line, j) => {
      root.append(
        svg(
          "text",
          { x: x(i) + W / 2, y: TOP + H / 2 + 4 + (j - (lines.length - 1) / 2) * 15, "text-anchor": "middle", fill: "#dbe4ee", "font-size": 12, "font-family": "system-ui,Segoe UI,Arial,sans-serif" },
          line,
        ),
      );
    });
    if (!last) {
      root.append(svg("line", { x1: x(i) + W + 4, y1: TOP + H / 2, x2: x(i + 1) - 5, y2: TOP + H / 2, stroke: "#5aa9ff", "stroke-width": 1.5, "marker-end": "url(#flow-arrow)" }));
    }
  });

  return h(
    "figure",
    { class: "diagram" },
    h("div", { class: "diagram-scroll", tabindex: "0", role: "group", "aria-label": title + " diagram (scrolls sideways on small screens)" }, root),
    h("figcaption", {}, "Illustrative diagram: a simplified flow, not an actual system architecture, with no real data."),
  );
}
