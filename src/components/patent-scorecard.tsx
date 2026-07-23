"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, ClipboardCheck, Download, MailCheck } from "lucide-react";
import {
  GuardrailNotice,
  privacyGuardrailVersion,
  publicFormInputType,
  roleCategoryOptions,
  sharedConflictEngagementNotice,
  sharedSourceCurrentNotice,
} from "./lead-magnet-guardrails";

const checks = [
  { key: "human", label: "Human contribution to conception is documented", points: 18, map: "Inventorship record" },
  { key: "records", label: "Core R&D and experiment records are preserved", points: 14, map: "R&D evidence" },
  { key: "ownership", label: "Contributor invention assignments are current", points: 14, map: "Ownership" },
  { key: "vendor", label: "AI vendor data, output, and IP terms are reviewed", points: 12, map: "Vendor rights" },
  { key: "technical", label: "The technical improvement is clear enough to claim", points: 16, map: "Technical differentiator" },
  { key: "disclosure", label: "Invention records are organized for counsel review", points: 12, map: "Disclosure package" },
  { key: "secret", label: "Patent-versus-trade-secret choices are queued for review", points: 14, map: "Patent/trade secret posture" },
];

const stages = ["Idea / prototype", "MVP in market", "Fundraising or diligence", "Enterprise/customer rollout"];

const noConfidentialNotice =
  "Use categorical answers only. Do not share invention details or confidential facts.";

const disclaimerCopy =
  "Educational only—not a patentability opinion, legal advice, or an attorney-client relationship.";

