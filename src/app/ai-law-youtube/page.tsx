import type { Metadata } from "next";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Film,
  Lightbulb,
  ListChecks,
  MailCheck,
  Search,
} from "lucide-react";
import { Footer, Header, WhitefordMark } from "@/components/brand";
import { ButtonLink } from "@/components/landing";
import { campaigns } from "@/lib/campaigns";

export const metadata: Metadata = {
  title: "Schell IP AI Law YouTube Authority Hub",
  description:
    "A YouTube-led AI patent law, AI legal risk, and Colorado tech general counsel authority hub connected to Whiteford Mountain West lead magnets.",
};

const shows = [
  {
    name: "AI Patent Brief",
    focus: "AI-assisted invention, USPTO guidance, eligibility, ownership, and patent strategy.",
    cadence: "Weekly",
    cta: "AI Patent Strategy Scorecard",
    href: "/ai-patent-strategy-scorecard",
  },
  {
    name: "Colorado AI Law Brief",
    focus: "Colorado AI, ADMT, vendor governance, privacy, records, and human-review readiness.",
    cadence: "Weekly",
    cta: "AI Compliance Gameplan Builder",
    href: "/ai-compliance-gameplan",
  },
  {
    name: "Founder Legal Operating System",
    focus: "Tech company GC work: contracts, hiring, financing readiness, IP, data, and AI governance.",
    cadence: "Biweekly",
    cta: "Tech Company Legal Health Checklist",
    href: "/colorado-tech-general-counsel#lead-magnet",
  },
  {
    name: "Deal-Ready Founder",
    focus: "M&A readiness, diligence cleanup, IP ownership, customer contracts, and AI/data risk.",
    cadence: "Biweekly",
    cta: "Founder M&A Readiness Checklist",
    href: "/colorado-startup-ma-lawyer#lead-magnet",
  },
];

const initialQueue = [
  {
    title: "Can You Patent an AI-Assisted Invention?",
    keyword: "AI patent lawyer",
    magnet: "AI Patent Strategy Scorecard",
    route: campaigns["ai-patent"].triggerTag,
  },
  {
    title: "Colorado AI Compliance: What Companies Should Inventory First",
    keyword: "Colorado AI compliance lawyer",
    magnet: "AI Compliance Gameplan Builder",
    route: campaigns["ai-compliance"].triggerTag,
  },
  {
    title: "The Legal Checklist Every Colorado AI Startup Needs Before Fundraising",
    keyword: "Colorado startup general counsel",
    magnet: "Tech Company Legal Health Checklist",
    route: campaigns["tech-gc"].triggerTag,
  },
  {
    title: "AI, Data, and IP Issues That Can Slow a Tech Company Acquisition",
    keyword: "tech M&A due diligence lawyer",
    magnet: "Founder M&A Readiness Checklist",
    route: campaigns["ma-readiness"].triggerTag,
  },
];

