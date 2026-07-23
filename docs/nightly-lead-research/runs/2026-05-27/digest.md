# Nightly Lead Research Digest — 2026-05-27

**Run Directory:** `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-27`
**Generated:** 2026-05-27 (two runs: cron attempt + manual re-run)

---

## Executive Summary

**Prospect research did NOT execute** on 2026-05-27. Both the overnight cron run and this manual re-run (kanban task t_569500d7) failed at **Gate 1** due to **Firecrawl credit exhaustion** — all `web_search`, `web_extract`, and `firecrawl_search` calls return HTTP 402 Payment Required. No prospects were identified, scored, researched, or staged.

**This is the second consecutive Gate 1 failure** (2026-05-27 cron and manual re-run). Without restored credits or a configured search replacement, the nightly research pipeline cannot produce new leads.

---

## Preflight Results

### Live Source Tools (Gate 1a)
- **web_search:** FAIL — HTTP 402 Payment Required
- **web_extract:** FAIL — HTTP 402 Payment Required
- **firecrawl_search (MCP):** FAIL — HTTP 402 Payment Required (same account confirmed)
- **Current status:** ALL EXHAUSTED

### Local Context / RAG (Gate 1b)
- **QMD:** Available (session memory confirms)
- **Business-development corpus:** NOT BUILT — `Index not found` error

### Separation
> Live-source failure (Firecrawl credits) is independent from local RAG availability. Neither QMD nor business-development RAG can substitute for live web extraction of prospect facts per Gate 1.

---

## Top Prospects Researched

**None.** Gate 1 blocked all prospect discovery on both overnight and manual re-runs.

---

## Evidence URLs

**None verified.** Both runs failed before any extraction could occur. No snippets were captured because every search call was rejected at the HTTP 402 layer.

---

## Consent Status

**N/A** — no prospects created.

---

## Key Contacts and Confidence

**None.** No contacts researched or validated.

---

## Outreach Vector Suggestions

**None drafted.** Gate 7 forces `research_only`; no prospects exist to draft against.

---

## Drafts Created for Review

| Artifact | Path | Status |
|---|---|---|
| `prospect_candidates.json` | `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-27/prospect_candidates.json` | Empty (Gate 1 failed) |
| `digest.md` | this file | This run's record |
| `source_unavailable_report.md` | `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-27/source_unavailable_report.md` | Detailed gate failure report |

---

## Records Created or Staged

- **Prospects:** 0
- **Contacts:** 0
- **Evidence records:** 0
- **Outreach drafts:** 0
- **Approval items:** 0

---

## Suppression / Confidence Issues

- **Blocking issue:** Firecrawl credit exhaustion (HTTP 402 on all extraction paths)
- **Confidence:** No data collected — cannot assess confidence for unexecuted research
- **Session note:** This is a manual re-run by t_569500d7 (qwen-local) after the overnight cron also hit this wall

---

## Recommended Next Kanban Tasks

1. **Urgent — Jeff:** Restore Firecrawl credits or upgrade plan at https://firecrawl.dev/pricing
2. **Urgent — ops:** Configure a pre-flight credit-check in nightly cron that alerts BEFORE attempting discovery
3. **High — qwen-local:** Configure alternate search replacement so qwen-local doesn't stall without Firecrawl
4. **High — qwen-local:** Build the business-development corpus index:
   ```bash
   cd /Users/jeff/.hermes/knowledge/business-development && python3 build_index.py
   ```
5. **Medium — reviewer:** Wait for credits restored, then re-run the nightly prospect research (t_638c01ab) with full 7-gate compliance
6. **Medium — reviewer:** Review this digest before approving the next run

---

## Validation Gate Summary

| Gate | Status | Blocked By |
|------|--------|------------|
| 1: Live-source extraction | FAILED | Firecrawl credits exhausted (both web_search and firecrawl_search return 402) |
| 2: Domain/entity canonicalization | BLOCKED | Gate 1 |
| 3: URL freshness checks | BLOCKED | Gate 1 |
| 4: Contact/person validation | BLOCKED | Gate 1 |
| 5: LinkedIn URL hygiene | BLOCKED | Gate 1 |
| 6: Mountain West/geographic support | BLOCKED | Gate 1 |
| 7: Outreach/CRM readiness | BLOCKED | Gate 1 (forced research_only) |

All prospects remain `research_only`. None advanced to CRM progression.

---

## Consecutive Nightly Gate 1 Failure Log

| Date | Status | Notes |
|------|--------|-------|
| 2026-05-22 | FAILED | web_search/web_extract both failed |
| 2026-05-23 | PASSED | 3 prospects (Josh.ai, AKASA, Deepwatch) |
| 2026-05-24 | PASSED | 3 prospects (Shield AI, Rhoda AI, Kodiak AI) |
| 2026-05-25 | PASSED | 3 prospects (Rhoda AI + 2 others) |
| 2026-05-26 | PASSED | 3 prospects (Physical Intelligence, XBOW, Patlytics) |
| 2026-05-27 | FAILED | Firecrawl credits exhausted (cron + manual) |

---

## Safety Confirmation

**No external outreach, live CRM write, workflow activation, or social action occurred.** No prospects were contacted, enrolled, messaged, or posted about. Both runs were research-only and halted at Gate 1.

---

## Artifact Paths

- **Prospect candidates JSON:** `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-27/prospect_candidates.json`
- **Source-unavailable report:** `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-27/source_unavailable_report.md`
- **This digest:** `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-27/digest.md`

---

**Summary:** This manual re-run (kanban task t_569500d7) confirms the overnight cron's same Gate 1 failure. Firecrawl credit restoration is required before the nightly prospect pipeline can resume producing leads.

**End of digest.**
