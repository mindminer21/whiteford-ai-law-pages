import type { Metadata } from "next";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Footer, Header, WhitefordMark } from "@/components/brand";
import { GameplanBuilder } from "@/components/gameplan-builder";
import { ButtonLink } from "@/components/landing";
import { aiSources } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Compliance Gameplan Builder",
  description:
    "A non-confidential AI governance and compliance readiness assessment for Colorado and Mountain West companies.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <section className="border-b border-[#d8d0c3] bg-[#fffdf8]">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <WhitefordMark />
            <div className="mt-8 max-w-4xl">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#683ab7]">
                Technical lead magnet prototype
              </div>
              <h1 className="mt-4 text-5xl font-semibold leading-[1.02] tracking-normal text-[#121827] md:text-7xl">
                Build an AI compliance gameplan before the first legal meeting.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#354054]">
                Answer a short set of non-confidential questions and get a
                readiness heat map, priority workstreams, and a suggested
                Whiteford service path.
              </p>
              <div className="mt-6 border border-[#d8d0c3] bg-white p-4 text-sm leading-6 text-[#354054]">
                <div className="font-semibold text-[#121827]">Privacy and engagement guardrails</div>
                <p className="mt-2">
                  Do not submit confidential, proprietary, trade-secret, privileged,
                  employee/applicant/customer/patient-specific, or matter-specific facts.
                  This staging tool is educational only; it is not legal advice, a
                  compliance determination, or an attorney-client relationship. Whiteford
                  can advise only after conflicts review and a written engagement.
                </p>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-[#5d6678]">
                Source-current note: legal sources and public-copy claims must be
                rechecked and approved on publication day before any public launch.
              </p>
              <div className="mt-8">
                <ButtonLink href="#builder">
                  Start below
                  <ArrowRight size={17} aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section id="builder" className="bg-[#f7f5ef]">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <GameplanBuilder />
          </div>
        </section>

        <section className="border-y border-[#d8d0c3] bg-[#121827] text-white">
          <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b99057]">
                Research anchors
              </div>
              <h2 className="mt-3 text-3xl font-semibold">
                The tool is framed as readiness, not a legal determination.
              </h2>
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
            <p className="mt-5 text-sm leading-6 text-white/72">
              Report email, calendar CTA, and any booking flow must repeat the
              no-confidential-information warning and the conflicts/written-engagement
              caveat before external use.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