const workflow = [
  "Hermes identifies search and YouTube topics with buyer intent.",
  "The topic becomes a recording brief for @SchellIP.",
  "Each video points to one landing page and one lead magnet.",
  "The form adds a HighLevel tag and enters the matching nurture sequence.",
  "Qualified prospects are routed toward Jeff's calendar with a focused meeting agenda.",
];

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <section className="border-b border-[#d8d0c3] bg-[#fffdf8]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1fr_0.82fr] lg:px-8 lg:py-20">
            <div>
              <div className="mb-8 flex flex-wrap items-center gap-5">
                <WhitefordMark />
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#683ab7]">
                  YouTube authority engine
                </div>
              </div>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal text-[#121827] md:text-7xl">
                Build @SchellIP into the Colorado AI law and AI patent strategy channel.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#354054]">
                A weekly recording system that turns live SEO opportunities into
                useful videos, lead magnets, HighLevel tags, and consult-ready
                prospects for Whiteford Mountain West.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/ai-patent-strategy-scorecard">
                  AI patent scorecard
                  <ArrowRight size={17} aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="/ai-compliance-gameplan" tone="light">
                  AI compliance gameplan
                  <ListChecks size={17} aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>
            <div className="border border-[#c8beb0] bg-[#f7f5ef] p-5 shadow-[0_24px_60px_rgba(18,24,39,0.12)]">
              <div className="flex items-center justify-between border-b border-[#d8d0c3] pb-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#683ab7]">
                    Weekly Hermes loop
                  </div>
                  <div className="mt-1 text-2xl font-semibold text-[#121827]">
                    SEO to camera to CRM
                  </div>
                </div>
                <Film size={32} className="text-[#213f77]" aria-hidden="true" />
              </div>
              <ol className="mt-5 space-y-3">
                {workflow.map((item, index) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-[#354054]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#213f77] text-xs font-semibold text-[#213f77]">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f5ef]">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <div className="flex flex-col justify-between gap-5 border-b border-[#d8d0c3] pb-6 md:flex-row md:items-end">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#683ab7]">
                  Programming lanes
                </div>
                <h2 className="mt-3 text-3xl font-semibold text-[#121827]">
                  Four shows, one authority position.
                </h2>
              </div>
              <a
                href="https://www.youtube.com/@SchellIP"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 border border-[#c8beb0] bg-[#fffdf8] px-4 text-sm font-semibold text-[#121827] hover:border-[#213f77]"
              >
                Open @SchellIP
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {shows.map((show) => (
                <article key={show.name} className="border border-[#d8d0c3] bg-[#fffdf8] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5d6678]">
                        {show.cadence}
                      </div>
                      <h3 className="mt-2 text-2xl font-semibold text-[#121827]">
                        {show.name}
                      </h3>
                    </div>
                    <Lightbulb size={24} className="text-[#b99057]" aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#354054]">{show.focus}</p>
                  <div className="mt-5">
                    <ButtonLink href={show.href} tone="light">
                      {show.cta}
                      <ArrowRight size={16} aria-hidden="true" />
                    </ButtonLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#d8d0c3] bg-[#121827] text-white">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr]">
              <div>
                <Search size={34} className="text-[#b99057]" aria-hidden="true" />
                <h2 className="mt-5 text-3xl font-semibold">
                  First recording queue for Hermes to keep refreshing.
                </h2>
                <p className="mt-4 leading-7 text-[#d8dde8]">
                  Each topic should be refreshed against current search results
                  before recording and paired with a single call to action.
                </p>
              </div>
              <div className="space-y-3">
                {initialQueue.map((item) => (
                  <article key={item.title} className="border border-white/20 bg-white/5 p-4">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row">
                      <div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="mt-2 text-sm text-[#d8dde8]">
                          Primary search target: {item.keyword}
                        </p>
                      </div>
                      <div className="text-sm text-[#b99057]">{item.magnet}</div>
                    </div>
                    <div className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#d8dde8]">
                      <MailCheck size={14} aria-hidden="true" />
                      {item.route}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#fffdf8]">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[1fr_0.9fr] lg:px-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#683ab7]">
                HighLevel handoff
              </div>
              <h2 className="mt-3 text-3xl font-semibold text-[#121827]">
                The content system is wired to the same campaign architecture as the lead magnets.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-[#354054]">
                Video descriptions and pinned comments should point to the
                matching tool, not a generic contact page. HighLevel receives
                the campaign tag and starts the correct nurture path.
              </p>
            </div>
            <div className="grid gap-3">
              {Object.entries(campaigns).map(([key, campaign]) => (
                <div key={key} className="flex gap-3 border border-[#d8d0c3] bg-[#f7f5ef] p-4">
                  <CheckCircle2 size={18} className="mt-1 shrink-0 text-[#55776a]" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-semibold text-[#121827]">
                      {campaign.leadMagnet}
                    </div>
                    <div className="mt-1 text-sm leading-6 text-[#354054]">
                      Tag trigger: {campaign.triggerTag}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#d8d0c3] bg-[#f7f5ef]">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 py-10 lg:flex-row lg:items-center lg:px-8">
            <div>
              <h2 className="text-2xl font-semibold text-[#121827]">
                Next useful action: record from the scorecard.
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#354054]">
                Start with the AI patent scorecard because it extends your
                Schell IP patent authority into the broader Whiteford platform.
              </p>
            </div>
            <ButtonLink href="/ai-patent-strategy-scorecard">
              Open the AI patent page
              <Calendar size={17} aria-hidden="true" />
            </ButtonLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
