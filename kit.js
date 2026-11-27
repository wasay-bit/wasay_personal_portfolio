// Shared page helpers for the site (site.js and friends).

import { h } from "./dom.js";

// Set once by site.js before anything is built.
export const env = { smooth: false, isExport: false, pdf: false, staticMode: false, shown: [] };

export function goTo(id) {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: env.smooth ? "smooth" : "auto", block: "start" });
  return !!target;
}

// In-page links are real "#id" anchors so they still work in a script-less export.
export function jump(id, attrs, ...children) {
  return h(
    "a",
    {
      href: "#" + id,
      ...attrs,
      onclick: (e) => {
        e.preventDefault();
        goTo(id);
        const menu = e.currentTarget.closest("details.drop");
        if (menu) menu.open = false;
      },
    },
    ...children,
  );
}

export function section(id, title, ...children) {
  const number = String(env.shown.findIndex(([sid]) => sid === id) + 1).padStart(2, "0");
  return h(
    "section",
    { class: "sec", id, "aria-labelledby": id + "-h" },
    h("div", { class: "sec-head reveal" }, h("span", { class: "sec-num" }, number + " //"), h("h2", { id: id + "-h" }, title)),
    ...children,
  );
}

// Marks content that is still waiting for approval. Such content is only ever built into the
// private working view, never into an exported file.
export const pendingChip = (text) => h("span", { class: "pend" }, text || "Pending Approval");

// Copies text to the clipboard. Resolves true on success. Nothing is stored or sent anywhere.
export async function copyText(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the older method
  }
  try {
    const area = h("textarea", { style: { position: "fixed", opacity: "0" }, readonly: true });
    area.value = text;
    document.body.append(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

// A button that copies `getText()` and briefly reports what happened.
export function copyButton(label, getText, cls) {
  const button = h("button", { type: "button", class: cls || "mini" }, label);
  button.addEventListener("click", async () => {
    const text = getText();
    if (!text) return;
    const ok = await copyText(text);
    button.textContent = ok ? "Copied ✓" : "Select The Text And Copy";
    setTimeout(() => (button.textContent = label), 1800);
  });
  return button;
}
