"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { initialValues, isVisible, validatePage } from "@/lib/founders/fields";
import { BOOKING_URL, FOUNDERS_VERIFY_SCOPE, getTool } from "@/lib/founders/registry";
import type { Field, FieldValue, NumberField, RowField, RowValue, ToolReport, ToolSpec, Values } from "@/lib/founders/types";

type Identity = { name: string; email: string; company: string; website: string; token: string; savedAt: number };

const STORAGE_KEY = "founders-verified";
const TOKEN_MAX_AGE_MS = 2.5 * 60 * 60 * 1000; // tokens last 3 hours; refresh a little early

const IDENTITY_EVENT = "founders-identity";

function readRaw() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function parseIdentity(raw: string | null): Identity | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Identity;
    if (!parsed.token || !parsed.email || Date.now() - parsed.savedAt > TOKEN_MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(IDENTITY_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(IDENTITY_EVENT, callback);
  };
}

function saveIdentity(identity: Identity | null) {
  try {
    if (identity) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(identity));
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage is a convenience; without it the visitor verifies again on the next page.
  }
  window.dispatchEvent(new Event(IDENTITY_EVENT));
}

const consentText =
  "I agree that Whiteford/Schell IP may email me a verification code and my report, may send me occasional follow-up emails about related legal needs (I can stop them at any time), and may keep my answers and company details in its contact records. I understand these tools are not legal advice and do not create an attorney-client relationship, and I won't enter confidential or privileged information.";

export function FounderTool({ slug }: { slug: string }) {
  const tool = getTool(slug);
  // The server renders the gate placeholder; the browser then reads the saved identity.
  const raw = useSyncExternalStore(subscribe, readRaw, () => undefined);
  const stored = useMemo(() => (raw === undefined ? undefined : parseIdentity(raw)), [raw]);
  // Keeps the identity in memory too, so the flow works when storage is blocked.
  const [memory, setMemory] = useState<Identity | null>(null);
  const identity = memory ?? stored ?? null;

  if (!tool) return null;
  if (stored === undefined && !memory) return <div className="fl-card fl-loading" aria-busy="true" />;
  if (!identity) {
    return (
      <Gate
        tool={tool}
        onVerified={(next) => {
          setMemory(next);
          saveIdentity(next);
        }}
      />
    );
  }
  return (
    <ToolRunner
      key={identity.token}
      tool={tool}
      identity={identity}
      onSignOut={() => {
        setMemory(null);
        saveIdentity(null);
      }}
    />
  );
}

function Steps({ step }: { step: 1 | 2 | 3 }) {
  const labels = ["Your details", "Verify email", "The tool"];
  return (
    <ol className="learn-steps" aria-label="Progress">
      {labels.map((label, index) => (
        <li key={label} className={index + 1 === step ? "is-current" : index + 1 < step ? "is-done" : ""}>
          <span>{index + 1}</span>
          {label}
        </li>
      ))}
    </ol>
  );
}

