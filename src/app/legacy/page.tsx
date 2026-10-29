import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Law and Growth Pages for Colorado Technology Companies",
  description:
    "Legacy Whiteford Mountain West and Schell IP campaign hub for AI compliance, technology outside general counsel, and M&A readiness.",
  openGraph: {
    title: "Whiteford Mountain West AI Law",
    description:
      "AI compliance, technology outside general counsel, and M&A readiness resources for Colorado and Mountain West companies.",
    url: "/legacy",
    images: ["/logos/whiteford-white-on-navy-full.png"],
  },
};

const campaignCards = [
  {
    href: "/ai-patent-strategy-scorecard",
    label: "AI Patent Strategy",
    description:
      "A founder-facing scorecard for human contribution, invention records, ownership, and patent strategy when AI tools touch R&D.",
  },
  {
    href: "/colorado-ai-compliance-lawyer",
    label: "AI Compliance",
    description:
      "A practical readiness path for Colorado and Mountain West companies using, buying, or embedding AI in consequential workflows.",
  },
  {
    href: "/colorado-tech-general-counsel",
    label: "Tech GC",
    description:
      "A legal operating system for companies growing beyond pure patent strategy into contracts, hiring, fundraising, and AI governance.",
  },
  {
    href: "/colorado-startup-ma-lawyer",
    label: "M&A Readiness",
    description:
      "A founder-facing readiness page for companies considering acquisition, strategic partnership, recapitalization, or venture/PE diligence.",
  },
] as const;

