# Validation/staging report — Nightly prospects 2026-06-02
Task: t_ccdd72c7

## Result
- Source candidates: 3
- Locally staged candidates: 3
- Local agent-targeting work items: 3 (3 newly inserted; existing IDs are idempotent)
- Contacts staged: 0 (Gate 4 contact validation failed / not verified for every prospect)

## Staged prospects
- WindBorne Systems — prospect_windborne_systems_20260602 — lane `tech-gc` — priority 77
- Mach Industries — prospect_mach_industries_20260602 — lane `ai-compliance` — priority 85
- Gigascale Capital — prospect_gigascale_capital_20260602 — lane `tech-gc` — priority 71

## Artifacts
- Normalized payload: /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/prospect_candidates.normalized_for_store.json
- Store dry run: /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/store_dry_run.json
- Store apply output: /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/store_output.json
- Verification JSON: /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/store_verification.json
- Backup before apply: /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/growth-os.before_t_ccdd72c7.sqlite
- Agent-targeting work items: /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/agent-targeting-work-items

## Verification
- WindBorne Systems: prospects=1, evidence=2, drafts=1, approvals=1, suppression=1, sync=1, work_items=1, external_action_allowed_sum=0
- Mach Industries: prospects=1, evidence=2, drafts=1, approvals=1, suppression=1, sync=1, work_items=1, external_action_allowed_sum=0
- Gigascale Capital: prospects=1, evidence=2, drafts=1, approvals=1, suppression=1, sync=1, work_items=1, external_action_allowed_sum=0

## Warnings / holds
- WindBorne Systems: normalized primary_offer_lane 'Tech OGC' -> 'tech-gc' for store enum.
- WindBorne Systems: Gate 4 contact validation failed; no named contact staged and no-send/no-workflow guard remains.
- Mach Industries: normalized primary_offer_lane 'AI Compliance' -> 'ai-compliance' for store enum.
- Mach Industries: Gate 4 contact validation failed; no named contact staged and no-send/no-workflow guard remains.
- Gigascale Capital: normalized primary_offer_lane 'Tech OGC' -> 'tech-gc' for store enum.
- Gigascale Capital: Gate 4 contact validation failed; no named contact staged and no-send/no-workflow guard remains.
- Gigascale Capital: VC fund, not direct operating-company prospect; staged for portfolio-introduction/Tech OGC review only.

## Safety
Local/internal attorney-review-only staging. No outreach, workflow activation/enrollment, trigger tags, LinkedIn/social action, Clio writes, public/client-facing changes, prospect contact, source-currentness claim, or live CRM/Supabase/HighLevel sync authorized. Supabase mirror and HighLevel sync remain gated by existing blockers.
