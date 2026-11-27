// Featured projects: the data, the category filters, and the cards with their case studies.

import { h, link, icon } from "./dom.js";
import { env, section, pendingChip } from "./kit.js";
import { flowDiagram } from "./diagrams.js";

export const categories = [
  ["all", "All"],
  ["identity", "Identity Security"],
  ["engineering", "Security Engineering"],
  ["automation", "Automation & AI"],
  ["threat", "Threat Detection"],
  ["secops", "Security Operations"],
  ["personal", "Personal Projects"],
];

// Fields: type (Professional / Personal / Academic), status, cats (filter ids), summary, tags,
// problem, solution, contribution, concepts, optional `more` (extra case-study sections, each
// { heading, text?, list?, ordered? }), optional `flow` (diagram), `repo` (GitHub URL),
// `meter` / `steps` visuals.
// `points` are what the terminal prints.
export const projects = [
  {
    id: "sso-hub",
    file: "CASE-001",
    title: "SSO Discovery & Integrations Hub",
    type: "Professional",
    status: "Internship Project",
    cf: true,
    cats: ["identity", "automation"],
    summary:
      "A cloud-native way to check how ready a vendor's application is for single sign-on, and to keep that picture in one place.",
    tags: ["SSO", "SAML", "OIDC", "Cloud-Native", "Automation"],
    problem:
      "Working out whether a vendor supports SAML or OIDC means reading its public documentation, one vendor at a time, and the answers end up scattered.",
    solution:
      "Automated discovery that analyzes public vendor documentation for SAML and OIDC support and produces a structured readiness report, giving centralized visibility into integrations.",
    contribution:
      "I designed the system, defined the requirements and workflows, directed AI coding agents on the implementation, and handled integration and testing.",
    concepts: ["Vendor Authentication Readiness", "SAML / OIDC Discovery", "Documentation Analysis", "Centralized Visibility", "Cloud-Native Automation"],
    flow: { nodes: ["Public Vendor\nDocumentation", "Discovery\nService", "Protocol\nAnalysis", "Structured\nReadiness Report"] },
    points: [
      "Cloud-native automation that reviews public vendor documentation for SAML and OIDC support and produces a structured readiness report.",
      "Built during my Cloudflare EIAM internship: I designed the system and directed AI coding agents on the implementation.",
    ],
  },
  {
    id: "access-troubleshooter",
    file: "CASE-002",
    title: "AI Access Troubleshooter",
    type: "Professional",
    status: "Prototype",
    cf: true,
    cats: ["identity", "automation"],
    summary:
      "A read-only AI assistant that turns an access request into a structured diagnosis: the likely missing piece, a root cause with a confidence level, next steps for the admin, and a draft reply to the requester. It is a prototype, and its diagnoses have not yet been checked against live tickets.",
    tags: ["IAM", "AI Agents", "Input Validation", "Guardrails"],
    problem:
      "Access requests are often vague, and a confident-sounding guess can send someone the wrong fix.",
    solution:
      "A structured intake, a set of known failure patterns to check against, and guardrails. It never grants or changes access, and it says when it couldn't verify a fact.",
    contribution:
      "I defined the requirements and safeguards, directed AI coding agents on the implementation, and tested it on synthetic tickets, including attempts to get it to skip checks.",
    concepts: ["Structured Intake", "Failure-Pattern Matching", "Confidence Levels", "Read-Only Guardrails", "Hallucination Mitigation"],
    points: [
      "Read-only AI assistant that turns access requests into structured diagnoses with confidence levels and next steps.",
      "Tested on synthetic tickets, including attempts to bypass its checks. Not yet checked against live tickets.",
    ],
  },
  {
    id: "eml-phish-triage",
    file: "CASE-003",
    title: "EML Phishing Triage Analyzer",
    type: "Personal",
    status: "Implemented",
    cats: ["threat", "secops", "engineering", "personal"],
    summary:
      "A small, explainable command-line tool that reads a .eml file and reports why an email looks suspicious, with a low, medium, or high verdict.",
    tags: ["Python", "Email Security", "CLI", "pytest"],
    problem: "Triage of a suspicious email is repetitive: the same headers, links, and attachments get checked by hand every time.",
    solution:
      "The tool checks the email against a set of weighted rules and adds them into a score. Every point in the score comes with a reason, so you can see why an email was flagged.",
    contribution: "A personal project, published on my GitHub with synthetic sample emails and a test suite.",
    concepts: ["SPF / DKIM / DMARC Results", "Reply-To & Return-Path Mismatch", "Lookalike Domains", "Link Analysis", "Risky Attachments", "Explainable Scoring"],
    more: [
      {
        heading: "What It Checks",
        list: [
          "Whether SPF, DKIM, or DMARC checks failed.",
          "Sender, Reply-To, and Return-Path mismatches.",
          "Lookalike or brand-impersonating sender domains.",
          "Link tricks: display text versus real destination, raw IP links, punycode, URL shorteners.",
          "Risky attachment types: executables, scripts, macro-enabled Office files.",
          "Urgency or account-threat wording.",
        ],
      },
      {
        heading: "Safety & Limitations",
        list: [
          "Read-only: it never opens attachments, follows links, or makes network requests.",
          "Heuristics, not a verdict oracle: false positives and false negatives are expected.",
          "No sandboxing or live URL reputation lookups.",
        ],
      },
    ],
    flow: { nodes: [".eml File", "Parser", "Rule Checks", "Weighted Score", "Verdict +\nReasons"] },
    repo: "https://github.com/Wasay-O/eml-phish-triage",
    points: [
      "Command-line tool that triages a .eml file with weighted, explainable rules and a low / medium / high verdict.",
      "Read-only by design: no link following, no attachment opening, no network requests.",
    ],
  },
  {
    id: "detection-lab",
    file: "CASE-004",
    title: "Detection Engineering Lab",
    type: "Personal",
    status: "Implemented",
    cats: ["threat", "engineering", "personal"],
    summary: "Experimental detection rules applied to sign-in and account events, using fictional events only.",
    tags: ["Detection Rules", "Alert Triage", "Synthetic Data"],
    problem: "Detection logic is easier to understand when you can watch a rule fire, and see when it correctly stays quiet.",
    solution:
      "A set of fictional event timelines is run through predefined rules in the browser. Each alert shows its severity, why it triggered, and the investigation steps that would follow.",
    contribution: "Built for this portfolio with AI-assisted development, from requirements I defined. Synthetic and independent: it contains no employer code or data.",
    concepts: ["Threshold Rules", "Unusual Location", "Privileged Role Changes", "Activity Volume", "Severity"],
    flow: { nodes: ["Fictional\nEvents", "Detection\nRules", "Alerts +\nSeverity", "Investigation\nSteps"] },
    points: ["Experimental detection rules applied to fictional authentication events."],
  },
  {
    id: "password-generator",
    file: "CASE-005",
    title: "Secure Password Generator",
    type: "Personal",
    status: "Implemented",
    cats: ["engineering", "personal"],
    summary: "A browser password generator with configurable length and character sets, cryptographic randomness, and an entropy estimate.",
    tags: ["Web Crypto", "Entropy", "Browser"],
    problem: "Many simple generators use predictable randomness, or pick characters in a slightly biased way.",
    solution:
      "Characters are chosen with the browser's cryptographic random source using unbiased selection, every selected character type is guaranteed to appear, and the estimated entropy is shown.",
    contribution: "Built for this portfolio with AI-assisted development, from requirements I defined. Passwords are never logged, sent, or stored.",
    concepts: ["Cryptographic Randomness", "Rejection Sampling", "Entropy", "Character Sets"],
    points: ["Browser password generator using Web Crypto with unbiased selection and an entropy estimate."],
  },
  {
    id: "phisher-analysis",
    org: "Austin Industries",
    file: "CASE-006",
    title: "PhishER Ticket Analysis",
    type: "Professional",
    status: "Completed · July 2026",
    cats: ["threat", "secops"],
    tags: ["KnowBe4 PhishER", "Excel"],
    summary:
      "A review of 596 user-reported emails to separate confirmed phishing from everything else and find the patterns attackers kept reusing.",
    problem: "Turn a queue of user-reported emails into answers: how many were real threats, and what did the real ones have in common?",
    solution: "A structured review of every ticket, then trend analysis of the confirmed threats in Excel.",
    contribution: "I reviewed the tickets, separated confirmed phishing from the rest, and analyzed the confirmed threats for patterns.",
    concepts: ["Phishing Trends", "Malicious Sender Behavior", "Abuse Of Trusted Services"],
    more: [
      {
        heading: "How I Approached It",
        ordered: true,
        list: [
          "Reviewed 596 user-reported email security tickets in KnowBe4 PhishER.",
          "Separated the confirmed phishing threats from the rest of the reports.",
          "Used Excel to evaluate the confirmed threats for phishing trends, malicious sender behavior, and abuse of trusted services.",
        ],
      },
      {
        heading: "What I Found",
        list: [
          "448 of the 596 reports (about 75%) were confirmed phishing threats.",
          "The confirmed threats shared recurring attack patterns, including abuse of trusted services.",
        ],
      },
      {
        heading: "How It Was Used",
        text: "The findings supported threat detection, security awareness initiatives, and email security recommendations.",
      },
    ],
    points: [
      "Analyzed 596 user-reported email security tickets and identified 448 confirmed phishing threats and recurring attack patterns.",
      "Evaluated phishing trends, malicious sender behavior, and abuse of trusted services to support threat detection, security awareness initiatives, and email security recommendations.",
    ],
    meter: { part: 448, total: 596, label: "Of Reported Emails Were Confirmed Phishing" },
  },
  {
    id: "incident-report",
    file: "CASE-007",
    title: "Security Incident Report Simulation",
    type: "Academic",
    status: "Completed · Dec 2025 · Simulated",
    cats: ["secops"],
    tags: ["NIST Incident Response", "Ransomware", "Phishing"],
    summary:
      "A mock incident response report for a simulated ransomware and phishing attack affecting employee devices and company systems. No real incident is described.",
    problem: "A simulated attack that combines phishing and ransomware and hits both employee devices and company systems.",
    solution: "A full incident response report for the scenario, structured with the NIST incident response framework.",
    contribution: "I wrote the report: the timeline, affected systems, root cause, containment steps, and recommendations.",
    concepts: ["NIST Incident Response", "Root Cause Analysis", "Containment", "Remediation & Prevention"],
    more: [
      {
        heading: "What The Report Documents",
        list: [
          ["Incident Timeline", "what happened, in order."],
          ["Affected Systems", "which devices and systems were involved."],
          ["Root Cause", "how the attack got in."],
          ["Containment Steps", "what was done to stop it from spreading."],
          ["Remediation", "remediation and prevention recommendations."],
        ],
      },
    ],
    points: [
      "Created a mock incident response report for a ransomware and phishing attack scenario affecting employee devices and company systems, documenting the incident timeline, affected systems, root cause, and containment steps.",
      "Developed remediation and prevention recommendations using the NIST incident response framework.",
    ],
    steps: ["Timeline", "Affected Systems", "Root Cause", "Containment", "Remediation"],
  },
  {
    id: "access-risk-analyzer",
    file: "CASE-008",
    title: "AI Access Risk Analyzer",
    type: "Personal",
    status: "Under Development",
    planned: true,
    cats: ["identity", "automation", "personal"],
    summary: "A planned tool for reviewing who has access to what and explaining where the risk is. Nothing below is built yet.",
    tags: ["RBAC", "Least Privilege", "Risk Scoring"],
    problem: "Access builds up over time, and it is hard to see which permissions are excessive and why.",
    solution: "Planned: analyze roles and permissions, score the risk in a way that can be explained, and recommend least-privilege changes.",
    contribution: "Planned personal project. Not yet implemented.",
    concepts: ["RBAC Analysis", "Excessive Permissions", "Privilege Accumulation", "Explainable Risk Scoring", "Least-Privilege Recommendations"],
    conceptsHeading: "Planned Features",
    points: ["Planned (under development): RBAC analysis with explainable risk scoring and least-privilege recommendations."],
  },
];

