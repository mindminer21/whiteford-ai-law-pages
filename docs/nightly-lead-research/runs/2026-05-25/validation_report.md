# 2026-05-25 Nightly Prospect Validation / Local Staging Report

Validated at: 2026-05-25T08:19:39+00:00

## Store results

- Normalized payload: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-25/prospect_candidates.normalized_for_store.json`
- Dry run: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-25/store_dry_run.json` — status `dry_run` for 3 candidates
- Apply output: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-25/store_output.json` — status `applied` with counts `{'prospects': 2, 'contacts': 6, 'opportunities': 2, 'source_evidence': 11, 'outreach_drafts': 2, 'approval_items': 2, 'crm_sync_records': 2, 'suppression_checks': 2}`
- Store verification: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-25/store_verification.json`
- Pre-apply local DB backup: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-25/growth-os.before_t_a879a957.sqlite`
- Local DB: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`

## Staged records

- Machina Labs (`prospect_machina_labs_20260525`): domain `machinalabs.ai`, lane `ai-patent`, stage `research_staged`, suppression `consent_gap_no_auto_send`, conflicts `required_before_send`; work item `work_nightly_agent_targeting_20260525_6985b28a57cd2be14ee03004`.
- Rhoda AI (`prospect_rhoda_ai_20260524`): domain `rhoda.ai`, lane `ai-patent`, stage `research_staged`, suppression `consent_gap_no_auto_send`, conflicts `required_before_send`; work item `work_nightly_agent_targeting_20260525_fb899646d1907dfadf94dd72`.
- Mind Robotics (`prospect_mind_robotics_20260525`): domain `mindrobotics.ai`, lane `ai-patent`, stage `research_staged`, suppression `consent_gap_no_auto_send`, conflicts `required_before_send`; work item `work_nightly_agent_targeting_20260525_7248b1f771bf454d7328c416`.

## Local agent-targeting work items

- `work_nightly_agent_targeting_20260525_6985b28a57cd2be14ee03004` priority 80; external_action_allowed=False; approval_required=True; input `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-25/agent-targeting-work-items/machina-labs.json`; Prepare attorney-review Agent Targeting packet: Machina Labs.
- `work_nightly_agent_targeting_20260525_fb899646d1907dfadf94dd72` priority 83; external_action_allowed=False; approval_required=True; input `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-25/agent-targeting-work-items/rhoda-ai.json`; Prepare attorney-review Agent Targeting packet: Rhoda AI.
- `work_nightly_agent_targeting_20260525_7248b1f771bf454d7328c416` priority 80; external_action_allowed=False; approval_required=True; input `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-25/agent-targeting-work-items/mind-robotics.json`; Prepare attorney-review Agent Targeting packet: Mind Robotics.

## Validation / semantic warnings

- Rhoda AI matched existing local prospect_id prospect_rhoda_ai_20260524 by domain rhoda.ai; 2026-05-25 evidence/contact rows and a separate 2026-05-25 work item were staged while preserving the existing prospect identity.
- Mind Robotics remains flagged for Rivian conflict-of-interest review before any external use.
- Mind Robotics domain canonicalization is informational/uncleared in the source gates; keep attorney-review-only/source-current review before external use.
- All candidates are non-Mountain-West HQ; no Mountain West claim is made. Use industry-wide AI/IP relevance only if Jeff approves future external action.
- All outreach and LinkedIn awareness drafts are attorney-review-only and must not be sent, posted, tagged, synced live, or enrolled in workflows.

## Safety decision

Records and work items are staged locally only with external_action_allowed=0 and approval_required=1. No outreach, sends, workflow activation/enrollment, trigger tags, LinkedIn/social action, Clio write, public/client-facing use, or live CRM/Supabase sync is authorized.
