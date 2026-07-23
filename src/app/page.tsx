import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Legal Readiness Tools",
  description:
    "Interactive legal readiness tools from Schell IP and Whiteford for AI risk, patent moat, AI governance readiness, outside counsel, and the Patent Moat book companion worksheets.",
  openGraph: {
    title: "Interactive Legal Readiness Tools",
    description:
      "Interactive legal readiness tools from Schell IP and Whiteford for AI risk, patent moat, AI governance readiness, outside counsel, and the Patent Moat book companion worksheets.",
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
    meta: "PDF · 5 pages",
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
  {
    href: "/disclosure-self-audit",
    meta: "9 questions · The Patent Moat, Ch. 2",
    title: (
      <>
        The Disclosure <em>Self-Audit</em>
      </>
    ),
    description:
      "Every launch, demo, and sale starts a patent clock. Find out which clocks are running and what is still protectable.",
    visual: "disclosure",
    action: "Open the audit",
  },
  {
    href: "/chain-of-title-audit",
    meta: "10 questions · The Patent Moat, Ch. 3",
    title: (
      <>
        The Chain-of-Title <em>Audit</em>
      </>
    ),
    description:
      "Inventions start out owned by the human inventor. Check every ownership link between the people who invented and the company that needs to own.",
    visual: "chain",
    action: "Open the audit",
  },
  {
    href: "/routing-matrix",
    meta: "6 questions · The Patent Moat, Ch. 4",
    title: (
      <>
        The Routing <em>Matrix</em>
      </>
    ),
    description:
      "Patent, trade secret, publish, or nothing. Two questions route every piece of what you have built - and score how consciously it happened.",
    visual: "routing",
    action: "Open the matrix",
  },
  {
    href: "/ip-data-room-checklist",
    meta: "10 questions · The Patent Moat, Ch. 7",
    title: (
      <>
        The IP Data Room <em>Checklist</em>
      </>
    ),
    description:
      "The diligence checklist is not a secret. Score how much of the standard IP diligence exam your data room could pass today.",
    visual: "dataroom",
    action: "Open the checklist",
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

  if (type === "disclosure") {
    return (
      <svg viewBox="0 0 320 132" role="img" aria-label="Disclosure timeline preview">
        <line x1="24" y1="66" x2="296" y2="66" stroke="rgba(0,55,86,0.25)" strokeWidth="2" />
        {[64, 128, 192, 256].map((x, index) => (
          <circle
            key={x}
            cx={x}
            cy="66"
            r={index === 2 ? 10 : 6}
            fill={index === 2 ? "rgba(177,75,61,0.2)" : "rgba(99,45,221,0.18)"}
            stroke={index === 2 ? "#b14b3d" : "#4a1fb0"}
            strokeWidth="2"
          />
        ))}
        <text x="24" y="112" fill="#154E73" fontSize="10" fontFamily="var(--mono)">
          BLOG · DEMO DAY · PILOT · FILING DEADLINE
        </text>
      </svg>
    );
  }

  if (type === "chain") {
    return (
      <svg viewBox="0 0 320 132" role="img" aria-label="Chain of title preview">
        {[24, 96, 168, 240].map((x, index) => (
          <rect
            key={x}
            x={x}
            y="46"
            width="56"
            height="40"
            rx="20"
            fill="none"
            stroke={index === 2 ? "#b14b3d" : "#4a1fb0"}
            strokeWidth="2"
            strokeDasharray={index === 2 ? "5 5" : undefined}
          />
        ))}
        <text x="24" y="112" fill="#154E73" fontSize="10" fontFamily="var(--mono)">
          INVENTOR → ASSIGNMENT → RECORDS → COMPANY
        </text>
      </svg>
    );
  }

  if (type === "routing") {
    return (
      <svg viewBox="0 0 320 132" role="img" aria-label="Routing matrix preview">
        {[
          { x: 60, y: 8, label: "PATENT", strong: true },
          { x: 164, y: 8, label: "SECRET", strong: false },
          { x: 60, y: 62, label: "PUBLISH", strong: false },
          { x: 164, y: 62, label: "NOTHING", strong: false },
        ].map((cell) => (
          <g key={cell.label}>
            <rect
              x={cell.x}
              y={cell.y}
              width="98"
              height="48"
              fill={cell.strong ? "rgba(99,45,221,0.18)" : "none"}
              stroke={cell.strong ? "#4a1fb0" : "rgba(0,55,86,0.25)"}
              strokeWidth={cell.strong ? 2 : 1}
            />
            <text
              x={cell.x + 49}
              y={cell.y + 29}
              textAnchor="middle"
              fill="#154E73"
              fontSize="10"
              fontFamily="var(--mono)"
            >
              {cell.label}
            </text>
          </g>
        ))}
        <text x="60" y="126" fill="#154E73" fontSize="10" fontFamily="var(--mono)">
          ONE ROUTE PER PIECE
        </text>
      </svg>
    );
  }

  if (type === "dataroom") {
    return (
      <svg viewBox="0 0 320 132" role="img" aria-label="IP data room checklist preview">
        {[0, 1, 2, 3].map((row) => (
          <g key={row}>
            <rect
              x="24"
              y={10 + row * 28}
              width="18"
              height="18"
              fill={row < 3 ? "rgba(79,140,91,0.16)" : "rgba(177,75,61,0.14)"}
              stroke={row < 3 ? "#4f8c5b" : "#b14b3d"}
            />
            {row < 3 ? (
              <path
                d={`M28 ${19 + row * 28}l4 4 7 -8`}
                fill="none"
                stroke="#4f8c5b"
                strokeWidth="2"
              />
            ) : null}
            <rect
              x="58"
              y={14 + row * 28}
              width={row < 3 ? 220 : 150}
              height="10"
              fill="rgba(0,55,86,0.12)"
            />
          </g>
        ))}
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
            Practical legal readiness tools for <em>AI-era technology companies.</em>
          </h1>
          <p>
            Preview the marketing surface for the AI risk, patent moat, governance, and outside
            counsel lead magnets, plus the companion worksheets from The Patent Moat by Jeff
            Schell. The approved tools render inline results and route follow-up through
            HighLevel.
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
              <p>
                <a className="footer-meta" href="/legacy">
                  LEGACY CAMPAIGN HUB
                </a>
              </p>
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
