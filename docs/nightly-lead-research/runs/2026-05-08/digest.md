# Nightly Lead Research Digest — 2026-05-08

## Status: BLOCKED — Source Extraction Unavailable

This run failed to produce prospects because both web_search and web_extract are returning "Payment Required: Insufficient credits" errors. The browser tool loaded anthropic.com/company but all other targets were blocked by Cloudflare challenges.

## Executive Summary

- **Prospects researched:** 0
- **Prospects blocked:** N/A (research never started)
- **Outreach drafts:** 0
- **Live writes:** HighLevel=0, Supabase=0, Apollo.io=0, Outreach=0

## Root Causes

1. **Firecrawl credits exhausted** — `web_search` and `web_extract` both fail with "Payment Required"
2. **qmd ABI mismatch** — `better-sqlite3` compiled against Node ABI 137, but default runtime is Node v25 (ABI 141). `qmd status` and `qmd search` both crash.
3. **Business dev RAG index not built** — `business_dev_index.sqlite` does not exist; `build_index.py` has not been run.

## What Failed Per Gate

| Gate | Status | Detail |
|------|--------|--------|
| Gate 1: Live-source extraction | FAILED | web_search + web_extract both return payment errors. No prospect research possible. |
| Gate 2: Entity canonicalization | NOT_REACHED | No domain verification performed. |
| Gate 3: Current URL checks | NOT_REACHED | No URLs extracted. |
| Gate 4: Contact/person validation | NOT_REACHED | No contacts verified. |
| Gate 5: LinkedIn URL hygiene | NOT_REACHED | No LinkedIn verification performed. |
| Gate 6: Mountain West support | NOT_REACHED | No geo claims made. |
| Gate 7: Outreach readiness | NOT_APPLICABLE | No prospects produced; nothing to gate. |

## Candidates That Would Have Been Researched (If Sources Work)

Based on the quarterly research plan established in prior runs, the following lanes were targeted:

1. **AI Patent Strategy** — Search: "YC AI patent startup Series B funding 2025". Would target: AI/ML companies with proprietary tech, patent filings, product launches. Avoided 2025-05-07 candidates.
2. **AI Compliance** — Search: "AI governance platform Colorado AI Act enterprise SaaS". Would target: AI governance companies with Colorado regulatory exposure.
3. **Tech GC Launchpad** — Search: "Series B tech startup lean legal team". Would target: Growth-stage companies without visible full-time GC.
4. **M&A Readiness** — Search: "VC backed startup aging fund founder exit PE". Would target: VC-backed companies 5+ years post-funding with aging PE funds.

## Remediation Required

1. **Replenish firecrawl.dev credits** — Visit https://firecrawl.dev/pricing to activate more credits or upgrade plan.
2. **Rebuild qmd** — Run `npm rebuild better-sqlite3` in the qmd package directory, or run qmd via Node v24: `PATH="$HOME/.nvm/versions/node/v24.15.0/bin:$PATH" qmd ...`
3. **Build business dev RAG index** — Run `python3 ~/.hermes/knowledge/business-development/build_index.py` to generate `business_dev_index.sqlite`.
4. **Re-run this task** — Once sources are available, re-run task t_05c3fc5f or create a fresh nightly task.

## Deliverables Written

| File | Path | Purpose |
|------|------|---------|
| prospect_candidates.json | docs/nightly-lead-research/runs/2026-05-08/prospect_candidates.json | Structured candidate report (0 prospects, all blocked) |
| source_unavailable_report | docs/nightly-lead-research/runs/2026-05-08/source_unavailable_report.md | Gate-failure documentation |
| digest.md | docs/nightly-lead-research/runs/2026-05-08/digest.md | This file |

## No External Actions Taken

- No emails sent
- No LinkedIn messages
- No HighLevel writes or workflow activations
- No Supabase writes
- No Apollo.io enrichment calls
- No public posting or social action

## Recommended Next Kanban Tasks

1. **ops:** Replenish firecrawl credits and verify web_search/web_extract work (`assignee: ops`)
2. **ops:** Rebuild qmd better-sqlite3 ABI or verify Node v24 qmd works (`assignee: ops`)
3. **ops:** Build business_dev_rag index (`assignee: ops`)
4. **qwen-local:** Re-run nightly prospect research once sources are available (`assignee: qwen-local`)

---

Deliverable: /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-08/

Summary: Nightly run blocked on all 4 lanes due to firecrawl credit exhaustion; 0 prospects produced; remediation steps documented in deliverable directory.

Next action: Replenish firecrawl credits and rebuild qmd; then re-run t_05c3fc5f or create a fresh nightly task.
