# Tech GC Controlled-Pilot Morning Approval Checklist — 2026-05-09

Task: `t_45965a30`
Tenant: `whiteford-mountain-west`
Status: Jeff-facing internal approval checklist only. This checklist does not approve public launch, live HighLevel/CRM mutation, workflow activation, contact enrollment, email/SMS/DM/LinkedIn/social/ad send, Supabase DDL/sync, Clio write, production credential change, or any client/prospect-facing action.

## Executive approval recommendation

Recommended morning decision: APPROVE only the Tech Company Legal Health Checklist local/no-token QA harness, using synthetic `.invalid` payloads and local browser/API evidence, while keeping all live HighLevel, CRM, Supabase, Clio, workflow, public, social, ad, and send actions held.

Why this is the safest next step: the Tech GC lead magnet is the broadest, lower-current-law-sensitivity first lane. It can prove the core funnel invariant locally: deliver narrow educational diagnostic value in the browser first; require affirmative opt-in before any report/nurture follow-up; keep non-opted users browser-only with no workflow tag, no report email, no CRM write, and no outbound follow-up.

Business-development principle applied: a lead magnet should solve one narrow problem completely enough to earn engaged time before asking for the next step. For this legal-services context, the diagnostic must remain educational, non-confidential, no-legal-advice, no-attorney-client-relationship, and attorney-review-gated.

## What Jeff can approve next

Copy/paste if approved:

```text
APPROVED: Tech GC / Tech Company Legal Health Checklist may proceed as the first internal controlled-pilot lane for local/no-token QA only.

Scope approved:
- Route: /colorado-tech-general-counsel#lead-magnet.
- Lead magnet / CTA: Tech Company Legal Health Checklist -> Tech Company OGC Launchpad.
- Use only synthetic `.invalid` emails and generic company names from the approved QA harness.
- Keep HighLevel, CRM, Supabase, Clio, send, social, ad, and production credentials absent/disabled.
- Capture evidence under docs/controlled-pilot/evidence/2026-05-09-tech-gc-local-no-token/ or a Jeff-approved dated equivalent.
- Run only local/static/no-token API and browser evidence checks.
- Default non-subscriber handling remains browser/on-page educational value only: no report email, no nurture, no workflow tag, no live CRM write, no outbound follow-up.
- Stop on any workflow tag/no-send/credential/live-mode/guardrail/copy failure.

Not approved:
- No live HighLevel contact/opportunity creation or update.
- No workflow activation, publication, Test Workflow, manual start, contact enrollment, email, SMS, DM, LinkedIn, social, ad, Clio, Supabase, production env, public publish, or external outreach action.
- No real prospects, clients, imported contacts, researched leads, or third-party contacts.
```

If not approved, use one of these instead:

```text
HOLD: Do not run Tech GC local/no-token QA yet.

Reason:
- [ ] Need attorney/privacy/brand/source-current review first.
- [ ] Need different synthetic TEST payload labels or evidence folder.
- [ ] Need tighter non-subscriber/browser-only policy first.
- [ ] Need additional negative cases or stop conditions first.
- [ ] Need HighLevel field/workflow guard path first.
- [ ] Other: ____________________________

All no-external-action boundaries remain in place.
```

```text
REQUEST REVISIONS: Revise the Tech GC local/no-token QA harness/checklist before approval.

Required revisions:
- [ ] Change commands.
- [ ] Change payload fixtures.
- [ ] Change expected outcomes.
- [ ] Change stop conditions.
- [ ] Change evidence folder/checklist.
- [ ] Change copy/legal/privacy caveats.
- [ ] Other: ____________________________

This request does not approve any QA run, live-system action, public change, CRM mutation, workflow action, or send.
```

## Pilot lane snapshot

