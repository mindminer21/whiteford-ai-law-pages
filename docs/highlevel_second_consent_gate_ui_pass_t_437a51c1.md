# HighLevel Second Consent-Gate UI Pass — t_437a51c1

Generated: 2026-05-06 15:08:58 MDT
Location: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`)
Control report: `docs/highlevel_consent_gate_revision_report_t_4d85252e.md`
Prior manual-field report: `docs/highlevel_manual_consent_gate_fields_t_b2909eb8.md`

## Safety posture observed

- Used Jeff's dedicated Hermes-controlled Chrome/CDP session already authenticated to HighLevel for `tm68WWMrcAa3TqQbEAMa`.
- Kept all inspected workflows in `Draft` / off status.
- Did not click `Publish`.
- Did not test workflows, enroll contacts, send or test-send emails/SMS, post social/LinkedIn content, call webhooks, or mutate live contacts/opportunities.
- Did not save any new workflow condition during this second pass because the standard-builder condition editor produced an ambiguous/blank added segment state and the remaining fields require unverified custom-field/DND/suppression operator mappings.

## Evidence files

- Tech GC Launchpad DOM evidence: `docs/highlevel_evidence_t_437a51c1_tech_gc_dom.txt`
- AI Compliance Gameplan DOM evidence: `docs/highlevel_evidence_t_437a51c1_ai_compliance_dom.txt`
- Founder M&A Readiness DOM evidence: `docs/highlevel_evidence_t_437a51c1_founder_ma_dom.txt`
- AI Patent Strategy Scorecard Advanced Builder DOM evidence: `docs/highlevel_evidence_t_437a51c1_ai_patent_dom.txt`

These are CDP-extracted HighLevel iframe text snapshots. They are the reliable evidence path for this pass because earlier screenshot tooling can miss or blank cross-origin workflow iframes.

## Workflow-by-workflow status

| Workflow | HighLevel URL | Status in UI | Consent-gate status | Fields completed in this pass | Fields still not safely expressible/saved |
| --- | --- | --- | --- | --- | --- |
| AI Compliance Gameplan | `https://app.gohighlevel.com/location/tm68WWMrcAa3TqQbEAMa/workflow/682ada5f-fa1e-4411-97d6-a1e019139614` | `Draft`; header also showed `Saved`, `Standard Builder`, `Test Workflow`, and `Publish` button. | Existing consent gate verified with eligible branch `If "Tags" includes "newsletter:ai"`; none branch visible. | Verified `newsletter:ai` present and workflow remained Draft/Off. | No additional fields saved. `Add Segment` produced an unsaved blank `Select / Select Operator` segment state; I discarded it with Cancel rather than save an incomplete condition. |
| AI Patent Strategy Scorecard | `https://app.gohighlevel.com/location/tm68WWMrcAa3TqQbEAMa/workflow/8dbff7fd-caa0-49b3-ba16-bd46b4a1f1d7/advanced-canvas` | `Draft`; header showed `Saved`, `Advanced Builder`, `Test Workflow`, and `Publish` button. | Existing advanced-canvas internal guard nodes verified, including `Add Internal Note - DND Suppression Guard` and `Add Internal Note - Newsletter Consent Guard`. | Verified the advanced workflow remained Draft/Off and existing internal guard nodes were present. | No structural edit saved. The advanced builder still does not expose the same safe standard-builder consent-gate condition panel; retitling or rewiring advanced nodes remains a manual/approved edit path. |
| Founder M&A Readiness | `https://app.gohighlevel.com/location/tm68WWMrcAa3TqQbEAMa/workflow/4be5ea96-b497-4149-be72-f38aa136da35` | `Draft`; header also showed `Saved`, `Standard Builder`, `Test Workflow`, and `Publish` button. | Existing consent gate verified with eligible branch `If "Tags" includes "newsletter:ai"`; none branch visible. | Verified `newsletter:ai` present and workflow remained Draft/Off. | No additional fields saved. The panel exposes `Add Segment`, but the same segment-entry ambiguity from AI Compliance/Tech GC applies, and custom-field/DND/suppression operators remain unverified. |
| Tech GC Launchpad | `https://app.gohighlevel.com/location/tm68WWMrcAa3TqQbEAMa/workflow/dee4450a-1b7b-4597-9fa4-9c7b7423b848` | `Draft`; header also showed `Saved`, `Standard Builder`, `Test Workflow`, and `Publish` button. | Existing consent gate verified with eligible branch `If "Tags" includes "newsletter:ai"`; none branch visible. | Verified `newsletter:ai` present and workflow remained Draft/Off. | No additional fields saved. A brief `Add Segment` probe produced an unsaved blank `Select / Select Operator` segment state; I discarded it with Cancel. |

