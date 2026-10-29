import type { LearnPageContent } from "./types";

const saleReadinessAuditStyle = String.raw`:root {
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
.brand-logo-schellip { height: 13px; }
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
.footer-lockup img { height: 28px; width: auto; display: block; }
.footer-lockup .footer-logo-schellip { height: 11px; }
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
  .brand-logo-schellip { height: 10px; }
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

/* Sale readiness: sample risk map */
.riskmap { margin-top: 6px; }
.riskmap-row { display: grid; grid-template-columns: 132px 1fr 92px; gap: 12px; align-items: center; padding: 9px 0; border-top: 1px solid var(--line); }
.riskmap-row:first-child { border-top: none; }
.riskmap-label { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-hover); }
.riskmap-track { height: 8px; background: var(--paper-deep); position: relative; }
.riskmap-fill { position: absolute; left: 0; top: 0; bottom: 0; background: var(--accent); }
.riskmap-status { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.04em; text-align: right; }
.st-ready { color: #2E7D4F; }
.st-gap { color: #B07A1E; }
.st-flag { color: #B14B3D; }
.cost-list { list-style: none; border-top: 1px solid var(--line); }
.cost-list li { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; padding: 14px 0; border-bottom: 1px solid var(--line); font-size: 14px; color: var(--ink-hover); line-height: 1.45; }
.cost-list li strong { color: var(--ink); font-weight: 500; }
.cost-list li span::before { content: '→ '; color: var(--accent); font-family: var(--mono); }
.cost-head { font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 10px; }
.bio-firm { font-size: 17px; line-height: 1.6; color: var(--ink); margin-bottom: 24px; max-width: 680px; padding-left: 16px; border-left: 3px solid var(--accent); }
@media (max-width: 900px) {
  .riskmap-row { grid-template-columns: 96px 1fr 78px; gap: 8px; }
  .cost-list li, .cost-head { grid-template-columns: 1fr; gap: 6px; }
}

/* Audit page (/sale-readiness-audit/begin) */
.begin-shell { background: var(--paper-soft); padding: 48px 0 90px; min-height: 70vh; }
.begin-shell .container { max-width: 880px; }
.begin-shell .hero-eyebrow { margin: 18px 0 18px; }
.begin-back { font-family: var(--mono); font-size: 12px; letter-spacing: 0.06em; color: var(--ink-hover); text-decoration: none; }
.begin-back:hover { color: var(--accent); }
.begin-shell .learn-report-card { margin-top: 0; }
`;

