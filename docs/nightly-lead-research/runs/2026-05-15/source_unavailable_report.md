# Source Availability Report — 2026-05-15 Nightly Run

## Preflight: Live-Source vs. Local-context separation

**Gate 1 — Live-Source Tools** | **FAILED**

| Tool | Status | Error | Impact |
|---|---|---|---|
| `web_search` | FAILED | "Payment Required: Insufficient credits to perform this request." — Firecrawl API | No live web discovery, no company/job/funding/news search possible |
| `web_extract` | FAILED | "Payment Required: Insufficient credits to scrape." — Firecrawl API | No first-party URL verification, no LinkedIn/company-page extraction possible |

**Gate-1 conSequence: Stop prospect staging. No new prospects, contacts, evidence, or outreach drafts may be created until live-source tools are restored.**

---

**Local-context / RAG** | **UNAVAILABLE**

| Resource | Status | Impact |
|---|---|---|
| Business-development corpus index | Index not found (search_business_dev.py fails from all working directories) | No internal strategy/RAG support for scoring rubric or offer-lane reasoning |
| QMD (`whiteford-ai-law-pages` collection) | Not queried; business-dev index also broken | No local corpus cross-reference available |

**Important:** Local RAG/context and model memory do NOT substitute for live-source access. They cannot validate current facts, verify domains, resolve entities, or satisfy any gating requirement.

---

## What This Means for the Run

- **0 new prospects researched.**
- **0 new contacts identified.**
- **0 new evidence records.**
- **0 new outreach drafts.**
- **0 external actions or CRM writes.**

The Growth OS SQLite database (32 prospects across 30 companies) from prior runs remains the standing candidate pool. No new records were written to Growth OS, HighLevel, or Supabase.

---

## Remediation Required Before Next Run

1. **Firecrawl credits:** Upgrade or switch to an alternate extraction approach. Even a minimal credit package is required for Gate 1.
2. **Business-development corpus:** Run `build_index.py` from the correct environment so the corpus is queryable for scoring and lane-matching.
3. **QMD or other local index:** Ensure QMD collection is accessible and searchable before any future runs.

---

## Run Metadata

- Run ID: 2026-05-15
- Run directory: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-15`
- Artifact files: `prospect_candidates.json` (empty), `digest.md` (this file)
- No Kanban tasks created.
