# Preflight Report — 2026-05-22 Nightly Qwen Prospect Research Run

## Check 1: Live Source Tools

| Tool | Status | Detail |
|---|---|---|
| `web_search` (smoke test) | FAILED | Payment Required: Insufficient credits (Firecrawl API) |
| `web_extract` (smoke test) | FAILED | Payment Required: Insufficient credits (Firecrawl API) |
| Gate 1 Verdict | **FAILED** | Live-source extraction unavailable. Stop prospect staging. |

**Remediation:** Upgrade Firecrawl plan or switch to an alternative search/extract connector before the next run. This is a blocking issue for any prospect research, contact validation, or evidence capture.

## Check 2: Local Context / RAG Availability

| Resource | Status |
|---|---|
| QMD collections (qmd://) | Available (used in prior runs) |
| Business-development corpus (`/Users/jeff/.hermes/knowledge/business-development/business_dev_index.sqlite`) | Available |
| Local docs context (read successfully) | highlevel_campaign_implementation_plan.md, highlevel_ops_execution_blueprint.md, highlevel_ops_research_synthesis.md, lead_magnet_opt_in_and_app_strategy.md, targeted_linkedin_awareness_post_strategy.md, tech_company_legal_health_checklist_app_spec.md, lead_api_opt_in_gating_audit_t_f4abf859.md, lead_magnet_fit_rubric_and_packet_schema.md, qwen_nightly_prospecting_agent_plan.md, highlevel_ai_authority_funnel_map.md — all read successfully |

**Important:** Local RAG/context supports internal strategy, rubric interpretation, and educational framing of lead-magnet copy. However, it CANNOT:
- Replace live-source access for validating prospect companies or contacts
- Validate current company/contact facts
- Override the live-source requirement for every material prospect claim
- Satisfy Gate 1

**Separate status confirmed:**
- Live source: FAILED (blocking)
- Local context/RAG: OPERATIONAL (supports internal use only, not prospect verification)

---
Generated: 2026-05-22
Run label: 2026-05-22
