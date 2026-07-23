"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  ClipboardCheck,
  Download,
  MailCheck,
  ShieldAlert,
} from "lucide-react";
import {
  GuardrailNotice,
  privacyGuardrailVersion,
  publicFormInputType,
  roleCategoryOptions,
  sharedConflictEngagementNotice,
  sharedSourceCurrentNotice,
} from "./lead-magnet-guardrails";

type AnswerValue = 0 | 1 | 2;
type Status = "idle" | "submitting" | "done" | "error";

type Contact = {
  name: string;
  email: string;
  company: string;
  roleCategory: string;
  subscribe: boolean;
};

type Question = {
  key: string;
  category: string;
  label: string;
  detail: string;
  gap: string;
  nextStep: string;
  riskWeight: number;
};

const initialContact: Contact = {
  name: "",
  email: "",
  company: "",
  roleCategory: "",
  subscribe: false,
};

const answerOptions: { value: AnswerValue; label: string; detail: string }[] = [
  { value: 0, label: "Not sure / not yet", detail: "Needs counsel or owner review" },
  { value: 1, label: "Partly", detail: "Started, but not reliable" },
  { value: 2, label: "Yes", detail: "Documented and repeatable" },
];

const noConfidentialNotice =
  "Use categorical answers only. Do not share names or confidential facts.";

const sourceCurrentNotice = sharedSourceCurrentNotice;

const conflictEngagementNotice = sharedConflictEngagementNotice;

const questions: Question[] = [
  {
    key: "use-case-inventory",
    category: "Use-Case Inventory",
    label: "AI uses are inventoried by owner, vendor, data, and decision impact.",
    detail: "Include internal, product, and unapproved tools.",
    gap: "Build an AI use and vendor inventory before questions become reactive.",
    nextStep: "List each AI use, owner, vendor, data type, and decision impact.",
    riskWeight: 13,
  },
  {
    key: "vendor-risk",
    category: "Vendor Risk",
    label: "AI vendor terms are reviewed for data, IP, security, and liability.",
    detail: "Include standalone tools and AI features in SaaS products.",
    gap: "Prioritize contracts for tools touching sensitive or regulated data.",
    nextStep: "Triage AI vendors by data and output risk.",
    riskWeight: 14,
  },
  {
    key: "human-review",
    category: "Human Review",
    label: "Material AI outputs have human review and escalation paths.",
    detail: "Focus on customer, employment, pricing, and eligibility decisions.",
    gap: "Define when people must review and document AI-assisted decisions.",
    nextStep: "Set human-review rules for material AI outputs.",
    riskWeight: 14,
  },
  {
    key: "data-sensitivity",
    category: "Data Sensitivity",
    label: "Sensitive data is mapped before it enters an AI system.",
    detail: "Include prompts, uploads, training, logs, and retention.",
    gap: "Map sensitive data flows before expanding AI use.",
    nextStep: "Map sensitive data across prompts, uploads, logs, and retention.",
    riskWeight: 15,
  },
  {
    key: "governance-owner",
    category: "Governance Owner",
    label: "A named owner controls AI intake, approvals, exceptions, and reporting.",
    detail: "The owner coordinates legal, security, product, HR, and operations.",
    gap: "Assign an AI governance owner with clear authority.",
    nextStep: "Name the AI owner and define approval thresholds.",
    riskWeight: 10,
  },
  {
    key: "customer-facing-ai",
    category: "Customer-Facing AI",
    label: "Customer-facing AI claims, outputs, and notices are reviewed before release.",
    detail: "Include chat, scoring, summaries, agents, and copilots.",
    gap: "Review customer-facing AI claims and controls before launch.",
    nextStep: "Audit AI claims, notices, error handling, and escalation.",
    riskWeight: 12,
  },
  {
    key: "employment-hr-ai",
    category: "Employment / HR AI",
    label: "Employment-related AI receives added legal and human review.",
    detail: "Include hiring, performance, scheduling, monitoring, and compensation.",
    gap: "Treat employment AI as a separate high-risk workstream.",
    nextStep: "Inventory HR AI and map bias, notice, and review controls.",
    riskWeight: 13,
  },
  {
    key: "mountain-west-readiness",
    category: "Colorado / Mountain West",
    label: "Colorado and Mountain West AI obligations are tracked.",
    detail: "Track changing privacy, employment, and consumer rules.",
    gap: "Track regional obligations by use case, vendor, and notice.",
    nextStep: "Map regional exposure against current AI uses.",
    riskWeight: 9,
  },
];

