import type { LearnPageContent } from "./types";

export const routingMatrixContent: LearnPageContent = {
  title: "The Routing Matrix",
  description: "A six-question companion to Chapter 4 of The Patent Moat routes each piece of what you have built to patent, trade secret, publish, or nothing.",
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

/* Hero */
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
}
.hero-eyebrow::before { content: ''; width: 32px; height: 1px; background: var(--accent); }
.hero h1 {
  font-family: var(--display); font-weight: 400;
  font-size: clamp(38px, 5.6vw, 64px);
  line-height: 1.04; letter-spacing: -0.018em;
  margin-bottom: 28px;
}
.hero h1 em { font-style: italic; font-weight: 300; color: var(--ink-hover); }
.hero-sub {
  font-size: 19px; line-height: 1.55;
  color: var(--ink-hover);
  margin-bottom: 36px; max-width: 540px;
}
.hero-cta-row { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
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

/* Hero visual: sample output card */
.hero-visual { position: relative; }
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
.mock-rows { display: grid; gap: 10px; margin-top: 8px; }
.mock-row {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  border: 1px solid var(--line); padding: 10px 14px;
  font-family: var(--mono); font-size: 11px;
  letter-spacing: 0.06em; color: var(--ink-hover); text-transform: uppercase;
}
.mock-row strong { font-weight: 500; }
.mock-row.is-green strong { color: #4F8C5B; }
.mock-row.is-orange strong { color: #C99334; }
.mock-row.is-red strong { color: #B14B3D; }

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

/* Areas section (dark) */
.dims { background: var(--ink); color: var(--paper); }
.dims .section-eyebrow { color: var(--accent-soft); }
.dims .section-title { color: var(--paper); }
.dims .section-title em { color: rgba(255,255,255,0.7); }
.dims .section-lede { color: rgba(255,255,255,0.7); }
.dim-grid { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 32px; }
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

/* Book context */
.book-section { background: var(--paper-soft); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.book-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
.book-note-text { font-size: 17px; color: var(--ink-hover); line-height: 1.6; margin-bottom: 24px; }
.book-quote {
  font-family: var(--display); font-size: 22px; font-style: italic; font-weight: 400;
  line-height: 1.4; color: var(--ink);
  border-left: 3px solid var(--accent); padding-left: 24px;
}

/* Tiers */
.tiers { background: var(--paper); }
.tier-bar { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 40px; border: 1px solid var(--line-strong); }
.tier { padding: 36px 28px; border-right: 1px solid var(--line); position: relative; }
.tier:last-child { border-right: none; }
.tier-range { font-family: var(--mono); font-size: 12px; letter-spacing: 0.12em; color: var(--accent); margin-bottom: 12px; }
.tier-name { font-family: var(--display); font-size: 22px; font-style: italic; font-weight: 400; margin-bottom: 8px; }
.tier-body { font-size: 14px; color: var(--ink-hover); line-height: 1.5; }
.tier-1 { background: linear-gradient(180deg, var(--paper-soft) 0%, rgba(177,75,61,0.04) 100%); }
.tier-2 { background: linear-gradient(180deg, var(--paper-soft) 0%, rgba(201,147,52,0.04) 100%); }
.tier-3 { background: linear-gradient(180deg, var(--paper-soft) 0%, rgba(79,140,91,0.04) 100%); }

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
.cta-consult { margin-top: 48px; }
.book-attribution {
  font-family: var(--display); font-style: italic; font-weight: 300;
  font-size: 15px; color: rgba(255,255,255,0.75);
  margin-top: 26px; margin-bottom: 0;
}

/* Footer */
footer { background: var(--ink-deep); color: rgba(255,255,255,0.6); padding: 60px 0 40px; font-size: 13px; line-height: 1.6; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 60px; border-bottom: 1px solid rgba(255,255,255,0.12); padding-bottom: 32px; margin-bottom: 24px; }
.footer-disclaimer { font-family: var(--display); font-style: italic; font-weight: 300; font-size: 14px; }
.footer-meta { font-family: var(--mono); font-size: 11px; letter-spacing: 0.08em; }
.footer-lockup { display: flex; align-items: center; gap: 20px; margin-bottom: 16px; }
.footer-lockup img { height: 22px; width: auto; display: block; }
.footer-lockup .footer-logo-schellip { height: 17px; }
.footer-divider { width: 1px; height: 22px; background: rgba(255,255,255,0.2); }

@media (max-width: 900px) {
  .hero { padding: 60px 0 80px; }
  .hero .container { grid-template-columns: 1fr; gap: 60px; }
  .dim-grid { grid-template-columns: 1fr 1fr; }
  .dim-cell { border-right: 1px solid rgba(157,116,255,0.15); }
  .book-grid { grid-template-columns: 1fr; gap: 32px; }
  .tier-bar { grid-template-columns: 1fr; }
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
.dims .section-eyebrow, .cta-banner .section-eyebrow { color: #c9b8ff; }
.hero .container > *, .book-grid > * { min-width: 0; }
@media (max-width: 900px) {
  .hero h1 { font-size: clamp(32px, 10vw, 38px); overflow-wrap: normal; }
  .hero-sub { font-size: 17px; }
  .btn-primary { max-width: 100%; justify-content: center; }
  .hero-meta { display: block; line-height: 1.7; }
  .hero h1, .hero-sub, .hero-cta-row, .hero-visual { max-width: min(350px, calc(100vw - 40px)); }
  .scorecard-mock { max-width: min(350px, calc(100vw - 40px)); }
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
      <div class="hero-eyebrow">The Routing Matrix</div>
      <h1>Patent, trade secret, publish, <em>or nothing.</em></h1>
      <p class="hero-sub">Two questions route every piece of what you have built: could you detect copying from the outside, and will it still matter in five years? Six categorical questions score how consciously your stack is routed.</p>
      <div class="hero-cta-row">
        <a href="#start" class="btn-primary">
          Route my stack
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg>
        </a>
        <span class="hero-meta">6 questions &middot; 3 areas &middot; 3 minutes</span>
      </div>
    </div>
    <div class="hero-visual">
      <div class="scorecard-mock">
        <span class="scorecard-mock-corner-bl"></span>
        <span class="scorecard-mock-corner-br"></span>
        <div class="score-label">— Sample output</div>
        <div class="score-display">
          <span class="score-big">6</span>
          <span class="score-out">/ 10</span>
        </div>
        <div class="score-tier">TIER: <strong>PARTIALLY ROUTED</strong></div>
        <div class="mock-rows">
          <div class="mock-row is-orange"><span>Your core piece</span><strong>&#9679; 3 / 5</strong></div>
          <div class="mock-row is-orange"><span>Trade-secret practice</span><strong>&#9679; 1 / 2</strong></div>
          <div class="mock-row is-green"><span>Routing discipline</span><strong>&#9679; 2 / 3</strong></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="dims">
  <div class="container">
    <div class="section-eyebrow">— Three areas, one decision each</div>
    <h2 class="section-title">Route the pieces <em>on purpose.</em></h2>
    <p class="section-lede">Detectable and durable routes to patent. Invisible and durable routes to trade secret. Short-lived routes to shipping without patent spend — or defensive publication. The matrix scores whether those decisions have actually been made.</p>
    <div class="dim-grid">
      <div class="dim-cell">
        <div class="dim-num">01</div>
        <h3 class="dim-title">Your core piece</h3>
        <p class="dim-body">Detectability, durability, and whether the mechanism ships inside the product where engineers could extract it.</p>
      </div>
      <div class="dim-cell">
        <div class="dim-num">02</div>
        <h3 class="dim-title">Trade-secret practice</h3>
        <p class="dim-body">A trade secret without access controls, NDAs, and marked documents is fiction, not protection.</p>
      </div>
      <div class="dim-cell">
        <div class="dim-num">03</div>
        <h3 class="dim-title">Routing discipline</h3>
        <p class="dim-body">A written one-sentence routing decision for each major piece — the raw material of your ninety-second IP answer.</p>
      </div>
    </div>
  </div>
</section>

<section class="book-section">
  <div class="container">
    <div class="book-grid">
      <div>
        <div class="section-eyebrow">— From Chapter 4 of The Patent Moat</div>
        <h2 class="section-title">Fence the valuable <em>twenty feet.</em></h2>
        <p class="book-note-text">Chapter 4 of The Patent Moat argues that most startups do not need more IP — they need routed IP. Two questions decompose the stack, and each piece gets exactly one route: patent, trade secret, publish, or consciously nothing.</p>
        <p class="book-note-text">This companion tool turns the chapter into a three-minute check. It never asks what the pieces are — only whether each one has been routed on purpose.</p>
      </div>
      <div class="book-quote">You do not fence the whole prairie. You fence the twenty feet where the value lives.</div>
    </div>
  </div>
</section>

<section class="tiers">
  <div class="container">
    <div class="section-eyebrow">— Three tiers</div>
    <h2 class="section-title">Where does your score <em>land?</em></h2>
    <p class="section-lede">Your result includes an overall tier, an area-by-area readout, and a prioritized list of next moves drawn from the weakest areas.</p>
    <div class="tier-bar">
      <div class="tier tier-1">
        <div class="tier-range">0 — 3</div>
        <h3 class="tier-name">Unrouted</h3>
        <p class="tier-body">Protection is currently accidental. Run the decomposition this week.</p>
      </div>
      <div class="tier tier-2">
        <div class="tier-range">4 — 7</div>
        <h3 class="tier-name">Partially routed</h3>
        <p class="tier-body">The core piece needs a decision. Fence the valuable twenty feet before the next launch.</p>
      </div>
      <div class="tier tier-3">
        <div class="tier-range">8 — 10</div>
        <h3 class="tier-name">Routed</h3>
        <p class="tier-body">Your stack is consciously routed. Rehearse the ninety-second answer for your next pitch.</p>
      </div>
    </div>
  </div>
</section>

<section class="cta-banner" id="start">
  <div class="container">
    <h2>Run the matrix. <em>One route per piece.</em></h2>
    <div data-learn-report-slot="routing-matrix"></div>
    <div class="cta-consult">
      <p class="launch-note">Your result is a map, not a legal conclusion. If the core piece still needs a routing decision, Schell IP can help you make it deliberately — and file before the next trigger event.</p>
      <a class="btn-primary btn-on-dark" href="https://www.schellip.com">
        Talk to Schell IP about a consultation
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg>
      </a>
      <p class="book-attribution">From &quot;The Patent Moat: How Startup Founders Turn Ideas Into Defensible, Fundable Companies&quot; by Jeff Schell</p>
    </div>
  </div>
</section>

<section class="bio">
  <div class="container">
    <div class="bio-grid">
      <div class="bio-photo"><img src="/logos/jeff-schell.jpg" alt="Jeff Schell" width="480" height="480"></div>
      <div>
        <h2 class="bio-name">Jeff Schell</h2>
        <div class="bio-title">Managing Partner, Mountain West &middot; Whiteford Taylor &amp; Preston &middot; Patent Attorney &middot; Author of The Patent Moat</div>
        <p class="bio-body">Jeff Schell is Managing Partner of Whiteford's Mountain West practice and the author of The Patent Moat. A patent attorney and venture capitalist, he advises founders and investors on patent strategy, IP diligence, and venture growth. Since 2012, his work has supported the creation of over $100 million in transaction and enterprise value across Colorado's technology ecosystem.</p>
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
        <p class="footer-meta" style="margin-top: 8px;">DENVER &middot; WASHINGTON &middot; MOUNTAIN WEST</p>
      </div>
    </div>
    <p class="footer-meta">&copy; 2026 Whiteford Taylor &amp; Preston LLP &middot; All rights reserved &middot; Attorney advertising</p>
  </div>
</footer>`,
};
