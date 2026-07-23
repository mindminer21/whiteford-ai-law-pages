# HighLevel Manual Consent-Gate Fields — t_b2909eb8

Generated: 2026-05-06 12:41:01 MDT
Location: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`)
Safety posture: HighLevel UI review only; no workflow activation, publishing, external sends, SMS, contact enrollment, social/LinkedIn action, Clio writes, paid ads, or public outreach.

## Source controls used

- `docs/highlevel_consent_gate_revision_report_t_4d85252e.md`
- `docs/lead_magnet_opt_in_and_app_strategy.md`
- `docs/tech_company_legal_health_checklist_app_spec.md`
- `docs/lead_api_opt_in_gating_audit_t_f4abf859.md`
- `/Users/jeff/.openclaw/projects/mountain-west-growth-os/dashboards/growth-os-dashboard/docs/WHITEFORD_AI_GROWTH_OS_INTEGRATION_PLAN.md`

## Browser/session evidence

- Used the dedicated Hermes-controlled HighLevel Chrome/CDP session already open for `tm68WWMrcAa3TqQbEAMa`.
- Verified authenticated HighLevel UI access to `WF | Intake | Whiteford | Tech GC Launchpad | Draft` (`dee4450a-1b7b-4597-9fa4-9c7b7423b848`).
- Header evidence from the workflow iframe showed: `Saved`, `Standard Builder`, `Test Workflow`, `Draft`, `Publish`, and the workflow name.
- Opened the existing consent-gate action panel in the Tech GC workflow. DOM evidence showed action name `Consent Gate — lead magnet email opt-in required before nurture`, branch label `Opted in / eligible for future approved email path`, existing condition `Tags Includes newsletter:ai`, and none branch label `Not opted in / suppressed / internal review only`.
- A browser vision capture attempted to record the iframe panel, but the visual screenshot tool captured a blank top-level frame rather than the cross-origin workflow iframe. The reliable evidence for this run is therefore the CDP-extracted HighLevel iframe text/DOM state.

## What was safely editable

The standard-builder condition panel safely exposed the existing consent gate and the `Add Segment` path. I confirmed the UI can expose:

- Contact field selector: `Tags`.
- Operators for tag conditions: `Includes`, `Does not include`, `Is not empty`, and `Is empty`.
- Tag search/select values, including `newsletter:not-consented`.

I started a draft-only edit to add `Tags Does not include newsletter:not-consented`; however, while testing the additional required absent-tag segments, the UI left overlapping dropdowns open and temporarily selected an unsafe `Tags Is empty` operator on a new unsaved segment. I immediately used `Cancel` to discard the entire unsaved panel edit before any save. No unsafe condition was saved.

## Per-condition status

| Required condition | UI status in this pass | Result |
| --- | --- | --- |
| `newsletter:ai` present | Already present in the four standard gate pattern from `t_4d85252e`; directly verified in Tech GC DOM. | Preserved. |
| `newsletter:not-consented` absent | Standard-builder UI exposes `Tags` + `Does not include` + tag search. A single absent-tag segment appears feasible, but multi-step automation became unsafe when additional segments were added. | Not saved; requires manual UI entry or a safer HighLevel edit path. |
| `Consent Basis` starts with `lead_magnet_email_opt_in:` | Not safely configured in this pass. The condition picker is broad and dynamic; I did not save a custom-field prefix condition without a stable, verified operator/value path. | Still manual. |
| `outreach:do-not-send` absent | Would require its own `Tags Does not include outreach:do-not-send` segment. Combining multiple absent tags in one `Does not include` segment is unsafe because HighLevel text says the condition is true if any selected tag is not added. | Still manual; do not combine with other absent tags in one segment. |
| `ops:no-auto-send` absent | Same as above; requires its own separate absent-tag segment. | Still manual; do not combine with other absent tags in one segment. |
| Email DND false/not present | Not safely configured in this pass. DND/suppression fields are not equivalent to a simple tag selector, and I did not save an unverified field/operator mapping. | Still manual. |
| Email unsubscribe/suppression/bounce false/not present | Not safely configured in this pass; HighLevel suppression/unsubscribe semantics need manual confirmation in the condition picker. | Still manual. |
| `Approval Status` not `no-auto-send`, `suppressed`, `revise`, `rejected`, blank, or unknown | Not safely configured in this pass. This requires a custom-field negative-list or an allowed-state positive-list after confirming exact HighLevel operators. | Still manual. |
| `approval:external-send-approved` remains future send gate only | No workflow tag/action was added for this approval tag. | Preserved. |

## Workflow-by-workflow disposition

| Lane | Workflow / URL | Status |
| --- | --- | --- |
| Tech GC Launchpad | `WF | Intake | Whiteford | Tech GC Launchpad | Draft` — `https://app.gohighlevel.com/location/tm68WWMrcAa3TqQbEAMa/workflow/dee4450a-1b7b-4597-9fa4-9c7b7423b848` | Existing draft gate preserved; no new manual fields saved because the UI became unsafe during multi-segment entry. |
| AI Compliance Gameplan | `WF | Intake | Whiteford | AI Compliance Gameplan | Draft` — `https://app.gohighlevel.com/location/tm68WWMrcAa3TqQbEAMa/workflow/682ada5f-fa1e-4411-97d6-a1e019139614` | Based on the same standard-builder gate pattern from `t_4d85252e`; remaining manual fields should be entered only after the Tech GC segment sequence is proven safe. |
| Founder M&A Readiness | `WF | Intake | Whiteford | Founder M&A Readiness | Draft` — `https://app.gohighlevel.com/location/tm68WWMrcAa3TqQbEAMa/workflow/4be5ea96-b497-4149-be72-f38aa136da35` | Same standard-builder disposition as AI Compliance. |
| AI Patent Strategy Scorecard | `WF | Intake | Whiteford | AI Patent Strategy Scorecard | Draft` — `https://app.gohighlevel.com/location/tm68WWMrcAa3TqQbEAMa/workflow/8dbff7fd-caa0-49b3-ba16-bd46b4a1f1d7/advanced-canvas` | Advanced Builder was already flagged by `t_4d85252e` as not exposing the safe standard `root-plus-button` pattern; no structural edit attempted. |

## Recommended manual entry packet

For each standard-builder workflow, if Jeff enters fields manually in the HighLevel UI, the eligible branch should use all-AND logic with one condition per absent tag:

1. `Tags Includes newsletter:ai`.
2. `Tags Does not include newsletter:not-consented`.
3. `Tags Does not include outreach:do-not-send`.
4. `Tags Does not include ops:no-auto-send`.
5. `Consent Basis` starts with `lead_magnet_email_opt_in:`.
6. Email DND is false/not present.
7. Email unsubscribe/suppression/bounce is false/not present.
8. `Approval Status` is positively allowed, preferably `pending` or another Jeff-approved eligible state, rather than trying to maintain a long negative list.
9. Do not add `approval:external-send-approved` to the intake/nurture trigger; keep it as a later external-send gate only.

Important implementation note: do not put `newsletter:not-consented`, `outreach:do-not-send`, and `ops:no-auto-send` into one HighLevel `Tags Does not include` multi-select segment unless HighLevel confirms it evaluates as all selected tags absent. The UI text observed in this pass says the segment is true if any selected tag is not added, which is not strong enough for a suppression gate.

## No-activation conclusion

All workflows remain Draft/Off. No workflow was published, activated, tested, enrolled, or externally exposed. The remaining manual consent-gate fields should be completed by a human in the UI, or by a later browser task only after a safer per-segment HighLevel interaction procedure is validated in a non-production/dummy workflow.
