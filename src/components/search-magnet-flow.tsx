"use client";

import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";
import { useMemo, useRef, useState } from "react";
import type { SearchMagnetConfig, SearchMagnetRoute } from "@/lib/search-magnets/configs";
import {
  dimensionBarTone,
  scoreSearchMagnet,
  type SearchMagnetScore,
} from "@/lib/search-magnets/scoring";

const calUrl = "https://cal.com/jeffschell/talktoapatentlawyer";

type View = "landing" | "capture" | "question" | "result";
type SubmitStatus = "idle" | "submitting" | "done" | "error";

type Contact = {
  name: string;
  company: string;
  title: string;
  email: string;
  consent: boolean;
};

type SearchMagnetFlowProps = {
  slug: SearchMagnetRoute;
  config: SearchMagnetConfig;
};

const initialContact: Contact = {
  name: "",
  company: "",
  title: "",
  email: "",
  consent: false,
};

function HtmlText({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

function dimFieldValues(score: SearchMagnetScore) {
  return Object.fromEntries(
    score.dimensions.map((dimension) => [
      dimension.key,
      {
        label: dimension.label,
        raw: dimension.raw,
        max: dimension.max,
        pct: Math.round(dimension.pct * 100),
      },
    ]),
  );
}

export function SearchMagnetFlow({ slug, config }: SearchMagnetFlowProps) {
  const [view, setView] = useState<View>("landing");
  const [contact, setContact] = useState<Contact>(initialContact);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | undefined>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const completedPostedRef = useRef(false);

  const score = useMemo(() => scoreSearchMagnet(config, answers), [answers, config]);
  const currentQuestion = config.questions[questionIndex];
  const captureReady =
    Boolean(contact.name.trim()) &&
    Boolean(contact.company.trim()) &&
    Boolean(contact.title.trim()) &&
    validEmail(contact.email) &&
    contact.consent;
  const progressPct =
    view === "capture"
      ? 5
      : view === "question"
        ? Math.min(96, Math.round(((questionIndex + 1) / (config.questions.length + 1)) * 100) + 5)
        : 100;

  function startTool() {
    setStatus("idle");
    setMessage("");
    setView("capture");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateContact(key: keyof Contact, value: string | boolean) {
    setContact((current) => ({ ...current, [key]: value }));
  }

  async function postEvent(event: "lead_captured" | "completed", eventScore?: SearchMagnetScore) {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact: {
          name: contact.name.trim(),
          email: contact.email.trim().toLowerCase(),
          company: contact.company.trim(),
          role: contact.title.trim(),
          subscribe: contact.consent,
        },
        searchMagnet: {
          slug,
          magnetId: config.id,
          event,
          tags: config.tags,
          score: eventScore?.totalRaw,
          scoreMax: eventScore?.totalMax,
          scorePercent: eventScore ? Math.round(eventScore.pct * 100) : undefined,
          tier: eventScore?.tier.label,
          dimensions: eventScore ? dimFieldValues(eventScore) : undefined,
          prioritizedActions: eventScore?.actions,
          answers: event === "completed" ? answers : undefined,
          resultVersion: "search-magnet-config-v1",
        },
        sourcePage: slug,
        sourceChannel: "learn.schellip.com",
      }),
    });
    const data = (await response.json()) as { error?: string; highlevel?: string; mode?: string };
    if (!response.ok) throw new Error(data.error ?? "Lead routing failed.");
    return data;
  }

  async function submitCapture(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!captureReady) {
      setStatus("error");
      setMessage("Complete full name, company, title, work email, and the consent checkbox before continuing.");
      return;
    }

    setStatus("submitting");
    setMessage("");
    try {
      await postEvent("lead_captured");
      setStatus("idle");
      setQuestionIndex(0);
      setView("question");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Lead capture failed.");
    }
  }

  function chooseAnswer(index: number) {
    setStatus("idle");
    setMessage("");
    setAnswers((current) => ({ ...current, [questionIndex]: index }));
  }

  async function nextQuestion() {
    if (answers[questionIndex] === undefined) {
      setStatus("error");
      setMessage("Choose one answer before continuing.");
      return;
    }

    if (questionIndex < config.questions.length - 1) {
      setStatus("idle");
      setMessage("");
      setQuestionIndex((current) => current + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setStatus("submitting");
    setMessage("");
    setView("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (completedPostedRef.current) {
      setStatus("done");
      return;
    }
    completedPostedRef.current = true;
    try {
      await postEvent("completed", score);
      setStatus("done");
      setMessage(`Result captured for ${contact.email.trim().toLowerCase()}.`);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "The result is ready, but lead routing failed.");
    }
  }

  function previousStep() {
    setStatus("idle");
    setMessage("");
    if (view === "capture") {
      setView("landing");
      return;
    }
    if (questionIndex === 0) {
      setView("capture");
      return;
    }
    setQuestionIndex((current) => current - 1);
  }

  return (
    <main className="search-magnet-page">
      <header className="search-magnet-topbar search-magnet-wrap">
        <Link href="/" className="search-magnet-logos" aria-label="Learn Schell IP home">
          <Image src="/logos/whiteford-navy-on-light.png" alt="Whiteford Taylor Preston" width={886} height={205} priority />
          <Image src="/logos/schellip-color.png" alt="Schell IP" width={982} height={149} priority />
        </Link>
        <span>learn.schellip.com</span>
      </header>

      {view === "landing" ? (
        <LandingView config={config} onStart={startTool} />
      ) : (
        <section className="search-magnet-tool">
          <div className="search-magnet-wrap search-magnet-progress-wrap">
            <div className="search-magnet-progress" aria-label="Progress">
              <span style={{ width: `${progressPct}%` }} />
            </div>
          </div>
          {view === "capture" ? (
            <CaptureView
              config={config}
              contact={contact}
              message={message}
              status={status}
              onBack={previousStep}
              onSubmit={submitCapture}
              onUpdate={updateContact}
            />
          ) : null}
          {view === "question" && currentQuestion ? (
            <QuestionView
              answer={answers[questionIndex]}
              config={config}
              questionIndex={questionIndex}
              status={status}
              message={message}
              onAnswer={chooseAnswer}
              onBack={previousStep}
              onNext={nextQuestion}
            />
          ) : null}
          {view === "result" ? (
            <ResultView config={config} contact={contact} score={score} message={message} status={status} />
          ) : null}
        </section>
      )}

      <Byline config={config} />
      <FooterDisclaimer config={config} />
    </main>
  );
}

