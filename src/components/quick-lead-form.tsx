"use client";

import { useState } from "react";
import { MailCheck } from "lucide-react";
import type { CampaignKey } from "@/lib/campaigns";

type Status = "idle" | "submitting" | "done" | "error";

export function QuickLeadForm({
  campaignKey,
  sourcePage,
  title,
  description,
  buttonLabel = "Send the checklist",
}: {
  campaignKey: CampaignKey;
  sourcePage: string;
  title: string;
  description: string;
  buttonLabel?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    subscribe: false,
  });
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);

  async function submit() {
    if (!disclaimerAccepted) {
      setMessage("Please accept the educational-use, no-confidential-information, and no-attorney-client gate before requesting the lead magnet.");
      return;
    }

    setStatus("submitting");
    setMessage("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignKey,
          sourcePage,
          sourceChannel: "website",
          disclaimerAccepted,
          reportRequested: true,
          privacyGuardrailVersion: "lead-magnet-guardrail-v2",
          publicFormInputType: "categorical_non_confidential",
          contact: form,
        }),
      });

      if (!response.ok) {
        throw new Error("Lead submission failed");
      }

      const data = await response.json();
      setStatus("done");
      setMessage(
        data.mode === "preview"
          ? "Preview captured. Marketing updates remain off unless the optional updates box was checked."
          : "Request submitted with consent-gated routing. Marketing nurture remains limited to the optional educational email path you requested.",
      );
    } catch {
      setStatus("error");
      setMessage("The form is ready, but live lead routing needs configuration.");
    }
  }

  return (
    <div className="border border-[#d8d0c3] bg-[#fffdf8] p-5">
      <div className="text-sm font-semibold text-[#121827]">{title}</div>
      <p className="mt-3 text-sm leading-6 text-[#354054]">{description}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Input label="Name" value={form.name} onChange={(name) => setForm((current) => ({ ...current, name }))} />
        <Input label="Email" type="email" value={form.email} onChange={(email) => setForm((current) => ({ ...current, email }))} />
        <Input label="Company" value={form.company} onChange={(company) => setForm((current) => ({ ...current, company }))} />
        <Input label="Role" value={form.role} onChange={(role) => setForm((current) => ({ ...current, role }))} />
      </div>
      <label className="mt-4 flex items-start gap-3 border border-[#c8beb0] bg-white p-3 text-sm leading-6 text-[#354054]">
        <input
          type="checkbox"
          checked={disclaimerAccepted}
          onChange={(event) => setDisclaimerAccepted(event.target.checked)}
          className="mt-1 h-4 w-4 accent-[#213f77]"
        />
        I understand this lead magnet is educational only, is not legal advice, uses non-confidential inputs only, does not create an attorney-client relationship, and Whiteford can provide legal advice only after conflicts review and a written engagement.
      </label>
      <label className="mt-4 flex items-start gap-3 text-sm leading-6 text-[#354054]">
        <input
          type="checkbox"
          checked={form.subscribe}
          onChange={(event) =>
            setForm((current) => ({ ...current, subscribe: event.target.checked }))
          }
          className="mt-1 h-4 w-4 accent-[#213f77]"
        />
        Optional and unchecked: I agree to receive related educational emails from Whiteford/Schell IP. I can unsubscribe at any time. I understand this form is not for confidential information, does not provide legal advice, and does not create an attorney-client relationship.
      </label>
      <button
        type="button"
        onClick={submit}
        disabled={status === "submitting" || !form.email || !disclaimerAccepted}
        className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 border border-[#121827] bg-[#121827] px-5 text-sm font-semibold text-white transition hover:bg-[#213f77] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "submitting" ? "Preparing..." : buttonLabel}
        <MailCheck size={17} aria-hidden="true" />
      </button>
      {message ? <p className="mt-3 text-sm leading-6 text-[#354054]">{message}</p> : null}
      <p className="mt-4 text-xs leading-5 text-[#5d6678]">
        Educational material only. Do not submit confidential information. Whiteford can provide legal advice only after conflicts review and a written engagement.
      </p>
    </div>
  );
}

function Input({
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
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full border border-[#c8beb0] bg-white px-3 text-sm font-normal text-[#121827] outline-none transition focus:border-[#213f77]"
      />
    </label>
  );
}
