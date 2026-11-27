// Small helpers for building the page.

export function h(tag, attrs, ...children) {
  const el = document.createElement(tag);
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      if (value == null || value === false) continue;
      if (key === "class") {
        el.className = value;
      } else if (key === "style" && typeof value === "object") {
        for (const [prop, v] of Object.entries(value)) {
          if (prop.startsWith("--")) el.style.setProperty(prop, v);
          else el.style[prop] = v;
        }
      } else if (key.startsWith("on") && typeof value === "function") {
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        el.setAttribute(key, value === true ? "" : String(value));
      }
    }
  }
  append(el, children);
  return el;
}

function append(el, children) {
  for (const child of children) {
    if (child == null || child === false) continue;
    if (Array.isArray(child)) append(el, child);
    else el.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
}

const ICONS = {
  mail: '<path d="M3 6h18v12H3z"/><path d="m3 7 9 7 9-7"/>',
  linkedin:
    '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.2v.1M12 17v-6.5M12 13.2a2.2 2.2 0 0 1 4.4 0V17"/>',
  code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
  shield:
    '<path d="M12 3 4.5 6v5.5c0 4.6 3.1 8 7.5 9.5 4.4-1.500 7.5-4.9 7.5-9.5V6L12 3z"/><path d="m8.800 12 2.300 2.300 4.200-4.600"/>',
  arrow: '<path d="M7 17 17 7M9 7h8v8"/>',
  download: '<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>',
  pin: '<path d="M12 21s7-6.100 7-11a7 7 0 1 0-14 0c0 4.900 7 11 7 11z"/><circle cx="12" cy="10" r="2.500"/>',
};

export function icon(name) {
  const span = document.createElement("span");
  span.className = "ico";
  span.setAttribute("aria-hidden", "true");
  span.innerHTML =
    '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.700" stroke-linecap="round" stroke-linejoin="round">' +
    (ICONS[name] || "") +
    "</svg>";
  return span;
}

export function link(url, attrs, ...children) {
  const external = /^https?:/.test(url);
  return h(
    "a",
    { href: url, target: external ? "_blank" : null, rel: external ? "noopener noreferrer" : null, ...attrs },
    ...children,
  );
}
