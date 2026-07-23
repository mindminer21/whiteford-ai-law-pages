# Nightly Prospect Research — Source Availability Report

**Run label:** 2026-05-12  
**Run directory:** `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-12`  
**Generated:** 2026-05-12 (nightly run)

---

## Preflight Status — Two Separate Checks

### Check 1: Live Source Tools — FAILED

| Tool               | Status   | Error Detail                                              |
|--------------------|----------|-----------------------------------------------------------|
| `web_search`       | FAILED   | Payment Required: Insufficient credits                    |
| `web_extract`      | FAILED   | Payment Required: Insufficient credits                    |

Both web search and extraction returned `402 Payment Required: Insufficient credits`. This is a quota/credit limitation on the underlying Firecrawl service, not a network outage or authentication failure.

**Action taken:** Prospect staging stopped. No new companies researched. No contacts, evidence, or outreach drafts created.

### Check 2: Local Context/RAG — PARTIALLY AVAILABLE

| Resource                    | Status          | Notes                                               |
|-----------------------------|-----------------|-----------------------------------------------------|
| QMD collections             | Available       | `whiteford-ai-law-pages` and `business-development-rag` collections present |
| Business-development corpus | Available       | `/Users/jeff/.hermes/knowledge/business-development/` index accessible       |
| Required context files      | Loaded successfully | All 7 required docs read (see below)              |

**Note:** QMD and business-development RAG informed this run's context loading and rubric alignment. They CANNOT validate current company/contact facts, satisfy Gate 1, or override a live-source failure. They were used only for context and strategy alignment.

---

## Gate 1 Consequence: Live-Source Extraction Required — FAILED

All six hard gates depend on Gate 1 passing first. With live source tools unavailable:

- **Gate 2 (Domain/Entity Canonicalization):** Not reached — no entities to resolve.
- **Gate 3 (Current URL/Stale-Page Checks):** Not reached.
- **Gate 4 (Contact/Person Validation):** Not reached.
- **Gate 5 (LinkedIn URL Hygiene):** Not reached.
- **Gate 6 (Mountain West/Jurisdictional Claims):** Not reached.
- **Gate 7 (Outreach/CRM Readiness):** All prospects default to `research_only` because Gate 1 failed.

**No prospect records were written.** No entities were resolved. No contact records were created. No outreach drafts were prepared.

---

## What This Run Can Still Do

1. The full context was loaded and reviewed (7 docs). No changes to those docs are needed based on this run.
2. The QMD and business-development RAG can continue supporting rubric refinement, prompt improvement, and Agent Targeting packet schema updates in future runs.
3. When credit/quota is restored, prospect discovery should resume from the existing framework without re-reading context files.

---

## Remediation Required Before Next Prospecting Run

1. **Restore web_search/web_extract credits** — upgrade the Firecrawl plan or adjust request limits per https://firecrawl.dev/pricing.
2. **Confirm quota monitoring** — consider setting up a quota alert so prospect runs don't silently fail on credit limits again.
3. **Verify live-source access** — before next run, test with a neutral query (e.g., `site:example.com`) and confirm 200-level responses.
4. **No other gating changes needed** — all 7 required context files loaded correctly on the first attempt.

---

## Artifacts Written

- `source_unavailable_report.md` — this file
- `prospect_candidates.json` — no-op (empty array, zero candidates)
- `digest.md` — human review digest (status report only)

No additional artifacts were written because no prospects were discovered or scored.
