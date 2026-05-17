import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Legal Readiness Tools",
  description:
    "Four marketing-only lead magnet previews from Schell IP and Whiteford for AI risk, patent moat, AI governance readiness, and patent-forward outside counsel.",
  openGraph: {
    title: "Interactive Legal Readiness Tools",
    description:
      "Four marketing-only lead magnet previews from Schell IP and Whiteford for AI risk, patent moat, AI governance readiness, and patent-forward outside counsel.",
    url: "/",
    images: ["/logos/whiteford-white-on-navy-full.png"],
  },
};

const tools = [
  {
    href: "/ai-risk-triage",
    meta: "5-minute · 12 questions",
    title: (
      <>
        AI Legal <em>Risk Triage</em>
      </>
    ),
    description:
      "Map AI exposure across data rights, output ownership, contracts, and internal governance before those issues surface in diligence.",
    visual: "risk",
    action: "Open the triage",
  },
  {
    href: "/patent-moat-scorecard",
    meta: "15 questions · 5 dimensions",
    title: (
      <>
        Patent Moat <em>Scorecard</em>
      </>
    ),
    description:
      "Benchmark patent and IP readiness the way a sophisticated venture investor or acquirer would evaluate the moat.",
    visual: "moat",
    action: "Open the scorecard",
  },
  {
    href: "/governance-plan",
    meta: "5-minute · 9 questions",
    title: (
      <>
        AI Governance <em>Readiness Plan</em>
      </>
    ),
    description:
      "Preview a board-ready one-page AI governance plan across policy, operations, vendor intake, contracts, and reporting.",
    visual: "plan",
    action: "Open the plan",
  },
  {
    href: "/outside-counsel-playbook",
    meta: "PDF · 11 pages",
    title: (
      <>
        Outside Counsel <em>Playbook</em>
      </>
    ),
    description:
      "Download the patent-forward outside counsel framework for technology companies balancing patent value, market readiness, and clean governance.",
    visual: "playbook",
    action: "Open the playbook",
  },
] as const;

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

function PreviewVisual({ type }: { type: (typeof tools)[number]["visual"] }) {
  if (type === "playbook") {
    return (
      <div className="directory-cover-preview" role="img" aria-label="Outside Counsel Playbook cover preview">
        <img
          src="/logos/playbook-cover.png"
          alt=""
          width={600}
          height={776}
          aria-hidden="true"
        />
      </div>
    );
  }

  if (type === "plan") {
    return (
      <svg viewBox="0 0 320 132" role="img" aria-label="AI governance plan preview">
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => {
            const color = ["#dfeee4", "#f5ebd4", "#f0ded9"][(row + col) % 3];
            return (
              <rect
                key={`${row}-${col}`}
                x={12 + col * 101}
                y={10 + row * 38}
                width="86"
                height="28"
                fill={color}
                stroke="rgba(0,55,86,0.18)"
              />
            );
          }),
        )}
        <text x="18" y="124" fill="#154E73" fontSize="10" fontFamily="var(--mono)">
          2 STRUCTURE · 4 DRAFT · 3 GAP
        </text>
      </svg>
    );
  }

  const points =
    type === "risk"
      ? "160,18 278,64 196,118 78,86"
      : "160,16 270,50 236,122 86,122 48,50";
  const grid =
    type === "risk"
      ? "160,18 300,66 160,120 20,66"
      : "160,8 302,50 248,126 72,126 18,50";

  return (
    <svg viewBox="0 0 320 132" role="img" aria-label={`${type} preview`}>
      <polygon points={grid} fill="none" stroke="rgba(0,55,86,0.16)" />
      <polygon
        points={points}
        fill={type === "risk" ? "rgba(177,75,61,0.18)" : "rgba(99,45,221,0.18)"}
        stroke={type === "risk" ? "#b14b3d" : "#4a1fb0"}
        strokeWidth="2"
      />
      <circle cx="160" cy={type === "risk" ? "18" : "16"} r="4" fill="#632DDD" />
      <circle cx={type === "risk" ? "278" : "270"} cy={type === "risk" ? "64" : "50"} r="4" fill="#632DDD" />
      <circle cx={type === "risk" ? "196" : "236"} cy={type === "risk" ? "118" : "122"} r="4" fill="#632DDD" />
      <circle cx={type === "risk" ? "78" : "86"} cy={type === "risk" ? "86" : "122"} r="4" fill="#632DDD" />
      {type === "moat" ? <circle cx="48" cy="50" r="4" fill="#632DDD" /> : null}
    </svg>
  );
}

export default function Home() {
  return (
    <main className="learn-directory">
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

      <section className="directory-hero">
        <div className="container">
          <div className="directory-eyebrow">Whiteford · Schell IP learning tools</div>
          <h1>
            Four practical legal readiness tools for <em>AI-era technology companies.</em>
          </h1>
          <p>
            Preview the marketing surface for the AI risk, patent moat, governance, and outside
            counsel lead magnets. The approved tools now render inline results and route follow-up
            through HighLevel.
          </p>
        </div>
      </section>

      <section className="directory-grid-section">
        <div className="container">
          <div className="directory-grid">
            {tools.map((tool) => (
              <a className="directory-card" href={tool.href} key={tool.href}>
                <div className="directory-card-content">
                  <div className="directory-meta">{tool.meta}</div>
                  <h2>{tool.title}</h2>
                  <p>{tool.description}</p>
                  <div className="directory-card-action">
                    {tool.action} <span><ArrowIcon /></span>
                  </div>
                </div>
                <div className="directory-card-visual">
                  <PreviewVisual type={tool.visual} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="directory-footer">
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
                />
                <span className="footer-divider" aria-hidden="true" />
                <img
                  className="footer-logo-schellip"
                  src="/logos/schellip-white.png"
                  alt="Schell IP"
                  width={982}
                  height={149}
                />
              </div>
              <p className="footer-disclaimer">
                These tools are for general informational purposes only and are not legal advice. Use
                of these tools does not create an attorney-client relationship. Do not submit
                confidential, privileged, or trade-secret information. Any engagement is subject to a
                conflicts check and a written engagement letter.
              </p>
            </div>
            <div>
              <p className="footer-meta">LEARN.SCHELLIP.COM</p>
              <p className="footer-meta">DENVER · WASHINGTON · MOUNTAIN WEST</p>
            </div>
          </div>
          <p className="footer-meta">
            © 2026 Whiteford Taylor &amp; Preston LLP · All rights reserved · Attorney advertising
          </p>
        </div>
      </footer>
    </main>
  );
}
