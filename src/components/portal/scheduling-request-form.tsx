"use client";

import { useState } from "react";
import { portalAttorneys } from "@/lib/portal/attorneys";
import { portalDocuments, portalThreads } from "@/lib/portal/mock-data";
import { portalIssueTags } from "@/lib/portal/tags";
import { GuardrailCallout } from "./guardrail-callout";

export function SchedulingRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="space-y-5 border border-[#d8d0c3] bg-white p-5">
      <GuardrailCallout title="Scheduling screen warning" variant="urgent"><p>A meeting request is not accepted until confirmed by Whiteford. This prototype sends no calendar invite, email, Teams link, or external notification. It provides no legal advice, no conflicts clearance, no matter acceptance, no autonomous attorney assignment, and no guaranteed response.</p></GuardrailCallout>
      <div><div className="text-sm font-semibold text-[#121827]">Requested attorneys — request-only</div><div className="mt-2 grid gap-2 md:grid-cols-2">{portalAttorneys.slice(0, 10).map((attorney) => <label key={attorney.id} className="border border-[#d8d0c3] p-3 text-sm"><input type="checkbox" className="mr-2" />{attorney.displayName} <span className="text-[#5d6678]">({attorney.availabilityMode})</span></label>)}</div></div>
      <div><div className="text-sm font-semibold text-[#121827]">Issue tags</div><div className="mt-2 flex flex-wrap gap-2">{portalIssueTags.slice(0, 10).map((tag) => <label key={tag.slug} className="border border-[#d8d0c3] px-3 py-2 text-xs"><input type="checkbox" className="mr-2" />{tag.slug}</label>)}</div></div>
      <label className="block"><span className="text-sm font-semibold text-[#121827]">Meeting purpose</span><textarea className="mt-2 min-h-24 w-full border border-[#d8d0c3] bg-[#fffdf8] p-3" placeholder="Frame business decision and desired outcome; avoid confidential details unless authorized." /></label>
      <div className="grid gap-3 md:grid-cols-3"><label><span className="text-sm font-semibold">Preferred windows</span><input className="mt-2 w-full border border-[#d8d0c3] bg-[#fffdf8] p-3" placeholder="Tue/Thu afternoon" /></label><label><span className="text-sm font-semibold">Timezone</span><input className="mt-2 w-full border border-[#d8d0c3] bg-[#fffdf8] p-3" defaultValue="America/Denver" /></label><label><span className="text-sm font-semibold">Duration</span><select className="mt-2 w-full border border-[#d8d0c3] bg-[#fffdf8] p-3"><option>30</option><option>45</option><option>60</option><option>90</option></select></label></div>
      <div className="grid gap-3 md:grid-cols-2"><div><div className="text-sm font-semibold">Linked threads</div>{portalThreads.map((thread) => <label key={thread.id} className="mt-2 block border border-[#d8d0c3] p-3 text-sm"><input type="checkbox" className="mr-2" />{thread.subject}</label>)}</div><div><div className="text-sm font-semibold">Linked documents</div>{portalDocuments.map((doc) => <label key={doc.id} className="mt-2 block border border-[#d8d0c3] p-3 text-sm"><input type="checkbox" className="mr-2" />{doc.displayFilename}</label>)}</div></div>
      <button className="border border-[#121827] bg-[#121827] px-5 py-3 text-sm font-semibold text-white">Preview meeting request — no invite</button>
      {submitted ? <div className="border border-[#55776a] bg-[#f0f8f3] p-4 text-sm">Mock meeting_request status: requested. No calendar invite, no booking guarantee, no attorney notification.</div> : null}
    </form>
  );
}