export function PatentScorecard() {
  const [selected, setSelected] = useState<string[]>(["human"]);
  const [stage, setStage] = useState(stages[0]);
  const [contact, setContact] = useState({ name: "", email: "", company: "", roleCategory: "", subscribe: false });
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const result = useMemo(() => {
    const score = checks.filter((check) => selected.includes(check.key)).reduce((sum, check) => sum + check.points, 0);
    const band = score < 42 ? "Urgent documentation gap" : score < 72 ? "Strategy needs tightening" : "Strong foundation for counsel review";
    const missing = checks.filter((check) => !selected.includes(check.key));
    const gaps = missing.slice(0, 4).map((check) => check.label);
    const documentationGapMap = missing.map((check) => ({ area: check.map, nextStep: `Review ${check.label.toLowerCase()}.` }));
    const ownershipGapMap = missing
      .filter((check) => ["human", "ownership", "vendor", "records"].includes(check.key))
      .map((check) => check.map);
    const recommendedNextStep =
      score < 42
        ? "Preserve non-confidential invention-record and ownership evidence before disclosures or diligence requests."
        : score < 72
          ? "Tighten the AI patent strategy record before filing, demo, fundraising, or enterprise rollout."
          : "Use a focused AI Patent Strategy Sprint to pressure-test filing, trade-secret, and claim-position choices with counsel.";
    const tags = [`ai-patent-score:${score < 42 ? "urgent" : score < 72 ? "developing" : "strong"}`];

    return { score, band, gaps, documentationGapMap, ownershipGapMap, recommendedNextStep, tags };
  }, [selected]);

  async function submit() {
    if (!disclaimerAccepted) {
      setMessage("Please accept the educational-use, no-confidential-information, and no-attorney-client gate before requesting the scorecard.");
      return;
    }

    setSubmitting(true);
    setMessage("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignKey: "ai-patent",
          sourcePage: "ai-patent-strategy-scorecard",
          sourceChannel: "website",
          disclaimerAccepted,
          reportRequested: true,
          privacyGuardrailVersion,
          publicFormInputType,
          contact: { ...contact, role: contact.roleCategory },
          assessment: {
            readinessScore: result.score,
            band: { label: result.band, cta: "AI Patent Strategy Sprint" },
            tags: result.tags,
          },
          patent: {
            score: result.score,
            stage,
            checks: selected,
            band: result.band,
            reportVersion: "ai-patent-scorecard-privacy-guardrail-v2",
          },
          aiPatentDocumentationGapMap: result.documentationGapMap,
          aiPatentOwnershipGapMap: result.ownershipGapMap,
          recommendedNextStep: result.recommendedNextStep,
        }),
      });
      if (!response.ok) throw new Error("Patent scorecard submission failed");
      const data = await response.json();
      setMessage(
        data.mode === "preview"
          ? "Scorecard request captured in preview mode. Marketing updates remain off unless the optional updates box was checked."
          : "Scorecard request submitted with consent-gated AI Patent Strategy routing. Marketing nurture remains limited to the optional educational email path you requested.",
      );
    } catch {
      setMessage("The scorecard is ready, but live lead routing needs configuration.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div id="scorecard" className="grid gap-8 lg:grid-cols-[0.9fr_1fr]">
      <section className="border border-[#d8d0c3] bg-[#fffdf8] p-5">
        <div className="flex items-center gap-3">
          <ClipboardCheck size={24} className="text-[#213f77]" aria-hidden="true" />
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#683ab7]">AI patent inputs</div>
            <h2 className="text-2xl font-semibold text-[#121827]">Score the invention record before filing.</h2>
          </div>
        </div>
        <GuardrailNotice title="Before you begin" body={noConfidentialNotice} />
        <label className="mt-4 flex items-start gap-3 border border-[#c8beb0] bg-white p-3 text-sm leading-6 text-[#354054]">
          <input type="checkbox" checked={disclaimerAccepted} onChange={(event) => setDisclaimerAccepted(event.target.checked)} className="mt-1 h-4 w-4 accent-[#213f77]" />
          {disclaimerCopy}
        </label>
        <label className="mt-7 block text-sm font-semibold text-[#121827]">
          Company stage
          <select value={stage} onChange={(event) => setStage(event.target.value)} disabled={!disclaimerAccepted} className="mt-2 h-11 w-full border border-[#c8beb0] bg-white px-3 text-sm font-normal text-[#121827] outline-none focus:border-[#213f77] disabled:cursor-not-allowed disabled:opacity-50">
            {stages.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <div className="mt-7 space-y-2">
          {checks.map((check) => (
            <label key={check.key} className="flex cursor-pointer items-start gap-3 border border-[#e5ded2] bg-white p-3 text-sm leading-6 text-[#354054]">
              <input
                type="checkbox"
                checked={selected.includes(check.key)}
                disabled={!disclaimerAccepted}
                onChange={(event) => setSelected((current) => (event.target.checked ? [...current, check.key] : current.filter((key) => key !== check.key)))}
                className="mt-1 h-4 w-4 accent-[#213f77] disabled:cursor-not-allowed disabled:opacity-50"
              />
              <span className="font-semibold text-[#121827]">{check.label}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="border border-[#c8beb0] bg-[#fffdf8] p-5 shadow-[0_24px_60px_rgba(18,24,39,0.12)]">
        <div className="flex items-start justify-between gap-4 border-b border-[#d8d0c3] pb-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#683ab7]">AI Patent Strategy Scorecard</div>
            <h2 className="mt-2 text-3xl font-semibold text-[#121827]">{result.band}</h2>
          </div>
          <div className="flex h-16 w-16 items-center justify-center border border-[#213f77] text-2xl font-semibold text-[#213f77]">{result.score}</div>
        </div>
        <div className="mt-4 space-y-3">
          <GuardrailNotice title="Important" body={`${noConfidentialNotice} ${sharedSourceCurrentNotice}`} />
          <GuardrailNotice title="Legal notice" body={sharedConflictEngagementNotice} />
        </div>
        <div className="py-6">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[#5d6678]">Documentation and ownership gap map</div>
          <div className="mt-4 space-y-3">
            {result.documentationGapMap.length ? result.documentationGapMap.map((gap) => (
              <div key={gap.area} className="border-l border-[#b99057] pl-3 text-sm leading-6 text-[#354054]">
                <span className="font-semibold text-[#121827]">{gap.area}:</span> {gap.nextStep}
              </div>
            )) : <div className="text-sm leading-6 text-[#354054]">No obvious gap from these non-confidential inputs; confirm through counsel review.</div>}
          </div>
        </div>
        <div className="border border-[#213f77] bg-[#eef3fb] p-4">
          <div className="text-sm font-semibold text-[#121827]">Recommended service path</div>
          <p className="mt-2 text-sm leading-6 text-[#354054]">AI Patent Strategy Sprint: {result.recommendedNextStep}</p>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Input label="Name" value={contact.name} onChange={(name) => setContact((current) => ({ ...current, name }))} />
          <Input label="Email" type="email" value={contact.email} onChange={(email) => setContact((current) => ({ ...current, email }))} />
          <Input label="Company" value={contact.company} onChange={(company) => setContact((current) => ({ ...current, company }))} />
          <SelectInput label="Role category" value={contact.roleCategory} options={roleCategoryOptions} onChange={(roleCategory) => setContact((current) => ({ ...current, roleCategory }))} />
        </div>
        <GuardrailNotice title="Before submitting" body={noConfidentialNotice} />
        <label className="mt-4 flex items-start gap-3 text-sm leading-6 text-[#354054]">
          <input type="checkbox" checked={contact.subscribe} onChange={(event) => setContact((current) => ({ ...current, subscribe: event.target.checked }))} className="mt-1 h-4 w-4 accent-[#213f77]" />
          Email me the scorecard and related educational updates. This is not for confidential information, and I can unsubscribe anytime.
        </label>
        {!contact.subscribe ? (
          <div className="mt-3 flex gap-2 text-xs leading-5 text-[#6b4b13]"><AlertTriangle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />Marketing emails are off; the scorecard still works.</div>
        ) : null}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={submit} disabled={submitting || !contact.email || !disclaimerAccepted} className="inline-flex h-12 items-center justify-center gap-2 border border-[#121827] bg-[#121827] px-5 text-sm font-semibold text-white transition hover:bg-[#213f77] disabled:cursor-not-allowed disabled:opacity-50">
            {submitting ? "Preparing scorecard request..." : "Request my scorecard"}
            <MailCheck size={17} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => window.print()} className="inline-flex h-12 items-center justify-center gap-2 border border-[#c8beb0] bg-[#fffdf8] px-5 text-sm font-semibold text-[#121827] transition hover:border-[#213f77]">
            Print / save PDF
            <Download size={17} aria-hidden="true" />
          </button>
        </div>
        {message ? <p className="mt-3 text-sm leading-6 text-[#354054]">{message}</p> : null}
        <p className="mt-5 text-xs leading-5 text-[#5d6678]">Educational only—not a patentability opinion, legal advice, or an attorney-client relationship.</p>
      </section>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="text-sm font-semibold text-[#121827]">
      {label}
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-11 w-full border border-[#c8beb0] bg-white px-3 text-sm font-normal text-[#121827] outline-none transition focus:border-[#213f77]" />
    </label>
  );
}

function SelectInput({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="text-sm font-semibold text-[#121827]">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-11 w-full border border-[#c8beb0] bg-white px-3 text-sm font-normal text-[#121827] outline-none transition focus:border-[#213f77]">
        <option value="">Select a role category</option>
        {options.map((item) => <option key={item}>{item}</option>)}
      </select>
    </label>
  );
}
