# HighLevel Safe Consent-Gate Remediation Packet - 2026-05-09

Task: `t_7ae67ada`
Tenant: `whiteford-mountain-west`
Location: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`)
Pipeline context: Whiteford Schell IP Pipeline (`Tbx4tA6wHv5lTwZPSHyZ`)
Status: documentation and approval packet only. This worker performed local file drafting only; no HighLevel browser action, API write, CRM mutation, workflow save, workflow activation, workflow test, contact enrollment, email/SMS/social action, Clio/Supabase write, or public action was performed.

## Critical authorization boundary

This packet is not approval to edit HighLevel. It is an operator-safe remediation plan after the previous browser pass found that HighLevel's tag condition UI can become unsafe when multiple absent tags are entered in one segment or when overlapping dropdowns accidentally select `Tags Is empty`.

No operator may save a workflow condition unless every condition row is visibly correct and every workflow remains Draft/Off. If any operator semantics are ambiguous, if the UI exposes only an unsafe multi-select negative condition, or if a dropdown selects `Is empty`, `Is not empty`, `Includes`, or any other value not listed below, stop and cancel/discard the panel without saving.

Forbidden actions remain: Publish/Activate, Test Workflow, manual start, contact enrollment, contact creation, contact/opportunity/tag/task/note mutation, email/SMS/DM/LinkedIn/social/ad/campaign sends, webhook/test sends, public-page changes, Clio writes, Supabase writes, or any external/prospect-facing action.

Business-development posture applied from the private corpus and Whiteford docs: the lead magnets should fulfill narrow educational value first, and follow-up nurture must be opt-in-only, consent-evidenced, and attorney-review-gated. The consent gate below protects that posture; it is not a launch step.

## Source artifacts used

- `docs/highlevel_manual_consent_gate_fields_t_b2909eb8.md`
- `docs/highlevel_consent_gate_revision_report_t_4d85252e.md`
- `docs/lead_magnet_opt_in_and_app_strategy.md`
- `docs/highlevel_campaign_implementation_plan.md`
- Business-development RAG search: lead magnets should fulfill the promised narrow value before nurture and follow-up.
- QMD local search: checked project memory for consent-gate references; source docs above are the controlling project evidence.

## Current baseline

Existing draft consent-gate action pattern:

- Action name: `Consent Gate — lead magnet email opt-in required before nurture`.
- Eligible branch label: `Opted in / eligible for future approved email path`.
- Blocked/none branch label: `Not opted in / suppressed / internal review only`.
- Existing saved safe condition from prior passes: `Tags Includes newsletter:ai`.
- Known unsafe UI behavior: do not put `newsletter:not-consented`, `outreach:do-not-send`, and `ops:no-auto-send` into one `Tags Does not include` multi-select segment because observed UI copy says the segment is true if any selected tag is not added, which does not prove all selected suppression tags are absent.
- Known unsafe editing failure: a prior multi-segment attempt left overlapping dropdowns open and temporarily selected `Tags Is empty`; the browser operator canceled without saving.

## Workflows in scope

| Lane | Workflow name | Workflow URL | Builder posture | Trigger to preserve |
| --- | --- | --- | --- | --- |
| Tech GC Launchpad | `WF | Intake | Whiteford | Tech GC Launchpad | Draft` | `https://app.gohighlevel.com/location/tm68WWMrcAa3TqQbEAMa/workflow/dee4450a-1b7b-4597-9fa4-9c7b7423b848` | Standard Builder; safest candidate for first remediation pass. | `workflow:tech-gc-launchpad` |
| AI Compliance Gameplan | `WF | Intake | Whiteford | AI Compliance Gameplan | Draft` | `https://app.gohighlevel.com/location/tm68WWMrcAa3TqQbEAMa/workflow/682ada5f-fa1e-4411-97d6-a1e019139614` | Standard Builder; remediate only after Tech GC sequence is proven safe. | `workflow:ai-compliance-readiness` |
| Founder M&A Readiness | `WF | Intake | Whiteford | Founder M&A Readiness | Draft` | `https://app.gohighlevel.com/location/tm68WWMrcAa3TqQbEAMa/workflow/4be5ea96-b497-4149-be72-f38aa136da35` | Standard Builder; remediate only after Tech GC sequence is proven safe. | `workflow:ma-readiness` |
| AI Patent Strategy Scorecard | `WF | Intake | Whiteford | AI Patent Strategy Scorecard | Draft` | `https://app.gohighlevel.com/location/tm68WWMrcAa3TqQbEAMa/workflow/8dbff7fd-caa0-49b3-ba16-bd46b4a1f1d7/advanced-canvas` | Advanced Builder; no structural edit unless a separate advanced-canvas-safe path is approved. | `workflow:ai-patent-strategy` |

