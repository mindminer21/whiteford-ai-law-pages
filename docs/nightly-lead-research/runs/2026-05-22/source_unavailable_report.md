# Source Unavailable Report — 2026-05-22 Nightly Qwen Prospect Research Run

## Run status: STOPPED due to Gate 1 failure

No prospects were researched, scored, or staged. No outreach drafts were created.

## Failed Source Tools

| Tool | Error | Impact |
|---|---|---|
| `web_search` | Payment Required: Insufficient credits (Firecrawl) | Cannot discover companies, funding, hiring, product launches, regulatory deadlines, or any live public fact |
| `web_extract` | Payment Required: Insufficient credits (Firecrawl) | Cannot open company websites, leadership pages, press releases, official profiles, or any first-party source for evidence |

## What This Means

- Gate 1 requires at least one independently accessible public URL per material prospect fact. Neither search nor extract is available.
- Local RAG (QMD, business-development corpus, prior notes) is available but does NOT count as evidence for any prospect claim.
- Per Gate 7, any prospect without live-source evidence must remain `research_only` with `outreach_readiness_status=research_only`, `external_action_allowed=false`, and no named-recipient draft.
- Since no prospect can satisfy Gate 1, no prospect can proceed beyond the preflight stage.

## Required Fix Before Next Run

1. Resolve Firecrawl credit/subscription issue (upgrade plan or switch to alternative search/extract tool).
2. Confirm the fix with another smoke test before a prospect research run.
3. Do not resume prospect discovery until live-source access is verified.

## What Local Context Can Still Support

- Refining search prompts and qualification rubrics while expansion is paused
- Improving lead-magnet fit scoring instructions and lane-matching logic
- Drafting educational lead-magnet copy (non-company-specific)
- Reviewing and updating agent targeting packet schemas
- Internal strategy work that does not require live prospect verification

---
Generated: 2026-05-22
Run label: 2026-05-22
