export const css = `
:root{
  --bg:#070b13; --panel:#0c131e; --panel2:#111b2a; --line:#1c2a3d;
  --text:#dbe4ee; --muted:#8696ab; --soft:#c3cedb;
  --accent:#4ef0b8; --accent-dim:rgba(78,240,184,.11); --accent-line:rgba(78,240,184,.35);
  --blue:#5aa9ff; --blue-dim:rgba(90,169,255,.12); --blue-line:rgba(90,169,255,.4);
  --grad:linear-gradient(120deg,var(--accent),var(--blue));
  --amber:#ffb454; --red:#ff6b81;
  --cf:#f6821f; --cf-dim:rgba(246,130,31,.1); --cf-line:rgba(246,130,31,.5);
  --mono:ui-monospace,"SF Mono","Cascadia Code","JetBrains Mono",Menlo,Consolas,"Liberation Mono",monospace;
  --sans:system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%; scroll-behavior:smooth}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
body{
  margin:0; background-color:var(--bg); color:var(--text);
  font-family:var(--sans); font-size:16px; line-height:1.6; overflow-x:hidden;
  background-image:
    linear-gradient(rgba(90,169,255,.035) 1px,transparent 1px),
    linear-gradient(90deg,rgba(90,169,255,.035) 1px,transparent 1px);
  background-size:44px 44px;
}
a{color:var(--accent); text-decoration:none}
a:hover{text-decoration:underline}
button{font:inherit}
:focus-visible{outline:2px solid var(--blue); outline-offset:2px; border-radius:4px}
::selection{background:var(--blue); color:#04101f}

canvas.net{position:fixed; top:0; left:0; width:100%; pointer-events:none; z-index:0; opacity:.8}
.glow{position:absolute; top:-240px; left:0; right:0; height:640px; pointer-events:none; z-index:-1;
  background:
    radial-gradient(460px 300px at 28% 50%,rgba(78,240,184,.12),transparent 70%),
    radial-gradient(520px 320px at 74% 56%,rgba(90,169,255,.16),transparent 70%)}
.page{position:relative; z-index:1}
.wrap{max-width:1080px; margin:0 auto; padding:0 22px}

/* nav */
.nav{position:sticky; top:0; z-index:20; background:rgba(7,11,19,.8);
  -webkit-backdrop-filter:blur(10px); backdrop-filter:blur(10px); border-bottom:1px solid var(--line)}
.nav-in{display:flex; align-items:center; justify-content:space-between; gap:14px; height:56px}
.brand{font-family:var(--mono); font-size:14px; color:var(--text); padding:6px 0; white-space:nowrap}
.brand:hover{text-decoration:none}
.brand b{color:var(--accent); font-weight:600}
.brand .path{color:var(--blue)}
.nav-links{display:flex; gap:2px; overflow-x:auto; scrollbar-width:none}
.nav-links::-webkit-scrollbar{display:none}
.nav-links a{font-family:var(--mono); font-size:13px; color:var(--muted);
  padding:8px 10px; border-radius:6px; white-space:nowrap}
.nav-links a:hover,.nav-links a.on{color:var(--blue); background:var(--blue-dim); text-decoration:none}

/* hero */
.hero{display:grid; grid-template-columns:minmax(0,1.25fr) minmax(0,.75fr); gap:48px; align-items:center; padding:72px 0 56px}
.boot{font-family:var(--mono); font-size:13px; color:var(--muted); min-height:1.7em}
.boot .ok{color:var(--accent)}
h1{font-size:clamp(44px,9vw,84px); line-height:1.05; letter-spacing:-.035em; margin:14px 0 14px; font-weight:800}
h1 .last{background:var(--grad); -webkit-background-clip:text; background-clip:text; color:transparent; -webkit-text-fill-color:transparent}
.typer{font-family:var(--mono); font-size:clamp(15px,2.6vw,20px); color:var(--blue); min-height:1.8em}
.typer::before{content:"> "; color:var(--muted)}
.caret{display:inline-block; width:.55em; height:1.05em; background:var(--blue); vertical-align:-.16em; margin-left:3px; animation:blink 1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.tagline{color:var(--muted); font-size:17px; max-width:34em; margin:10px 0 26px}
.current{display:inline-flex; align-items:center; gap:10px; margin:8px 0 6px; padding:6px 16px 6px 7px; border-radius:999px;
  border:1px solid var(--cf-line); background:var(--cf-dim); color:var(--text); font-size:14.5px; line-height:1.3;
  box-shadow:0 10px 30px -18px rgba(246,130,31,.9); transition:background .2s,transform .2s}
.current:hover{text-decoration:none; background:rgba(246,130,31,.18); transform:translateY(-1px)}
.current b{color:var(--cf); font-weight:700}
.logo-chip{flex:none; display:inline-grid; place-items:center; width:44px; height:28px; border-radius:999px; background:#fff; overflow:hidden}
.logo-chip svg{display:block; width:30px; height:auto}
.logo-chip:not(.pad) svg{width:100%}

.hero-cta{display:flex; flex-wrap:wrap; gap:12px}
.btn{display:inline-flex; align-items:center; gap:8px; font-family:var(--mono); font-size:14px; padding:11px 18px;
  border-radius:8px; border:1px solid var(--blue-line); background:transparent; color:var(--blue); cursor:pointer;
  transition:background .2s,transform .2s,box-shadow .2s}
.btn:hover{background:var(--blue-dim); text-decoration:none; transform:translateY(-1px)}
.btn.solid{background:var(--grad); color:#04101a; border-color:transparent; font-weight:700}
.btn.solid:hover{box-shadow:0 8px 28px -8px rgba(90,169,255,.7)}
.ico{display:inline-flex; font-size:1.15em; line-height:0}

/* access badge ("minimal glass": round photo, name, status and a few tags) */
.badge-wrap{perspective:900px; display:flex; justify-content:center}
.badge{--rx:0deg; --ry:0deg; --mx:50%; --my:0%;
  position:relative; width:min(100%,300px); border-radius:30px; padding:30px 22px 26px; overflow:hidden; text-align:center;
  background:linear-gradient(180deg,rgba(90,169,255,.16),rgba(255,255,255,.03)); border:1px solid rgba(255,255,255,.1);
  -webkit-backdrop-filter:blur(8px); backdrop-filter:blur(8px);
  box-shadow:0 30px 60px -34px rgba(90,169,255,.75),inset 0 1px 0 rgba(255,255,255,.08);
  transform:rotateX(var(--rx)) rotateY(var(--ry)); transition:transform .18s ease-out}
.badge::before{content:""; position:absolute; inset:0; pointer-events:none;
  background:radial-gradient(360px circle at var(--mx) var(--my),rgba(90,169,255,.16),transparent 46%)}
.badge > *{position:relative}
.live{display:inline-flex; align-items:center; gap:7px; color:var(--accent); font-family:var(--mono); font-size:12px; margin-top:12px}
.live i{width:7px; height:7px; border-radius:50%; background:var(--accent); box-shadow:0 0 0 0 rgba(78,240,184,.6); animation:pulse 2s infinite}
@keyframes pulse{70%{box-shadow:0 0 0 8px rgba(78,240,184,0)}100%{box-shadow:0 0 0 0 rgba(78,240,184,0)}}
.avatar{display:grid; place-items:center; margin-bottom:18px}
.photo{position:relative; width:172px; height:172px; border-radius:50%; padding:4px;
  background:conic-gradient(from 210deg,var(--accent),var(--blue),var(--accent));
  box-shadow:0 18px 40px -18px rgba(90,169,255,.85)}
.photo-in{position:relative; width:100%; height:100%; border-radius:50%; overflow:hidden; background:var(--panel2)}
.photo img{position:absolute; display:block; max-width:none; height:auto}
.hex{width:172px; height:172px; border-radius:50%; display:grid; place-items:center; font-family:var(--mono); font-weight:700; font-size:48px;
  color:#04101a; background:var(--grad)}
.badge-name{font-weight:800; font-size:25px; letter-spacing:-.02em; line-height:1.15}
.badge-sub{font-family:var(--mono); font-size:13px; color:var(--blue); margin-top:5px}
.badge-tags{display:flex; flex-wrap:wrap; justify-content:center; gap:7px; margin-top:16px}
.badge-tags span{font-family:var(--mono); font-size:11.5px; line-height:1.5; padding:4px 11px; border-radius:999px; background:var(--blue-dim); color:var(--blue)}
.badge-tags span.cf{background:rgba(246,130,31,.14); color:var(--cf)}

/* sections */
.sec{padding:54px 0; scroll-margin-top:58px}
.sec-head{display:flex; align-items:center; gap:14px; margin-bottom:26px}
.sec-head::after{content:""; flex:1; height:1px; background:linear-gradient(90deg,var(--blue-line),var(--line) 40%)}
.sec-num{font-family:var(--mono); color:var(--blue); font-size:13px}
h2{font-size:clamp(24px,4vw,34px); margin:0; letter-spacing:-.02em; line-height:1.15}
h3{margin:0; font-size:18px; line-height:1.3}
.card{background:var(--panel); border:1px solid var(--line); border-radius:14px; padding:20px;
  transition:border-color .25s,transform .25s}
.card:hover{border-color:var(--blue-line)}
.kicker{font-family:var(--mono); font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--blue)}
.mono{font-family:var(--mono)}
.muted{color:var(--muted)}

/* about */
.about{display:grid; grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr); gap:28px; align-items:start}
.about p{margin:0 0 14px; font-size:17px}
.where{display:inline-flex; align-items:center; gap:7px; font-family:var(--mono); font-size:13px; color:var(--muted)}
.where .ico{color:var(--blue)}
.edu h3{margin:8px 0 4px}
.edu-meta{display:flex; flex-wrap:wrap; gap:8px; margin:12px 0}
.pill{font-family:var(--mono); font-size:12px; padding:4px 10px; border-radius:999px; border:1px solid var(--line); color:var(--text); background:var(--panel2)}
.pill.hi{color:var(--accent); border-color:var(--accent-line); background:var(--accent-dim)}
.edu ul{margin:8px 0 0; padding-left:18px; color:var(--muted); font-size:14.5px}
.edu .org{margin-top:14px; padding-top:12px; border-top:1px dashed var(--line); font-size:14px}
.stats{display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:14px; margin-top:28px}
.stat{padding:18px}
.stat b{display:inline-block; font-family:var(--mono); font-size:clamp(28px,5vw,40px); line-height:1.1; font-weight:700;
  background:var(--grad); -webkit-background-clip:text; background-clip:text; color:transparent; -webkit-text-fill-color:transparent}
.stat span{display:block; margin-top:6px; color:var(--muted); font-size:13.5px; line-height:1.35}

/* experience */
.tl{position:relative; padding-left:28px}
.tl::before{content:""; position:absolute; left:5px; top:10px; bottom:10px; width:1px; background:linear-gradient(var(--accent),var(--blue) 30%,var(--line) 75%)}
.job{position:relative; margin-bottom:18px}
.job::before{content:""; position:absolute; left:-28px; top:24px; width:11px; height:11px; border-radius:50%; background:var(--bg); border:2px solid var(--blue)}
.job.now::before{background:var(--accent); border-color:var(--accent); box-shadow:0 0 0 5px var(--accent-dim)}
.job-top{display:flex; gap:14px; align-items:flex-start}
.job-main{flex:1; min-width:0}
.logo{flex:none; display:grid; place-items:center; width:46px; height:46px; border-radius:10px; overflow:hidden; background:#fff}
.logo svg{display:block; width:100%; height:100%}
.logo.pad svg{width:80%; height:auto}
.logo.mono{background:var(--panel2); border:1px solid var(--line); color:var(--blue); font-family:var(--mono); font-weight:700; font-size:14px}
.job.featured{border-color:var(--cf-line); padding:24px;
  background:linear-gradient(135deg,rgba(246,130,31,.13),transparent 46%),var(--panel);
  box-shadow:0 22px 60px -34px rgba(246,130,31,.85)}
.job.featured:hover{border-color:var(--cf)}
.job.featured::before{background:var(--cf); border-color:var(--cf); box-shadow:0 0 0 5px rgba(246,130,31,.2)}
.job.featured .logo{width:60px; height:60px; border-radius:13px; box-shadow:0 0 0 3px rgba(246,130,31,.3)}
.job.featured h3{font-size:20px}
.job.featured .job-org b{color:var(--cf)}
.job.featured li::before{color:var(--cf)}
.now-pill{display:inline-flex; align-items:center; gap:6px; margin-left:10px; font-size:11px; line-height:1.5; padding:1px 9px; border-radius:999px;
  background:var(--cf-dim); color:var(--cf); border:1px solid var(--cf-line); white-space:nowrap; vertical-align:1px}
.now-pill::before{content:""; width:6px; height:6px; border-radius:50%; background:var(--cf)}
.t-org{color:var(--cf)}
.job-head{display:flex; flex-wrap:wrap; justify-content:space-between; gap:4px 16px; align-items:baseline}
.job-when{font-family:var(--mono); font-size:12.5px; color:var(--accent); white-space:nowrap}
.job-org{font-family:var(--mono); font-size:13.5px; color:var(--muted); margin-top:2px}
.job-org b{color:var(--blue); font-weight:600}
.job ul,.proj ul{margin:14px 0 0; padding:0; list-style:none; display:grid; gap:9px}
.job li,.proj li{position:relative; padding-left:20px; font-size:15px; color:var(--soft)}
.job li::before,.proj li::before{content:"▹"; position:absolute; left:0; color:var(--accent)}
.tags{display:flex; flex-wrap:wrap; gap:7px; margin-top:16px}
.tag{font-family:var(--mono); font-size:11.5px; padding:3px 9px; border-radius:6px; background:var(--blue-dim); color:var(--blue)}

/* projects */
.grid2{display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:18px}
.projects{display:grid; gap:18px}
.proj-body{display:grid; grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr); gap:20px 32px; align-items:center}
.proj-sum{margin:10px 0 0; color:var(--soft); font-size:15.5px; max-width:44em}
.writeup{margin-top:20px; padding-top:16px; border-top:1px dashed var(--line)}
.writeup summary{display:inline-flex; align-items:center; gap:8px; cursor:pointer; list-style:none; font-family:var(--mono); font-size:13px;
  color:var(--blue); padding:8px 14px; border:1px solid var(--blue-line); border-radius:8px; transition:background .2s}
.writeup summary::-webkit-details-marker{display:none}
.writeup summary::before{content:"▸"; transition:transform .15s}
.writeup[open] summary::before{transform:rotate(90deg)}
.writeup summary:hover{background:var(--blue-dim)}
.writeup[open] .wu-closed,.writeup:not([open]) .wu-open{display:none}
.wu-body{display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:22px 32px; margin-top:20px}
.wu-sec h4{margin:0 0 8px; font-family:var(--mono); font-size:12px; letter-spacing:.12em; text-transform:uppercase; color:var(--accent); font-weight:600}
.wu-sec p{margin:0; color:var(--soft); font-size:15px}
.wu-sec ul,.wu-sec ol{margin:0}
.wu-sec ol{list-style:decimal; padding-left:22px; display:grid; gap:8px}
.wu-sec ol li{padding-left:4px}
.wu-sec ol li::before{content:none}
.wu-sec ol li::marker{color:var(--accent); font-family:var(--mono); font-size:13px}
.wu-sec li b{color:var(--text)}
.proj-top{display:flex; justify-content:space-between; gap:10px; font-family:var(--mono); font-size:11.5px; letter-spacing:.1em; color:var(--muted); margin-bottom:10px}
.proj-top span:first-child{color:var(--amber)}
.proj .viz{padding:16px; border:1px solid var(--line); border-radius:12px; background:rgba(90,169,255,.04)}
.meter-num{font-family:var(--mono); font-size:13px; color:var(--muted); margin-bottom:8px}
.meter-num b{color:var(--accent); font-size:22px; margin-right:6px}
.meter{height:10px; border-radius:10px; background:var(--panel2); border:1px solid var(--line); overflow:hidden}
.meter i{display:block; height:100%; width:0; border-radius:10px; background:var(--grad); transition:width 1.3s cubic-bezier(.2,.7,.2,1) .25s}
.in .meter i,.static .meter i{width:var(--pct)}
.meter-legend{display:flex; justify-content:space-between; font-family:var(--mono); font-size:11.5px; color:var(--muted); margin-top:7px}
.steps{display:flex; flex-wrap:wrap; gap:6px 4px; align-items:center; font-family:var(--mono); font-size:11.5px}
.steps span{padding:4px 9px; border-radius:6px; border:1px solid var(--line); background:var(--panel2); color:var(--text)}
.steps em{color:var(--blue); font-style:normal}

/* skills */
.skill h3{font-family:var(--mono); font-size:13px; color:var(--blue); font-weight:600; margin-bottom:12px}
.skill h3::before{content:"// "; color:var(--muted)}
.chips{display:flex; flex-wrap:wrap; gap:8px}
.chip{font-size:14px; padding:6px 12px; border-radius:8px; border:1px solid var(--line); background:var(--panel2);
  transition:border-color .2s,color .2s,transform .2s}
.chip:hover{border-color:var(--accent-line); color:var(--accent); transform:translateY(-2px)}
.sub{font-family:var(--mono); font-size:13px; color:var(--blue); font-weight:600; margin:30px 0 14px}
.sub::before{content:"// "; color:var(--muted)}
.certs{display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:14px}
.cert{display:flex; gap:12px; align-items:flex-start; padding:16px}
.cert .ico{color:var(--accent); font-size:24px; margin-top:2px}
.cert b{display:block; font-size:14.5px; line-height:1.3}
.cert span.by{font-family:var(--mono); font-size:11.5px; color:var(--blue); letter-spacing:.08em; text-transform:uppercase}

.learning{display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px}
.learn{display:flex; align-items:center; justify-content:space-between; gap:14px; padding:16px; border-style:dashed; border-color:rgba(255,180,84,.45)}
.learn:hover{border-color:var(--amber)}
.learn-main{display:grid; gap:2px; min-width:0}
.learn .by{font-family:var(--mono); font-size:11.5px; color:var(--blue); letter-spacing:.08em; text-transform:uppercase}
.learn b{font-size:16px; line-height:1.3}
.learn-detail{color:var(--muted); font-size:13.5px}
.wip{flex:none; display:inline-flex; align-items:center; gap:7px; font-family:var(--mono); font-size:11.5px; padding:3px 10px; border-radius:999px;
  color:var(--amber); background:rgba(255,180,84,.1); border:1px solid rgba(255,180,84,.4); white-space:nowrap}
.wip::before{content:""; width:7px; height:7px; border-radius:50%; background:var(--amber); animation:blink 1.6s ease-in-out infinite}
.static .wip::before{animation:none}

/* recommendations */
.recs{display:grid; gap:18px}
.rec{margin:0; position:relative; padding:26px 26px 22px 30px; border-left:3px solid var(--blue)}
.rec blockquote{margin:0 0 18px; font-size:17px; line-height:1.65; color:var(--text); white-space:pre-line}
.rec blockquote::before{content:"“"; display:block; height:26px; font-size:54px; line-height:1; color:var(--blue); font-family:Georgia,serif}
.rec figcaption{display:flex; flex-wrap:wrap; align-items:baseline; gap:4px 12px; font-size:14px}
.rec figcaption b{font-size:15px}
.rec figcaption > span{color:var(--muted)}
.rec-src{margin-left:auto; display:inline-flex; align-items:center; gap:4px; font-family:var(--mono); font-size:12px; color:var(--blue)}
.rec.pending{border-style:dashed; border-left-style:dashed; border-color:rgba(255,180,84,.45)}
.rec.pending .kicker{color:var(--amber)}
.rec-hint{margin:8px 0 16px; color:var(--muted); font-size:14.5px; max-width:46em}

/* terminal */
.term{border:1px solid var(--line); border-radius:14px; overflow:hidden; background:#070b12; box-shadow:0 30px 60px -40px rgba(0,0,0,.9)}
.term-bar{display:flex; align-items:center; gap:7px; padding:10px 14px; background:var(--panel); border-bottom:1px solid var(--line)}
.dot{width:11px; height:11px; border-radius:50%}
.dot.r{background:#ff5f57}.dot.y{background:#febc2e}.dot.g{background:#28c840}
.term-title{font-family:var(--mono); font-size:12px; color:var(--muted); margin-left:8px}
.term-body{padding:16px 18px; font-family:var(--mono); font-size:13.5px; line-height:1.7; cursor:text}
.term-out{position:relative; max-height:min(440px,70vh); overflow-y:auto; overflow-wrap:anywhere; padding-right:6px;
  scrollbar-width:thin; scrollbar-color:var(--line) transparent}
.t-run{display:grid; gap:10px; padding-bottom:4px}
.t-run + .t-run{margin-top:18px; padding-top:18px; border-top:1px dashed var(--line)}
.t-cmd{color:var(--text)}
.t-prompt{color:var(--accent); white-space:nowrap}
.t-line{max-width:76ch}
.t-name{color:var(--accent); font-weight:700; font-size:15px}
.t-dim{color:var(--muted)}
.t-warn{color:var(--amber)}
.t-hint{color:var(--muted); font-size:12.5px}
.t-hint::before{content:"# "; color:var(--blue)}
.t-para{margin:0; max-width:70ch; color:var(--soft)}
.t-rows{display:grid; grid-template-columns:max-content minmax(0,1fr); gap:10px 22px; margin:0}
.t-rows dt{color:var(--blue)}
.t-rows dd{margin:0; color:var(--soft)}
.t-checks{list-style:none; margin:0; padding:0; display:grid; gap:8px}
.t-checks li{position:relative; padding-left:24px; color:var(--soft)}
.t-checks li::before{content:"✓"; position:absolute; left:0; color:var(--accent)}
.t-checks li.t-wip::before{content:"◌"; color:var(--amber)}
.t-entry{border:1px solid var(--line); border-left:2px solid var(--blue); border-radius:8px; background:rgba(90,169,255,.04)}
.t-entry[open]{border-left-color:var(--accent)}
.t-entry summary{position:relative; display:grid; gap:4px; padding:10px 12px 11px 32px; cursor:pointer; list-style:none; border-radius:8px}
.t-entry summary::-webkit-details-marker{display:none}
.t-entry summary::before{content:"▸"; position:absolute; left:12px; top:10px; color:var(--blue); transition:transform .15s}
.t-entry[open] summary::before{transform:rotate(90deg); color:var(--accent)}
.t-entry summary:hover{background:var(--blue-dim)}
.t-title{color:var(--text); font-weight:700}
.t-entry[open] .t-title{color:var(--accent)}
.t-meta{color:var(--muted); font-size:12.5px}
.t-tags{display:flex; flex-wrap:wrap; gap:6px; margin-top:4px}
.t-tags i{font-style:normal; font-size:11.5px; line-height:1.5; padding:1px 8px; border-radius:5px; background:var(--blue-dim); color:var(--blue)}
.t-entry ul{list-style:none; margin:0; padding:4px 14px 14px 32px; display:grid; gap:10px; border-top:1px dashed var(--line); padding-top:12px}
.t-entry li{position:relative; padding-left:18px; color:var(--soft); max-width:72ch; line-height:1.6}
.t-entry li::before{content:"▹"; position:absolute; left:0; color:var(--accent)}
.term-row{display:flex; align-items:center; gap:8px; margin-top:14px; padding-top:12px; border-top:1px solid var(--line)}
.term-in{flex:1; min-width:0; background:transparent; border:0; outline:0; color:var(--text); font-family:var(--mono); font-size:16px; caret-color:var(--accent); padding:4px 0}
.term-in::placeholder{color:#4a5b73}
.term-chips{display:flex; flex-wrap:wrap; gap:8px; padding:12px 18px 16px; border-top:1px solid var(--line); background:var(--panel)}
.term-chips button{font-family:var(--mono); font-size:12.5px; padding:6px 12px; border-radius:6px; border:1px solid var(--line);
  background:var(--panel2); color:var(--text); cursor:pointer}
.term-chips button:hover{border-color:var(--blue-line); color:var(--blue)}

/* contact */
.contact{text-align:center; padding-bottom:30px}
.contact .big{font-size:clamp(32px,7vw,60px); font-weight:800; letter-spacing:-.03em; line-height:1.1; margin:0 0 12px}
.contact .big span{background:var(--grad); -webkit-background-clip:text; background-clip:text; color:transparent; -webkit-text-fill-color:transparent}
.contact p{color:var(--muted); max-width:32em; margin:0 auto 26px}
.contact-cta{display:flex; justify-content:center; margin:-6px 0 26px}
[hidden]{display:none !important}
.links{display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:14px; text-align:left}
.linkcard{display:flex; align-items:center; gap:12px; color:var(--text); min-width:0}
.linkcard:hover{text-decoration:none; transform:translateY(-2px)}
.linkcard > .ico{font-size:22px; color:var(--blue); flex:none}
.linkcard div{min-width:0; flex:1}
.linkcard b{display:block; font-size:14px}
.linkcard small{display:block; font-family:var(--mono); font-size:12px; color:var(--muted); overflow:hidden; text-overflow:ellipsis; white-space:nowrap}
.linkcard .go{color:var(--muted); flex:none}
.linkcard:hover .go{color:var(--accent)}
footer{border-top:1px solid var(--line); margin-top:40px; padding:22px 0 34px; text-align:center; font-family:var(--mono); font-size:12px; color:var(--muted)}

/* scroll reveal */
.reveal{opacity:0; transform:translateY(16px); transition:opacity .6s ease,transform .6s ease}
.reveal.in,.static .reveal{opacity:1; transform:none}
.static .caret,.static .live i{animation:none}

@media (max-width:900px){
  .hero{grid-template-columns:minmax(0,1fr); gap:38px; padding:44px 0 36px}
  .about{grid-template-columns:minmax(0,1fr)}
  .proj-body,.wu-body{grid-template-columns:minmax(0,1fr)}
  .certs{grid-template-columns:repeat(2,minmax(0,1fr))}
  .links{grid-template-columns:minmax(0,1fr)}
}
@media (max-width:640px){
  .wrap{padding:0 16px}
  .brand .path,.brand .at{display:none}
  .nav-in{gap:10px}
  .nav-links{-webkit-mask-image:linear-gradient(90deg,#000 82%,transparent); mask-image:linear-gradient(90deg,#000 82%,transparent); padding-right:22px}
  .nav-links a{padding:10px 9px}
  h3{font-size:17px}
  .job-when{white-space:normal}
  .hero-cta .btn{flex:1 1 auto; justify-content:center}
  .t-host{display:none}
  .term-chips button{padding:9px 13px; font-size:13px}
  .writeup summary{padding:10px 14px}
  .learn{flex-direction:column; align-items:flex-start; gap:10px}
  .sec{padding:40px 0}
  .stats{grid-template-columns:repeat(2,minmax(0,1fr))}
  .grid2,.certs,.learning{grid-template-columns:minmax(0,1fr)}
  .rec{padding:20px 18px 18px 20px}
  .rec blockquote{font-size:16px}
  .rec-src{margin-left:0}
  .card{padding:16px}
  .tl{padding-left:24px}
  .job::before{left:-24px}
  .job.featured{padding:18px}
  .job-top{gap:12px}
  .logo{width:40px; height:40px; border-radius:9px}
  .job.featured .logo{width:48px; height:48px; border-radius:11px}
  .job.featured h3{font-size:18px}
  .now-pill{margin-left:0; margin-top:6px}
  .current{font-size:13.5px}
  .about p{font-size:16px}
  .term-body{padding:14px}
  .t-rows{grid-template-columns:minmax(0,1fr); gap:2px}
  .t-rows dd{margin-bottom:10px}
  .term-chips{padding:12px 14px 14px}
}

@media print{
  :root{--bg:#fff; --panel:#fff; --panel2:#f4f6f9; --line:#d5dbe3; --text:#111827; --muted:#4b5563; --soft:#1f2937;
    --accent:#0b7a57; --accent-dim:rgba(11,122,87,.09); --accent-line:rgba(11,122,87,.4);
    --blue:#1d5fbf; --blue-dim:rgba(29,95,191,.08); --blue-line:rgba(29,95,191,.4); --amber:#9a5a00}
  body{background:#fff; font-size:13px}
  canvas.net,.glow,.nav,.hero-cta,#terminal,.caret{display:none !important}
  .reveal{opacity:1 !important; transform:none !important}
  .hero{padding:10px 0 20px}
  .badge{background:#fff; border-color:var(--line); box-shadow:none}
  .badge::before{display:none}
  .logo,.logo-chip{border:1px solid var(--line)}
  .job.featured,.current{box-shadow:none}
  .current{display:inline-flex !important}
  .photo{box-shadow:none}
  .hex,.btn.solid{color:#fff}
  h1 .last,.stat b,.contact .big span{background:none; color:var(--accent); -webkit-text-fill-color:currentColor}
  .meter i{width:var(--pct) !important}
  .sec{padding:18px 0}
  .writeup summary,.contact-cta,.rec.pending{display:none !important}
  .card,.job,.sec-head{break-inside:avoid}
  .sec-head{break-after:avoid}
}
`;
