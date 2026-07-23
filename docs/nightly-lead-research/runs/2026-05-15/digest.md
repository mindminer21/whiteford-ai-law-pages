# Nightly Digest — 2026-05-15

## Executive Summary

**Run status: NOT_STARTED (halted at preflight)**

Gate 1 (live-source extraction) failed for both `web_search` and `web_extract` with "Payment Required: Insufficient credits." No prospect research, scoring, staging, or outreach-draft creation was performed. This run produced no new candidates, contacts, evidence, or drafts.

The standing candidate pool (32 prospects / 30 companies in Growth OS from prior runs) is unchanged.

## Run Artifacts

| Artifact | Path | Status |
|---|---|---|
| Source-unavailable report | `docs/nightly-lead-research/runs/2026-05-15/source_unavailable_report.md` | Written |
| Prospect candidates (empty) | `docs/nightly-lead-research/runs/2026-05-15/prospect_candidates.json` | Written (no-op) |
| Digest (this file) | `docs/nightly-lead-research/runs/2026-05-15/digest.md` | Written |

## Counts

| Item | Count |
|---|---|
| New prospects researched | 0 |
| New contacts identified | 0 |
| Evidence records written | 0 |
| Outreach drafts created | 0 |
| Approval items created | 0 |
| CRM sync records (pending) | 0 |
| External outreach / social / CRM writes | 0 |
| Kanban tasks created | 0 |

## Pre-Flight Results

**Gate 1 — Live-source extraction: FAILED**
- `web_search`: Payment Required / insufficient credits (Firecrawl)
- `web_extract`: Payment Required / insufficient credits (Firecrawl)

**Local RAG / context: UNAVAILABLE**
- Business-development corpus search index: not found / not built
- QMD collection: not queried

**Note:** Local RAG/context does NOT substitute for live-source per Gate 1 policy.

## Prior Standing Data (unchanged)

Growth OS SQLite (`/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`):
- 32 prospects across 30 companies.
- All pre-2026-05-15 records carry their existing `outreach_readiness_status`, `consent_basis`, `evidence_confidence`, and `lead_magnet_fit_lane` values.
- No new records written during this run.

## Validation-gate Summary (this run)

| Gate | Status | Notes |
|---|---|---|
| Gate 1 — Live-source extraction | FAILED | Firecrawl credits exhausted; no prospect staging allowed |
| Gate 2 — Domain/entity canonicalization | N/A | No companies evaluated |
| Gate 3 — Current URL / stale-page checks | N/A | No URLs opened |
| Gate 4 — Contact/person validation | N/A | No contacts evaluated |
| Gate 5 — LinkedIn URL hygiene | N/A | No URLs evaluated |
| Gate 6 — Mountain West / jurisdictional support | N/A | No companies evaluated |
| Gate 7 — Outreach / CRM readiness | N/A | No prospects staged |

## Lead-Magnet Fit Classification

N/A — no prospects researched on this run.

## Consent Status

N/A — no prospects evaluated.

## Outreach Vector Suggestions

N/A — no prospects researched.

## LinkedIn Awareness Post Drafts

N/A — no prospects researched.

## Suppression / Conflicts / Confidence Issues

N/A — no prospect evaluation performed.

## Recommended Next Kanban Tasks

1. **Restore Firecrawl credits or switch extraction provider** — without live-source access, no prospect run can proceed past preflight.
2. **Build / fix business-development corpus index** — run `build_index.py` from a working directory that resolves the corpus path, so scoring rubric support is available for future runs.
3. **Verify QMD collection accessibility** from the qwen-local profile before resuming.
4. **When live-source is restored, rerun prospect expansion** against the 1-3 company target with all seven gates enforced.
5. **When expansion resumes, review the prior 32-prospect standing pool** for freshness: re-validate source URLs, confirm domains, check contact verification status. Any stale records should be downgraded to `research_only` with remediation checklists.

## Final Statement

- Exactly 0 new prospects were researched.
- Exactly 0 contacts were identified.
- Exactly 0 evidence records, drafts, or approval items were created or staged.
- Zero external outreach, live CRM writes, workflow activations, or social actions occurred.
- The digest and empty prospect_candidates.json are written to the run directory for artifact completeness.

---

*Run completed: live-source failure at Gate 1. No prospect data produced.*
