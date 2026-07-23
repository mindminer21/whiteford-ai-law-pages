"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import type { LearnReportConfig } from "@/lib/learn/types";

type SubmitStatus = "idle" | "submitting" | "done" | "error";

const privacyGuardrailVersion = "lead-magnet-guardrail-v2";
const publicFormInputType = "categorical_non_confidential";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

export function LearnReportForm({ config }: { config: LearnReportConfig }) {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [selectedStatus, setSelectedStatus] = useState(config.statusOptions[0]?.label ?? "");
  const [permissionAccepted, setPermissionAccepted] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");

  const activeStatus = useMemo(
    () =>
      config.statusOptions.find((option) => option.label === selectedStatus) ??
      config.statusOptions[0],
    [config.statusOptions, selectedStatus],
  );

  const canSubmit =
    Boolean(contact.name.trim()) &&
    Boolean(contact.email.trim()) &&
    Boolean(contact.company.trim()) &&
    Boolean(selectedStatus) &&
    permissionAccepted &&
    status !== "submitting";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit || !activeStatus) {
      setMessage("Please complete the required fields and permission checkbox before requesting the report.");
      return;
    }

    const tags = [
      `learn:${config.sourcePage}`,
      `status:${slugify(activeStatus.label)}`,
      `report:${slugify(config.reportName)}`,
    ];
    const band = {
      label: activeStatus.label,
      cta: activeStatus.recommendedNextStep,
    };
    const commonPayload = {
      campaignKey: config.campaignKey,
      sourcePage: config.sourcePage,
      sourceChannel: "learn.schellip.com",
      disclaimerAccepted: true,
      reportRequested: true,
      privacyGuardrailVersion,
      publicFormInputType,
      contact: {
        name: contact.name.trim(),
        email: contact.email.trim(),
        company: contact.company.trim(),
        role: activeStatus.label,
        roleCategory: config.reportName,
        subscribe: true,
      },
      assessment: {
        readinessScore: activeStatus.score,
        riskScore: 100 - activeStatus.score,
        band,
        tags,
      },
      recommendedNextStep: activeStatus.recommendedNextStep,
    };
    const payload =
      config.campaignKey === "ai-patent"
        ? {
            ...commonPayload,
            patent: {
              score: activeStatus.score,
              stage:
                activeStatus.score < 45
                  ? "Idea / prototype"
                  : activeStatus.score < 70
                    ? "MVP in market"
                    : "Fundraising or diligence",
              checks: [activeStatus.label],
              band: activeStatus.label,
              reportVersion: "learn-schellip-patent-moat-report-v1",
            },
            aiPatentOwnershipGapMap: [activeStatus.detail],
          }
        : {
            ...commonPayload,
            selectedUseCases: [activeStatus.label],
            readinessChecks: [activeStatus.detail],
            aiComplianceGameplan: {
              maturityLevel: activeStatus.label,
              categoryScores: {
                "AI governance readiness": `${activeStatus.score}`,
                "Legal review priority": `${100 - activeStatus.score}`,
              },
              topGaps: [activeStatus.detail],
              recommendedNextStep: activeStatus.recommendedNextStep,
              readinessHeatMap: {
                "Current posture": activeStatus.label,
                "Suggested next step": activeStatus.recommendedNextStep,
              },
              tenDayFixes: [
                "Inventory current AI tools and owners.",
                "Identify customer, vendor, data, and IP touchpoints.",
                "Confirm who can approve new AI use cases.",
              ],
              roadmap306090: [
                "30 days: inventory and policy baseline.",
                "60 days: vendor and contract review cadence.",
                "90 days: leadership reporting and escalation workflow.",
              ],
              selectedUseCases: [activeStatus.label],
              readinessChecks: [activeStatus.detail],
              reportVersion: "learn-schellip-ai-compliance-grid-v1",
            },
          };

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Report request failed");
      }

      const data = await response.json();
      setStatus("done");
      setMessage(
        data.mode === "preview"
          ? "Your report request was captured in preview mode. The report workflow is ready for HighLevel once live credentials are enabled."
          : `Your ${config.reportName} request was received. Watch ${contact.email.trim()} for the report and related Whiteford/Schell IP communications.`,
      );
    } catch {
      setStatus("error");
      setMessage("The report form is working, but live lead routing needs configuration before this can send the report.");
    }
  }

  return (
    <form className="learn-report-card" onSubmit={submit}>
      <div className="learn-report-kicker">Approved report request</div>
      <h3>{config.reportName}</h3>
      <p className="learn-report-copy">{config.reportDescription}</p>

      <div className="learn-report-fields">
        <TextField
          label="Name"
          value={contact.name}
          onChange={(name) => setContact((current) => ({ ...current, name }))}
        />
        <TextField
          label="Work email"
          type="text"
          inputMode="email"
          value={contact.email}
          onChange={(email) => setContact((current) => ({ ...current, email }))}
        />
        <TextField
          label="Company name"
          value={contact.company}
          onChange={(company) => setContact((current) => ({ ...current, company }))}
        />
      </div>

      <fieldset className="learn-report-status">
        <legend>{config.statusLegend}</legend>
        <div className="learn-report-options">
          {config.statusOptions.map((option) => (
            <label key={option.label} className="learn-report-option">
              <input
                type="radio"
                name={`${config.sourcePage}-status`}
                value={option.label}
                checked={selectedStatus === option.label}
                onChange={() => setSelectedStatus(option.label)}
              />
              <span>
                <strong>{option.label}</strong>
                <small>{option.detail}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {activeStatus ? (
        <div className="learn-report-preview" aria-live="polite">
          <span>Report preview</span>
          <p>
            {contact.company.trim() || "Your company"} will be routed as: <strong>{activeStatus.label}</strong>
          </p>
          <p>{activeStatus.recommendedNextStep}</p>
        </div>
      ) : null}

      <label className="learn-report-consent">
        <input
          type="checkbox"
          checked={permissionAccepted}
          onChange={(event) => setPermissionAccepted(event.target.checked)}
        />
        <span>
          I agree that Whiteford/Schell IP may email me the requested report and related educational communications. I can unsubscribe at any time. I understand this tool is informational only, is not legal advice, does not create an attorney-client relationship, and I should not submit confidential information.
        </span>
      </label>

      <button className="learn-report-submit" type="submit" disabled={!canSubmit}>
        {status === "submitting" ? "Preparing your report..." : config.buttonLabel}
      </button>

      {message ? (
        <p className={status === "error" ? "learn-report-message is-error" : "learn-report-message"}>
          {message}
        </p>
      ) : null}
    </form>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  inputMode?: "email";
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
        autoComplete={inputMode === "email" ? "email" : "on"}
      />
    </label>
  );
}
