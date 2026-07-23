"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, BriefcaseBusiness, Download, MailCheck, ShieldAlert } from "lucide-react";
import {
  GuardrailNotice,
  privacyGuardrailVersion,
  publicFormInputType,
  roleCategoryOptions,
  sharedConflictEngagementNotice,
  sharedSourceCurrentNotice,
} from "./lead-magnet-guardrails";

type AnswerValue = 0 | 1 | 2;

type Question = {
  key: string;
  category: string;
  label: string;
  cleanup: string;
};

const answerOptions: { value: AnswerValue; label: string; detail: string }[] = [
  { value: 0, label: "Not ready", detail: "Likely diligence friction" },
  { value: 1, label: "Partly ready", detail: "Some evidence exists" },
  { value: 2, label: "Ready", detail: "Organized and owner-assigned" },
];

const timingOptions = [
  "No active process, but want to be prepared",
  "Investor, banker, partner, or buyer conversations possible in 6-12 months",
  "High-priority preparation need within roughly 90 days",
  "Need to organize responses without sharing active counterparty or request details here",
];

const questions: Question[] = [
  { key: "corporate", category: "Corporate records", label: "Core corporate, equity, compensation, and approval records are current.", cleanup: "Centralize corporate approvals, equity records, and governance documents." },
  { key: "ip", category: "IP ownership", label: "Contributor and open-source ownership records are signed and organized.", cleanup: "Close assignment and ownership-record gaps before diligence." },
  { key: "contracts", category: "Customer/vendor contracts", label: "Key contracts are organized and reviewed for deal-sensitive terms.", cleanup: "Flag assignment, termination, and unusual customer commitments." },
  { key: "employment", category: "Employment/contractor", label: "Employment and contractor records are current and organized.", cleanup: "Review contributor agreements and personnel records." },
  { key: "ai-data", category: "AI/data/privacy", label: "AI, privacy, security, vendor, and product-claim records are organized.", cleanup: "Organize AI, privacy, vendor, and product-claim records." },
  { key: "disputes", category: "Disputes/concentration", label: "Disputes, customer concentration, and unusual obligations are tracked.", cleanup: "Assign owners for disputes, concentration, and unusual obligations." },
  { key: "dataroom", category: "Diligence process", label: "A diligence checklist assigns owners for likely requests.", cleanup: "Create a first-pass diligence checklist with owners." },
];

const categoryOrder = ["Corporate records", "IP ownership", "Customer/vendor contracts", "Employment/contractor", "AI/data/privacy", "Disputes/concentration", "Diligence process"];

const noConfidentialNotice =
  "Use categorical answers only. Do not name parties or share confidential deal facts.";

const disclaimerCopy =
  "Educational only—not legal advice, a valuation, or an attorney-client relationship.";

