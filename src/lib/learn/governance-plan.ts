import type { LearnPageContent } from "./types";

export const governancePlanContent: LearnPageContent = {
  title: "AI Governance Readiness Plan",
  description: "A five-minute diagnostic produces a one-page AI governance readiness plan across nine board-facing areas.",
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
  --green: #4F8C5B;
  --green-soft: rgba(79,140,91,0.12);
  --yellow: #C99334;
  --yellow-soft: rgba(201,147,52,0.12);
  --red: #B14B3D;
  --red-soft: rgba(177,75,61,0.12);
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

/* Hero — institutional grid */
.hero { padding: 100px 0 80px; position: relative; overflow: hidden; background: var(--paper); }
.hero::before {
  content: ''; position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(0,55,86,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,55,86,0.05) 1px, transparent 1px);
  background-size: 80px 80px;
  pointer-events: none;
  mask-image: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 80%);
}
.hero .container {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: 1.1fr 1fr;
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
  font-size: clamp(38px, 5.4vw, 60px);
  line-height: 1.05; letter-spacing: -0.014em;
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

/* Hero visual: matrix */
.hero-visual { position: relative; opacity: 0; animation: fade-in 1s 0.6s forwards; }
.matrix-card {
  background: var(--paper); border: 1px solid var(--line-strong);
  padding: 32px;
  box-shadow: 0 30px 60px -20px rgba(0,55,86,0.15);
}
.matrix-header { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 16px; margin-bottom: 20px; border-bottom: 1px solid var(--line); }
.matrix-label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); }
.matrix-tier { font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink); }
.matrix-title { font-family: var(--display); font-style: italic; font-weight: 400; font-size: 22px; margin-bottom: 4px; }
.matrix-subtitle { font-family: var(--mono); font-size: 11px; color: var(--ink-hover); letter-spacing: 0.06em; margin-bottom: 24px; }
.matrix-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; margin-bottom: 24px; }
.matrix-cell {
  padding: 14px 12px 12px;
  border: 1px solid var(--line);
  background: var(--paper-soft);
  position: relative; min-height: 84px;
  display: flex; flex-direction: column; justify-content: space-between;
}
.matrix-cell.green { background: var(--green-soft); border-color: rgba(79,140,91,0.4); }
.matrix-cell.yellow { background: var(--yellow-soft); border-color: rgba(201,147,52,0.4); }
.matrix-cell.red { background: var(--red-soft); border-color: rgba(177,75,61,0.4); }
.matrix-cell-num { font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em; color: var(--ink-hover); margin-bottom: 6px; }
.matrix-cell-name { font-family: var(--display); font-style: italic; font-weight: 400; font-size: 13px; line-height: 1.2; color: var(--ink); }
.matrix-cell-status { font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 8px; }
.matrix-cell.green .matrix-cell-status { color: var(--green); }
.matrix-cell.yellow .matrix-cell-status { color: var(--yellow); }
.matrix-cell.red .matrix-cell-status { color: var(--red); }
.matrix-footer { font-family: var(--mono); font-size: 11px; color: var(--ink-hover); letter-spacing: 0.04em; display: flex; justify-content: space-between; padding-top: 16px; border-top: 1px solid var(--line); }

/* Sections */
section { padding: 100px 0; }
.section-eyebrow { font-family: var(--mono); font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 20px; }
.section-title {
  font-family: var(--display); font-weight: 400;
  font-size: clamp(32px, 4vw, 46px);
  line-height: 1.08; letter-spacing: -0.012em;
  margin-bottom: 24px; max-width: 760px;
}
.section-title em { font-style: italic; font-weight: 300; color: var(--ink-hover); }
.section-lede { font-size: 19px; color: var(--ink-hover); max-width: 680px; margin-bottom: 60px; }

/* Nine domains */
.domains { background: var(--paper-soft); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.domain-rows { margin-top: 40px; }
.domain-row { display: grid; grid-template-columns: 200px 1fr; gap: 60px; padding: 36px 0; border-top: 1px solid var(--line); align-items: start; }
.domain-row:last-child { border-bottom: 1px solid var(--line); }
.domain-row-label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); }
.domain-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
.domain-item { position: relative; padding-left: 24px; }
.domain-item::before { content: attr(data-num); position: absolute; left: 0; top: 2px; font-family: var(--display); font-style: italic; font-weight: 400; font-size: 14px; color: var(--accent); }
.domain-name { font-family: var(--display); font-size: 17px; font-weight: 400; line-height: 1.2; margin-bottom: 8px; }
.domain-body { font-size: 13px; line-height: 1.5; color: var(--ink-hover); }