function Gate({ tool, onVerified }: { tool: ToolSpec; onVerified: (identity: Identity) => void }) {
  const [stage, setStage] = useState<"details" | "code">("details");
  const [details, setDetails] = useState({ name: "", email: "", company: "", website: "", consent: false });
  const [challenge, setChallenge] = useState("");
  const [devCode, setDevCode] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);
  const codeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (stage === "code") codeRef.current?.focus();
  }, [stage]);

  const complete = details.name.trim() && details.email.trim() && details.company.trim() && details.website.trim() && details.consent;

  async function sendCode() {
    setBusy(true);
    setMessage(null);
    try {
      const response = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "start", magnet_slug: FOUNDERS_VERIFY_SCOPE, email: details.email.trim(), name: details.name.trim() }),
      });
      const data = (await response.json()) as { challenge?: string; dev_code?: string; error?: string };
      if (!response.ok || !data.challenge) throw new Error(data.error ?? "We couldn't send the code.");
      setChallenge(data.challenge);
      setDevCode(data.dev_code ?? "");
      setCode("");
      setStage("code");
      setMessage({ text: `We emailed a 6-digit code to ${details.email.trim()}.`, error: false });
    } catch (error) {
      setMessage({ text: error instanceof Error ? error.message : "We couldn't send the code.", error: true });
    } finally {
      setBusy(false);
    }
  }

  async function submitDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!complete) {
      setMessage({ text: "Fill in every field and check the box to continue.", error: true });
      return;
    }
    await sendCode();
  }

  async function submitCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const typed = code.replace(/\D/g, "");
    if (typed.length !== 6) {
      setMessage({ text: "Enter the 6-digit code from the email.", error: true });
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      const response = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "check", magnet_slug: FOUNDERS_VERIFY_SCOPE, challenge, code: typed }),
      });
      const data = (await response.json()) as { token?: string; error?: string };
      if (!response.ok || !data.token) throw new Error(data.error ?? "That code didn't work.");
      onVerified({
        name: details.name.trim(),
        email: details.email.trim(),
        company: details.company.trim(),
        website: details.website.trim(),
        token: data.token,
        savedAt: Date.now(),
      });
    } catch (error) {
      setMessage({ text: error instanceof Error ? error.message : "That code didn't work.", error: true });
    } finally {
      setBusy(false);
    }
  }

  if (stage === "code") {
    return (
      <form className="fl-card" data-fl-step="code" onSubmit={submitCode}>
        <Steps step={2} />
        <h3 className="fl-card-title">Check your email</h3>
        <p className="fl-card-copy">
          Enter the 6-digit code we sent to <strong>{details.email.trim()}</strong>. It expires in 15 minutes.
        </p>
        {devCode ? (
          <div className="learn-report-preview">
            <span>Preview mode</span>
            <p>Email isn&apos;t configured here, so the code is shown instead: {devCode}</p>
          </div>
        ) : null}
        <label className="learn-report-field learn-code-field">
          <span>Verification code</span>
          <input
            ref={codeRef}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={7}
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/[^0-9 ]/g, ""))}
            required
          />
        </label>
        <button className="learn-report-submit" type="submit" disabled={busy || code.replace(/\D/g, "").length !== 6}>
          {busy ? "Checking..." : "Verify and open the tool"}
        </button>
        <div className="learn-gate-links">
          <button type="button" className="learn-link-button" disabled={busy} onClick={() => void sendCode()}>
            Resend code
          </button>
          <button type="button" className="learn-link-button" onClick={() => setStage("details")}>
            Use a different email
          </button>
        </div>
        {message ? <p className={message.error ? "learn-report-message is-error" : "learn-report-message"}>{message.text}</p> : null}
      </form>
    );
  }

  return (
    <form className="fl-card" data-fl-step="details" onSubmit={submitDetails}>
      <Steps step={1} />
      <div className="learn-report-kicker">Free · about {tool.pages.length + 1} minutes</div>
      <h3 className="fl-card-title">Open the {tool.title}</h3>
      <p className="fl-card-copy">
        Tell us who you are and we&apos;ll email a code to confirm your address. One verification unlocks every tool in the Founder Library,
        and your report arrives by email.
      </p>
      <div className="learn-report-fields fl-two-col">
        <Text label="Name" value={details.name} autoComplete="name" onChange={(name) => setDetails((current) => ({ ...current, name }))} />
        <Text label="Work email" type="email" inputMode="email" autoComplete="email" value={details.email} onChange={(email) => setDetails((current) => ({ ...current, email }))} />
        <Text label="Company name" value={details.company} autoComplete="organization" onChange={(company) => setDetails((current) => ({ ...current, company }))} />
        <Text label="Company website" inputMode="url" autoComplete="url" value={details.website} onChange={(website) => setDetails((current) => ({ ...current, website }))} />
      </div>
      <label className="learn-report-consent">
        <input type="checkbox" checked={details.consent} onChange={(event) => setDetails((current) => ({ ...current, consent: event.target.checked }))} />
        <span>{consentText}</span>
      </label>
      <button className="learn-report-submit" type="submit" disabled={busy || !complete}>
        {busy ? "Sending code..." : "Email me a code"}
      </button>
      {message ? <p className={message.error ? "learn-report-message is-error" : "learn-report-message"}>{message.text}</p> : null}
    </form>
  );
}

