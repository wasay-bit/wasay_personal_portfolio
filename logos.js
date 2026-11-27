// Company logos, drawn from each company's own published SVG files (cloudflare.com and
// austin-ind.com). They are trademarks of their owners; don't redraw or recolor them.

import { h } from "./dom.js";

// The Cloudflare cloud mark, cropped from the official logo (the wordmark is left out).
const CLOUDFLARE =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="54.4 3.1 49.2 22.8" role="img" aria-label="Cloudflare">' +
  '<path fill="#fff" d="M98.6 14.2L93 12.9l-1-.4-25.7.2v12.4l32.3.1z"/>' +
  '<path fill="#f48120" d="M88.1 24c.3-1 .2-2-.3-2.6-.5-.6-1.2-1-2.1-1.1l-17.4-.2c-.1 0-.2-.1-.3-.1-.1-.1-.1-.2 0-.3.1-.2.2-.3.4-.3l17.5-.2c2.1-.1 4.3-1.8 5.1-3.8l1-2.6c0-.1.1-.2 0-.3-1.1-5.1-5.7-8.9-11.1-8.9-5 0-9.3 3.2-10.8 7.7-1-.7-2.2-1.1-3.6-1-2.4.2-4.3 2.2-4.6 4.6-.1.6 0 1.2.1 1.8-3.9.1-7.1 3.3-7.1 7.3 0 .4 0 .7.1 1.1 0 .2.2.3.3.3h32.1c.2 0 .4-.1.4-.3l.3-1.1z"/>' +
  '<path fill="#faad3f" d="M93.6 12.8h-.5c-.1 0-.2.1-.3.2l-.7 2.4c-.3 1-.2 2 .3 2.6.5.6 1.2 1 2.1 1.1l3.7.2c.1 0 .2.1.3.1.1.1.1.2 0 .3-.1.2-.2.3-.4.3l-3.8.2c-2.1.1-4.3 1.8-5.1 3.8l-.2.9c-.1.1 0 .3.2.3h13.2c.2 0 .3-.1.3-.3.2-.8.4-1.7.4-2.6 0-5.2-4.3-9.5-9.5-9.5"/>' +
  "</svg>";

// The Austin Industries logo: already a white rounded square, so it needs no tile behind it.
const AUSTIN =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 185.1 185.1" role="img" aria-label="Austin Industries">' +
  '<path fill="#fff" stroke="#000" stroke-width="4.188" d="M183,174.1c0,4.9-4.1,8.9-9.2,8.9H11.3c-5.1,0-9.2-4-9.2-8.9V11c0-4.9,4.1-8.9,9.2-8.9h162.5c5.1,0,9.2,4,9.2,8.9V174.1z"/>' +
  '<path d="M26.2,111h13.4l15.3,45.6H42l-1.6-5.1H24.7l-1.6,5.1H10.2L26.2,111z M28.4,140.2h8.5l-4.2-16.5L28.4,140.2z"/>' +
  '<path d="M84.1,156.5h-11v-3c-2.2,2.3-4.7,3.8-8,3.8c-4.5,0-9.5-2.5-9.5-9.4v-24.1h11v18c0,2.1,0.4,4.6,3.4,4.6c2.7,0,3.2-2.5,3.2-4.6v-18h11V156.5z"/>' +
  '<path d="M101.1,133.3c-1.3,0-2.5,0.8-2.5,2.2c0,2.4,7.1,4.5,7.1,11.9c0,6.3-3.8,9.9-12.1,9.9c-0.9,0-2.5,0-6-0.8v-10.2c0.5,0.3,1.8,0.8,3.3,0.8c1.4,0,2.9-0.5,2.9-2c0-2.7-6.8-4.3-6.8-11.9c0-7.1,4.5-9.4,11.3-9.4c3,0,4.9,0,6.1,0c0,0,5.2,0,5.2,0v-4l11-6.3v10.4h4.1v9.5h-4.1v9c0,1.6,0,3.3,3.2,3.3c0.9,0,1.3-0.1,1.6-0.3l0.1,11.3c-9.3,0-16,0-16-8.3v-15l-5.2,0C104.6,133.2,102.6,133.3,101.1,133.3"/>' +
  '<path d="M128.4,111h11v9.9h-11V111z M128.4,123.8h11v32.8h-11V123.8z"/>' +
  '<path d="M143.5,123.8h11v3c2.2-2.3,4.7-3.8,8-3.8c4.6,0,9.5,2.5,9.5,9.4v24.1h-11v-18c0-2.1-0.4-4.6-3.4-4.6c-2.7,0-3.2,2.5-3.2,4.6v18h-11V123.8z"/>' +
  '<polygon points="64.7,75.1 49.9,50.5 64.7,25.9 94.4,25.9 109.3,50.5 94.4,75.1 79.5,50.5"/>' +
  '<polygon fill="#ed1c24" points="124.1,75.1 138.9,99.8 79.6,99.8 64.7,75.1"/>' +
  "</svg>";

const LOGOS = {
  cloudflare: { svg: CLOUDFLARE, padded: true },
  austin: { svg: AUSTIN, padded: false },
};

// A square logo tile for a company. Companies without a logo get their initials instead.
export function logoTile(id, name) {
  const logo = LOGOS[id];
  if (!logo) {
    const initials = String(name || "")
      .split(/\s+/)
      .map((word) => word[0] || "")
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return h("span", { class: "logo mono", "aria-hidden": "true" }, initials);
  }
  const tile = h("span", { class: "logo" + (logo.padded ? " pad" : "") });
  tile.innerHTML = logo.svg;
  return tile;
}

// A small inline chip with just the logo, for use inside a line of text.
export function logoChip(id) {
  const logo = LOGOS[id];
  if (!logo) return null;
  const chip = h("span", { class: "logo-chip" + (logo.padded ? " pad" : "") });
  chip.innerHTML = logo.svg;
  return chip;
}
