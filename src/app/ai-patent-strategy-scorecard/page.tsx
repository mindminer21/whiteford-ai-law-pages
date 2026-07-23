import type { Metadata } from "next";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Footer, Header, WhitefordMark } from "@/components/brand";
import { ButtonLink } from "@/components/landing";
import { PatentScorecard } from "@/components/patent-scorecard";

export const metadata: Metadata = {
  title: "AI Patent Strategy Scorecard",
  description:
    "A non-confidential AI patent strategy scorecard for founders documenting human contribution, ownership, and patent readiness.",
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
                AI patent law lead magnet
              </div>
              <h1 className="mt-4 text-5xl font-semibold leading-[1.02] tracking-normal text-[#121827] md:text-7xl">
                Score your AI-assisted invention record before patent strategy gets expensive.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#354054]">
                A founder-facing scorecard for human contribution,
                inventorship documentation, AI vendor terms, ownership, and
                patent-versus-trade-secret strategy.
              </p>
              <div className="mt-8">
                <ButtonLink href="#scorecard">
                  Run the scorecard
                  <ArrowRight size={17} aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
        <section id="scorecard" className="bg-[#f7f5ef]">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <PatentScorecard />
          </div>
        </section>
        <section className="border-y border-[#d8d0c3] bg-[#121827] text-white">
          <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b99057]">
                USPTO research anchors
              </div>
              <h2 className="mt-3 text-3xl font-semibold">
                AI-assisted patent strategy should start with human contribution and documentation.
              </h2>
              <p className="mt-4 leading-7 text-[#d8dde8]">
                The scorecard is framed around strategy and readiness. It does
                not determine inventorship, patentability, or eligibility.
              </p>
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {[
                ["USPTO AI resources", "https://www.uspto.gov/initiatives/artificial-intelligence/artificial-intelligence-resources"],
                ["USPTO AI inventorship FAQ", "https://www.uspto.gov/initiatives/artificial-intelligence/faqs"],
                ["AI Patent Dataset", "https://www.uspto.gov/ip-policy/economic-research/research-datasets/artificial-intelligence-patent-dataset"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between border border-white/18 bg-white/6 p-4 text-sm text-white hover:bg-white/10"
                >
                  {label}
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
