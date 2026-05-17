import type { LearnPageContent } from "./types";

export const patentMoatScorecardContent: LearnPageContent = {
  title: "Patent Moat Scorecard",
  description: "A 15-question scorecard benchmarks your patent portfolio against venture-stage IP profiles across five dimensions.",
  style: String.raw`:root {
  --ink: #003756;
  --ink-hover: #154E73;
  --ink-deep: #002B45;
  --accent: #632DDD;
  --accent-soft: #9D74FF;
  --accent-deep: #4A1FB0;
  --paper: #FFFFFF;
  --paper-soft: #F7F8FA;
  --paper-deep: #EAECEF;
  --line: rgba(0,55,86,0.12);
  --line-strong: rgba(0,55,86,0.22);
  --display: var(--font-display), system-ui, sans-serif;
  --body: var(--font-body), system-ui, sans-serif;
  --mono: var(--font-mono), ui-monospace, monospace;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--body); font-weight: 400;
  font-size: 17px; line-height: 1.55;
  color: var(--ink); background: var(--paper);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
.container { max-width: 1240px; margin: 0 auto; padding: 0 32px; }

/* Brand bar */
.brand-bar {
  position: sticky; top: 0; z-index: 100;
  background: rgba(255,255,255,0.94);
  border-bottom: 1px solid var(--line);
  padding: 14px 0;
  backdrop-filter: blur(10px);
}
.brand-bar .container { display: flex; align-items: center; justify-content: space-between; }
.brand-lockup { display: flex; align-items: center; gap: 20px; }
.brand-lockup img { display: block; width: auto; }
.brand-logo-whiteford { height: 28px; }
.brand-logo-schellip { height: 22px; }
.brand-divider { width: 1px; height: 28px; background: var(--line-strong); }
.brand-bar-meta {
  font-family: var(--mono); font-size: 11px;
  color: var(--ink-hover); letter-spacing: 0.08em; text-transform: uppercase;
}

/* Hero — LIGHT with geometric pattern */
.hero {
  background: var(--paper);
  padding: 100px 0 120px; position: relative; overflow: hidden;
}
.hero::before {
  content: ''; position: absolute; inset: 0;
  background-image:
    repeating-linear-gradient(45deg,
      transparent 0,
      transparent 64px,
      rgba(99,45,221,0.045) 64px,
      rgba(99,45,221,0.045) 65px);
  pointer-events: none;
}
.hero::after {
  content: ''; position: absolute; bottom: 0; right: -100px;
  width: 620px; height: 620px;
  background: radial-gradient(circle, rgba(99,45,221,0.07) 0%, transparent 60%);
  pointer-events: none;
}
.hero .container {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: 1.2fr 1fr;
  gap: 80px; align-items: center;
}
.hero-eyebrow {
  font-family: var(--mono); font-size: 12px;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 24px;
  display: flex; align-items: center; gap: 12px;
  opacity: 0; animation: fade-in 0.7s 0.1s forwards;
}
.hero-eyebrow::before { content: ''; width: 32px; height: 1px; background: var(--accent); }
.hero h1 {
  font-family: var(--display); font-weight: 400;
  font-size: clamp(38px, 5.6vw, 64px);
  line-height: 1.04; letter-spacing: -0.018em;
  margin-bottom: 28px;
  opacity: 0; animation: fade-in 0.8s 0.2s forwards;
}
.hero h1 em { font-style: italic; font-weight: 300; color: var(--ink-hover); }
.hero-sub {
  font-size: 19px; line-height: 1.55;
  color: var(--ink-hover);
  margin-bottom: 36px; max-width: 540px;
  opacity: 0; animation: fade-in 0.8s 0.35s forwards;
}
.hero-cta-row {
  display: flex; align-items: center; gap: 24px; flex-wrap: wrap;
  opacity: 0; animation: fade-in 0.8s 0.5s forwards;
}
.btn-primary {
  display: inline-flex; align-items: center; gap: 14px;
  background: var(--ink); color: var(--paper);
  padding: 18px 32px;
  font-family: var(--display); font-weight: 500; font-size: 16px;
  border: none; cursor: pointer;
  letter-spacing: 0.01em; transition: all 0.2s ease;
  text-decoration: none;
}
.btn-primary:hover { background: var(--accent); transform: translateY(-1px); }
.btn-primary svg { transition: transform 0.2s; }
.btn-primary:hover svg { transform: translateX(4px); }
.btn-primary.btn-on-dark { background: var(--accent); }
.btn-primary.btn-on-dark:hover { background: var(--accent-soft); }
.hero-meta { font-family: var(--mono); font-size: 13px; color: var(--ink-hover); letter-spacing: 0.04em; }

/* Hero visual: scorecard */
.hero-visual { position: relative; opacity: 0; animation: fade-in 1s 0.6s forwards; }
.scorecard-mock {
  background: var(--paper);
  border: 1px solid var(--accent);
  padding: 36px; position: relative;
  box-shadow: 0 30px 60px -20px rgba(0,55,86,0.18);
}
.scorecard-mock::before,
.scorecard-mock::after,
.scorecard-mock-corner-bl,
.scorecard-mock-corner-br {
  content: ''; position: absolute; width: 18px; height: 18px;
}
.scorecard-mock::before { top: -1px; left: -1px; border-top: 2px solid var(--accent-deep); border-left: 2px solid var(--accent-deep); }
.scorecard-mock::after  { top: -1px; right: -1px; border-top: 2px solid var(--accent-deep); border-right: 2px solid var(--accent-deep); }
.scorecard-mock-corner-bl { bottom: -1px; left: -1px; border-bottom: 2px solid var(--accent-deep); border-left: 2px solid var(--accent-deep); }
.scorecard-mock-corner-br { bottom: -1px; right: -1px; border-bottom: 2px solid var(--accent-deep); border-right: 2px solid var(--accent-deep); }

.score-label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; }
.score-display { display: flex; align-items: baseline; gap: 12px; margin-bottom: 4px; }
.score-big {
  font-family: var(--display); font-style: italic; font-weight: 400;
  font-size: 88px; line-height: 1;
  color: var(--ink);
}
.score-out { font-family: var(--display); font-weight: 400; font-size: 28px; color: var(--ink-hover); }
.score-tier { font-family: var(--mono); font-size: 12px; letter-spacing: 0.1em; color: var(--accent); margin-bottom: 20px; }
.score-tier strong { color: var(--ink); }

/* Sections */
section { padding: 100px 0; }
.section-eyebrow { font-family: var(--mono); font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 20px; }
.section-title {
  font-family: var(--display); font-weight: 400;
  font-size: clamp(32px, 4vw, 46px);
  line-height: 1.08; letter-spacing: -0.012em;
  margin-bottom: 24px; max-width: 780px;
}
.section-title em { font-style: italic; font-weight: 300; color: var(--ink-hover); }
.section-lede { font-size: 19px; color: var(--ink-hover); max-width: 680px; margin-bottom: 60px; }

/* Dimensions section (dark) */
.dims { background: var(--ink); color: var(--paper); }
.dims .section-eyebrow { color: var(--accent-soft); }
.dims .section-title { color: var(--paper); }
.dims .section-title em { color: rgba(255,255,255,0.7); }
.dims .section-lede { color: rgba(255,255,255,0.7); }

.dim-grid { display: grid; grid-template-columns: repeat(5, 1fr); margin-top: 32px; }
.dim-cell {
  padding: 32px 24px 36px;
  border-top: 1px solid rgba(157,116,255,0.32);
  border-right: 1px solid rgba(157,116,255,0.15);
  position: relative; transition: background 0.3s;
}
.dim-cell:last-child { border-right: none; }
.dim-cell:hover { background: rgba(157,116,255,0.06); }
.dim-num {
  font-family: var(--display); font-style: italic; font-weight: 400;
  font-size: 28px; color: var(--accent-soft);
  margin-bottom: 8px;
}
.dim-title { font-family: var(--display); font-size: 18px; font-weight: 400; line-height: 1.25; margin-bottom: 12px; color: var(--paper); }
.dim-body { font-size: 13px; line-height: 1.55; color: rgba(255,255,255,0.7); }

/* Mode toggle */
.toggle-section { background: var(--paper-soft); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.toggle-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
.mode-card { background: var(--paper); border: 1px solid var(--line); padding: 32px; position: relative; }
.mode-tabs { display: flex; gap: 4px; margin-bottom: 28px; padding: 4px; background: var(--paper-deep); width: fit-content; }
.mode-tab {
  padding: 10px 20px;
  font-family: var(--mono); font-size: 11px;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--ink-hover); cursor: pointer;
  transition: all 0.2s;
}
.mode-tab.active { background: var(--ink); color: var(--paper); }
.mode-content {
  font-family: var(--display); font-size: 22px;
  font-style: italic; font-weight: 400;
  line-height: 1.3; color: var(--ink);
  margin-bottom: 24px; min-height: 80px;
}
.mode-content em { color: var(--accent); font-weight: 400; }
.mode-list { list-style: none; border-top: 1px solid var(--line); padding-top: 16px; }
.mode-list li { padding: 10px 0; font-size: 14px; color: var(--ink-hover); display: flex; gap: 12px; }
.mode-list li::before { content: '→'; color: var(--accent); font-family: var(--mono); }

/* Tiers */
.tiers { background: var(--paper); }
.tier-bar { display: grid; grid-template-columns: repeat(4, 1fr); margin-top: 40px; border: 1px solid var(--line-strong); }
.tier { padding: 36px 28px; border-right: 1px solid var(--line); position: relative; }
.tier:last-child { border-right: none; }
.tier-range { font-family: var(--mono); font-size: 12px; letter-spacing: 0.12em; color: var(--accent); margin-bottom: 12px; }
.tier-name { font-family: var(--display); font-size: 22px; font-style: italic; font-weight: 400; margin-bottom: 8px; }
.tier-body { font-size: 14px; color: var(--ink-hover); line-height: 1.5; }
.tier-1 { background: linear-gradient(180deg, var(--paper-soft) 0%, rgba(177,75,61,0.04) 100%); }
.tier-2 { background: linear-gradient(180deg, var(--paper-soft) 0%, rgba(201,147,52,0.04) 100%); }
.tier-3 { background: linear-gradient(180deg, var(--paper-soft) 0%, rgba(79,140,91,0.04) 100%); }
.tier-4 { background: linear-gradient(180deg, var(--paper-soft) 0%, rgba(99,45,221,0.08) 100%); }

/* Bio */
.bio { background: var(--paper); padding: 100px 0; border-top: 1px solid var(--line); }
.bio-grid { display: grid; grid-template-columns: 180px 1fr; gap: 60px; align-items: start; }
.bio-photo {
  width: 180px; height: 180px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  box-shadow: 0 12px 32px -12px rgba(0,55,86,0.32);
  flex-shrink: 0;
}
.bio-photo img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
}
.bio-photo::after {
  content: ''; position: absolute; inset: 0;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.4), inset 0 0 0 2px rgba(0,55,86,0.18);
  pointer-events: none;
}
.bio-cta { margin-top: 8px; margin-bottom: 8px; }
.btn-primary.btn-schedule { background: var(--accent); color: var(--paper); }
.btn-primary.btn-schedule:hover { background: var(--accent-soft); }
.bio-name { font-family: var(--display); font-size: 36px; font-weight: 400; margin-bottom: 8px; }
.bio-title { font-size: 16px; color: var(--ink-hover); margin-bottom: 24px; }
.bio-body { font-size: 17px; line-height: 1.6; color: var(--ink-hover); margin-bottom: 24px; max-width: 680px; }
/* CTA banner */
.cta-banner { background: var(--ink); color: var(--paper); padding: 80px 0; text-align: center; position: relative; overflow: hidden; }
.cta-banner::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, rgba(99,45,221,0.18) 0%, transparent 60%);
  pointer-events: none;
}
.cta-banner .container { position: relative; z-index: 1; }
.cta-banner h2 {
  font-family: var(--display); font-size: clamp(28px, 4vw, 40px);
  font-weight: 400; margin-bottom: 16px;
  max-width: 720px; margin-left: auto; margin-right: auto; line-height: 1.15;
}
.cta-banner h2 em { font-style: italic; font-weight: 300; color: rgba(255,255,255,0.7); }
.cta-banner p { color: rgba(255,255,255,0.7); margin-bottom: 32px; max-width: 580px; margin-left: auto; margin-right: auto; }

/* Footer */
footer { background: var(--ink-deep); color: rgba(255,255,255,0.6); padding: 60px 0 40px; font-size: 13px; line-height: 1.6; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 60px; border-bottom: 1px solid rgba(255,255,255,0.12); padding-bottom: 32px; margin-bottom: 24px; }
.footer-disclaimer { font-family: var(--display); font-style: italic; font-weight: 300; font-size: 14px; }
.footer-meta { font-family: var(--mono); font-size: 11px; letter-spacing: 0.08em; }
.footer-lockup { display: flex; align-items: center; gap: 20px; margin-bottom: 16px; }
.footer-lockup img { height: 22px; width: auto; display: block; }
.footer-lockup .footer-logo-schellip { height: 17px; }
.footer-divider { width: 1px; height: 22px; background: rgba(255,255,255,0.2); }

@keyframes fade-in { to { opacity: 1; transform: translateY(0); } }

@media (max-width: 900px) {
  .hero { padding: 60px 0 80px; }
  .hero .container { grid-template-columns: 1fr; gap: 60px; }
  .dim-grid { grid-template-columns: 1fr 1fr; }
  .dim-cell { border-right: 1px solid rgba(157,116,255,0.15); }
  .toggle-grid { grid-template-columns: 1fr; gap: 32px; }
  .tier-bar { grid-template-columns: 1fr 1fr; }
  .tier { border-right: none; border-bottom: 1px solid var(--line); }
  .bio-grid { grid-template-columns: 1fr; gap: 32px; }
  .bio-photo { width: 120px; height: 120px; }
  .footer-grid { grid-template-columns: 1fr; gap: 32px; }
  section { padding: 70px 0; }
  .container { padding: 0 20px; }
  .score-big { font-size: 64px; }
  .brand-logo-whiteford { height: 22px; }
  .brand-logo-schellip { height: 17px; }
  .brand-divider { height: 22px; }
}
.launch-note { color: rgba(255,255,255,0.78); font-size: 16px; line-height: 1.6; max-width: 620px; margin: 36px 0 22px; }
.cta-banner .launch-note { margin-left: auto; margin-right: auto; margin-bottom: 28px; }
html, body { max-width: 100%; overflow-x: hidden; }
img, svg { max-width: 100%; }
.hero-eyebrow, .hero h1, .hero-sub, .hero-cta-row, .hero-visual { opacity: 1; animation: none; transform: none; }
.dims .section-eyebrow, .cta-banner .section-eyebrow { color: #c9b8ff; }
.hero .container > *, .output-grid > *, .toggle-grid > *, .forward-up-grid > * { min-width: 0; }
@media (max-width: 900px) {
  .hero h1 { font-size: clamp(32px, 10vw, 38px); overflow-wrap: normal; }
  .hero-sub { font-size: 17px; }
  .btn-primary { max-width: 100%; justify-content: center; }
  .hero-meta { display: block; line-height: 1.7; }
  .hero h1, .hero-sub, .hero-cta-row, .hero-visual { max-width: min(350px, calc(100vw - 40px)); }
  .radar-card, .scorecard-mock, .matrix-card { max-width: min(350px, calc(100vw - 40px)); }
}
`,
  markup: String.raw`<div class="brand-bar">
  <div class="container">
    <div class="brand-lockup">
      <img class="brand-logo-whiteford" src="/logos/whiteford-navy-on-light.png" alt="Whiteford Taylor Preston" width="886" height="205">
      <span class="brand-divider"></span>
      <img class="brand-logo-schellip" src="/logos/schellip-color.png" alt="Schell IP" width="982" height="149">
    </div>
    <span class="brand-bar-meta">learn.schellip.com</span>
  </div>
</div>

<section class="hero">
  <div class="container">
    <div>
      <div class="hero-eyebrow">Patent Moat Scorecard</div>
      <h1>Score your IP moat the way a <em>Series B investor</em> would.</h1>
      <p class="hero-sub">A 15-question scorecard benchmarks your patent portfolio against typical venture-stage IP profiles across five dimensions. Toggle between founder and investor modes. Receive a personalized scorecard and a prioritized list of next moves.</p>
      <div class="hero-cta-row">
        <a href="#start" class="btn-primary">
          Score my moat
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg>
        </a>
        <span class="hero-meta">15 questions · 5 dimensions · Benchmarked</span>
      </div>
    </div>
    <div class="hero-visual">
      <div class="scorecard-mock">
        <span class="scorecard-mock-corner-bl"></span>
        <span class="scorecard-mock-corner-br"></span>
        <div class="score-label">— Sample output</div>
        <div class="score-display">
          <span class="score-big">31</span>
          <span class="score-out">/ 45</span>
        </div>
        <div class="score-tier">TIER: <strong>SERIES A-READY</strong></div>
        <svg viewBox="0 0 320 280" width="100%">
          <g stroke="rgba(0,55,86,0.12)" fill="none" stroke-width="0.7">
            <polygon points="160,30 280,118 234,250 86,250 40,118"/>
            <polygon points="160,68 244,128 211,224 109,224 76,128"/>
            <polygon points="160,106 208,138 188,198 132,198 112,138"/>
            <polygon points="160,144 172,150 165,170 155,170 148,150"/>
          </g>
          <polygon points="160,46 264,124 224,242 96,242 56,124" fill="none" stroke="rgba(99,45,221,0.45)" stroke-width="1" stroke-dasharray="3 3"/>
          <polygon points="160,76 232,130 207,218 113,218 88,130" fill="none" stroke="rgba(0,55,86,0.3)" stroke-width="1" stroke-dasharray="2 4"/>
          <polygon points="160,62 240,128 216,224 104,232 78,138" fill="rgba(99,45,221,0.22)" stroke="#4A1FB0" stroke-width="1.8"/>
          <circle cx="160" cy="62" r="4.5" fill="#4A1FB0"/>
          <circle cx="240" cy="128" r="4.5" fill="#4A1FB0"/>
          <circle cx="216" cy="224" r="4.5" fill="#4A1FB0"/>
          <circle cx="104" cy="232" r="4.5" fill="#4A1FB0"/>
          <circle cx="78" cy="138" r="4.5" fill="#4A1FB0"/>
          <text x="160" y="22" text-anchor="middle" fill="#154E73" font-family="IBM Plex Mono" font-size="9" letter-spacing="1">CAPTURE</text>
          <text x="298" y="120" text-anchor="middle" fill="#154E73" font-family="IBM Plex Mono" font-size="9" letter-spacing="1">ALLOCATION</text>
          <text x="252" y="266" text-anchor="middle" fill="#154E73" font-family="IBM Plex Mono" font-size="9" letter-spacing="1">FTO</text>
          <text x="68" y="266" text-anchor="middle" fill="#154E73" font-family="IBM Plex Mono" font-size="9" letter-spacing="1">ALIGNMENT</text>
          <text x="22" y="120" text-anchor="middle" fill="#154E73" font-family="IBM Plex Mono" font-size="9" letter-spacing="1">EXIT FIT</text>
        </svg>
        <div style="margin-top: 16px; display: flex; gap: 16px; font-family: var(--mono); font-size: 10px; color: var(--ink-hover); letter-spacing: 0.06em;">
          <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 14px; border-top: 1px dashed rgba(0,55,86,0.3); display: inline-block;"></span>SERIES A</span>
          <span style="display: flex; align-items: center; gap: 6px;"><span style="width: 14px; border-top: 1px dashed rgba(99,45,221,0.45); display: inline-block;"></span>SERIES B</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="dims">
  <div class="container">
    <div class="section-eyebrow">— Scored across five dimensions</div>
    <h2 class="section-title">The five questions investors actually <em>care about.</em></h2>
    <p class="section-lede">Sophisticated acquirers and Series B leads do not ask whether you have patents. They ask whether the IP supports the financing story, the product roadmap, and the exit. Each dimension here is scored 0–9 against observed venture-stage benchmarks.</p>
    <div class="dim-grid">
      <div class="dim-cell">
        <div class="dim-num">01</div>
        <h3 class="dim-title">Invention capture</h3>
        <p class="dim-body">Rhythm of disclosure before public release. Inventor education. Filing cadence tied to milestones.</p>
      </div>
      <div class="dim-cell">
        <div class="dim-num">02</div>
        <h3 class="dim-title">Patent vs. trade secret allocation</h3>
        <p class="dim-body">Documented decision criteria, trade-secret hygiene, and claim-breadth strategy.</p>
      </div>
      <div class="dim-cell">
        <div class="dim-num">03</div>
        <h3 class="dim-title">Freedom to operate</h3>
        <p class="dim-body">Formal FTO posture, competitive monitoring, and engineering's ability to design around.</p>
      </div>
      <div class="dim-cell">
        <div class="dim-num">04</div>
        <h3 class="dim-title">Claim-to-product alignment</h3>
        <p class="dim-body">Coverage of revenue-generating features, active claim mapping, and continuation strategy.</p>
      </div>
      <div class="dim-cell">
        <div class="dim-num">05</div>
        <h3 class="dim-title">Exit-horizon fit</h3>
        <p class="dim-body">Diligence readiness, international strategy, and treatment of adjacent IP assets.</p>
      </div>
    </div>
  </div>
</section>

<section class="toggle-section">
  <div class="container">
    <div class="toggle-grid">
      <div>
        <div class="section-eyebrow">— Built for both sides of the table</div>
        <h2 class="section-title">Founder mode or <em>investor mode.</em></h2>
        <p style="font-size: 17px; color: var(--ink-hover); line-height: 1.6; margin-bottom: 24px;">Same scoring engine. Different framing. Founders see actions they can take. Investors see diligence questions to raise with management. One tool, two contexts.</p>
        <p style="font-size: 15px; color: var(--ink-hover); line-height: 1.6;">If you run portfolio companies, running the scorecard in investor mode produces a structured briefing you can share with founders before your next board meeting. Three taps. No login.</p>
      </div>
      <div class="mode-card">
        <div class="mode-tabs">
          <div class="mode-tab active">FOUNDER</div>
          <div class="mode-tab">INVESTOR</div>
        </div>
        <div class="mode-content">"Your moat is <em>building</em>, with gaps in claim-to-product alignment that a Series B lead will probe."</div>
        <ul class="mode-list">
          <li>File continuations covering your three core product modules</li>
          <li>Update claim charts before next investor update</li>
          <li>Document trade-secret inventory and access controls</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="tiers">
  <div class="container">
    <div class="section-eyebrow">— Four tiers, benchmarked</div>
    <h2 class="section-title">Where does your score <em>land?</em></h2>
    <p class="section-lede">Tier benchmarks reflect observed IP profiles at typical Series A and Series B financings and at recent strategic exits in deep tech and AI. Your score includes a written explanation of the tier and the gap to the next.</p>
    <div class="tier-bar">
      <div class="tier tier-1">
        <div class="tier-range">0 — 13</div>
        <h3 class="tier-name">Early-stage gap</h3>
        <p class="tier-body">Pre-foundation. Diligence-blocking gaps. Foundational filing and IP-assignment work needed first.</p>
      </div>
      <div class="tier tier-2">
        <div class="tier-range">14 — 23</div>
        <h3 class="tier-name">Building</h3>
        <p class="tier-body">Foundational. Filings exist but rhythm, allocation, and claim breadth need focused attention.</p>
      </div>
      <div class="tier tier-3">
        <div class="tier-range">24 — 35</div>
        <h3 class="tier-name">Series A-ready</h3>
        <p class="tier-body">Strong. Filings and rhythm in place; tighten alignment to product and exit-horizon fit.</p>
      </div>
      <div class="tier tier-4">
        <div class="tier-range">36 — 45</div>
        <h3 class="tier-name">Defensible moat</h3>
        <p class="tier-body">Exit-ready. Portfolio is organized, mapped, monitored, and aligned. Maintain rhythm.</p>
      </div>
    </div>
  </div>
</section>

<section class="cta-banner" id="start">
  <div class="container">
    <h2>Run the scorecard. <em>One defensible score.</em></h2>
    <div data-learn-report-slot="patent-moat-scorecard"></div>
  </div>
</section>

<section class="bio">
  <div class="container">
    <div class="bio-grid">
      <div class="bio-photo"><img src="/logos/jeff-schell.jpg" alt="Jeff Schell" width="480" height="480"></div>
      <div>
        <h2 class="bio-name">Jeff Schell</h2>
        <div class="bio-title">Managing Partner, Mountain West · Whiteford Taylor &amp; Preston · Patent Attorney · Venture Capitalist · AI Advisor</div>
        <p class="bio-body">Jeff Schell is Managing Partner of Whiteford's Mountain West practice and an AI legal advisor to technology companies. A patent attorney and venture capitalist, he advises founders and investors on patent strategy, IP diligence, and venture growth. Since 2012, his work has supported the creation of over $100 million in transaction and enterprise value across Colorado's technology ecosystem.</p>
        <div class="bio-cta">
          <button class="btn-primary btn-schedule"
                  data-cal-link="jeffschell/meeting-with-jeff-schell"
                  data-cal-namespace="meeting-with-jeff-schell"
                  data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'>
            Schedule a time to speak with Jeff
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

<footer>
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-lockup">
          <img class="footer-logo-whiteford" src="/logos/whiteford-white-on-navy.png" alt="Whiteford Taylor Preston" width="900" height="270">
          <span class="footer-divider"></span>
          <img class="footer-logo-schellip" src="/logos/schellip-white.png" alt="Schell IP" width="982" height="149">
        </div>
        <p class="footer-disclaimer">This tool is for general informational purposes only and is not legal advice. Use of this tool does not create an attorney-client relationship between you, your company, and Whiteford Taylor &amp; Preston LLP or Schell IP. Do not submit confidential, privileged, or trade-secret information through this tool. Any engagement is subject to a conflicts check and a written engagement letter. Attorney advertising. Prior results do not guarantee a similar outcome.</p>
      </div>
      <div>
        <p class="footer-meta">LEARN.SCHELLIP.COM</p>
        <p class="footer-meta" style="margin-top: 8px;">DENVER · WASHINGTON · MOUNTAIN WEST</p>
      </div>
    </div>
    <p class="footer-meta">© 2026 Whiteford Taylor &amp; Preston LLP · All rights reserved · Attorney advertising</p>
  </div>
</footer>`,
};
