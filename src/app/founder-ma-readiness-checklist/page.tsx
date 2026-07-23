import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Footer, Header, WhitefordMark } from "@/components/brand";
import { FounderMaReadinessChecklist } from "@/components/founder-ma-readiness-checklist";
import { ButtonLink } from "@/components/landing";

export const metadata: Metadata = {
  title: "Founder M&A Readiness Checklist",
  description:
    "A non-confidential founder M&A readiness checklist for technology-company diligence cleanup before investor, banker, buyer, or strategic partner pressure.",
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
                Founder M&A readiness lead magnet
              </div>
              <h1 className="mt-4 text-5xl font-semibold leading-[1.02] tracking-normal text-[#121827] md:text-7xl">
                Map diligence cleanup before a buyer controls the request list.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#354054]">
                Answer a short set of non-confidential readiness questions and get a buyer diligence risk map, a practical 60-day cleanup sequence, and a suggested Whiteford service path.
              </p>
              <div className="mt-8">
                <ButtonLink href="#checklist">
                  Run the checklist
                  <ArrowRight size={17} aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section id="checklist" className="bg-[#f7f5ef]">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <FounderMaReadinessChecklist />
          </div>
        </section>

        <section className="border-y border-[#d8d0c3] bg-[#121827] text-white">
          <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b99057]">
                Readiness, not deal prediction
              </div>
              <h2 className="mt-3 text-3xl font-semibold">
                The checklist focuses on operational evidence a buyer or investor may ask to review.
              </h2>
              <p className="mt-4 leading-7 text-[#d8dde8]">
                It does not value a company, predict an outcome, provide legal advice, or ask for confidential transaction facts through a public form.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
