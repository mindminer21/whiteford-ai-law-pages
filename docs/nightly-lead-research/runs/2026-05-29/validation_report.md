# 2026-05-29 nightly prospect validation/staging

- Task: t_6a7b3bbd
- Source payload: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-29/prospect_candidates.json`
- Normalized payload: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-29/prospect_candidates.normalized_for_store.json`
- Store dry run: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-29/store_dry_run.json`
- Store apply output: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-29/store_output.json`
- Verification: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-29/store_verification.json`
- Backup: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-29/growth-os.before_t_6a7b3bbd.sqlite`
- Agent-targeting work item directory: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-29/agent-targeting-work-items`

## Result

Validated `6` upstream prospects and normalized/staged `4` sufficient candidates into the `candidates` shape required by `scripts/prospect_research_store.py`. The local Growth OS store dry run reported 4 candidates; apply completed with counts `{"approval_items": 4, "contacts": 4, "crm_sync_records": 4, "opportunities": 4, "outreach_drafts": 4, "prospects": 4, "source_evidence": 16, "suppression_checks": 4}`. Two low/insufficient candidates were deliberately not staged for Agent Targeting.

## Staged prospects

- Anthropic (`prospect_anthropic_20260529`), lane `ma-readiness`, stage `research_staged`
- Asana / StackAI (Acquisition) (`prospect_asana_stackai_acquisition_20260529`), lane `ma-readiness`, stage `research_staged`
- Glean (`prospect_glean_20260529`), lane `ai-patent`, stage `research_staged`
- H1 (Healthcare Data Platform) (`prospect_h1_healthcare_data_platform_20260529`), lane `ai-compliance`, stage `research_staged`

## Agent-targeting work items

- Glean priority 90: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-29/agent-targeting-work-items/glean.json`
- Anthropic priority 80: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-29/agent-targeting-work-items/anthropic.json`
- H1 (Healthcare Data Platform) priority 70: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-29/agent-targeting-work-items/h1-healthcare-data-platform.json`
- Asana / StackAI (Acquisition) priority 60: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-29/agent-targeting-work-items/asana-stackai-acquisition.json`

## Skipped from staging

- Unidentified Chip Startup (AI Memory) (score 4): Skipped from local staging: insufficient company identity/lane or relevance below 6; retained only in source payload for future research.
- Slate Auto (score 3): Skipped from local staging: insufficient company identity/lane or relevance below 6; retained only in source payload for future research.

## Verification

Current local Growth OS SQLite counts after apply:

| Table | Count |
|---|---:|
| `prospects` | 56 |
| `contacts` | 52 |
| `opportunities` | 67 |
| `source_evidence` | 114 |
| `outreach_drafts` | 38 |
| `approval_items` | 70 |
| `crm_sync_records` | 49 |
| `suppression_checks` | 38 |
| `work_items` | 33 |

## Safety

Local/internal attorney-review-only staging. No outreach, workflow activation/enrollment, trigger tags, LinkedIn/social action, Clio writes, public/client-facing changes, prospect contact, or live CRM/Supabase/HighLevel sync authorized. Supabase mirror and HighLevel sync remain gated by their existing blockers.

## Warnings

- Glean: no email/opt-in in payload; no-send/no-workflow guard remains.
- Anthropic: upstream payload lists Dario Hassabis as CEO/Co-Founder; this is unverified/inconsistent and must not be used externally without source-current correction.
- Anthropic: no email/opt-in in payload; no-send/no-workflow guard remains.
- H1 (Healthcare Data Platform): no email/opt-in in payload; no-send/no-workflow guard remains.
- Asana / StackAI (Acquisition): no email/opt-in in payload; no-send/no-workflow guard remains.
- Unidentified Chip Startup (AI Memory): skipped from staging because company identity is unknown and lane is TBD.
- Slate Auto: skipped from staging because relevance score 3 and payload marks it low priority/insufficient for IP-focused outreach.
- All staged outreach vectors are attorney-review-only and must not be sent, posted, tagged, synced live, or enrolled in workflows.
- Parent research used browser fallback after web_search/web_extract quota failure; source-current checks remain required before external use.
