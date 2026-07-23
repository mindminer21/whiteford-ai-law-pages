# 2026-05-30 nightly prospect validation/staging

- Task: `t_c53fa8ec`
- Source payload: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-30/prospect_candidates.json`
- Normalized payload: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-30/prospect_candidates.normalized_for_store.json`
- Store dry run: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-30/store_dry_run.json`
- Store apply output: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-30/store_output.json`
- Verification: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-30/store_verification.json`
- Backup: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-30/growth-os.before_t_c53fa8ec.sqlite`
- Agent-targeting work item directory: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-30/agent-targeting-work-items`

## Result

Validated `3` upstream prospects and normalized/staged `3` sufficient candidates into the `candidates` shape required by `scripts/prospect_research_store.py`. The local Growth OS store dry run reported 3 candidates; apply completed with counts `{"approval_items": 3, "contacts": 5, "crm_sync_records": 3, "opportunities": 3, "outreach_drafts": 3, "prospects": 3, "source_evidence": 6, "suppression_checks": 3}`. No candidates were held out.

## Staged prospects

- Groq, Inc. (`prospect_groq_20260530`), lane `ai-patent`, stage `research_staged`, priority 93
- XCENA (`prospect_xcena_20260530`), lane `ai-patent`, stage `research_staged`, priority 85
- Cognition Labs, Inc. (Cognition) (`prospect_cognition_20260530`), lane `ai-patent`, stage `research_staged`, priority 89

## Agent-targeting work items

- Groq, Inc. priority 93: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-30/agent-targeting-work-items/groq-inc.json`
- XCENA priority 85: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-30/agent-targeting-work-items/xcena.json`
- Cognition Labs, Inc. (Cognition) priority 89: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-30/agent-targeting-work-items/cognition-labs-inc-cognition.json`

## Verification

Current local Growth OS SQLite counts after apply:

| Table | Count |
|---|---:|
| `prospects` | 59 |
| `contacts` | 57 |
| `opportunities` | 70 |
| `source_evidence` | 120 |
| `outreach_drafts` | 41 |
| `approval_items` | 73 |
| `crm_sync_records` | 52 |
| `suppression_checks` | 41 |
| `work_items` | 36 |

Row checks:

| Company | Prospect rows | Evidence rows | Draft rows | Work item rows | External action allowed sum |
|---|---:|---:|---:|---:|---:|
| Groq, Inc. | 1 | 2 | 1 | 1 | 0 |
| XCENA | 1 | 2 | 1 | 1 | 0 |
| Cognition Labs, Inc. (Cognition) | 1 | 2 | 1 | 1 | 0 |

## Safety

Local/internal attorney-review-only staging. No outreach, workflow activation/enrollment, trigger tags, LinkedIn/social action, Clio writes, public/client-facing changes, prospect contact, or live CRM/Supabase/HighLevel sync authorized. Supabase mirror and HighLevel sync remain gated by their existing blockers.

## Warnings

- Groq, Inc.: Adam Winter has no email/opt-in; no-send/no-workflow guard remains.
- Groq, Inc.: Matt Eng has no email/opt-in; no-send/no-workflow guard remains.
- Groq, Inc.: upstream draft typo 'Attended for attorney review' preserved only in source payload; normalized draft uses ATTORNEY REVIEW ONLY wrapper.
- XCENA: Jin Kim has no email/opt-in; no-send/no-workflow guard remains.
- XCENA: Dohun Kim has no email/opt-in; no-send/no-workflow guard remains.
- XCENA: upstream draft typo 'Attended for attorney review' preserved only in source payload; normalized draft uses ATTORNEY REVIEW ONLY wrapper.
- Cognition Labs, Inc. (Cognition): Scott Wu has no email/opt-in; no-send/no-workflow guard remains.
- Cognition Labs, Inc. (Cognition): upstream draft typo 'Attended for attorney review' preserved only in source payload; normalized draft uses ATTORNEY REVIEW ONLY wrapper.
- All staged outreach vectors are attorney-review-only and must not be sent, posted, tagged, synced live, or enrolled in workflows.
- Parent research used browser fallback after Firecrawl/search/extract quota failure; source-current checks remain required before external use.