const categoryOrder = questions.map((question) => question.category);

function getBand(score: number, riskScore: number) {
  if (score < 45 || riskScore >= 72) {
    return {
      label: "High readiness priority",
      tone: "bg-[#f8e7df] text-[#7f2d1d]",
      cta: "AI Compliance Readiness Sprint",
      maturity: "Early / reactive",
      summary:
        "The categorical answers point to several controls that should be organized and reviewed before AI use expands.",
    };
  }
  if (score < 72 || riskScore >= 44) {
    return {
      label: "Elevated implementation need",
      tone: "bg-[#f7eddc] text-[#6b4b13]",
      cta: "AI Compliance Readiness Sprint",
      maturity: "Developing controls",
      summary:
        "There is a workable foundation, with several controls that should become documented, owned, and repeatable.",
    };
  }
  return {
    label: "Baseline governance foundation",
    tone: "bg-[#e7f0ea] text-[#315c4c]",
    cta: "AI Governance Operating System",
    maturity: "Repeatable foundation",
    summary:
      "The core readiness pieces are visible. The next step is validation, operating cadence, and customer-ready evidence.",
  };
}

function slug(value: string) {
  return value.toLowerCase().replaceAll(" / ", "-").replaceAll(" ", "-");
}

export function GameplanBuilder() {
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>(() =>
    Object.fromEntries(questions.map((question) => [question.key, 1])),
  );
  const [contact, setContact] = useState<Contact>(initialContact);
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const assessment = useMemo(() => {
    const totalPossible = questions.length * 2;
    const total = questions.reduce((sum, question) => sum + answers[question.key], 0);
    const score = Math.round((total / totalPossible) * 100);
    const riskScore = Math.min(
      100,
      questions.reduce((sum, question) => {
        const answer = answers[question.key];
        return sum + (2 - answer) * question.riskWeight;
      }, 0),
    );
    const categoryScores = categoryOrder.map((category) => {
      const question = questions.find((item) => item.category === category);
      const value = question ? answers[question.key] : 0;
      return {
        category,
        score: Math.round((value / 2) * 100),
        status: value === 2 ? "Visible" : value === 1 ? "Partly visible" : "Needs review",
      };
    });
    const topGaps = questions
      .filter((question) => answers[question.key] < 2)
      .sort((left, right) => {
        const answerDelta = answers[left.key] - answers[right.key];
        return answerDelta === 0 ? right.riskWeight - left.riskWeight : answerDelta;
      })
      .slice(0, 4)
      .map((question) => ({
        category: question.category,
        gap: question.gap,
        nextStep: question.nextStep,
      }));
    const lowestCategory = [...categoryScores].sort((left, right) => left.score - right.score)[0];
    const band = getBand(score, riskScore);
    const recommendedNextStep =
      topGaps[0]?.nextStep ??
      "Validate the operating cadence, evidence locations, and escalation rules with counsel.";
    const readinessHeatMap = categoryScores.map((item) => ({
      workstream: item.category,
      status: item.status,
      score: item.score,
    }));
    const tenDayFixes = topGaps
      .slice(0, 3)
      .map((item) => item.nextStep)
      .concat(
        topGaps.length
          ? []
          : ["Confirm owners, evidence locations, and escalation rules for the current AI governance operating cadence."],
      );
    const roadmap306090 = [
      `Next 30 days: ${topGaps[0]?.nextStep ?? "validate the AI inventory and evidence map."}`,
      `Next 60 days: ${topGaps[1]?.nextStep ?? "test vendor, human-review, data, and customer-facing controls."}`,
      "Next 90 days: convert the gameplan into intake, approvals, records, training, and recurring governance reporting.",
    ];
    const tags = [
      `ai-score-band:${score < 45 ? "high-priority" : score < 72 ? "developing" : "baseline"}`,
      `ai-top-driver:${slug(lowestCategory.category)}`,
      `ai-readiness-priority:${band.label.toLowerCase().replaceAll(" ", "-")}`,
    ];

    return {
      score,
      riskScore,
      categoryScores,
      topGaps,
      band,
      recommendedNextStep,
      readinessHeatMap,
      tenDayFixes,
      roadmap306090,
      tags,
    };
  }, [answers]);

  async function submitLead() {
    if (!disclaimerAccepted) {
      setSubmitMessage("Please accept the educational-use, no-confidential-information, and no-attorney-client gate before requesting the report.");
      return;
    }

    setStatus("submitting");
    setSubmitMessage("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignKey: "ai-compliance",
          sourcePage: "ai-compliance-gameplan",
          sourceChannel: "website",
          disclaimerAccepted,
          reportRequested: true,
          privacyGuardrailVersion,
          publicFormInputType,
          contact: { ...contact, role: contact.roleCategory },
          assessment: {
            riskScore: assessment.riskScore,
            readinessScore: assessment.score,
            band: { label: assessment.band.label, cta: assessment.band.cta },
            tags: assessment.tags,
          },
          aiComplianceGameplan: {
            maturityLevel: assessment.band.maturity,
            categoryScores: assessment.categoryScores,
            topGaps: assessment.topGaps,
            recommendedNextStep: assessment.recommendedNextStep,
            readinessHeatMap: assessment.readinessHeatMap,
            tenDayFixes: assessment.tenDayFixes,
            roadmap306090: assessment.roadmap306090,
            reportVersion: "ai-compliance-gameplan-privacy-guardrail-v2",
          },
        }),
      });
      if (!response.ok) {
        throw new Error("Lead submission failed");
      }
      const data = await response.json();
      setStatus("done");
      setSubmitMessage(
        data.mode === "preview"
          ? "Report request captured in preview mode. Marketing nurture remains off unless the optional updates box was checked."
          : "Report request submitted with consent-gated routing. Marketing nurture remains separate from transactional report delivery.",
      );
    } catch {
      setStatus("error");
      setSubmitMessage("The gameplan preview is ready, but live lead routing needs configuration.");
    }
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_0.88fr]">
      <section className="border border-[#d8d0c3] bg-[#fffdf8] p-4 sm:p-5">
        <div className="border-b border-[#d8d0c3] pb-5">
          <div className="flex items-center gap-3">
            <ClipboardCheck size={24} className="text-[#213f77]" aria-hidden="true" />
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#683ab7]">
              Assessment inputs
            </div>
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-[#121827]">
            Score AI readiness without sharing confidential facts.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#5d6678]">Answer each item using the closest fit. Nothing is sent until you request the report.</p>
        </div>

        <GuardrailNotice
          title="Before you begin"
          body={noConfidentialNotice}
        />
        <label className="mt-4 flex items-start gap-3 border border-[#c8beb0] bg-white p-3 text-sm leading-6 text-[#354054]">
          <input
            type="checkbox"
            checked={disclaimerAccepted}
            onChange={(event) => setDisclaimerAccepted(event.target.checked)}
            className="mt-1 h-4 w-4 accent-[#213f77]"
          />
          Educational only—not legal advice, a compliance determination, or an attorney-client relationship.
        </label>

        <div className="mt-5 space-y-4">
          {questions.map((question) => (
            <fieldset key={question.key} className="border border-[#e5ded2] bg-white p-3">
              <legend className="px-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#5d6678]">
                {question.category}
              </legend>
              <div className="mt-1 text-sm font-semibold leading-6 text-[#121827]">
                {question.label}
              </div>
              <p className="mt-2 text-xs leading-5 text-[#5d6678]">{question.detail}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {answerOptions.map((option) => {
                  const selected = answers[question.key] === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      disabled={!disclaimerAccepted}
                      onClick={() =>
                        setAnswers((current) => ({
                          ...current,
                          [question.key]: option.value,
                        }))
                      }
                      className={
                        selected
                          ? "min-h-16 border border-[#213f77] bg-[#eef3fb] px-3 py-2 text-left text-sm text-[#121827]"
                          : "min-h-16 border border-[#e5ded2] bg-[#fffdf8] px-3 py-2 text-left text-sm text-[#354054] transition hover:border-[#213f77] disabled:cursor-not-allowed disabled:opacity-50"
                      }
                      aria-pressed={selected}
                    >
                      <span className="block font-semibold">{option.label}</span>
                      <span className="mt-1 block text-xs leading-5 text-[#5d6678]">
                        {option.detail}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      </section>

      <section className="border border-[#c8beb0] bg-[#fffdf8] p-5 shadow-[0_24px_60px_rgba(18,24,39,0.12)]">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#d8d0c3] pb-5">
          <div className="max-w-md">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#683ab7]">
              Non-diagnostic readiness preview
            </div>
            <h2 className="mt-2 text-3xl font-semibold text-[#121827]">
              {assessment.band.label}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#5d6678]">{assessment.band.summary}</p>
          </div>
          <div className={`px-3 py-2 text-sm font-semibold ${assessment.band.tone}`}>
            {assessment.score} readiness / {assessment.riskScore} review priority
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <GuardrailNotice title="Report-page warning" body={`${noConfidentialNotice} ${sourceCurrentNotice}`} />
          <GuardrailNotice title="Conflicts and engagement caveat" body={conflictEngagementNotice} />
        </div>

        <div className="grid gap-4 py-6 sm:grid-cols-2">
          <Metric label="Readiness indicator" value={assessment.score} />
          <Metric label="Review priority indicator" value={assessment.riskScore} inverse />
        </div>

        <div className="border-t border-[#d8d0c3] pt-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#5d6678]">
            Category readiness indicators
          </h3>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {assessment.categoryScores.map((item) => (
              <div key={item.category} className="border border-[#e5ded2] bg-white p-3 text-sm text-[#354054]">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-[#121827]">{item.category}</span>
                  <span className="text-[#5d6678]">{item.score}</span>
                </div>
                <div className="mt-2 h-1.5 bg-[#e5ded2]">
                  <div className="h-1.5 bg-[#213f77]" style={{ width: `${item.score}%` }} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.14em] text-[#5d6678]">
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-[#d8d0c3] pt-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#5d6678]">
            Priority workstreams
          </h3>
          <div className="mt-4 space-y-3">
            {assessment.topGaps.length ? (
              assessment.topGaps.map((gap) => (
                <div key={gap.category} className="border border-[#e5ded2] bg-white p-3">
                  <div className="flex gap-3 text-sm font-semibold leading-6 text-[#121827]">
                    <ShieldAlert size={17} className="mt-1 shrink-0 text-[#b99057]" aria-hidden="true" />
                    {gap.category}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#354054]">{gap.gap}</p>
                </div>
              ))
            ) : (
              <div className="flex gap-3 text-sm leading-6 text-[#354054]">
                <Check size={17} className="mt-1 shrink-0 text-[#55776a]" aria-hidden="true" />
                The basic readiness controls are present. Next step: legal validation and operating cadence.
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 border border-[#213f77] bg-[#eef3fb] p-4">
          <div className="text-sm font-semibold text-[#121827]">Recommended next step</div>
          <p className="mt-2 text-sm leading-6 text-[#354054]">
            {assessment.recommendedNextStep}
          </p>
          <p className="mt-3 text-sm leading-6 text-[#354054]">
            Suggested Whiteford path: {assessment.band.cta}.
          </p>
        </div>

        <div className="mt-6 border-t border-[#d8d0c3] pt-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#5d6678]">
            Email my report request
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#5d6678]">
            Report delivery is transactional and separate from marketing updates. {noConfidentialNotice}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <TextField label="Name" value={contact.name} onChange={(value) => setContact((current) => ({ ...current, name: value }))} />
            <TextField label="Work email" type="email" value={contact.email} onChange={(value) => setContact((current) => ({ ...current, email: value }))} />
            <TextField label="Company" value={contact.company} onChange={(value) => setContact((current) => ({ ...current, company: value }))} />
            <SelectField label="Role category" value={contact.roleCategory} options={roleCategoryOptions} onChange={(value) => setContact((current) => ({ ...current, roleCategory: value }))} />
          </div>

          <GuardrailNotice title="Final-submit warning" body={`${noConfidentialNotice} ${conflictEngagementNotice}`} />

          <label className="mt-4 flex items-start gap-3 text-sm leading-6 text-[#354054]">
            <input
              type="checkbox"
              checked={contact.subscribe}
              onChange={(event) => setContact((current) => ({ ...current, subscribe: event.target.checked }))}
              className="mt-1 h-4 w-4 accent-[#213f77]"
            />
            Optional and unchecked: I agree to receive educational legal updates from Whiteford/Schell IP. I can unsubscribe at any time and do not need to opt in to receive my requested report.
          </label>

          {!contact.subscribe ? (
            <div className="mt-3 flex gap-2 text-xs leading-5 text-[#6b4b13]">
              <AlertTriangle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
              Marketing updates are off. The report request can still be submitted with only transactional handling.
            </div>
          ) : null}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={submitLead}
              disabled={status === "submitting" || !contact.email || !disclaimerAccepted}
              className="inline-flex h-12 items-center justify-center gap-2 border border-[#121827] bg-[#121827] px-5 text-sm font-semibold text-white transition hover:bg-[#213f77] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "submitting" ? "Preparing report request..." : "Request my gameplan report"}
              <MailCheck size={17} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => window.print()} className="inline-flex h-12 items-center justify-center gap-2 border border-[#c8beb0] bg-[#fffdf8] px-5 text-sm font-semibold text-[#121827] transition hover:border-[#213f77]">
              Print / save PDF
              <Download size={17} aria-hidden="true" />
            </button>
          </div>
          {submitMessage ? (
            <p className={`mt-3 text-sm leading-6 ${status === "error" ? "text-[#7f2d1d]" : "text-[#354054]"}`}>
              {submitMessage}
            </p>
          ) : null}
          {status === "done" ? (
            <p className="mt-3 text-sm leading-6 text-[#315c4c]">
              Tags prepared: {assessment.tags.join(", ")}
            </p>
          ) : null}
        </div>

        <p className="mt-5 text-xs leading-5 text-[#5d6678]">
          {sourceCurrentNotice} {conflictEngagementNotice} Please do not reply to any report email or booking prompt with confidential facts unless and until conflicts are cleared and a written engagement is in place.
        </p>
      </section>
    </div>
  );
}

function Metric({ label, value, inverse = false }: { label: string; value: number; inverse?: boolean }) {
  const barColor = inverse && value > 60 ? "bg-[#b99057]" : "bg-[#213f77]";

  return (
    <div className="border border-[#e5ded2] p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-[#121827]">{label}</span>
        <span className="text-[#5d6678]">{value}/100</span>
      </div>
      <div className="mt-3 h-2 bg-[#e5ded2]">
        <div className={`h-2 ${barColor}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function GuardrailNotice({ title, body }: { title: string; body: string }) {
  return (
    <div className="mt-4 flex gap-3 border border-[#e5ded2] bg-[#fff7e8] p-3 text-sm leading-6 text-[#354054]">
      <AlertTriangle size={17} className="mt-1 shrink-0 text-[#6b4b13]" aria-hidden="true" />
      <div>
        <div className="font-semibold text-[#121827]">{title}</div>
        <p className="mt-1">{body}</p>
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="text-sm font-semibold text-[#121827]">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full border border-[#c8beb0] bg-white px-3 text-sm font-normal text-[#121827] outline-none transition focus:border-[#213f77]"
      >
        <option value="">Select a broad role category</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="text-sm font-semibold text-[#121827]">
      {label}
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-11 w-full border border-[#c8beb0] bg-white px-3 text-sm font-normal text-[#121827] outline-none transition focus:border-[#213f77]" />
    </label>
  );
}
