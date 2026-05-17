import type { LearnPageContent } from "./types";

export const aiRiskTriageContent: LearnPageContent = {
  title: "AI Legal Risk Triage",
  description: "A 5-minute triage tool maps your AI risk across four critical areas. Receive a personalized risk profile and prioritized actions, tailored to your responses.",
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
  --risk-low: #4F8C5B;
  --risk-mid: #C99334;
  --risk-high: #B14B3D;
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

/* Hero */
.hero {
  background: var(--ink); color: var(--paper);
  padding: 88px 0 110px; position: relative; overflow: hidden;
}
.hero::before {
  content: ''; position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 85% 15%, rgba(99,45,221,0.22) 0%, transparent 55%),
    radial-gradient(ellipse at 5% 90%, rgba(99,45,221,0.10) 0%, transparent 50%);
  pointer-events: none;
}
.hero .container {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: 1.3fr 1fr;
  gap: 80px; align-items: center;
}
.hero-eyebrow {
  font-family: var(--mono); font-size: 12px;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--accent-soft); margin-bottom: 24px;
  display: flex; align-items: center; gap: 12px;
  opacity: 0; animation: fade-in 0.7s 0.1s forwards;
}
.hero-eyebrow::before {
  content: ''; width: 32px; height: 1px; background: var(--accent-soft);
}
.hero h1 {
  font-family: var(--display); font-weight: 400;
  font-size: clamp(38px, 5.4vw, 62px);
  line-height: 1.05; letter-spacing: -0.012em;
  margin-bottom: 28px;
  opacity: 0; animation: fade-in 0.8s 0.2s forwards;
}
.hero h1 em { font-style: italic; font-weight: 300; color: rgba(255,255,255,0.78); }
.hero-sub {
  font-size: 19px; line-height: 1.55;
  color: rgba(255,255,255,0.75);
  margin-bottom: 36px; max-width: 540px;
  opacity: 0; animation: fade-in 0.8s 0.35s forwards;
}
.hero-cta-row {
  display: flex; align-items: center; gap: 24px;
  flex-wrap: wrap;
  opacity: 0; animation: fade-in 0.8s 0.5s forwards;
}
.btn-primary {
  display: inline-flex; align-items: center; gap: 14px;
  background: var(--accent); color: var(--paper);
  padding: 18px 32px;
  font-family: var(--display); font-weight: 500; font-size: 16px;
  border: none; cursor: pointer;
  letter-spacing: 0.01em; transition: all 0.2s ease;
  text-decoration: none;
}
.btn-primary:hover { background: var(--accent-soft); transform: translateY(-1px); }
.btn-primary svg { transition: transform 0.2s; }
.btn-primary:hover svg { transform: translateX(4px); }
.btn-primary.btn-on-light { background: var(--ink); color: var(--paper); }
.btn-primary.btn-on-light:hover { background: var(--accent); }
.hero-meta { font-family: var(--mono); font-size: 13px; color: rgba(255,255,255,0.6); letter-spacing: 0.04em; }

/* Hero visual */
.hero-visual { position: relative; opacity: 0; animation: fade-in 1s 0.6s forwards; }
.radar-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(157,116,255,0.32);
  padding: 36px; position: relative;
  backdrop-filter: blur(2px);
}
.radar-card::before {
  content: ''; position: absolute; top: -1px; left: -1px;
  width: 24px; height: 24px;
  border-top: 1.5px solid var(--accent-soft);
  border-left: 1.5px solid var(--accent-soft);
}
.radar-card::after {
  content: ''; position: absolute; bottom: -1px; right: -1px;
  width: 24px; height: 24px;
  border-bottom: 1.5px solid var(--accent-soft);
  border-right: 1.5px solid var(--accent-soft);
}
.radar-label {
  font-family: var(--mono); font-size: 11px;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--accent-soft); margin-bottom: 16px;
}
.radar-title {
  font-family: var(--display); font-size: 22px;
  font-style: italic; font-weight: 400;
  margin-bottom: 8px; color: var(--paper);
}
.radar-score { font-family: var(--mono); font-size: 14px; color: rgba(255,255,255,0.6); margin-bottom: 24px; }
.radar-score strong { color: var(--risk-high); font-weight: 500; }

/* Sections */
section { padding: 100px 0; }
.section-eyebrow {
  font-family: var(--mono); font-size: 12px;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 20px;
}
.section-title {
  font-family: var(--display); font-weight: 400;
  font-size: clamp(32px, 4vw, 46px);
  line-height: 1.1; letter-spacing: -0.012em;
  margin-bottom: 24px; max-width: 760px;
}
.section-title em { font-style: italic; font-weight: 300; color: var(--ink-hover); }
.section-lede {
  font-size: 19px; color: var(--ink-hover);
  max-width: 660px; margin-bottom: 60px;
}

