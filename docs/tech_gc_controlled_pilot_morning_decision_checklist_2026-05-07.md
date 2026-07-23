# Tech GC Controlled-Pilot Morning Decision Checklist

Task: `t_d6e49e17`
Date: 2026-05-07
Tenant: `whiteford-mountain-west`
HighLevel location: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`)
Selected lane: Tech GC / Tech Company Legal Health Checklist
Private dashboard: `/pilot-readiness` (`http://127.0.0.1:3010/pilot-readiness` when the private Growth OS dashboard is running locally)

Status: Jeff-facing decision checklist only. This document does not authorize activation, sends, enrollments, public publishing, LinkedIn/social activity, Clio activity, ads, production credential changes, or real prospect/client-facing changes.

## Morning recommendation

Keep Tech GC as the first lane for internal controlled QA planning, but do not move past local/no-token QA until Jeff approves the exact HighLevel field remediation path and the remaining policy/review gates. The business-development rationale is still sound: the checklist should deliver useful diagnostic value first, marketing nurture must remain optional and consent-gated, and high-fit users should be routed to a bounded Tech Company OGC Launchpad-style review rather than a vague consult CTA.

## One-page go/no-go table for internal controlled QA only

| Gate | Current status | Go/no-go decision |
| --- | --- | --- |
| First-lane choice | Tech GC is still the recommended default first lane because it is broad, educational, lower-current-law-sensitivity than AI Compliance, and routes naturally to a bounded Tech Company OGC Launchpad review. | GO to keep Tech GC as the preferred first local/preview QA lane, subject to Jeff confirmation. |
| Lead-magnet value before nurture | Parent copy/guardrail posture supports delivering checklist/report value without making marketing consent the price of basic educational value. | GO for internal review of this posture; NO-GO for external delivery until copy/legal/privacy approval and non-subscriber policy are decided. |
| Engineering guardrails | Parent launch-gate review says `/api/leads` server-side disclaimer/version/schema gates and shared lead-magnet guardrail v2 parity are closed for local/staging/internal QA. | GO for local/no-token Tech GC API matrix planning; NO-GO for live HighLevel writes without separate Jeff approval. |
| HighLevel custom fields | Blocked: read-only/dry-run evidence shows 6 of 37 expected fields present and 31 missing. Tech GC shared/field-specific fields are among the missing fields. | NO-GO for live field smoke testing, activation, or any workflow/message reliance until the 31-field remediation packet is approved, executed, and read-only verification passes. |
| HighLevel workflow status | Safety-positive: Tech GC workflow UI/DOM evidence shows `WF | Intake | Whiteford | Tech GC Launchpad | Draft` and trigger `workflow:tech-gc-launchpad`. | GO for read-only Draft/Off inspection only; NO-GO for publish, activate, test workflow, or enrollment. |
| Executable workflow guards | Partial only: UI evidence proves `newsletter:ai` branch and note-level guard language, but not separate executable conditions for DND, unsubscribe/suppression, `ops:no-auto-send`, `newsletter:not-consented`, approval status, consent-basis prefix, disclaimer/version/input-type fields, or conflicts/adverse-party hold. | NO-GO for any external action path until executable guards or a documented manual approval gate are captured before message steps. |
| Supabase expanded schema | Blocked: private dashboard reports 33 phase 6-11 expanded tables still missing until DDL is applied. | NO-GO for expanded CRM/evidence/approval mirroring that depends on missing tables; GO only for already-working local/core evidence references. |
| Non-subscriber policy | Still unresolved: safe default is no-send/no-auto-send; Jeff must choose on-page-only, one-time transactional email, internal attorney-review task, or no outbound delivery. | NO-GO for non-subscriber outbound report delivery. GO for on-page/internal review only if no email/SMS/DM is sent. |
| Legal/ethics/copy review | Still pending for selected lane, report copy, email/footer/unsubscribe/sender identity, attorney-advertising/no-legal-advice/no-ACR/conflicts/privacy posture. | NO-GO for public/client-facing copy or email assets until Jeff/Whiteford approval. |
| Internal local/no-token QA | Allowed after Jeff confirms the lane and QA scope, using synthetic Jeff-owned test payload values and no live HighLevel credentials. | CONDITIONAL GO for local/preview/no-token QA only. |
| Live Jeff-owned TEST-record write | Not approved by this checklist. Requires exact records, env scope, time window, rollback, no-send evidence plan, and separate Jeff approval. | NO-GO until separate approval. |
| Public production / activation / outreach | Explicitly not authorized. | HARD NO-GO. |

## Exact Jeff approvals still needed

Jeff should decide these in order:

1. First-lane decision: approve Tech GC as the first internal controlled-QA lane, choose AI Compliance instead, or hold both lanes.
2. HighLevel field remediation: approve manual UI creation of only the 31 missing Contact custom fields in `docs/highlevel_guardrail_v2_missing_field_remediation_packet_2026-05-07.md`, request edits, or request a separate dry-run-first field-creation script approval packet.
3. Post-field verification: approve a read-only verification pass after field creation and require 37/37 fields present, 0 type mismatches, and 0 generated-key risks before any live-field smoke test.
4. Workflow guard evidence: approve continued read-only Draft/Off UI evidence gathering for Tech GC guard conditions, with no save/publish/test/enrollment actions.
5. Internal QA scope: approve local/preview/no-token Tech GC matrix testing only, or separately approve an exact live Jeff-owned TEST-record write scope.
6. Non-subscriber fulfillment policy: choose on-page-only value, one-time transactional email, internal attorney-review task, or no outbound delivery; until chosen, default remains no-send/no-auto-send.
7. Legal/ethics/privacy/copy/deliverability review: approve selected-lane app/report/email copy, sender/footer/address/unsubscribe/preference handling, no-legal-advice/no-attorney-client/conflicts/privacy language, and data-minimization posture.
8. Supabase schema: approve or perform the expanded-schema DDL before relying on expanded evidence/approval/contact tables.
9. Activation packet: later and separate only; must identify exact workflow, copy, recipients/test records, timing, rollback, suppression/conflicts checks, and no-social/no-Clio/no-ad boundaries.