/* Tiers */
.tiers { background: var(--ink); color: var(--paper); }
.tiers .section-eyebrow { color: var(--accent-soft); }
.tiers .section-title { color: var(--paper); }
.tiers .section-title em { color: rgba(255,255,255,0.7); }
.tiers .section-lede { color: rgba(255,255,255,0.7); }

.tier-bar {
  display: grid; grid-template-columns: repeat(3, 1fr);
  margin-top: 40px; gap: 1px;
  background: rgba(157,116,255,0.22);
  border: 1px solid rgba(157,116,255,0.22);
}
.tier { background: var(--ink); padding: 36px 32px; }
.tier-range { font-family: var(--mono); font-size: 12px; letter-spacing: 0.12em; color: var(--accent-soft); margin-bottom: 12px; }
.tier-name { font-family: var(--display); font-size: 24px; font-style: italic; font-weight: 400; margin-bottom: 8px; color: var(--paper); }
.tier-body { font-size: 14px; color: rgba(255,255,255,0.7); line-height: 1.5; }

/* Forward-up pattern */
.forward-up { background: var(--paper-soft); }
.forward-up-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
.forward-up-visual { position: relative; background: var(--paper); border: 1px solid var(--line-strong); padding: 40px; }
.forward-up-flow { display: flex; flex-direction: column; gap: 16px; }
.flow-item {
  display: flex; align-items: center; gap: 18px;
  padding: 16px 20px;
  background: var(--paper-soft);
  border: 1px solid var(--line);
  position: relative;
}
.flow-item-role { font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); min-width: 70px; }
.flow-item-name { font-family: var(--display); font-size: 16px; font-style: italic; font-weight: 400; color: var(--ink); }
.flow-arrow { align-self: center; font-family: var(--mono); color: var(--accent); font-size: 18px; letter-spacing: 0.1em; }

