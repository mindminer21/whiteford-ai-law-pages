# Final-magnet attorney/privacy consent-scope decision packet — 2026-05-19

Task: `t_e83963c4`
Tenant: `whiteford-mountain-west`
Status: INTERNAL / PRIVATE DECISION PREP ONLY. This packet does not approve public launch, workflow activation, email/SMS/social send, HighLevel/CRM/Supabase/Clio mutation, public deployment, client/prospect-facing use, or legal/privacy signoff by itself.

## Executive decision needed

Jeff/Whiteford needs one attorney/privacy decision about the final-magnet consent scope before any public/live use:

Should the final-magnet browser/API path keep the current conservative checked-consent requirement for emailed report/playbook delivery and related educational follow-up, revise the checkbox/privacy language first, separately allow local/no-token product QA for non-opted browser-only value delivery, or HOLD?

Recommended default until attorney/privacy review: HOLD external/live use; allow only internal reading of this packet and already-completed local/no-token evidence.

## Evidence read for this packet

- Final-magnet consent-routing fix report: `docs/lead-magnets/2026-05-19_final_magnet_consent_routing_fix_report.md`.
- Final-magnet consent-routing review: `docs/reviews/2026-05-19_final_magnet_consent_routing_review.md`.
- Approval Command Center refresh note: `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/docs/2026-05-19_consent_routing_approval_command_center_refresh.md`.
- Approval Command Center review: `docs/reviews/2026-05-19_approval_command_center_consent_routing_review_t_98e2ff55.md`.
- Approval Command Center/QMD refresh: `docs/reports/2026-05-19-consent-routing-approval-command-center-qmd-refresh.md`.
- Final-magnet/QMD refresh: `docs/reports/2026-05-19-final-magnet-consent-routing-qmd-refresh.md`.
- Controlling opt-in strategy: `docs/lead_magnet_opt_in_and_app_strategy.md`.
- Current deliverable-index top rows: `docs/KANBAN_DELIVERABLE_INDEX.md` lines 1-52.
- Business-development corpus preflight: `100M Leads` pp.49-54 and `Lead Funnels` p.13. Synthesis only: a lead magnet should solve one narrow diagnostic problem completely, fulfill promised value before follow-up, and earn engaged time/trust before any consultation ask. In legal services, follow-up must stay explicit-opt-in, educational, non-hypey, and attorney-review-gated.

## Current implementation posture to preserve

The 2026-05-19 local consent-routing fix and review passed for internal/local/private readiness only:

- Final-magnet opt-in is literal: `subscribe === true` only.
- False, missing, string, or otherwise non-true subscribe values are non-consented.
- Non-consented final-magnet submissions receive `newsletter:not-consented`, `consent_basis=no_email_opt_in`, `approval_status=no-auto-send`, no `newsletter:ai`, no `workflow:*` tag, no email-sequence routing, and no auto-send status.
- Opted-in final-magnet submissions may receive the lane/magnet tag, `newsletter:ai`, and `consent_basis=lead_magnet_email_opt_in:<magnet_slug>`.
- Even opted-in final-magnet submissions do not receive final-magnet workflow trigger tags or email-sequence routing from the final-magnet API branch.
- The browser UI currently requires the permission checkbox before assessment/download submission. That is conservative, but it means the checkbox copy must be attorney/privacy-approved before public use because it combines requested report/playbook delivery with “related educational communications.”

## Consent-scope separation

### A. Non-opted browser-only value

Possible future product lane, not currently approved for public use.

A non-opted browser user could receive educational value inside the browser without being subscribed to email follow-up, if Jeff/Whiteford separately approves product/privacy copy and QA. This lane should:

- Provide only on-page or browser-generated educational diagnostic output.
- Avoid collecting unnecessary confidential, sensitive, adverse-party, matter-specific, or client-identifying details.
- Avoid email delivery, newsletter routing, workflow tags, email sequences, HighLevel auto-send, owner assignment, pipeline movement, or outreach.
- If any record is captured locally/no-token or eventually in HighLevel after a separate exact approval, mark it as non-consented: `newsletter:not-consented`, `consent_basis=no_email_opt_in`, and `approval_status=no-auto-send`.
- Preserve legal disclaimers: educational information only; no legal advice; no attorney-client relationship; no confidential information; no guarantees; no conflicts clearance.

### B. Opted-in report/email follow-up

Possible attorney/privacy-reviewed consent lane, not workflow activation.

An opted-in final-magnet user may receive the requested report/playbook and later educational follow-up only if the opt-in is:

- Unchecked by default.
- Affirmative and explicit.
- Lane-specific and final-magnet-specific.
- Versioned in copy and records, e.g. `consent_scope_version=final_magnet_email_education_v2026-05-19` or the attorney-approved replacement version.
- Separate from any workflow activation decision.
- Paired with privacy-policy, unsubscribe/preference, footer/sender, suppression/DND, conflicts, prior-touch, and Clio/client-intake gates before any external use.

Suggested attorney-review copy direction, not approved final copy:

> I agree that Whiteford/Schell IP may email me the requested report or playbook and related educational information about this topic. I understand this does not create an attorney-client relationship and I should not submit confidential information through this tool.

Attorney/privacy should decide whether this combined delivery + related educational information language is sufficient, whether separate checkboxes are needed, and whether final-magnet-specific privacy/cookie/tracking disclosures are required.

## Legal, ethics, and privacy caveats required on any approved path

Any future public/client/prospect-facing final-magnet path must preserve these caveats before use:

- Educational information only; not legal advice.
- No attorney-client relationship is formed by using the tool, viewing a result, downloading a report, or submitting a form.
- Do not submit confidential information, adverse-party names, sensitive employment/financial details, private transaction counterparties, exact claim charts, unpublished invention details, or other matter-specific facts through the public tool.
- No guarantee of compliance, patentability, freedom to operate, risk elimination, deal outcome, valuation impact, funding outcome, or legal result.
- Any attorney consultation or legal engagement remains subject to conflicts review, engagement terms, and attorney approval.
- External follow-up requires suppression/DND/unsubscribe checks, prior-touch checks, conflicts/client-status checks, and Clio/intake gates before use.
- Email follow-up requires truthful sender/subject, physical mailing address/footer, working unsubscribe/preference handling, privacy-policy alignment, deliverability review, and attorney advertising/legal-marketing review.
- SMS remains off unless separately approved with documented SMS consent and opt-out language.
- HighLevel/CRM records and workflows may not be treated as conflicts-cleared, engagement-approved, or attorney-client records.

## Copy/paste decision boxes

### Option 1 — HOLD

```text
DECISION: HOLD final-magnet consent-scope changes and all external/live use.

I do not approve public launch, workflow activation, email follow-up, HighLevel/CRM/Supabase/Clio mutation, public deployment, or client/prospect-facing use of the final-magnet consent path at this time.

Approved internal next action: keep the current local/private evidence as decision prep only and route the final-magnet checkbox/privacy language for attorney/privacy review before any external use.

Reason / required revision before reconsideration: [insert].
```

### Option 2 — Approve checkbox/privacy language revision only

```text
DECISION: APPROVE internal drafting of revised final-magnet checkbox/privacy language only.

Scope approved: prepare attorney/privacy-reviewed copy for an unchecked, affirmative, lane-specific, versioned final-magnet opt-in that distinguishes requested report/playbook delivery and related educational follow-up. The work must include no-legal-advice, no attorney-client relationship, no confidential information, no guarantees, unsubscribe/preference, privacy-policy, suppression/DND, conflicts, prior-touch, and Clio/intake caveats.

Not approved: public launch, deployment, email/SMS/social send, workflow activation/enrollment, HighLevel/CRM/Supabase/Clio mutation, live API test, tag application to live records, ads, LinkedIn action, source/prospect work, or client/prospect-facing use.

Exact internal next action: create a copy/privacy redline packet for attorney review, using consent scope version `[insert version, e.g. final_magnet_email_education_v2026-05-19-draft1]`.
```