function LandingView({ config, onStart }: { config: SearchMagnetConfig; onStart: () => void }) {
  return (
    <section className="search-magnet-landing" id="landing">
      <div className="search-magnet-wrap search-magnet-hero">
        <div className="search-magnet-hero-copy">
          <span className="search-magnet-kicker">{config.kicker}</span>
          <h1>
            <HtmlText html={config.titleHTML} />
          </h1>
          <p>{config.lede}</p>
          <div className="search-magnet-button-row">
            <button className="search-magnet-button" type="button" onClick={onStart}>
              {config.ctaStart} <span aria-hidden="true">→</span>
            </button>
            <span className="search-magnet-note">{config.meta}</span>
          </div>
        </div>
        <SamplePreview config={config} />
      </div>

      <section className="search-magnet-wrap search-magnet-section">
        <div className="search-magnet-section-label">How it works</div>
        <h2>
          <HtmlText html={config.howTitleHTML} />
        </h2>
        <div className="search-magnet-steps">
          {config.steps.map((step) => (
            <article className="search-magnet-step" key={step.num}>
              <div>{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="search-magnet-wrap search-magnet-section">
        <div className="search-magnet-section-label">{config.areasLabel}</div>
        <h2>
          <HtmlText html={config.areasTitleHTML} />
        </h2>
        <p className="search-magnet-section-copy">{config.areasLede}</p>
        <div className="search-magnet-areas">
          {config.areas.map((area) => (
            <article className="search-magnet-area" key={area.tag}>
              <div>{area.tag}</div>
              <h3>{area.title}</h3>
              <p>{area.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="search-magnet-wrap search-magnet-section">
        <div className="search-magnet-section-label">What you receive</div>
        <h2>
          <HtmlText html={config.getTitleHTML} />
        </h2>
        <ul className="search-magnet-get-list">
          {config.whatYouGet.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="search-magnet-button-row">
          <button className="search-magnet-button" type="button" onClick={onStart}>
            {config.ctaStart} <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    </section>
  );
}

function SamplePreview({ config }: { config: SearchMagnetConfig }) {
  return (
    <aside className="search-magnet-preview" aria-label="Sample output preview">
      <span>{config.preview.tag}</span>
      <h2>{config.preview.title}</h2>
      <p>{config.preview.sub}</p>
      <div className="search-magnet-preview-bars">
        {config.preview.bars.map((bar) => (
          <div className="search-magnet-preview-bar" key={bar.label}>
            <div>
              <span>{bar.label}</span>
              <span>
                {bar.val} / {bar.max}
              </span>
            </div>
            <div>
              <span style={{ width: `${Math.round((bar.val / bar.max) * 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="search-magnet-preview-actions">
        <span>Prioritized actions</span>
        <ol>
          {config.preview.actions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ol>
      </div>
    </aside>
  );
}

function CaptureView({
  config,
  contact,
  message,
  status,
  onBack,
  onSubmit,
  onUpdate,
}: {
  config: SearchMagnetConfig;
  contact: Contact;
  message: string;
  status: SubmitStatus;
  onBack: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onUpdate: (key: keyof Contact, value: string | boolean) => void;
}) {
  return (
    <form className="search-magnet-card" onSubmit={onSubmit} noValidate>
      <div className="search-magnet-screen-kicker">{config.captureKicker}</div>
      <h1>
        <HtmlText html={config.captureTitleHTML} />
      </h1>
      <p>{config.captureSub}</p>
      <div className="search-magnet-fields">
        <label>
          <span>Full name</span>
          <input
            autoComplete="name"
            placeholder="Jane Founder"
            value={contact.name}
            onChange={(event) => onUpdate("name", event.target.value)}
            required
          />
        </label>
        <label>
          <span>Company</span>
          <input
            autoComplete="organization"
            placeholder="Acme Robotics, Inc."
            value={contact.company}
            onChange={(event) => onUpdate("company", event.target.value)}
            required
          />
        </label>
        <label>
          <span>Title</span>
          <input
            autoComplete="organization-title"
            placeholder="CEO / General Counsel"
            value={contact.title}
            onChange={(event) => onUpdate("title", event.target.value)}
            required
          />
        </label>
        <label>
          <span>Work email</span>
          <input
            autoComplete="email"
            placeholder="jane@company.com"
            type="email"
            value={contact.email}
            onChange={(event) => onUpdate("email", event.target.value)}
            required
          />
        </label>
      </div>
      <label className="search-magnet-consent">
        <input
          checked={contact.consent}
          onChange={(event) => onUpdate("consent", event.target.checked)}
          type="checkbox"
        />
        <span>{config.consentText}</span>
      </label>
      <div className="search-magnet-actions">
        <button className="search-magnet-back" type="button" onClick={onBack}>
          ← Back
        </button>
        <button className="search-magnet-button" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Starting..." : "Start"} <span aria-hidden="true">→</span>
        </button>
      </div>
      {message ? <p className={`search-magnet-message search-magnet-message-${status}`}>{message}</p> : null}
      <p className="search-magnet-note">
        {config.meta} · {config.questions.length} questions ahead.
      </p>
    </form>
  );
}

function QuestionView({
  answer,
  config,
  questionIndex,
  status,
  message,
  onAnswer,
  onBack,
  onNext,
}: {
  answer: number | undefined;
  config: SearchMagnetConfig;
  questionIndex: number;
  status: SubmitStatus;
  message: string;
  onAnswer: (index: number) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const question = config.questions[questionIndex];
  return (
    <section className="search-magnet-card">
      <div className="search-magnet-screen-kicker">
        {question.dimLabel} · Question {questionIndex + 1} of {config.questions.length}
      </div>
      <h1>{question.text}</h1>
      {question.help ? <p>{question.help}</p> : null}
      <div className="search-magnet-options">
        {question.options.map((option, index) => (
          <button
            className={answer === index ? "search-magnet-option search-magnet-option-active" : "search-magnet-option"}
            key={option.text}
            onClick={() => onAnswer(index)}
            type="button"
          >
            <span aria-hidden="true" />
            <span>{option.text}</span>
          </button>
        ))}
      </div>
      <div className="search-magnet-actions">
        <button className="search-magnet-back" type="button" onClick={onBack}>
          ← Back
        </button>
        <button className="search-magnet-button" type="button" onClick={onNext} disabled={status === "submitting"}>
          {questionIndex === config.questions.length - 1 ? "See my result" : "Next"} <span aria-hidden="true">→</span>
        </button>
      </div>
      {message ? <p className={`search-magnet-message search-magnet-message-${status}`}>{message}</p> : null}
    </section>
  );
}

function ResultView({
  config,
  contact,
  score,
  message,
  status,
}: {
  config: SearchMagnetConfig;
  contact: Contact;
  score: SearchMagnetScore;
  message: string;
  status: SubmitStatus;
}) {
  return (
    <section className="search-magnet-card search-magnet-result-card">
      <div className="search-magnet-screen-kicker">Whiteford · Schell IP · {config.preview.title}</div>
      <h1>{config.result.intro.replace("{company}", contact.company.trim() || "Your company")}</h1>
      <div className="search-magnet-result-grid">
        <div className="search-magnet-score-card">
          <span>{config.scoreLabel}</span>
          <div>
            {score.totalRaw} / {score.totalMax}
          </div>
          <strong className={`search-magnet-tier-${dimensionBarTone(score.pct)}`}>{score.tier.label}</strong>
          <p>{score.tier.blurb}</p>
        </div>
        {score.dimensions.map((dimension) => (
          <article className="search-magnet-dim-card" key={dimension.key}>
            <div>{dimension.label}</div>
            <div>
              <span
                className={`search-magnet-dim-fill search-magnet-dim-${dimensionBarTone(dimension.pct)}`}
                style={{ width: `${Math.round(dimension.pct * 100)}%` }}
              />
            </div>
            <p>
              {dimension.raw} / {dimension.max}
            </p>
          </article>
        ))}
        <article className="search-magnet-priority-card">
          <h2>Your highest-priority areas to review</h2>
          <ol>
            {score.actions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ol>
        </article>
      </div>
      <div className="search-magnet-result-cta">
        <h2>{config.result.ctaTitle}</h2>
        <p>{config.result.ctaText}</p>
        <a className="search-magnet-button" href={calUrl} rel="noopener noreferrer" target="_blank">
          Schedule a time to speak with Jeff <span aria-hidden="true">→</span>
        </a>
      </div>
      <p className="search-magnet-note">
        A copy of this summary is queued to {contact.email.trim().toLowerCase()} through the approved follow-up workflow. {config.resultDisclaimer}
      </p>
      {message ? <p className={`search-magnet-message search-magnet-message-${status}`}>{message}</p> : null}
    </section>
  );
}

function Byline({ config }: { config: SearchMagnetConfig }) {
  return (
    <section className="search-magnet-wrap search-magnet-byline">
      <Image src="/logos/jeff-schell.jpg" alt="Jeff Schell" width={168} height={168} />
      <div>
        <h2>{config.byline.name}</h2>
        <div>{config.byline.role}</div>
        <p>{config.byline.bio}</p>
      </div>
    </section>
  );
}

function FooterDisclaimer({ config }: { config: SearchMagnetConfig }) {
  return (
    <footer className="search-magnet-footer">
      <div className="search-magnet-wrap">
        <div className="search-magnet-logos">
          <Image src="/logos/whiteford-white-on-navy.png" alt="Whiteford Taylor Preston" width={900} height={270} />
          <Image src="/logos/schellip-white.png" alt="Schell IP" width={982} height={149} />
        </div>
        <p>{config.footerDisclaimer}</p>
        <div>LEARN.SCHELLIP.COM · DENVER · WASHINGTON · MOUNTAIN WEST · © 2026 Whiteford Taylor &amp; Preston LLP · Attorney advertising</div>
      </div>
    </footer>
  );
}