export function FounderMaReadinessChecklist() {
  const [timing, setTiming] = useState(timingOptions[0]);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>(() => Object.fromEntries(questions.map((question) => [question.key, 1])));
  const [contact, setContact] = useState({ name: "", email: "", company: "", roleCategory: "", subscribe: false });
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const result = useMemo(() => {
    const rawScore = questions.reduce((sum, question) => sum + answers[question.key], 0);
    const score = Math.round((rawScore / (questions.length * 2)) * 100);
    const band = score < 45 ? "Diligence readiness map needs cleanup" : score < 75 ? "Useful foundation with diligence gaps" : "Strong foundation for transaction readiness review";
    const categoryScores = categoryOrder.map((category) => {
      const question = questions.find((item) => item.category === category)!;
      return { category, score: Math.round((answers[question.key] / 2) * 100) };
    });
    const diligenceFrictionMap = questions
      .filter((question) => answers[question.key] < 2)
      .sort((left, right) => answers[left.key] - answers[right.key])
      .map((question) => ({ category: question.category, cleanup: question.cleanup }));
    const sixtyDayCleanupPlan = diligenceFrictionMap.slice(0, 5).map((item, index) => `${index < 2 ? "Days 1-20" : index < 4 ? "Days 21-40" : "Days 41-60"}: ${item.cleanup}`);
    const tags = [`ma-readiness-score:${score < 45 ? "urgent" : score < 75 ? "developing" : "strong"}`];

    return { score, band, categoryScores, diligenceFrictionMap, sixtyDayCleanupPlan, tags };
  }, [answers]);

  async function submit() {
    if (!disclaimerAccepted) {
      setMessage("Please accept the educational-use, no-confidential-transaction-information, and no-attorney-client gate before requesting the checklist.");
      return;
    }

    setSubmitting(true);
    setMessage("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignKey: "ma-readiness",
          sourcePage: "founder-ma-readiness-checklist#checklist",
          sourceChannel: "website",
          disclaimerAccepted,
          reportRequested: true,
          privacyGuardrailVersion,
          publicFormInputType,
          contact: { ...contact, role: contact.roleCategory },
          assessment: {
            readinessScore: result.score,
            band: { label: result.band, cta: "Founder M&A Readiness Review" },
            tags: result.tags,
          },
          maReadiness: {
            score: result.score,
            band: result.band,
            timing,
            categoryScores: result.categoryScores,
            buyerDiligenceRiskMap: result.diligenceFrictionMap,
            sixtyDayCleanupPlan: result.sixtyDayCleanupPlan,
            answers,
            reportVersion: "founder-ma-readiness-privacy-guardrail-v2",
          },
        }),
      });
      if (!response.ok) throw new Error("M&A readiness submission failed");
      const data = await response.json();
      setMessage(
        data.mode === "preview"
          ? "Checklist request captured in preview mode. Marketing updates remain off unless the optional updates box was checked."
          : "Checklist request submitted with consent-gated Founder M&A Readiness routing. Marketing nurture remains limited to the optional educational email path you requested.",
      );
    } catch {
      setMessage("The checklist is ready, but live lead routing needs configuration.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div id="checklist" className="grid gap-8 xl:grid-cols-[1fr_0.86fr]">
      <section className="border border-[#d8d0c3] bg-[#fffdf8] p-4 sm:p-5">
        <div className="flex flex-col gap-4 border-b border-[#d8d0c3] pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <BriefcaseBusiness size={24} className="text-[#213f77]" aria-hidden="true" />
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#683ab7]">Founder M&A readiness</div>
            </div>
            <h3 className="mt-3 text-2xl font-semibold text-[#121827]">Map non-financial diligence friction before a buyer or investor controls the process.</h3>
            <p className="mt-3 text-sm leading-6 text-[#5d6678]">{noConfidentialNotice}</p>
          </div>
          <label className="block min-w-64 text-sm font-semibold text-[#121827]">
            Transaction timing
            <select value={timing} onChange={(event) => setTiming(event.target.value)} disabled={!disclaimerAccepted} className="mt-2 h-11 w-full border border-[#c8beb0] bg-white px-3 text-sm font-normal text-[#121827] outline-none focus:border-[#213f77] disabled:cursor-not-allowed disabled:opacity-50">
              {timingOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
        </div>

        <GuardrailNotice title="Before you begin" body={noConfidentialNotice} />
        <label className="mt-4 flex items-start gap-3 border border-[#c8beb0] bg-white p-3 text-sm leading-6 text-[#354054]">
          <input type="checkbox" checked={disclaimerAccepted} onChange={(event) => setDisclaimerAccepted(event.target.checked)} className="mt-1 h-4 w-4 accent-[#213f77]" />
          {disclaimerCopy}
        </label>

        <div className="mt-5 space-y-4">
          {questions.map((question) => (
            <fieldset key={question.key} className="border border-[#e5ded2] bg-white p-3">
              <legend className="px-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#5d6678]">{question.category}</legend>
              <div className="mt-1 text-sm font-semibold leading-6 text-[#121827]">{question.label}</div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {answerOptions.map((option) => {
                  const selected = answers[question.key] === option.value;
                  return (
                    <button key={option.value} type="button" disabled={!disclaimerAccepted} onClick={() => setAnswers((current) => ({ ...current, [question.key]: option.value }))} className={selected ? "min-h-16 border border-[#213f77] bg-[#eef3fb] px-3 py-2 text-left text-sm text-[#121827]" : "min-h-16 border border-[#e5ded2] bg-[#fffdf8] px-3 py-2 text-left text-sm text-[#354054] transition hover:border-[#213f77] disabled:cursor-not-allowed disabled:opacity-50"} aria-pressed={selected}>
                      <span className="block font-semibold">{option.label}</span>
                      <span className="mt-1 block text-xs leading-5 text-[#5d6678]">{option.detail}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      </section>

      <section className="border border-[#c8beb0] bg-[#fffdf8] p-4 shadow-[0_24px_60px_rgba(18,24,39,0.12)] sm:p-5">
        <div className="border-b border-[#d8d0c3] pb-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#683ab7]">Your preview</div>
              <h3 className="mt-2 text-2xl font-semibold text-[#121827]">{result.band}</h3>
            </div>
            <div className="flex h-20 w-20 shrink-0 items-center justify-center border border-[#213f77] bg-[#eef3fb] text-3xl font-semibold text-[#213f77]">{result.score}</div>
          </div>
          <p className="mt-4 text-sm leading-6 text-[#354054]">A practical snapshot—not a valuation, deal prediction, or legal advice.</p>
        </div>

        <div className="mt-4 space-y-3">
          <GuardrailNotice title="Important" body={`${noConfidentialNotice} ${sharedSourceCurrentNotice}`} />
          <GuardrailNotice title="Legal notice" body={sharedConflictEngagementNotice} />
        </div>

        <div className="border-b border-[#d8d0c3] py-5">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#5d6678]"><ShieldAlert size={16} aria-hidden="true" />Diligence friction map</div>
          <div className="mt-4 space-y-3">
            {result.diligenceFrictionMap.slice(0, 5).map((item) => (
              <div key={item.category} className="border-l border-[#b99057] pl-3">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#683ab7]">{item.category}</div>
                <div className="mt-1 text-sm leading-6 text-[#354054]">{item.cleanup}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="py-5">
          <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[#5d6678]">60-day cleanup plan</div>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-[#354054]">
            {result.sixtyDayCleanupPlan.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </div>

        <div className="border border-[#213f77] bg-[#eef3fb] p-4">
          <div className="text-sm font-semibold text-[#121827]">Recommended service path</div>
          <p className="mt-2 text-sm leading-6 text-[#354054]">Founder M&A Readiness Review: sequence corporate, IP, contracts, employment, AI/data, privacy/security, and diligence-process cleanup before the request list arrives.</p>
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
          Email me this checklist and related educational updates. I can unsubscribe anytime.
        </label>
        {!contact.subscribe ? <div className="mt-3 flex gap-2 text-xs leading-5 text-[#6b4b13]"><AlertTriangle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />Marketing emails are off; the checklist still works.</div> : null}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={submit} disabled={submitting || !contact.email || !disclaimerAccepted} className="inline-flex h-12 items-center justify-center gap-2 border border-[#121827] bg-[#121827] px-5 text-sm font-semibold text-white transition hover:bg-[#213f77] disabled:cursor-not-allowed disabled:opacity-50">
            {submitting ? "Preparing checklist request..." : "Request my checklist"}
            <MailCheck size={17} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => window.print()} className="inline-flex h-12 items-center justify-center gap-2 border border-[#c8beb0] bg-[#fffdf8] px-5 text-sm font-semibold text-[#121827] transition hover:border-[#213f77]">
            Print / save PDF
            <Download size={17} aria-hidden="true" />
          </button>
        </div>
        {message ? <p className="mt-3 text-sm leading-6 text-[#354054]">{message}</p> : null}
        <p className="mt-5 text-xs leading-5 text-[#5d6678]">Educational only—not legal advice, a valuation, or an attorney-client relationship. Do not share confidential facts.</p>
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
