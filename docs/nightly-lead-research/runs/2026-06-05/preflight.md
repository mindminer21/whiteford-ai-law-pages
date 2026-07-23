# Preflight — 2026-06-05 Nightly Run

## 1. Live Source Tools

| Tool | Status | Failure Reason |
|---|---|---|
| web_search (Firecrawl) | FAILED | Payment Required: insufficient credits |
| web_extract (Firecrawl) | FAILED | Payment Required: insufficient credits |

**Browser fallback:** curl-based extraction via terminal — WORKING.
**Method:** `curl -fsSL --max-time 15 <URL>` for all company site, press, news, job posting, and profile URLs used in this run.

Source_unavailable_report superseded. Status: `BROWSER_FALLBACK_RESUMED` via curl terminal. Method confirmed functional before resuming research.

## 2. Local Context/RAG

| Resource | Status |
|---|---|
| QMD collection `whiteford-ai-law-pages` | Available via filesystem |
| Business-development RAG skill | Available (loaded during context) |
| docs/lead_magnet_fit_rubric_and_packet_schema.md | Available and loaded |
| docs/highlevel_campaign_implementation_plan.md | Available and loaded |
| docs/highlevel_ops_execution_blueprint.md | Available and loaded |
| docs/highlevel_ops_research_synthesis.md | Available and loaded |
| docs/lead_magnet_opt_in_and_app_strategy.md | Available and loaded |
| docs/targeted_linkedin_awareness_post_strategy.md | Available and loaded |
| docs/tech_company_legal_health_checklist_app_spec.md | Available and loaded |
| docs/lead_api_opt_in_gating_audit_t_f4abf859.md | Available and loaded |
| docs/plans/qwen_nightly_prospecting_agent_plan.md | Available and loaded |
| highlevel_ai_authority_funnel_map.md | Available and loaded |

QMD/business-development RAG can inform educational framing but cannot name prospects, validate facts, or override source requirements.

## 3. Run State

- Expansion paused as of 2026-05-06. This is a controlled 1-3 prospect batch.
- All consent-gating rules enforced. No workflow trigger tags on researched prospects.
- No live CRM writes. No outreach. No social actions.
- Run directory: docs/nightly-lead-research/runs/2026-06-05
- Written artifacts: prospect_candidates.json + digest.md
- Last updated: 2026-06-05