## Exact consent-gate condition target

The eligible branch must be all-AND. Each absent tag gets its own condition segment. Do not combine absent tags in one multi-select condition.

| # | Condition purpose | Object/field shown in UI | Operator to use | Exact value | Required logic | Safe default if unavailable |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | affirmative newsletter opt-in | Contact `Tags` | `Includes` | `newsletter:ai` | AND | Already present; if missing, stop and document. |
| 2 | explicit non-consent suppression absent | Contact `Tags` | `Does not include` | `newsletter:not-consented` | AND, one segment only | If `Does not include` cannot be verified for one value, stop. |
| 3 | outreach do-not-send suppression absent | Contact `Tags` | `Does not include` | `outreach:do-not-send` | AND, one segment only | If the tag is not selectable or semantics ambiguous, stop. |
| 4 | operational no-auto-send suppression absent | Contact `Tags` | `Does not include` | `ops:no-auto-send` | AND, one segment only | If the tag is not selectable or semantics ambiguous, stop. |
| 5 | opt-in source evidence | Contact custom field `Consent Basis` / `contact.consent_basis` | `Starts with` if present; otherwise exact safest equivalent after screenshot confirmation | `lead_magnet_email_opt_in:` | AND | If prefix/equivalent operator is unavailable, do not save; use dummy sandbox or hold for manual review. |
| 6 | DND safe state | Contact DND/email DND field if exposed with unambiguous email DND semantics | `Is false`, `Is not true`, or exact HighLevel-safe equivalent only after screenshot confirmation | false/not present | AND | If DND semantics are not clear, do not save; document as remaining blocker. |
| 7 | unsubscribe/suppression/bounce safe state | HighLevel email unsubscribe/suppression/bounce field(s), only if exposed with unambiguous semantics | `Is false`, `Is not true`, or exact HighLevel-safe equivalent only after screenshot confirmation | false/not present | AND | If semantics are not clear, do not save; document as remaining blocker. |
| 8 | internal approval state allowed | Contact custom field `Approval Status` / `contact.approval_status` | Prefer positive allowed-state operator such as `Equals` | `pending` or another Jeff-approved eligible value | AND | Do not build a long negative list unless Jeff approves exact statuses and UI operators. Blank/unknown/no-auto-send/suppressed/revise/rejected means blocked/no-send. |
| 9 | future external-send approval preserved | No workflow trigger/action condition in this pass | N/A | `approval:external-send-approved` | Keep separate future gate only | Do not add this tag to intake/nurture triggers or use it to imply current send approval. |

## Safe remediation path A - one-row-at-a-time manual field-entry sequence

Use this only after Jeff approves an operator to perform draft/off UI remediation. It is safest for the three Standard Builder workflows, starting with Tech GC only.

1. Open the workflow URL directly in the Whiteford Schell IP location.
2. Before editing, capture evidence that the header shows the workflow name and `Draft`/Off status. Also capture that `Publish` exists but is not clicked.
3. Open the existing `Consent Gate — lead magnet email opt-in required before nurture` If/Else action.
4. Confirm the existing eligible branch row is `Tags Includes newsletter:ai`.
5. Add exactly one new segment/row.
6. In that row only, choose Contact field `Tags`.
7. Choose operator `Does not include`.
8. Search/select exactly one tag value: `newsletter:not-consented`.
9. Click outside/close dropdowns until the row text visibly reads exactly `Tags Does not include newsletter:not-consented` and no extra tag is selected.
10. Capture screenshot/DOM evidence of the row.
11. Repeat steps 5-10 for exactly one value per row:
    - `Tags Does not include outreach:do-not-send`.
    - `Tags Does not include ops:no-auto-send`.
