# Review — Nightly Qwen prospect research digest, 2026-05-23

Task: `t_b86e59af`
Tenant: `whiteford-mountain-west`

Reviewed artifacts:
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/digest.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/prospect_candidates.json`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/prospect_candidates.normalized_for_store.json`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/validation_report.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/store_verification.json`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/agent-targeting-work-items/josh-ai.json`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/agent-targeting-work-items/akasa.json`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/agent-targeting-work-items/deepwatch.json`
- Local Growth OS SQLite store at `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite` using read-only verification queries
- Live source spot checks using `web_extract` / `web_search` for the material source-evidence claims listed below
- Kanban sync-gate tasks `t_463fe51f`, `t_3b007a04`, `t_7884ab57`, and graph handoff comments

## Verdict

CHANGES REQUESTED for prospect/source accuracy before any downstream Agent Targeting packet prep, HighLevel sync, Supabase mirror, outreach-draft expansion, social draft cleanup, or Jeff approval packet.

PASS only for the local safety posture: the artifacts and local Growth OS staging keep `external_action_allowed=false`, require attorney review, leave suppression/conflicts uncleared, and do not authorize any external or live-system action.

No email, SMS, DM, LinkedIn message, social post, HighLevel contact/opportunity mutation, workflow activation/enrollment/tagging, Supabase/Clio write, public publishing, paid ad, client/prospect-facing action, or attorney/prospect contact is authorized by this review.

## Blocking accuracy findings

### 1. AKASA is not sufficiently supported as a Denver HQ prospect

The packet and digest classify AKASA as `Denver, CO (HQ)` and treat this as passed Mountain West geographic support.

Live source checks do not support that HQ claim:
- AKASA's 2025 first-party press release is datelined `South San Francisco, Calif.`
- Current public office listings found during review state AKASA headquarters is South San Francisco, with Denver described as a hub/office rather than HQ.

Recommended correction:
- Change AKASA geography from `Denver, CO (HQ)` to `South San Francisco HQ; Denver/Colorado hub or office appears relevant but needs first-party or reliable current corroboration`.
- Downgrade Mountain West geographic confidence from `passed` to `partial / needs corroboration` unless a current first-party AKASA page confirms Denver as an HQ or strategically relevant Colorado office.
- Keep AKASA out of any Mountain-West-specific named outreach queue until the geography statement is corrected.

### 2. Deepwatch is materially misclassified on geography and some company facts

The packet and digest classify Deepwatch as `Denver, CO`, founded prior to 2023, with `~233M total` funding and CEO John DiLullo sourced from Crunchbase.

Live source checks conflict with the staged packet:
- Crunchbase News article used in the packet describes Deepwatch as Tampa, Florida-based, founded in 2019, with $180M fresh financing and $256M total raised per Crunchbase.
- The same Crunchbase article names Charlie Thomas as CEO at the time of that funding article, not John DiLullo.
- A later first-party Deepwatch 2024 announcement confirms John DiLullo became CEO effective July 2, 2024 and will be based in Silicon Valley.
- The staged packet does not include the 2024 first-party CEO-change source and does not provide support for Denver geography.

Recommended correction:
- Remove Deepwatch from the Denver/Mountain West queue unless a current source independently supports a Denver office or strategic Colorado nexus.
- Replace the CEO evidence source with the first-party 2024 Deepwatch announcement if John DiLullo remains in the packet.
- Correct or qualify founding/funding values to match cited sources: founded 2019 and $256M total per Crunchbase article, while noting the $180M financing mix was not fully broken out.
- Downgrade Deepwatch from `moderate`/Agent Targeting prep to `hold - geography and current-source correction required`.

### 3. LinkedIn/social draft candidates need mandatory no-tag cleanup

The digest includes LinkedIn awareness post draft candidates with explicit tags `@joshai` and `@akasahealth`.

That is not safe for the current posture because:
- LinkedIn profile/company tagging can create external visibility and should not be included in default internal drafts unless Jeff gives exact approval for that specific social action.
- The packet is attorney-review-only and all prospects have no consent / no auto-send / no external-action authorization.

