# 06:30 Lead-Magnet and HighLevel Decision Digest — 2026-05-10

Task: `t_4e5d5af9`
Tenant: `whiteford-mountain-west`
Status: INTERNAL JEFF/WHITEFORD DECISION PREP ONLY / NO EXTERNAL OR LIVE-SYSTEM ACTION AUTHORIZED

This digest consolidates the latest passed internal-only handoffs for the lead-magnet, `/api/leads`, HighLevel custom-field, smart-list, Tech GC copy, Supabase, and source-access lanes. It does not approve, perform, or imply local QA execution, code changes, HighLevel UI/API work, field creation, saved-view creation, workflow testing/activation/enrollment, contact/tag/opportunity mutation, email/SMS/newsletter/social/LinkedIn/ad activity, public page changes, Supabase/Clio writes, production credential use, prospecting, or any client/prospect-facing action.

Business-development synthesis applied conservatively: a strong lead magnet should solve one narrow diagnostic problem, build problem awareness, deliver useful value before asking for a larger next step, and keep legal-services follow-up opt-in-only, educational, non-hypey, non-confidential, no-ACR/no-legal-advice/no-guarantee, and attorney-review-gated. The local business-development corpus retrieval reinforced the narrow diagnostic / problem-awareness / value-before-ask principle; no book text is reproduced here.

## 1. One-screen executive summary for Jeff

Bottom line: the internal prep stack is coherent and reviewable, but nothing live is approved.

| Lane | Current safe internal status | Decision Jeff can make now | What remains blocked |
| --- | --- | --- | --- |
| Lead-magnet strategy | Passed for internal review: narrow diagnostic value, opt-in-only follow-up, non-confidential/no-advice/no-ACR guardrails are consistently carried forward. | Review the recommendation and pick only one narrow next lane if desired. | Public copy, live routing, outreach, ads, social, or automated follow-up. |
| Local/no-token `/api/leads` QA | Test packet exists for synthetic `.invalid` fixture review only. No QA has been run by this digest. | Approve, hold, or revise a future local/no-token QA run with exact operator/evidence folder/stop rules. | HighLevel token calls, live contact upserts, real data, production env, workflow/email/SMS/social action. |
| Future `/api/leads` adapter change | Static findings show current preview uses bare `key` customFields; likely future adapter may need `fieldKey: contact.*` or another verified shape. | Approve only a future local/no-token engineering adapter test/change, or hold. | Live adapter reliance, production deploy, live-token QA, or including unmapped fields without field decisions. |
| Six HighLevel fields | No-mutation decision table recommends holding them out of immediate live payloads and later creating six Contact custom fields after exact approval and verification. | Approve the default hold/later-create path, request removal/remap, or require attorney/privacy review first. | Creating fields, using fields in workflows/reports/code, or storing sensitive M&A/AI Patent values before approval. |
| Smart lists / saved views | No-mutation build packet and evidence template exist. | Approve only a future saved-view-only operator scope, or continue hold. | Opening HighLevel, creating saved views, filtering real contacts, exporting/importing, workflow enrollment, sends, or audience use. |
| Tech GC copy insertion | Consolidated copy redline exists for attorney review only. | Approve internal copy direction, request edits, or hold until legal/privacy/source-current review. | Inserting copy into app/public page/HighLevel/email/newsletter, publishing, or treating draft as final legal-marketing copy. |
| Supabase | Persistent human/admin blocker remains. `t_fa6eb9c1` expanded-schema DDL gates both `t_53d470c6` gated backfill/sync and `t_7d361e6b` 2026-05-10 mirror/visibility work. | Name an authorized human/admin path or continue hold. | Agents running DDL, guessing credentials, syncing/backfilling, mirror refresh, dashboard reliance on expanded tables. |
| Source access | 2026-05-10 prospecting remains source-blocked with zero candidates. | Restore Firecrawl, approve replacement/manual source workflow, or continue hold. | Prospect discovery, candidate inference, staging, scoring, outreach, CRM movement, or source-current claims from blocked runs. |
| No-external-action wall | Preserved across all reviewed handoffs. | Keep as default unless a later exact approval packet narrows one operator/system/channel. | Any public/live/client/prospect-facing action or live-system mutation. |

