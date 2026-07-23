# 2026-05-07 Nightly Prospect Validation Report

Validated at: 2026-05-07T09:40:39+00:00

## Store results

- Normalized payload: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-07/prospect_candidates.normalized_for_store.json`
- Dry run: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-07/store_dry_run.json`
- Apply output: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-07/store_output.json`
- Local DB: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`
- Store status: dry-run `dry_run` for 3 candidates; apply `applied` with counts `{'prospects': 3, 'contacts': 6, 'opportunities': 3, 'source_evidence': 12, 'outreach_drafts': 3, 'approval_items': 3, 'crm_sync_records': 3, 'suppression_checks': 3}`

## Staged records

- Electra (`prospect_bba8ec0dec6e73619770860d`): domain `electra.earth`, lane `tech-gc`, contacts 2, evidence 4, drafts 1, pending sync records 1; work item `work_nightly_agent_targeting_92ca00eb4e75f5e07b1d`
- Flatfile (also rebranded company name: Obvious) (`prospect_bea9dbd287cb8fcf077720d0`): domain `flatfile.com`, lane `tech-gc`, contacts 2, evidence 3, drafts 1, pending sync records 1; work item `work_nightly_agent_targeting_9e331922b7ef2980d8f1`
- PickNik Robotics (`prospect_bd2e46b6a31bc423d3064218`): domain `picknik.ai`, lane `ai-patent`, contacts 2, evidence 5, drafts 1, pending sync records 1; work item `work_nightly_agent_targeting_6c492c2ae5ff71c32f3e`

## Local agent-targeting work items

- `work_nightly_agent_targeting_92ca00eb4e75f5e07b1d` priority 83; external_action_allowed=False; approval_required=True; Prepare attorney-review Agent Targeting packet: Electra
- `work_nightly_agent_targeting_9e331922b7ef2980d8f1` priority 74; external_action_allowed=False; approval_required=True; Prepare attorney-review Agent Targeting packet: Flatfile (also rebranded company name: Obvious)
- `work_nightly_agent_targeting_6c492c2ae5ff71c32f3e` priority 67; external_action_allowed=False; approval_required=True; Prepare attorney-review Agent Targeting packet: PickNik Robotics

## Source validation notes

- PickNik Robotics: Validated core claims against company team page, PickNik news releases, and Crunchbase summary. Dave Grant CEO / Nathan Brooks CTO / Boulder / MoveIt platform / SpaceWERX and funding signals are supported; exact Crunchbase round-count/founded detail remains review-only because some fields are obfuscated.
- Electra: Validated leadership, patented clean-iron process, Boulder location, and $186M Series B against Electra team page and GlobeNewswire. BizJournals J.P. Morgan article is paywalled; do not use its details as standalone copy evidence.
- Flatfile/Obvious: Validated AI data-exchange claims, David Boskovic CEO quote, Denver dateline, Latka revenue/customer/funding snapshot, and general platform claims. Built In extraction did not expose the Flatfile row; treat Built In as secondary/unverified for copy unless manually checked.

## Semantic validation warnings

- LOW - PickNik: Crunchbase extraction obfuscates founded/funding details; use company/news pages for copy and reserve exact Crunchbase round-count claims for review.
- MEDIUM - Electra: one BizJournals source is paywalled in extraction; keep J.P. Morgan/project-financing details as internal review context only unless Jeff verifies source access.
- MEDIUM - Flatfile/Obvious: department PR email is public media-contact evidence only; not a decision-maker outreach address and must remain blocked from sends.
- LOW - Flatfile/Obvious: rebrand naming may require a manual CRM naming decision before any external sync copy; staged with source-packet company name.
- MEDIUM - All prospects: consent_gating shows no opt-in/consent gap; conflicts/suppression remain required_before_send/not_checked and no live outreach or workflow enrollment is authorized.

## Safety decision

Records are staged locally only. Work items are queued for local agent-targeting packet preparation with `external_action_allowed = 0` and `approval_required = 1`. Do not send outreach, activate workflows, perform LinkedIn actions, write to Clio, move records into live HighLevel/Supabase sync, or treat conflicts/suppression as cleared until Jeff explicitly approves that exact external action.
