import Link from "next/link";
import { portalAgendaItems, portalDocuments, portalMeetingRequests, portalOrganization, portalThreads } from "@/lib/portal/mock-data";
import { portalAttorneys } from "@/lib/portal/attorneys";

function StatCard({ label, value, href }: { label: string; value: string; href: string }) {
  return <Link href={href} className="border border-[#d8d0c3] bg-white p-5 hover:border-[#213f77]"><div className="text-3xl font-semibold text-[#213f77]">{value}</div><div className="mt-2 text-sm text-[#354054]">{label}</div></Link>;
}

export function PortalDashboard() {
  return (
    <div className="space-y-6">
      <section className="grid gap-3 md:grid-cols-4">
        <StatCard label="Open coordination threads" value={String(portalThreads.length)} href="/portal/messages" />
        <StatCard label="Mock document metadata rows" value={String(portalDocuments.length)} href="/portal/documents" />
        <StatCard label="Request-only meetings" value={String(portalMeetingRequests.length)} href="/portal/schedule" />
        <StatCard label="Monthly operating items" value={String(portalAgendaItems.length)} href="/portal/agenda" />
      </section>
      <section className="border border-[#d8d0c3] bg-[#fffdf8] p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#683ab7]">Managed outcome demo</div>
        <h2 className="mt-2 text-2xl font-semibold text-[#121827]">Clear issue triage, routing, next action, and monthly legal operating cadence.</h2>
        <p className="mt-3 text-sm leading-6 text-[#354054]">{portalOrganization.name} sees where to place a legal question, what documents are queued, who is requested as routing metadata, and what decisions belong on the next OGC call.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Link href="/portal/messages/new" className="border border-[#121827] bg-[#121827] px-4 py-3 text-sm font-semibold text-white">Start legal question</Link>
          <Link href="/portal/documents/upload" className="border border-[#d8d0c3] bg-white px-4 py-3 text-sm font-semibold text-[#121827]">Simulate document upload</Link>
          <Link href="/portal/schedule/new" className="border border-[#d8d0c3] bg-white px-4 py-3 text-sm font-semibold text-[#121827]">Request discussion time</Link>
        </div>
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        {portalThreads.slice(0, 2).map((thread) => <article key={thread.id} className="border border-[#d8d0c3] bg-white p-5"><div className="text-xs uppercase tracking-[0.14em] text-[#5d6678]">{thread.status} · {thread.urgency}</div><h3 className="mt-2 font-semibold text-[#121827]">{thread.subject}</h3><p className="mt-2 text-sm leading-6 text-[#354054]">Next action: {thread.nextAction}</p><div className="mt-3 flex flex-wrap gap-2">{thread.issueTags.map((tag) => <span key={tag} className="bg-[#eef3fb] px-2 py-1 text-xs text-[#213f77]">{tag}</span>)}</div></article>)}
      </section>
      <section className="border border-[#d8d0c3] bg-white p-5"><h2 className="text-lg font-semibold text-[#121827]">Attorney bench preview</h2><p className="mt-2 text-sm leading-6 text-[#354054]">{portalAttorneys.length} draft roster records, all request-only until Whiteford approves availability, conflicts, engagement scope, and calendar policy.</p></section>
    </div>
  );
}