| Field | Tech GC controlled-pilot posture |
| --- | --- |
| Audience / dream customer | Founder, CEO, COO, CFO, GC, CTO, product, ops, or finance leader at a growing Mountain West technology company approaching enterprise sales, hiring, financing, AI/data expansion, partnerships, or diligence pressure. |
| Pain | Legal work is scattered across contracts, IP ownership, hiring/contractor records, privacy/security, AI/data, corporate records, and diligence readiness; leadership does not know which cleanup priority matters first. |
| Desired outcome | A practical legal health score, category map, top cleanup priorities, and next-milestone-based 10-day starting point. |
| Lead magnet / CTA | Tech Company Legal Health Checklist -> Tech Company OGC Launchpad. Route: `/colorado-tech-general-counsel#lead-magnet`. |
| HighLevel tag posture | Source tag `leadmagnet:tech-gc-checklist`; workflow tag `workflow:tech-gc-launchpad` only after affirmative Tech GC opt-in; non-opted or omitted subscribe must have no `workflow:*` tag and no nurture sequence. |
| Email-sequence angle | 3-part educational sequence only after opt-in: immediate checklist/report fulfillment; score interpretation tied to the next milestone; top-gap education plus bounded OGC Launchpad CTA. Preview metadata is not send authorization. |
| Legal / ethics caveat | Educational readiness snapshot only; no legal advice, no attorney-client relationship, no confidential information, no compliance/enforceability/financing/transaction/patent/valuation/customer-acceptance guarantee, and no public/live use before attorney/privacy/brand review. |
| Next measurable action | Jeff approves, holds, or requests revisions to the local/no-token QA harness. If approved, a specialist can run the dated no-token evidence matrix and write the evidence packet. |

## Morning checklist

Jeff should check each item before approving the local/no-token QA run:

1. [ ] Approve Tech GC as the first internal controlled-pilot QA lane.
2. [ ] Confirm pilot mode is local/no-token internal QA only; no live HighLevel writes and no production credentials.
3. [ ] Confirm evidence folder: `docs/controlled-pilot/evidence/2026-05-09-tech-gc-local-no-token/` or named dated equivalent.
4. [ ] Confirm only synthetic `.invalid` payloads and generic company names may be used.
5. [ ] Confirm non-subscriber policy: browser/on-page educational value only; no report email, no nurture, no workflow trigger, no automatic attorney task.
6. [ ] Confirm opt-in rule: `workflow:tech-gc-launchpad`, `newsletter:ai`, and email-sequence preview metadata appear only after affirmative opt-in.
7. [ ] Confirm non-opted and subscribe-omitted cases must use `newsletter:not-consented`, `campaignRouting.triggerTag = null`, `campaignRouting.emailSequence = []`, `consent_basis = no_email_opt_in`, and `approval_status = no-auto-send`.
8. [ ] Confirm no client-supplied/forged tags may survive into server-derived routing tags.
9. [ ] Confirm disclaimer, approved guardrail version, public categorical input type, and compact Tech GC payload schema are required before a report request proceeds.
10. [ ] Confirm stop conditions: any live mode, location ID, live upsert attempt, workflow tag for non-opted user, non-empty non-opted sequence, forged tag survival, schema bypass, confidential-input invitation, or send/enrollment indication blocks the lane.
11. [ ] Confirm final attorney/legal/ethics/privacy/current-law/brand review is still required before public use, email delivery, workflow activation, or external pilot.

## Local/no-token evidence to capture after approval

Do not create or populate the evidence folder until Jeff approves the run. When approved, capture:

| Evidence area | Required proof |
| --- | --- |
| No-token posture | Commands run with `GHL_PRIVATE_INTEGRATION_TOKEN`, `GHL_LOCATION_ID`, HighLevel, Supabase, Clio, CRM, send, social, ad, and production credentials absent/disabled. |
| Static guardrails | `npm run test:lead-static` passes in no-token posture and confirms disclaimer gates, unchecked optional consent, report request without opt-in, shared guardrail metadata, compact payloads, and no frontend workflow trigger tags. |
| API consent/no-token harness | `npm run test:leads` passes in no-token preview mode; valid responses show `mode: "preview"` and no `locationId`. |
| Opted-in preview | Synthetic opted-in Tech GC payload returns preview metadata with `workflow:tech-gc-launchpad`, `leadmagnet:tech-gc-checklist`, `newsletter:ai`, consent basis `lead_magnet_email_opt_in:tech-gc`, and `approval_status = pending`; no live send or workflow activation. |
| Non-opted preview | Synthetic non-opted payload returns no workflow tag, no email sequence, `newsletter:not-consented`, `consent_basis = no_email_opt_in`, and `approval_status = no-auto-send`. |
| Subscribe omitted | Omitted `contact.subscribe` is treated as non-opted with no workflow trigger or nurture sequence. |
| Negative guards | Missing disclaimer, wrong/missing guardrail version, wrong public input type, overbroad/free-text/HTML/newline/out-of-range payload, and malicious client tags fail or strip exactly as the harness specifies. |
| Browser UI | Local screenshot evidence that browser value is visible before opt-in, non-opted users can save/print on-page results, opt-in is unchecked by default, and visible copy stays educational/no-advice/no-ACR/non-confidential. |
| Certification | A short no-token/no-external-action certification stating no live contact, opportunity, workflow, email, SMS, DM, LinkedIn, social, ad, Supabase, Clio, public, or client/prospect-facing action occurred. |