const authorityPillars = [
  "AI governance: risk classification, vendor controls, notices, records, and human-review pathways.",
  "Tech OGC: a practical operating system for companies growing beyond pure patent strategy.",
  "M&A readiness: diligence preparation across IP, contracts, corporate records, employment, AI, and data.",
  "Founder/IP: assignment hygiene, investor readiness, and portfolio strategy that can survive diligence.",
] as const;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 24 24" width="16">
      <path
        d="M5 12h14m-7-7 7 7-7 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
      <path
        d="m5 13 4 4L19 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function LegacyPage() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#d8d0c3]/80 bg-[#fffdf8]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a className="flex items-center gap-4" href="/legacy" aria-label="Legacy campaign hub">
            <span className="flex items-center gap-3">
              <img
                alt="Whiteford Taylor Preston"
                className="h-7 w-auto"
                height="205"
                src="/logos/whiteford-navy-on-light.png"
                width="886"
              />
              <span className="h-8 w-px bg-[#d8d0c3]" aria-hidden="true" />
              <img
                alt="Schell IP"
                className="h-[13px] w-auto"
                height="149"
                src="/logos/schellip-color.png"
                width="982"
              />
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-[#354054] lg:flex">
            <a className="hover:text-[#213f77]" href="/colorado-ai-compliance-lawyer">
              AI Compliance
            </a>
            <a className="hover:text-[#213f77]" href="/ai-patent-strategy-scorecard">
              AI Patent
            </a>
            <a className="hover:text-[#213f77]" href="/colorado-tech-general-counsel">
              Tech GC
            </a>
            <Link className="hover:text-[#213f77]" href="/">
              Current directory
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="border-b border-[#d8d0c3] bg-[#fffdf8]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-20">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#683ab7]">
                Legacy campaign hub
              </div>
              <h1 className="mt-4 max-w-5xl text-5xl font-semibold leading-[1.02] tracking-normal text-[#121827] md:text-7xl">
                AI law pages built to convert executive interest into a legal gameplan.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#354054]">
                This is the prior Whiteford Mountain West / Schell IP campaign hub, preserved
                at /legacy after the four-tool directory moved to the root learn.schellip.com page.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex h-12 items-center justify-center gap-2 border border-[#121827] bg-[#121827] px-5 text-sm font-semibold text-white transition hover:bg-[#213f77]"
                  href="/colorado-ai-compliance-lawyer"
                >
                  View AI compliance page
                  <ArrowIcon />
                </a>
                <Link
                  className="inline-flex h-12 items-center justify-center gap-2 border border-[#c8beb0] bg-[#fffdf8] px-5 text-sm font-semibold text-[#121827] transition hover:border-[#213f77]"
                  href="/"
                >
                  Open current directory
                  <ArrowIcon />
                </Link>
              </div>
            </div>

            <div className="border border-[#c8beb0] bg-[#fffdf8] p-4 shadow-[0_24px_60px_rgba(18,24,39,0.12)]">
              <div className="border-b border-[#d8d0c3] pb-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#683ab7]">
                      AI Compliance Gameplan
                    </div>
                    <div className="mt-1 text-2xl font-semibold text-[#121827]">
                      Elevated readiness workstream
                    </div>
                  </div>
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-[#213f77] bg-[#f7f5ef] text-2xl font-semibold text-[#213f77]">
                    72
                  </div>
                </div>
              </div>
              <div className="grid gap-3 py-5 sm:grid-cols-2">
                {["Vendor contracts", "Human review", "Notices and records", "Governance owner"].map((item) => (
                  <div key={item} className="border border-[#e5ded2] bg-white p-3">
                    <div className="text-xs text-[#5d6678]">{item}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#121827]">
                        {item === "Governance owner" ? "Missing" : item === "Notices and records" ? "Watch" : item === "Human review" ? "Moderate" : "High"}
                      </span>
                      <span className="h-2 w-20 bg-[#d8d0c3]">
                        <span className="block h-2 w-2/3 bg-[#b99057]" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#d8d0c3] pt-4">
                <div className="text-sm font-semibold text-[#121827]">Next 30 days</div>
                <ol className="mt-3 space-y-2 text-sm text-[#354054]">
                  <li>1. Inventory AI uses and owners.</li>
                  <li>2. Review vendor terms and data flows.</li>
                  <li>3. Build notices, review path, and records map.</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#d8d0c3] bg-[#f7f5ef]">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#683ab7]">
                Campaign architecture
              </div>
              <h2 className="mt-3 text-3xl font-semibold text-[#121827]">
                Three launch pages, one technical lead magnet, one CRM engine.
              </h2>
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-4">
              {campaignCards.map((card) => (
                <a
                  className="border border-[#d8d0c3] bg-[#fffdf8] p-5 transition hover:border-[#213f77] hover:shadow-[0_18px_40px_rgba(18,24,39,0.08)]"
                  href={card.href}
                  key={card.href}
                >
                  <div className="text-xl font-semibold text-[#121827]">{card.label}</div>
                  <p className="mt-3 text-sm leading-6 text-[#354054]">{card.description}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#213f77]">
                    Open page
                    <ArrowIcon />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#fffdf8]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[0.65fr_1fr] lg:px-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#683ab7]">
                Authority engine
              </div>
              <h2 className="mt-3 text-3xl font-semibold text-[#121827]">
                A content system that routes executives to the right service.
              </h2>
              <p className="mt-4 leading-7 text-[#354054]">
                Daily AI content, SEO landing pages, gated executive assets, and technical lead
                magnets point toward the same next step: collect qualified context and schedule a
                focused meeting.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {authorityPillars.map((item) => (
                <div key={item} className="border border-[#d8d0c3] p-5">
                  <div className="text-[#b99057]">
                    <CheckIcon />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#354054]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#d8d0c3] bg-[#121827] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b99057]">
              Whiteford Mountain West
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#d8dde8]">
              Public educational material only. No attorney-client relationship is formed by using
              these pages, submitting a form, or receiving an automated report. Do not submit
              confidential information through assessment or landing-page forms.
            </p>
          </div>
          <div className="text-sm leading-6 text-[#d8dde8] lg:text-right">
            <p>Jeffrey Schell, patent lawyer</p>
            <p>Schell IP trust bridge, Whiteford institutional bench</p>
            <p className="mt-3">
              <Link className="text-[#b99057] hover:text-white" href="/">
                Current lead magnet directory
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