function viz(project) {
  if (project.meter) {
    const { part, total, label } = project.meter;
    const pct = Math.round((part / total) * 100);
    return h(
      "div",
      { class: "viz" },
      h("div", { class: "meter-num" }, h("b", {}, "≈" + pct + "%"), label),
      h("div", { class: "meter", role: "img", "aria-label": `${part} confirmed phishing out of ${total} reported; ${total - part} other` }, h("i", { style: { "--pct": pct + "%" } })),
      h("div", { class: "meter-legend" }, h("span", {}, `${part} Confirmed Phishing`), h("span", {}, `${total - part} Other Reports`)),
    );
  }
  if (project.steps) {
    return h("div", { class: "viz" }, h("div", { class: "steps" }, project.steps.flatMap((step, i) => [i ? h("em", {}, "→") : null, h("span", {}, step)])));
  }
  return null;
}

function caseStudy(project) {
  const item = (entry) => (Array.isArray(entry) ? h("li", {}, h("b", {}, entry[0] + ": "), entry[1]) : h("li", {}, entry));
  const part = (heading, body) => h("section", { class: "wu-sec" }, h("h4", {}, heading), body);
  return h(
    "details",
    { class: "writeup", open: env.pdf },
    h("summary", {}, h("span", { class: "wu-closed" }, "Read The Case Study"), h("span", { class: "wu-open" }, "Hide The Case Study")),
    h(
      "div",
      { class: "wu-body" },
      part("The Problem", h("p", {}, project.problem)),
      part("The Solution", h("p", {}, project.solution)),
      part("My Contribution", h("p", {}, project.contribution)),
      part(project.conceptsHeading || "Technical Concepts", h("ul", {}, project.concepts.map(item))),
      (project.more || []).map((sec) =>
        part(sec.heading, [sec.text ? h("p", {}, sec.text) : null, sec.list ? h(sec.ordered ? "ol" : "ul", {}, sec.list.map(item)) : null]),
      ),
      project.flow ? h("div", { class: "wu-wide" }, flowDiagram(project.flow, project.title)) : null,
    ),
  );
}

