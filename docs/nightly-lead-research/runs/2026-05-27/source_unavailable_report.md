# Source Unavailable Report — Gate 1 Failure — 2026-05-27

## Status: FAILED — No Live-Source Replacement Configured

**Run ID:** t_569500d7 (qwen-local manual re-run)
**Session Date:** 2026-05-27
**Tenant:** whiteford-mountain-west

## What Failed

All live-source extraction paths returned **Payment Required** (HTTP 402):

| Tool / Path | Status | Details |
|---|---|---|
| `web_search` (default web_search skill) | 402 Payment Required | Firecrawl credits exhausted (4th consecutive night) |
| `web_extract` (default) | 402 Payment Required | Same credit depletion |
| `firecrawl_search` (MCP) | 402 Payment Required | Confirmed same Firecrawl API account |
| `firecrawl_scrape` / `firecrawl_agent` | Likely 402 | Same account, same exhaustion state |
| Native browser tools | Not tested | Would still fail without credit for API-level actions |

## Root Cause

The Firecrawl API account that powers `web_search`, `web_extract`, and all MCP Firecrawl tools has **zero remaining credits**. This is not a quota-per-request issue — it is a full account credit depletion.

## What This Means

Per **Gate 1: Live-source extraction required** in the nightly prompt:

- **No prospect discovery** — cannot search or extract company/contact facts
- **No scoring** — no material facts to validate against rubric
- **No outreach drafts** — no prospects to draft against
- **No CRM/Supabase staging** — nothing to stage
- **Status must remain `research_only`** for any previously-introduced prospects

## Impact Assessment

This run has produced the same result as the overnight cron attempt on 2026-05-27 (cron run ID 796 area). The nightly cron `prospect_candidates.json` and `digest.md` already reflect this same failure. This manual re-run confirms it.

## Required Remediation (Urgent)

**Action 1 — Restore Firecrawl credits (immediate):**
Jeff must either:
- Upgrade the Firecrawl plan or add credits at https://firecrawl.dev/pricing
- Wait for credits to reset (depends on the Firecrawl plan's billing cycle)

**Action 2 — Configure a search replacement (high priority):**
Until credits are restored, the nightly research should be configured with an alternate search mechanism so the qwen-local profile does **not** stall on every run. Options:
- Configure a free-tier search API that feeds into web_search
- Set up a custom provider in the qwen-local profile for search/retrieval
- Add a pre-flight credit-check cron that alerts Jeff BEFORE it attempts prospect discovery

**Action 3 — Build the business-development corpus index (high priority):**
`search_business_dev.py` returned "Index not found". Building it would enable the `business-development-rag` skill to contribute even if live sources are down:
```bash
cd /Users/jeff/.hermes/knowledge/business-development
python3 build_index.py
```

## Previous Failures

Consecutive Gate 1 failures as of this report:
- 2026-05-22: Gate 1 failed (web_search/web_extract both failed)
- 2026-05-23: Gate 1 passed (3 prospects found: Josh.ai, AKASA, Deepwatch)
- 2026-05-24: Gate 1 passed (3 prospects found: Shield AI, Rhoda AI, Kodiak AI)
- 2026-05-25: Gate 1 passed (3 prospects found via firecrawl)
- 2026-05-26: Gate 1 passed (3 prospects found)
- 2026-05-27: Gate 1 FAILED (credit exhaustion — cron and manual re-run)

## Safety Confirmation

**No external actions occurred.** No emails sent, no CRM writes, no workflow activations, no social actions, no ad spend. All artifacts for this run are local-only and are empty/no-op.

---

*End of source_unavailable_report.md*
