# Nightly Lead Research Digest — 2026-05-10

## Executive Summary

**Run status:** STOPPED at Gate 1 (live-source extraction unavailable).
**Prospects researched:** 0
**Contacts staged:** 0
**Evidence records:** 0
**Outreach drafts:** 0
**Approval items:** 0
**CRM/Supabase writes:** 0
**External outreach:** 0 (none)

The 2026-05-10 nightly research run could not discover or validate any prospects because both `web_search` (Firecrawl) and `web_extract` failed with "Payment Required: Insufficient credits." This is a live-source tool failure, not a RAG or local-context failure.

## What Was Loaded and Ready

- All required context docs: `highlevel_campaign_implementation_plan.md`, `highlevel_ops_execution_blueprint.md`, `highlevel_ops_research_synthesis.md`, `lead_magnet_opt_in_and_app_strategy.md`, `targeted_linkedin_awareness_post_strategy.md`, `tech_company_legal_health_checklist_app_spec.md`, `lead_api_opt_in_gating_audit_t_f4abf859.md`, and `qwen_nightly_prospecting_agent_plan.md` — all loaded.
- `lead_magnet_fit_rubric_and_packet_schema.md` — loaded for scoring/reference.
- QMD corpus and business-development RAG — available for internal strategy, but **cannot** serve as evidence or replace live-source verification.
- Growth OS SQLite — available.
- Hermes agents (qwen-local, highlevel-ops) — available.

## Live-Source Failure Details

| Tool | Status | Error | Impact |
|---|---|---|---|
| `web_search` | FAILED | Payment Required: Insufficient Firecrawl credits | No company discovery, no public-source discovery |
| `web_extract` | FAILED | Payment Required: Insufficient Firecrawl credits | No page verification, no domain canonicalization, no contact validation |

## Validation-Gate Summary

| Gate | Status | Blocked Fields |
|---|---|---|
| Gate 1: Live-source extraction | FAILED | All prospect fields (discovery, scoring, evidence, contacts) |
| Gate 2: Domain canonicalization | NOT TESTED | `company.domain`, `outreach_readiness_status` |
| Gate 3: Current URL/stale-page | NOT TESTED | All evidence URLs |
| Gate 4: Contact/person validation | NOT TESTED | `contact.name`, `contact.title`, `contact.linkedin_url` |
| Gate 5: LinkedIn URL hygiene | NOT TESTED | `contact.linkedin_url` |
| Gate 6: Mountain West/geographic support | NOT TESTED | `geo_relevance`, urgency signals |
| Gate 7: Outreach/CRM readiness | HUNG BY GATE 1 | `outreach_readiness_status = research_only` (default until gates pass) |

## Lead Magnet Fit Classification

No prospects were researched; no fit classifications were produced.

## Next Steps (for Jeff)

1. **Restore Firecrawl credits** — upgrade plan or switch search provider.
2. **Verify live-source recovery** — run a quick `web_search` smoke test (e.g., "example company") and `web_extract` test (e.g., `https://example.com`) to confirm both tools pass.
3. **Restart this nightly run** once live sources are restored. The run will then:
   - Discover 1-3 high-fit prospects across the four offer lanes.
   - Pass all seven validation gates.
   - Score each prospect against the `lead_magnet_fit_rubric_and_packet_schema`.
   - Stage `research_only` candidates with full evidence rows.
   - Produce attorney-review-only outreach drafts and LinkedIn awareness post drafts.
   - Enforce all consent-gating rules (no `workflow:*` tags on researched prospects).

## Artifact Paths

- Source-unavailable report: `docs/nightly-lead-research/runs/2026-05-10/source_unavailable_report.md`
- Empty prospect candidates: `docs/nightly-lead-research/runs/2026-05-10/prospect_candidates.json`
- This digest: `docs/nightly-lead-research/runs/2026-05-10/digest.md`

## Artifact Counts

- Prospects: 0
- Contacts: 0
- Evidence records: 0
- Leads (app submissions): 0
- Opportunities: 0
- Outreach drafts: 0
- LinkedIn awareness drafts: 0
- Approval items: 0
- Suppression conflicts checked: 0
- CRM sync records: 0
- External sends/actions: 0
