import type { Metadata } from "next";
import Link from "next/link";
import { PortalShell } from "@/components/portal/portal-shell";
import { portalDocuments } from "@/lib/portal/mock-data";

export const metadata: Metadata = { title: "Portal Documents" };

export default function DocumentsPage() {
  return <PortalShell title="Document metadata library"><section className="space-y-4"><Link href="/portal/documents/upload" className="inline-block border border-[#121827] bg-[#121827] px-4 py-3 text-sm font-semibold text-white">Simulate upload</Link>{portalDocuments.map((doc) => <article key={doc.id} className="border border-[#d8d0c3] bg-white p-5"><div className="text-xs uppercase tracking-[0.14em] text-[#5d6678]">{doc.storageProvider} · {doc.status} · no file stored</div><h2 className="mt-2 text-xl font-semibold text-[#121827]">{doc.displayFilename}</h2><p className="mt-2 text-sm leading-6 text-[#354054]">{doc.note}</p><div className="mt-3 flex flex-wrap gap-2">{doc.issueTags.map((tag) => <span key={tag} className="bg-[#eef3fb] px-2 py-1 text-xs text-[#213f77]">{tag}</span>)}</div></article>)}</section></PortalShell>;
}
