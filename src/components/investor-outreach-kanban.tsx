"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  investorOutreachStages,
  signalRegions,
  signalSource,
  signalVerticals,
  type SignalStage,
} from "@/lib/investor-outreach/signal-public-lists";
import {
  buildPortfolioResearchQueue,
  portfolioEnrichmentVersion,
  summarizePortfolioMatches,
  type PortfolioCompanyMatch,
  type PortfolioResearchQueueItem,
} from "@/lib/investor-outreach/portfolio-enrichment";

const privacyGuardrailVersion = "lead-magnet-guardrail-v2";
const publicFormInputType = "categorical_non_confidential";
const reportVersion = "investor-outreach-kanban-privacy-guardrail-v1";
const boardStorageKey = "schellip-investor-outreach-board-v2";
const consultationUrl = "https://cal.com/jeffschell/talktoapatentlawyer?overlayCalendar=true";

type Contact = {
  name: string;
  email: string;
  company: string;
  role: string;
  subscribe: false;
};

type SubmitState = "idle" | "submitting" | "done" | "error";

type BoardCard = {
  title: string;
  note: string;
  href?: string;
  portfolioMatches?: PortfolioCompanyMatch[];
  researchQueue?: PortfolioResearchQueueItem[];
};

export type InvestorOutreachView =
  | "contact"
  | "check-email"
  | "confirm"
  | "round"
  | "categories"
  | "markets"
  | "stage"
  | "data-room"
  | "customizing"
  | "board";

const roundOptions = ["Pre-Seed", "Seed", "Series A", "Series B"] satisfies SignalStage[];
const currentStageOptions = [...investorOutreachStages];
const dataRoomOptions = [
  "Not started",
  "Skeleton folders only",
  "Populated but not diligence-ready",
  "Ready for investor diligence",
] as const;

type StoredBoardState = {
  contact: Contact;
  emailConfirmed: boolean;
  targetRound: SignalStage;
  selectedVerticals: string[];
  selectedRegions: string[];
  currentStage: (typeof investorOutreachStages)[number];
  dataRoomStatus: (typeof dataRoomOptions)[number];
  portfolioMatches: PortfolioCompanyMatch[];
  message: string;
  savedAt: string;
};

type InvestorOutreachKanbanProps = {
  view?: InvestorOutreachView;
  confirmedEmail?: string;
  confirmationToken?: string;
};

function defaultContact(): Contact {
  return {
    name: "",
    email: "",
    company: "",
    role: "",
    subscribe: false,
  };
}

function defaultStoredBoardState(): StoredBoardState {
  return {
    contact: defaultContact(),
    emailConfirmed: false,
    targetRound: "Seed",
    selectedVerticals: ["AI", "SaaS"],
    selectedRegions: ["Colorado / Utah"],
    currentStage: "Find investors",
    dataRoomStatus: "Skeleton folders only",
    portfolioMatches: [],
    message: "",
    savedAt: new Date().toISOString(),
  };
}

function toggleValue(values: string[], value: string, max: number) {
  if (values.includes(value)) return values.filter((item) => item !== value);
  if (values.length >= max) return values;
  return [...values, value];
}

function normalizeStage(stage: string) {
  return investorOutreachStages.find((item) => item === stage) ?? "Find investors";
}

function toStageKey(stage: string) {
  return stage.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

function splitIntoCards(items: string[], fallback: string) {
  return items.length ? items : [fallback];
}

function cleanEmail(value: string | undefined) {
  return (value ?? "").trim().toLowerCase();
}

function readStoredBoardRawState() {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(boardStorageKey);
}

function parseStoredBoardState(raw: string | null) {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredBoardState;
  } catch {
    return null;
  }
}

function subscribeToStoredBoardState(listener: () => void) {
  if (typeof window === "undefined") return () => {};

  const storageListener = (event: StorageEvent) => {
    if (event.key === boardStorageKey) listener();
  };
  window.addEventListener("storage", storageListener);
  window.addEventListener(boardStorageKey, listener);

  return () => {
    window.removeEventListener("storage", storageListener);
    window.removeEventListener(boardStorageKey, listener);
  };
}

