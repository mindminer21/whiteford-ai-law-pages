# Source-Unavailable Report — 2026-05-14

**Run label:** 2026-05-14
**Date:** 2026-05-14
**Status:** BLOCKED — live source extraction failed + expansion paused

---

## Preflight Results

| Dimension | Status | Details |
|---|---|---|
| `live_source_search_status` | **FAIL** | `web_search` returned `Payment Required: Failed to search. Insufficient credits to perform this request. For more credits, you can upgrade your plan at https://firecrawl.dev/pricing` |
| `live_source_extract_status` | **FAIL** | `web_extract` for `https://example.com` returned `Payment Required: Failed to scrape. Insufficient credits to perform this request.` |
| `qmd_status` | available (context only) | QMD index exists (collections: `whiteford-ai-law-pages`, `business-development-books`). Strategy/rubric support only. |
| `business_dev_rag_status` | available (context only) | Index at `/Users/jeff/.hermes/knowledge/business-development/business_dev_index.sqlite`. Strategy/rubric support only. |
| `expansion_paused` | **YES** | Confirmed per operating mode 2026-05-06: "Prospect expansion is paused while the lead magnets and HighLevel workflows are tightened." |

---

## Gate 1 Failure

**Gate 1 (Live-source extraction) = FAILED.**

Both `web_search` and `web_extract` failed with Payment Required / insufficient credits from the Firecrawl backend. Per the hardening rules in `docs/nightly-lead-research/qwen_tool_preflight_hardening_2026-05-09.md`:

- Gate 1 failure blocks all prospect discovery, scoring, staging, evidence capture, and outreach drafting.
- No named companies, contacts, or claims may be introduced during this blocked state.
- Only a `source_unavailable_report.md` and empty/no-op packet artifacts are written.

---

## Expansion Pause Confirmation

Per the current operating mode (effective 2026-05-06):

> "Prospect expansion is paused while the lead magnets and HighLevel workflows are tightened."
> "If asked to run during this pause, do not discover new companies."

This is a second, independent blocker. Even if live sources were restored, no new prospect discovery is authorized until Jeff reopens expansion.

---

## What Is Blocked

| Activity | Status | Reason |
|---|---|---|
| Prospect discovery | BLOCKED | Expansion paused + Gate 1 fail |
| Contact research | BLOCKED | Expansion paused + Gate 1 fail |
| Scoring & lane fit | BLOCKED | No prospects to score |
| Lead magnet matching | BLOCKED | No prospects to classify |
| Outreach vector drafting | BLOCKED | No prospects, expansion paused |
| LinkedIn awareness drafts | BLOCKED | No prospects, expansion paused |
| CRM / Supabase / GHL writes | BLOCKED | No expansion approval |
| Growth OS staging | BLOCKED | No expansion approval |
| Workflow trigger tags | BLOCKED | No prospects; consent gating |

---

## Remediation Required Before Next Run

1. **Restore live source access:** Upgrade Firecrawl plan or configure an alternative web-search/extract backend so `web_search` and `web_extract` return valid results.
2. **Reopen expansion:** Jeff must give explicit written approval to resume prospect discovery.
3. **Re-run smoke tests:** After (1), run `web_search(query="example.com", limit=1)` and `web_extract(urls=["https://example.com"])` to confirm both pass before any prospect work begins.

---

## Artifact Summary

- `prospect_candidates.json`: empty array (no-op)
- `digest.md`: this report; no prospects documented
- `source_unavailable_report.md`: this file

---

**No prospects, contacts, evidence records, drafts, or approval items were created.**
**No external outreach, live CRM write, workflow activation, or social action occurred.**