/* CTA banner */
.cta-banner { background: var(--ink); color: var(--paper); padding: 80px 0; text-align: center; position: relative; overflow: hidden; }
.cta-banner::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, rgba(99,45,221,0.18) 0%, transparent 60%);
  pointer-events: none;
}
.cta-banner .container { position: relative; z-index: 1; }
.cta-banner h2 { font-family: var(--display); font-size: clamp(28px, 4vw, 40px); font-weight: 400; margin-bottom: 16px; max-width: 720px; margin-left: auto; margin-right: auto; line-height: 1.15; }
.cta-banner h2 em { font-style: italic; font-weight: 300; color: rgba(255,255,255,0.7); }
.cta-banner p { color: rgba(255,255,255,0.7); margin-bottom: 32px; max-width: 580px; margin-left: auto; margin-right: auto; }

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
  .hero { padding: 60px 0 60px; }
  .hero .container { grid-template-columns: 1fr; gap: 60px; }
  .domain-row { grid-template-columns: 1fr; gap: 20px; }
  .domain-list { grid-template-columns: 1fr; gap: 24px; }
  .tier-bar { grid-template-columns: 1fr; }
  .forward-up-grid { grid-template-columns: 1fr; gap: 32px; }
  .bio-grid { grid-template-columns: 1fr; gap: 32px; }
  .bio-photo { width: 120px; height: 120px; }
  .footer-grid { grid-template-columns: 1fr; gap: 32px; }
  section { padding: 70px 0; }
  .container { padding: 0 20px; }
  .matrix-cell { min-height: 70px; }
  .matrix-cell-name { font-size: 11px; }
  .brand-logo-whiteford { height: 22px; }
  .brand-logo-schellip { height: 17px; }
  .brand-divider { height: 22px; }
}
.launch-note { color: rgba(255,255,255,0.78); font-size: 16px; line-height: 1.6; max-width: 620px; margin: 36px 0 22px; }
.cta-banner .launch-note { margin-left: auto; margin-right: auto; margin-bottom: 28px; }
html, body { max-width: 100%; overflow-x: hidden; }
img, svg { max-width: 100%; }
.hero-eyebrow, .hero h1, .hero-sub, .hero-cta-row, .hero-visual { opacity: 1; animation: none; transform: none; }
.output .section-eyebrow, .tiers .section-eyebrow, .dims .section-eyebrow, .cta-banner .section-eyebrow { color: #c9b8ff; }
.tiers .tier-range { color: #c9b8ff; }
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
      <div class="hero-eyebrow">AI Governance Readiness Plan</div>
      <h1>Map your AI governance the way <em>a board would want to see it.</em></h1>
      <p class="hero-sub">A five-minute diagnostic produces a one-page plan mapping nine governance areas by readiness. The output is engineered to drop into a leadership memo or board deck. Quarter-ready. Practical.</p>
      <div class="hero-cta-row">
        <a href="#start" class="btn-primary">
          Map my governance
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg>
        </a>
        <span class="hero-meta">9 questions · 5 minutes · Board-ready output</span>
      </div>
    </div>
    <div class="hero-visual">
      <div class="matrix-card">
        <div class="matrix-header">
          <span class="matrix-label">— Sample output</span>
          <span class="matrix-tier">TIER: BUILDING</span>
        </div>
        <div class="matrix-title">Your Governance Plan</div>
        <div class="matrix-subtitle">PREPARED FOR [YOUR COMPANY] · Q2 2026</div>
        <div class="matrix-grid">
          <div class="matrix-cell green"><div><div class="matrix-cell-num">01</div><div class="matrix-cell-name">AI Use Policy</div></div><div class="matrix-cell-status">● STRUCTURE</div></div>
          <div class="matrix-cell yellow"><div><div class="matrix-cell-num">06</div><div class="matrix-cell-name">Approval Authority</div></div><div class="matrix-cell-status">● DRAFT</div></div>
          <div class="matrix-cell red"><div><div class="matrix-cell-num">09</div><div class="matrix-cell-name">Outside Counsel</div></div><div class="matrix-cell-status">● GAP</div></div>
          <div class="matrix-cell green"><div><div class="matrix-cell-num">02</div><div class="matrix-cell-name">AI in Hiring</div></div><div class="matrix-cell-status">● STRUCTURE</div></div>
          <div class="matrix-cell yellow"><div><div class="matrix-cell-num">03</div><div class="matrix-cell-name">Content Generation</div></div><div class="matrix-cell-status">● DRAFT</div></div>
          <div class="matrix-cell red"><div><div class="matrix-cell-num">05</div><div class="matrix-cell-name">Vendor Intake</div></div><div class="matrix-cell-status">● GAP</div></div>
          <div class="matrix-cell yellow"><div><div class="matrix-cell-num">04</div><div class="matrix-cell-name">Customer Data &amp; AI</div></div><div class="matrix-cell-status">● DRAFT</div></div>
          <div class="matrix-cell red"><div><div class="matrix-cell-num">07</div><div class="matrix-cell-name">Customer Contracts</div></div><div class="matrix-cell-status">● GAP</div></div>
          <div class="matrix-cell yellow"><div><div class="matrix-cell-num">08</div><div class="matrix-cell-name">Board Reporting</div></div><div class="matrix-cell-status">● DRAFT</div></div>
        </div>
        <div class="matrix-footer">
          <span>2 STRUCTURE · 4 DRAFT · 3 GAP</span>
          <span>FOCUS: VENDOR INTAKE</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="domains">
  <div class="container">
    <div class="section-eyebrow">— Nine governance areas</div>
    <h2 class="section-title">The questions a sophisticated board <em>will eventually ask.</em></h2>
    <p class="section-lede">AI now touches nine distinct legal and operational areas in most technology companies. The plan groups them into three categories that mirror how a board or audit committee would actually think about oversight.</p>
    <div class="domain-rows">
      <div class="domain-row">
        <div class="domain-row-label">Foundations<br />Row 1</div>
        <div class="domain-list">
          <div class="domain-item" data-num="01"><h3 class="domain-name">AI Use Policy</h3><p class="domain-body">Written policy distinguishing low-risk and high-risk AI use across the organization.</p></div>
          <div class="domain-item" data-num="06"><h3 class="domain-name">Approval Authority</h3><p class="domain-body">A clear owner with documented authority for AI tools and use cases.</p></div>
          <div class="domain-item" data-num="09"><h3 class="domain-name">Outside Counsel</h3><p class="domain-body">Engagement with counsel covering AI-specific IP, contracts, policy, and vendor review.</p></div>
        </div>
      </div>
      <div class="domain-row">
        <div class="domain-row-label">Operations<br />Row 2</div>
        <div class="domain-list">
          <div class="domain-item" data-num="02"><h3 class="domain-name">AI in Hiring</h3><p class="domain-body">Hiring tools reviewed for bias, disparate impact, and candidate disclosure.</p></div>
          <div class="domain-item" data-num="03"><h3 class="domain-name">Content Generation</h3><p class="domain-body">Workflow specifying allowed tools, attribution, and ownership confirmation.</p></div>
          <div class="domain-item" data-num="05"><h3 class="domain-name">Vendor Intake</h3><p class="domain-body">Formal intake addressing training rights, retention, indemnity, and security.</p></div>
        </div>
      </div>
      <div class="domain-row">
        <div class="domain-row-label">External<br />Row 3</div>
        <div class="domain-list">
          <div class="domain-item" data-num="04"><h3 class="domain-name">Customer Data &amp; AI</h3><p class="domain-body">Inventory of which tools touch customer data, with documented data flows.</p></div>
          <div class="domain-item" data-num="07"><h3 class="domain-name">Customer Contracts</h3><p class="domain-body">Contracts updated to address AI use, output, data, and indemnity.</p></div>
          <div class="domain-item" data-num="08"><h3 class="domain-name">Board Reporting</h3><p class="domain-body">Regular reporting on AI use, risks, and governance maturity.</p></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="tiers">
  <div class="container">
    <div class="section-eyebrow">— Three readiness tiers</div>
    <h2 class="section-title">Where does your <em>organization land?</em></h2>
    <p class="section-lede">The plan produces both an area-by-area readout and an overall readiness tier based on how many areas have structure in place. The output is sized for a single page in a board deck.</p>
    <div class="tier-bar">
      <div class="tier">
        <div class="tier-range">0 — 3 STRUCTURE</div>
        <h3 class="tier-name">Pre-foundation</h3>
        <p class="tier-body">Foundational governance build needed. Most domains have gaps a board or auditor will surface.</p>
      </div>
      <div class="tier">
        <div class="tier-range">4 — 6 STRUCTURE</div>
        <h3 class="tier-name">Building governance</h3>
        <p class="tier-body">Focused gap closure. Foundations in place; specific operational and external areas need attention.</p>
      </div>
      <div class="tier">
        <div class="tier-range">7 — 9 STRUCTURE</div>
        <h3 class="tier-name">Mature governance</h3>
        <p class="tier-body">Maintain and report. Governance is functioning; the work is keeping the plan current quarter over quarter.</p>
      </div>
    </div>
  </div>
</section>

<section class="forward-up">
  <div class="container">
    <div class="forward-up-grid">
      <div>
        <div class="section-eyebrow">— Designed to be forwarded</div>
        <h2 class="section-title">A one-page artifact <em>your team can act on.</em></h2>
        <p style="font-size: 17px; color: var(--ink-hover); line-height: 1.6; margin-bottom: 24px;">Most governance assessments produce a 40-page report no one reads. This one produces a one-page plan engineered to be dropped into an exec memo or board pre-read. The five-page workbook follows for the team that owns each area.</p>
        <p style="font-size: 15px; color: var(--ink-hover); line-height: 1.6;">Operations leaders forward the plan to the CEO. The CEO forwards to the GC. The GC books a focused consultation. Three touches, one capture.</p>
      </div>
      <div class="forward-up-visual">
        <div style="font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; color: var(--accent); margin-bottom: 20px; text-transform: uppercase;">— Typical distribution path</div>
        <div class="forward-up-flow">
          <div class="flow-item">
            <span class="flow-item-role">DOWNLOAD</span>
            <span class="flow-item-name">Head of Operations</span>
          </div>
          <span class="flow-arrow">↓</span>
          <div class="flow-item">
            <span class="flow-item-role">FORWARD</span>
            <span class="flow-item-name">Chief Executive Officer</span>
          </div>
          <span class="flow-arrow">↓</span>
          <div class="flow-item">
            <span class="flow-item-role">FORWARD</span>
            <span class="flow-item-name">General Counsel</span>
          </div>
          <span class="flow-arrow">↓</span>
          <div class="flow-item" style="border-color: var(--accent); background: rgba(99,45,221,0.06);">
            <span class="flow-item-role" style="color: var(--ink);">CONSULT</span>
            <span class="flow-item-name">Schell IP at Whiteford</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="cta-banner" id="start">
  <div class="container">
    <h2>Nine questions. Five minutes. <em>A board-ready plan.</em></h2>
    <p class="launch-note">Interactive tool launching once Whiteford compliance review is complete. Schedule time with Jeff if you want to discuss the assessment before it goes live.</p>
    <button class="btn-primary btn-schedule"
        data-cal-link="jeffschell/meeting-with-jeff-schell"
        data-cal-namespace="meeting-with-jeff-schell"
        data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'>
        Schedule a time to speak with Jeff
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg>
      </button>
  </div>
</section>

<section class="bio">
  <div class="container">
    <div class="bio-grid">
      <div class="bio-photo"><img src="/logos/jeff-schell.jpg" alt="Jeff Schell" width="480" height="480"></div>
      <div>
        <h2 class="bio-name">Jeff Schell</h2>
        <div class="bio-title">Managing Partner, Mountain West · Whiteford Taylor &amp; Preston · Outside General Counsel · AI Advisor</div>
        <p class="bio-body">Jeff Schell is Managing Partner of Whiteford's Mountain West practice and an AI legal advisor to technology companies. He serves as outside general counsel and trusted advisor to technology companies navigating AI governance, IP, venture, and strategic infrastructure questions. Since 2012, his work has supported the creation of over $100 million in transaction and enterprise value across Colorado's technology ecosystem.</p>
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
        <p class="footer-disclaimer">This page and the readiness plan are for general informational purposes only and are not legal advice. Use of this tool does not create an attorney-client relationship. Any engagement is subject to a conflicts check and formal engagement terms.</p>
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