function card(project) {
  const actions = [
    project.repo ? link(project.repo, { class: "mini" }, icon("code"), "View On GitHub") : null,
  ].filter(Boolean);
  return h(
    "article",
    { class: "card proj reveal" + (project.planned ? " planned" : "") + (project.cf ? " cf" : ""), "data-cats": project.cats.join(" ") },
    h("div", { class: "proj-top" }, h("span", {}, project.file), h("span", {}, project.type + " Project")),
    h(
      "div",
      { class: "proj-body" },
      h(
        "div",
        {},
        h("h3", {}, project.title),
        h(
          "div",
          { class: "proj-state" },
          h("span", { class: project.planned ? "wip" : "pill hi" }, project.status),
          project.cf ? h("span", { class: "cf-chip" }, "Cloudflare") : null,
          project.org ? h("span", { class: "pill" }, project.org) : null,
          project.pending ? pendingChip() : null,
        ),
        h("p", { class: "proj-sum" }, project.summary),
        h("div", { class: "tags" }, project.tags.map((t) => h("span", { class: "tag" }, t))),
        actions.length ? h("div", { class: "proj-actions" }, actions) : null,
      ),
      viz(project),
    ),
    caseStudy(project),
  );
}

export function projectsSection(list) {
  const cards = list.map(card);
  const empty = h("p", { class: "muted", hidden: true }, "No projects in this category yet.");
  let filters = null;
  if (!env.isExport) {
    const buttons = categories.map(([id, label]) =>
      h("button", { type: "button", class: "filter", "aria-pressed": id === "all" ? "true" : "false", "data-cat": id }, label),
    );
    const apply = (id) => {
      let visible = 0;
      cards.forEach((el) => {
        const show = id === "all" || el.dataset.cats.split(" ").includes(id);
        el.hidden = !show;
        if (show) {
          visible++;
          el.classList.add("in");
        }
      });
      empty.hidden = visible > 0;
      buttons.forEach((b) => b.setAttribute("aria-pressed", b.dataset.cat === id ? "true" : "false"));
    };
    buttons.forEach((b) => b.addEventListener("click", () => apply(b.dataset.cat)));
    filters = h("div", { class: "filters reveal", role: "group", "aria-label": "Filter projects by category" }, buttons);
  }
  return section("projects", "Featured Projects", filters, h("div", { class: "projects" }, cards), empty);
}
