// The portfolio page. client.js hands over to this file's default export.

import { css } from "./styles.js";
import { css2 } from "./styles2.js";
import * as data from "./data.js";
import { h } from "./dom.js";
import { env, jump, section } from "./kit.js";
import { hero, showResume, downloadResume } from "./hero.js";
import {
  aboutSection,
  experienceSection,
  skillsSection,
  involvementSection,
  recommendationsSection,
  interestsSection,
  contactSection,
  footer,
} from "./sections.js";
import { projects, projectsSection } from "./projects.js";
import { mountShell } from "./shell.js";
import { startBackground } from "./background.js";

const { profile, meta } = data;

// [id, heading, short name for the navigation]
const SECTIONS = [
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["involvement", "Involvement"],
  ["recommendations", "Recommendations"],
  ["interests", "Beyond The Keyboard"],
  ["terminal", "Terminal"],
  ["contact", "Contact"],
];
// Shown directly in the header on wide screens; the rest sit under "More".
const PRIMARY = ["about", "experience", "projects", "skills", "contact"];

function countUp(el, stat) {
  const started = performance.now();
  const duration = 1300;
  const step = (now) => {
    const t = Math.min(1, (now - started) / duration);
    el.textContent = Math.round(stat.value * (1 - Math.pow(1 - t, 3))) + stat.suffix;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function setUpMotion(root, counters) {
  const targets = root.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("in"));
    return;
  }
  const reveal = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal.unobserve(entry.target);
        entry.target.classList.add("in");
        const number = entry.target.querySelector("b");
        if (number && counters.has(number)) countUp(number, counters.get(number));
      }
    },
    { threshold: 0.08 },
  );
  targets.forEach((el) => reveal.observe(el));
}

// Highlights the navigation link of the section being read. It checks the scroll position on each
// scroll, because an IntersectionObserver only reports when a section starts or stops crossing a
// band, so a long section such as Projects could keep the wrong link highlighted.
function trackSection(root, navLinks) {
  const sections = Array.from(root.querySelectorAll("section.sec"));
  let current = null;
  const update = () => {
    const line = window.innerHeight * 0.4;
    let active = sections.length ? sections[0].id : null;
    for (const el of sections) if (el.getBoundingClientRect().top <= line) active = el.id;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom && sections.length) active = sections[sections.length - 1].id;
    if (active === current) return;
    current = active;
    for (const [id, links] of navLinks) {
      for (const a of links) {
        const on = id === active;
        a.classList.toggle("on", on);
        if (on) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      }
    }
  };
  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      update();
    });
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  update();
}

const FAVICON_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#070b13"/><path d="M14 18l6 28 6-28h4l6 28 6-28h4l-8 32h-4l-6-24-6 24h-4z" fill="#f6821f"/></svg>';

// Light or dark theme. Dark is the default. The choice is remembered on this device if storage is allowed.
const THEME_KEY = "wasay-portfolio-theme";
function loadTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === "light";
  } catch {
    return false;
  }
}
function applyTheme(light) {
  document.documentElement.classList.toggle("light", light);
  try {
    localStorage.setItem(THEME_KEY, light ? "light" : "dark");
  } catch {
    // Storage is blocked here, so the choice only lasts for this visit.
  }
}

// A thin bar across the top that grows as the visitor scrolls down the page.
function trackProgress(bar) {
  let queued = false;
  const update = () => {
    queued = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const share = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    bar.style.transform = `scaleX(${share})`;
  };
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  update();
}

