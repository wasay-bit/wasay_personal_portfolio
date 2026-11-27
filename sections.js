// The page's content sections, other than projects, the terminal and the background.

import { h, icon, link } from "./dom.js";
import { logoTile } from "./logos.js";
import { env, jump, section, pendingChip, copyButton } from "./kit.js";
import { resumeButton } from "./hero.js";
import * as data from "./data.js";

const { profile, focus, stats, education, experience, skills, skillLevels, learning, interests } = data;

// Wraps each listed phrase in bold, with its own colour class. `phrases` is [[text, className], ...].
function emphasise(text, phrases) {
  const parts = [];
  let rest = text;
  while (rest.length) {
    let best = null;
    for (const [phrase, cls] of phrases) {
      const i = rest.indexOf(phrase);
      if (i !== -1 && (!best || i < best.i)) best = { i, phrase, cls };
    }
    if (!best) {
      parts.push(rest);
      break;
    }
    if (best.i) parts.push(rest.slice(0, best.i));
    parts.push(h("b", { class: "hl " + best.cls }, best.phrase));
    rest = rest.slice(best.i + best.phrase.length);
  }
  return parts;
}

export function aboutSection(counters) {
  const statCards = stats.map((stat) => {
    const number = h("b", {}, stat.value + stat.suffix);
    counters.set(number, stat);
    return h("div", { class: "card stat reveal" }, number, h("span", {}, stat.label), h("p", { class: "muted" }, stat.detail), h("small", {}, stat.source));
  });
  return section(
    "about",
    "About & Impact",
    h(
      "div",
      { class: "about" },
      h(
        "div",
        { class: "reveal" },
        profile.bio.map((p) => h("p", {}, emphasise(p, [["Enterprise Identity & Access Management intern", "hl-title"], ["Cloudflare", "hl-cf"]]))),
        h("div", { class: "where" }, icon("pin"), profile.location),
      ),
      h(
        "div",
        { class: "card edu reveal" },
        h("div", { class: "kicker" }, "Education"),
        h(
          "div",
          { class: "edu-head" },
          h("h3", {}, education.school),
          education.logoPhoto
            ? h("img", { class: "edu-logo", src: education.logoPhoto, alt: "University of Texas at Dallas seal", loading: "lazy" })
            : null,
        ),
        h("div", { class: "muted" }, education.degree),
        h("div", { class: "edu-meta" }, h("span", { class: "pill hi" }, "GPA " + education.gpa), h("span", { class: "pill" }, education.when)),
        h("div", { class: "kicker" }, "Relevant courses"),
        h("ul", {}, education.courses.map((c) => h("li", {}, c))),
        education.orgs.map((o) =>
          h(
            "div",
            { class: "org" },
            o.url ? link(o.url, {}, h("b", {}, o.name), icon("arrow")) : h("b", {}, o.name),
            h("div", { class: "muted mono" }, `${o.role} · ${o.when}`),
          ),
        ),
      ),
    ),
    h(
      "div",
      { class: "focus" },
      focus.map((f) => h("div", { class: "card focus-card reveal" }, icon(f.icon), h("h3", {}, f.title), h("p", {}, f.text))),
    ),
    h("div", { class: "sub reveal" }, "Impact By The Numbers"),
    h("div", { class: "stats" }, statCards),
  );
}