Safest optional progress lane remains a future exact Jeff-approved local/no-token QA step. If Jeff does not want that single narrow evidence lane today, default posture is HOLD across live/public/CRM/HighLevel/Supabase/Clio/source/prospecting/email/social actions.

## 2. Safe internal review versus approvals still needed

### Safe internal review now

- Read this digest and the source handoffs listed in section 11.
- Compare the copy/paste decision boxes below and mark preferences in a separate human review process.
- Use the local lead-magnet, HighLevel, and Supabase packets as internal decision aids.
- Revise local/private documentation or approval packets.
- Discuss lead-magnet positioning using only non-confidential, educational, no-advice/no-ACR framing.

### Not approved by this digest

- No local QA run, browser test, API probe, or route execution.
- No code edit or adapter change.
- No HighLevel login, UI change, API call, custom field creation/edit, saved view/smart list creation, contact/opportunity/tag/note/task mutation, workflow save/publish/test/manual-start/enrollment, import/export, campaign/template/newsletter asset work, email/SMS/send/test-send, or pipeline movement.
- No Supabase DDL, gated backfill/sync, mirror sync, row mutation, credential guessing, or dashboard reliance on expanded tables.
- No Clio write or conflicts/adverse-party/suppression/prior-touch assumption.
- No source-access restoration, replacement backend configuration, prospect rerun, candidate inference, enrichment, scoring, staging, named-company targeting, or outreach.
- No public page publish/deploy, route/domain/CTA/UTM production change, LinkedIn/social/YouTube/social-planner action, ad, boost, comment, tag, DM, SMS, newsletter, or prospect/client-facing communication.
- No real prospects, clients, imported contacts, third-party contacts, confidential facts, privileged facts, invention disclosures, transaction details, source code, employee/customer/vendor-specific facts, or regulated data in any local QA path.

## 3. Decision box — local/no-token `/api/leads` QA

Default recommendation: HOLD unless Jeff wants one narrow internal evidence step. This approval would only permit a future local/no-token QA worker to run the already prepared synthetic preview checks; it would not authorize code changes or live HighLevel use.

```text
APPROVED: Local/no-token `/api/leads` adapter-shape QA may proceed for INTERNAL SYNTHETIC REVIEW ONLY.

Scope approved:
- Operator/profile: ____________________________.
- Repo/root: /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages.
- Evidence root: docs/controlled-pilot/evidence/2026-05-10-lead-api-payload-adapter-no-token/ or approved replacement: ____________________________.
- Commands allowed only from the prepared packet:
  1. env -u GHL_PRIVATE_INTEGRATION_TOKEN -u GHL_LOCATION_ID npm run test:leads
  2. the no-token adapter-shape preview probe from docs/controlled-pilot/lead_api_payload_adapter_no_token_test_packet_2026-05-10.md.
- Use only synthetic `.invalid` fixture emails, generic TEST company names, and categorical/non-confidential inputs.
- Confirm `mode: preview`, no `payload.locationId`, no HighLevel fetch, no contact/upsert, no workflow enrollment, opt-in-only workflow tags, empty non-opted email sequence, and malicious/client-supplied tag stripping.
- Capture terminal output only in the approved local evidence folder.

Not approved:
- No HighLevel token, live LeadConnector call, contact/opportunity/tag/task/note mutation, workflow test/activation/enrollment, email/SMS/newsletter/social action, Supabase/Clio write, production env, real data, public launch, or client/prospect-facing use.
- No treating local/no-token PASS as public launch, live-system, or external-action approval.

Stop immediately if any credential, live URL call, real data, unmapped field reliance, workflow/campaign/send prompt, production env, or external-use request appears.

Approver:
Date:
Notes:
```

```text
HOLD: Do not run local/no-token `/api/leads` QA yet.

Reason:
- [ ] Need attorney/privacy/brand/source-current review first.
- [ ] Need a different evidence folder/operator.
- [ ] Need fixture or stop-condition revisions.
- [ ] Need custom-field/adapter decision first.
- [ ] Need HighLevel field/workflow guard path first.
- [ ] Other: ____________________________

All public/external/live-system boundaries remain in place.

Approver:
Date:
Notes:
```

