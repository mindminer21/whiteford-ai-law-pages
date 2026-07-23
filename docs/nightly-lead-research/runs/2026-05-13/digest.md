# Nightly Lead Research Digest — 2026-05-13

## Execution Status

**Status:** RUN HALTED at Gate 1 (live-source extraction unavailable)
**Run Label:** 2026-05-13-nightly
**Run Directory:** `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-13`

---

## Executive Summary

Gate 1 live-source extraction failed for both `web_search` and `web_extract` (Firecrawl credits exhausted). No prospects were researched, scored, or staged. The business-development RAG corpus and local docs were available for context, but this cannot substitute for live-source verification. The run produced only no-op artifacts and a source-unavailability report.

---

## Preflight Results

| Check | Result | Details |
|---|---|---|
| Live search (`web_search` smoke test) | FAILED | Firecrawl "Payment Required: Insufficient credits" |
| Live extract (`web_extract` of example.com) | FAILED | Firecrawl "Payment Required: Insufficient credits" |
| Local QMD CLI | Available | `/Users/jeff/.local/bin/qmd` on PATH |
| Business-dev corpus | Available | Queryable via `search_business_dev.py` with `HOME=/Users/jeff` |

---

## Prospects Researched

**0 companies researched. 0 contacts staged.**

No prospects were discovered because live-source access is required before company research per the preflight and Gate 1 rules.

---

## Evidence URLs

No evidence URLs were collected.

---

## Lead-Magnet Fit Classification

Not applicable — no prospects were researched.

---

## Consent Status

Not applicable — no prospects were staged. All researched/imported prospects default to `lead_magnet_consented = false` and carry `ops:no-auto-send`.

---

## Key Contacts

None staged. Contact staging is blocked because live-source verification (Gate 4: contact validation, Gate 5: LinkedIn URL hygiene) could not run.

---

## Outreach Vector Suggestions

None drafted. Outreach vectors require at least 2 independently accessible public URLs (Gate 1 minimum) and validated company/contact facts (Gates 2–6).

---

## LinkedIn Awareness Post Draft Candidates

None drafted. LinkedIn drafts require validated public-source hooks (Gate 1 and Gate 3).

---

## Suppression/Confidence Issues

- **Gate 1 failed on both live-source tools:** `web_search` and `web_extract` are both unavailable due to Firecrawl credit exhaustion.
- All downstream gates (2–6) are in `skipped_gate1` state.

---

## Recommended Next Kanban Tasks

1. **Repair Firecrawl credits:** Upgrade plan or reduce per-call limits to avoid exhaustion. The daily quota was fully consumed by prior runs. Consider staggering the Hermes Agent run vs. the Qwen nightly run.
2. **Configure fallback search source:** Add an alternative web-search backend (e.g., Google Custom Search API) to the Hermes config as a secondary source.
3. **Review run logs** to identify which prior runs consumed the bulk of credits and whether any can be throttled.
4. **Once live source is restored,** re-run this nightly prompt with the same exact run directory and scope (1–3 prospects, research_only status).

---

## Artifact Paths

| Artifact | Path | Status |
|---|---|---|
| Source unavailable report | `docs/nightly-lead-research/runs/2026-05-13/source_unavailable_report.md` | Written |
| Prospect candidates JSON | `docs/nightly-lead-research/runs/2026-05-13/prospect_candidates.json` | Written (empty/no-op) |
| This digest | `docs/nightly-lead-research/runs/2026-05-13/digest.md` | Written |

---

## Counts Summary

| Item | Count |
|---|---|
| Companies researched | 0 |
| Contacts staged | 0 |
| Evidence records staged | 0 |
| Outreach drafts staged | 0 |
| LinkedIn awareness post drafts | 0 |
| Approval items staged | 0 |
| CRM/Supabase writes | 0 |
| Live GHL writes | 0 |

---

## Final Statements

- Exactly **0** companies were researched.
- Exactly **0** contacts were staged.
- Exactly **0** evidence records were created.
- Exactly **0** outreach vectors were drafted.
- Exactly **0** LinkedIn awareness post drafts were created.
- Exactly **0** CRM/Supabase writes occurred.
- No external outreach, live CRM write, workflow activation, or social action occurred.

The prospect candidates JSON at `prospect_candidates.json` contains an empty `prospects` array. The digest is complete but shows no substantive research output due to the Gate 1 failure documented in `source_unavailable_report.md`.
