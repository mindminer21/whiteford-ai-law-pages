# HighLevel Consent-Gated Workflow Revision Report — t_4d85252e

Date: 2026-05-06
Location: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`)
Control checklist: `/Users/jeff/.hermes/kanban/boards/whiteford-mountain-west/workspaces/t_74fc0731/consent_gated_highlevel_workflow_revision_checklists.md`

## Safety scope observed

- Used the dedicated Hermes-controlled Chrome/CDP session against HighLevel.
- Kept workflows in Draft/Off; did not click Publish.
- Did not test workflows, enroll contacts, send/test-send emails/SMS, post social/LinkedIn, call webhooks, or mutate live contacts/opportunities.
- Changes were limited to draft workflow-canvas configuration where the UI safely allowed it.

## HighLevel evidence links

| Lane | Workflow | HighLevel URL | Draft/Off evidence |
| --- | --- | --- | --- |
| Tech GC Launchpad | `WF | Intake | Whiteford | Tech GC Launchpad | Draft` (`dee4450a-1b7b-4597-9fa4-9c7b7423b848`) | https://app.gohighlevel.com/location/tm68WWMrcAa3TqQbEAMa/workflow/dee4450a-1b7b-4597-9fa4-9c7b7423b848 | UI header displayed `Draft`; no Publish action used. |
| AI Compliance Gameplan | `WF | Intake | Whiteford | AI Compliance Gameplan | Draft` (`682ada5f-fa1e-4411-97d6-a1e019139614`) | https://app.gohighlevel.com/location/tm68WWMrcAa3TqQbEAMa/workflow/682ada5f-fa1e-4411-97d6-a1e019139614 | UI header displayed `Draft`; no Publish action used. |
| Founder M&A Readiness | `WF | Intake | Whiteford | Founder M&A Readiness | Draft` (`4be5ea96-b497-4149-be72-f38aa136da35`) | https://app.gohighlevel.com/location/tm68WWMrcAa3TqQbEAMa/workflow/4be5ea96-b497-4149-be72-f38aa136da35 | UI header displayed `Draft`; no Publish action used. |
| AI Patent Strategy Scorecard | `WF | Intake | Whiteford | AI Patent Strategy Scorecard | Draft` (`8dbff7fd-caa0-49b3-ba16-bd46b4a1f1d7`) | https://app.gohighlevel.com/location/tm68WWMrcAa3TqQbEAMa/workflow/8dbff7fd-caa0-49b3-ba16-bd46b4a1f1d7/advanced-canvas | UI header displayed `Draft`; no Publish action used. Screenshot saved at `docs/highlevel_evidence_t_4d85252e_ai_patent.jpg`. |

## Draft revisions applied or confirmed

### 1. Tech GC Launchpad

Applied in Draft/Off UI:

- Added an If/Else action after the existing safety/review note.
- Action name: `Consent Gate — lead magnet email opt-in required before nurture`.
- Eligible branch label: `Opted in / eligible for future approved email path`.
- Blocked/none branch label: `Not opted in / suppressed / internal review only`.
- UI condition safely configured: contact Tags includes `newsletter:ai`.
- Existing trigger remained `Contact Tag Added - workflow:tech-gc-launchpad`.
- No send/SMS/webhook/social actions were added.

### 2. AI Compliance Gameplan

Applied in Draft/Off UI:

- Added an If/Else action at the top of the workflow before the existing intake/opportunity/internal-review actions.
- Action name: `Consent Gate — lead magnet email opt-in required before nurture`.
- Eligible branch label: `Opted in / eligible for future approved email path`.
- Blocked/none branch label: `Not opted in / suppressed / internal review only`.
- UI condition safely configured: contact Tags includes `newsletter:ai`.
- Existing trigger remained `Contact Tagged: workflow:ai-compliance-readiness`.
- No send/SMS/webhook/social actions were added.

### 3. Founder M&A Readiness

Applied in Draft/Off UI:

- Added an If/Else action at the top of the workflow before the existing M&A Readiness safety/review note.
- Action name: `Consent Gate — lead magnet email opt-in required before nurture`.
- Eligible branch label: `Opted in / eligible for future approved email path`.
- Blocked/none branch label: `Not opted in / suppressed / internal review only`.
- UI condition safely configured: contact Tags includes `newsletter:ai`.
- Existing trigger remained `Contact Tag Added - workflow:ma-readiness`.
- No send/SMS/webhook/social actions were added.

### 4. AI Patent Strategy Scorecard

Confirmed in Draft/Off Advanced Builder UI:

- Existing trigger remained `Contact Tag Added - workflow:ai-patent-strategy`.
- Existing visible internal guard nodes included:
  - `Add Internal Note - DND Suppression Guard`.
  - `Add Internal Note - Newsletter Consent Guard`.
  - Draft email placeholder internal-note nodes #1-#4.
  - `Add Internal Note - Future External-Send Approval Needed`.
- The Advanced Builder view did not expose the same safe `root-plus-button` insertion pattern used in the standard builder workflows during this pass, so I did not force a structural edit or use a private workflow-edit API. This avoids accidentally disrupting the more complex advanced-canvas branch tree.

## Remaining manual fields / Jeff review items

HighLevel's condition UI safely allowed the primary `newsletter:ai` tag condition during this pass. The following required gate details still need Jeff/manual UI review before activation, and should be represented either as additional branch conditions if the UI exposes them safely or as internal-review note/task placeholders if not:

1. Add/verify `newsletter:not-consented` absent condition.
2. Add/verify `Consent Basis` / `contact.consent_basis` starts with `lead_magnet_email_opt_in:`.
3. Add/verify `outreach:do-not-send` absent condition.
4. Add/verify `ops:no-auto-send` absent condition.
5. Add/verify email DND is false/not present.
6. Add/verify email unsubscribe/suppression/bounce is false/not present.
7. Add/verify `Approval Status` is not `no-auto-send`, `suppressed`, `revise`, `rejected`, blank, or unknown.
8. Keep `approval:external-send-approved` as a future external-send gate only; do not auto-add it in workflows.
9. For AI Compliance, review whether the existing Create/Update Opportunity action must be disabled or converted to internal recommendation before any future activation.
10. For Founder M&A and Tech GC, add blocked-branch internal note/task placeholders if Jeff wants a separate visible note node below the none branch; this pass only labeled the none branch because task-assignee/unit selection is a known UI blocker.
11. For AI Patent Advanced Builder, retitle/tighten the existing DND and Newsletter Consent Guard nodes or approve a safe advanced-canvas edit path before structural changes.

## No-activation conclusion

The workflows remain Draft/Off and should not be activated until Jeff approves a separate activation packet with exact recipient/copy/channel/timing, suppression/conflict checks, legal/ethics review, email asset QA, and rollback plan.