/* How it works */
.how { background: var(--paper-soft); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.how-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; }
.how-step { position: relative; padding-top: 32px; border-top: 1px solid var(--line-strong); }
.how-step-num { font-family: var(--mono); font-size: 12px; color: var(--accent); letter-spacing: 0.1em; margin-bottom: 16px; }
.how-step-title { font-family: var(--display); font-size: 21px; font-weight: 400; line-height: 1.2; margin-bottom: 12px; }
.how-step-body { font-size: 15px; color: var(--ink-hover); line-height: 1.55; }

/* Quadrants */
.quadrants-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid var(--line-strong); }
.quad {
  padding: 48px;
  border-right: 1px solid var(--line-strong);
  border-bottom: 1px solid var(--line-strong);
  transition: background 0.3s ease;
}
.quad:nth-child(2n) { border-right: none; }
.quad:nth-child(n+3) { border-bottom: none; }
.quad:hover { background: var(--paper-soft); }
.quad-label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); margin-bottom: 16px; }
.quad-title { font-family: var(--display); font-style: italic; font-weight: 400; font-size: 26px; margin-bottom: 16px; line-height: 1.2; }
.quad-body { color: var(--ink-hover); font-size: 15px; line-height: 1.6; }

/* Output preview */
.output { background: var(--ink); color: var(--paper); padding: 100px 0; }
.output-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.output .section-eyebrow { color: var(--accent-soft); }
.output .section-title { color: var(--paper); max-width: 460px; }
.output .section-title em { color: rgba(255,255,255,0.7); }
.output-features { list-style: none; margin-top: 40px; }
.output-features li {
  padding: 18px 0; border-bottom: 1px solid rgba(255,255,255,0.12);
  display: flex; gap: 16px;
  color: rgba(255,255,255,0.85); font-size: 16px;
}
.output-features li::before { content: '→'; color: var(--accent-soft); font-family: var(--mono); }

