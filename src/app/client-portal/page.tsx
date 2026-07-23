import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header, Footer, WhitefordMark } from "@/components/brand";
import { GuardrailCallout } from "@/components/portal/guardrail-callout";

export const metadata: Metadata = { title: "Whiteford Tech Company OGC Client Portal" };

export default function ClientPortalLandingPage() {
  const cards = ["Tagged legal questions", "Simulated document routing", "Request-only attorney scheduling", "Monthly legal operating plan", "Draft AI onboarding checklist"];
  return (
    <>
      <Header />
      <main>
        <section className="border-b border-[#d8d0c3] bg-[#fffdf8]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1fr_0.9fr] lg:px-8">
            <div><WhitefordMark /><div className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#683ab7]">Internal Phase 0 prototype · approved clients only</div><h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-tight text-[#121827]">A legal operating portal for technology companies.</h1><p className="mt-6 text-lg leading-8 text-[#354054]">This local prototype demonstrates how the Whiteford Tech Company OGC + AI Compliance package can turn scattered legal requests into visible issue triage, routing metadata, next actions, and a monthly legal operating cadence.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/portal" className="inline-flex items-center gap-2 border border-[#121827] bg-[#121827] px-5 py-3 text-sm font-semibold text-white">Approved-client prototype sign in <ArrowRight size={16} /></Link><Link href="/colorado-tech-general-counsel" className="border border-[#d8d0c3] bg-white px-5 py-3 text-sm font-semibold text-[#121827]">OGC package context</Link></div></div>
            <div className="border border-[#d8d0c3] bg-white p-5 shadow-[0_24px_60px_rgba(18,24,39,0.12)]"><div className="text-sm font-semibold text-[#121827]">Prototype modules</div><div className="mt-4 grid gap-3">{cards.map((card) => <div key={card} className="border border-[#e5ded2] bg-[#fffdf8] p-4 text-sm text-[#354054]">{card}</div>)}</div></div>
          </div>
        </section>
        <section className="bg-[#f7f5ef]"><div className="mx-auto max-w-7xl px-5 py-12 lg:px-8"><GuardrailCallout title="Client portal caveat" variant="urgent"><p>Prototype only — no live messages, uploads, calendar invites, external notifications, auth integration, CRM mutation, or document persistence. Do not submit confidential information.</p></GuardrailCallout><div className="mt-8 grid gap-4 md:grid-cols-3">{["1. Put a question in the right lane.", "2. Attach mock document metadata and predefined tags.", "3. Turn the issue into an attorney-reviewed next action or monthly agenda item."].map((step) => <div key={step} className="border border-[#d8d0c3] bg-white p-5 text-sm leading-6 text-[#354054]">{step}</div>)}</div></div></section>
      </main>
      <Footer />
    </>
  );
}