function Text({
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
  inputMode?: "email" | "url";
  autoComplete?: string;
}) {
  return (
    <label className="learn-report-field">
      <span>{label}</span>
      <input type={type} value={value} inputMode={inputMode} autoComplete={autoComplete} required onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function ToolRunner({ tool, identity, onSignOut }: { tool: ToolSpec; identity: Identity; onSignOut: () => void }) {
  const [values, setValues] = useState<Values>(() => initialValues(tool.pages));
  const [pageIndex, setPageIndex] = useState(0);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ report: ToolReport; emailed: boolean } | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const page = tool.pages[pageIndex];
  const last = pageIndex === tool.pages.length - 1;
  const progress = Math.round(((pageIndex + (result ? 1 : 0)) / tool.pages.length) * 100);

  function scrollTop() {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function setValue(id: string, value: FieldValue) {
    setValues((current) => ({ ...current, [id]: value }));
  }

  async function submit() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/founders/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: tool.slug,
          values: visibleValues(tool, values),
          name: identity.name,
          email: identity.email,
          company: identity.company,
          website: identity.website,
          consent: true,
          verification_token: identity.token,
        }),
      });
      const data = (await response.json()) as { report?: ToolReport; email_delivery?: string; error?: string; code?: string };
      if (response.status === 401 && data.code === "token") {
        onSignOut();
        return;
      }
      if (!response.ok || !data.report) throw new Error(data.error ?? "We couldn't build the report.");
      setResult({ report: data.report, emailed: data.email_delivery === "sent" });
      scrollTop();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "We couldn't build the report.");
    } finally {
      setBusy(false);
    }
  }

  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const problem = validatePage(visiblePage(page, values), values);
    if (problem) {
      setError(problem);
      return;
    }
    setError("");
    if (last) {
      void submit();
      return;
    }
    setPageIndex((index) => index + 1);
    scrollTop();
  }

  if (result) {
    return (
      <div ref={topRef} className="fl-card fl-report" data-fl-step="report">
        <ReportView tool={tool} report={result.report} />
        <p className="fl-emailed">
          {result.emailed ? (
            <>
              We emailed this report to <strong>{identity.email}</strong>.
            </>
          ) : (
            <>Your report is ready. Email delivery is off in this preview, so it is shown here only.</>
          )}
        </p>
        <div className="fl-report-actions">
          <a className="learn-report-submit fl-button" href={BOOKING_URL}>
            Book a Free Consultation
          </a>
          <button
            type="button"
            className="learn-link-button"
            onClick={() => {
              setResult(null);
              setPageIndex(0);
            }}
          >
            Change my inputs
          </button>
        </div>
        <RelatedTools tool={tool} />
      </div>
    );
  }

  return (
    <div ref={topRef}>
      <form className="fl-card fl-tool-form" data-fl-step="tool" data-fl-page={pageIndex + 1} onSubmit={next} noValidate>
        <div className="learn-verified-identity fl-identity">
          <span>
            Signed in as <strong>{identity.email}</strong> for {identity.company}
          </span>
          <button type="button" className="learn-link-button" onClick={onSignOut}>
            Not you?
          </button>
        </div>
        <div className="learn-progress" aria-label={`Step ${pageIndex + 1} of ${tool.pages.length}`}>
          <div className="learn-progress-meta">
            <span>
              Step {pageIndex + 1} of {tool.pages.length}
            </span>
            <span>{page.title}</span>
          </div>
          <div className="learn-progress-track">
            <div className="learn-progress-fill" style={{ width: `${Math.max(progress, 4)}%` }} />
          </div>
        </div>
        <h3 className="fl-card-title">{page.title}</h3>
        {page.intro ? <p className="fl-card-copy">{page.intro}</p> : null}
        <div className="fl-fields">
          {page.fields.map((field) =>
            isVisible(field.showIf, values as Record<string, unknown>) ? (
              <FieldControl key={field.id} field={field} value={values[field.id]} onChange={(value) => setValue(field.id, value)} />
            ) : null,
          )}
        </div>
        {error ? <p className="learn-report-message is-error">{error}</p> : null}
        <div className="learn-page-nav">
          {pageIndex > 0 ? (
            <button
              type="button"
              className="learn-page-back"
              onClick={() => {
                setError("");
                setPageIndex((index) => index - 1);
              }}
            >
              Back
            </button>
          ) : null}
          <button className="learn-report-submit" type="submit" disabled={busy}>
            {busy ? "Building your report..." : last ? "Get my report" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}

/** Drops values for fields (and row fields) that are hidden, so the server sees exactly what's shown. */
function visibleValues(tool: ToolSpec, values: Values) {
  const output: Record<string, unknown> = {};
  for (const page of tool.pages) {
    for (const field of page.fields) {
      if (!isVisible(field.showIf, values as Record<string, unknown>)) continue;
      const value = values[field.id];
      if (field.kind === "rows" && Array.isArray(value)) {
        output[field.id] = (value as RowValue[]).map((row) => {
          const clean: RowValue = {};
          for (const sub of field.fields) if (isVisible(sub.showIf, row) && row[sub.id] !== undefined) clean[sub.id] = row[sub.id];
          return clean;
        });
      } else {
        output[field.id] = value;
      }
    }
  }
  return output;
}

function visiblePage(page: ToolSpec["pages"][number], values: Values) {
  return { ...page, fields: page.fields.filter((field) => isVisible(field.showIf, values as Record<string, unknown>)) };
}

function FieldShell({ label, help, children, as = "label" }: { label: string; help?: string; children: ReactNode; as?: "label" | "fieldset" }) {
  if (as === "fieldset") {
    return (
      <fieldset className="fl-field fl-fieldset">
        <legend>{label}</legend>
        {help ? <p className="fl-help">{help}</p> : null}
        {children}
      </fieldset>
    );
  }
  return (
    <label className="fl-field">
      <span className="fl-label">{label}</span>
      {help ? <span className="fl-help">{help}</span> : null}
      {children}
    </label>
  );
}

function formatNumber(value: FieldValue | undefined, field: NumberField) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "";
  const digits = field.step && field.step < 1 ? 2 : 0;
  return value.toLocaleString("en-US", { maximumFractionDigits: digits });
}

