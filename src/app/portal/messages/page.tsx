import type { Metadata } from "next";
import Link from "next/link";
import { PortalShell } from "@/components/portal/portal-shell";
import { portalThreads } from "@/lib/portal/mock-data";

export const metadata: Metadata = { title: "Portal Messages" };

export default function MessagesPage() {
  return <PortalShell title="Messages and legal questions"><section className="space-y-4"><Link href="/portal/messages/new" className="inline-block border border-[#121827] bg-[#121827] px-4 py-3 text-sm font-semibold text-white">New legal question</Link>{portalThreads.map((thread) => <article key={thread.id} className="border border-[#d8d0c3] bg-white p-5"><div className="text-xs uppercase tracking-[0.14em] text-[#5d6678]">{thread.status} · {thread.urgency}</div><h2 className="mt-2 text-xl font-semibold text-[#121827]">{thread.subject}</h2><p className="mt-2 text-sm leading-6 text-[#354054]">Next action: {thread.nextAction}</p><div className="mt-3 flex flex-wrap gap-2">{thread.issueTags.concat(thread.lawyerTags as never).map((tag) => <span key={tag} className="bg-[#f7f5ef] px-2 py-1 text-xs text-[#354054]">{tag}</span>)}</div></article>)}</section></PortalShell>;
}
