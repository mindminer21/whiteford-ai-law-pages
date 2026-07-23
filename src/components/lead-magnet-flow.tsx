"use client";

import type { Dispatch, FormEvent, RefObject, SetStateAction } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  complianceText,
  isAssessmentConfig,
  noConfidentialInfoText,
  permissionText,
  type AssessmentMagnetConfig,
  type AssessmentResult,
  type DownloadMagnetConfig,
  type DownloadResult,
  type MagnetConfig,
  type MagnetMode,
} from "@/lib/magnets/finalization";

type ContactState = {
  name: string;
  email: string;
  title: string;
  company: string;
  qualifyingStatus: string;
  permissionAcknowledged: boolean;
};

type SubmitStatus = "idle" | "submitting" | "done" | "error";

type ReportAsset = {
  filename: string;
  content_type: "application/pdf";
  base64: string;
};

type CalApi = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, CalApi>;
  q: unknown[];
};

type CalWindow = Window & {
  Cal?: CalApi;
};

function firstName(name: string) {
  return name.trim().split(/\s+/).filter(Boolean)[0] ?? "there";
}

function initialAnswers(config: AssessmentMagnetConfig) {
  return Object.fromEntries(config.questions.map((question) => [question.id, undefined])) as Record<string, number | undefined>;
}