function NumberInput({ field, value, onChange }: { field: NumberField; value: FieldValue | undefined; onChange: (value: FieldValue) => void }) {
  const [text, setText] = useState(() => formatNumber(value, field));
  const [focused, setFocused] = useState(false);
  const shown = focused ? text : formatNumber(value, field);
  const prefix = field.unit === "usd" ? "$" : null;
  const suffix =
    field.unit === "percent" ? "%" : field.unit === "months" ? "months" : field.unit === "years" ? "years" : field.unit === "shares" ? "shares" : field.unit === "days" ? "days" : field.unit === "people" ? "people" : null;
  return (
    <span className="fl-number">
      {prefix ? <span className="fl-affix">{prefix}</span> : null}
      <input
        type="text"
        inputMode="decimal"
        value={shown}
        aria-label={field.label}
        onFocus={() => {
          setFocused(true);
          setText(formatNumber(value, field));
        }}
        onBlur={() => setFocused(false)}
        onChange={(event) => {
          const raw = event.target.value.replace(/[^0-9.,-]/g, "");
          setText(raw);
          const parsed = Number(raw.replace(/,/g, ""));
          onChange(raw.trim() === "" ? "" : Number.isFinite(parsed) ? parsed : raw);
        }}
      />
      {suffix ? <span className="fl-affix">{suffix}</span> : null}
    </span>
  );
}

