# Nightly Lead Research Digest — 2026-05-16

**Run label:** 2026-05-16
**Run time:** 2026-05-16
**Agent:** qwen3.6:35b-a3b (Whiteford/Schell IP local Qwen prospect research agent)
**Status:** HALTED (Gate 1 failure — live-source extraction unavailable)

---

## Executive Summary

This nightly run was halted at the preflight stage because both web_search and web_extract tools (Firecrawl) returned "Payment Required: Insufficient credits." No prospects were researched, scored, contacted, or drafted. The local business-development corpus and QMD collections remain available and can be used for rubric refinement and strategy work, but they cannot substitute for live-source evidence per the mandatory hard gates.

## Top Prospects Researched

**None.** Zero new prospects researched due to live-source failure.

## Lead Magnet Fit Classification

Not applicable — no prospects were researched or scored.

## Consent Status

N/A — no prospects researched or staged.

## Key Contacts and Confidence

N/A — no contacts discovered.

## Outreach Vector Suggestions

N/A — no outreach drafts prepared.

## LinkedIn Awareness Post Draft Candidates

None prepared. No post drafts are appropriate without live-source-verified public facts about target companies.

## Drafts Created for Review

**0 drafts.** No outreach, awareness, or approval drafts created for this run.

## Records Written or Staged

| Artifact | Path | Status |
|---|---|---|
| Source unavailable report | `docs/nightly-lead-research/runs/2026-05-16/source_unavailable_report.md` | Written |
| Prospect candidates JSON | `docs/nightly-lead-research/runs/2026-05-16/prospect_candidates.json` | Written (no-op) |
| Digest (this file) | `docs/nightly-lead-research/runs/2026-05-16/digest.md` | Written |

Count summary: 0 companies researched, 0 contacts, 0 evidence records, 0 outreach drafts, 0 approval items, 0 CRM sync records.

## Suppression / Confidence / Confidence Issues

- **Gate 1 (live-source extraction):** FAILED. Both search and extract tools unavailable.
- No suppression/conflict checks could be performed because no prospects were researched.

## Validation-Gate Summary

| Gate | Requirement | Status |
|---|---|---|
| Gate 1 — Live-source extraction | web_search + web_extract must succeed | FAILED |
| Gate 2 — Domain canonicalization | Not applicable (no prospects) | NOT RUN |
| Gate 3 — Current URL / stale-page checks | Not applicable (no prospects) | NOT RUN |
| Gate 4 — Contact/person validation | Not applicable (no prospects) | NOT RUN |
| Gate 5 — LinkedIn URL hygiene | Not applicable (no prospects) | NOT RUN |
| Gate 6 — Mountain West / jurisdictional support | Not applicable (no prospects) | NOT RUN |
| Gate 7 — Outreach / CRM readiness | Not applicable (no prospects) | NOT RUN |

## Lead Magnet Fit Per Prospect

Not applicable — zero prospects scored this run.

## Lead-Magnet Fit Lanes and Tiers

Not applicable.

## Recommended Next Kanban Tasks

1. **Restore live-source access.** Priority: highest. Either upgrade the Firecrawl plan, configure an alternative web_search/web_extract tool, or verify that the current provider has a remaining quota.
2. **Validate the preflight.** Once access is restored, run the preflight smoke test (`web_search` + `web_extract` on `https://example.com`) and confirm both pass before any prospect staging.
3. **Resume prospect expansion** only after preflight passes, selecting 1-3 high-potential public-source prospects using the full rubric at `docs/lead_magnet_fit_rubric_and_packet_schema.md`.
4. **During the pause window,** use the local business-development corpus and QMD to refine the following while live-source is down:
   - Improve search prompt specificity for each of the four offer lanes.
   - Tighten lane-matching instructions against the rubric's six fit factors.
   - Update scoring confidence thresholds.
   - Prepare Agent Targeting packet template drafts based on rubric examples (theoretical, no real companies).

## External Actions Taken

**None.** No emails sent, no LinkedIn actions, no CRM writes, no workflow activation, no paid ads, no public postings, no contact outreach, no HighLevel writes, no Supabase writes, no Apollo.io calls.

## Artifact Paths

- Source unavailable report: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-16/source_unavailable_report.md`
- Prospect candidates JSON: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-16/prospect_candidates.json`
- Human review digest: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-16/digest.md`

---

**End of digest. No prospects scored, no outreach prepared, no live actions taken. Run halted at preflight due to Gate 1 failure.**