12. Add `Consent Basis` only if the field picker and operator list visibly expose an unambiguous prefix operator. Target row: `Consent Basis Starts with lead_magnet_email_opt_in:`. Capture the field name, operator, and value.
13. Add DND/unsubscribe/suppression/bounce rows only if the field names and operators visibly and unambiguously map to email no-send state. Capture evidence before save.
14. Add `Approval Status` only as a positive allowed-state row after Jeff confirms the eligible value. Default recommendation: `Approval Status Equals pending`. Capture evidence before save.
15. Before clicking any save button, read every row aloud or copy the DOM text into the evidence log. Required visible rows are the target condition table above. If any row says `Tags Is empty`, multi-selects multiple absent tags in one row, uses OR logic, or shows an unknown operator, click Cancel/Discard instead of Save.
16. Save only if all rows are visibly correct, all conditions are AND, and the workflow remains Draft/Off.
17. After save, reopen the consent-gate action and re-capture the saved condition text. Verify the saved state matches the pre-save evidence.
18. Repeat for AI Compliance and Founder M&A only after the Tech GC pass produced clean evidence.
19. Do not structurally edit the AI Patent Advanced Builder in this sequence. It needs a separate advanced-canvas-safe packet or dummy workflow proving the path.

## Safe remediation path B - dummy-workflow sandbox procedure

Use this if the operator needs to prove HighLevel UI semantics before touching the existing draft intake workflows. This still requires Jeff approval because it creates/edits a HighLevel workflow, even if draft/off.

Sandbox approval scope should be narrow:

```text
I approve creation of one temporary Draft/Off HighLevel workflow in Whiteford Schell IP named `SANDBOX - consent gate condition semantics - do not activate`, with no triggers, no sends, no enrollments, no contacts, and no external actions, solely to verify whether one `Tags Does not include <single tag>` condition per row is represented as all-AND and whether HighLevel preserves each row after save. This approval does not authorize editing live intake workflows, publishing, testing, enrolling, sending, contact/opportunity mutation, or adding any trigger/action other than an inert If/Else condition block for UI evidence.
```

Sandbox steps:

1. Create or open a dummy workflow named exactly `SANDBOX - consent gate condition semantics - do not activate`.
2. Ensure it is Draft/Off and has no trigger, no sends, no webhooks, no wait/email/SMS/social actions, and no enrollment path.
3. Add one inert If/Else action named `SANDBOX - absent tag condition semantics`.
4. Add rows one at a time:
   - `Tags Includes newsletter:ai`.
   - `Tags Does not include newsletter:not-consented`.
   - `Tags Does not include outreach:do-not-send`.
   - `Tags Does not include ops:no-auto-send`.
5. Save only if all rows are visibly AND and one tag per absent row.
6. Reopen the sandbox block and capture saved evidence.
7. If HighLevel rewrites the conditions, combines values, changes operators, converts AND to OR, or shows the observed `any selected tag is not added` semantics for multi-select rows, do not edit the real workflows.
8. Leave the sandbox Draft/Off and inert, or delete it only if Jeff explicitly approves deletion. Do not run/test it.

## Screenshot / evidence checklist

Capture and store evidence for each workflow or sandbox pass before any save and after any save.

Minimum evidence:

- Browser location bar or UI breadcrumb showing Whiteford Schell IP location (`tm68WWMrcAa3TqQbEAMa`).
- Workflow name and ID/URL.
- Header/status showing `Draft`/Off.
- Visible `Publish` button not clicked.
- No `Test Workflow` execution.
- Trigger row unchanged and narrow (`workflow:*` tag for the lane).
- Existing consent-gate action name and branch labels.
- Full condition panel before edit.
- Each newly added row after dropdowns are closed.
- Final full condition panel immediately before save.
- Saved/reopened condition panel after save, if and only if save was authorized and safe.
- Evidence that no email/SMS/social/webhook/action nodes were added.
- If using sandbox: evidence that it has no trigger and remains Draft/Off.

Suggested evidence log fields:

| Field | Required value |
| --- | --- |
| `operator_profile` | `highlevel-browser-operator` or authorized human |
| `timestamp_local` | local timestamp |
| `workflow_id` | exact HighLevel workflow ID |
| `workflow_status` | `Draft`/Off |
| `pre_save_rows` | copied visible text of all condition rows |
| `post_save_rows` | copied visible text after reopening, or `not saved` |
| `unsafe_ui_observed` | yes/no plus description |
| `save_performed` | yes/no |
| `forbidden_actions_performed` | must be `none` |

## Draft/Off verification procedure

Before editing each workflow:

1. Load the workflow URL.
2. Verify the workflow header shows `Draft`/Off.
3. Verify `Publish` is available but untouched.
4. Verify no workflow test modal is open and no `Test Workflow` action is clicked.
5. Verify the browser is in the Whiteford Schell IP location (`tm68WWMrcAa3TqQbEAMa`).

