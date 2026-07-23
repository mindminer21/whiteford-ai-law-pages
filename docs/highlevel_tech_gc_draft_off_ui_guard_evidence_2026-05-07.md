# HighLevel Tech GC Draft/Off UI Guard Evidence

Task: `t_b6bb5a5f`
Date: 2026-05-07
Tenant: `whiteford-mountain-west`
Location inspected: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`)
Workflow inspected only: `WF | Intake | Whiteford | Tech GC Launchpad | Draft`
Workflow ID: `dee4450a-1b7b-4597-9fa4-9c7b7423b848`
Mode: read-only browser/CDP inspection. No workflow publish, activation, save, contact enrollment, send, test execution, field creation, contact/opportunity mutation, social action, ad action, Clio write, or public/client-facing change was performed.

## Executive verdict

HighLevel browser evidence confirms the selected Tech GC workflow was accessible in Jeff's dedicated Hermes-controlled Chrome session and visibly remained in `Draft` status during inspection.

The visible trigger posture is lane-specific: `Contact Tag Added - workflow:tech-gc-launchpad`, with the filter `Tag Added includes "workflow:tech-gc-launchpad"`.

The visible guard posture is partially present but not activation-ready. The canvas and selected panels show a safety/review note, a consent-gate action, an `If / Else` branch requiring `newsletter:ai`, and a none branch labeled `Not opted in / suppressed /...` that ends. The safety note also explicitly calls out DND/unsubscribe/suppression, consent basis, approval status, `outreach:do-not-send`, `approval:external-send-approved`, draft/off-only restrictions, no enrollment, no email/SMS enablement, and placeholder-only future email assets. However, the visible branch condition itself only proves a `newsletter:ai` tag check; it does not prove separate executable UI conditions for DND, unsubscribe, suppression, approval status, consent-basis prefix, disclaimer/version, `ops:no-auto-send`, conflicts/adverse-party hold, or `approval:external-send-approved` before any future message step.

Launch-gate status: keep blocked for activation/external outreach. This pass closes the narrow Draft/Off + selected Tech GC UI evidence gap, but not the full HighLevel guardrail gate.

## Evidence files

All evidence is stored under:

`/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel-evidence/`

| Evidence | Absolute path | What it captures |
| --- | --- | --- |
| Workflow overview screenshot | `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel-evidence/tech_gc_workflow_overview_draft_off_2026-05-07.png` | Header/canvas evidence with workflow name, builder UI, Draft status, and Publish button visible. |
| Workflow overview DOM | `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel-evidence/tech_gc_workflow_dom_overview_2026-05-07.json` | DOM text including workflow URL, name, `Draft`, and builder controls. |
| Trigger panel screenshot | `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel-evidence/tech_gc_trigger_panel_2026-05-07.png` | Selected trigger panel state. |
| Trigger panel DOM | `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel-evidence/tech_gc_trigger_panel_dom_2026-05-07.json` | DOM text proving `Contact Tag`, `Tag Added`, and `workflow:tech-gc-launchpad` filter. |
| Branch condition screenshot | `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel-evidence/tech_gc_branch_condition_panel_2026-05-07.png` | Selected If/Else branch condition panel. |
| Branch condition DOM | `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel-evidence/tech_gc_branch_condition_panel_dom_2026-05-07.json` | DOM text proving condition `Includes newsletter:ai` and none branch `When no condition is met`. |
| Safety note screenshot | `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel-evidence/tech_gc_safety_note_panel_2026-05-07.png` | Selected safety/review note panel. |
| Safety note DOM | `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel-evidence/tech_gc_safety_note_panel_dom_2026-05-07.json` | DOM text containing draft/off-only restrictions, guard checklist language, future email placeholder warning, opportunity-handling restrictions, and legal/ethics guardrail language. |

Additional intermediate captures were also created:

- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel-evidence/tech_gc_branch_panel_2026-05-07.png`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel-evidence/tech_gc_branch_panel_dom_2026-05-07.json`

## Browser/session notes

- CDP target inspected: `https://app.gohighlevel.com/location/tm68WWMrcAa3TqQbEAMa/workflow/dee4450a-1b7b-4597-9fa4-9c7b7423b848`.
- Workflow iframe inspected: `https://client-app-automation-workflows.leadconnectorhq.com/location/tm68WWMrcAa3TqQbEAMa/workflow/dee4450a-1b7b-4597-9fa4-9c7b7423b848`.
- HighLevel was already authenticated in the dedicated Chrome session. No credential entry, MFA handling, account switching, or workaround was attempted.
- Inspection used DOM reads, screenshot capture, and selecting existing nodes/panels. No `Save action`, `Save Trigger`, `Publish`, `Test Workflow`, `Add`, `Add New Trigger`, `Delete`, or enrollment/action execution control was intentionally invoked.

## Captured status and posture

### Workflow status

Visible DOM text in the evidence includes:

- Workflow name: `WF | Intake | Whiteford | Tech GC Launchpad | Draft`
- Status: `Draft`
- Nearby action control: `Publish`
- Builder mode: `Standard Builder`
- Header state: `Saved`

Finding: The workflow appears Draft/Off, not active/published, during this inspection.

### Trigger source

Visible trigger evidence includes:

- Trigger type: `Contact Tag`
- Trigger name/card: `Contact Tag Added - workflow:tech-gc-launchpad`
- Filter text: `Tag Added includes "workflow:tech-gc-launchpad"`
- Trigger panel text: `Contact Tag`, `Runs when the specified tag is applied or cleared`, `FILTERS`, `Tag Added`, `workflow:tech-gc-launchpad`.

Finding: The visible trigger is limited to the selected Tech GC lane tag and does not show AI Patent, AI Compliance, Founder M&A, generic lead, imported-prospect, social-planner, or unrelated source triggers.

