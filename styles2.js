// Styles added by the upgrade. Loaded after styles.js, which still holds the base design.
export const css2 = `
.sr{position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap}
.skip{position:absolute; left:8px; top:-60px; z-index:50; background:var(--panel2); color:var(--text); padding:10px 14px; border-radius:8px; border:1px solid var(--blue-line)}
.skip:focus{top:8px}
.lead{color:var(--soft); font-size:17px; max-width:50em; margin:0 0 22px}
.fine{color:var(--muted); font-size:12.5px; margin:10px 0 0}
.pend{display:inline-flex; align-items:center; font-family:var(--mono); font-size:10.5px; letter-spacing:.06em; text-transform:uppercase; line-height:1.5;
  padding:2px 8px; border-radius:999px; color:var(--amber); background:rgba(255,180,84,.1); border:1px dashed rgba(255,180,84,.55); white-space:nowrap; vertical-align:middle}
.mini{display:inline-flex; align-items:center; gap:6px; font-family:var(--mono); font-size:12.5px; padding:7px 12px; border-radius:7px; cursor:pointer;
  border:1px solid var(--blue-line); background:transparent; color:var(--blue); transition:background .2s}
.mini:hover{background:var(--blue-dim); text-decoration:none}
button:disabled{opacity:.45; cursor:not-allowed}

/* nav: main links, a "More" dropdown, and one menu on small screens */
.drop{position:relative}
.drop summary{list-style:none; cursor:pointer; font-family:var(--mono); font-size:13px; color:var(--muted); padding:8px 10px; border-radius:6px; white-space:nowrap}
.drop summary::-webkit-details-marker{display:none}
.drop summary:hover,.drop[open] summary{color:var(--blue); background:var(--blue-dim)}
.drop-panel{position:absolute; right:0; top:calc(100% + 8px); min-width:230px; display:grid; gap:2px; padding:8px; border-radius:12px;
  background:var(--panel); border:1px solid var(--line); box-shadow:0 24px 50px -20px rgba(0,0,0,.9); max-height:75vh; overflow-y:auto}
.drop-panel a{font-family:var(--mono); font-size:13px; color:var(--soft); padding:10px 12px; border-radius:7px}
.drop-panel a:hover,.drop-panel a.on{color:var(--blue); background:var(--blue-dim); text-decoration:none}
.nav-right{display:flex; align-items:center; gap:2px; min-width:0}
.menu{display:none}

/* hero */
.hero{position:relative}
.hero-social{display:flex; gap:18px; margin-top:18px; font-family:var(--mono); font-size:13px}
.hero-social a{display:inline-flex; align-items:center; gap:6px; color:var(--muted)}
.hero-social a:hover{color:var(--accent); text-decoration:none}
.scroll-hint{grid-column:1/-1; justify-self:center; display:inline-flex; flex-direction:column; align-items:center; gap:2px; font-family:var(--mono);
  font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--muted); padding:6px 10px}
.scroll-hint:hover{color:var(--blue); text-decoration:none}
.scroll-hint i{font-style:normal; font-size:15px; animation:nudge 1.8s ease-in-out infinite}
@keyframes nudge{50%{transform:translateY(5px)}}
.static .scroll-hint i{animation:none}

/* about */
.motto{font-family:var(--mono); font-size:14px !important; color:var(--accent); border-left:2px solid var(--accent-line); padding-left:12px}
.focus{display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:14px; margin-top:26px}
.focus-card{padding:18px}
.focus-card .ico{color:var(--accent); font-size:22px; margin-bottom:8px}
.focus-card h3{font-size:16px}
.focus-card p{margin:6px 0 0; color:var(--muted); font-size:14px; line-height:1.5}
.stat small{display:block; margin-top:8px; font-family:var(--mono); font-size:11px; color:var(--blue)}

/* experience */
.job-sum{margin:14px 0 0; color:var(--soft); font-size:15px}
.job .writeup{margin-top:16px}
.job-extra{margin-top:18px; padding:14px; border:1px dashed var(--line); border-radius:10px}
.job-extra .kicker{display:flex; flex-wrap:wrap; align-items:center; gap:8px}

/* projects */
.filters{display:flex; flex-wrap:wrap; gap:8px; margin-bottom:18px}
.filter{font-family:var(--mono); font-size:12.5px; padding:7px 13px; border-radius:999px; border:1px solid var(--line); background:var(--panel2); color:var(--soft); cursor:pointer}
.filter:hover{border-color:var(--blue-line); color:var(--blue)}
.filter[aria-pressed="true"]{background:var(--blue-dim); border-color:var(--blue); color:var(--blue)}
.proj-state{display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-top:8px}
.proj-actions{display:flex; flex-wrap:wrap; gap:8px; margin-top:14px}
.proj.planned{border-style:dashed}
.proj.cf{border-color:var(--cf-line); box-shadow:0 0 0 1px rgba(246,130,31,.22)}
.proj.cf:hover{border-color:var(--cf)}
.inv-img{display:block; width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:12px; border:1px solid var(--line); transition:border-color .2s, transform .2s}
.inv-link{display:block; border-radius:12px}
.stat .muted{margin:8px 0 0; font-size:14px; line-height:1.5}
.inv-logo{object-fit:contain; aspect-ratio:1/1; max-width:260px; background:#000}
.inv-link:hover .inv-img,.inv-link:focus-visible .inv-img{border-color:var(--accent); transform:translateY(-2px)}
.job-article{display:inline-flex; align-items:center; gap:8px; white-space:nowrap; font-family:var(--mono); font-size:13px; padding:8px 14px; border-radius:8px; border:1px solid var(--accent); background:transparent; color:var(--accent); text-decoration:none; box-shadow:0 0 10px rgba(78,240,184,.3); transition:box-shadow .2s, background .2s}
.job-article:hover{background:var(--accent-dim); box-shadow:0 0 18px rgba(78,240,184,.6); text-decoration:none}
.job-article svg{width:16px; height:16px}
.job-actions{display:flex; flex-wrap:wrap; align-items:center; gap:10px; margin-top:14px}
.details-toggle{display:inline-flex; align-items:center; gap:8px; cursor:pointer; font-family:var(--mono); font-size:13px; color:var(--blue); background:transparent; padding:8px 14px; border:1px solid var(--blue-line); border-radius:8px; transition:background .2s}
.details-toggle::before{content:"▸"; transition:transform .15s}
.details-toggle[aria-expanded="true"]::before{transform:rotate(90deg)}
.details-toggle:hover{background:var(--blue-dim)}
.job-panel{margin-top:14px}
.hl{font-weight:600}
.hl-title{color:var(--accent)}
.hl-cf{color:var(--cf)}
.cert-name{display:block; font-size:15px; font-weight:600; margin:2px 0 4px}
.cert-title{font-size:18px; font-weight:700; color:var(--accent); letter-spacing:.04em}

/* Scroll progress bar, across the top of the window. */
.progress{position:fixed; top:0; left:0; right:0; height:3px; z-index:40; background:var(--cf);
  transform-origin:0 50%; transform:scaleX(0); pointer-events:none}
@media print{.progress{display:none !important}}

/* Theme button in the header. Outlined in the same neon green as the other buttons. */
.theme-toggle{font-family:var(--mono); font-size:12px; color:var(--accent); background:transparent;
  border:1px solid var(--accent-line); border-radius:999px; padding:5px 12px; cursor:pointer; white-space:nowrap}
.theme-toggle:hover,.theme-toggle:focus-visible{border-color:var(--accent); background:var(--accent-dim)}
@media (max-width:640px){.theme-toggle{font-size:11px; padding:4px 9px}}
@media print{.theme-toggle{display:none !important}}

/* Light theme, set by the Light Mode button. Colours are darkened so text stays readable on white. */
:root.light{
  --bg:#dcebf7; --panel:#f3f8fd; --panel2:#e4eff9; --line:#b4cbe0;
  --text:#111827; --muted:#4b5563; --soft:#1f2937;
  --accent:#0b7a57; --accent-dim:rgba(11,122,87,.09); --accent-line:rgba(11,122,87,.4);
  --blue:#1d5fbf; --blue-dim:rgba(29,95,191,.08); --blue-line:rgba(29,95,191,.4);
  --amber:#9a5a00; --red:#c2334d;
  --cf:#c4560b; --cf-dim:rgba(196,86,11,.09); --cf-line:rgba(196,86,11,.45);
}
:root.light .nav{background:rgba(220,235,247,.92)}
:root.light .mail{background:#f3f8fd}
.edu-head{display:flex; align-items:flex-start; justify-content:space-between; gap:16px}
.edu-head h3{margin:0; flex:1 1 auto; min-width:0; line-height:1.25}
.edu-logo{width:72px; height:72px; flex:0 0 auto; object-fit:contain; border-radius:50%}
@media (max-width:640px){.edu-logo{width:56px; height:56px}}
.cf-chip{font-family:var(--mono); font-size:11.5px; padding:3px 10px; border-radius:999px; color:var(--cf); border:1px solid var(--cf-line); background:rgba(246,130,31,.1); white-space:nowrap}
.wu-wide{grid-column:1/-1}
.diagram{margin:0}
.diagram-scroll{overflow-x:auto; padding:6px 0; border-radius:10px}
.diagram svg{display:block; max-width:none}
.diagram figcaption{font-size:12px; color:var(--muted); margin-top:6px}

/* skills legend and level markers */
.legend{display:flex; flex-wrap:wrap; gap:8px; margin-bottom:18px}
.chip[class*="lv-"]::before{content:""; display:inline-block; width:8px; height:8px; border-radius:50%; margin-right:8px; vertical-align:1px}
.chip.lv-h::before{background:var(--accent)}
.chip.lv-f::before{background:transparent; box-shadow:inset 0 0 0 2px var(--blue)}
.chip.lv-l::before{background:transparent; box-shadow:inset 0 0 0 2px var(--amber)}
.chip.lv-l{border-style:dashed}
.legend .chip{font-family:var(--mono); font-size:12px; background:transparent}
.cert.unverified{border-style:dashed}
.cert .pend{margin-top:6px}
.verify{display:inline-flex; align-items:center; gap:4px; font-family:var(--mono); font-size:12px; margin-top:6px}

/* terminal additions */
.t-ok{color:var(--accent)}
.t-fetch{display:flex; flex-wrap:wrap; gap:8px 26px; align-items:center}
.t-fetch pre{margin:0; color:var(--accent); font-family:var(--mono); font-size:12px; line-height:1.25}

/* involvement */
.inv{display:flex; gap:16px; overflow-x:auto; scroll-snap-type:x mandatory; scroll-padding-inline:0; padding:4px 2px 16px; scrollbar-width:thin; scrollbar-color:var(--accent) transparent; -webkit-overflow-scrolling:touch; overscroll-behavior-x:contain}
.inv:focus-visible{outline:2px solid var(--accent); outline-offset:4px; border-radius:12px}
.inv > .inv-card{flex:0 0 min(340px, 82%); scroll-snap-align:start; display:grid; gap:14px; align-content:start}
.inv-card{display:grid; gap:14px; align-content:start}
@media print{.inv{display:grid; grid-template-columns:1fr; overflow:visible}}
.inv-card h3{margin:4px 0 6px}
.inv-card p{margin:0; font-size:14.5px}
.inv-ph{display:grid; place-items:center; height:110px; border-radius:10px; border:1px dashed var(--line); color:var(--muted); font-size:26px;
  background:linear-gradient(135deg,rgba(78,240,184,.07),rgba(90,169,255,.09))}
.soon{text-align:center; padding:34px 20px; border-style:dashed}
.soon p{margin:6px auto 0; max-width:36em}

/* contact, footer */
.contact-cta{flex-wrap:wrap; gap:12px}
.contact p{max-width:38em}
.foot{display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:10px 20px}
.foot-links{display:inline-flex; gap:18px}
.foot-links a{display:inline-flex; align-items:center; gap:6px; color:var(--muted)}
.foot-links a:hover{color:var(--accent)}

@media (max-width:900px){
  .nav-links,.more{display:none}
  .menu{display:block}
  .nav{position:sticky}
  .menu .drop-panel{position:fixed; left:12px; right:12px; top:62px}
  .menu summary{border:1px solid var(--line); padding:9px 14px; color:var(--text)}
  .drop-panel a{padding:12px}
  .focus,.inv{grid-template-columns:repeat(2,minmax(0,1fr))}
  .scroll-hint{display:none}
}
@media (max-width:640px){
  .focus,.inv,.rules,.checks{grid-template-columns:minmax(0,1fr)}
  .lead{font-size:16px}
  .mini{padding:9px 12px}
  .filter{padding:9px 13px}
  .foot{justify-content:center; text-align:center}
}
@media (prefers-reduced-motion:reduce){
  .sso-arrow,.actor,.lab .meter i{transition:none}
}
@media print{
  .skip,.scroll-hint,.hero-social,.filters,.drop,.pend,.unverified,.foot-links{display:none !important}
  .proj.planned,.soon{border-style:solid}
  .diagram svg{max-width:100%; height:auto}
  .diagram svg rect{fill:#fff}
  .diagram svg text{fill:#111827}
}
`;
