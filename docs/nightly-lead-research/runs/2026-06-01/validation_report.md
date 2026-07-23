# 2026-06-01 nightly prospect validation/staging

- Task: `t_623e1e6e`
- Source payload: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-01/prospect_candidates.json`
- Normalized payload: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-01/prospect_candidates.normalized_for_store.json`
- Store dry run: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-01/store_dry_run.json`
- Store apply output: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-01/store_output.json`
- Verification: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-01/store_verification.json`
- Backup: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-01/growth-os.before_t_623e1e6e.sqlite`
- Agent-targeting work item directory: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-01/agent-targeting-work-items`

## Result

Validated `3` upstream prospects and normalized/staged `3` sufficient candidates into the `candidates` shape required by `scripts/prospect_research_store.py`. The local Growth OS store dry run reported 3 candidates; apply completed with counts `{"approval_items": 3, "contacts": 0, "crm_sync_records": 3, "opportunities": 3, "outreach_drafts": 3, "prospects": 3, "source_evidence": 6, "suppression_checks": 3}`. No candidates were held out; all remain research-only because Gate 4 named-contact validation failed.

## Staged prospects

- SkildAI (`prospect_skildai_20260601`), lane `ai-patent`, stage `research_staged`, fit score 91
- Goodfire (`prospect_goodfire_20260601`), lane `ai-patent`, stage `research_staged`, fit score 88
- Flapping Airplanes (`prospect_flapping_airplanes_20260601`), lane `ai-patent`, stage `research_staged`, fit score 86

## Agent-targeting work items

- SkildAI priority 84: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-01/agent-targeting-work-items/skildai.json`
- Goodfire priority 81: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-01/agent-targeting-work-items/goodfire.json`
- Flapping Airplanes priority 79: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-01/agent-targeting-work-items/flapping-airplanes.json`

## Verification

Current local Growth OS SQLite counts after apply:

| Table | Count |
|---|---:|
| `prospects` | 62 |
| `contacts` | 57 |
| `opportunities` | 73 |
| `source_evidence` | 126 |
| `outreach_drafts` | 44 |
| `approval_items` | 76 |
| `crm_sync_records` | 55 |
| `suppression_checks` | 44 |
| `work_items` | 39 |

Row checks:

| Company | Prospect rows | Contact rows | Evidence rows | Draft rows | Work item rows | External action allowed sum |
|---|---:|---:|---:|---:|---:|---:|
| SkildAI | 1 | 0 | 2 | 1 | 1 | 0 |
| Goodfire | 1 | 0 | 2 | 1 | 1 | 0 |
| Flapping Airplanes | 1 | 0 | 2 | 1 | 1 | 0 |

## Safety

Local/internal attorney-review-only staging. No outreach, workflow activation/enrollment, trigger tags, LinkedIn/social action, Clio writes, public/client-facing changes, prospect contact, or live CRM/Supabase/HighLevel sync authorized. Supabase mirror and HighLevel sync remain gated by existing blockers.

## Warnings

- SkildAI: Gate 4 contact validation failed; no named contact staged and no-send/no-workflow guard remains.
- SkildAI: normalized primary_offer_lane 'AI Patent' -> 'ai-patent' for store enum.
- Goodfire: Gate 4 contact validation failed; no named contact staged and no-send/no-workflow guard remains.
- Goodfire: normalized primary_offer_lane 'AI Patent' -> 'ai-patent' for store enum.
- Flapping Airplanes: Gate 4 contact validation failed; no named contact staged and no-send/no-workflow guard remains.
- Flapping Airplanes: normalized primary_offer_lane 'AI Patent' -> 'ai-patent' for store enum.
- All staged outreach vectors are attorney-review-only and must not be sent, posted, tagged, synced live, or enrolled in workflows.
- Parent research used browser fallback after Firecrawl/search/extract quota failure; source-current checks remain required before external use.