Recommended correction:
- Remove all `@` tags from internal social draft candidates.
- Keep any social copy as untagged, generic, attorney-review-only drafting material until Jeff explicitly approves final copy, channel, timing, and posting human.

### 4. LinkedIn evidence hygiene needs tightening

The packet assigns Josh.ai's company LinkedIn URL to Tim Gill's `linkedin_url` field even though the confidence says `company_page_only`. It also treats the AKASA co-founder LinkedIn profile as verified even though LinkedIn could not be extracted by the review tooling and should not be scraped or treated as a primary source without safe, current human verification.

Recommended correction:
- For Tim Gill, leave person-level LinkedIn URL blank and retain the Josh.ai company page only as company-level evidence, not a contact URL.
- For Benjamin Beadle-Ryby, keep `medium` confidence and require non-LinkedIn or manually reviewed evidence before named-recipient targeting.

## Passing safety and staging checks

### 1. Local staging guardrails are preserved

The validation report and local SQLite verification show three prospects were staged locally only with:
- `pipeline_stage=research_staged`;
- `risk_level=attorney_review_required`;
- `suppression_status=consent_gap_no_auto_send`;
- `conflicts_status=required_before_send`;
- outreach drafts marked `attorney_review_only`, `needs_review`, and `external_action_allowed=0`;
- suppression checks present but `not_cleared`;
- crm sync records present only as pending local rows, not permission to sync.

SQLite spot check confirmed the staged local rows exist for Josh.ai, AKASA, and Deepwatch with 5 contacts, 8 source evidence rows, 3 outreach drafts, 3 suppression checks, and 3 pending sync records. Approval rows also exist and are linked to the staged draft IDs.

### 2. Josh.ai source chain is mostly supportable for internal review

Josh.ai first-party sources support the core internal targeting logic:
- Denver-based company founded in 2015 from `https://josh.ai/about/`;
- Alex Capecelatro as Co-Founder & CEO and Tim Gill as Co-Founder & CTO from `https://josh.ai/team`;
- J++ / Tim Gill technology role from the team page;
- public patent portfolio from `https://josh.ai/patents/`.

Required cleanup before any next stage:
- Add `https://josh.ai/patents/` as an explicit evidence URL if the patent-activity claim remains central.
- Remove the Josh.ai company LinkedIn URL from Tim Gill's person-level `linkedin_url` field.
- Replace phrasing like `actively producing/filing AI patents` with source-exact phrasing such as `public patent page lists numerous provisional patents plus listed utility/design patents` unless a current filing source is checked.

### 3. HighLevel sync is not complete and remains gated

The 2026-05-23 HighLevel child task `t_463fe51f` is still `todo`, additionally gated by durable HighLevel blocker `t_7884ab57`.

No HighLevel create/link, contact mutation, opportunity mutation, workflow enrollment, trigger tag, campaign action, send, LinkedIn/social action, or public/client-facing change has been verified as complete or authorized.

### 4. Supabase mirror is not complete and remains gated

The 2026-05-23 Supabase mirror child task `t_3b007a04` is still `todo`, additionally gated by expanded Supabase schema blocker `t_fa6eb9c1` per the graph handoff.

No Supabase DDL, mirror, backfill, public dashboard update, or live sync has been verified as complete or authorized.

## Required next action

Default to HOLD for AKASA and Deepwatch until the packet is corrected.

Before any downstream packet prep, HighLevel dry-run/sync, Supabase mirror/backfill, outreach collateral, LinkedIn/social draft reuse, or Jeff approval packet:
1. Patch the 2026-05-23 digest and prospect packet to correct AKASA geography, Deepwatch geography/current CEO/founding/funding evidence, LinkedIn field hygiene, and social no-tag posture.
2. Re-run source-current checks for any corrected Mountain West nexus claims.
3. Keep all three prospects in `research_only` / `attorney_review_required` posture with `external_action_allowed=false`.
4. Treat Josh.ai as the only prospect with a currently supportable Denver/HQ and source chain, subject to the cleanup items above and attorney/conflicts/suppression review.
5. Separately resolve HighLevel access/exact approval and Supabase schema/admin blockers before any live sync.

No external/live action is authorized by this review.