export default {
  async main(gadget) {
    let assets = { photo: null, resume: null };
    try {
      assets = await gadget.getAssets();
    } catch (error) {
      console.error("Could not load the photo and résumé:", error);
    }

    const isExport = typeof globalThis.gadgetExportFormatId !== "undefined";
    const reduced = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    env.isExport = isExport;
    env.pdf = globalThis.gadgetExportFormatId === "pdf";
    env.staticMode = isExport || reduced;
    env.smooth = !env.staticMode;

    applyTheme(loadTheme());
    const allProjects = projects;
    // Event photos come from the server; an entry without one keeps its placeholder.
    const eventPhotos = {};
    await Promise.all(
      data.involvement
        .filter((item) => item.id)
        .map(async (item) => {
          try {
            eventPhotos[item.id] = await gadget.getEventPhoto(item.id);
          } catch (error) {
            console.error("Could not load the event photo:", error);
          }
        }),
    );
    // The university seal beside the school name on the Education card.
    try {
      data.education.logoPhoto = await gadget.getEventPhoto("utd");
    } catch (error) {
      console.error("Could not load the university logo:", error);
    }
    const involvement = data.involvement.map((item) => (eventPhotos[item.id] ? { ...item, photo: eventPhotos[item.id] } : item));
    const extra = {};
    const marked = false;
    const certs = data.certifications.filter((c) => !c.pending || !isExport);
    const recs = data.recommendations.filter((r) => r.quote);

    document.title = meta.title;
    document.documentElement.lang = "en";
    document.head.append(
      h("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      h("meta", { name: "theme-color", content: "#070b13" }),
      h("meta", { name: "description", content: meta.description }),
      // Link previews (LinkedIn, Slack, etc.). og:image is added once the site has a public address.
      h("meta", { property: "og:type", content: "website" }),
      h("meta", { property: "og:title", content: meta.title }),
      h("meta", { property: "og:description", content: meta.description }),
      h("meta", { name: "twitter:card", content: "summary_large_image" }),
      h("meta", { name: "twitter:title", content: meta.title }),
      h("meta", { name: "twitter:description", content: meta.description }),
      // Favicon: a small orange "W" on the dark background, drawn inline so it needs no file.
      h("link", { rel: "icon", type: "image/svg+xml", href: "data:image/svg+xml," + encodeURIComponent(FAVICON_SVG) }),
      h("style", {}, css + css2),
    );
    document.body.classList.toggle("static", env.staticMode);

    env.shown = SECTIONS.filter(([id]) => {
      if (id === "terminal") return !isExport;
      if (id === "recommendations") return recs.length > 0;
      if (id === "involvement") return involvement.length > 0;
      return true;
    });

    const navLinks = new Map();
    const navLink = ([id, label]) => {
      const a = jump(id, {}, label);
      if (!navLinks.has(id)) navLinks.set(id, []);
      navLinks.get(id).push(a);
      return a;
    };
    // Exports are static snapshots, so the theme button and progress bar are left out of them.
    const themeToggle = isExport ? null : h("button", { type: "button", class: "theme-toggle" });
    const progressBar = isExport ? null : h("div", { class: "progress", "aria-hidden": "true" });
    const syncTheme = () => {
      const light = document.documentElement.classList.contains("light");
      themeToggle.textContent = light ? "Dark Mode" : "Light Mode";
      themeToggle.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
    };
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        applyTheme(!document.documentElement.classList.contains("light"));
        syncTheme();
      });
      syncTheme();
    }
    const primary = env.shown.filter(([id]) => PRIMARY.includes(id));
    const rest = env.shown.filter(([id]) => !PRIMARY.includes(id));
    const nav = h(
      "nav",
      { class: "nav", "aria-label": "Sections" },
      h(
        "div",
        { class: "wrap nav-in" },
        jump("top", { class: "brand", "aria-label": "Back to top" }, h("b", {}, profile.first), h("span", { class: "at" }, "@Portfolio"), h("span", { class: "path" }, ":~$")),
        h(
          "div",
          { class: "nav-right" },
          h("div", { class: "nav-links" }, primary.map(navLink)),
          h("details", { class: "drop more" }, h("summary", {}, "More ▾"), h("div", { class: "drop-panel" }, rest.map(navLink))),
          themeToggle,
          h("details", { class: "drop menu" }, h("summary", {}, "☰ Menu"), h("div", { class: "drop-panel" }, env.shown.map(navLink))),
        ),
      ),
    );
    // Close an open menu with Escape or by clicking elsewhere.
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") nav.querySelectorAll("details[open]").forEach((d) => (d.open = false));
    });
    document.addEventListener("click", (e) => {
      nav.querySelectorAll("details[open]").forEach((d) => {
        if (!d.contains(e.target)) d.open = false;
      });
    });

    const counters = new Map();
    const terminal = isExport
      ? null
      : section(
          "terminal",
          "Prefer The Command Line?",
          h("div", { class: "reveal" }, mountShell(data, allProjects, { resume: downloadResume })),
        );

    const page = h(
      "div",
      { class: "page" },
      jump("main", { class: "skip" }, "Skip To Content"),
      h("div", { class: "glow" }),
      nav,
      hero(assets.photo),
      h(
        "main",
        { class: "wrap", id: "main" },
        aboutSection(counters),
        experienceSection(extra, marked),
        projectsSection(allProjects),
        skillsSection(certs),
        involvement.length ? involvementSection(involvement, marked) : null,
        recs.length ? recommendationsSection(recs) : null,
        interestsSection(),
        terminal,
        contactSection(),
      ),
      footer(),
    );

    if (!env.staticMode) {
      const canvas = h("canvas", { class: "net", "aria-hidden": "true" });
      document.body.append(canvas);
      startBackground(canvas);
    }
    if (progressBar) document.body.append(progressBar);
    document.body.append(page);
    // Exported files have embedded-file links removed, so the button would do nothing there.
    showResume(isExport ? null : assets.resume);

    if (!env.staticMode) setUpMotion(page, counters);
    if (!isExport) {
      trackSection(page, navLinks);
      if (progressBar) trackProgress(progressBar);
    }
  },
};
