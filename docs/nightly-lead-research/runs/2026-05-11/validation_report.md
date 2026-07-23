# 2026-05-11 Nightly Prospect Validation Report

Validated at: 2026-05-11T10:53:18+00:00

## Store results

- Normalized payload: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-11/prospect_candidates.normalized_for_store.json`
- Dry run: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-11/store_dry_run.json`
- Apply/verification output: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-11/store_output.json`
- Local DB: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`
- Store status: original ops worker applied local SQLite staging before a Kanban protocol violation; watchdog verified the rows and created the missing local Agent Targeting work item.
- Verified counts: `{'prospects': 1, 'contacts': 1, 'opportunities': 1, 'source_evidence': 2, 'outreach_drafts': 0, 'approval_items': 0, 'crm_sync_records': 1, 'suppression_checks': 0}`

## Staged records

- Kore.ai (`prospect_ae4ea495016fb286698d44da`): domain `kore.ai`, lane `tech-gc`, contacts 1, evidence 2, drafts 0, pending sync records 1; work item `work_nightly_agent_targeting_d9e8526442f6ac499abd`

## Local agent-targeting work items

- `work_nightly_agent_targeting_d9e8526442f6ac499abd` priority 58; external_action_allowed=False; approval_required=True; Prepare attorney-review Agent Targeting packet: Kore.ai

## Source validation notes

- Kore.ai is staged only as a low-priority, attorney-review-required Agent Targeting/watchlist record.
- Firecrawl/web_extract credits were exhausted, so evidence is curl/title/meta limited even though the first-party URLs returned HTTP 200 during the research run.
- Named contact confidence is low and must not be used for outreach until official/high-confidence verification, conflicts, suppression, and Jeff/attorney approval are complete.
- No outreach drafts, approval items, or suppression checks were created for this record.

## Safety status

Local staging only. No HighLevel mutation, Supabase DDL/mirror, Apollo enrichment, Clio write, email send, LinkedIn/social action, workflow enrollment/activation, public publishing, ad launch, or client-facing action was performed. External action remains blocked pending exact Jeff approval plus conflicts/suppression/source-current verification.
