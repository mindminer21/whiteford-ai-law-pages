# Review — HighLevel funnel map consent alignment — 2026-05-22

Task: `t_9f11934b`
Parent implementation task: `t_0a7330ea`
Tenant: `whiteford-mountain-west`

Reviewed artifacts:
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/highlevel_ai_authority_funnel_map.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel/2026-05-22_funnel_map_consent_alignment_note.md`
- May 19 final-magnet consent-routing fix/review handoffs
- 2026-05-21 daily digest and watchdog review context
- Current `src/app/api/leads/route.ts`, `src/lib/campaigns.ts`, and lead-magnet consent regression tests

## Verdict

PASS for internal/private documentation alignment only.

The updated funnel map resolves the specific 2026-05-21 documentation drift: it no longer treats `newsletter:ai` as a static campaign tag, and it now states that newsletter tags, workflow trigger tags, and email-sequence routing require literal checkbox opt-in for regular campaign submissions. It also preserves the final-magnet posture from the May 19 fix: final magnets may add `newsletter:ai` only when `subscribe === true`, and the final-magnet API branch must not add `workflow:*` trigger tags or email-sequence routing.

This review does not approve launch or live-system work. It does not authorize HighLevel live edits, contact/opportunity/tag/field mutation, workflow/campaign activation, workflow enrollment, email/SMS/newsletter/DM send, LinkedIn/social/YouTube/ad activity, Supabase/Clio writes, public deployment, or client/prospect-facing use.

## Review method

Checks performed:
- Read the updated funnel map and writer implementation note.
- Compared the map against the May 19 final-magnet consent-routing review and May 21 digest/watchdog context.
- Inspected current source snippets in `src/app/api/leads/route.ts` and `src/lib/campaigns.ts` for `newsletter:ai`, `newsletter:not-consented`, workflow trigger tags, `consent_basis`, `approval_status`, and `campaignRouting.emailSequence` behavior.
- Queried the private business-development corpus for lead-magnet/trust/follow-up principles and used only synthesis. The relevant principle is that a lead magnet should solve a narrow problem and fulfill the promised value before a stronger follow-up ask.
- Queried QMD `whiteford-ai-law-pages`; relevant hits included the final-magnet non-opted browser-value spec, lead API opt-in gating audit, May 20 watchdog action brief, May 19 daily digest, and the funnel map. QMD reinforced the standing rule that non-opted users must not receive newsletter/workflow/email-sequence/auto-send routing and that opted-in handling is literal `subscribe === true`.

Local checks run:
- `npm run test:leads` — PASS. The no-token preview-mode API guardrail test passed for regular and final-magnet consent routing, final-magnet scoring, final tags/custom fields, download payload validation, and opt-in-only workflow/newsletter posture. Node emitted the existing non-blocking module-type warning for `src/lib/campaigns.ts`.
- `node tests/verify_lead_magnet_static_guardrails.mjs` — PASS. The static guardrail parity check passed for disclaimer gates, unchecked optional marketing consent, report request without opt-in, shared guardrail metadata, compact payload tokens, and absence of frontend workflow trigger tags.

## Findings

### 1. Legal-marketing/privacy and consent language

PASS.

The map is conservative and documentation-only. It says the map is architecture/reference only and does not authorize HighLevel live edits, workflow activation, contact mutation, tag application, send, enrollment, public publishing, or client/prospect-facing action. It repeatedly reserves attorney/privacy review for checkbox copy, educational-communications consent scope, unsubscribe/preference handling, sender/footer requirements, suppression/DND/prior-touch/conflicts checks, and workflow/email activation.

The email nurture copy remains drafted in a practical, educational tone. It does not promise legal outcomes, claim legal clearance, or imply attorney-client formation. The map should still be treated as internal draft architecture rather than exact public copy.

### 2. Non-consented users are not routed into newsletter/workflow/email follow-up

PASS.

The updated map now states that non-consented submissions may receive only the promised browser/on-page or separately reviewed transactional fulfillment value and must stay in HOLD: no newsletter segment, no workflow trigger, no nurture/email-sequence routing, no auto-send status, and no live HighLevel enrollment beyond any separately approved contact upsert.

Specific alignment points:
- Regular campaign submissions: `newsletter:ai`, campaign workflow trigger tags, and email-sequence routing are allowed only when `contact.subscribe === true`.
- Regular non-opted submissions: `newsletter:not-consented`, `consent_basis=no_email_opt_in`, `approval_status=no-auto-send`, no `workflow:*`, and empty `campaignRouting.emailSequence`.
- Final magnets: `newsletter:ai` requires literal `subscribe === true`; false/missing/non-boolean values remain non-consented.
- Final magnets: no API-provided workflow trigger tags or email-sequence routing even for opted-in submissions.

The reviewed source snippets and passing tests support these statements.

### 3. Attorney-review/manual approval gates are preserved

PASS.

The map preserves manual gates before HighLevel workflows, tag application, sends, enrollments, pipeline/opportunity automation, calendars, CRM/Supabase/Clio writes, public deployment, or client/prospect-facing activity. It correctly frames HighLevel configuration as manual/draft/review work and notes that the current `/api/leads` route only creates/updates contacts, tags, and custom fields when credentials are present; it does not create workflows, email steps, calendars, lists, opportunities, or consent policies.

The setup checklist also requires exact approval before creating draft workflows and explicitly says the map does not authorize live test contacts.

### 4. Current-code and handoff consistency

PASS.

The map now matches the May 19 consent-routing posture and resolves the May 21 digest item that said `highlevel_ai_authority_funnel_map.md` still reflected stale `newsletter:ai` static-tag risk. The implementation note accurately describes the changes and verification commands.

One non-blocking observation: QMD may need a future refresh if workers rely on QMD search rather than direct files, because the direct file is now controlling and QMD search can surface older related handoffs. This review does not require a QMD refresh as part of approval unless a downstream memory-refresh task requests it.

## Approval status

Approved only for internal/private documentation alignment.

Not approved for:
- HighLevel live edits, test contacts, contact/opportunity/tag/field/owner/pipeline-stage changes, workflow/campaign activation, sequence/newsletter enrollment, or other CRM mutation;
- email, SMS, DMs, newsletters, LinkedIn/social posts/comments/tags, YouTube publication, ads, or outreach;
- Supabase/Clio writes, source-provider restoration, prospect expansion, or Growth OS mutations;
- public/client/prospect-facing route deployment, lead-magnet launch, legal advice, confidential intake, attorney-client formation, conflicts clearance, or matter-specific conclusions;
- claims that attorney, privacy, ethics, suppression, conflicts, brand, deliverability, accessibility, source-currentness, technical, or Jeff approval has been granted for any external action.

## Required next action

Jeff/Whiteford may use `highlevel_ai_authority_funnel_map.md` as the internal HighLevel architecture reference. Before any live or external use, run separate attorney/privacy/brand/deliverability/source-current review of the exact checkbox copy, email assets, workflow guard conditions, unsubscribe/preference handling, sender/footer requirements, suppression/conflicts/prior-touch posture, and exact HighLevel implementation packet.