# Source Unavailable Report — 2026-05-10 Nightly Run

Generated: 2026-05-10
Run ID: 2026-05-10
Run Directory: `docs/nightly-lead-research/runs/2026-05-10`

## Gate 1 Failures — Live Source Access

### Live Search Tools
- **Tool:** `web_search` (Firecrawl-backed)
- **Status:** FAILED
- **Error:** Payment Required — insufficient Firecrawl credits.
- **Impact:** Cannot discover new companies, validate current company facts, or find publicly available source URLs for prospect research.
- **Recommended fix:** Upgrade Firecrawl plan or switch to alternative search provider. Jeff needs to restore credit allowance.

### Live Extraction Tools
- **Tool:** `web_extract` (Firecrawl-backed)
- **Status:** FAILED
- **Error:** Payment Required — insufficient Firecrawl credits.
- **Impact:** Cannot open or verify pages, confirm canonical domains, validate contact info, or check for stale/broken URLs.
- **Recommended fix:** Same as search tool fix above.

### Separation from Local RAG/Context Availability

This is NOT a RAG failure. The following local resources ARE available:

- **QMD corpus:** Available at `/Users/jeff/.hermes/knowledge/business-development/` — contains business-development book indexing. QMD can inform educational lead-magnet framing and internal strategy. QMD CANNOT: name prospects, validate company/contact facts, override a live-source failure, or serve as evidence for scoring.
- **Business Development RAG:** Available via Hermes skill `business-development-rag` — can inform strategy. Cannot validate public facts or replace live-source verification.
- **Qwen model:** `qwen3.6:35b-a3b` — local, running. Can perform scoring logic, rubric application, and structured output generation when facts are supplied.
- **Growth OS database:** Available at `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite` — can query existing prospects/suppression.
- **HighLevel Ops Profile:** Available as `highlevel-ops` — operational tags and custom fields configured.
- **Existing research docs and rubrics:** All loaded and accessible.

### What This Means for This Run

- **Prospect discovery:** SKIPPED (no live search available to discover or validate companies).
- **Prospect staging:** SKIPPED (Gate 1 mandatory stop).
- **Contact validation:** SKIPPED (no ability to confirm names, titles, or LinkedIn URLs).
- **Domain canonicalization:** SKIPPED (no ability to verify first-party URLs).
- **Scoring/fit classification:** SKIPPED (needs sourced facts to apply rubric).

## Remediation Required Before Next Run

1. **Restore Firecrawl credits** or configure an alternative web-search tool.
2. **Verify web_search and web_extract both pass** a smoke test before approving any prospect research run.
3. **Re-approve this nightly run** once live-source access is restored. The run will then discover 1-3 high-fit prospects across the four lanes, score each against the `lead_magnet_fit_rubric_and_packet_schema`, and stage them as `research_only` with full evidence rows pending lead-magnet opt-in or Jeff's exact written approval.

## No-Op Status

- Prospects researched: 0
- Contacts staged: 0
- Evidence records: 0
- Outreach drafts: 0
- Approval items: 0
- CRM/Supabase writes: 0
- External outreach: 0
