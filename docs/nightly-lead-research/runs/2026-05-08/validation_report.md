# 2026-05-08 Nightly Prospect Validation Report

Validated at: 2026-05-08T08:35:10+00:00

## Store results

- Normalized payload: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-08/prospect_candidates.normalized_for_store.json`
- Dry run: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-08/store_dry_run.json`
- Apply output: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-08/store_output.json`
- Local DB: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`
- Store status: dry-run `dry_run` for 3 candidates; apply `applied` with counts `{'prospects': 3, 'contacts': 6, 'opportunities': 3, 'source_evidence': 11, 'outreach_drafts': 3, 'approval_items': 3, 'crm_sync_records': 3, 'suppression_checks': 3}`

## Staged records

- RADICL (Radicl Defense LLC) (`prospect_2180fd85f6085ebc2a595f72`): domain `radicl.com`, lane `tech-gc`, contacts 2, evidence 5, drafts 1, pending sync records 1; work item `work_nightly_agent_targeting_e30b8b574f81691c76de`
- Manifest OS (`prospect_647f303b12467f9d88c68da4`): domain `manifestos.com`, lane `tech-gc`, contacts 2, evidence 4, drafts 1, pending sync records 1; work item `work_nightly_agent_targeting_ddc5be7cafbe9eedb055`
- Sereact (`prospect_ef30df45ad62c93981758ca3`): domain `sereact.de`, lane `ai-patent`, contacts 2, evidence 2, drafts 1, pending sync records 1; work item `work_nightly_agent_targeting_024634d5cebed23366c1`

## Local agent-targeting work items

- `work_nightly_agent_targeting_e30b8b574f81691c76de` priority 80; external_action_allowed=False; approval_required=True; Prepare attorney-review Agent Targeting packet: RADICL (Radicl Defense LLC)
- `work_nightly_agent_targeting_ddc5be7cafbe9eedb055` priority 80; external_action_allowed=False; approval_required=True; Prepare attorney-review Agent Targeting packet: Manifest OS
- `work_nightly_agent_targeting_024634d5cebed23366c1` priority 82; external_action_allowed=False; approval_required=True; Prepare attorney-review Agent Targeting packet: Sereact

## Source validation notes

- RADICL: first-party homepage, leadership, and investor pages support the company, leadership, AI/vSOC, DIB/CMMC, and funding signals; BizJournals remains secondary/paywall-sensitive and should not be the only copy source for funding/hiring details.
- Manifest OS: first-party Series A page plus BusinessWire/LegalTechTalk support funding/model facts; not a Mountain West company, so keep attorney-review-only unless Jeff approves national legaltech targeting.
- Sereact: official domain supports company-level AI robotics fit, but named contacts are sourced only from low-confidence/non-official public source in the packet; hold named-recipient outreach and use watchlist/research-only until official contact verification.

## Semantic validation warnings

- MEDIUM - Manifest OS: Contact David Schellhas confidence 65 is below 75; hold named-contact outreach until verified through official/company or high-confidence source.
- LOW - Manifest OS: Geographic fit is New York, NY (333 Park Ave S, NYC; powered firms operate under Arizona AI-qualified ABS status); not Colorado/Mountain West. Keep as attorney-review-only unless Jeff approves broader national/international targeting rationale.
- MEDIUM - Sereact: Contact Dr. Ralf Gulde confidence 65 is below 75; hold named-contact outreach until verified through official/company or high-confidence source.
- MEDIUM - Sereact: Contact Marc Tuscher confidence 65 is below 75; hold named-contact outreach until verified through official/company or high-confidence source.
- MEDIUM - Sereact: Evidence caveat for https://www.instagram.com/p/DXphxYMkek0/: Instagram source - verify via company website, Crunchbase, or press release before named-contact outreach
- MEDIUM - Sereact: Geographic fit is Stuttgart, Germany; not Colorado/Mountain West. Keep as attorney-review-only unless Jeff approves broader national/international targeting rationale.

## Safety decision

Records are staged locally only. Work items are queued for local agent-targeting packet preparation with `external_action_allowed = 0` and `approval_required = 1`. Do not send outreach, activate workflows, perform LinkedIn actions, write to Clio, move records into live HighLevel/Supabase sync, or treat conflicts/suppression as cleared until Jeff explicitly approves that exact external action.
