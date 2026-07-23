"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  Download,
  MailCheck,
  Scale,
} from "lucide-react";
import {
  GuardrailNotice,
  privacyGuardrailVersion,
  publicFormInputType,
  roleCategoryOptions,
  sharedConflictEngagementNotice,
  sharedSourceCurrentNotice,
} from "./lead-magnet-guardrails";

type Status = "idle" | "submitting" | "done" | "error";

type AnswerValue = 0 | 1 | 2;

type Question = {
  key: string;
  category: string;
  label: string;
  gap: string;
};

type AiUseRegisterQuestion = {
  key: "inventory" | "ownerMap" | "exposureCategory" | "vendorTerms" | "humanReview";
  lane: string;
  label: string;
  gap: string;
};

const answerOptions: { value: AnswerValue; label: string; detail: string }[] = [
  { value: 0, label: "Not yet", detail: "Needs legal operating attention" },
  { value: 1, label: "Partly", detail: "Started, but not systematic" },
  { value: 2, label: "Yes", detail: "Documented and repeatable" },
];

const aiUseRegisterQuestions: AiUseRegisterQuestion[] = [
  {
    key: "inventory",
    lane: "Use case + owner",
    label: "AI tools, vendor products, and customer-facing AI features are listed in one working register.",
    gap: "Create a one-page AI use register before trying to write a broader policy.",
  },
  {
    key: "ownerMap",
    lane: "Use case + owner",
    label: "Each AI use case has a named business owner or owning function.",
    gap: "Assign an owner for each AI use so legal, security, product, HR, or finance questions have a clear path.",
  },
  {
    key: "exposureCategory",
    lane: "Data + decision exposure",
    label: "Each use is categorized by data exposure and whether outputs affect customers, employees, investors, or regulated decisions.",
    gap: "Categorize use cases by high-level exposure: customer data, employee data, regulated/high-impact decisions, invention/R&D output, or external product claims.",
  },
  {
    key: "vendorTerms",
    lane: "Vendor/IP/contract terms",
    label: "Leadership knows where vendor terms address confidentiality, IP, security, indemnity, audit rights, and data use.",
    gap: "Locate the controlling vendor/customer contract terms before renewal, launch, diligence, or customer security review.",
  },
  {
    key: "humanReview",
    lane: "Human review + evidence trail",
    label: "Human review, recordkeeping, and escalation paths are documented for material AI outputs.",
    gap: "Define what gets human review, what evidence is kept, and when a use case escalates to legal/security review.",
  },
];

const questions: Question[] = [
  { key: "contract-templates", category: "Contract Stack", label: "Core customer, vendor, NDA, and partner templates are current and used consistently.", gap: "Refresh the contract stack and create a simple intake path for nonstandard terms." },
  { key: "contract-ownership", category: "Contract Stack", label: "Someone owns contract review, approval thresholds, and renewal / obligation tracking.", gap: "Assign contract ownership and define approval rules before renewals or enterprise deals pile up." },
  { key: "invention-assignments", category: "IP Ownership", label: "Employee, founder, advisor, and contractor invention assignments are signed and centralized.", gap: "Close assignment gaps across founders, employees, advisors, and contractors." },
  { key: "ip-roadmap", category: "IP Ownership", label: "Patent, trade secret, open-source, and product roadmap decisions are reviewed together.", gap: "Tie IP strategy to the product roadmap instead of treating filings and code decisions separately." },
  { key: "hiring-docs", category: "Workforce", label: "Offer letters, contractor agreements, confidentiality terms, and handbook basics are current.", gap: "Clean up workforce documents before the next hiring wave or contractor-heavy sprint." },
  { key: "people-risk", category: "Workforce", label: "Equity, classification, termination, and sensitive employee issues have an escalation path.", gap: "Create a people-risk escalation path for classification, equity, termination, and disputes." },
  { key: "data-map", category: "Data + AI", label: "The company can identify sensitive data, key systems, AI vendors, and customer-facing AI uses.", gap: "Build a practical data and AI inventory before vendor, customer, or regulatory questions land." },
  { key: "ai-controls", category: "Data + AI", label: "AI use has basic guardrails for confidentiality, human review, records, and vendor terms.", gap: "Put lightweight AI guardrails around confidentiality, review, vendor terms, and records." },
  { key: "financing-diligence", category: "Financing + Deals", label: "Cap table, board approvals, commercial contracts, and diligence materials are organized.", gap: "Assemble financing and diligence materials before a fundraise, strategic deal, or buyer request." },
  { key: "legal-roadmap", category: "Financing + Deals", label: "Legal priorities are sequenced against the next milestone: hiring, enterprise sales, funding, or M&A.", gap: "Convert scattered legal tasks into a milestone-based 30 / 60 / 90-day operating plan." },
];

