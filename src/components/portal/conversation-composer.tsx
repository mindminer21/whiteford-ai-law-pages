"use client";

import { useMemo, useState } from "react";
import { portalDocuments } from "@/lib/portal/mock-data";
import { portalIssueTags } from "@/lib/portal/tags";
import type { PortalIssueTagSlug } from "@/lib/portal/types";
import { suggestAttorneysForIssueTags } from "@/lib/portal/routing";
import { GuardrailCallout } from "./guardrail-callout";

export function ConversationComposer() {
  const [tags, setTags] = useState<PortalIssueTagSlug[]>(["#monthly-gc-call"]);
  const [urgency, setUrgency] = useState("normal");
  const [submitted, setSubmitted] = useState(false);
  const suggested = useMemo(() => suggestAttorneysForIssueTags(tags), [tags]);
  const needsAck = urgency === "time-sensitive" || tags.includes("#urgent-triage") || tags.includes("#board-investor-sensitive");
  function toggle(slug: PortalIssueTagSlug) { setTags((current) => current.includes(slug) ? current.filter((tag) => tag !== slug) : [...current, slug]); }
  return (
    <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="space-y-5 border border-[#d8d0c3] bg-white p-5">
      <GuardrailCallout title="Message guardrail" variant={needsAck ? "urgent" : "warning"}><p>No live messages are sent in this prototype. The local preview demonstrates intake shape only: no legal advice, no conflicts clearance, no matter acceptance, no autonomous attorney assignment, and no guaranteed response.</p></GuardrailCallout>
      <label className="block"><span className="text-sm font-semibold text-[#121827]">Subject</span><input className="mt-2 w-full border border-[#d8d0c3] bg-[#fffdf8] p-3" placeholder="Example: AI vendor terms before enterprise pilot" /></label>
      <div><div className="text-sm font-semibold text-[#121827]">Predefined issue tags only</div><div className="mt-2 flex flex-wrap gap-2">{portalIssueTags.map((tag) => <button key={tag.slug} type="button" onClick={() => toggle(tag.slug)} className={tags.includes(tag.slug) ? "border border-[#213f77] bg-[#213f77] px-3 py-2 text-xs font-semibold text-white" : "border border-[#d8d0c3] px-3 py-2 text-xs font-semibold text-[#354054]"}>{tag.slug}</button>)}</div></div>
      <div><div className="text-sm font-semibold text-[#121827]">Optional lawyer routing tags</div><p className="mt-1 text-xs text-[#5d6678]">Attorney tags are routing metadata, not notifications or availability promises.</p><div className="mt-2 flex flex-wrap gap-2">{suggested.map((attorney) => <label key={attorney.id} className="border border-[#d8d0c3] px-3 py-2 text-xs"><input type="checkbox" className="mr-2" />{attorney.hashtag}</label>)}</div></div>
      <label className="block"><span className="text-sm font-semibold text-[#121827]">Urgency</span><select value={urgency} onChange={(event) => setUrgency(event.target.value)} className="mt-2 w-full border border-[#d8d0c3] bg-[#fffdf8] p-3"><option value="normal">Normal</option><option value="monthly-call">Next monthly call</option><option value="prompt-triage">Prompt triage</option><option value="time-sensitive">Time-sensitive — not emergency</option></select></label>
      <label className="block"><span className="text-sm font-semibold text-[#121827]">Message body</span><textarea className="mt-2 min-h-32 w-full border border-[#d8d0c3] bg-[#fffdf8] p-3" placeholder="Do not include confidential or time-sensitive facts unless portal use is authorized for this matter." /></label>
      <div><div className="text-sm font-semibold text-[#121827]">Link existing mock documents</div><div className="mt-2 grid gap-2">{portalDocuments.map((doc) => <label key={doc.id} className="border border-[#d8d0c3] p-3 text-sm"><input type="checkbox" className="mr-2" />{doc.displayFilename} · {doc.status}</label>)}</div></div>
      {needsAck ? <label className="flex gap-3 border border-[#9f1d1d] bg-[#fff1f1] p-3 text-sm text-[#121827]"><input required type="checkbox" />I acknowledge this prototype does not create a new attorney-client relationship and portal messages are not an emergency channel.</label> : null}
      <button className="border border-[#121827] bg-[#121827] px-5 py-3 text-sm font-semibold text-white">Preview mock thread — no network call</button>
      {submitted ? <div className="border border-[#55776a] bg-[#f0f8f3] p-4 text-sm text-[#121827]">Local preview created. No live messages, notifications, CRM records, or attorney assignments were created.</div> : null}
    </form>
  );
}