function writeStoredBoardState(state: StoredBoardState) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(boardStorageKey, JSON.stringify(state));
  window.dispatchEvent(new Event(boardStorageKey));
}

function suggestedIntroSources(targetRound: SignalStage, regions: string[]) {
  const sources = [
    "Founder peers",
    "Lawyers / accountants",
    targetRound === "Pre-Seed" || targetRound === "Seed" ? "Angels / scouts" : "Existing investors",
    regions.length > 0 ? "Accelerator or community leaders" : "Strategic partners",
    targetRound === "Series A" || targetRound === "Series B"
      ? "Board members / advisors"
      : "Customers / design partners",
  ];
  return Array.from(new Set(sources)).slice(0, 5);
}

function isConfirmedView(view: InvestorOutreachView) {
  return ["round", "categories", "markets", "stage", "data-room", "customizing", "board"].includes(view);
}

function ConsultationCta() {
  return (
    <a className="investor-consultation-cta" href={consultationUrl} target="_blank" rel="noreferrer">
      Is your IP appropriately positioned to reach out to investors? If you need assistance, reach out to Whiteford | Schell IP for a free patent analysis consultation.
    </a>
  );
}

export function InvestorOutreachKanban({ view = "contact", confirmedEmail, confirmationToken }: InvestorOutreachKanbanProps) {
  const router = useRouter();
  const confirmationAttemptedRef = useRef<string | null>(null);
  const hasHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const storedBoardRawState = useSyncExternalStore(subscribeToStoredBoardState, readStoredBoardRawState, () => null);
  const storedBoardState = useMemo(() => parseStoredBoardState(storedBoardRawState), [storedBoardRawState]);
  const [contact, setContact] = useState<Contact>(defaultContact);
  const [targetRound, setTargetRound] = useState<SignalStage | null>(null);
  const [selectedVerticals, setSelectedVerticals] = useState<string[] | null>(null);
  const [selectedRegions, setSelectedRegions] = useState<string[] | null>(null);
  const [currentStage, setCurrentStage] = useState<(typeof investorOutreachStages)[number] | null>(null);
  const [dataRoomStatus, setDataRoomStatus] = useState<(typeof dataRoomOptions)[number] | null>(null);
  const [status, setStatus] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  const fallbackState = useMemo(() => defaultStoredBoardState(), []);
  const activeState = storedBoardState ?? fallbackState;
  const activeContact = view === "contact" ? contact : activeState.contact;
  const activeTargetRound = targetRound ?? activeState.targetRound;
  const activeSelectedVerticals = selectedVerticals ?? activeState.selectedVerticals;
  const activeSelectedRegions = selectedRegions ?? activeState.selectedRegions;
  const activeCurrentStage = currentStage ?? activeState.currentStage;
  const activeDataRoomStatus = dataRoomStatus ?? activeState.dataRoomStatus;
  const activePortfolioMatches = useMemo(() => activeState.portfolioMatches ?? [], [activeState.portfolioMatches]);
  const activeIntroSources = useMemo(
    () => suggestedIntroSources(activeTargetRound, activeSelectedRegions),
    [activeSelectedRegions, activeTargetRound],
  );
  const activeMessage = activeState.message || message;
  const activeEmail = cleanEmail(activeContact.email || confirmedEmail);

  const selectedSignalLinks = useMemo(
    () =>
      activeSelectedVerticals.flatMap((label) => {
        const vertical = signalVerticals.find((item) => item.label === label);
        const roundLink = vertical?.links.find((link) => link.stage === activeTargetRound) ?? vertical?.links[0];
        return roundLink ? [{ label, href: roundLink.href, stage: roundLink.stage }] : [];
      }),
    [activeSelectedVerticals, activeTargetRound],
  );

  const portfolioResearchQueue = useMemo(
    () =>
      buildPortfolioResearchQueue({
        companyName: activeContact.company,
        targetRound: activeTargetRound,
        regions: activeSelectedRegions,
        signalLinks: selectedSignalLinks,
      }),
    [activeContact.company, activeSelectedRegions, activeTargetRound, selectedSignalLinks],
  );

  const selectedRegionLinks = useMemo(
    () =>
      activeSelectedRegions.flatMap((label) => {
        const region = signalRegions.find((item) => item.label === label);
        return region ? [region] : [];
      }),
    [activeSelectedRegions],
  );

  const board = useMemo(() => {
    const columns = Object.fromEntries(investorOutreachStages.map((stage) => [stage, [] as BoardCard[]])) as Record<
      (typeof investorOutreachStages)[number],
      BoardCard[]
    >;

    for (const link of selectedSignalLinks) {
      const linkResearchQueue = portfolioResearchQueue.filter((item) => item.category === link.label).slice(0, 1);
      columns["Find investors"].push({
        title: `${link.label} - ${link.stage}`,
        note: "Start with Signal category fit, then screen for thesis, stage, geography, check size, and portfolio conflicts.",
        href: link.href,
        researchQueue: linkResearchQueue,
      });
    }
    for (const region of selectedRegionLinks) {
      columns["Find investors"].push({
        title: `${region.label} investor list`,
        note: "Use as a relationship-market filter; prioritize warm paths over cold volume.",
        href: region.href,
      });
    }

    for (const source of splitIntoCards(activeIntroSources, "Founder peers")) {
      columns["Identify introduction sources"].push({
        title: source,
        note: "List 3-5 people who can credibly explain fit without sharing confidential information.",
      });
      columns["Connect with introducers"].push({
        title: `Warm path through ${source.toLowerCase()}`,
        note: "Send a short forwardable blurb, target investor category, and why this investor is relevant.",
      });
    }

    columns["Identify introduction sources"].push({
      title: "Portfolio-company relevance research",
      note: `${summarizePortfolioMatches(activePortfolioMatches)} For each shortlisted investor, identify companies relevant to ${activeContact.company || "the user's company"} that the investor has backed, then attach CEO/founder name, public business contact, and source URL before outreach.`,
      portfolioMatches: activePortfolioMatches.slice(0, 4),
      researchQueue: portfolioResearchQueue.slice(0, 3),
    });

    columns["Connect with introducers"].push({
      title: "CEO peer contact packet",
      note: "Use verified portfolio-company CEO/founder contacts as reference-call or warm-path candidates only after confirming business relevance and public-source contact details.",
      portfolioMatches: activePortfolioMatches.slice(0, 4),
      researchQueue: activePortfolioMatches.length ? [] : portfolioResearchQueue.slice(0, 2),
    });

    columns["Request introduction"].push({
      title: "Ask for the intro",
      note: "Use a tight, non-confidential one-paragraph ask and make it easy for the introducer to forward.",
    });
    columns["Meeting set with investor"].push({
      title: `${activeTargetRound} meeting prep`,
      note: "Confirm thesis fit, partner/process owner, decision timeline, and next-step materials before the meeting.",
    });
    columns["Follow up and data room"].push({
      title: activeDataRoomStatus,
      note: "Prepare deck, cap table support, IP ownership records, patent/trade-secret posture, customer contracts, and AI/data notes.",
    });
    columns["Due diligence"].push({
      title: "Diligence request tracker",
      note: "Assign owners and dates for IP, contracts, corporate, data/privacy, employment, customer, and financing requests.",
    });
    columns["Due diligence"].push({
      title: "Verify portfolio CEO source trail",
      note: "Before relying on a portfolio-company CEO contact, confirm the company relationship, CEO/founder identity, contact channel, and source URL are current and public.",
      portfolioMatches: activePortfolioMatches.slice(0, 3),
    });
    columns["Funding"].push({
      title: "Closing and post-close rhythm",
      note: "Track legal closing checklist, signature packets, investor updates, and post-close IP/data-room cleanup.",
    });
    columns.Archive.push({
      title: "Archive cleanly",
      note: "Move not-fit, no-response, stale, competitor-conflict, and later-round candidates here with a reason category.",
    });

    const active = normalizeStage(activeCurrentStage);
    if (!columns[active].some((card) => card.title.includes("Current stage"))) {
      columns[active].unshift({
        title: "Current stage marker",
        note: "This is where your process says you are today. The next action should advance one column, not restart the whole list.",
      });
    }

    return columns;
  }, [
    activeContact.company,
    activeCurrentStage,
    activeDataRoomStatus,
    activeIntroSources,
    activePortfolioMatches,
    activeTargetRound,
    portfolioResearchQueue,
    selectedRegionLinks,
    selectedSignalLinks,
  ]);

  const stageCounts = useMemo(
    () =>
      Object.fromEntries(
        investorOutreachStages.map((stage) => [toStageKey(stage), board[stage].length]),
      ) as Record<string, number>,
    [board],
  );

  useEffect(() => {
    if (view !== "confirm" || !hasHydrated) return;

    if (confirmationToken) {
      if (confirmationAttemptedRef.current === confirmationToken) return;
      confirmationAttemptedRef.current = confirmationToken;
      let cancelled = false;
      setStatus("submitting");
      setMessage("");

      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignKey: "investor-outreach",
          sourcePage: "investor-outreach-kanban/confirm",
          sourceChannel: "learn.schellip.com",
          contact: {
            subscribe: false,
          },
          investorOutreach: {
            phase: "confirm",
            confirmationToken,
          },
        }),
      })
        .then(async (response) => {
          const data = (await response.json()) as { contact?: Contact; error?: string };
          if (!response.ok || !data.contact) throw new Error(data.error ?? "Email confirmation failed.");
          if (cancelled) return;
          const current = parseStoredBoardState(readStoredBoardRawState()) ?? defaultStoredBoardState();
          writeStoredBoardState({
            ...current,
            contact: data.contact,
            emailConfirmed: true,
            savedAt: new Date().toISOString(),
          });
          setStatus("done");
        })
        .catch((error) => {
          if (cancelled) return;
          setStatus("error");
          setMessage(error instanceof Error ? error.message : "The confirmation link could not be verified.");
        });

      return () => {
        cancelled = true;
      };
    }
  }, [confirmationToken, hasHydrated, view]);

  useEffect(() => {
    if (view !== "customizing" || !hasHydrated || !storedBoardState?.emailConfirmed) return;

    const timeout = window.setTimeout(() => {
      router.replace("/investor-outreach-kanban/board");
    }, 1800);

    return () => window.clearTimeout(timeout);
  }, [hasHydrated, router, storedBoardState, view]);

  function saveWizardState(patch: Partial<StoredBoardState>) {
    const current = parseStoredBoardState(readStoredBoardRawState()) ?? storedBoardState ?? defaultStoredBoardState();
    writeStoredBoardState({
      ...current,
      ...patch,
      savedAt: new Date().toISOString(),
    });
  }

  const canSubmitContact =
    Boolean(contact.name.trim()) &&
    Boolean(contact.email.trim()) &&
    Boolean(contact.company.trim()) &&
    Boolean(contact.role.trim());

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmitContact) {
      setStatus("error");
      setMessage("Name, work email, company name, and title are required.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    const cleanContact: Contact = {
      name: contact.name.trim(),
      email: cleanEmail(contact.email),
      company: contact.company.trim(),
      role: contact.role.trim(),
      subscribe: false,
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignKey: "investor-outreach",
          sourcePage: "investor-outreach-kanban/start",
          sourceChannel: "learn.schellip.com",
          contact: cleanContact,
          investorOutreach: {
            phase: "contact",
          },
        }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) throw new Error(data.error ?? "Contact capture failed.");
      writeStoredBoardState({
        ...defaultStoredBoardState(),
        contact: cleanContact,
        savedAt: new Date().toISOString(),
      });
      setStatus("done");
      router.push("/investor-outreach-kanban/check-email");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "The contact request could not be submitted.");
    }
  }

  async function submitPlan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!storedBoardState?.emailConfirmed || !activeEmail) {
      setStatus("error");
      setMessage("Confirm your email before building the investor board.");
      return;
    }
    if (!activeTargetRound || activeSelectedVerticals.length === 0 || activeSelectedRegions.length === 0) {
      setStatus("error");
      setMessage("Choose a target round, at least one investor category, and at least one relationship market.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    const introSources = suggestedIntroSources(activeTargetRound, activeSelectedRegions);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignKey: "investor-outreach",
          sourcePage: "investor-outreach-kanban/data-room",
          sourceChannel: "learn.schellip.com",
          reportRequested: true,
          privacyGuardrailVersion,
          publicFormInputType,
          contact: {
            name: activeContact.name,
            email: activeEmail,
            company: activeContact.company,
            role: activeContact.role,
            subscribe: false,
          },
          investorOutreach: {
            phase: "plan",
            emailConfirmed: true,
            targetRound: activeTargetRound,
            investorCategories: activeSelectedVerticals,
            investorRegions: activeSelectedRegions,
            currentStage: activeCurrentStage,
            introSources,
            dataRoomStatus: activeDataRoomStatus,
            portfolioResearchQueue,
            portfolioMatches: activePortfolioMatches,
            portfolioEnrichmentVersion,
            kanbanStageCounts: stageCounts,
            reportVersion,
          },
        }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) throw new Error(data.error ?? "Plan capture failed.");
      const nextMessage = "Your board is ready. No nurture, newsletter, SMS, DM, social message, or other outbound follow-up was requested.";
      saveWizardState({
        message: nextMessage,
      });
      setStatus("done");
      router.push("/investor-outreach-kanban/customizing");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "The investor plan could not be submitted.");
    }
  }

  function continueTo(nextHref: string, patch: Partial<StoredBoardState>) {
    saveWizardState(patch);
    setStatus("idle");
    setMessage("");
    router.push(nextHref);
  }

  const boardPanel = (
    <aside className="investor-board-panel" aria-label="Investor outreach Kanban board">
      <div className="investor-board-header">
        <div>
          <div className="directory-meta">Populated board</div>
          <h3>{activeTargetRound} investor outreach board</h3>
        </div>
        <div className="investor-board-source">
          Source links: <a href={signalSource.homepage}>{signalSource.label}</a>
        </div>
      </div>
      <div className="investor-kanban-board">
        {investorOutreachStages.map((stage) => (
          <section className={stage === activeCurrentStage ? "investor-kanban-column investor-kanban-column-active" : "investor-kanban-column"} key={stage}>
            <h4>{stage}</h4>
            <div className="investor-kanban-cards">
              {board[stage].map((card) => (
                <article className="investor-kanban-card" key={`${stage}-${card.title}-${card.note}`}>
                  <strong>{card.title}</strong>
                  <p>{card.note}</p>
                  {card.href ? (
                    <a href={card.href} target="_blank" rel="noreferrer">
                      Open Signal list
                    </a>
                  ) : null}
                  {card.researchQueue?.length ? (
                    <div className="investor-card-research" aria-label="Portfolio-company CEO research queue">
                      <span>CEO portfolio research</span>
                      {card.researchQueue.map((item) => (
                        <p key={`${card.title}-${item.investorSegment}`}>
                          {item.investorSegment}: find relevant portfolio companies for {item.targetCompany}; verify CEO/founder contact and source URL.
                        </p>
                      ))}
                    </div>
                  ) : null}
                  {card.portfolioMatches?.length ? (
                    <div className="investor-card-matches" aria-label="Verified portfolio-company CEO matches">
                      <span>Verified matches</span>
                      {card.portfolioMatches.map((match) => (
                        <p key={`${card.title}-${match.investorName}-${match.portfolioCompany}`}>
                          {match.investorName}: {match.portfolioCompany} CEO {match.ceoName}
                          {match.ceoEmail ? ` (${match.ceoEmail})` : ""}
                          {match.ceoLinkedIn ? " - LinkedIn attached" : ""}
                        </p>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </aside>
  );

  if (view !== "contact" && !hasHydrated) {
    return (
      <section className="investor-kanban-shell investor-flow-shell" aria-live="polite">
        <div className="investor-flow-panel">
          <div className="directory-eyebrow">Investor outreach board</div>
          <h1>Loading your investor list.</h1>
        </div>
      </section>
    );
  }

  if (isConfirmedView(view) && !storedBoardState?.emailConfirmed) {
    return (
      <section className="investor-kanban-shell investor-flow-shell">
        <div className="investor-flow-panel">
          <div className="directory-eyebrow">Investor outreach board</div>
          <h1>Confirm your email first.</h1>
          <p>Use the confirmation link sent to your work email to unlock the step-by-step investor outreach wizard.</p>
          <Link className="investor-flow-action" href="/investor-outreach-kanban/start">
            Start again
          </Link>
        </div>
      </section>
    );
  }

  if (view === "check-email") {
    return (
      <section className="investor-kanban-shell investor-flow-shell">
        <div className="investor-flow-panel">
          <div className="directory-eyebrow">Investor outreach confirmation</div>
          <h1>Check your email.</h1>
          <p>
            We sent a confirmation link through Learn Schell IP
            {activeEmail ? ` to ${activeEmail}` : ""}. Open that link to continue to the planning steps.
            Your contact details are pushed into HighLevel only after you confirm.
          </p>
          <Link className="investor-flow-action" href="/investor-outreach-kanban/start">
            Edit contact details
          </Link>
        </div>
      </section>
    );
  }

  if (view === "confirm") {
    const confirmed = Boolean(storedBoardState?.emailConfirmed);
    const isConfirming = Boolean(confirmationToken) && !confirmed && status !== "error";
    return (
      <section className="investor-kanban-shell investor-flow-shell" aria-live="polite">
        <div className="investor-flow-panel">
          <div className="directory-eyebrow">Investor outreach confirmation</div>
          <h1>{confirmed ? "Email confirmed." : isConfirming ? "Confirming your email." : "Confirmation link incomplete."}</h1>
          <p>
            {confirmed
              ? "Email confirmed. Your contact details have now been pushed into HighLevel, and you can finish the investor outreach plan."
              : isConfirming
                ? "One moment while we verify the confirmation link and push your contact details into HighLevel."
                : "The confirmation link is missing a confirmation token."}
          </p>
          {message ? <p className={`investor-status investor-status-${status}`}>{message}</p> : null}
          {confirmed ? (
            <Link className="investor-flow-action" href="/investor-outreach-kanban/round">
              Continue to target financing round
            </Link>
          ) : null}
          {!confirmationToken ? (
            <Link className="investor-flow-action investor-flow-action-secondary" href="/investor-outreach-kanban/start">
              Start again
            </Link>
          ) : null}
        </div>
      </section>
    );
  }

  if (view === "customizing") {
    return (
      <section className="investor-kanban-shell investor-flow-shell" aria-live="polite">
        <div className="investor-flow-panel investor-flow-panel-progress">
          <div className="directory-eyebrow">Investor outreach board</div>
          <h1>Customizing and populating your investor list.</h1>
          <div className="investor-progress-track" aria-hidden="true">
            <span />
          </div>
          <div className="investor-customizing-steps">
            <span>Matching your round to Signal/NFX categories</span>
            <span>Suggesting warm introduction sources automatically</span>
            <span>Preparing your populated Kanban board</span>
          </div>
          <ConsultationCta />
        </div>
      </section>
    );
  }

  if (view === "board") {
    return (
      <section className="investor-kanban-shell investor-board-shell">
        <div className="investor-board-result">
          <div className="investor-board-result-heading">
            <div>
              <div className="directory-eyebrow">Investor outreach board</div>
              <h1>Your investor list is ready.</h1>
              {activeMessage ? <p className="investor-status investor-status-done">{activeMessage}</p> : null}
            </div>
            <Link href="/investor-outreach-kanban/start">Build another board</Link>
          </div>
          <ConsultationCta />
          {boardPanel}
        </div>
      </section>
    );
  }

  if (view === "round") {
    return (
      <section className="investor-kanban-shell investor-flow-shell">
        <div className="investor-flow-panel investor-step-panel">
          <div className="directory-eyebrow">Step 1 of 5</div>
          <h1>Target financing round</h1>
          <p>Choose the financing round that should shape the investor list.</p>
          <div className="investor-pill-grid investor-pill-grid-tight" role="group" aria-label="Target financing round">
            {roundOptions.map((option) => (
              <button
                aria-pressed={activeTargetRound === option}
                className={activeTargetRound === option ? "investor-pill investor-pill-active" : "investor-pill"}
                key={option}
                onClick={() => setTargetRound(option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
          <div className="investor-step-actions">
            <button className="investor-submit" onClick={() => continueTo("/investor-outreach-kanban/categories", { targetRound: activeTargetRound })} type="button">
              Continue
            </button>
          </div>
          <ConsultationCta />
        </div>
      </section>
    );
  }

  if (view === "categories") {
    return (
      <section className="investor-kanban-shell investor-flow-shell">
        <div className="investor-flow-panel investor-step-panel">
          <div className="directory-eyebrow">Step 2 of 5</div>
          <h1>Investor categories</h1>
          <p>Choose up to five Signal/NFX categories for the first pass through investor fit.</p>
          <div className="investor-pill-grid" role="group" aria-label="Investor categories">
            {signalVerticals.map((vertical) => (
              <button
                aria-pressed={activeSelectedVerticals.includes(vertical.label)}
                className={activeSelectedVerticals.includes(vertical.label) ? "investor-pill investor-pill-active" : "investor-pill"}
                key={vertical.label}
                onClick={() => setSelectedVerticals((current) => toggleValue(current ?? activeSelectedVerticals, vertical.label, 5))}
                type="button"
              >
                {vertical.label}
              </button>
            ))}
          </div>
          <div className="investor-step-actions">
            <Link className="investor-flow-action investor-flow-action-secondary" href="/investor-outreach-kanban/round">
              Back
            </Link>
            <button
              className="investor-submit"
              disabled={activeSelectedVerticals.length === 0}
              onClick={() => continueTo("/investor-outreach-kanban/markets", { selectedVerticals: activeSelectedVerticals })}
              type="button"
            >
              Continue
            </button>
          </div>
          <ConsultationCta />
        </div>
      </section>
    );
  }

  if (view === "markets") {
    return (
      <section className="investor-kanban-shell investor-flow-shell">
        <div className="investor-flow-panel investor-step-panel">
          <div className="directory-eyebrow">Step 3 of 5</div>
          <h1>Relationship markets</h1>
          <p>Choose up to three markets where warm introductions or regional fit should guide prioritization.</p>
          <div className="investor-pill-grid" role="group" aria-label="Relationship markets">
            {signalRegions.map((region) => (
              <button
                aria-pressed={activeSelectedRegions.includes(region.label)}
                className={activeSelectedRegions.includes(region.label) ? "investor-pill investor-pill-active" : "investor-pill"}
                key={region.label}
                onClick={() => setSelectedRegions((current) => toggleValue(current ?? activeSelectedRegions, region.label, 3))}
                type="button"
              >
                {region.label}
              </button>
            ))}
          </div>
          <div className="investor-step-actions">
            <Link className="investor-flow-action investor-flow-action-secondary" href="/investor-outreach-kanban/categories">
              Back
            </Link>
            <button
              className="investor-submit"
              disabled={activeSelectedRegions.length === 0}
              onClick={() => continueTo("/investor-outreach-kanban/stage", { selectedRegions: activeSelectedRegions })}
              type="button"
            >
              Continue
            </button>
          </div>
          <ConsultationCta />
        </div>
      </section>
    );
  }

  if (view === "stage") {
    return (
      <section className="investor-kanban-shell investor-flow-shell">
        <div className="investor-flow-panel investor-step-panel">
          <div className="directory-eyebrow">Step 4 of 5</div>
          <h1>Current outreach stage</h1>
          <p>Set where the board should mark your process today.</p>
          <div className="investor-form-grid investor-form-grid-single">
            <label>
              <span>Current outreach stage</span>
              <select value={activeCurrentStage} onChange={(event) => setCurrentStage(event.target.value as (typeof investorOutreachStages)[number])}>
                {currentStageOptions.map((stage) => (
                  <option key={stage}>{stage}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="investor-step-actions">
            <Link className="investor-flow-action investor-flow-action-secondary" href="/investor-outreach-kanban/markets">
              Back
            </Link>
            <button className="investor-submit" onClick={() => continueTo("/investor-outreach-kanban/data-room", { currentStage: activeCurrentStage })} type="button">
              Continue
            </button>
          </div>
          <ConsultationCta />
        </div>
      </section>
    );
  }

  if (view === "data-room") {
    return (
      <section className="investor-kanban-shell investor-flow-shell">
        <form className="investor-flow-panel investor-step-panel" onSubmit={submitPlan}>
          <div className="directory-eyebrow">Step 5 of 5</div>
          <h1>Data room status</h1>
          <p>Choose the data-room posture that should shape the follow-up and diligence columns.</p>
          <div className="investor-form-grid investor-form-grid-single">
            <label>
              <span>Data room status</span>
              <select value={activeDataRoomStatus} onChange={(event) => setDataRoomStatus(event.target.value as (typeof dataRoomOptions)[number])}>
                {dataRoomOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="investor-step-actions">
            <Link className="investor-flow-action investor-flow-action-secondary" href="/investor-outreach-kanban/stage">
              Back
            </Link>
            <button className="investor-submit" disabled={status === "submitting"} type="submit">
              {status === "submitting" ? "Customizing board..." : "Customize and populate my investor list"}
            </button>
          </div>
          {message ? <p className={`investor-status investor-status-${status}`}>{message}</p> : null}
          <ConsultationCta />
        </form>
      </section>
    );
  }

  return (
    <section className="investor-kanban-shell investor-intake-shell" id="builder">
      <div className="investor-intake-layout">
        <form className="investor-kanban-form investor-kanban-form-standalone" onSubmit={submitContact}>
          <div className="directory-eyebrow">Investor outreach lead magnet</div>
          <h2>Start building your customized investor outreach plan.</h2>
          <p className="investor-kanban-copy">
            Enter the contact details needed for the confirmation link and later HighLevel drip email fields.
          </p>

          <div className="investor-form-grid">
            <label>
              <span>Name</span>
              <input
                value={contact.name}
                onChange={(event) => setContact({ ...contact, name: event.target.value })}
                placeholder="Ada Lovelace"
                disabled={status === "submitting"}
              />
            </label>
            <label>
              <span>Work email</span>
              <input
                value={contact.email}
                onChange={(event) => setContact({ ...contact, email: event.target.value })}
                placeholder="ada@company.com"
                type="email"
                disabled={status === "submitting"}
              />
            </label>
            <label>
              <span>Company name</span>
              <input
                value={contact.company}
                onChange={(event) => setContact({ ...contact, company: event.target.value })}
                placeholder="Company name"
                disabled={status === "submitting"}
              />
            </label>
            <label>
              <span>Title</span>
              <input
                value={contact.role}
                onChange={(event) => setContact({ ...contact, role: event.target.value })}
                placeholder="Founder / CEO"
                disabled={status === "submitting"}
              />
            </label>
          </div>

          <button className="investor-submit" disabled={!canSubmitContact || status === "submitting"} type="submit">
            {status === "submitting" ? "Starting plan..." : "Start building my customized investor outreach plan."}
          </button>
          {message ? <p className={`investor-status investor-status-${status}`}>{message}</p> : null}
        </form>
      </div>
    </section>
  );
}
