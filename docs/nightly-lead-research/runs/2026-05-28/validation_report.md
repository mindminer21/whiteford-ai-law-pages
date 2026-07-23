# 2026-05-28 nightly prospect validation/staging

- Task: t_31c183aa
- Source payload: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-28/prospect_candidates.json`
- Normalized payload: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-28/prospect_candidates.normalized_for_store.json`
- Store dry run: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-28/store_dry_run.json`
- Store apply output: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-28/store_output.json`
- Verification: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-28/store_verification.json`
- Backup: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-28/growth-os.before_t_31c183aa.sqlite`
- Agent-targeting work item directory: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-28/agent-targeting-work-items`

## Result

Validated and normalized `3` prospects from the upstream `prospect_candidates` payload into the `candidates` shape required by `scripts/prospect_research_store.py`. The local Growth OS store dry run reported 3 candidates; apply completed with counts `{"approval_items": 3, "contacts": 4, "crm_sync_records": 3, "opportunities": 3, "outreach_drafts": 3, "prospects": 3, "source_evidence": 12, "suppression_checks": 3}`.

## Staged prospects

- Cognition Labs (`prospect_cognition_labs_20260528`), lane `tech-gc`, stage `research_staged`
- SimplexAI (`prospect_simplexai_20260528`), lane `ai-compliance`, stage `research_staged`
- Triomics (`prospect_triomics_20260528`), lane `ai-compliance`, stage `research_staged`

## Agent-targeting work items

- Cognition Labs priority 93: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-28/agent-targeting-work-items/cognition-labs.json`
- SimplexAI priority 79: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-28/agent-targeting-work-items/simplexai.json`
- Triomics priority 68: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-28/agent-targeting-work-items/triomics.json`

## Verification

Current local Growth OS SQLite counts after apply:

| Table | Count |
|---|---:|
| `prospects` | 52 |
| `contacts` | 48 |
| `opportunities` | 63 |
| `source_evidence` | 98 |
| `outreach_drafts` | 34 |
| `approval_items` | 66 |
| `crm_sync_records` | 45 |
| `suppression_checks` | 34 |
| `work_items` | 29 |

## Safety

Local/internal attorney-review-only staging. No outreach, workflow activation/enrollment, trigger tags, LinkedIn/social action, Clio writes, public/client-facing changes, or live CRM/Supabase/HighLevel sync authorized. Supabase mirror and HighLevel sync remain gated by their existing blockers.

## Warnings

- Cognition Labs: non-Mountain-West HQ (San Francisco, CA); do not make Mountain West/local claim.
- Cognition Labs: contact confidence 55 — enrichment/source-current verification required before any outreach.
- SimplexAI: contact Chris Pinkney has no public profile/source URL in payload; retained as low-confidence/no-outreach target pending enrichment.
- SimplexAI: contact Michael Tang has no public profile/source URL in payload; retained as low-confidence/no-outreach target pending enrichment.
- SimplexAI: non-Mountain-West HQ (San Francisco, CA); do not make Mountain West/local claim.
- SimplexAI: contact confidence 50 — enrichment/source-current verification required before any outreach.
- Triomics: contact Dr. Sarah E. Johnson has no public profile/source URL in payload; retained as low-confidence/no-outreach target pending enrichment.
- Triomics: contact confidence 45 — enrichment/source-current verification required before any outreach.
- All outreach and LinkedIn awareness drafts are attorney-review-only and must not be sent, posted, tagged, synced live, or enrolled in workflows.
