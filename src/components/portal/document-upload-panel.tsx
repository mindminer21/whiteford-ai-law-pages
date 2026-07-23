"use client";

import { useState } from "react";
import { portalIssueTags } from "@/lib/portal/tags";
import { portalAttorneys } from "@/lib/portal/attorneys";
import { GuardrailCallout } from "./guardrail-callout";

export function DocumentUploadPanel() {
  const [fileName, setFileName] = useState("No file selected");
  const [submitted, setSubmitted] = useState(false);
  return (
    <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="space-y-5 border border-[#d8d0c3] bg-white p-5">
      <GuardrailCallout title="Upload screen warning" variant="urgent"><p>Do not upload confidential or sensitive documents until engagement/conflicts clearance and portal authorization are confirmed. This screen simulates metadata only and stores no file; no legal advice, no conflicts clearance, no matter acceptance, no autonomous attorney assignment, and no guaranteed response are provided.</p></GuardrailCallout>
      <label className="block"><span className="text-sm font-semibold text-[#121827]">Workspace / matter</span><select className="mt-2 w-full border border-[#d8d0c3] bg-[#fffdf8] p-3"><option>Tech Company OGC + AI Compliance — mock engaged workspace</option></select></label>
      <label className="block"><span className="text-sm font-semibold text-[#121827]">File picker — simulated only</span><input type="file" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "No file selected")} className="mt-2 w-full border border-dashed border-[#b99057] bg-[#fffdf8] p-4" /><span className="mt-2 block text-xs text-[#5d6678]">Selected locally for preview: {fileName}. No upload, persistence, virus scan, or external storage occurs.</span></label>
      <label className="block"><span className="text-sm font-semibold text-[#121827]">Document category</span><select className="mt-2 w-full border border-[#d8d0c3] bg-[#fffdf8] p-3"><option>Contract</option><option>Policy</option><option>Board / investor</option><option>Employment</option><option>IP</option><option>Privacy / security</option><option>Financing</option><option>Dispute</option><option>Real estate</option><option>Tax</option><option>Other</option></select></label>
      <div><div className="text-sm font-semibold text-[#121827]">Issue tags</div><div className="mt-2 flex flex-wrap gap-2">{portalIssueTags.slice(0, 12).map((tag) => <label key={tag.slug} className="border border-[#d8d0c3] px-3 py-2 text-xs"><input type="checkbox" className="mr-2" />{tag.slug}</label>)}</div></div>
      <div><div className="text-sm font-semibold text-[#121827]">Lawyer tags — routing metadata only</div><div className="mt-2 flex flex-wrap gap-2">{portalAttorneys.slice(0, 8).map((attorney) => <label key={attorney.id} className="border border-[#d8d0c3] px-3 py-2 text-xs"><input type="checkbox" className="mr-2" />{attorney.hashtag}</label>)}</div></div>
      <label className="block"><span className="text-sm font-semibold text-[#121827]">What should counsel look for?</span><textarea className="mt-2 min-h-24 w-full border border-[#d8d0c3] bg-[#fffdf8] p-3" /></label>
      <label className="flex gap-3 border border-[#9f1d1d] bg-[#fff1f1] p-3 text-sm"><input required type="checkbox" />I acknowledge this prototype stores no document and production requires approved secure storage, malware scanning, access controls, and retention policy.</label>
      <button className="border border-[#121827] bg-[#121827] px-5 py-3 text-sm font-semibold text-white">Simulate upload metadata — no persistence</button>
      {submitted ? <div className="border border-[#55776a] bg-[#f0f8f3] p-4 text-sm">Mock queue status: scan-pending → available. No file persistence, no CRM/HighLevel mutation, and no attorney notification.</div> : null}
    </form>
  );
}
