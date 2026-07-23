import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

const complianceText =
  "This tool is for general informational purposes only and is not legal advice. Use of this tool does not create an attorney-client relationship between you, your company, and Whiteford Taylor & Preston LLP or Schell IP. Do not submit confidential, privileged, or trade-secret information through this tool. Any engagement is subject to a conflicts check and a written engagement letter. Attorney advertising. Prior results do not guarantee a similar outcome.";

export const metadata: Metadata = {
  title: "Investor Outreach Kanban",
  description:
    "Build a founder investor-outreach Kanban board using categorical Signal/NFX investor-list matching and Whiteford/Schell IP fundraising-readiness guardrails.",
  openGraph: {
    title: "Investor Outreach Kanban",
    description:
      "A practical investor-outreach board for founders preparing a Pre-Seed, Seed, Series A, or Series B fundraising process.",
    url: "/investor-outreach-kanban",
    images: ["/logos/whiteford-white-on-navy-full.png"],
  },
  robots: { index: false, follow: false },
};

function BoardPreview() {
  const columns = ["Find", "Intro paths", "Request", "Meeting", "Data room", "Diligence", "Funding"];

  return (
    <div className="investor-hero-board" aria-label="Investor outreach Kanban preview">
      {columns.map((column, index) => (
        <div className="investor-hero-column" key={column}>
          <span>{column}</span>
          <i style={{ height: `${44 + (index % 3) * 18}px` }} />
          <i style={{ height: `${28 + ((index + 1) % 3) * 16}px` }} />
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <main className="learn-directory investor-outreach-page">
      <div className="brand-bar">
        <div className="container">
          <Link className="brand-lockup" href="/">
            <Image
              className="brand-logo-whiteford"
              src="/logos/whiteford-navy-on-light.png"
              alt="Whiteford Taylor Preston"
              width={886}
              height={205}
            />
            <span className="brand-divider" aria-hidden="true" />
            <Image
              className="brand-logo-schellip"
              src="/logos/schellip-color.png"
              alt="Schell IP"
              width={982}
              height={149}
            />
          </Link>
          <div className="brand-bar-meta">learn.schellip.com</div>
        </div>
      </div>

      <section className="investor-hero">
        <div className="container investor-hero-grid">
          <div>
            <div className="directory-eyebrow">Founder fundraising workflow</div>
            <h1>
              Build the investor outreach board your next <em>financing round needs.</em>
            </h1>
            <p>
              Answer a short set of categorical questions, choose Signal/NFX investor-list categories, and generate a practical Kanban board for investor discovery, warm introductions, follow-up, data-room readiness, diligence, funding, and archive hygiene.
            </p>
            <div className="investor-hero-actions">
              <Link href="/investor-outreach-kanban/start">Build my investor outreach board</Link>
              <span>5 minutes · categorical only · no confidential information</span>
            </div>
          </div>
          <BoardPreview />
        </div>
      </section>

      <section className="investor-how-section">
        <div className="container">
          <div className="investor-section-heading">
            <div className="directory-eyebrow">How the board works</div>
            <h2>
              From investor category fit to <em>diligence-ready follow-up.</em>
            </h2>
          </div>
          <div className="investor-how-grid">
            {[
              ["01", "Choose stage and category", "Map your round to Signal/NFX vertical and regional investor-list pages."],
              ["02", "Map introduction sources", "Identify which warm paths can credibly carry a non-confidential forwardable blurb."],
              ["03", "Work the board", "Move investors through request, meeting, follow-up, diligence, funding, and archive stages."],
              ["04", "Tighten readiness", "Use the data-room and diligence columns to spot IP, ownership, contract, and AI/data gaps before investors ask."],
            ].map(([step, title, copy]) => (
              <article className="investor-how-card" key={step}>
                <span>{step}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="investor-author-section">
        <div className="container investor-author-grid">
          <Image src="/logos/jeff-schell.jpg" alt="Jeff Schell" width={240} height={240} />
          <div>
            <div className="directory-eyebrow">Whiteford · Schell IP</div>
            <h2>Designed for fundraising conversations before diligence starts.</h2>
            <p>
              Jeff Schell is Managing Partner of Whiteford’s Mountain West practice and a patent attorney advising founders and investors on patent strategy, IP diligence, AI/data risk, and venture growth. This tool is a practical fundraising workflow aid, not a substitute for legal advice.
            </p>
          </div>
        </div>
      </section>

      <footer className="directory-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-lockup">
                <Image
                  className="footer-logo-whiteford"
                  src="/logos/whiteford-white-on-navy.png"
                  alt="Whiteford Taylor Preston"
                  width={886}
                  height={205}
                />
                <span className="footer-divider" aria-hidden="true" />
                <Image
                  className="footer-logo-schellip"
                  src="/logos/schellip-white.png"
                  alt="Schell IP"
                  width={982}
                  height={149}
                />
              </div>
              <p>{complianceText}</p>
            </div>
            <div className="footer-meta">
              <p>LEARN.SCHELLIP.COM</p>
              <p>DENVER · WASHINGTON · MOUNTAIN WEST</p>
              <p>© 2026 Whiteford Taylor & Preston LLP · All rights reserved · Attorney advertising</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
