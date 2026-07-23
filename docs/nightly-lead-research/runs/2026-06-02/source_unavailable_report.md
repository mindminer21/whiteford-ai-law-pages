# Source Availability Report — 2026-06-02 Nightly Run

## Status: SUPERSEDED — BROWSER_FALLBACK_SUCCEEDED

## Current Controlling Artifacts

This report was initially written when Firecrawl-backed `web_search` / `web_extract` returned 402 Payment Required and before browser fallback completed. It is **not controlling** for the final 2026-06-02 nightly run.

The controlling run artifacts are:

- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/digest.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/prospect_candidates.json`

## What Actually Happened

| Step | Result |
|---|---|
| Firecrawl `web_search` / `web_extract` | Failed with 402 / insufficient credits |
| Browser fallback | Succeeded via browser navigation to TechCrunch and first-party company pages |
| Final prospect count | 3 |
| Contacts validated | 0 — Gate 4 remains unresolved |
| Outreach drafts | 3 attorney-review-only/internal drafts |
| Live CRM / HighLevel / Supabase / social / email actions | 0 |

## Final State

Browser fallback recovered the run and produced three `research_only` prospects: Mach Industries, WindBorne Systems, and Gigascale Capital. All remain held for internal review because contact validation did not pass and because no external/public/live-system action is authorized.

This supersedes the stale halted/no-op language below and prevents downstream workers from treating this file as evidence that the 2026-06-02 run failed.

## Original Failure Context Preserved For Audit

Firecrawl returned insufficient-credit errors. That remains useful operational context, but it did not prevent final artifact production because browser fallback succeeded.

## Guardrails

No emails, workflow activation/enrollment/testing, trigger tags, LinkedIn/social activity, ads, Clio writes, public publishing, client-facing changes, live CRM mutation, or HighLevel/Supabase mutation were authorized or performed by this run.