.report-mock {
  background: var(--paper); color: var(--ink);
  padding: 36px; border: 1px solid var(--accent-soft);
  position: relative;
  box-shadow: 0 30px 60px -20px rgba(0,0,0,0.5);
}
.report-mock-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--line); padding-bottom: 16px; margin-bottom: 24px; }
.report-mock-brand { font-family: var(--display); font-weight: 500; font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase; }
.report-mock-date { font-family: var(--mono); font-size: 11px; color: var(--ink-hover); }
.report-mock-title { font-family: var(--display); font-style: italic; font-weight: 400; font-size: 24px; line-height: 1.15; margin-bottom: 8px; }
.report-mock-subtitle { font-family: var(--mono); font-size: 11px; color: var(--ink-hover); letter-spacing: 0.06em; margin-bottom: 24px; }

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
.bio-title { font-family: var(--body); font-size: 16px; color: var(--ink-hover); margin-bottom: 24px; }
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
  .hero { padding: 60px 0 80px; }
  .hero .container { grid-template-columns: 1fr; gap: 60px; }
  .how-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
  .quadrants-grid { grid-template-columns: 1fr; }
  .quad { border-right: none; }
  .quad:last-child { border-bottom: none; }
  .output-grid { grid-template-columns: 1fr; gap: 48px; }
  .bio-grid { grid-template-columns: 1fr; gap: 32px; }
  .bio-photo { width: 120px; height: 120px; }
  .footer-grid { grid-template-columns: 1fr; gap: 32px; }
  section { padding: 70px 0; }
  .container { padding: 0 20px; }
  .brand-logo-whiteford { height: 22px; }
  .brand-logo-schellip { height: 17px; }
  .brand-divider { height: 22px; }
}
.launch-note { color: rgba(255,255,255,0.78); font-size: 16px; line-height: 1.6; max-width: 620px; margin: 36px 0 22px; }
.cta-banner .launch-note { margin-left: auto; margin-right: auto; margin-bottom: 28px; }
html, body { max-width: 100%; overflow-x: hidden; }
img, svg { max-width: 100%; }
.hero-eyebrow, .hero h1, .hero-sub, .hero-cta-row, .hero-visual { opacity: 1; animation: none; transform: none; }
.output .section-eyebrow, .cta-banner .section-eyebrow { color: #c9b8ff; }
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
      <div class="hero-eyebrow">AI Legal Risk Triage</div>
      <h1>Find the AI legal exposure <em>buyers will surface first.</em></h1>
      <p class="hero-sub">A five-minute triage maps your AI risk across four areas investors and acquirers consistently probe: data rights, output ownership, customer and vendor contracts, and internal governance. Receive a personalized risk profile, prioritized actions, and a printable personalized brief.</p>
      <div class="hero-cta-row">
        <a href="#start" class="btn-primary">
          Start the 5-minute triage
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg>
        </a>
        <span class="hero-meta">12 questions · No login · Inline result</span>
      </div>
    </div>
    <div class="hero-visual">
      <div class="radar-card">
        <div class="radar-label">Sample output · preview</div>
        <div class="radar-title">Your AI Risk Profile</div>
        <div class="radar-score">Risk score: <strong>67 / 94 — Material exposure</strong></div>
        <svg viewBox="0 0 320 280" width="100%">
          <g stroke="rgba(255,255,255,0.18)" fill="none" stroke-width="0.7">
            <polygon points="160,40 280,140 160,240 40,140"/>
            <polygon points="160,72 248,140 160,208 72,140"/>
            <polygon points="160,104 216,140 160,176 104,140"/>
            <polygon points="160,136 184,140 160,144 136,140"/>
          </g>
          <text x="160" y="28" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-family="IBM Plex Mono" font-size="10" letter-spacing="1">DATA RIGHTS</text>
          <text x="296" y="144" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-family="IBM Plex Mono" font-size="10" letter-spacing="1">CONTRACTS</text>
          <text x="160" y="258" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-family="IBM Plex Mono" font-size="10" letter-spacing="1">GOVERNANCE</text>
          <text x="24" y="144" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-family="IBM Plex Mono" font-size="10" letter-spacing="1">OWNERSHIP</text>
          <polygon points="160,68 248,138 160,200 92,140" fill="rgba(177,75,61,0.28)" stroke="#B14B3D" stroke-width="1.5"/>
          <circle cx="160" cy="68" r="4" fill="#B14B3D"/>
          <circle cx="248" cy="138" r="4" fill="#C99334"/>
          <circle cx="160" cy="200" r="4" fill="#C99334"/>
          <circle cx="92" cy="140" r="4" fill="#B14B3D"/>
        </svg>
        <div style="margin-top: 24px; font-family: var(--mono); font-size: 11px; color: rgba(255,255,255,0.5); letter-spacing: 0.08em;">
          ── HIGHEST RISK: DATA RIGHTS, OWNERSHIP
        </div>
      </div>
    </div>
  </div>
</section>

<section class="how">
  <div class="container">
    <div class="section-eyebrow">— How the triage works</div>
    <h2 class="section-title">Twelve questions. Four critical areas. <em>One personalized brief.</em></h2>
    <div class="how-grid">
      <div class="how-step">
        <div class="how-step-num">STEP 01</div>
        <h3 class="how-step-title">Answer 12 questions</h3>
        <p class="how-step-body">Multiple-choice questions covering how your team uses, builds, and contracts around AI. Each answer is weighted by the level of legal exposure it represents.</p>
      </div>
      <div class="how-step">
        <div class="how-step-num">STEP 02</div>
        <h3 class="how-step-title">Add contact details</h3>
        <p class="how-step-body">After the categorical questions, add your contact details and permission acknowledgment so the report summary can be routed correctly.</p>
      </div>
      <div class="how-step">
        <div class="how-step-num">STEP 03</div>
        <h3 class="how-step-title">See your radar</h3>
        <p class="how-step-body">Receive a four-axis risk profile with color-coded zones and your three most urgent issues identified by area.</p>
      </div>
      <div class="how-step">
        <div class="how-step-num">STEP 04</div>
        <h3 class="how-step-title">Receive the summary</h3>
        <p class="how-step-body">Your score, tier, and three prioritized posture actions render inline and are queued for email follow-up through HighLevel.</p>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-eyebrow">— The four risk areas</div>
    <h2 class="section-title">The areas where AI legal problems start <em>before they show up in diligence.</em></h2>
    <p class="section-lede">Most AI legal exposure isn't created at launch. It accumulates across four areas where business pace outruns documentation. This triage maps each one.</p>
    <div class="quadrants-grid">
      <div class="quad">
        <div class="quad-label">A · Data Rights</div>
        <h3 class="quad-title">What data does the model use, and on what basis?</h3>
        <p class="quad-body">Training inputs, customer data flows, retention, deletion, and documented rights to use the data the way the system uses it.</p>
      </div>
      <div class="quad">
        <div class="quad-label">B · Output Ownership</div>
        <h3 class="quad-title">Who owns what the system produces?</h3>
        <p class="quad-body">Employee and contractor IP assignment for AI-assisted work, invention disclosure rhythm, and whether outputs are protectable at all.</p>
      </div>
      <div class="quad">
        <div class="quad-label">C · Contracts</div>
        <h3 class="quad-title">Do your terms match your actual use?</h3>
        <p class="quad-body">Customer-facing AI claims, vendor terms on training and retention, and indemnity provisions in inbound and outbound contracts.</p>
      </div>
      <div class="quad">
        <div class="quad-label">D · Governance</div>
        <h3 class="quad-title">Who approves, who reports, who owns it?</h3>
        <p class="quad-body">Written AI use policy, approval authority for new tools and use cases, and the cadence of leadership and board-level reporting.</p>
      </div>
    </div>
  </div>
</section>

<section class="output" id="start">
  <div class="container">
    <div class="output-grid">
      <div>
        <div class="section-eyebrow">— What you receive</div>
        <h2 class="section-title">A profile your <em>leadership team can act on.</em></h2>
        <p style="color: rgba(255,255,255,0.78); font-size: 18px; line-height: 1.6; max-width: 460px;">The brief is engineered to drop into an executive conversation or a board memo. Plain language. Practical. Whiteford-branded.</p>
        <ul class="output-features">
          <li>Risk score across four areas, color-coded by exposure level</li>
          <li>Three highest-priority actions ranked by likelihood of surfacing in diligence</li>
          <li>Report summary delivered through the approved HighLevel workflow</li>
          <li>Optional follow-up consultation scheduled in two clicks</li>
        </ul>
        <div data-learn-report-slot="ai-risk-triage"></div>
      </div>
      <div class="report-mock">
        <div class="report-mock-header">
          <span class="report-mock-brand">WHITEFORD · SCHELL IP</span>
          <span class="report-mock-date">SAMPLE RESULT</span>
        </div>
        <div class="report-mock-title">AI Legal Risk Profile</div>
        <div class="report-mock-subtitle">Prepared for [your company] · inline result + email summary</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px;">
          <div style="border-left: 3px solid var(--risk-high); padding: 12px 16px; background: rgba(177,75,61,0.06);">
            <div style="font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; color: var(--risk-high);">DATA RIGHTS</div>
            <div style="font-family: var(--display); font-size: 28px; font-style: italic; margin-top: 4px;">18 / 24</div>
          </div>
          <div style="border-left: 3px solid var(--risk-mid); padding: 12px 16px; background: rgba(201,147,52,0.06);">
            <div style="font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; color: #8f641f;">CONTRACTS</div>
            <div style="font-family: var(--display); font-size: 28px; font-style: italic; margin-top: 4px;">14 / 24</div>
          </div>
          <div style="border-left: 3px solid var(--risk-high); padding: 12px 16px; background: rgba(177,75,61,0.06);">
            <div style="font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; color: var(--risk-high);">OWNERSHIP</div>
            <div style="font-family: var(--display); font-size: 28px; font-style: italic; margin-top: 4px;">19 / 24</div>
          </div>
          <div style="border-left: 3px solid var(--risk-mid); padding: 12px 16px; background: rgba(201,147,52,0.06);">
            <div style="font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; color: #8f641f;">GOVERNANCE</div>
            <div style="font-family: var(--display); font-size: 28px; font-style: italic; margin-top: 4px;">16 / 22</div>
          </div>
        </div>
        <div style="font-family: var(--mono); font-size: 11px; color: var(--ink-hover); letter-spacing: 0.06em; margin-bottom: 8px;">PRIORITIZED ACTIONS</div>
        <div style="font-family: var(--display); font-size: 15px; font-style: italic; font-weight: 300; line-height: 1.5; padding-left: 16px; border-left: 1px solid var(--accent); color: var(--ink-hover);">
          1. Document training-data lineage before next investor update.<br />
          2. Update contractor IP assignments to address AI-assisted work.<br />
          3. Designate AI approval owner and document four current tools.
        </div>
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
        <div class="bio-title">Managing Partner, Mountain West · Whiteford Taylor &amp; Preston · Patent Attorney · AI Advisor</div>
        <p class="bio-body">Jeff Schell is Managing Partner of Whiteford's Mountain West practice and an AI legal advisor to technology companies. A patent attorney, venture capitalist, and former two-time founder, he works at the intersection of intellectual property, AI risk, and venture growth. Since 2012, his work has supported the creation of over $100 million in transaction and enterprise value across Colorado's technology ecosystem.</p>
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