## 4. Decision box — future `/api/leads` code adapter change

Current internal finding: no-token preview is safe because the route returns before HighLevel when token/location env vars are absent. Static/readiness packets show the current preview `customFields` baseline uses bare keys such as `{ key: "campaign_key", field_value: "tech-gc" }`. A future adapter may need a verified LeadConnector-compatible shape such as `{ fieldKey: "contact.campaign_key", field_value: "tech-gc" }`, `{ key: "contact.campaign_key", field_value: ... }`, or id-backed references. That remains an engineering/legal/privacy approval question, not a change authorized here.

```text
APPROVED FOR FUTURE LOCAL ENGINEERING ONLY: Prepare a local/no-token `/api/leads` adapter change or adapter test.

Scope approved:
- Files allowed: src/app/api/leads/route.ts and/or tests explicitly named here: ____________________________.
- Approved adapter candidate to test locally: fieldKey contact.* / key contact.* / id-backed verified fields / other: ____________________________.
- Preserve browser/form payload shape and validation/consent logic before HighLevel payload construction.
- Keep no-token preview mode as the first verification boundary.
- Maintain opt-in-only workflow tags, empty non-opted email sequences, malicious-tag stripping, and no-contact/no-upsert behavior.
- Do not include the six unmapped emitted fields unless the six-field decision below is approved and read-only verification passes.
- Evidence path: ____________________________.
- Rollback owner/path: ____________________________.

Not approved:
- No production deploy, live-token HighLevel test, real contact, workflow, email/SMS, CRM, Supabase, Clio, social, ad, public, or client/prospect-facing action.
- No changing public copy or UX as part of this adapter decision.
- No reliance on unverified HighLevel generated keys or field IDs.

Approver:
Date:
Notes:
```

```text
HOLD: Do not change `/api/leads` adapter shape yet.

Reason:
- [ ] Need LeadConnector docs or read-only evidence for exact custom-field shape.
- [ ] Need six-field HighLevel decision first.
- [ ] Need attorney/privacy review of emitted diagnostic fields first.
- [ ] Need local no-token QA evidence on current baseline first.
- [ ] Other: ____________________________

Approver:
Date:
Notes:
```

## 5. Decision box — six HighLevel field decision

Default recommendation carried forward: hold the six emitted-but-unmapped fields out of any immediate live adapter payload. If Jeff wants to preserve the diagnostic context later, create them as a separate exact-scope Contact custom-field batch after the existing field gate is clean, with read-only verification before any code/workflow/report reliance.

Six fields:
- `ai_patent_gap_map`
- `ai_patent_ownership_gap_map`
- `ma_readiness_timing`
- `ma_readiness_category_scores`
- `ma_readiness_risk_map`
- `ma_readiness_60_day_plan`

```text
APPROVED DECISION: Hold now, then create the six HighLevel Contact custom fields later only after exact approval and read-only verification.

Scope approved for later approval packet only:
- Location: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`).
- Object scope: Contact custom fields only.
- Expected keys: contact.ai_patent_gap_map, contact.ai_patent_ownership_gap_map, contact.ma_readiness_timing, contact.ma_readiness_category_scores, contact.ma_readiness_risk_map, contact.ma_readiness_60_day_plan.
- Type expectations: `ma_readiness_timing` = TEXT; other five = LARGE_TEXT.
- Use: internal diagnostic fulfillment/reporting only unless a later attorney-reviewed workflow/copy packet says otherwise.
- Require attorney/privacy review before storing sensitive AI Patent ownership or M&A readiness/risk/60-day-plan values in HighLevel.
- Require read-only verifier evidence before any adapter, workflow, report, dashboard, or live-token reliance.

Not approved:
- No field creation by this digest.
- No immediate addition to a live payload.
- No workflow/contact/opportunity/tag/message/social/ad/Clio/Supabase/public-page mutation.
- No use for automated legal conclusions, urgency messaging, individualized legal advice, or prospect-specific outreach.

Approver:
Date:
Notes:
```

```text
ALTERNATIVE DECISION: Do not create the six fields; request engineering removal/remap proposal.