## Safe to do now

These are safe only as internal/draft/read-only/local actions:

- Review this checklist and the parent deliverables.
- Keep Tech GC as the default first-lane recommendation for planning.
- Review the private `/pilot-readiness` dashboard locally at `http://127.0.0.1:3010/pilot-readiness` if the private Growth OS dashboard is running.
- Review the 31-field HighLevel remediation packet and decide whether manual field creation should be approved.
- Run or prepare local/no-token Tech GC API/browser QA plans that do not use live HighLevel credentials and do not create/update CRM records.
- Continue read-only HighLevel inspection of the existing Draft/Off Tech GC workflow if needed, without saving, publishing, activating, testing, enrolling, or editing.
- Draft internal QA evidence folders, checklists, and approval language.

## Still forbidden

This checklist does not authorize any of the following:

- Activating, publishing, enabling, manually starting, or testing a HighLevel workflow.
- Enrolling contacts into automations.
- Sending email, SMS, DM, voicemail, LinkedIn messages, social posts, newsletters, campaigns, ads, or any external outreach.
- Publishing public/client-facing pages, forms, reports, posts, ads, or social content.
- Adding production HighLevel credentials or changing Vercel/production environment settings.
- Creating or mutating real CRM contacts, opportunities, tags, tasks, notes, fields, campaigns, or records, except for a separately approved field-remediation scope or exact Jeff-owned TEST-record scope.
- Writing to Clio.
- Using real prospects, imported/researched contacts, clients, adverse parties, or third-party contacts in the controlled pilot.
- Treating the `newsletter:ai` branch evidence as sufficient proof of all suppression/approval/legal guards.
- Treating non-subscriber report delivery as approved.

## Unresolved blockers by area

### HighLevel fields and UI

- 31 required guardrail/mapped Contact custom fields are missing; only 6/37 are verified present.
- Field key generation risk remains until post-creation verification confirms exact `contact.<api_key>` keys.
- Tech GC UI evidence confirms Draft/Off and selected trigger but only partial guard implementation evidence.
- Suppression/DND/unsubscribe/no-send/approval/conflicts/disclaimer/version/input-type guards are documented or label-level, not fully proven executable before any future message step.

### Supabase expanded schema

- Private dashboard reports 33 phase 6-11 expanded tables are still missing until DDL-capable access or manual SQL execution is provided.
- Expanded evidence/approval/contact mirroring that depends on those tables remains blocked.

### Non-subscriber policy

- Safe default is no-send/no-auto-send.
- Jeff has not approved whether non-subscribers receive only on-page value, a one-time transactional report email, an internal attorney-review task, or no outbound delivery.
- No one-time transactional email should be sent until exact channel, sender, timing, copy, footer, suppression checks, and implementation are approved.

### Legal/ethics/copy review

- Tech GC route/report/email copy remains draft/internal until Jeff/Whiteford approval.
- Required review includes no legal advice, no attorney-client relationship, no confidential-information request, conflicts/written-engagement caveat, attorney-advertising claim posture, privacy/data minimization, current-law sensitivity where relevant, sender identity, firm footer/address, unsubscribe/preference handling, and deliverability.

## Direct links to parent deliverables and dashboard

- HighLevel missing-field remediation packet: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel_guardrail_v2_missing_field_remediation_packet_2026-05-07.md`
- HighLevel Tech GC Draft/Off UI guard evidence: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel_tech_gc_draft_off_ui_guard_evidence_2026-05-07.md`
- Private dashboard refresh evidence: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/docs/pilot_readiness_dashboard_refresh_2026-05-07_t_6329a2a7.md`
- Private dashboard route: `/pilot-readiness` (`http://127.0.0.1:3010/pilot-readiness` locally)
- Controlled-pilot approval packet: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/controlled_pilot_approval_packet_tech_gc_default_2026-05-07.md`
- Launch-gate review: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/lead_magnet_pilot_hardening_launch_gate_review_2026-05-07.md`
- HighLevel guardrail v2 field/workflow verification: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel_guardrail_v2_field_workflow_verification_2026-05-07.md`
- HighLevel read-only API probe: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel_guardrail_v2_api_probe_2026-05-07.json`
- Supabase expanded-schema blocker: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/reports/2026-05-06-supabase-expanded-schema-blocker.md`

## Bottom line

Decision: Tech GC remains the recommended first controlled-pilot lane, but only for internal local/preview/no-token QA planning. The next practical approval is the 31-field HighLevel Contact custom-field remediation path, followed by read-only verification and additional Draft/Off guard evidence. Nothing in this checklist authorizes activation, sends, enrollments, public publishing, LinkedIn/social, Clio, ads, production credential changes, or real prospect/client-facing CRM changes.