### Visible guard / decision flow

Visible canvas/panel evidence includes:

- `Tech GC Launchpad Safety + Review Note`
- `Consent Gate — lead magnet email opt-in required before nurture`
- Branch: `Opted in / eligible for fut...` with condition `If "Tags" includes "newsletter:ai"`
- None branch: `Not opted in / suppressed /...` with `When none of the conditions are met`
- Both visible branches end at `END` in the captured canvas.

Selected branch panel text confirms:

- `If / Else`
- `Build Your Own`
- `BRANCHES`
- `Includes`
- `newsletter:ai`
- `The condition will be true if all of the selected tags are added to the Contact`
- `None Branch`
- `When no condition is met`

Finding: The executable visible branch condition proves only the `newsletter:ai` opt-in tag check. The none branch label suggests non-opt-in/suppression handling but the selected panel did not expose separate suppression predicates.

### Safety/review note contents

The selected safety note panel includes the following material guard language in the DOM evidence:

- `DRAFT/OFF ONLY. Do not publish. Do not enroll contacts. Do not enable emails/SMS.`
- `External sends require approval:external-send-approved plus Jeff exact approval.`
- `Live CRM mutations require separate approval.`
- `Trigger tag: workflow:tech-gc-launchpad.`
- Recommended fields include `approval_status=pending` and `consent_basis=unknown pending review unless captured`.
- `Before any external action: confirm DND/unsubscribe/suppression, consent basis, approval status, absence of outreach:do-not-send, and presence of approval:external-send-approved.`
- `Imported/researched prospects remain internal-review-only.`
- `Opportunity handling is recommendation-only... no duplicate and no live stage movement without separate approval.`
- `Future email assets are placeholders only and must stay disabled/off unless separately approved... No SMS, no social, no webhook/callout, no test send.`
- `Legal/ethics guardrail: informational only; no legal advice; no attorney-client relationship; no confidential details before conflicts and engagement approval.`

Finding: The safety note captures the desired guard concepts, but as a note it should be treated as documented operator guidance / internal record evidence, not proof that every guard is enforced by separate workflow conditions.

## Guard checklist disposition

| Required guard / posture | Visible evidence from this pass | Disposition |
| --- | --- | --- |
| Draft/Off | Header/canvas DOM shows `Draft`; workflow name includes `Draft`; Publish button visible but not clicked. | Confirmed visible. |
| Tech GC lane trigger | Trigger panel and card show `Contact Tag Added - workflow:tech-gc-launchpad` and filter `workflow:tech-gc-launchpad`. | Confirmed visible. |
| Consent / opt-in | If/Else branch checks `newsletter:ai`; consent-gate action label says lead-magnet email opt-in required before nurture. | Partially confirmed; tag check visible. |
| Non-opt-in path | None branch says `Not opted in / suppressed /...` and `When none of the conditions are met`; branch ends. | Partially confirmed; label/path visible. |
| DND | Safety note says confirm DND before external action. | Documented in note only; not separately proven as executable condition. |
| Unsubscribe / suppression | Safety note says confirm unsubscribe/suppression; none branch label includes `suppressed`. | Documented/label evidence only; not separately proven as executable condition. |
| `outreach:do-not-send` | Safety note says confirm absence of `outreach:do-not-send`. | Documented in note only. |
| `ops:no-auto-send` | Not visible in captured panel/body text. | Gap. |
| `newsletter:not-consented` | Not visible as a separate condition in captured panel/body text. | Gap. |
| Approval status | Safety note references `approval_status=pending` and approval status confirmation before external action. | Documented in note only. |
| `approval:external-send-approved` | Safety note says external sends require the tag plus Jeff exact approval. | Documented in note only. |
| Consent basis | Safety note references `consent_basis=unknown pending review unless captured` and confirmation before external action. | Documented in note only. |
| Disclaimer / privacy guardrail version / public input type / report requested | Not visible as executable conditions in this workflow capture. | Gap; also still constrained by missing-field packet. |
| Conflicts/adverse-party/attorney-review hold | Safety note includes no confidential details before conflicts and engagement approval, but no visible executable hold condition was captured. | Documented in note only; executable condition gap. |
| Message/email/SMS/social action disabled | Safety note says no email/SMS enablement, future email assets placeholders only, no SMS/social/webhook/callout/test send. No visible active Send Email/SMS/Social node appeared on captured canvas. | Partially confirmed; no visible message action in captured canvas, but future placeholder asset references remain note-level. |

## Gaps and recommended next actions

1. Do not activate or publish this workflow from this evidence packet.
2. Before any activation packet, convert the note-level guard requirements into visible, executable HighLevel conditions or a documented manual approval gate immediately before any future external message step.
3. Specifically capture or add UI evidence for DND, unsubscribe/suppression, `outreach:do-not-send`, `ops:no-auto-send`, `newsletter:not-consented`, approval status, consent-basis prefix, `approval:external-send-approved`, conflicts/adverse-party hold, disclaimer acknowledgement, `privacy_guardrail_version`, `public_form_input_type`, and `report_requested` before any external action.
4. Keep the prior missing-field blocker active until the approved fields in `docs/highlevel_guardrail_v2_field_workflow_verification_2026-05-07.md` are created/verified and read-only field evidence is rerun.
5. If Jeff wants Tech GC to proceed to internal controlled QA, the safe next step is approval for manual missing-field creation or a separately approved safe field-creation script; workflow activation and external sends should remain separately blocked.

## Safety statement

This task performed read-only browser/CDP inspection and local file writes only. It did not send email/SMS/DM, publish or schedule social posts, enroll contacts, activate or publish workflows, save workflow edits, create/update HighLevel fields, create/update contacts or opportunities, add production environment variables, write to Clio, or make public/client-facing changes.