After any save:

1. Return to the workflow list or reload the workflow URL.
2. Confirm the workflow still displays `Draft`/Off.
3. Reopen the consent gate and confirm the saved condition rows exactly match the target table.
4. Confirm no email/SMS/social/webhook/test/enrollment action was added or executed.
5. Record the evidence path in the operator handoff.

If API read-only verification is available to the operator, it may be used only for read-only workflow status/listing. Do not use private workflow-edit endpoints unless Jeff separately accepts that risk in writing.

## Stop / rollback plan

Immediate stop conditions:

- UI exposes only a multi-select `Tags Does not include` condition for absent tags.
- UI text says the negative tag condition is true when any selected tag is not added.
- A row changes to `Tags Is empty`, `Tags Is not empty`, `Tags Includes`, OR logic, or an unknown operator unexpectedly.
- Dropdowns overlap or the selected row cannot be confidently identified.
- Field picker cannot distinguish Contact tags/custom fields from other objects.
- `Consent Basis`, DND, unsubscribe, suppression, bounce, or `Approval Status` operators are ambiguous.
- Workflow status is not Draft/Off.
- The UI prompts for publish/activate/test/enroll/run.
- The operator cannot capture evidence.

Rollback if unsaved:

1. Click Cancel/Discard/Back without saving.
2. Reload the workflow URL.
3. Reopen the consent gate.
4. Confirm prior saved safe state remains unchanged.
5. Document `save_performed=false`, unsafe behavior observed, and exact screenshot/DOM evidence.

Rollback if an unsafe draft save accidentally occurred:

1. Do not publish, test, enroll, or run the workflow.
2. Immediately keep the workflow Draft/Off.
3. Capture evidence of the unsafe saved condition.
4. If the prior safe condition set is obvious and the UI is stable, revert only to the last known safe saved state: `Tags Includes newsletter:ai` with the approved branch labels. Save only if this revert is unambiguous and the workflow remains Draft/Off.
5. If revert is not unambiguous, stop and block for Jeff/browser-operator review. Do not attempt repeated edits.
6. Leave a Kanban comment with workflow ID, exact unsafe condition, whether a save occurred, and required human decision.

## Jeff approval options

Jeff should choose one option. No operator should treat this packet as approval by itself.

- [ ] HOLD - do not edit HighLevel; preserve current Draft/Off gates and use this packet for review only.
- [ ] APPROVE SANDBOX ONLY - authorize the dummy workflow procedure above, with no edits to the real intake workflows.
- [ ] APPROVE TECH GC ONLY - authorize manual one-row-at-a-time remediation on `dee4450a-1b7b-4597-9fa4-9c7b7423b848` only, using the exact safe sequence above.
- [ ] APPROVE THREE STANDARD BUILDER WORKFLOWS - authorize Tech GC first, then AI Compliance and Founder M&A only if Tech GC evidence is clean.
- [ ] REQUEST REVISIONS - change operators, allowed approval status, DND/suppression handling, or evidence requirements before any HighLevel action.

Exact approval language for the safest first pass:

```text
I approve a draft/off-only HighLevel UI remediation pass in the Whiteford Schell IP location (tm68WWMrcAa3TqQbEAMa) for the Tech GC Launchpad workflow only (`dee4450a-1b7b-4597-9fa4-9c7b7423b848`), using docs/highlevel_safe_consent_gate_remediation_packet_2026-05-09.md. The operator may add only one absent-tag condition per row for `newsletter:not-consented`, `outreach:do-not-send`, and `ops:no-auto-send`, may add `Consent Basis Starts with lead_magnet_email_opt_in:` only if the operator/value are unambiguous, may add DND/unsubscribe/suppression/bounce and Approval Status rows only if the exact field/operator/value are unambiguous, and must keep the workflow Draft/Off. This approval does not authorize publish, activation, Test Workflow, manual start, contact enrollment, contact/opportunity/tag/task/note mutation, email/SMS/DM/LinkedIn/social/ad/campaign action, webhook run, public page change, Clio write, Supabase write, or edits to other workflows. If any UI semantics are ambiguous or unsafe, the operator must cancel/discard without saving and document evidence.
```

## Recommended next action

Default recommendation: approve `SANDBOX ONLY` first if Jeff wants HighLevel evidence, or hold HighLevel edits until a human operator can execute the Tech GC-only sequence with screenshots. Do not attempt AI Patent Advanced Builder structural edits in the next pass.