Requested path:
- [ ] Remove all six emitted fields from `/api/leads` before any live HighLevel reliance.
- [ ] Remap some/all fields into existing verified fields with explicit semantic tradeoffs.
- [ ] Hold until current 37-field gate is verified.
- [ ] Require attorney/privacy review before deciding.
- [ ] Other: ____________________________

No HighLevel field creation, live payload reliance, workflow/reporting use, or external action is approved by this alternative decision.

Approver:
Date:
Notes:
```

## 6. Decision box — HighLevel smart-list / saved-view approval

Default recommendation: continue hold. If Jeff wants a future operator step, approve saved-view-only evidence capture with exact names, filters, exclusions, location, operator, and no-send boundary. Saved views are not send audiences and do not imply email consent.

```text
APPROVED: Future HighLevel saved-view/smart-list build may proceed as SAVED-VIEW-ONLY / NO-MUTATION-BEYOND-VIEW-CREATION evidence capture.

Operator:
Location: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`)
Evidence folder: ____________________________
Approved saved-view names:
1. ____________________________
2. ____________________________
3. ____________________________
4. ____________________________
5. ____________________________
6. ____________________________

Scope approved:
- Use only the exact filter/exclusion logic from the approved HighLevel smart-list packet/evidence template or Jeff-edited replacement attached here: ____________________________.
- Confirm `newsletter:not-consented`, DND, unsubscribe, bounce, suppression, `outreach:do-not-send`, and `ops:no-auto-send` exclusions where applicable.
- Capture screenshots/DOM/read-only evidence and a no-mutation attestation.
- Treat saved views as internal review/segmentation evidence only, not send lists.

Not approved:
- No contact import/export, bulk edit, tag application, workflow enrollment, campaign/template/newsletter work, email/SMS/test send, opportunity/pipeline movement, contact mutation, field creation, Clio, Supabase, social/ad/public action, or client/prospect-facing use.
- No using any saved view as an audience unless a later exact sender/footer/unsubscribe/suppression/legal approval packet authorizes it.

Stop if HighLevel cannot express exact boolean logic, if exclusions cannot be verified, if any write/send/enroll/import/export prompt appears, if credentials/MFA block the operator, or if evidence cannot be captured.

Approver:
Date:
Notes:
```

```text
HOLD: Do not open HighLevel or create/edit saved views/smart lists.

Reason:
- [ ] Need exact saved-view names.
- [ ] Need exact filter/exclusion logic.
- [ ] Need operator/evidence folder.
- [ ] Need consent/suppression policy confirmation.
- [ ] Need attorney/privacy review first.
- [ ] Other: ____________________________

Approver:
Date:
Notes:
```

## 7. Decision box — Tech GC copy insertion

The consolidated Tech GC copy redline is attorney-review-only. It may be used for internal review and copy direction, but not inserted into the app, HighLevel, email/newsletter templates, public pages, social posts, ads, or client/prospect-facing materials without exact later approval.

```text
APPROVED FOR INTERNAL COPY DIRECTION ONLY: Tech GC lead-magnet copy redline may be used as the basis for a future implementation packet.

Scope approved now:
- Review the consolidated redline for non-confidential warnings, no-advice/no-ACR/no-guarantee language, opt-in checkbox wording, browser-only non-opted value, score/readiness interpretation, bounded OGC Launchpad CTA, footer/unsubscribe placeholders, and source-current caveats.
- Mark requested copy edits in local docs only.
- Prepare a later implementation task only after attorney/privacy/brand/source-current approval names the exact route, copy blocks, files, QA plan, and rollback owner.

Not approved:
- No app insertion, public page change, route/domain/CTA/UTM production change, HighLevel copy entry, workflow/campaign/template/newsletter work, email/SMS/send, social/LinkedIn/YouTube/ad use, CRM mutation, Supabase/Clio write, or external/client/prospect-facing publication.
- No treating draft copy as final legal advice, legal conclusion, source-current claim, or client-specific recommendation.

Approver:
Date:
Notes:
```