### Option 3 — Approve local/no-token product QA only for non-opted browser value

```text
DECISION: APPROVE local/no-token product QA only for non-opted browser-only value delivery.

Scope approved: design and locally QA a final-magnet product path where a non-opted browser user can receive useful on-page or browser-only educational diagnostic value without email follow-up, newsletter subscription, workflow tags, email sequences, auto-send status, or live-system mutation. Non-opted records, if represented in preview/local payloads, must remain `newsletter:not-consented`, `consent_basis=no_email_opt_in`, and `approval_status=no-auto-send`.

Not approved: public launch, deployment, email delivery, report email, workflow activation/enrollment, HighLevel/CRM/Supabase/Clio mutation, production credential use, external send, social/LinkedIn/ad action, source/prospect work, or client/prospect-facing use.

Exact internal next action: create a product/privacy QA task for browser-only value delivery, local preview/no-token tests, and attorney/privacy caveat review before any external use.
```

### Option 4 — Request revisions

```text
DECISION: REQUEST REVISIONS to the final-magnet consent-scope packet.

Revise before approval:
1. [insert requested change]
2. [insert requested change]
3. [insert requested change]

Until revisions are reviewed, HOLD all public/live HighLevel, workflow, email, CRM, Supabase, Clio, social/LinkedIn/ad, deployment, source/prospect, and client/prospect-facing action.

Approved internal next action: update the private decision packet/redline only; do not mutate live systems or publish.
```

## Exact next internal action

Jeff/Whiteford should choose exactly one next internal lane:

1. HOLD all final-magnet consent/public-use work.
2. Route checkbox/privacy language to attorney/privacy review and redline only.
3. Create a separate product/privacy QA task for non-opted browser-only value delivery in local/no-token mode only.
4. Request revisions to this decision packet before any downstream work.

If Option 2 or Option 3 is chosen, the next worker should create a private/internal redline or QA specification only. That downstream task must not activate workflows, enroll contacts, call HighLevel, mutate CRM/Supabase/Clio, deploy/publicly expose routes, send email/SMS/social, or approve attorney/legal/privacy scope.

## Forbidden live/external actions

This packet does not authorize any of the following:

- Public/client/prospect-facing launch, route deployment, public hosting, or publication.
- HighLevel/CRM contact, opportunity, note, tag, field, task, workflow, campaign, newsletter, template, test-send, enrollment, or API/UI mutation.
- Supabase DDL, row mutation, sync, backfill, source-provider restoration, or production data write.
- Clio write, conflicts clearance, engagement creation, matter creation, or intake status change.
- Email, SMS, DM, newsletter, LinkedIn/social/YouTube/ad send, publish, schedule, tag, comment, connect, or outreach.
- Workflow activation, dry-run against live records, automation enrollment, owner assignment, pipeline movement, stale-opportunity logic, or report fulfillment email.
- Treating `newsletter:ai` on opted-in final-magnet records as approval for workflow enrollment or email sequence routing.
- Collecting or processing confidential/sensitive matter facts through a public tool without separate attorney/privacy approval.

## Durable blockers still live

- Supabase expanded-schema / phase 6-11 DDL gate remains blocked under `t_fa6eb9c1`.
- HighLevel Agent Targeting access/token/location gate remains blocked under `t_7884ab57` and recent evidence includes HTTP 403 Cloudflare Error 1010.
- Gated mirror/backfill tasks remain blocked behind the Supabase schema gate and require separate exact approval after schema verification.

## Recommended default decision

For attorney/privacy safety, choose either HOLD or Option 2 first. Option 3 is reasonable only as local/no-token product QA and should remain separate from email-consent approval. No option in this packet authorizes live/external action.
