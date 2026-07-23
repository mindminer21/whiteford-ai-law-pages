import Link from "next/link";
import { Header, Footer } from "@/components/brand";
import { portalOrganization, prototypeCaveat } from "@/lib/portal/mock-data";
import { GuardrailCallout } from "./guardrail-callout";

const navItems = [
  ["Dashboard", "/portal"],
  ["Messages", "/portal/messages"],
  ["New question", "/portal/messages/new"],
  ["Documents", "/portal/documents"],
  ["Upload", "/portal/documents/upload"],
  ["Schedule", "/portal/schedule"],
  ["Onboarding", "/portal/onboarding"],
  ["Agenda", "/portal/agenda"],
  ["Attorneys", "/portal/attorneys"],
];

export function PortalShell({ children, title, eyebrow = "Whiteford Tech Company OGC Client Portal" }: { children: React.ReactNode; title: string; eyebrow?: string }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f7f5ef]">
        <section className="border-b border-[#d8d0c3] bg-[#121827] text-white">
          <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b99057]">{eyebrow}</div>
            <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-4xl font-semibold">{title}</h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-[#d8dde8]">{prototypeCaveat}</p>
              </div>
              <div className="border border-white/15 bg-white/8 p-3 text-sm text-[#d8dde8]">Mock workspace: {portalOrganization.name} · approved-client/internal prototype</div>
            </div>
          </div>
        </section>
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[240px_1fr] lg:px-8">
          <nav className="h-fit border border-[#d8d0c3] bg-[#fffdf8] p-3">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#5d6678]">Portal routes</div>
            <div className="grid gap-1">
              {navItems.map(([label, href]) => <Link key={href} href={href} className="border border-transparent px-3 py-2 text-sm text-[#354054] hover:border-[#d8d0c3] hover:bg-white">{label}</Link>)}
            </div>
          </nav>
          <div className="space-y-6">
            <GuardrailCallout />
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
