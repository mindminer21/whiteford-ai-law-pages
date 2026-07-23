"use client";

import { useState } from "react";
import { GuardrailCallout } from "./guardrail-callout";
import { TagSelector } from "./tag-selector";

const paths = [
  ["new-client", "New client", "Organize company, users, issue lanes, conflicts questions, and first legal operating baseline."],
  ["existing-client", "Existing client", "Refresh current scope, open issue lanes, documents, and monthly cadence."],
  ["new-matter", "New matter for existing client", "Flag engagement-scope questions before any work expands."],
];

export function OnboardingAssistant() {
  const [active, setActive] = useState("existing-client");
  const checklist = ["Confirm approved workspace and client users", "Identify issue lanes using predefined tags", "List documents to gather before attorney review", "Clarify deadlines and external stakeholder sensitivity", "Create draft monthly legal operating plan for attorney review"];
  return (
    <div className="space-y-5 border border-[#d8d0c3] bg-white p-5">
      <GuardrailCallout title="Deterministic onboarding prototype" variant="warning"><p>No live AI model is enabled. No legal advice, no conflicts clearance, no matter acceptance, no autonomous attorney assignment, no guaranteed response, and no client data storage occurs.</p></GuardrailCallout>
      <div className="grid gap-3 md:grid-cols-3">{paths.map(([id, label, text]) => <button key={id} type="button" onClick={() => setActive(id)} className={active === id ? "border border-[#213f77] bg-[#213f77] p-4 text-left text-white" : "border border-[#d8d0c3] bg-[#fffdf8] p-4 text-left text-[#121827]"}><div className="font-semibold">{label}</div><p className="mt-2 text-sm leading-6 opacity-85">{text}</p></button>)}</div>
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1fr]"><section className="space-y-3"><label className="block"><span className="text-sm font-semibold">Company / matter context</span><textarea className="mt-2 min-h-24 w-full border border-[#d8d0c3] bg-[#fffdf8] p-3" placeholder="Use business-level, non-confidential context only." /></label><label className="block"><span className="text-sm font-semibold">Deadline / stakeholder sensitivity</span><input className="mt-2 w-full border border-[#d8d0c3] bg-[#fffdf8] p-3" placeholder="Board, investor, customer, regulator, none" /></label></section><section><div className="text-sm font-semibold">Suggested predefined issue tags</div><div className="mt-2"><TagSelector compact /></div></section></div>
      <section className="border border-[#d8d0c3] bg-[#fffdf8] p-4"><h3 className="font-semibold text-[#121827]">Draft onboarding checklist for attorney review only</h3><ol className="mt-3 space-y-2 text-sm text-[#354054]">{checklist.map((item) => <li key={item}>• {item}</li>)}</ol></section>
    </div>
  );
}
