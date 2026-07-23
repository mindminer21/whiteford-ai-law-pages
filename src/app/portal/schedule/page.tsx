import type { Metadata } from "next";
import Link from "next/link";
import { PortalShell } from "@/components/portal/portal-shell";
import { portalMeetingRequests } from "@/lib/portal/mock-data";

export const metadata: Metadata = { title: "Portal Schedule" };

export default function SchedulePage() {
  return <PortalShell title="Request-only scheduling"><section className="space-y-4"><Link href="/portal/schedule/new" className="inline-block border border-[#121827] bg-[#121827] px-4 py-3 text-sm font-semibold text-white">Request discussion time</Link>{portalMeetingRequests.map((meeting) => <article key={meeting.id} className="border border-[#d8d0c3] bg-white p-5"><div className="text-xs uppercase tracking-[0.14em] text-[#5d6678]">{meeting.status} · {meeting.durationMinutes} minutes · no calendar invite</div><h2 className="mt-2 text-xl font-semibold text-[#121827]">{meeting.purpose}</h2><p className="mt-2 text-sm text-[#354054]">Preferred: {meeting.preferredWindows.map((window) => `${window.label} (${window.timezone})`).join(", ")}</p></article>)}</section></PortalShell>;
}
