import type { Metadata } from "next";
import Image from "next/image";
import { LeadMagnetFlow } from "@/components/lead-magnet-flow";
import { complianceText, magnetConfigs } from "@/lib/magnets/finalization";

export const metadata: Metadata = {
  title: "Outside Counsel Playbook for Tech Companies",
  description:
    "A 5-page playbook on how technology companies maximize patent value, position for investment, and preserve corporate value with a fixed-fee outside counsel structure.",
  openGraph: {
    title: "Outside Counsel Playbook for Tech Companies",
    description:
      "A 5-page playbook on how technology companies maximize patent value, position for investment, and preserve corporate value.",
    url: "/outside-counsel-playbook",
    images: ["/logos/playbook-cover.png"],
  },
};

const pageStyles = `
.outside-counsel-page {
  --ink: #003756;
  --ink-hover: #154E73;
  --ink-deep: #002B45;
  --accent: #632DDD;
  --accent-soft: #C9B8FF;
  --paper: #FFFFFF;
  --paper-soft: #F7F8FA;
  --line: rgba(0,55,86,0.12);
  --line-strong: rgba(0,55,86,0.22);
  color: var(--ink);
  background: var(--paper);
  font-family: var(--font-body), "DM Sans", system-ui, sans-serif;
  font-size: 17px;
  line-height: 1.55;
}
.outside-counsel-page * { box-sizing: border-box; }
.outside-counsel-page a { color: inherit; }
.outside-counsel-page .container { max-width: 1240px; margin: 0 auto; padding: 0 32px; }
.outside-counsel-page .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.outside-counsel-page .brand-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255,255,255,0.94);
  border-bottom: 1px solid var(--line);
  padding: 14px 0;
  backdrop-filter: blur(10px);
}
.outside-counsel-page .brand-bar .container { display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.outside-counsel-page .brand-lockup { display: flex; align-items: center; gap: 20px; min-width: 0; }
.outside-counsel-page .brand-lockup img { display: block; width: auto; object-fit: contain; }
.outside-counsel-page .brand-logo-whiteford { height: 28px; }
.outside-counsel-page .brand-logo-schellip { height: 13px; }
.outside-counsel-page .brand-divider { width: 1px; height: 28px; background: var(--line-strong); flex: 0 0 auto; }
.outside-counsel-page .brand-bar-meta {
  font-family: var(--font-mono), "IBM Plex Mono", ui-monospace, monospace;
  font-size: 11px;
  color: var(--ink-hover);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
}
.outside-counsel-page .hero {
  background: var(--ink);
  color: var(--paper);
  padding: 88px 0 110px;
  position: relative;
  overflow: hidden;
}
.outside-counsel-page .hero .container {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(280px, 1fr);
  gap: 80px;
  align-items: center;
}
.outside-counsel-page .hero-eyebrow {
  font-family: var(--font-mono), "IBM Plex Mono", ui-monospace, monospace;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent-soft);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.outside-counsel-page .hero-eyebrow::before { content: ""; width: 32px; height: 1px; background: var(--accent-soft); }
.outside-counsel-page h1 {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-weight: 400;
  font-size: 60px;
  line-height: 1.05;
  letter-spacing: 0;
  margin: 0 0 28px;
  max-width: 760px;
}
.outside-counsel-page h1 em { font-style: italic; font-weight: 300; color: rgba(255,255,255,0.78); }
.outside-counsel-page .hero-sub {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 19px;
  line-height: 1.55;
  color: rgba(255,255,255,0.75);
  margin: 0 0 36px;
  max-width: 560px;
}
.outside-counsel-page .hero-form {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  max-width: 520px;
  margin-bottom: 16px;
}
.outside-counsel-page .hero-form input {
  flex: 1 1 230px;
  min-width: 0;
  padding: 18px 20px;
  font-family: var(--font-body), "DM Sans", system-ui, sans-serif;
  font-size: 16px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.18);
  border-right: none;
  color: var(--paper);
  outline: none;
  transition: all 0.2s;
}
.outside-counsel-page .hero-form input::placeholder { color: rgba(255,255,255,0.45); }
.outside-counsel-page .hero-form input:focus { background: rgba(255,255,255,0.10); border-color: var(--accent-soft); }
.outside-counsel-page .hero-form button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: var(--accent);
  color: var(--paper);
  padding: 18px 28px;
  font-family: var(--font-display), "Jost", system-ui, sans-serif;
  font-weight: 500;
  font-size: 16px;
  border: 1px solid var(--accent);
  cursor: pointer;
  letter-spacing: 0.01em;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.outside-counsel-page .hero-form button:hover,
.outside-counsel-page .hero-form button:focus-visible { background: var(--accent-soft); border-color: var(--accent-soft); }
.outside-counsel-page .hero-form button:disabled { cursor: wait; opacity: 0.78; }
.outside-counsel-page .hero-form button svg { transition: transform 0.2s; }
.outside-counsel-page .hero-form button:hover svg { transform: translateX(4px); }
.outside-counsel-page .hero-form-error {
  flex-basis: 100%;
  margin: 10px 0 0;
  color: #FFD6D1;
  font-size: 14px;
}
.outside-counsel-page .hero-success {
  max-width: 520px;
  margin-bottom: 16px;
  border: 1px solid rgba(157,116,255,0.52);
  background: rgba(255,255,255,0.08);
  color: var(--paper);
  padding: 18px 20px;
  font-family: var(--font-display), "Jost", system-ui, sans-serif;
  font-size: 18px;
}
.outside-counsel-page .hero-meta {
  font-family: var(--font-mono), "IBM Plex Mono", ui-monospace, monospace;
  font-size: 13px;
  color: rgba(255,255,255,0.6);
  letter-spacing: 0.04em;
}
.outside-counsel-page .hero-visual { position: relative; display: flex; justify-content: center; }
.outside-counsel-page .pdf-thumb {
  position: relative;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 40px 80px -20px rgba(0,0,0,0.6), 0 20px 40px -10px rgba(99,45,221,0.25);
  transform: perspective(1000px) rotateY(-6deg) rotateX(2deg);
  transition: transform 0.4s ease;
}
.outside-counsel-page .pdf-thumb:hover { transform: perspective(1000px) rotateY(-3deg) rotateX(1deg); }
.outside-counsel-page .pdf-thumb img { display: block; width: 100%; height: auto; }
.outside-counsel-page .pdf-thumb::after {
  content: "";
  position: absolute;
  top: -1px;
  right: -1px;
  width: 20px;
  height: 20px;
  border-top: 2px solid var(--accent-soft);
  border-right: 2px solid var(--accent-soft);
}
.outside-counsel-page .pdf-thumb-label {
  position: absolute;
  top: 16px;
  left: -28px;
  font-family: var(--font-mono), "IBM Plex Mono", ui-monospace, monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-soft);
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}
.outside-counsel-page section { padding: 100px 0; }
.outside-counsel-page .section-eyebrow {
  font-family: var(--font-mono), "IBM Plex Mono", ui-monospace, monospace;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 20px;
}
.outside-counsel-page .section-title {
  font-family: var(--font-display), "Jost", system-ui, sans-serif;
  font-weight: 400;
  font-size: 46px;
  line-height: 1.1;
  letter-spacing: 0;
  margin: 0 0 24px;
  max-width: 760px;
}
.outside-counsel-page .section-title em { font-style: italic; font-weight: 300; color: var(--ink-hover); }
.outside-counsel-page .section-lede { font-size: 19px; color: var(--ink-hover); max-width: 660px; margin: 0 0 60px; }
.outside-counsel-page .inside { background: var(--paper-soft); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.outside-counsel-page .inside-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid var(--line-strong);
  background: var(--paper);
}
.outside-counsel-page .inside-card { padding: 48px 40px; border-right: 1px solid var(--line-strong); transition: background 0.3s ease; }
.outside-counsel-page .inside-card:last-child { border-right: none; }
.outside-counsel-page .inside-card:hover { background: var(--paper-soft); }
.outside-counsel-page .inside-num {
  font-family: var(--font-display), "Jost", system-ui, sans-serif;
  font-style: italic;
  font-weight: 400;
  font-size: 32px;
  color: var(--accent);
  margin-bottom: 16px;
}
.outside-counsel-page .inside-title {
  font-family: var(--font-display), "Jost", system-ui, sans-serif;
  font-size: 22px;
  font-weight: 400;
  font-style: italic;
  line-height: 1.2;
  margin: 0 0 16px;
}
.outside-counsel-page .inside-body { color: var(--ink-hover); font-size: 15px; line-height: 1.6; margin: 0 0 20px; }
.outside-counsel-page .inside-meta {
  font-family: var(--font-mono), "IBM Plex Mono", ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
}
.outside-counsel-page .audience { background: var(--paper); }
.outside-counsel-page .audience-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
.outside-counsel-page .audience-intro { font-size: 17px; color: var(--ink-hover); line-height: 1.6; margin: 0 0 24px; }
.outside-counsel-page .audience-list { list-style: none; margin: 24px 0 0; padding: 0; }
.outside-counsel-page .audience-list li {
  padding: 24px 0;
  border-top: 1px solid var(--line);
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 32px;
  align-items: start;
}
.outside-counsel-page .audience-list li:last-child { border-bottom: 1px solid var(--line); }
.outside-counsel-page .audience-role {
  font-family: var(--font-mono), "IBM Plex Mono", ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}
.outside-counsel-page .audience-body { color: var(--ink-hover); font-size: 15px; line-height: 1.6; }
.outside-counsel-page .audience-body strong { color: var(--ink); font-weight: 500; }
.outside-counsel-page .fee-preview {
  background: var(--ink);
  color: var(--paper);
  position: relative;
  overflow: hidden;
}
.outside-counsel-page .fee-preview .section-eyebrow { color: var(--accent-soft); }
.outside-counsel-page .fee-preview .section-title { color: var(--paper); }
.outside-counsel-page .fee-preview .section-title em { color: rgba(255,255,255,0.7); }
.outside-counsel-page .fee-preview .section-lede { color: rgba(255,255,255,0.7); }
.outside-counsel-page .tier-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  margin-top: 40px;
  background: rgba(157,116,255,0.22);
  border: 1px solid rgba(157,116,255,0.22);
}
.outside-counsel-page .tier { background: var(--ink); padding: 32px 28px; }
.outside-counsel-page .tier-label {
  font-family: var(--font-mono), "IBM Plex Mono", ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--accent-soft);
  margin-bottom: 12px;
}
.outside-counsel-page .tier-name {
  font-family: var(--font-display), "Jost", system-ui, sans-serif;
  font-style: italic;
  font-weight: 400;
  font-size: 24px;
  margin: 0 0 12px;
  color: var(--paper);
}
.outside-counsel-page .tier-body { font-size: 13px; line-height: 1.55; color: rgba(255,255,255,0.7); margin: 0; }
.outside-counsel-page .bio { background: var(--paper); padding: 100px 0; border-top: 1px solid var(--line); }
.outside-counsel-page .bio-grid { display: grid; grid-template-columns: 180px 1fr; gap: 60px; align-items: start; }
.outside-counsel-page .bio-photo {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  box-shadow: 0 12px 32px -12px rgba(0,55,86,0.32);
  flex-shrink: 0;
}
.outside-counsel-page .bio-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
.outside-counsel-page .bio-photo::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.4), inset 0 0 0 2px rgba(0,55,86,0.18);
  pointer-events: none;
}
.outside-counsel-page .bio-name {
  font-family: var(--font-display), "Jost", system-ui, sans-serif;
  font-size: 36px;
  font-weight: 400;
  margin: 0 0 8px;
}
.outside-counsel-page .bio-title { font-size: 16px; color: var(--ink-hover); margin: 0 0 24px; }
.outside-counsel-page .bio-body { font-size: 17px; line-height: 1.6; color: var(--ink-hover); margin: 0 0 24px; max-width: 680px; }
.outside-counsel-page .bio-cta { margin: 8px 0; }
.outside-counsel-page .btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  background: var(--accent);
  color: var(--paper);
  padding: 18px 32px;
  font-family: var(--font-display), "Jost", system-ui, sans-serif;
  font-weight: 500;
  font-size: 16px;
  border: none;
  cursor: pointer;
  letter-spacing: 0.01em;
  transition: all 0.2s ease;
  text-decoration: none;
}
.outside-counsel-page .btn-primary:hover,
.outside-counsel-page .btn-primary:focus-visible { background: var(--accent-soft); transform: translateY(-1px); }
.outside-counsel-page .btn-primary svg { transition: transform 0.2s; }
.outside-counsel-page .btn-primary:hover svg { transform: translateX(4px); }
.outside-counsel-page footer { background: var(--ink-deep); color: rgba(255,255,255,0.6); padding: 60px 0 40px; font-size: 13px; line-height: 1.6; }
.outside-counsel-page .footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 60px;
  border-bottom: 1px solid rgba(255,255,255,0.12);
  padding-bottom: 32px;
  margin-bottom: 24px;
}
.outside-counsel-page .footer-disclaimer {
  font-family: var(--font-display), "Jost", system-ui, sans-serif;
  font-style: italic;
  font-weight: 300;
  font-size: 14px;
  margin: 0;
}
.outside-counsel-page .footer-meta {
  font-family: var(--font-mono), "IBM Plex Mono", ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  margin: 0;
}
.outside-counsel-page .footer-lockup { display: flex; align-items: center; gap: 20px; margin-bottom: 16px; }
.outside-counsel-page .footer-lockup img { height: 28px; width: auto; display: block; object-fit: contain; }
.outside-counsel-page .footer-lockup .footer-logo-schellip { height: 11px; }
.outside-counsel-page .footer-divider { width: 1px; height: 22px; background: rgba(255,255,255,0.2); }
@media (max-width: 900px) {
  .outside-counsel-page .hero { padding: 60px 0 80px; }
  .outside-counsel-page .hero .container { grid-template-columns: 1fr; gap: 60px; }
  .outside-counsel-page h1 { font-size: 42px; }
  .outside-counsel-page .section-title { font-size: 34px; }
  .outside-counsel-page .hero-form { flex-direction: column; }
  .outside-counsel-page .hero-form input { border-right: 1px solid rgba(255,255,255,0.18); }
  .outside-counsel-page .hero-form button { justify-content: center; }
  .outside-counsel-page .pdf-thumb { transform: none; max-width: 280px; }
  .outside-counsel-page .pdf-thumb-label { display: none; }
  .outside-counsel-page .inside-grid { grid-template-columns: 1fr; }
  .outside-counsel-page .inside-card { border-right: none; border-bottom: 1px solid var(--line-strong); }
  .outside-counsel-page .inside-card:last-child { border-bottom: none; }
  .outside-counsel-page .audience-grid { grid-template-columns: 1fr; gap: 32px; }
  .outside-counsel-page .audience-list li { grid-template-columns: 1fr; gap: 8px; }
  .outside-counsel-page .tier-row { grid-template-columns: 1fr; }
  .outside-counsel-page .bio-grid { grid-template-columns: 1fr; gap: 32px; }
  .outside-counsel-page .bio-photo { width: 120px; height: 120px; }
  .outside-counsel-page .footer-grid { grid-template-columns: 1fr; gap: 32px; }
  .outside-counsel-page section { padding: 70px 0; }
  .outside-counsel-page .container { padding: 0 20px; }
  .outside-counsel-page .brand-logo-whiteford { height: 22px; }
  .outside-counsel-page .brand-logo-schellip { height: 10px; }
  .outside-counsel-page .brand-divider { height: 22px; }
  .outside-counsel-page .brand-bar .container { align-items: flex-start; flex-direction: column; gap: 8px; }
  .outside-counsel-page .brand-bar-meta { font-size: 10px; }
}
`;

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M3 9h12M10 4l5 5-5 5"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function OutsideCounselPlaybookPage() {
  return (
    <main className="outside-counsel-page">
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      <div className="brand-bar">
        <div className="container">
          <div className="brand-lockup">
            <img
              className="brand-logo-whiteford"
              src="/logos/whiteford-navy-on-light.png"
              alt="Whiteford Taylor Preston"
              width={886}
              height={205}
            />
            <span className="brand-divider" aria-hidden="true" />
            <img
              className="brand-logo-schellip"
              src="/logos/schellip-color.png"
              alt="Schell IP"
              width={982}
              height={149}
            />
          </div>
          <span className="brand-bar-meta">Attorney advertising · learn.schellip.com</span>
        </div>
      </div>

      <section className="hero">
        <div className="container">
          <div>
            <div className="hero-eyebrow">Outside Counsel Playbook</div>
            <h1>
              The patent-forward outside counsel playbook <em>for tech companies.</em>
            </h1>
            <p className="hero-sub">
              Get the 5-page framework for patent value, investment readiness, clean governance,
              and the fixed-fee monthly structure built for technology-company outside counsel work.
            </p>
            <LeadMagnetFlow config={magnetConfigs["outside-counsel-playbook"]} />
            <span className="hero-meta">
              5-page PDF · arrives in your inbox · public link delivered by email
            </span>
          </div>
          <div className="hero-visual">
            <div className="pdf-thumb">
              <span className="pdf-thumb-label">5-page PDF</span>
              <Image
                src="/logos/playbook-cover.png"
                alt="Outside Counsel Playbook PDF cover"
                width={600}
                height={776}
                priority
                sizes="(max-width: 900px) 280px, 360px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="inside">
        <div className="container">
          <div className="section-eyebrow">What&apos;s inside the playbook</div>
          <h2 className="section-title">
            Three pillars of continuous <em>outside counsel work.</em>
          </h2>
          <p className="section-lede">
            The playbook is organized around the three jobs that determine whether a technology
            company grows, gets funded, and exits well, written for founders, general counsels, and
            investors who want a structured framework rather than ad hoc legal help.
          </p>
          <div className="inside-grid">
            <div className="inside-card">
              <div className="inside-num">01</div>
              <h3 className="inside-title">Maximize patent value</h3>
              <p className="inside-body">
                Continuous portfolio strategy. Quarterly reviews. Filings tied to company
                milestones, not the lawyer&apos;s clock. The portfolio status one-pager that goes
                to the board.
              </p>
              <span className="inside-meta">Part one · 3 pages</span>
            </div>
            <div className="inside-card">
              <div className="inside-num">02</div>
              <h3 className="inside-title">Position for investment &amp; acquisition</h3>
              <p className="inside-body">
                Monthly market and competitor surveillance. Product-IP alignment as features evolve.
                The four things acquirers actually check during diligence and how to keep them in
                good order.
              </p>
              <span className="inside-meta">Part two · 3 pages</span>
            </div>
            <div className="inside-card">
              <div className="inside-num">03</div>
              <h3 className="inside-title">Preserve company value</h3>
              <p className="inside-body">
                Smart employment and contractor agreements. Clean equity grants. Board minutes and
                written consents. Investor agreement hygiene. The corporate housekeeping that
                prevents diligence drag.
              </p>
              <span className="inside-meta">Part three · 3 pages</span>
            </div>
          </div>
        </div>
      </section>

      <section className="audience">
        <div className="container">
          <div className="audience-grid">
            <div>
              <div className="section-eyebrow">Who it&apos;s for</div>
              <h2 className="section-title">
                Built for technology companies between <em>founding and exit.</em>
              </h2>
              <p className="audience-intro">
                The playbook is written for the people who actually make outside counsel decisions
                at a technology company, and for the investors who care whether those decisions are
                being made well.
              </p>
            </div>
            <ul className="audience-list">
              <li>
                <span className="audience-role">Founders &amp; CEOs</span>
                <span className="audience-body">
                  <strong>Seed through Series B.</strong> You are deciding what outside counsel
                  actually looks like for your company. This playbook gives you a framework to
                  evaluate the engagement, not the lawyer.
                </span>
              </li>
              <li>
                <span className="audience-role">General Counsels</span>
                <span className="audience-body">
                  <strong>At later-stage companies.</strong>{" "}
                  You need specialist outside support on
                  patent strategy, IP-driven M&amp;A prep, and AI governance. This playbook
                  describes how to scope that relationship for predictable budgets.
                </span>
              </li>
              <li>
                <span className="audience-role">Investors &amp; VCs</span>
                <span className="audience-body">
                  <strong>With technology portfolio companies.</strong> You want a structured
                  framework for evaluating outside counsel work at portfolio companies and for
                  flagging when something is missing.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="fee-preview">
        <div className="container">
          <div className="section-eyebrow">Engagement model</div>
          <h2 className="section-title">
            Fixed-fee monthly packages, <em>scoped to your stage.</em>
          </h2>
          <p className="section-lede">
            The final page of the playbook describes the engagement structure: monthly fixed fees,
            defined scope, predictable billing, and quarterly true-ups. Four tiers, scoped by
            company stage and the cadence of corporate activity.
          </p>
          <div className="tier-row">
            <div className="tier">
              <div className="tier-label">FOUNDATION</div>
              <h3 className="tier-name">Foundation</h3>
              <p className="tier-body">
                Pre-seed through seed. Standard corporate housekeeping, limited patent filing,
                contract review on demand.
              </p>
            </div>
            <div className="tier">
              <div className="tier-label">GROWTH</div>
              <h3 className="tier-name">Growth</h3>
              <p className="tier-body">
                Seed through Series A. Active patent strategy, monthly market surveillance, standing
                engineering check-ins.
              </p>
            </div>
            <div className="tier">
              <div className="tier-label">SCALE</div>
              <h3 className="tier-name">Scale</h3>
              <p className="tier-body">
                Series A through Series B. Dedicated counsel time, formal FTO posture, AI governance
                maintenance.
              </p>
            </div>
            <div className="tier">
              <div className="tier-label">CUSTOM</div>
              <h3 className="tier-name">Custom</h3>
              <p className="tier-body">
                For companies with non-standard cadence: multi-product, regulated, or post-Series B.
                Scoped from a starting conversation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bio" id="bio">
        <div className="container">
          <div className="bio-grid">
            <div className="bio-photo">
              <img
                src="/logos/jeff-schell.jpg"
                alt="Jeff Schell"
                width={400}
                height={400}
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="bio-name">Jeff Schell</h2>
              <div className="bio-title">
                Managing Partner, Mountain West · Whiteford Taylor &amp; Preston · Patent Attorney ·
                Outside General Counsel · AI Advisor
              </div>
              <p className="bio-body">
                Jeff Schell is Managing Partner of Whiteford&apos;s Mountain West practice and serves
                as outside general counsel to technology companies. A patent attorney, venture
                capitalist, and former two-time founder, he leads engagements at the intersection of
                patent strategy, AI risk, venture growth, and corporate operations. Since 2012, his
                work has supported the creation of over $100 million in transaction and enterprise
                value across Colorado&apos;s technology ecosystem.
              </p>
              <div className="bio-cta">
                <button
                  className="btn-primary btn-schedule"
                  data-cal-link="jeffschell/meeting-with-jeff-schell"
                  data-cal-namespace="meeting-with-jeff-schell"
                  data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                >
                  Schedule a time to speak with Jeff
                  <ArrowIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-lockup">
                <img
                  className="footer-logo-whiteford"
                  src="/logos/whiteford-white-on-navy.png"
                  alt="Whiteford Taylor Preston"
                  width={900}
                  height={270}
                  loading="lazy"
                />
                <span className="footer-divider" aria-hidden="true" />
                <img
                  className="footer-logo-schellip"
                  src="/logos/schellip-white.png"
                  alt="Schell IP"
                  width={982}
                  height={149}
                  loading="lazy"
                />
              </div>
              <p className="footer-disclaimer">
                {complianceText}
              </p>
            </div>
            <div>
              <p className="footer-meta">LEARN.SCHELLIP.COM</p>
              <p className="footer-meta" style={{ marginTop: 8 }}>
                DENVER · WASHINGTON · MOUNTAIN WEST
              </p>
            </div>
          </div>
          <p className="footer-meta">
            © 2026 Whiteford Taylor &amp; Preston LLP · All rights reserved · Attorney advertising ·
            Prior results do not guarantee a similar outcome
          </p>
        </div>
      </footer>
    </main>
  );
}