function ScalarControl({ field, value, onChange, compact = false }: { field: RowField | Field; value: FieldValue | undefined; onChange: (value: FieldValue) => void; compact?: boolean }) {
  switch (field.kind) {
    case "number":
      return <NumberInput field={field} value={value} onChange={onChange} />;
    case "text":
      return (
        <input
          className="fl-input"
          type="text"
          maxLength={field.maxLength}
          placeholder={field.placeholder}
          value={typeof value === "string" ? value : ""}
          aria-label={field.label}
          onChange={(event) => onChange(event.target.value)}
        />
      );
    case "date":
      return <input className="fl-input" type="date" value={typeof value === "string" ? value : ""} aria-label={field.label} onChange={(event) => onChange(event.target.value)} />;
    case "choice":
      if (field.display === "select" || compact) {
        return (
          <select className="fl-input" value={typeof value === "string" ? value : ""} aria-label={field.label} onChange={(event) => onChange(event.target.value)}>
            <option value="" disabled>
              Select one
            </option>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      }
      return null;
    default:
      return null;
  }
}

function FieldControl({ field, value, onChange }: { field: Field; value: FieldValue | undefined; onChange: (value: FieldValue) => void }) {
  if (field.kind === "choice" && field.display !== "select") {
    return (
      <FieldShell label={field.label} help={field.help} as="fieldset">
        <div className="learn-answer-options">
          {field.options.map((option) => (
            <label key={option.value} className="learn-answer-option">
              <input type="radio" name={field.id} value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} />
              <span>
                {option.label}
                {option.hint ? <small className="fl-option-hint">{option.hint}</small> : null}
              </span>
            </label>
          ))}
        </div>
      </FieldShell>
    );
  }
  if (field.kind === "multi") {
    const selected = Array.isArray(value) ? (value as string[]) : [];
    return (
      <FieldShell label={field.label} help={field.help} as="fieldset">
        <div className="learn-answer-options">
          {field.options.map((option) => (
            <label key={option.value} className="learn-answer-option">
              <input
                type="checkbox"
                checked={selected.includes(option.value)}
                onChange={(event) =>
                  onChange(event.target.checked ? [...selected, option.value] : selected.filter((item) => item !== option.value))
                }
              />
              <span>
                {option.label}
                {option.hint ? <small className="fl-option-hint">{option.hint}</small> : null}
              </span>
            </label>
          ))}
        </div>
      </FieldShell>
    );
  }
  if (field.kind === "rows") {
    const list = Array.isArray(value) ? (value as RowValue[]) : [];
    const blank: RowValue = Object.fromEntries(
      field.fields.map((sub) => [sub.id, sub.kind === "number" ? sub.default ?? sub.min : sub.kind === "choice" ? sub.default ?? sub.options[0]?.value ?? "" : ""]),
    );
    return (
      <FieldShell label={field.label} help={field.help} as="fieldset">
        <div className="fl-rows">
          {list.map((row, index) => (
            <div className="fl-row" key={index}>
              <div className="fl-row-head">
                <span>
                  {field.itemLabel} {index + 1}
                </span>
                {list.length > field.min ? (
                  <button type="button" className="learn-link-button" onClick={() => onChange(list.filter((_, i) => i !== index))}>
                    Remove
                  </button>
                ) : null}
              </div>
              <div className="fl-row-grid">
                {field.fields.map((sub) =>
                  isVisible(sub.showIf, row) ? (
                    <label key={sub.id} className="fl-field fl-field-compact">
                      <span className="fl-label">{sub.label}</span>
                      <ScalarControl
                        field={sub}
                        compact
                        value={row[sub.id]}
                        onChange={(next) => onChange(list.map((item, i) => (i === index ? { ...item, [sub.id]: next as string | number } : item)))}
                      />
                    </label>
                  ) : null,
                )}
              </div>
            </div>
          ))}
        </div>
        {list.length < field.max ? (
          <button type="button" className="fl-add-row" onClick={() => onChange([...list, { ...blank }])}>
            + {field.addLabel}
          </button>
        ) : null}
      </FieldShell>
    );
  }
  return (
    <FieldShell label={field.label} help={field.help}>
      <ScalarControl field={field} value={value} onChange={onChange} />
    </FieldShell>
  );
}

export function ReportView({ tool, report }: { tool: ToolSpec; report: ToolReport }) {
  return (
    <div className="fl-report-body">
      <div className="learn-report-kicker">Your {tool.title} report</div>
      <h3 className="fl-report-headline">{report.headline}</h3>
      <p className="fl-card-copy">{report.summary}</p>
      {report.metrics.length ? (
        <div className="fl-metrics">
          {report.metrics.map((metric) => (
            <div className="fl-metric" key={metric.label}>
              <span className="fl-metric-label">{metric.label}</span>
              <strong className="fl-metric-value">{metric.value}</strong>
              {metric.note ? <span className="fl-metric-note">{metric.note}</span> : null}
            </div>
          ))}
        </div>
      ) : null}
      {report.tables.map((table) => (
        <div className="fl-table-block" key={table.title}>
          <h4>{table.title}</h4>
          <div className="fl-table-scroll">
            <table className="fl-table">
              <thead>
                <tr>
                  {table.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, index) => (
                  <tr key={index} className={/^total$/i.test(row[0]) ? "is-total" : undefined}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {table.note ? <p className="fl-table-note">{table.note}</p> : null}
        </div>
      ))}
      {report.sections.map((section) => (
        <div className={`fl-section is-${section.tone ?? "info"}`} key={section.title}>
          <h4>{section.title}</h4>
          <ul>
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
      <div className="fl-next-steps">
        <h4>Next steps</h4>
        <ol>
          {report.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function RelatedTools({ tool }: { tool: ToolSpec }) {
  const related = useMemo(() => tool.related.map((slug) => getTool(slug)).filter((item): item is ToolSpec => Boolean(item)), [tool]);
  if (!related.length) return null;
  return (
    <div className="fl-related">
      <h4>Try next</h4>
      <div className="fl-related-grid">
        {related.map((item) => (
          <a key={item.slug} href={`/founders/${item.slug}`} className="fl-related-card">
            <span className="fl-related-meta">{item.meta}</span>
            <strong>{item.title}</strong>
          </a>
        ))}
      </div>
    </div>
  );
}
