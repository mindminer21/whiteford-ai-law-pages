# Consent-Gated Lead Magnet Execution Map

Generated: 2026-05-06 10:22 MDT
Corrected after board reconciliation: 2026-05-06 10:23 MDT
Control spec: `docs/lead_magnet_opt_in_and_app_strategy.md`
Kanban orchestration task: `t_c821fb55`
Tenant: `whiteford-mountain-west`
HighLevel location: `tm68WWMrcAa3TqQbEAMa`

## Authoritative Board State

`t_c821fb55` is complete. A continuation control update on the board says to use only these existing execution tasks and not create duplicates:

| Task | Assignee | Status observed 2026-05-06 10:23 MDT | Scope |
| --- | --- | --- | --- |
| `t_c0314fa7` | `highlevel-ops` | `running` | Specify the first-priority Tech Company Legal Health Checklist interactive app, scoring logic, report output, HighLevel fields/tags, and opt-in-only routing to `workflow:tech-gc-launchpad`. Also include concise refinement notes for the other three apps only as needed for consistency. |
| `t_f4abf859` | `reviewer` | `running` | Audit `/api/leads` and lead capture forms; produce subscribed vs non-subscribed QA test cases, required fixes, and legal/privacy/ethics findings. |
| `t_74fc0731` | `highlevel-ops` | `running` | Map exact consent-gated HighLevel workflow revisions for all four lanes; deliver one checklist per workflow; no activation or sends. |
| `t_6489a94d` | `seo-research` | `running` | Research and benchmark professional-services interactive lead magnets to support UX, conversion, privacy, consent, and follow-up decisions. |

The board metadata records these duplicate child tasks as archived and not to be used: `t_2100daa7`, `t_2b83875a`, `t_3b651b05`, `t_d161bcd7`, `t_313fa28a`, `t_3190bd51`, `t_f45ab586`, `t_707b4773`.

## Non-Negotiable Operating Rule

The four offer-lane HighLevel workflows may send email nurture sequences only after the prospect affirmatively opts into the matching lead-magnet email path.

A researched, imported, enriched, or manually added prospect must not receive a `workflow:*` trigger tag unless that prospect separately opts in through the relevant lead magnet or Jeff gives exact current approval for a different compliant outreach path.

No workflow activation, external sends, SMS, social posting, contact enrollment, live prospect outreach, or public publishing is authorized by this map.

## Shared Consent Gate

For every lane, the website/API and HighLevel plan must preserve this split:

- Opted in: `contact.subscribe === true`; add `newsletter:ai`; set `Consent Basis` to a value beginning with `lead_magnet_email_opt_in:`; add the matching lane-specific `workflow:*` tag.
- Not opted in: `contact.subscribe !== true`; add `newsletter:not-consented`; set `Approval Status = no-auto-send`; set `Consent Basis = no_email_opt_in`; do not add any `workflow:*` trigger tag or email-sequence routing.

Every HighLevel email branch must also check:

- `newsletter:ai` present.
- `Consent Basis` starts with `lead_magnet_email_opt_in:`.
- No `newsletter:not-consented`.
- No `outreach:do-not-send`.
- No DND/unsubscribe/suppression.
- `Approval Status` is not `no-auto-send`, `suppressed`, or `revise`.

## Lane Map

| Priority | Lane | Interactive lead magnet | Trigger tag allowed only after opt-in | Recommended offer |
| --- | --- | --- | --- | --- |
| 1 | Tech GC | Tech Company Legal Health Checklist | `workflow:tech-gc-launchpad` | Tech Company OGC Launchpad |
| 2 | AI Compliance | AI Compliance Gameplan Builder refinement | `workflow:ai-compliance-readiness` | AI Compliance Readiness Sprint |
| 3 | M&A Readiness | Founder M&A Readiness Checklist | `workflow:ma-readiness` | Founder M&A Readiness Review |
| 4 | AI Patent | AI Patent Strategy Scorecard refinement | `workflow:ai-patent-strategy` | AI Patent Strategy Sprint |

## Business-Development Principles Applied

A local business-development corpus query surfaced lead magnet/funnel principles from `100M Leads` and `Lead Funnels`: a lead magnet should solve a narrow problem, require useful prospect engagement, create immediate value before follow-up, and use follow-up to build the relationship rather than jumping straight to a generic consultation.

Applied here:

1. Each app asks a small number of non-confidential diagnostic questions.
2. Each app gives partial value before the gate: score band, top risks, likely next step.
3. The full personalized report and email nurture are gated behind business email plus an unchecked affirmative opt-in box.
4. Follow-up begins with fulfillment and interpretation before a bounded productized review/sprint CTA.
5. Imported or researched prospects remain outside nurture unless Jeff approves a separate compliant path.

## Execution Dependencies

The board now uses a simplified four-task tranche rather than a large dependency tree:

1. `t_6489a94d` supplies researched UX/conversion/privacy/consent patterns.
2. `t_c0314fa7` turns the control spec into the app/scoring/report/field-tag strategy, led by the Tech Company Legal Health Checklist as first build priority.
3. `t_74fc0731` maps HighLevel workflow revisions for all four lanes, keeping everything draft/off and opt-in-only.
4. `t_f4abf859` audits website/API/forms and supplies QA/legal/privacy/ethics gates.

No additional child tasks should be created unless Jeff explicitly reopens the scope.

## Review Gates Before Activation or Public Launch

A final go/no-go can be considered only after the four allowed execution tasks complete and Jeff approves exact final workflow and copy. The gate must confirm:

1. `/api/leads` and all forms handle opted-in and non-consented submissions correctly.
2. All four lane workflows require opt-in evidence and exclude non-consented/suppressed/no-auto-send contacts.
3. The public apps do not request confidential or sensitive facts.
4. Copy avoids promises of compliance, patentability, transaction outcomes, risk elimination, or attorney-client relationship formation.
5. Emails have truthful sender/subject/footer/unsubscribe handling before any activation.
6. SMS remains off unless separately approved with documented SMS consent and opt-out language.