// The "Show The Details" button for a job, with the article button (if any) beside it on the same row.
// The details open and close in a panel below the row.
function jobDetails(job, open, ...children) {
  const article = job.article ? link(job.article.url, { class: "job-article" }, job.article.label, icon("arrow")) : null;
  if (env.isExport) {
    // Exports have no scripts, so use a native details element there.
    return h(
      "div",
      { class: "job-details" },
      article ? h("div", { class: "job-actions" }, article) : null,
      h(
        "details",
        { class: "writeup", open: !!open },
        h("summary", {}, h("span", { class: "wu-closed" }, "Show The Details"), h("span", { class: "wu-open" }, "Hide The Details")),
        ...children,
      ),
    );
  }
  const panel = h("div", { class: "job-panel" }, ...children);
  panel.hidden = !open;
  const toggle = h(
    "button",
    { type: "button", class: "details-toggle", "aria-expanded": String(!!open) },
    open ? "Hide The Details" : "Show The Details",
  );
  toggle.addEventListener("click", () => {
    const opening = panel.hidden;
    panel.hidden = !opening;
    toggle.setAttribute("aria-expanded", String(opening));
    toggle.textContent = opening ? "Hide The Details" : "Show The Details";
  });
  return h("div", { class: "job-details" }, h("div", { class: "job-actions" }, toggle, article), panel);
}

// `extra` maps a job id to bullets still waiting for approval (shown only in the working view).
export function experienceSection(extra, marked) {
  return section(
    "experience",
    "Experience",
    h(
      "div",
      { class: "tl" },
      experience.map((job) => {
        const more = extra[job.id] || [];
        return h(
          "article",
          { class: "job card reveal" + (job.current ? " now" : "") + (job.featured ? " featured" : ""), id: "job-" + job.id },
          h(
            "div",
            { class: "job-top" },
            logoTile(job.logo, job.org),
            h(
              "div",
              { class: "job-main" },
              h("div", { class: "job-head" }, h("h3", {}, job.role), h("span", { class: "job-when" }, job.when)),
              h("div", { class: "job-org" }, h("b", {}, job.org), h("span", {}, " · " + job.place), job.current ? h("span", { class: "now-pill" }, "Current Role") : null),
            ),
          ),
          h("p", { class: "job-sum" }, job.summary),
          h("div", { class: "tags" }, job.tags.map((t) => h("span", { class: "tag" }, t))),
          jobDetails(
            job,
            job.current || env.pdf,
            h("ul", {}, job.points.map((p) => h("li", {}, p))),
            more.length
              ? h(
                  "div",
                  { class: "job-extra" },
                  h("div", { class: "kicker" }, "What I'm Building ", marked ? pendingChip() : null),
                  h("ul", {}, more.map((p) => h("li", {}, p))),
                )
              : null,
          ),
        );
      }),
    ),
  );
}

export function skillsSection(certs) {
  return section(
    "skills",
    "Skills & Certifications",
    h(
      "div",
      { class: "legend reveal", "aria-label": "Skill level key" },
      Object.entries(skillLevels).map(([key, text]) => h("span", { class: "chip lv-" + key }, text)),
    ),
    h(
      "div",
      { class: "grid2" },
      skills.map((group) =>
        h(
          "div",
          { class: "card skill reveal" },
          h("h3", {}, group.group),
          h("div", { class: "chips" }, group.items.map(([name, lv]) => h("span", { class: "chip lv-" + lv, title: skillLevels[lv] }, name, h("span", { class: "sr" }, ` (${skillLevels[lv]})`)))),
        ),
      ),
    ),
    h("div", { class: "sub cert-title reveal" }, "Certifications"),
    h(
      "div",
      { class: "certs" },
      certs.map((cert) =>
        h(
          "div",
          { class: "card cert reveal" + (cert.pending ? " unverified" : "") },
          icon("shield"),
          h(
            "div",
            {},
            h("span", { class: "by" }, cert.issuer),
            h("b", { class: "cert-name" }, cert.name),
            cert.pending ? pendingChip("Title To Confirm") : null,
            cert.url ? link(cert.url, { class: "verify" }, "Verify ", icon("arrow")) : null,
          ),
        ),
      ),
    ),
    h("div", { class: "sub reveal" }, "Currently Pursuing"),
    h(
      "div",
      { class: "learning" },
      learning.map((item) =>
        h(
          "div",
          { class: "card learn reveal" },
          h("div", { class: "learn-main" }, h("span", { class: "by" }, item.issuer), h("b", {}, item.name), item.detail ? h("span", { class: "learn-detail" }, item.detail) : null),
          h("span", { class: "wip" }, item.status),
        ),
      ),
    ),
  );
}

