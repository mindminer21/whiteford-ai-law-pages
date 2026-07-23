# Nightly Lead Research Digest — 2026-05-20

## Executive Summary

**Status: GATE 1 FAILURE — No prospect discovery performed.**

Both live-source tools (web_search and web_extract) failed due to insufficient Firecrawl credits. Per the Source Validation Hard Gates, no new prospects can be discovered, scored, or staged without live-source verification. This run writes only the required no-op artifacts.

## Top Prospect Research

None — blocked by live-source failure.

## Evidence URLs

None available. Both web_search and web_extract returned:
- `Payment Required: Insufficient credits to perform this request`

## Lead Magnet Fit Classification

0 classifications performed. Every prospect requires at minimum one live-source URL per material fact and at least two independently accessible public URLs per company.

## Consent Status

Not applicable — no prospects staged.

## Key Contacts

None discovered.

## Outreach Vectors

None drafted.

## LinkedIn Awareness Post Drafts

None drafted.

## Records Written / Staged

| Artifact | Path | Purpose |
|---|---|---|
| source_unavailable_report.md | docs/nightly-lead-research/runs/2026-05-20/ | Documents Gate 1 failure |
| prospect_candidates.json | docs/nightly-lead-research/runs/2026-05-20/ | No-op candidate file (empty) |
| digest.md | docs/nightly-lead-research/runs/2026-05-20/ | This digest |

## Suppression / Confidence Issues

- **Gate 1 (Live-source) — FAILED**: Firecrawl credits exhausted. No discovery, scoring, or staging.
- **Gate 2 (Domain canonicalization)** — N/A (no prospects to canonicalize)
- **Gate 3 (Stale-page checks)** — N/A
- **Gate 4 (Contact validation)** — N/A
- **Gate 5 (LinkedIn URL hygiene)** — N/A
- **Gate 6 (Mountain West claims)** — N/A
- **Gate 7 (CRM readiness)** — N/A

## Validation-Gate Summary

| Gate | Status | Details |
|---|---|---|
| Live-source extraction | FAILED | Firecrawl credits exhausted |
| Canonical domain | N/A (no prospects) | — |
| Current first-party URLs | N/A | — |
| Contact confidence | N/A | — |
| LinkedIn URL hygiene | N/A | — |
| Geography support | N/A | — |
| Suppression/conflicts | Not checked | — |

## Recommended Next Kanban Tasks

1. **Urgent**: Replenish Firecrawl credits or switch to an available search/extraction tool
2. After credits restored: re-run the nightly agent
3. Verify tool connectivity before discovery begins
4. Review whether a secondary search/extraction path should be configured for resilience

## Counts

- Companies researched: 0
- Contacts staged: 0
- Evidence rows: 0
- Outreach drafts: 0
- Approval items: 0
- Live CRM writes: 0
- Live Supabase writes: 0

## No External Action Taken

- No prospects were discovered
- No emails, LinkedIn messages, or social posts were sent
- No HighLevel workflow activation
- No CRM/Supabase writes (except the no-op JSON above)
- No outbound contact enrollment

## Artifact Paths

- Source unavailability report: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-20/source_unavailable_report.md`
- Prospect candidates JSON: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-20/prospect_candidates.json`
- Digest: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-20/digest.md`