## Required field disposition after second pass

| Required condition | Second-pass disposition |
| --- | --- |
| `newsletter:ai` present | Verified as already present in all three standard-builder consent gate branches; AI Patent has existing internal Newsletter Consent Guard rather than the same standard If/Else branch. |
| `newsletter:not-consented` absent | Not saved. The UI can expose tag conditions in principle, but adding a segment produced a blank/disabled incomplete segment state; saving would be unsafe. Must be entered manually as its own AND segment if Jeff confirms the condition panel state. |
| Consent Basis starts with `lead_magnet_email_opt_in:` | Not saved. The custom-field selector/operator path for a prefix/starts-with condition was not stable enough to verify in the production workflow UI. |
| No `outreach:do-not-send` | Not saved. Should be a separate `Tags Does not include outreach:do-not-send` AND segment; do not combine with other absent tags unless HighLevel confirms all-selected-tags-absent semantics. |
| No `ops:no-auto-send` | Not saved. Should be a separate `Tags Does not include ops:no-auto-send` AND segment; do not combine with other absent tags unless HighLevel confirms all-selected-tags-absent semantics. |
| No email DND/unsubscribe/suppression/bounce | Not saved. DND, unsubscribe, suppression, and bounce fields require HighLevel-specific field/operator confirmation; an unverified mapping could create a false eligibility gate. |
| Approval Status not `no-auto-send`, `suppressed`, `revise`, `rejected`, blank, or unknown | Not saved. Prefer a positive allow-list such as a Jeff-approved eligible status rather than a brittle negative list; exact HighLevel custom-field operators still require manual confirmation. |

## Exact manual steps for remaining standard-builder workflows

For AI Compliance Gameplan, Founder M&A Readiness, and Tech GC Launchpad, Jeff or an authorized HighLevel operator should do the following in each workflow while keeping the workflow Draft/Off:

1. Open the existing action `Consent Gate — lead magnet email opt-in required before nurture`.
2. Confirm the first eligible branch remains `Tags Includes newsletter:ai`.
3. Add one AND segment per absent tag, not one multi-tag absent segment:
   - `Tags` → `Does not include` → `newsletter:not-consented`.
   - `Tags` → `Does not include` → `outreach:do-not-send`.
   - `Tags` → `Does not include` → `ops:no-auto-send`.
4. Add the consent-basis condition only after confirming the exact custom field label and operator:
   - `Consent Basis` / `contact.consent_basis` → `starts with` or equivalent prefix operator → `lead_magnet_email_opt_in:`.
5. Add email-safety checks only after confirming HighLevel's exact field labels and false/not-present operators:
   - Email DND is false/not present.
   - Email unsubscribe is false/not present.
   - Email suppression is false/not present.
   - Email bounce is false/not present.
6. Add Approval Status as a positive allow-list if possible, e.g. an explicit Jeff-approved eligible state, rather than trying to express `not no-auto-send/suppressed/revise/rejected/blank/unknown` as a long negative list.
7. Confirm the overall branch logic is all-AND. Do not use OR groups for safety/suppression exclusions.
8. Save only if every segment displays the intended field/operator/value before saving.
9. Do not click `Publish`, `Test Workflow`, or any enrollment/send/test-send control.

## Exact manual steps for AI Patent Advanced Builder

1. Keep `WF | Intake | Whiteford | AI Patent Strategy Scorecard | Draft` in Advanced Builder and Draft/Off.
2. Review the existing internal nodes:
   - `Add Internal Note - DND Suppression Guard`.
   - `Add Internal Note - Newsletter Consent Guard`.
   - `Add Internal Note - Future External-Send Approval Needed`.
3. If Jeff wants true branch enforcement rather than internal notes, approve a dedicated advanced-canvas edit session with rollback/evidence steps before any structural change.
4. Do not force the standard-builder If/Else insertion pattern into the advanced-canvas tree unless HighLevel exposes a stable, safe insertion path.

## No-activation conclusion

This second pass verifies that the prior `newsletter:ai` consent-gate foundation remains present and Draft/Off, but it does not resolve the remaining suppression, consent-basis, DND/unsubscribe/bounce, or approval-status fields inside HighLevel. Those conditions are now documented as manual-entry requirements because saving ambiguous or incomplete condition segments in production workflows would create a false safety gate.
