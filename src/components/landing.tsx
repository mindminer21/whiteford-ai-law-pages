import Link from "next/link";
import { ArrowRight, Calendar, Check, ExternalLink } from "lucide-react";
import { aiSources, type Offer } from "@/lib/site";
import { Footer, Header, WhitefordMark } from "./brand";
import { QuickLeadForm } from "./quick-lead-form";
import { TechGcLegalHealthChecklist } from "./tech-gc-legal-health-checklist";
import type { CampaignKey } from "@/lib/campaigns";

export function ButtonLink({
  href,
  children,
  tone = "dark",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <Link
      href={href}
      className={
        tone === "dark"
          ? "inline-flex h-12 items-center justify-center gap-2 border border-[#121827] bg-[#121827] px-5 text-sm font-semibold text-white transition hover:bg-[#213f77]"
          : "inline-flex h-12 items-center justify-center gap-2 border border-[#c8beb0] bg-[#fffdf8] px-5 text-sm font-semibold text-[#121827] transition hover:border-[#213f77]"
      }
    >
      {children}
    </Link>
  );
}

export function ProductPreview({ variant = "default" }: { variant?: "default" | "tech-gc" }) {
  if (variant === "tech-gc") {
    return (
      <div className="border border-[#c8beb0] bg-[#fffdf8] p-4 shadow-[0_24px_60px_rgba(18,24,39,0.12)]">
        <div className="border-b border-[#d8d0c3] pb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#683ab7]">
                AI Use Register Snapshot
              </div>
              <div className="mt-1 text-2xl font-semibold text-[#121827]">
                Legal operating layer visible
              </div>
            </div>
            <div className="flex h-16 w-16 items-center justify-center border border-[#213f77] bg-[#f7f5ef] text-2xl font-semibold text-[#213f77]">
              68
            </div>
          </div>
        </div>
        <div className="grid gap-3 py-5 sm:grid-cols-2">
          {[
            ["Use case + owner", "Partial"],
            ["Data + decision exposure", "Watch"],
            ["Vendor/IP terms", "Review"],
            ["Human review evidence", "Missing"],
          ].map(([label, value]) => (
            <div key={label} className="border border-[#e5ded2] bg-white p-3">
              <div className="text-xs text-[#5d6678]">{label}</div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#121827]">{value}</span>
                <span className="h-2 w-20 bg-[#d8d0c3]">
                  <span className="block h-2 w-1/2 bg-[#55776a]" />
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-[#d8d0c3] pt-4">
          <div className="text-sm font-semibold text-[#121827]">Next 10 days</div>
          <ol className="mt-3 space-y-2 text-sm text-[#354054]">
            <li>1. List AI tools, vendor AI features, and product AI use cases.</li>
            <li>2. Tag data exposure, output impact, and responsible owner.</li>
            <li>3. Review vendor terms, IP ownership, human review, and evidence path.</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-[#c8beb0] bg-[#fffdf8] p-4 shadow-[0_24px_60px_rgba(18,24,39,0.12)]">
      <div className="border-b border-[#d8d0c3] pb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#683ab7]">
              AI Compliance Gameplan
            </div>
            <div className="mt-1 text-2xl font-semibold text-[#121827]">
              Elevated readiness workstream
            </div>
          </div>
          <div className="flex h-16 w-16 items-center justify-center border border-[#213f77] bg-[#f7f5ef] text-2xl font-semibold text-[#213f77]">
            72
          </div>
        </div>
      </div>
      <div className="grid gap-3 py-5 sm:grid-cols-2">
        {[
          ["Vendor contracts", "High"],
          ["Human review", "Moderate"],
          ["Notices and records", "Watch"],
          ["Governance owner", "Missing"],
        ].map(([label, value]) => (
          <div key={label} className="border border-[#e5ded2] bg-white p-3">
            <div className="text-xs text-[#5d6678]">{label}</div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-[#121827]">{value}</span>
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
  );
}

export function OfferLandingPage({ offer }: { offer: Offer }) {
  const Icon = offer.icon;
  const leadHref =
    offer.slug === "colorado-ai-compliance-lawyer"
      ? "/ai-compliance-gameplan"
      : offer.slug === "ai-patent-strategy-scorecard"
        ? "/ai-patent-strategy-scorecard#scorecard"
        : offer.slug === "colorado-startup-ma-lawyer"
          ? "/founder-ma-readiness-checklist#checklist"
          : "#lead-magnet";
  const campaignKeyBySlug: Record<string, CampaignKey> = {
    "ai-patent-strategy-scorecard": "ai-patent",
    "colorado-ai-compliance-lawyer": "ai-compliance",
    "colorado-tech-general-counsel": "tech-gc",
    "colorado-startup-ma-lawyer": "ma-readiness",
  };
  const campaignKey = campaignKeyBySlug[offer.slug] ?? "ai-compliance";

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-[#d8d0c3] bg-[#fffdf8]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-20">
            <div>
              <div className="mb-8 flex flex-wrap items-center gap-5">
                <WhitefordMark />
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#683ab7]">
                  {offer.eyebrow}
                </div>
              </div>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal text-[#121827] md:text-6xl">
                {offer.title}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#354054]">
                {offer.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={leadHref}>
                  {offer.primaryCta}
                  <ArrowRight size={17} aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="#meeting" tone="light">
                  {offer.secondaryCta}
                  <Calendar size={17} aria-hidden="true" />
                </ButtonLink>
              </div>
              <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
                {offer.proof.map((item) => (
                  <div key={item} className="border-l border-[#b99057] pl-3 text-sm leading-6 text-[#354054]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <ProductPreview variant={offer.slug === "colorado-tech-general-counsel" ? "tech-gc" : "default"} />
          </div>
        </section>

        <section className="border-b border-[#d8d0c3] bg-[#f7f5ef]">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr]">
              <div>
                <Icon size={34} className="text-[#213f77]" aria-hidden="true" />
                <h2 className="mt-5 text-3xl font-semibold text-[#121827]">
                  Built around the executive problem, not a generic legal topic.
                </h2>
                <p className="mt-4 leading-7 text-[#354054]">{offer.promise}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {offer.screens.map((item) => (
                  <div key={item} className="flex gap-3 border border-[#d8d0c3] bg-[#fffdf8] p-4">
                    <Check size={18} className="mt-1 shrink-0 text-[#55776a]" aria-hidden="true" />
                    <span className="text-sm leading-6 text-[#354054]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="lead-magnet" className="bg-[#fffdf8]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-3 lg:px-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#683ab7]">
                Lead magnet
              </div>
              <h2 className="mt-3 text-3xl font-semibold text-[#121827]">
                {offer.leadMagnet}
              </h2>
              <p className="mt-4 leading-7 text-[#354054]">
                The lead magnet gives the prospect a useful gameplan and gives
                HighLevel the segmentation data needed for a relevant follow-up
                sequence.
              </p>
            </div>
            <div className="lg:col-span-2">
              <div className="grid gap-3 sm:grid-cols-2">
                {offer.deliverables.map((item) => (
                  <div key={item} className="border border-[#d8d0c3] p-5">
                    <div className="text-sm font-semibold text-[#121827]">{item}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 border border-[#213f77] bg-[#eef3fb] p-5">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#213f77]">
                  Productized service path
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {offer.servicePath.map((item) => (
                    <div key={item} className="text-sm leading-6 text-[#121827]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              {offer.slug === "colorado-tech-general-counsel" ? (
                <div className="mt-6">
                  <TechGcLegalHealthChecklist sourcePage={offer.slug} />
                </div>
              ) : offer.slug === "colorado-startup-ma-lawyer" ? (
                <div className="mt-6 border border-[#d8d0c3] bg-[#fffdf8] p-5">
                  <div className="text-sm font-semibold text-[#121827]">
                    Use the guarded Founder M&A Readiness Checklist
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#354054]">
                    The standalone checklist provides a non-confidential categorical readiness map, disclaimer gate, conflicts caveat, and optional marketing consent separated from the report request.
                  </p>
                  <div className="mt-4">
                    <ButtonLink href="/founder-ma-readiness-checklist#checklist">
                      Open the guarded checklist
                      <ArrowRight size={17} aria-hidden="true" />
                    </ButtonLink>
                  </div>
                </div>
              ) : offer.slug !== "colorado-ai-compliance-lawyer" &&
                offer.slug !== "ai-patent-strategy-scorecard" ? (
                <div className="mt-6">
                  <QuickLeadForm
                    campaignKey={campaignKey}
                    sourcePage={offer.slug}
                    title={`Get the ${offer.leadMagnet}`}
                    description="Enter your contact information and the site will route you into the relevant HighLevel tag-triggered nurture path."
                    buttonLabel="Send me the checklist"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {offer.slug === "colorado-ai-compliance-lawyer" ? (
          <section className="border-y border-[#d8d0c3] bg-[#121827] text-white">
            <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
              <div className="max-w-3xl">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b99057]">
                  Current law is moving
                </div>
                <h2 className="mt-3 text-3xl font-semibold">
                  The page should frame readiness, not a compliance guarantee.
                </h2>
                <p className="mt-4 leading-7 text-[#d8dde8]">
                  Colorado AI requirements have shifted through SB24-205,
                  SB25B-004, and SB26-189 activity. The public tool should help
                  companies organize use cases and questions for counsel, while
                  keeping definitive legal conclusions inside a reviewed legal
                  engagement.
                </p>
              </div>
              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {aiSources.map((source) => (
                  <a
                    key={source.href}
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between border border-white/18 bg-white/6 p-4 text-sm text-white hover:bg-white/10"
                  >
                    {source.label}
                    <ExternalLink size={15} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section id="meeting" className="bg-[#f7f5ef]">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[1fr_0.8fr] lg:px-8">
            <div>
              <h2 className="text-3xl font-semibold text-[#121827]">
                Bring a sharper gameplan into the first meeting.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-[#354054]">
                The custom pages should drive visitors into the relevant
                assessment or checklist, collect consented contact information,
                segment the lead in HighLevel, and give Jeff a meeting agenda
                before the call.
              </p>
            </div>
            {offer.slug === "colorado-ai-compliance-lawyer" ? (
              <div className="border border-[#d8d0c3] bg-[#fffdf8] p-5">
                <div className="text-sm font-semibold text-[#121827]">
                  HighLevel-ready capture
                </div>
                <p className="mt-3 text-sm leading-6 text-[#354054]">
                  Fields: name, email, company, role, AI use cases, score band,
                  recommended offer, source page, UTM campaign, mailing-list
                  consent, and calendar CTA.
                </p>
                <ButtonLink href="/ai-compliance-gameplan">
                  Build the gameplan
                  <ArrowRight size={17} aria-hidden="true" />
                </ButtonLink>
              </div>
            ) : offer.slug === "colorado-tech-general-counsel" ? (
              <div className="border border-[#d8d0c3] bg-[#fffdf8] p-5">
                <div className="text-sm font-semibold text-[#121827]">
                  Legal health snapshot
                </div>
                <p className="mt-3 text-sm leading-6 text-[#354054]">
                  The interactive checklist above calculates category scores and
                  top gaps before opt-in. Email routing only happens after the
                  user affirmatively requests the results.
                </p>
                <ButtonLink href="#lead-magnet">
                  Run the checklist
                  <ArrowRight size={17} aria-hidden="true" />
                </ButtonLink>
              </div>
            ) : offer.slug === "colorado-startup-ma-lawyer" ? (
              <div className="border border-[#d8d0c3] bg-[#fffdf8] p-5">
                <div className="text-sm font-semibold text-[#121827]">
                  M&A readiness snapshot
                </div>
                <p className="mt-3 text-sm leading-6 text-[#354054]">
                  Use the guarded standalone checklist for categorical, non-confidential readiness inputs before any contact or report request.
                </p>
                <ButtonLink href="/founder-ma-readiness-checklist#checklist">
                  Run the guarded checklist
                  <ArrowRight size={17} aria-hidden="true" />
                </ButtonLink>
              </div>
            ) : (
              <QuickLeadForm
                campaignKey={campaignKey}
                sourcePage={offer.slug}
                title={`Get the ${offer.leadMagnet}`}
                description="Enter your contact information and the site will add consent-gated campaign tags for HighLevel follow-up. Do not submit confidential information."
                buttonLabel="Send me the lead magnet"
              />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