export const saleReadinessAuditContent: LearnPageContent = {
  title: "Sale & Investor Readiness Audit",
  description: "A 15-question audit scores the five areas buyers and investors diligence first and emails a buyer-diligence risk map with a 60-day cleanup plan.",
  style: saleReadinessAuditStyle,
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
      <div class="hero-eyebrow">Sale &amp; Investor Readiness Audit</div>
      <h1>See your company the way a <em>buyer&rsquo;s diligence team</em> will.</h1>
      <p class="hero-sub">Fifteen categorical questions cover the five areas buyers and investors check first: who owns the IP, how it is protected, whether key contracts survive a sale, software and data rights, and corporate records. Get a score, a buyer-diligence risk map and a 60-day cleanup plan, on screen and in your inbox.</p>
      <div class="hero-cta-row">
        <a href="/sale-readiness-audit/begin" class="btn-primary">
          Score my sale readiness
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg>
        </a>
        <span class="hero-meta">15 questions · 5 diligence areas · Emailed report</span>
      </div>
    </div>
    <div class="hero-visual">
      <div class="scorecard-mock">
        <span class="scorecard-mock-corner-bl"></span>
        <span class="scorecard-mock-corner-br"></span>
        <div class="score-label">— Sample output</div>
        <div class="score-display">
          <span class="score-big">27</span>
          <span class="score-out">/ 45</span>
        </div>
        <div class="score-tier">TIER: <strong>CLOSE, WITH FIXABLE GAPS</strong></div>
        <div class="riskmap">
          <div class="riskmap-row"><span class="riskmap-label">IP ownership</span><span class="riskmap-track"><span class="riskmap-fill" style="width:44%"></span></span><span class="riskmap-status st-flag">RED FLAG</span></div>
          <div class="riskmap-row"><span class="riskmap-label">IP protection</span><span class="riskmap-track"><span class="riskmap-fill" style="width:78%"></span></span><span class="riskmap-status st-ready">READY</span></div>
          <div class="riskmap-row"><span class="riskmap-label">Contracts</span><span class="riskmap-track"><span class="riskmap-fill" style="width:56%"></span></span><span class="riskmap-status st-gap">GAPS</span></div>
          <div class="riskmap-row"><span class="riskmap-label">Software &amp; data</span><span class="riskmap-track"><span class="riskmap-fill" style="width:67%"></span></span><span class="riskmap-status st-gap">GAPS</span></div>
          <div class="riskmap-row"><span class="riskmap-label">Records</span><span class="riskmap-track"><span class="riskmap-fill" style="width:56%"></span></span><span class="riskmap-status st-gap">GAPS</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="dims">
  <div class="container">
    <div class="section-eyebrow">— Five areas buyers diligence first</div>
    <h2 class="section-title">The questions that decide <em>price and timing.</em></h2>
    <p class="section-lede">Financial diligence gets the attention, but deals often slow down over ownership, consents and records. Each area is scored 0 to 9, and your lowest areas become the first items in your cleanup plan.</p>
    <div class="dim-grid">
      <div class="dim-cell">
        <div class="dim-num">01</div>
        <h3 class="dim-title">IP ownership</h3>
        <p class="dim-body">Invention assignments from founders, employees and contractors, with title held by the company.</p>
      </div>
      <div class="dim-cell">
        <div class="dim-num">02</div>
        <h3 class="dim-title">IP protection</h3>
        <p class="dim-body">Patents mapped to revenue products, trade-secret controls and registered brand names.</p>
      </div>
      <div class="dim-cell">
        <div class="dim-num">03</div>
        <h3 class="dim-title">Contracts</h3>
        <p class="dim-body">Change-of-control and anti-assignment terms, transferable licenses and signed copies on file.</p>
      </div>
      <div class="dim-cell">
        <div class="dim-num">04</div>
        <h3 class="dim-title">Software, data &amp; AI</h3>
        <p class="dim-body">Open-source compliance, documented rights in customer data and recorded AI use.</p>
      </div>
      <div class="dim-cell">
        <div class="dim-num">05</div>
        <h3 class="dim-title">Records &amp; disputes</h3>
        <p class="dim-body">A reconciled cap table, logged IP claims and a data room you can open in days.</p>
      </div>
    </div>
  </div>
</section>

<section class="toggle-section">
  <div class="container">
    <div class="toggle-grid">
      <div>
        <div class="section-eyebrow">— From the Colorado Deal Report</div>
        <h2 class="section-title">Price follows <em>proof.</em></h2>
        <p style="font-size: 17px; color: var(--ink-hover); line-height: 1.6; margin-bottom: 24px;">Each month the Colorado Deal Report covers the deals that shaped the state&rsquo;s market. The pattern repeats: buyers pay for what they can verify, and what they cannot verify comes back as price, process or protection.</p>
        <p style="font-size: 15px; color: var(--ink-hover); line-height: 1.6;">Most of these gaps can be closed months before a sale or a raise, while you still control the timeline. The audit shows where to start.</p>
      </div>
      <div class="mode-card">
        <div class="cost-head"><span>Gap found in diligence</span><span>Where it often shows up</span></div>
        <ul class="cost-list">
          <li><strong>Missing invention assignments</strong><span>Closing conditions or special indemnities</span></li>
          <li><strong>Change-of-control consents</strong><span>Delayed signing or closing</span></li>
          <li><strong>Open-source or data-rights issues</strong><span>Escrows, holdbacks or price adjustments</span></li>
          <li><strong>Unreconciled cap table</strong><span>Extra diligence time and cost</span></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="tiers">
  <div class="container">
    <div class="section-eyebrow">— Four tiers</div>
    <h2 class="section-title">Where does your score <em>land?</em></h2>
    <p class="section-lede">Your result explains the tier, maps each area as ready, gaps to close or a likely buyer red flag, and lists the three priorities to work on first.</p>
    <div class="tier-bar">
      <div class="tier tier-1">
        <div class="tier-range">0 — 13</div>
        <h3 class="tier-name">Not yet sale-ready</h3>
        <p class="tier-body">Ownership and records questions would likely stall a deal today.</p>
      </div>
      <div class="tier tier-2">
        <div class="tier-range">14 — 23</div>
        <h3 class="tier-name">Value at risk</h3>
        <p class="tier-body">Gaps likely to surface as escrows, holdbacks, special indemnities or delay.</p>
      </div>
      <div class="tier tier-3">
        <div class="tier-range">24 — 35</div>
        <h3 class="tier-name">Close, with fixable gaps</h3>
        <p class="tier-body">A solid foundation with specific gaps worth closing before a process starts.</p>
      </div>
      <div class="tier tier-4">
        <div class="tier-range">36 — 45</div>
        <h3 class="tier-name">Diligence-ready</h3>
        <p class="tier-body">Buyers should find what they expect. Keep records current and tell the IP story well.</p>
      </div>
    </div>
  </div>
</section>
<section class="bio">
  <div class="container">
    <div class="bio-grid">
      <div class="bio-photo"><img src="/logos/jeff-schell.jpg" alt="Jeff Schell" width="480" height="480"></div>
      <div>
        <h2 class="bio-name">Jeff Schell</h2>
        <div class="bio-title">Managing Partner, Mountain West · Whiteford Taylor &amp; Preston · Venture Capitalist</div>
        <p class="bio-body">Jeff Schell is Managing Partner of Whiteford's Mountain West practice. A former multi-exit technology founder and venture investor, he advises Colorado and Mountain West companies on IP strategy, diligence readiness and venture growth, and publishes the monthly Colorado Deal Report.</p>
        <p class="bio-firm">Whiteford, Taylor &amp; Preston LLP is a compelling choice for business leaders exploring a sale of their company or seeking to maximize its value and leverage through strategic IP.</p>
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

/** The audit itself: details, email verification, then the paged questions. */
export const saleReadinessAuditBeginContent: LearnPageContent = {
  title: "Sale & Investor Readiness Audit",
  description: "Start the Sale & Investor Readiness Audit.",
  style: saleReadinessAuditStyle,
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

<section class="begin-shell">
  <div class="container">
    <a class="begin-back" href="/sale-readiness-audit">&larr; About the audit</a>
    <div class="hero-eyebrow">Sale &amp; Investor Readiness Audit</div>
    <div data-learn-report-slot="sale-readiness-audit"></div>
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