const categoryOrder = ["Contract Stack", "IP Ownership", "Workforce", "Data + AI", "Financing + Deals"];

const stageOptions = [
  "Pre-seed / seed",
  "Series A or growth",
  "Enterprise sales motion",
  "Preparing financing, partnership, or exit",
];

const noConfidentialNotice =
  "Use categorical answers only. Do not include customer names, employee issues, disputes, contract language, financial details, trade secrets, source code, private diligence requests, or other confidential facts.";

const disclaimerCopy =
  "I understand this checklist is educational only, uses non-confidential categorical inputs, is not legal advice, is not a compliance, patentability, or transaction-readiness determination, and does not create an attorney-client relationship.";

const cleanupRecommendations: Record<string, { workstream: string; action: string; resource: string }> = {
  "Contract Stack": {
    workstream: "Sales paper and contract approval thresholds",
    action: "List the five agreements used most often, name the owner for each, and mark which templates or approval rules look stale before the next customer or vendor negotiation.",
    resource: "Use the Tech Company OGC Launchpad page to decide whether a bounded contract-stack review would help before enterprise deals, renewals, or partner negotiations.",
  },
  "IP Ownership": {
    workstream: "Founder, employee, advisor, and contractor invention records",
    action: "Build a non-confidential inventory of who has contributed product, code, content, or inventions and whether signed assignment records are centrally stored.",
    resource: "If the ownership gap connects to AI-assisted invention work, compare this snapshot to the AI Patent Strategy Scorecard before requesting company-specific advice.",
  },
  Workforce: {
    workstream: "Hiring, contractor, confidentiality, and people-risk records",
    action: "Identify the next hiring or contractor milestone, then confirm who owns offer letters, contractor agreements, confidentiality terms, and escalation rules.",
    resource: "Use this result as an agenda for a legal operating review if workforce documents are becoming a repeat bottleneck.",
  },
  "Data + AI": {
    workstream: "Practical data and AI inventory controls",
    action: "Create a short inventory of sensitive data, AI tools, vendors, human-review points, and records that matter for customers or regulators.",
    resource: "If the lowest gap is AI/data, the AI Compliance Gameplan Builder can provide a separate governance-focused diagnostic without enrolling this checklist into another workflow.",
  },
  "Financing + Deals": {
    workstream: "Financing, board, diligence, and milestone records",
    action: "Pick the next funding, partnership, or exit milestone and list the corporate, commercial, IP, people, and data records a reviewer would likely ask to see.",
    resource: "If a financing or buyer process is near, compare this result to the Founder M&A Readiness Checklist for a deal-readiness-specific view.",
  },
};

function categorySlug(value: string) {
  return value.toLowerCase().replaceAll(" + ", "-").replaceAll(" ", "-");
}

function cleanupRecommendation(category: string) {
  return cleanupRecommendations[category] ?? cleanupRecommendations["Contract Stack"];
}