function CalInlineEmbed() {
  useEffect(() => {
    const namespace = "meeting-with-jeff-schell";
    const calLink = "jeffschell/meeting-with-jeff-schell";
    const calendarWindow = window as CalWindow;

    (function initializeCal(C: CalWindow, A: string, L: string) {
      const push = (api: CalApi, args: unknown[]) => {
        api.q.push(args);
      };
      const doc = C.document;
      C.Cal =
        C.Cal ||
        function CalBootstrap(...args: unknown[]) {
          const cal = C.Cal;
          if (!cal) return;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            doc.head.appendChild(doc.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (args[0] === L) {
            const api = function calNamespaceApi(...apiArgs: unknown[]) {
              push(api, apiArgs);
            } as CalApi;
            const requestedNamespace = args[1];
            api.q = api.q || [];
            if (typeof requestedNamespace === "string") {
              cal.ns = cal.ns || {};
              cal.ns[requestedNamespace] = cal.ns[requestedNamespace] || api;
              push(cal.ns[requestedNamespace], args);
              push(cal, ["initNamespace", requestedNamespace]);
            } else {
              push(cal, args);
            }
            return;
          }
          push(cal, args);
        } as CalApi;
    })(calendarWindow, "https://app.cal.com/embed/embed.js", "init");

    calendarWindow.Cal?.("init", namespace, { origin: "https://app.cal.com" });
    calendarWindow.Cal?.ns?.[namespace]?.("inline", {
      elementOrSelector: "#my-cal-inline-meeting-with-jeff-schell",
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
      calLink,
    });
    calendarWindow.Cal?.ns?.[namespace]?.("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  return <div className="learn-cal-inline" id="my-cal-inline-meeting-with-jeff-schell" />;
}

export function LeadMagnetFlow({ config }: { config: MagnetConfig }) {
  return isAssessmentConfig(config) ? (
    <AssessmentFlow config={config} />
  ) : (
    <DownloadFlow config={config} />
  );
}

function AssessmentFlow({ config }: { config: AssessmentMagnetConfig }) {
  const [contact, setContact] = useState<ContactState>({
    name: "",
    email: "",
    title: "",
    company: "",
    qualifyingStatus: config.statusOptions[0] ?? "",
    permissionAcknowledged: false,
  });
  const [answers, setAnswers] = useState<Record<string, number | undefined>>(() => initialAnswers(config));
  const [stepIndex, setStepIndex] = useState(0);
  const [mode, setMode] = useState<MagnetMode>("founder");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [reportAsset, setReportAsset] = useState<ReportAsset | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const answeredCount = useMemo(
    () => config.questions.filter((question) => answers[question.id] !== undefined).length,
    [answers, config.questions],
  );

  const contactReady =
    Boolean(contact.name.trim()) &&
    Boolean(contact.email.trim()) &&
    Boolean(contact.title.trim()) &&
    Boolean(contact.company.trim()) &&
    Boolean(contact.qualifyingStatus) &&
    contact.permissionAcknowledged;
  const currentQuestion = config.questions[stepIndex - 1];
  const currentArea = currentQuestion
    ? config.areas.find((area) => area.key === currentQuestion.areaKey)
    : undefined;
  const currentQuestionAnswered = currentQuestion ? answers[currentQuestion.id] !== undefined : false;
  const progressPercent = Math.round(
    (((stepIndex === 0 ? 0 : stepIndex) + 1) / (config.questions.length + 1)) * 100,
  );
  const canGoNext = stepIndex === 0 ? contactReady : currentQuestionAnswered;
  const canSubmit =
    contactReady &&
    answeredCount === config.questions.length &&
    status !== "submitting";

  function goNext() {
    if (!canGoNext) {
      setStatus("error");
      setMessage(
        stepIndex === 0
          ? "Complete the contact fields, title, qualifying status, and permission checkbox before starting the questionnaire."
          : "Choose one categorical answer before continuing.",
      );
      return;
    }

    setStatus("idle");
    setMessage("");
    setStepIndex((current) => Math.min(current + 1, config.questions.length));
  }

  function goBack() {
    setStatus("idle");
    setMessage("");
    setStepIndex((current) => Math.max(current - 1, 0));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      setMessage("Complete every categorical answer, contact field, and the permission checkbox before submitting.");
      setStatus("error");
      return;
    }

    const compactAnswers = Object.fromEntries(
      Object.entries(answers).map(([key, value]) => [key, Number(value)]),
    );

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name.trim(),
          email: contact.email.trim(),
          contact_title: contact.title.trim(),
          company: contact.company.trim(),
          qualifying_status: contact.qualifyingStatus,
          permission_acknowledged: contact.permissionAcknowledged,
          subscribe: contact.permissionAcknowledged,
          magnet_slug: config.slug,
          mode: config.modeToggle ? mode : undefined,
          answers: compactAnswers,
        }),
      });
      const data = (await response.json()) as (AssessmentResult & { report?: ReportAsset }) | { error?: string };

      if (!response.ok || !("ok" in data)) {
        throw new Error("error" in data ? data.error : "Submission failed");
      }

      setResult(data);
      setReportAsset(data.report ?? null);
      setStatus("done");
      window.requestAnimationFrame(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "The assessment could not be submitted.");
    }
  }

  if (result) {
    return (
      <AssessmentResultView
        config={config}
        result={result}
        reportAsset={reportAsset}
        resultRef={resultRef}
      />
    );
  }

  return (
    <form className="learn-report-card learn-assessment-form" data-learn-magnet-form={config.slug} onSubmit={submit}>
      <div className="learn-report-kicker">Whiteford-approved tool</div>
      <h3>{config.formTitle}</h3>
      <p className="learn-report-copy">{config.formDescription}</p>
      <p className="learn-compliance-note">{noConfidentialInfoText}</p>

      <div className="learn-step-progress" aria-label="Questionnaire progress">
        <span>{stepIndex === 0 ? "Step 1: contact" : `Question ${stepIndex} of ${config.questions.length}`}</span>
        <strong>{answeredCount} / {config.questions.length} answered</strong>
        <div aria-hidden="true">
          <span style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {stepIndex === 0 ? (
        <div className="learn-step-panel">
          <ContactPermissionBlock
            config={config}
            contact={contact}
            setContact={setContact}
            requireTitle
          />
          {config.modeToggle ? (
            <fieldset className="learn-mode-toggle">
              <legend>Result framing</legend>
              <div className="learn-mode-options">
                {(["founder", "investor"] as const).map((item) => (
                  <label key={item} className={mode === item ? "is-selected" : ""}>
                    <input
                      type="radio"
                      name={`${config.slug}-mode`}
                      value={item}
                      checked={mode === item}
                      onChange={() => setMode(item)}
                    />
                    <span>{item === "founder" ? "Founder mode" : "Investor mode"}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ) : null}
        </div>
      ) : currentQuestion ? (
        <div className="learn-question-groups">
          <div className="learn-question-group" role="group" aria-label={currentArea?.label ?? "Question"}>
            <div className="learn-question-group-header">
              <span>{currentArea?.label ?? "Questionnaire"}</span>
              <strong>{currentArea?.maxScore ?? 3} pts</strong>
            </div>
            <fieldset className="learn-question" data-assessment-question={currentQuestion.id}>
              <legend>
                <span>{currentQuestion.id.toUpperCase()}</span>
                {currentQuestion.label}
              </legend>
              <div className="learn-answer-options">
                {currentQuestion.options.map((option) => (
                  <label key={`${currentQuestion.id}-${option.label}`} className="learn-answer-option">
                    <input
                      type="radio"
                      name={`${config.slug}-${currentQuestion.id}`}
                      value={option.score}
                      checked={answers[currentQuestion.id] === option.score}
                      onChange={() => {
                        setAnswers((current) => ({ ...current, [currentQuestion.id]: option.score }));
                        setStatus("idle");
                        setMessage("");
                      }}
                      required
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      ) : null}

      <div className="learn-step-actions">
        <button type="button" className="learn-step-secondary" onClick={goBack} disabled={stepIndex === 0 || status === "submitting"}>
          Back
        </button>
        {stepIndex < config.questions.length ? (
          <button type="button" className="learn-report-submit" onClick={goNext} disabled={!canGoNext || status === "submitting"}>
            {stepIndex === 0 ? "Start questionnaire" : "Next question"}
          </button>
        ) : (
          <button className="learn-report-submit" type="submit" disabled={!canSubmit}>
            {status === "submitting" ? "Preparing your PDF report..." : config.buttonLabel}
          </button>
        )}
      </div>

      {message ? (
        <p className={status === "error" ? "learn-report-message is-error" : "learn-report-message"}>
          {message}
        </p>
      ) : null}
    </form>
  );
}

function DownloadFlow({ config }: { config: DownloadMagnetConfig }) {
  const [contact, setContact] = useState<ContactState>({
    name: "",
    email: "",
    title: "",
    company: "",
    qualifyingStatus: config.statusOptions[0] ?? "",
    permissionAcknowledged: false,
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<DownloadResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const canSubmit =
    Boolean(contact.name.trim()) &&
    Boolean(contact.email.trim()) &&
    Boolean(contact.company.trim()) &&
    Boolean(contact.qualifyingStatus) &&
    contact.permissionAcknowledged &&
    status !== "submitting";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      setStatus("error");
      setMessage("Complete the contact fields, qualifying status, and permission checkbox before requesting the playbook.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name.trim(),
          email: contact.email.trim(),
          company: contact.company.trim(),
          qualifying_status: contact.qualifyingStatus,
          permission_acknowledged: contact.permissionAcknowledged,
          subscribe: contact.permissionAcknowledged,
          magnet_slug: config.slug,
        }),
      });
      const data = (await response.json()) as DownloadResult | { error?: string };

      if (!response.ok || !("ok" in data)) {
        throw new Error("error" in data ? data.error : "Submission failed");
      }

      setResult(data);
      setStatus("done");
      window.requestAnimationFrame(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "The playbook request could not be submitted.");
    }
  }

  if (result) {
    return (
      <div className="learn-report-card learn-download-confirmation" ref={resultRef} tabIndex={-1}>
        <div className="learn-report-kicker">Playbook requested</div>
        <h2>Thanks, {firstName(contact.name)}.</h2>
        <p className="learn-result-headline">
          Check <strong>{contact.email.trim()}</strong> - the playbook is on its way. If it doesn&apos;t arrive in a few minutes, check your spam folder.
        </p>
        <section className="learn-calendar-section" aria-label="Schedule a consultation with Jeff Schell">
          <div className="learn-report-kicker">Schedule a consultation</div>
          <CalInlineEmbed />
        </section>
        <section className="learn-confirmation-bio" aria-label="Jeff Schell biography">
          <img src="/logos/jeff-schell.jpg" alt="Jeff Schell" width={220} height={220} loading="lazy" />
          <div>
            <h3>Jeff Schell</h3>
            <p className="learn-confirmation-bio-title">
              Managing Partner, Mountain West · Whiteford Taylor &amp; Preston · Patent Attorney ·
              Outside General Counsel · AI Advisor
            </p>
            <p>
              Jeff Schell is Managing Partner of Whiteford&apos;s Mountain West practice and serves as
              outside general counsel to technology companies. A patent attorney, venture capitalist,
              and former two-time founder, he leads engagements at the intersection of patent strategy,
              AI risk, venture growth, and corporate operations. Since 2012, his work has supported
              the creation of over $100 million in transaction and enterprise value across
              Colorado&apos;s technology ecosystem.
            </p>
          </div>
        </section>
        <p className="learn-result-compliance">{complianceText}</p>
      </div>
    );
  }

  return (
    <form className="learn-report-card learn-download-form" data-learn-magnet-form={config.slug} onSubmit={submit}>
      <div className="learn-report-kicker">PDF delivery</div>
      <h2>{config.formTitle}</h2>
      {config.formDescription ? <p className="learn-report-copy">{config.formDescription}</p> : null}
      {config.kind !== "download" ? <p className="learn-compliance-note">{noConfidentialInfoText}</p> : null}

      <ContactPermissionBlock
        config={config}
        contact={contact}
        setContact={setContact}
        requireTitle={false}
      />

      <button className="learn-report-submit" type="submit" disabled={!canSubmit}>
        {status === "submitting" ? "Sending..." : config.buttonLabel}
      </button>

      {message ? (
        <p className={status === "error" ? "learn-report-message is-error" : "learn-report-message"}>
          {message}
        </p>
      ) : null}
    </form>
  );
}

function ContactPermissionBlock({
  config,
  contact,
  setContact,
  requireTitle,
}: {
  config: MagnetConfig;
  contact: ContactState;
  setContact: Dispatch<SetStateAction<ContactState>>;
  requireTitle: boolean;
}) {
  return (
    <div className="learn-contact-block">
      <div className="learn-contact-heading">Contact and permission</div>
      <div className="learn-report-fields">
        <TextField
          label="Name"
          value={contact.name}
          onChange={(name) => setContact((current) => ({ ...current, name }))}
        />
        <TextField
          label="Work email"
          type="email"
          inputMode="email"
          value={contact.email}
          onChange={(email) => setContact((current) => ({ ...current, email }))}
        />
        {requireTitle ? (
          <TextField
            label="Title"
            autoComplete="organization-title"
            value={contact.title}
            onChange={(title) => setContact((current) => ({ ...current, title }))}
          />
        ) : null}
        <TextField
          label="Company name"
          autoComplete="organization"
          value={contact.company}
          onChange={(company) => setContact((current) => ({ ...current, company }))}
        />
      </div>

      <fieldset className="learn-report-status">
        <legend>{config.statusLegend}</legend>
        <div className="learn-report-options">
          {config.statusOptions.map((option) => (
            <label key={option} className="learn-report-option">
              <input
                type="radio"
                name={`${config.slug}-qualifying-status`}
                value={option}
                checked={contact.qualifyingStatus === option}
                onChange={() => setContact((current) => ({ ...current, qualifyingStatus: option }))}
              />
              <span>
                <strong>{option}</strong>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="learn-report-consent">
        <input
          type="checkbox"
          checked={contact.permissionAcknowledged}
          onChange={(event) =>
            setContact((current) => ({
              ...current,
              permissionAcknowledged: event.target.checked,
            }))
          }
        />
        <span>
          I agree that Whiteford/Schell IP may send me the requested report or playbook and related educational communications. {permissionText}
        </span>
      </label>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  inputMode,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email";
  inputMode?: "email";
  autoComplete?: string;
}) {
  return (
    <label className="learn-report-field">
      <span>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
        inputMode={inputMode}
        autoComplete={autoComplete ?? (inputMode === "email" ? "email" : label === "Name" ? "name" : "organization")}
      />
    </label>
  );
}

function AssessmentResultView({
  config,
  result,
  reportAsset,
  resultRef,
}: {
  config: AssessmentMagnetConfig;
  result: AssessmentResult;
  reportAsset: ReportAsset | null;
  resultRef: RefObject<HTMLDivElement | null>;
}) {
  const reportHref = reportAsset
    ? `data:${reportAsset.content_type};base64,${reportAsset.base64}`
    : null;

  return (
    <div className="learn-report-card learn-result-card" ref={resultRef} tabIndex={-1}>
      <div className="learn-report-kicker">Your result</div>
      <h3>
        Your score: <strong>{result.score} / {result.score_max}</strong>. Tier: <strong>{result.tier.label}</strong>.
      </h3>
      <p className="learn-result-headline">{result.tier.headline}</p>

      {config.slug === "governance-plan" ? (
        <GovernanceMatrix config={config} result={result} />
      ) : (
        <RadarResult config={config} result={result} />
      )}

      <div className="learn-result-actions">
        <div className="learn-contact-heading">Three prioritized actions</div>
        <ol>
          {result.actions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ol>
      </div>

      {reportHref && reportAsset ? (
        <a className="learn-result-download" href={reportHref} download={reportAsset.filename}>
          Download customized PDF report
        </a>
      ) : null}

      <button
        className="learn-result-schedule"
        type="button"
        data-cal-link="jeffschell/meeting-with-jeff-schell"
        data-cal-namespace="meeting-with-jeff-schell"
      >
        Discuss your result with Jeff
      </button>

      <p className="learn-result-compliance">{complianceText}</p>
    </div>
  );
}

function RadarResult({ config, result }: { config: AssessmentMagnetConfig; result: AssessmentResult }) {
  const center = 132;
  const radius = 92;
  const points = config.areas
    .map((area, index) => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * index) / config.areas.length;
      const value = (result.sub_scores[area.key] ?? 0) / area.maxScore;
      return `${center + Math.cos(angle) * radius * value},${center + Math.sin(angle) * radius * value}`;
    })
    .join(" ");
  const gridPoints = config.areas
    .map((_, index) => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * index) / config.areas.length;
      return `${center + Math.cos(angle) * radius},${center + Math.sin(angle) * radius}`;
    })
    .join(" ");

  return (
    <div className="learn-result-visual" aria-label={`${config.title} score visualization`}>
      <svg viewBox="0 0 264 264" role="img">
        <polygon points={gridPoints} fill="none" stroke="rgba(0,55,86,0.18)" />
        {config.slug === "patent-moat-scorecard" ? (
          <>
            <BenchmarkPolygon areas={config.areas} center={center} radius={radius} benchmark={7 / 9} className="series-a" />
            <BenchmarkPolygon areas={config.areas} center={center} radius={radius} benchmark={8 / 9} className="series-b" />
          </>
        ) : null}
        <polygon points={points} fill="rgba(99,45,221,0.2)" stroke="#632DDD" strokeWidth="2" />
        {config.areas.map((area, index) => {
          const angle = -Math.PI / 2 + (Math.PI * 2 * index) / config.areas.length;
          const labelX = center + Math.cos(angle) * (radius + 26);
          const labelY = center + Math.sin(angle) * (radius + 26);
          return (
            <g key={area.key}>
              <line
                x1={center}
                y1={center}
                x2={center + Math.cos(angle) * radius}
                y2={center + Math.sin(angle) * radius}
                stroke="rgba(0,55,86,0.12)"
              />
              <text x={labelX} y={labelY} textAnchor="middle" dominantBaseline="middle">
                {area.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="learn-result-subscore-grid">
        {config.areas.map((area) => (
          <div key={area.key}>
            <span>{area.label}</span>
            <strong>{result.sub_scores[area.key] ?? 0} / {area.maxScore}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function BenchmarkPolygon({
  areas,
  center,
  radius,
  benchmark,
  className,
}: {
  areas: AssessmentMagnetConfig["areas"];
  center: number;
  radius: number;
  benchmark: number;
  className: string;
}) {
  const points = areas
    .map((_, index) => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * index) / areas.length;
      return `${center + Math.cos(angle) * radius * benchmark},${center + Math.sin(angle) * radius * benchmark}`;
    })
    .join(" ");

  return <polygon className={className} points={points} fill="none" />;
}

function GovernanceMatrix({ config, result }: { config: AssessmentMagnetConfig; result: AssessmentResult }) {
  return (
    <div className="learn-governance-result" aria-label="Governance readiness matrix">
      {config.areas.map((area) => {
        const score = result.sub_scores[area.key] ?? 0;
        const status = score === 3 ? "Structure" : score === 2 ? "Draft" : "Gap";
        return (
          <div key={area.key} className={`learn-governance-cell is-${status.toLowerCase()}`}>
            <span>{area.label}</span>
            <strong>{status}</strong>
          </div>
        );
      })}
    </div>
  );
}
