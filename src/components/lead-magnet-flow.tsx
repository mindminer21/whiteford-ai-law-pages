"use client";

import type { Dispatch, FormEvent, RefObject, SetStateAction } from "react";
import { useMemo, useRef, useState } from "react";
import {
  companyProfileLabels,
  companyProfileOptions,
  complianceText,
  isAssessmentConfig,
  noConfidentialInfoText,
  permissionText,
  type AssessmentMagnetConfig,
  type AssessmentResult,
  type CompanyProfileKey,
  type DownloadMagnetConfig,
  type DownloadResult,
  type MagnetConfig,
  type MagnetMode,
} from "@/lib/magnets/finalization";

type ContactState = {
  name: string;
  email: string;
  company: string;
  qualifyingStatus: string;
  permissionAcknowledged: boolean;
  phone: string;
  website: string;
  profile: Partial<Record<CompanyProfileKey, string>>;
  followUpRequested: boolean;
};

const profileKeys = Object.keys(companyProfileOptions) as CompanyProfileKey[];

function initialContact(config: MagnetConfig): ContactState {
  return {
    name: "",
    email: "",
    company: "",
    qualifyingStatus: config.statusOptions[0] ?? "",
    permissionAcknowledged: false,
    phone: "",
    website: "",
    profile: {},
    followUpRequested: false,
  };
}

function profileComplete(config: MagnetConfig, contact: ContactState) {
  return !config.companyProfile || profileKeys.every((key) => Boolean(contact.profile[key]));
}

function profilePayload(config: MagnetConfig, contact: ContactState) {
  if (!config.companyProfile) return {};
  return {
    profile: {
      ...contact.profile,
      ...(contact.phone.trim() ? { phone: contact.phone.trim() } : {}),
      ...(contact.website.trim() ? { website: contact.website.trim() } : {}),
    },
    ...(config.followUpOption ? { follow_up_requested: contact.followUpRequested } : {}),
  };
}

type SubmitStatus = "idle" | "submitting" | "done" | "error";

function firstName(name: string) {
  return name.trim().split(/\s+/).filter(Boolean)[0] ?? "there";
}

function initialAnswers(config: AssessmentMagnetConfig) {
  return Object.fromEntries(config.questions.map((question) => [question.id, undefined])) as Record<string, number | undefined>;
}

export function LeadMagnetFlow({ config }: { config: MagnetConfig }) {
  return isAssessmentConfig(config) ? (
    <AssessmentFlow config={config} />
  ) : (
    <DownloadFlow config={config} />
  );
}

