# 2026-06-03 nightly prospect validation/staging

- Task: `t_2aff8ce4`
- Source payload: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-03/prospect_candidates.json`
- Normalized payload: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-03/prospect_candidates.normalized_for_store.json`
- Store dry run: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-03/store_dry_run.json`
- Store apply output: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-03/store_output.json`
- Verification: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-03/store_verification.json`
- Backup: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-03/growth-os.before_t_2aff8ce4.sqlite`
- Agent-targeting work item directory: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-03/agent-targeting-work-items`

## Result

Validated `3` upstream prospects and normalized/staged `3` candidates into the `candidates` shape required by `scripts/prospect_research_store.py`. The local Growth OS store dry run reported 3 candidates; apply completed with counts `{"approval_items": 3, "contacts": 3, "crm_sync_records": 3, "opportunities": 3, "outreach_drafts": 3, "prospects": 3, "source_evidence": 6, "suppression_checks": 3}`. All records remain local/internal and attorney-review-only; no live sync or external action was performed.

## Staged prospects

- Coralogix (`prospect_coralogix_20260603`), lane `ai-patent`, stage `research_staged`, fit score 92, priority 85
- Layup Parts (`prospect_layup_parts_20260603`), lane `ai-patent`, stage `research_staged`, fit score 88, priority 74
- Cyera (`prospect_cyera_20260603`), lane `ai-compliance`, stage `research_staged`, fit score 85, priority 85

## Agent-targeting work items

- Coralogix priority 85: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-03/agent-targeting-work-items/coralogix.json`
- Layup Parts priority 74: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-03/agent-targeting-work-items/layup-parts.json`
- Cyera priority 85: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-03/agent-targeting-work-items/cyera.json`

## Verification

Current local Growth OS SQLite counts after apply:

| Table | Count |
|---|---:|
| `prospects` | 68 |
| `contacts` | 60 |
| `opportunities` | 79 |
| `source_evidence` | 138 |
| `outreach_drafts` | 50 |
| `approval_items` | 82 |
| `crm_sync_records` | 61 |
| `suppression_checks` | 50 |
| `work_items` | 45 |

Row checks:

| Company | Prospect rows | Contact rows | Evidence rows | Draft rows | Work item rows | External action allowed sum |
|---|---:|---:|---:|---:|---:|---:|
| Coralogix | 1 | 2 | 2 | 1 | 1 | 0 |
| Layup Parts | 1 | 1 | 2 | 1 | 1 | 0 |
| Cyera | 1 | 0 | 2 | 1 | 1 | 0 |

## Safety

Local/internal attorney-review-only staging. No outreach, workflow activation/enrollment, trigger tags, LinkedIn/social action, Clio writes, public/client-facing changes, prospect contact, or live CRM/Supabase/HighLevel sync authorized. Supabase mirror and HighLevel sync remain gated by existing blockers.

## Warnings

- Layup Parts: personal LinkedIn URL for Zack Eakin not independently verified; retained in notes only and not promoted as a verified contact field.
- Cyera: held out placeholder/low-confidence contact 'Not specified in article'; company-level only until leadership verified.
- Cyera: no person-level contact staged; Gate 4 requires leadership/contact remediation before any named outreach.
- All staged outreach vectors are attorney-review-only and must not be sent, posted, tagged, synced live, or enrolled in workflows.
- Parent research used browser fallback after Firecrawl/search/extract quota failure; source-current checks remain required before external use.
