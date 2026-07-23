# HighLevel Workflow + Email Best-Practices Synthesis

Generated: 2026-05-06
Location: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`)
Mode: draft/off, attorney-review-ready only.

## 1. Sources synthesized

- Private business-development corpus search:
  - `Lead Funnels` principles: a lead funnel should immediately fulfill the promised asset, build trust, and then route the lead to the next relevant step.
  - `100M Leads` principles: a lead magnet should solve a narrow problem, reveal who is interested, and increase engagement before asking for a paid consult.
  - `Traffic Secrets` principles: authority nurture should assume serious buyers will verify credibility across content, social proof, and educational material before contacting counsel.
  - `DotCom Secrets`/high-ticket service principles: for high-value services, use the email sequence to educate and qualify; the sales conversation should be a bounded, human-led consult, not an automated pressure sequence.
- Project docs reviewed:
  - `docs/highlevel_email_campaign_asset_apply_manifest.md`
  - `docs/highlevel_draft_off_workflow_implementation_packets.md`
  - `docs/highlevel_workflow_wiring_status.md`
  - `docs/KANBAN_DELIVERABLE_INDEX.md`
- HighLevel inventory generated in `docs/highlevel_overnight_inventory.json`.
- Legal/attorney advertising safety principles supplied in the overnight work prompt.

## 2. Core operating standard

HighLevel should act as an intake, triage, review, and documentation system until Jeff approves activation. For Whiteford/Schell IP legal-services campaigns, the safest default is:

1. Trigger only from first-party lead capture where the visitor affirmatively opted into the matching lead-magnet email path, or from an explicit workflow tag that was applied after that opt-in was recorded.
2. Add lane/safety tags and source metadata.
3. Check suppression/DND/consent status before any external message step.
4. Create an internal attorney-review task before any email/SMS can be enabled.
5. Keep fulfillment and nurture emails in draft/off assets until attorney review, sender/footer review, unsubscribe handling, and workflow QA are complete.
6. Create or update opportunities only after duplicate-opportunity checks and human approval, unless Jeff separately approves a live CRM mutation script.
7. Never imply legal advice, legal conclusions, guaranteed outcomes, patentability, compliance certification, deal certainty, or attorney-client relationship formation from an automated workflow.

## 3. Required global workflow safeguards

Use these defaults on all offer-lane workflows:

- Status: `draft` / off.
- Re-entry: off unless the workflow is a purely internal hygiene workflow.
- Stop on response: on for any workflow that may later contain external messages.
- Exit on: unsubscribe, DND/suppression, tag `outreach:do-not-send`, Approval Status in `suppressed`, `no-auto-send`, or `revise`, reply, booking, or human stage movement out of the intake/review path.
- Before external email/SMS: require `newsletter:ai`, no `newsletter:not-consented`, `Consent Basis` beginning with `lead_magnet_email_opt_in:`, no DND, no suppression tag, and attorney-reviewed copy version.
- Internal task first: every lane creates a Jeff/attorney review task containing source route, offer lane, consent basis, score/checklist answers, proposed next action, and disclaimers.
- Pipeline: use `Whiteford Schell IP Pipeline` (`Tbx4tA6wHv5lTwZPSHyZ`) and never create duplicates without `Find Opportunity`/manual duplicate review.

## 4. Existing HighLevel inventory implications

The current location already has supporting draft workflows that can be adapted after manual UI review:

- `1. New Lead Nurture (Fast 5) - Claim Offer` — draft, 0 active/total enrolled in UI.
- `2. Appointment Confirmation + Reminders` — draft, 0 active/total enrolled in UI.
- `3. Appt No Show` — draft, 0 active/total enrolled in UI.
- `5. Long-Term Nurture` — draft, 0 active/total enrolled in UI.
- `6. Stale Leads` — draft, 0 active/total enrolled in UI.
- `AI Patent Strategy Campaign` — draft; public API id `424fd134-b34b-494f-a337-2aba0dec3060`.

Do not activate these until the exact triggers, steps, sender settings, stop conditions, and attorney-review gates are checked in the UI.

## 5. Offer-lane workflow pattern

For each of the four lanes:

1. Trigger:
   - form submitted from the matching route only when the form/app applied the lane workflow tag after opt-in, and/or
   - explicit lane tag added after documented lead-magnet opt-in.
2. Filters:
   - location = `tm68WWMrcAa3TqQbEAMa`;
   - source page contains the lane route;
   - `newsletter:ai` present;
   - no `newsletter:not-consented`;
   - `Consent Basis` starts with `lead_magnet_email_opt_in:`;
   - no `outreach:do-not-send` tag;
   - DND is false where available;
   - Approval Status is not suppressed/no-auto-send/revise.
3. Initial actions:
   - add `brand:whiteford-schellip`, `workflow:draft-only`, `workflow:manual-start`, `ops:approval-required`, `ops:no-auto-send`, and lane tag only after opt-in evidence exists;
   - set Suggested Offer Lane and Pipeline Next Action;
   - capture Consent Basis and Source Page/Channel.
4. Opportunity interaction:
   - find existing opportunity in `Whiteford Schell IP Pipeline`;
   - if no opportunity, create a review task recommending a new opportunity title and stage;
   - do not auto-create/update live opportunities unless Jeff approves that mutation.
5. Review task:
   - assign to Jeff/attorney-review queue;
   - include facts, source route, score/checklist responses, consent basis, and proposed next action.
6. External messages:
   - use existing draft email campaign assets only after approval;
   - SMS copy remains in packet form and should not be enabled until SMS consent/10DLC/compliance review is complete.

## 6. Email copy rules

- Fulfill the promised lead magnet first; do not immediately pressure for a consult.
- Use educational framing: “issues to review,” “questions to document,” “risk areas to map.”
- Keep CTAs bounded: strategy sprint, readiness review, gameplan review, or checklist review.
- Avoid guarantees and superlatives: no “protect everything,” “be compliant,” “increase valuation,” “avoid liability,” or “ensure patentability.”
- Add non-advice/non-engagement language.
- Make opt-out/preference handling clear before activation.
- Space emails with waits: Day 0 fulfillment, Day 2 education, Day 5 risk map, Day 9 bounded CTA, Day 16 educational close-loop for longer sequences.

## 7. SMS rules

SMS should remain disabled unless Jeff confirms consent, 10DLC posture, sender number, and opt-out language. If later enabled, use SMS only for appointment logistics or requested reminders; avoid substantive legal analysis by SMS. Every SMS should be short, consent-based, and include clear STOP handling where required.

## 8. Manual activation checklist

Before any workflow is turned on:

- Confirm workflow is in the correct folder and named `WF | ... | Draft` until final approval.
- Confirm trigger filters are narrow and route/tag-specific.
- Confirm no workflow trigger tag is applied to non-consented/imported/researched leads.
- Confirm `newsletter:not-consented` contacts do not enter nurture sequences.
- Confirm suppression exits appear before external actions.
- Confirm attorney-review task is before any email/SMS send step.
- Confirm sender/from address, physical footer, unsubscribe/preference links, and time-window settings.
- Confirm all external message steps are disabled until Jeff gives explicit approval.
- Run with one test contact only after Jeff approves test enrollment.
- Confirm active/total enrolled counts are zero before activation.

## 9. Private/internal endpoint boundary

The public API verified workflow inventory, pipelines, tags, custom fields, forms, calendars, and email asset existence. It does not provide a documented safe public endpoint for building workflow graph logic. HighLevel’s UI likely uses private/internal workflow endpoints. Those should not be used for workflow creation/editing unless Jeff explicitly accepts the account/support risk for draft/off mutations. This overnight run did not use private workflow-edit endpoints.
