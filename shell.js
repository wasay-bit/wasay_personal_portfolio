// The interactive terminal. A strict allowlist of commands: anything typed is only ever looked up
// in the table below and shown back as plain text, never run or inserted as HTML.
// Output is built to be skimmed: one spaced block per command, long items collapsed.

import { h, link } from "./dom.js";

export function mountShell(data, projects, actions) {
  const { profile, experience, skills, certifications, education, learning, interests } = data;
  const prompt = () => h("span", { class: "t-prompt" }, h("span", { class: "t-host" }, `${profile.handle}@portfolio:`), "~$");

  const out = h("div", { class: "term-out", role: "log", "aria-live": "polite", tabindex: "0", "aria-label": "Terminal output" });
  const input = h("input", {
    class: "term-in",
    type: "text",
    maxlength: "80",
    autocomplete: "off",
    autocapitalize: "off",
    autocorrect: "off",
    spellcheck: "false",
    "aria-label": "Terminal command",
    placeholder: "Type a command, e.g. help (Tab completes)",
  });

  const text = (cls, ...children) => h("div", { class: "t-line " + (cls || "") }, ...children);
  const hint = (message) => text("t-hint", message);
  const rows = (pairs) => h("dl", { class: "t-rows" }, pairs.map(([key, value]) => [h("dt", {}, key), h("dd", {}, value)]));
  const entry = ({ title, meta, tags, points, open }) =>
    h(
      "details",
      { class: "t-entry", open: !!open },
      h("summary", {}, h("span", { class: "t-title" }, title), h("span", { class: "t-meta" }, meta), tags && tags.length ? h("span", { class: "t-tags" }, tags.map((t) => h("i", {}, t))) : null),
      h("ul", {}, points.map((p) => h("li", {}, p))),
    );
  const job = (j, open) => entry({ title: j.role, meta: `${j.org}  ·  ${j.when}  ·  ${j.place}`, tags: j.tags, points: j.points, open });

  const history = [];

  const commands = {
    help: { desc: "List available commands", run: () => [rows(Object.entries(commands).filter(([, c]) => c.desc).map(([name, c]) => [name, c.desc])), hint("Tab completes a command. ↑ and ↓ recall earlier ones.")] },
    whoami: {
      desc: "Who is this?",
      run: () => [
        text("t-name", `${profile.first} ${profile.last}`),
        text("", "Currently ", profile.current.role, " @ ", h("b", { class: "t-org" }, profile.current.org)),
        text("", profile.tagline),
      ],
    },
    about: { desc: "Short bio", run: () => profile.bio.map((p) => h("p", { class: "t-para" }, p)) },
    experience: { desc: "Work history", run: () => [...experience.map((j) => job(j)), hint("Tap a role to expand the details.")] },
    cloudflare: { desc: "Current role", run: () => [job(experience.find((j) => j.id === "cloudflare"), true)] },
    "austin-industries": { desc: "Cybersecurity internship", run: () => [job(experience.find((j) => j.id === "austin-industries"), true)] },
    projects: {
      desc: "Featured projects",
      run: () => [...projects.map((p) => entry({ title: `[${p.file}] ${p.title}`, meta: `${p.type}  ·  ${p.status}`, tags: p.tags, points: p.points || [p.summary] })), hint("Tap a project to expand the details.")],
    },
    skills: { desc: "Tools and frameworks", run: () => [rows(skills.map((s) => [s.group, s.items.map(([name]) => name).join("  ·  ")]))] },
    certs: {
      desc: "Certifications",
      run: () => [
        h(
          "ul",
          { class: "t-checks" },
          certifications.filter((c) => !c.pending).map((c) => h("li", {}, `${c.issuer} ${c.name}`)),
          learning.map((l) => h("li", { class: "t-wip" }, `${l.issuer} ${l.name}  (${l.status})`)),
        ),
      ],
    },
    education: {
      desc: "School",
      run: () => [rows([["School", education.school], ["Degree", education.degree], ["Graduation", education.when], ["GPA", education.gpa], ["Courses", education.courses.join("  ·  ")]])],
    },
    interests: { desc: "Beyond the keyboard", run: () => [text("", "Formula 1  ·  Security Engineering  ·  Identity  ·  Cloud  ·  AI  ·  Learning"), ...interests.map((i) => text("t-dim", `${i.title}: ${i.text}`))] },
    github: { desc: "GitHub profile", run: () => [rows([["Profile", link(profile.github.url, {}, profile.github.label)], ["Featured", link("https://github.com/Wasay-O/eml-phish-triage", {}, "eml-phish-triage")]])] },
    linkedin: { desc: "LinkedIn profile", run: () => [text("", link(profile.linkedin.url, {}, profile.linkedin.label))] },
    contact: {
      desc: "How to reach me",
      run: () => [rows([["Email", link("mailto:" + profile.email, {}, profile.email)], ["LinkedIn", link(profile.linkedin.url, {}, profile.linkedin.label)], ["GitHub", link(profile.github.url, {}, profile.github.label)]]), text("t-dim", profile.open)],
    },
    resume: { desc: "Download my résumé", run: () => [actions.resume() ? text("t-ok", "Starting the résumé download…") : text("t-warn", "The résumé is not available right now.")] },
    neofetch: {
      desc: "System summary",
      run: () => [
        h(
          "div",
          { class: "t-fetch" },
          h("pre", { "aria-hidden": "true" }, " __      __ ___\n \\ \\    / // _ \\\n  \\ \\/\\/ /| (_) |\n   \\_/\\_/  \\___/"),
          rows([
            ["Name", `${profile.first} ${profile.last}`],
            ["Role", `${profile.current.role} @ ${profile.current.org}`],
            ["Education", `${education.school}, ${education.when}`],
            ["Focus", "Security Engineering · IAM · Automation"],
            ["Policy", "Least Privilege: Enforced"],
            ["Status", "Always Learning"],
          ]),
        ),
      ],
    },
    ls: { desc: "List sections", run: () => [text("", "about   experience   projects   skills   certs   education   interests   contact")] },
    pwd: { desc: "Where am I?", run: () => [text("", "/home/visitor/portfolio")] },
    history: { desc: "Commands typed so far", run: () => (history.length ? [rows(history.map((c, i) => [String(i + 1), c]))] : [text("t-dim", "No commands yet.")]) },
    ping: {
      desc: "Check status (simulated)",
      run: () => [text("", "PING portfolio.local (127.0.0.1): 3 packets sent, 3 received, 0% loss"), text("t-dim", "Fictional local status. No network request was made.")],
    },
    clear: { desc: "Clear the screen" },
    exit: { desc: "Leave the shell", run: () => (input.blur(), [text("t-dim", "Session closed. Click the terminal or type a command to start again.")]) },
    "sudo su": { desc: "Try your luck" },
    sudo: { run: () => [text("t-warn", "ACCESS DENIED. Nice try, but least privilege applies to everyone.")] },
  };
  const names = Object.keys(commands).filter((n) => n !== "sudo");
  const known = (name) => Object.prototype.hasOwnProperty.call(commands, name);

  // The closest command names to something mistyped.
  function suggest(word) {
    const starts = names.filter((n) => n.startsWith(word.slice(0, 2)));
    return (starts.length ? starts : names.filter((n) => n.includes(word))).slice(0, 3);
  }

  function run(raw) {
    const typed = raw.trim().slice(0, 80);
    const words = typed.toLowerCase().split(/\s+/);
    let name = words[0];
    if ((name === "cat" || name === "cd" || name === "open") && words[1]) name = words[1].replace(/\..*$/, "").replace(/\/$/, "");
    if (name === "clear") {
      out.replaceChildren();
      return;
    }
    // `typed` is appended as a text node (never parsed as HTML).
    const block = h("div", { class: "t-run" }, h("div", { class: "t-cmd" }, prompt(), " ", typed));
    if (typed) {
      const command = known(name) ? commands[name] : null;
      if (command && command.run) {
        block.append(...command.run().filter(Boolean));
      } else {
        const close = suggest(words[0]);
        block.append(text("t-warn", `Command not found: ${words[0]}`), hint(close.length ? `Did you mean: ${close.join(", ")}? Or try 'help'.` : "Try 'help'."));
      }
    }
    out.append(block);
    out.scrollTop = Math.max(0, block.offsetTop - 4); // show the start of the new output
  }

  let cursor = 0;
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = input.value;
      if (value.trim()) history.push(value.trim().slice(0, 80));
      cursor = history.length;
      input.value = "";
      run(value);
    } else if (e.key === "ArrowUp") {
      if (cursor > 0) cursor--;
      input.value = history[cursor] ?? "";
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      if (cursor < history.length) cursor++;
      input.value = history[cursor] ?? "";
      e.preventDefault();
    } else if (e.key === "Tab") {
      const start = input.value.trim().toLowerCase();
      if (!start) return; // let Tab move focus as usual when nothing is typed
      const matches = names.filter((n) => n.startsWith(start));
      if (!matches.length) return;
      e.preventDefault();
      if (matches.length === 1) {
        input.value = matches[0];
      } else {
        const block = h("div", { class: "t-run" }, hint("Matches: " + matches.join("   ")));
        out.append(block);
        out.scrollTop = Math.max(0, block.offsetTop - 4);
      }
    }
  });

  const chips = h(
    "div",
    { class: "term-chips" },
    [
      ["Help", "help"],
      ["Who Am I", "whoami"],
      ["Experience", "experience"],
      ["Projects", "projects"],
      ["Skills", "skills"],
      ["Neofetch", "neofetch"],
      ["Résumé", "resume"],
      ["Sudo Su", "sudo su"],
    ].map(([label, cmd]) => h("button", { type: "button", onclick: () => run(cmd) }, label)),
  );

  const body = h("div", { class: "term-body" }, out, h("label", { class: "term-row" }, prompt(), input));
  body.addEventListener("click", (e) => {
    if (e.target.closest("a, summary, details")) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) input.focus({ preventScroll: true });
  });

  out.append(h("div", { class: "t-run" }, text("t-dim", "Welcome. This is a read-only shell into my résumé."), hint("Type 'help', or tap a command below.")));
  run("whoami");

  return h(
    "div",
    { class: "term" },
    h("div", { class: "term-bar" }, h("span", { class: "dot r" }), h("span", { class: "dot y" }), h("span", { class: "dot g" }), h("span", { class: "term-title" }, `${profile.handle}@portfolio: ~`)),
    body,
    chips,
  );
}
