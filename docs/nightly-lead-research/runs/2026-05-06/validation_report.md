# 2026-05-06 Nightly Prospect Validation Report

Validated at: 2026-05-07T04:52:04+00:00

## Store results

- Dry run: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-06/store_dry_run.json`
- Apply output: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-06/store_output.json`
- Local DB: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`

## Staged records

- Rigetti Computing (`prospect_d249372d03e9b2df1dd67726`): 2 contacts; work item `work_nightly_agent_targeting_a2124de0cc59fed06b53`; inserted=True
- Nexar (`prospect_c542c95f73995e2dbd2a15c3`): 2 contacts; work item `work_nightly_agent_targeting_cfc6d7ea6fc45a6e2ffd`; inserted=True
- Kodiak Robotics (`prospect_c6c776b4596056a65d055c7c`): 2 contacts; work item `work_nightly_agent_targeting_342cdb2db5260e24bc78`; inserted=True

## Semantic validation warnings

- HIGH - Rigetti Computing: Candidate contact and leadership names do not match current extracted Rigetti about page: extracted page lists Dr. Subodh Kulkarni as President/CEO, David Rivas as CTO, and Jeffrey Bertelsen as CFO; candidate listed "Sub cool" and Rob Mortensen. Treat contacts as unverified before sync/outreach.
- HIGH - Nexar: Candidate uses nexar.com but describes AI fleet/computer-vision/dash-cam style business. Extracted nexar.com is an electronics/Altium ecosystem API and supply-chain platform; getnexar.com is the dash-cam brand. Treat company/domain/offer mapping as unresolved before sync/outreach.
- HIGH - Kodiak Robotics: Candidate contacts Tim Heister/Alex Vins did not match extracted Kodiak company page, which identifies Don Burnette as Founder and CEO. Candidate source URL https://www.kodiak.ai/about returned a moved/not-found page; current pages are kodiak.ai/company and kodiak.ai/technology.
- MEDIUM - Payload summary: Payload summary says ai-patent count is 3 and total_contacts_sourced is 5, but records contain 2 ai-patent plus 1 ai-compliance candidates and the store inserted 6 contacts due duplicate Nexar contact entries.

## Safety decision

Records are staged locally only. Do not send outreach, activate workflows, perform LinkedIn actions, or treat these as source-verified until the warnings above are resolved by attorney/data review.