```text
HOLD OR REQUEST REVISIONS: Do not use Tech GC copy outside internal attorney/Jeff review.

Required revisions:
- [ ] Non-confidential warning placement.
- [ ] No-advice/no-ACR/no-guarantee wording.
- [ ] Non-opted browser-only fulfillment language.
- [ ] Opt-in/report delivery wording.
- [ ] CTA scope.
- [ ] Footer/unsubscribe/privacy/terms/disclaimer placeholders.
- [ ] Source-current/current-law caveats.
- [ ] Other: ____________________________

Approver:
Date:
Notes:
```

## 8. Decision box — Supabase DDL/backfill blocker

Blocker lineage to preserve exactly: expanded-schema DDL task `t_fa6eb9c1` gates `t_53d470c6` gated backfill/sync and `t_7d361e6b` 2026-05-10 mirror/visibility work. Agents must not run DDL, guess credentials, or leapfrog this sequence.

```text
APPROVED FOR AUTHORIZED HUMAN ONLY: Supabase expanded-schema unblock may be performed by Jeff or the following named authorized Supabase admin.

Authorized admin/operator:
Project: yidxnmxvtohaldkbypcv

Scope approved:
- First, satisfy expanded-schema DDL blocker `t_fa6eb9c1` by running prepared SQL: /Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql in Supabase SQL Editor or another approved DDL-capable channel.
- Capture schema verification evidence.
- Only after DDL verification and separate exact approval, unblock `t_53d470c6` gated backfill/sync from /Users/jeff/.openclaw/projects/mountain-west-growth-os using: node scripts/sync-sqlite-to-supabase.mjs.
- Only after DDL and sync/backfill verification, allow `t_7d361e6b` / dashboard mirror visibility to rely on expanded tables.

Not approved:
- No agent runs DDL, guesses credentials, uses production secrets, changes unrelated tables, runs backfill/sync before DDL verification, mutates HighLevel/Clio/CRM, sends email/SMS/social/ad content, or takes public/client/prospect-facing action.
- No treating dashboard copy as proof that expanded tables are live without verification.

Approver:
Date:
Notes:
```

```text
HOLD: Do not run Supabase DDL, gated backfill/sync, mirror sync, or dashboard expanded-table reliance.

Reason for hold:
- [ ] Need authorized Supabase admin.
- [ ] Need credential/session access.
- [ ] Need SQL review before execution.
- [ ] Need maintenance window / rollback owner.
- [ ] Need verification evidence plan.
- [ ] Other: ____________________________

Blocker lineage remains: `t_fa6eb9c1` -> `t_53d470c6` and `t_7d361e6b`.

Approver:
Date:
Notes:
```

## 9. Decision box — source-access blocker

2026-05-10 prospecting remains a source-blocked zero-candidate no-op. QMD and business-development RAG are internal memory/synthesis only; they are not live source proof for prospecting or named-company claims.

```text
APPROVE FIRECRAWL RESTORE FOR INTERNAL RESEARCH ONLY

I approve restoring or funding the Firecrawl-backed source backend used by Hermes web_search/web_extract for internal nightly prospect research only.

Scope approved:
- Source-access recovery.
- Neutral smoke tests before any prospect scoring.
- If smoke tests pass, a fresh research-only nightly rerun under existing Gates 1-7.

Not approved:
- No CRM/HighLevel/Supabase prospect writes.
- No outreach, workflow activation, Clio, LinkedIn/social posting, ads, public publishing, contact enrollment, or named-company action.
- No use of source-blocked 2026-05-10 output for prospect inference.

Approver:
Date:
Notes:
```

```text
APPROVE REPLACEMENT OR MANUAL SOURCE WORKFLOW FOR INTERNAL RESEARCH ONLY

I approve configuring or using the following replacement/manual source workflow for public-source search/extraction and evidence capture only.

Backend/workflow:
Owner/operator:
Required verification before prospect scoring:
- [ ] Neutral web_search or equivalent source-discovery test.
- [ ] Neutral web_extract or equivalent page-extraction test.
- [ ] Official company page extraction test.
- [ ] Source evidence logging test.

Not approved:
- No paywall/login bypass.
- No CRM/HighLevel/Supabase prospect writes.
- No outreach, workflow activation, Clio, LinkedIn/social posting, ads, public publishing, contact enrollment, or named-company action.

Approver:
Date:
Notes:
```