function AssessmentFlow({ config }: { config: AssessmentMagnetConfig }) {
  const [contact, setContact] = useState<ContactState>(() => initialContact(config));
  // Stores the chosen option index per question; several options can share a score.
  const [answers, setAnswers] = useState<Record<string, number | undefined>>(() => initialAnswers(config));
  const [mode, setMode] = useState<MagnetMode>("founder");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<(AssessmentResult & { email_delivery?: string }) | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const answeredCount = useMemo(
    () => config.questions.filter((question) => answers[question.id] !== undefined).length,
    [answers, config.questions],
  );

  const canSubmit =
    Boolean(contact.name.trim()) &&
    Boolean(contact.email.trim()) &&
    Boolean(contact.company.trim()) &&
    Boolean(contact.qualifyingStatus) &&
    contact.permissionAcknowledged &&
    profileComplete(config, contact) &&
    answeredCount === config.questions.length &&
    status !== "submitting";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      setMessage("Complete every categorical answer, contact field, and the permission checkbox before submitting.");
      setStatus("error");
      return;
    }

    const compactAnswers = Object.fromEntries(
      config.questions.map((question) => [question.id, question.options[Number(answers[question.id])]?.score]),
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
          company: contact.company.trim(),
          qualifying_status: contact.qualifyingStatus,
          permission_acknowledged: contact.permissionAcknowledged,
          magnet_slug: config.slug,
          mode: config.modeToggle ? mode : undefined,
          answers: compactAnswers,
          ...profilePayload(config, contact),
        }),
      });
      const data = (await response.json()) as (AssessmentResult & { email_delivery?: string }) | { error?: string };

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
      setMessage(error instanceof Error ? error.message : "The assessment could not be submitted.");
    }
  }

  if (result) {
    return (
      <AssessmentResultView
        config={config}
        result={result}
        resultRef={resultRef}
        email={contact.email.trim()}
      />
    );
  }

  return (
    <form className="learn-report-card learn-assessment-form" data-learn-magnet-form={config.slug} onSubmit={submit}>
      <div className="learn-report-kicker">Whiteford-approved tool</div>
      <h3>{config.formTitle}</h3>
      <p className="learn-report-copy">{config.formDescription}</p>
      <p className="learn-compliance-note">{noConfidentialInfoText}</p>

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

      <div className="learn-question-groups">
        {config.areas.map((area) => (
          <div key={area.key} className="learn-question-group" role="group" aria-label={area.label}>
            <div className="learn-question-group-header">
              <span>{area.label}</span>
              <strong>{area.maxScore} pts</strong>
            </div>
            {config.questions
              .filter((question) => question.areaKey === area.key)
              .map((question) => (
                <fieldset key={question.id} className="learn-question" data-assessment-question={question.id}>
                  <legend>
                    <span>{question.id.toUpperCase()}</span>
                    {question.label}
                  </legend>
                  <div className="learn-answer-options">
                    {question.options.map((option, optionIndex) => (
                      <label key={`${question.id}-${option.label}`} className="learn-answer-option">
                        <input
                          type="radio"
                          name={`${config.slug}-${question.id}`}
                          value={optionIndex}
                          checked={answers[question.id] === optionIndex}
                          onChange={() => setAnswers((current) => ({ ...current, [question.id]: optionIndex }))}
                          required
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
          </div>
        ))}
      </div>

      <ContactPermissionBlock
        config={config}
        contact={contact}
        setContact={setContact}
      />

      <button className="learn-report-submit" type="submit" disabled={!canSubmit}>
        {status === "submitting" ? "Preparing your result..." : config.buttonLabel}
      </button>

      {message ? (
        <p className={status === "error" ? "learn-report-message is-error" : "learn-report-message"}>
          {message}
        </p>
      ) : null}
    </form>
  );
}

function DownloadFlow({ config }: { config: DownloadMagnetConfig }) {
  const [contact, setContact] = useState<ContactState>(() => initialContact(config));
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
          Check <strong>{contact.email.trim()}</strong> - the playbook is on its way. If it doesn&apos;t arrive in a few minutes, check your spam folder or <a href="#bio">schedule a call</a> instead.
        </p>
        <p className="learn-result-compliance">{complianceText}</p>
      </div>
    );
  }

  return (
    <form className="learn-report-card learn-download-form" data-learn-magnet-form={config.slug} onSubmit={submit}>
      <div className="learn-report-kicker">PDF delivery</div>
      <h2>{config.formTitle}</h2>
      <p className="learn-report-copy">{config.formDescription}</p>
      <p className="learn-compliance-note">{noConfidentialInfoText}</p>

      <ContactPermissionBlock
        config={config}
        contact={contact}
        setContact={setContact}
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
}: {
  config: MagnetConfig;
  contact: ContactState;
  setContact: Dispatch<SetStateAction<ContactState>>;
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
        <TextField
          label="Company name"
          value={contact.company}
          onChange={(company) => setContact((current) => ({ ...current, company }))}
        />
        {config.companyProfile ? (
          <>
            <TextField
              label="Phone (optional)"
              type="tel"
              required={false}
              value={contact.phone}
              onChange={(phone) => setContact((current) => ({ ...current, phone }))}
            />
            <TextField
              label="Company website (optional)"
              inputMode="url"
              required={false}
              value={contact.website}
              onChange={(website) => setContact((current) => ({ ...current, website }))}
            />
            {profileKeys.map((key) => (
              <label key={key} className="learn-report-field">
                <span>{companyProfileLabels[key]}</span>
                <select
                  value={contact.profile[key] ?? ""}
                  required
                  onChange={(event) =>
                    setContact((current) => ({
                      ...current,
                      profile: { ...current.profile, [key]: event.target.value },
                    }))
                  }
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  {companyProfileOptions[key].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </>
        ) : null}
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
          I agree that Whiteford/Schell IP may send me the requested report or playbook and related educational communications{config.companyProfile ? ", and may keep my answers, company details and stated plans in its contact records" : ""}. {permissionText}
        </span>
      </label>

      {config.followUpOption ? (
        <label className="learn-report-consent">
          <input
            type="checkbox"
            checked={contact.followUpRequested}
            onChange={(event) =>
              setContact((current) => ({ ...current, followUpRequested: event.target.checked }))
            }
          />
          <span>{config.followUpOption}</span>
        </label>
      ) : null}
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  inputMode,
  required = true,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel";
  inputMode?: "email" | "url";
  required?: boolean;
}) {
  return (
    <label className="learn-report-field">
      <span>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        inputMode={inputMode}
        autoComplete={
          inputMode === "email" ? "email" : type === "tel" ? "tel" : inputMode === "url" ? "url" : label === "Name" ? "name" : "organization"
        }
      />
    </label>
  );
}

function AssessmentResultView({
  config,
  result,
  resultRef,
  email,
}: {
  config: AssessmentMagnetConfig;
  result: AssessmentResult & { email_delivery?: string };
  resultRef: RefObject<HTMLDivElement | null>;
  email: string;
}) {
  return (
    <div className="learn-report-card learn-result-card" ref={resultRef} tabIndex={-1}>
      <div className="learn-report-kicker">Your result</div>
      <h3>
        Your score: <strong>{result.score} / {result.score_max}</strong>. Tier: <strong>{result.tier.label}</strong>.
      </h3>
      <p className="learn-result-headline">{result.tier.headline}</p>
      {result.email_delivery === "sent" ? (
        <p className="learn-report-message">
          A copy of this report is on its way to <strong>{email}</strong>.
        </p>
      ) : null}

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
      <svg viewBox="-48 0 360 264" role="img">
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