Suggested evidence root after approval:

```text
docs/controlled-pilot/evidence/2026-05-09-tech-gc-local-no-token/
  logs/test-lead-static.txt
  logs/test-leads.txt
  logs/lint.txt
  logs/build.txt
  api/opted-in-preview-response.json
  api/non-opted-preview-response.json
  api/subscribe-omitted-preview-response.json
  api/malicious-tags-preview-response.json
  api/negative-disclaimer-response.json
  api/negative-guardrail-version-response.json
  api/negative-public-input-type-response.json
  api/negative-tech-payload-schema-response.json
  ui/browser-result-before-opt-in.png
  ui/non-opted-confirmation-state.png
  ui/opted-in-preview-confirmation-state.png
  ui/disclaimer-gate-blocked-state.png
  screenshots/local-route-console-network.png
  certification/no-token-no-external-action-certification.md
```

## What remains held

These remain held even if Jeff approves local/no-token QA:

- Public or production launch of `/colorado-tech-general-counsel` as a campaign route.
- Production HighLevel credential enablement or any live HighLevel contact/opportunity/tag/task/note mutation.
- Workflow activation, Test Workflow, manual start, contact enrollment, or workflow remediation beyond separately approved scope.
- Email, report delivery, SMS, DM, LinkedIn message, social post, ad, newsletter, or external outreach.
- Supabase DDL/sync, dashboard data mutation, or reliance on expanded Supabase tables until the schema blocker is separately resolved by Jeff/authorized admin.
- Clio writes, conflicts-record mutation, client/prospect record mutation, or use of real prospects/clients/imported contacts/researched leads/third-party contacts.
- Final public copy, report copy, email copy, sender/footer/unsubscribe/privacy/terms/disclaimer URLs, route/domain/CTA/UTM, current-law, ethics, privacy, brand, deliverability, suppression, DND, unsubscribe, bounce, adverse-party, Clio/prior-touch, activation owner, monitoring, and rollback approvals.

## Decision log

| Decision | Recommendation | Rationale | Status |
| --- | --- | --- | --- |
| First controlled-pilot lane | Tech GC | Broadest relevant technology-company audience, lower current-law sensitivity than AI Compliance, clear operational-readiness problem, existing local/no-token harness. | Pending Jeff approval. |
| QA mode | Local/no-token only | Proves consent, routing, browser-value, and guardrails without credentials, live CRM writes, sends, or public action. | Pending Jeff approval. |
| Non-subscriber fulfillment | Browser/on-page-only value | Delivers promised educational value without forcing marketing consent or creating transactional-send risk. | Pending Jeff confirmation. |
| HighLevel posture | Hold live/system changes | Tags exist, but missing fields/workflow guard evidence and activation approvals still block live reliance. | Held. |
| Public/external pilot | No-go | Final legal/ethics/privacy/copy/HighLevel/Supabase/suppression/conflicts/activation gates remain open. | Not approved. |

## Source anchors

- `docs/controlled-pilot/tech_gc_local_no_token_qa_harness_plan_2026-05-09.md`
- `docs/highlevel_campaign_implementation_plan.md`
- `docs/lead_magnet_pilot_hardening_launch_gate_review_2026-05-07.md`
- `docs/pilot/controlled_lead_magnet_pilot_decision_packet_2026-05-08.md`
- Supporting current tranche context: `docs/controlled-pilot/tech_gc_saturday_morning_decision_brief_2026-05-09.md` and `docs/controlled-pilot/tech_gc_internal_readiness_tranche_review_2026-05-09.md`
- Business-development corpus query used for synthesis: `lead magnet diagnostic value opt in consent follow up professional services funnel`. Applied as original synthesis only; no book passages reproduced.

## Bottom line

Approve one thing only if comfortable: Tech GC local/no-token QA evidence capture. Everything public, live, external, CRM, HighLevel, Supabase, Clio, workflow, send, social, ad, production credential, or prospect/client-facing remains held until a later explicit approval packet.