```text
CONTINUE HOLD: Do not restore/configure source backends or rerun prospect discovery yet.

Allowed work:
- Internal docs.
- Blocker tracking.
- Source-access planning.
- Review of existing already-staged records only.

Not approved:
- No new prospect discovery, staging, enrichment, outreach, CRM movement, workflow activation, LinkedIn/social posting, Clio, ads, public action, named-company action, or Supabase expanded-table reliance.

Approver:
Date:
Notes:
```

## 10. Decision box — no-external-action wall

This box is the governing default unless and until a later exact approval packet narrows one action with a named operator, system, scope, evidence path, stop conditions, rollback plan, and legal/privacy/conflicts/suppression gates.

```text
CONFIRMED: No external/live-system action is approved from this digest.

I understand that this digest is internal Jeff/Whiteford decision prep only.

Not approved:
- No local QA unless separately approved in the local/no-token QA box.
- No code change unless separately approved in the adapter-change box.
- No HighLevel UI/API work, custom fields, saved views, contact/opportunity/tag/task/note mutation, workflow save/publish/test/manual-start/enrollment, import/export, campaign/template/newsletter work, email/SMS/test send, or pipeline movement.
- No Supabase DDL, backfill/sync, mirror sync, row mutation, credential guessing, or expanded-table dashboard reliance.
- No Clio write or conflicts/suppression/prior-touch assumption.
- No source-access restoration/rerun/prospect discovery/candidate inference/named-company action unless separately approved in the source-access box and neutral smoke tests pass.
- No public page publish/deploy, route/domain/CTA/UTM production change, LinkedIn/social/YouTube/social-planner action, ad, boost, tag, comment, DM, newsletter, email, SMS, or client/prospect-facing communication.
- No real prospects, clients, imported contacts, third-party contacts, confidential facts, privileged facts, invention disclosures, transaction details, source code, employee/customer/vendor-specific facts, or regulated data in any QA path.

Any future execution task must paste the exact approval text, identify the operator/profile, preserve stop conditions, and route to the proper specialist profile. A PASS review or this digest is not execution permission.

Approver:
Date:
Notes:
```

## 11. Source handoffs consolidated

- `docs/reviews/2026-05-10_0530_lead_magnet_followup_prep_review.md` — PASS for internal lead-magnet follow-up prep only; local QA/code/HighLevel/sends/public/live actions still require exact approvals.
- `docs/reviews/2026-05-10_0430_lead_magnet_highlevel_readiness_review.md` — PASS for internal lead-magnet and HighLevel readiness prep only; no public/live CRM/HighLevel/Supabase/Clio/workflow/send/social/ad/prospect/client action approved.
- `docs/digests/2026-05-10_overnight_followup_decision_register.md` — overnight register with Box A, Supabase, source-access, HighLevel, authority-route decisions and source-blocked no-op posture.
- `docs/reviews/2026-05-10_overnight_followup_visibility_review.md` — PASS for internal/private decision visibility only; all live/public/prospect/client actions held.
- `docs/digests/2026-05-10_sunday_morning_decision_packet.md` — Sunday packet naming Tech GC local/no-token QA as the safest optional lane and preserving Supabase/source/HighLevel/authority blockers.
- `docs/controlled-pilot/lead_api_payload_adapter_no_token_test_packet_2026-05-10.md` — local/no-token `/api/leads` adapter-shape QA packet with synthetic `.invalid` fixtures and stop conditions.
- `docs/highlevel_custom_field_decision_table_2026-05-10.md` — no-mutation six-field decision table with default hold/later-create recommendation and privacy/reporting risks.
- Business-development corpus query run for this digest: `lead magnet narrow diagnostic opt in educational legal follow up no legal advice`.

## 12. Bottom line

Jeff can use this digest as the 06:30 morning decision surface. The internally safe choice, if he wants one narrow progress lane, is to approve future local/no-token `/api/leads` QA with synthetic `.invalid` fixtures and no credentials. Everything else remains review-only, human-only, no-mutation, or hold until a later exact approval packet authorizes one narrow next step.