export function TechGcLegalHealthChecklist({ sourcePage }: { sourcePage: string }) {
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>(() =>
    Object.fromEntries(questions.map((question) => [question.key, 1])),
  );
  const [aiRegisterAnswers, setAiRegisterAnswers] = useState<Record<string, AnswerValue>>(() =>
    Object.fromEntries(aiUseRegisterQuestions.map((question) => [question.key, 1])),
  );
  const [stage, setStage] = useState(stageOptions[0]);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    company: "",
    roleCategory: "",
    subscribe: false,
  });

  const result = useMemo(() => {
    const totalPossible = questions.length * 2;
    const total = questions.reduce((sum, question) => sum + answers[question.key], 0);
    const score = Math.round((total / totalPossible) * 100);
    const categoryScores = categoryOrder.map((category) => {
      const categoryQuestions = questions.filter((question) => question.category === category);
      const categoryTotal = categoryQuestions.reduce((sum, question) => sum + answers[question.key], 0);
      const categoryScore = Math.round((categoryTotal / (categoryQuestions.length * 2)) * 100);
      return { category, score: categoryScore, missing: categoryQuestions.filter((question) => answers[question.key] < 2).length };
    });
    const gaps = questions
      .filter((question) => answers[question.key] < 2)
      .sort((left, right) => answers[left.key] - answers[right.key])
      .slice(0, 4)
      .map((question) => ({ category: question.category, gap: question.gap }));
    const band = score < 45 ? "Legal operating system needs attention" : score < 75 ? "Good foundation with visible gaps" : "Strong foundation for a legal operating review";
    const topCategory = [...categoryScores].sort((left, right) => left.score - right.score)[0];
    const branchSignals = [
      topCategory.category === "Data + AI" ? "signal:ai-compliance" : null,
      topCategory.category === "IP Ownership" ? "signal:ai-patent" : null,
      topCategory.category === "Financing + Deals" ? "signal:ma-readiness" : null,
    ].filter((item): item is string => Boolean(item));
    const aiRegisterTotalPossible = aiUseRegisterQuestions.length * 2;
    const aiRegisterTotal = aiUseRegisterQuestions.reduce((sum, question) => sum + aiRegisterAnswers[question.key], 0);
    const aiRegisterScore = Math.round((aiRegisterTotal / aiRegisterTotalPossible) * 100);
    const aiRegisterGaps = aiUseRegisterQuestions
      .filter((question) => aiRegisterAnswers[question.key] < 2)
      .sort((left, right) => aiRegisterAnswers[left.key] - aiRegisterAnswers[right.key]);
    const aiRegisterNextStep =
      aiRegisterGaps[0]?.gap ??
      "Keep the AI use register current before vendor renewal, product launch, financing, diligence, or customer security review.";
    const tags = [
      `tech-gc-score:${score < 45 ? "urgent" : score < 75 ? "developing" : "strong"}`,
      `tech-gc-gap:${categorySlug(topCategory.category)}`,
      `ai-use-register:${aiRegisterScore < 45 ? "not-visible" : aiRegisterScore < 75 ? "partial" : "visible"}`,
    ];

    const cleanup = cleanupRecommendation(topCategory.category);
    const aiUseRegister = {
      score: aiRegisterScore,
      gaps: aiRegisterGaps,
      nextStep: aiRegisterNextStep,
      snapshot: {
        inventory: answerOptions.find((option) => option.value === aiRegisterAnswers.inventory)?.label,
        ownerMap: answerOptions.find((option) => option.value === aiRegisterAnswers.ownerMap)?.label,
        exposureCategory: answerOptions.find((option) => option.value === aiRegisterAnswers.exposureCategory)?.label,
        vendorTerms: answerOptions.find((option) => option.value === aiRegisterAnswers.vendorTerms)?.label,
        humanReview: answerOptions.find((option) => option.value === aiRegisterAnswers.humanReview)?.label,
        score: aiRegisterScore,
        nextStep: aiRegisterNextStep,
        reportVersion: "ai-use-register-snapshot-v1",
      },
    };

    return { score, categoryScores, gaps, band, topCategory, branchSignals, tags, cleanup, aiUseRegister };
  }, [answers, aiRegisterAnswers]);

  async function submit() {
    if (!disclaimerAccepted) {
      setMessage("Please accept the educational-use, no-confidential-information, and no-attorney-client gate before requesting the checklist.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const answerKeys = Object.entries(answers).map(([key, value]) => `${key}:${value}`);
      const aiRegisterAnswerKeys = Object.entries(aiRegisterAnswers).map(([key, value]) => `ai-use-register-${key}:${value}`);
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignKey: "tech-gc",
          sourcePage: `${sourcePage}#lead-magnet`,
          sourceChannel: "website",
          disclaimerAccepted,
          reportRequested: true,
          privacyGuardrailVersion,
          publicFormInputType,
          contact: { ...contact, role: contact.roleCategory },
          assessment: {
            readinessScore: result.score,
            band: {
              label: result.band,
              cta: "Tech Company OGC Launchpad",
            },
            tags: result.tags,
          },
          techLegalHealth: {
            score: result.score,
            band: result.band,
            companyMoment: stage,
            categoryScores: result.categoryScores,
            lowestCategory: result.topCategory.category,
            topActions: result.gaps.map((gap) => gap.gap),
            branchSignals: result.branchSignals,
            answers: [...answerKeys, ...aiRegisterAnswerKeys],
            aiUseRegisterSnapshot: result.aiUseRegister.snapshot,
            reportVersion: "tech-legal-health-privacy-guardrail-v2",
          },
        }),
      });

      if (!response.ok) throw new Error("Tech GC checklist submission failed");

      const data = await response.json();
      setStatus("done");
      setMessage(
        contact.subscribe
          ? data.mode === "preview"
            ? "Preview-only opt-in routing recorded locally. Email follow-up remains subject to approved workflow, suppression, and privacy guardrails before any delivery."
            : "Because you opted in, the Tech GC report request was submitted through the consent-gated path; any nurture remains subject to approved safeguards."
          : "You have not requested email follow-up. Your basic educational result remains visible on this page; no report email, nurture workflow, SMS, DM, social message, or other outbound follow-up is triggered from this checklist.",
      );
    } catch {
      setStatus("error");
      setMessage("The checklist is ready, but live lead routing needs configuration.");
    }
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_0.86fr]">
      <section className="border border-[#d8d0c3] bg-[#fffdf8] p-4 sm:p-5">
        <div className="flex flex-col gap-4 border-b border-[#d8d0c3] pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <BriefcaseBusiness size={24} className="text-[#213f77]" aria-hidden="true" />
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#683ab7]">Tech company legal health</div>
            </div>
            <h3 className="mt-3 text-2xl font-semibold text-[#121827]">Score the legal operating layer without sharing confidential facts.</h3>
            <p className="mt-3 text-sm leading-6 text-[#5d6678]">{noConfidentialNotice}</p>
          </div>
          <label className="block min-w-56 text-sm font-semibold text-[#121827]">
            Company moment
            <select value={stage} onChange={(event) => setStage(event.target.value)} disabled={!disclaimerAccepted} className="mt-2 h-11 w-full border border-[#c8beb0] bg-white px-3 text-sm font-normal text-[#121827] outline-none focus:border-[#213f77] disabled:cursor-not-allowed disabled:opacity-50">
              {stageOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
        </div>

        <GuardrailNotice title="Disclaimer gate before intake" body={`${noConfidentialNotice} This checklist is educational only, is not legal advice, is not a compliance, patentability, or transaction-readiness determination, and does not create an attorney-client relationship.`} />
        <label className="mt-4 flex items-start gap-3 border border-[#c8beb0] bg-white p-3 text-sm leading-6 text-[#354054]">
          <input type="checkbox" checked={disclaimerAccepted} onChange={(event) => setDisclaimerAccepted(event.target.checked)} className="mt-1 h-4 w-4 accent-[#213f77]" />
          {disclaimerCopy}
        </label>

        <div className="mt-5 border border-[#d8d0c3] bg-white p-4">
          <div className="flex items-center gap-3">
            <ClipboardList size={22} className="text-[#213f77]" aria-hidden="true" />
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#683ab7]">AI Use Register Snapshot</div>
              <h4 className="mt-1 text-lg font-semibold text-[#121827]">Start with the Colorado Tech Company Legal Health Checklist, then make AI use visible.</h4>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#354054]">
            This module turns the AI use-register idea into a categorical, non-confidential lead magnet: who owns the use case, where data and decisions are exposed, what contract terms control the tool, and what human review or evidence trail exists.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {aiUseRegisterQuestions.map((question) => (
              <fieldset key={question.key} className="border border-[#e5ded2] bg-[#fffdf8] p-3">
                <legend className="px-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#5d6678]">{question.lane}</legend>
                <div className="mt-1 text-sm font-semibold leading-6 text-[#121827]">{question.label}</div>
                <div className="mt-3 grid gap-2">
                  {answerOptions.map((option) => {
                    const selected = aiRegisterAnswers[question.key] === option.value;
                    return (
                      <button key={option.value} type="button" disabled={!disclaimerAccepted} onClick={() => setAiRegisterAnswers((current) => ({ ...current, [question.key]: option.value }))} className={selected ? "border border-[#213f77] bg-[#eef3fb] px-3 py-2 text-left text-sm text-[#121827]" : "border border-[#e5ded2] bg-white px-3 py-2 text-left text-sm text-[#354054] transition hover:border-[#213f77] disabled:cursor-not-allowed disabled:opacity-50"} aria-pressed={selected}>
                        <span className="font-semibold">{option.label}</span>
                        <span className="ml-2 text-xs leading-5 text-[#5d6678]">{option.detail}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {questions.map((question) => (
            <fieldset key={question.key} className="border border-[#e5ded2] bg-white p-3">
              <legend className="px-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#5d6678]">{question.category}</legend>
              <div className="mt-1 text-sm font-semibold leading-6 text-[#121827]">{question.label}</div>
              <p className="mt-2 text-xs leading-5 text-[#6b4b13]">Categorical answer only. {noConfidentialNotice}</p>
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
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#683ab7]">Your legal health snapshot is ready.</div>
              <h3 className="mt-2 text-2xl font-semibold text-[#121827]">Overall readiness band: {result.band}</h3>
            </div>
            <div className="flex h-20 w-20 shrink-0 items-center justify-center border border-[#213f77] bg-[#eef3fb] text-3xl font-semibold text-[#213f77]" aria-label={`Readiness score ${result.score}`}>{result.score}</div>
          </div>
          <p className="mt-4 text-sm leading-6 text-[#354054]">Here is a practical readiness snapshot based on your non-confidential checklist answers. Lowest category: {result.topCategory.category}. Use this as educational triage for choosing a first cleanup workstream, not as legal advice, legal determination, or a privileged submission.</p>
          <p className="mt-3 text-sm leading-6 text-[#6b4b13]">You can use this browser result without joining an email sequence. If you do not opt in below, no Tech GC report email or educational nurture sequence should be triggered from this checklist.</p>
        </div>

        <div className="mt-4 space-y-3">
          <GuardrailNotice title="Report-page warning" body={`${noConfidentialNotice} ${sharedSourceCurrentNotice}`} />
          <GuardrailNotice title="Conflicts and engagement caveat" body={sharedConflictEngagementNotice} />
        </div>

        <div className="py-5">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#5d6678]"><Scale size={16} aria-hidden="true" />Category scores</div>
          <div className="mt-4 space-y-3">
            {result.categoryScores.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between gap-4 text-sm"><span className="font-semibold text-[#121827]">{item.category}</span><span className="text-[#5d6678]">{item.score}</span></div>
                <div className="mt-2 h-2 bg-[#e5ded2]"><div className="h-2 bg-[#b99057]" style={{ width: `${item.score}%` }} aria-hidden="true" /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-y border-[#d8d0c3] py-5">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#5d6678]"><ClipboardList size={16} aria-hidden="true" />AI use register control layer</div>
          <div className="mt-4 border border-[#d8d0c3] bg-white p-4">
            <div className="flex items-center justify-between gap-4 text-sm"><span className="font-semibold text-[#121827]">AI Use Register Snapshot</span><span className="text-[#5d6678]">{result.aiUseRegister.score}</span></div>
            <div className="mt-2 h-2 bg-[#e5ded2]"><div className="h-2 bg-[#55776a]" style={{ width: `${result.aiUseRegister.score}%` }} aria-hidden="true" /></div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                ["Use case + owner", `${result.aiUseRegister.snapshot.inventory} / ${result.aiUseRegister.snapshot.ownerMap}`],
                ["Data + decision exposure", result.aiUseRegister.snapshot.exposureCategory],
                ["Vendor/IP/contract terms", result.aiUseRegister.snapshot.vendorTerms],
                ["Human review + evidence trail", result.aiUseRegister.snapshot.humanReview],
              ].map(([label, value]) => (
                <div key={label} className="border-l border-[#b99057] pl-3">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#683ab7]">{label}</div>
                  <div className="mt-1 text-sm leading-6 text-[#354054]">{value}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-[#354054]">Suggested AI-register next step: {result.aiUseRegister.nextStep}</p>
          </div>
        </div>

        <div className="border-b border-[#d8d0c3] py-5">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#5d6678]"><AlertTriangle size={16} aria-hidden="true" />Top category gaps</div>
          <div className="mt-4 space-y-3">
            {result.gaps.length ? result.gaps.map((item) => (
              <div key={`${item.category}-${item.gap}`} className="border-l border-[#b99057] pl-3">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#683ab7]">{item.category}</div>
                <div className="mt-1 text-sm leading-6 text-[#354054]">{item.gap}</div>
              </div>
            )) : <div className="flex items-start gap-2 text-sm leading-6 text-[#354054]"><CheckCircle2 size={17} className="mt-1 text-[#55776a]" aria-hidden="true" />No obvious checklist gaps from these non-confidential inputs.</div>}
          </div>
        </div>

        {result.branchSignals.length ? (
          <div className="mt-5 border border-[#d8d0c3] bg-white p-3 text-sm leading-6 text-[#354054]">
            If the lowest category points to AI/data, invention records, or transaction readiness, consider the matching separate diagnostic. This checklist records internal branch signals only and does not enroll you into another workflow.
          </div>
        ) : null}

        <div className="mt-5 grid gap-3">
          <div className="border border-[#d8d0c3] bg-white p-4">
            <div className="text-sm font-semibold text-[#121827]">Suggested first cleanup workstream</div>
            <p className="mt-2 text-sm leading-6 text-[#354054]">{result.cleanup.workstream}</p>
          </div>
          <div className="border border-[#d8d0c3] bg-white p-4">
            <div className="text-sm font-semibold text-[#121827]">10-day operating action</div>
            <p className="mt-2 text-sm leading-6 text-[#354054]">{result.cleanup.action}</p>
          </div>
          <div className="border border-[#d8d0c3] bg-white p-4">
            <div className="text-sm font-semibold text-[#121827]">Optional next-step resources</div>
            <p className="mt-2 text-sm leading-6 text-[#354054]">{result.cleanup.resource}</p>
          </div>
        </div>

        <div className="mt-5 border border-[#213f77] bg-[#eef3fb] p-4">
          <div className="text-sm font-semibold text-[#121827]">Recommended service path</div>
          <p className="mt-2 text-sm leading-6 text-[#354054]">Tech Company OGC Launchpad: turn this snapshot into a prioritized legal operating review across contracts, IP, workforce, data, AI, financing, and deal readiness.</p>
        </div>

        <div className="mt-6 border border-[#d8d0c3] bg-white p-4">
          <div className="text-sm font-semibold text-[#121827]">Want a copy of the full checklist report by email?</div>
          <p className="mt-2 text-sm leading-6 text-[#354054]">Optional: request the report and related educational follow-up from Whiteford/Schell IP. The browser snapshot above is available whether or not you opt in.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Input label="Name" value={contact.name} onChange={(name) => setContact((current) => ({ ...current, name }))} />
            <Input label="Email" type="email" value={contact.email} onChange={(email) => setContact((current) => ({ ...current, email }))} />
            <Input label="Company" value={contact.company} onChange={(company) => setContact((current) => ({ ...current, company }))} />
            <SelectInput label="Role category" value={contact.roleCategory} options={roleCategoryOptions} onChange={(roleCategory) => setContact((current) => ({ ...current, roleCategory }))} />
          </div>
          <GuardrailNotice title="Final-submit warning" body={`${noConfidentialNotice} ${sharedConflictEngagementNotice}`} />
          <label className="mt-4 flex items-start gap-3 text-sm leading-6 text-[#354054]">
            <input type="checkbox" checked={contact.subscribe} onChange={(event) => setContact((current) => ({ ...current, subscribe: event.target.checked }))} className="mt-1 h-4 w-4 accent-[#213f77]" />
            Yes, send me the Tech Company Legal Health Checklist report and related educational emails. Optional; I can unsubscribe at any time. I understand this form is not for confidential information and does not create an attorney-client relationship.
          </label>
          {!contact.subscribe ? <div className="mt-3 flex gap-2 text-xs leading-5 text-[#6b4b13]"><AlertTriangle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />Marketing updates are off. Your basic educational checklist result remains on this page only; no report email, nurture workflow, SMS, DM, social message, or other outbound follow-up is triggered unless you opt in and the approved safeguards apply.</div> : null}
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={submit} disabled={status === "submitting" || !contact.email || !disclaimerAccepted} className="inline-flex h-12 items-center justify-center gap-2 border border-[#121827] bg-[#121827] px-5 text-sm font-semibold text-white transition hover:bg-[#213f77] disabled:cursor-not-allowed disabled:opacity-50">
            {status === "submitting" ? "Preparing checklist request..." : contact.subscribe ? "Send the full report by email" : "Save no-email result state"}
            <MailCheck size={17} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => window.print()} className="inline-flex h-12 items-center justify-center gap-2 border border-[#c8beb0] bg-[#fffdf8] px-5 text-sm font-semibold text-[#121827] transition hover:border-[#213f77]">
            Print / save PDF
            <Download size={17} aria-hidden="true" />
          </button>
        </div>
        {message ? <p className="mt-3 text-sm leading-6 text-[#354054]">{message}</p> : null}
        <p className="mt-5 text-xs leading-5 text-[#5d6678]">Educational material only. This checklist does not create legal advice, a compliance determination, a patentability assessment, a transaction-readiness guarantee, or an attorney-client relationship. Do not submit confidential or sensitive facts.</p>
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