export function involvementSection(items, marked) {
  return section(
    "involvement",
    "Beyond The Day-To-Day",
    h("p", { class: "lead reveal" }, "Events, milestones, and professional involvement."),
    h(
      "div",
      { class: "inv", tabindex: "0", role: "region", "aria-label": "Beyond the day-to-day. Scroll sideways to see more." },
      items.map((item) =>
        h(
          "article",
          { class: "card inv-card reveal" },
          // A neutral placeholder until a real photo is supplied. Never a stand-in image.
          item.photo
            ? link(
                item.url || "#",
                { class: "inv-link", "aria-label": `${item.title}: open the LinkedIn post` },
                h("img", { class: item.logo ? "inv-img inv-logo" : "inv-img", src: item.photo, alt: item.alt || item.title, loading: "lazy" }),
              )
            : h("div", { class: "inv-ph", role: "img", "aria-label": "Photo placeholder" }, icon("pin")),
          h(
            "div",
            {},
            h("div", { class: "job-when" }, [item.when, item.place].filter(Boolean).join(" · ")),
            h("h3", {}, item.url && !item.photo ? link(item.url, {}, item.title, icon("arrow")) : item.title, " ", item.pending && marked ? pendingChip() : null),
            h("p", { class: "muted" }, item.caption),
          item.url ? link(item.url, { class: "mini" }, "View On LinkedIn", icon("arrow")) : null,
          ),
        ),
      ),
    ),
  );
}


export function recommendationsSection(items) {
  return section(
    "recommendations",
    "Recommendations",
    h(
      "div",
      { class: "recs" },
      items.map((rec) => {
        const byline = [rec.title, rec.relationship].filter(Boolean).join(" · ");
        return h(
          "figure",
          { class: "card rec reveal" },
          h("blockquote", {}, rec.quote),
          h(
            "figcaption",
            {},
            h("b", {}, rec.name),
            byline ? h("span", {}, byline) : null,
            rec.source === "LinkedIn" ? link(profile.linkedin.url, { class: "rec-src" }, "Via LinkedIn ", icon("arrow")) : null,
          ),
        );
      }),
    ),
  );
}

export function interestsSection() {
  return section(
    "interests",
    "Beyond The Keyboard",
    h("p", { class: "lead reveal" }, profile.beyond),
    h("div", { class: "focus" }, interests.map((item) => h("div", { class: "card focus-card reveal" }, h("h3", {}, item.title), h("p", {}, item.text)))),
  );
}

export function contactSection() {
  const card = (iconName, title, label, url) =>
    link(url, { class: "card linkcard reveal" }, icon(iconName), h("div", {}, h("b", {}, title), h("small", {}, label)), h("span", { class: "go" }, icon("arrow")));
  const el = section(
    "contact",
    "Contact",
    h("p", { class: "big reveal" }, "Let's ", h("span", {}, "Connect.")),
    h("p", { class: "reveal" }, profile.open),
    h(
      "div",
      { class: "contact-cta reveal" },
      resumeButton("btn solid"),
      env.isExport ? null : copyButton("Copy Email Address", () => profile.email, "btn"),
    ),
    h(
      "div",
      { class: "links" },
      card("mail", "Email", profile.email, "mailto:" + profile.email),
      card("linkedin", "LinkedIn", profile.linkedin.label, profile.linkedin.url),
      card("code", "GitHub", profile.github.label, profile.github.url),
    ),
  );
  el.classList.add("contact");
  return el;
}

export function footer() {
  return h(
    "footer",
    {},
    h(
      "div",
      { class: "wrap foot" },
      h("span", {}, `© ${new Date().getFullYear()} ${profile.first} ${profile.last} · Built With Curiosity and Least Privilege`),
      h("span", { class: "foot-links" }, link(profile.github.url, {}, icon("code"), "GitHub"), jump("top", {}, "Back To Top ↑")),
    ),
  );
}
