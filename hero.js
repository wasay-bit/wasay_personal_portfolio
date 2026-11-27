// The top of the page: typed "authenticate" line, name, rotating titles, buttons and the
// access badge. Also owns the "Download Résumé" buttons and the badge photo.

import { h, icon, link } from "./dom.js";
import { logoChip } from "./logos.js";
import { env, jump } from "./kit.js";
import { profile } from "./data.js";

// ---- résumé download -----------------------------------------------------

// Every "Download Résumé" button on the page. They stay hidden until a résumé is stored.
const resumeButtons = [];

export function resumeButton(cls) {
  const button = h("a", { class: cls, hidden: true }, icon("download"), "Download Résumé");
  resumeButtons.push(button);
  return button;
}

export function showResume(resume) {
  for (const button of resumeButtons) {
    button.hidden = !resume;
    if (resume) {
      button.href = resume.url;
      button.setAttribute("download", resume.name);
    } else {
      button.removeAttribute("href");
    }
  }
}

// Starts the résumé download, as if a button had been clicked. False when there is none.
export function downloadResume() {
  const button = resumeButtons.find((b) => !b.hidden && b.hasAttribute("href"));
  if (button) button.click();
  return !!button;
}

// ---- badge ---------------------------------------------------------------

// Swaps the badge's picture: the stored photo when there is one, otherwise the initials.
export let showPhoto = () => {};

function badge(photo) {
  const avatar = h("div", { class: "avatar" });
  const pct = (ratio) => (ratio * 100).toFixed(2) + "%";
  let current;
  showPhoto = (url) => {
    url = url || null;
    if (url === current) return;
    current = url;
    if (!url) {
      avatar.replaceChildren(h("div", { class: "hex" }, profile.initials));
      return;
    }
    const crop = profile.photoCrop;
    avatar.replaceChildren(
      h(
        "div",
        { class: "photo" },
        h(
          "div",
          { class: "photo-in" },
          h("img", {
            src: url,
            alt: `Portrait of ${profile.first} ${profile.last}`,
            style: { width: pct(crop.width / crop.size), left: pct(-crop.x / crop.size), top: pct(-crop.y / crop.size) },
          }),
        ),
      ),
    );
  };
  showPhoto(photo);

  const card = h(
    "div",
    { class: "badge" },
    avatar,
    h("div", { class: "badge-name" }, `${profile.first} ${profile.last}`),
    h("div", { class: "badge-sub" }, profile.badgeRole),
    h("div", { class: "live" }, h("i"), profile.badgeStatus),
    h("div", { class: "badge-tags" }, profile.badgeTags.map((tag) => h("span", { class: tag.tone || null }, tag.text))),
  );
  const wrap = h("div", { class: "badge-wrap reveal" }, card);
  if (!env.staticMode) {
    wrap.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return; // no tilt while scrolling past it on a touch screen
      const box = card.getBoundingClientRect();
      const px = Math.min(1, Math.max(0, (e.clientX - box.left) / box.width));
      const py = Math.min(1, Math.max(0, (e.clientY - box.top) / box.height));
      card.style.setProperty("--ry", ((px - 0.5) * 16).toFixed(2) + "deg");
      card.style.setProperty("--rx", ((0.5 - py) * 16).toFixed(2) + "deg");
      card.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
      card.style.setProperty("--my", (py * 100).toFixed(1) + "%");
    });
    wrap.addEventListener("pointerleave", () => {
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--mx", "50%");
      card.style.setProperty("--my", "0%");
    });
  }
  return wrap;
}

// ---- typed lines ---------------------------------------------------------

function typeBoot(el) {
  const command = "$ authenticate --visitor";
  const granted = h("span", { class: "ok" }, "  ✓ Access Granted");
  if (env.staticMode) {
    el.append(command, granted);
    return;
  }
  const text = document.createTextNode("");
  el.append(text);
  let i = 0;
  const tick = () => {
    i++;
    text.data = command.slice(0, i);
    if (i < command.length) setTimeout(tick, 38);
    else setTimeout(() => el.append(granted), 450);
  };
  setTimeout(tick, 300);
}

function typeRoles(el, words) {
  const text = document.createTextNode(env.staticMode ? words.join(" · ") : "");
  el.append(text);
  if (env.staticMode) return;
  el.append(h("span", { class: "caret" }));
  let word = 0;
  let i = 0;
  let deleting = false;
  const tick = () => {
    const current = words[word];
    i += deleting ? -1 : 1;
    text.data = current.slice(0, i);
    let delay = deleting ? 30 : 65;
    if (!deleting && i === current.length) {
      deleting = true;
      delay = 1700;
    } else if (deleting && i === 0) {
      deleting = false;
      word = (word + 1) % words.length;
      delay = 350;
    }
    setTimeout(tick, delay);
  };
  setTimeout(tick, 1500);
}

// ---- hero ----------------------------------------------------------------

export function hero(photo) {
  const boot = h("div", { class: "boot" });
  // Screen readers get the full list once instead of the letter-by-letter animation.
  const typed = h("span", { "aria-hidden": "true" });
  const typer = h("div", { class: "typer" }, h("span", { class: "sr" }, profile.roles.join(", ")), typed);
  typeBoot(boot);
  typeRoles(typed, profile.roles);
  return h(
    "header",
    { class: "hero wrap", id: "top" },
    h(
      "div",
      {},
      boot,
      h("h1", {}, profile.first, " ", h("span", { class: "last" }, profile.last)),
      typer,
      jump(
        "experience",
        { class: "current" },
        logoChip(profile.current.logo),
        h("span", {}, "Currently ", profile.current.role, " @ ", h("b", {}, profile.current.org)),
      ),
      h("p", { class: "tagline" }, profile.tagline),
      h(
        "div",
        { class: "hero-cta" },
        jump("projects", { class: "btn solid" }, "Explore My Work"),
        resumeButton("btn"),
        jump("contact", { class: "btn" }, icon("mail"), "Get In Touch"),
      ),
      h(
        "div",
        { class: "hero-social" },
        link(profile.github.url, {}, icon("code"), "GitHub"),
        link(profile.linkedin.url, {}, icon("linkedin"), "LinkedIn"),
      ),
    ),
    badge(photo),
    jump("about", { class: "scroll-hint", "aria-label": "Scroll to the About section" }, h("span", {}, "Scroll"), h("i", { "aria-hidden": "true" }, "↓")),
  );
}
