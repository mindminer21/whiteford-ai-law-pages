# Lead Magnet Non-Subscriber Fulfillment Policy Options

Task: `t_969b6a2d`
Date: 2026-05-08
Tenant: `whiteford-mountain-west`
Decision owner: Jeff / Whiteford attorney review
Status: internal decision memo only. This memo does not authorize any email/SMS/DM/social/LinkedIn/ad send, HighLevel activation, workflow enrollment, live CRM mutation, production credential change, Clio write, public publishing, or client/prospect-facing action.

## Executive recommendation

Recommended default for Tech GC internal QA: **Option 1 — on-page-only value, with no outbound delivery and no HighLevel workflow trigger for non-subscribers.**

Use the Tech Company Legal Health Checklist to deliver useful educational value in the browser before any marketing consent: readiness band, category map, top gaps, and practical next step. If the visitor does not opt into email, the internal QA expectation should remain `newsletter:not-consented`, `consent_basis = no_email_opt_in`, `approval_status = no-auto-send`, `campaignRouting.triggerTag = null`, and `campaignRouting.emailSequence = []`.

This default best matches the business-development principle from the local corpus: a lead magnet should solve a narrow problem and fulfill its promise to build trust before nurture. It also keeps the legal-marketing, privacy, deliverability, and HighLevel implementation risk lowest while the pilot is still blocked by missing HighLevel fields, incomplete executable workflow-guard evidence, and pending legal/ethics/copy review.

Secondary recommendation: keep **Option 3 — internal attorney-review task** as a later, opt-in/approval-gated enhancement only for high-fit users after Jeff approves exact criteria, task text, conflicts/suppression handling, and no-send guardrails. Do not use it as the default non-subscriber path for initial Tech GC QA.

Do not choose **Option 2 — one-time transactional email** for Tech GC internal QA yet. It may be defensible later if Whiteford wants email fulfillment without marketing nurture, but it needs the most precise legal/privacy/deliverability and HighLevel implementation approvals because it still sends an outbound message to a person who declined marketing consent.

Do not choose **Option 4 — no outbound delivery and no material on-page value beyond a generic confirmation** as the product default. It is safe, but it weakens the lead magnet by failing to deliver the promised narrow educational value.

## Source grounding

This memo resolves the non-subscriber blocker identified in:

- `docs/lead_magnet_pilot_hardening_launch_gate_review_2026-05-07.md`
- `docs/tech_gc_controlled_pilot_morning_decision_checklist_2026-05-07.md`
- `docs/lead_api_opt_in_gating_audit_t_f4abf859.md`
- `docs/tech_gc_legal_health_checklist_fulfillment_nurture_copy_2026-05-07.md`
- `docs/controlled_pilot_approval_packet_tech_gc_default_2026-05-07.md`

Business-development retrieval run used for synthesis:

```bash
python3 /Users/jeff/.hermes/knowledge/business-development/search_business_dev.py "lead magnet opt in consent transactional email nurture trust narrow problem" -k 6
```

Relevant synthesized principles:

- A lead magnet should be a complete solution to a narrow problem, not just a teaser.
- The fulfillment experience should deliver the promised value promptly enough to build trust.
- Nurture should follow only after consent; value should not be held hostage to marketing opt-in.
- High-fit users should be invited toward a bounded, productized review only after consent, guardrails, and approvals.

## Current system posture

The current safer API behavior is already aligned with a no-send non-subscriber path:

- `contact.subscribe === true` is the only condition that produces `newsletter:ai` and a lane workflow trigger tag.
- Non-opted submissions receive `newsletter:not-consented`.
- Non-opted submissions set `consent_basis = no_email_opt_in`.
- Non-opted submissions set `approval_status = no-auto-send`.
- Non-opted submissions return `campaignRouting.triggerTag = null` and `campaignRouting.emailSequence = []`.
- Client-supplied `workflow:*` tags are stripped.
- Tech GC is the recommended first internal controlled-QA lane, but only in local/preview/no-token mode until missing HighLevel fields, UI guard evidence, copy/legal review, and Jeff approvals are closed.

Important UI implication from the prior opt-in audit: some lead-capture UI states historically disabled submission until opt-in. If Jeff chooses on-page-only value, the frontend should treat the browser result itself as the non-subscriber fulfillment and should not require email opt-in merely to see the basic readiness value. If Jeff later wants to capture a non-subscribed record for internal review, that is a separate product/frontend and HighLevel approval decision.

## Policy options compared

### Option 1 — On-page-only value for non-subscribers

Definition: The app gives the user the useful educational result in the browser without requiring email marketing consent. No email/SMS/DM is sent. No workflow trigger tag is applied. Optional copy can invite the user to opt in if they want the full report by email or related educational follow-up.

Recommended policy language:

> If a user completes a lead magnet but does not opt into email, deliver the basic educational value on-page only. Do not send email/SMS/DM, do not trigger nurture, do not enroll the contact, and do not treat completion as marketing consent. If a record is created under a separately approved test or production scope, mark it `newsletter:not-consented`, `consent_basis = no_email_opt_in`, and `approval_status = no-auto-send`.

Tradeoff table:

| Dimension | Assessment |
| --- | --- |
| Privacy | Strongest privacy posture among value-delivering options. The user receives value without extra outbound processing. If no CRM write occurs, data exposure is minimized further. |
| Legal marketing / ethics | Best aligned with no-legal-advice/no-ACR guardrails because the value is educational, self-contained, and not framed as a personalized legal opinion. |
| Deliverability | No deliverability risk for non-subscribers because no message is sent. Keeps sender reputation focused on consented recipients. |
| HighLevel implementation | Simplest. Preserve current no-trigger/no-sequence behavior. If HighLevel records are not needed for non-subscribers, no live CRM write is needed. If records are later approved, use no-send fields/tags only. |
| User value | Strong. The lead magnet still solves the narrow problem by showing readiness band, category gaps, and next step. The user can choose whether to opt into more. |
| Business-development fit | Strong. Fulfills the promise first and builds trust before nurture. |
| Primary risk | If too much value is hidden behind email opt-in, this option becomes a weak teaser. The browser result must be genuinely useful. |

Tech GC internal QA acceptance criteria:

1. A non-opted Tech GC browser path can show useful on-page result modules: readiness band, top category gaps, and suggested next step.
2. No outbound email/SMS/DM/social/LinkedIn/ad/Clio action is executed or queued.
3. API preview/non-opted path returns `campaignRouting.triggerTag = null`.
4. API preview/non-opted path returns `campaignRouting.emailSequence = []`.
5. Expected non-consent fields/tags are present in preview payload if a payload is produced: `newsletter:not-consented`, `consent_basis = no_email_opt_in`, `approval_status = no-auto-send`.
6. No `workflow:*` trigger tag is present.
7. Success/confirmation copy does not imply that a report email or nurture sequence will be sent when the user did not opt in.

### Option 2 — One-time transactional email for non-subscribers

Definition: The user does not opt into marketing nurture, but receives a single email containing the requested lead-magnet result or link. The email is not a sequence and should not contain marketing follow-up beyond strictly necessary fulfillment and approved educational caveats.

Potential policy language if approved later:

> If Whiteford approves transactional fulfillment, a non-subscriber may receive exactly one requested lead-magnet fulfillment email only when the form clearly says the email address will be used to send that one requested item. The message must not enroll the person in nurture, must include required firm/footer/unsubscribe or preference language as approved, must pass suppression/DND checks, and must use attorney-reviewed copy.

Tradeoff table:

| Dimension | Assessment |
| --- | --- |
| Privacy | Moderate risk. It still uses email for outbound delivery after the user declined marketing consent. Requires clear form copy separating one-time fulfillment from marketing subscription. |
| Legal marketing / ethics | Higher review burden. The line between transactional fulfillment and advertising/solicitation can blur if the email includes CTA language, productized-review promotion, or nurture-like copy. |
| Deliverability | Moderate risk. Sending to people who did not affirmatively choose ongoing email may raise complaints or unsubscribes even if the email is requested. Requires sender/footer/unsubscribe/preference approval and suppression checks. |
| HighLevel implementation | More complex. Needs a distinct one-time transactional path that is not the existing nurture workflow, not a `workflow:*` marketing trigger, and not a loophole around `newsletter:not-consented`. |
| User value | Strong if users expect emailed copy/PDF. Useful for saving/sharing the result. |
| Business-development fit | Can fit if the email only fulfills the promised asset, but weaker than on-page default while guardrails are still unverified. |
| Primary risk | Accidental conversion into a non-consented nurture workflow or ambiguous legal-marketing email. |

Minimum approval gates before using this option:

1. Jeff/Whiteford approves exact one-time email copy, subject, sender identity, footer/address, unsubscribe/preference handling, and timing.
2. Form copy clearly distinguishes “send this one requested report” from “subscribe to educational follow-up.”
3. HighLevel implementation has a separate no-nurture transactional path or a manual controlled send path, not the existing nurture trigger workflow.
4. Suppression/DND/unsubscribe/bounce checks are executable and evidenced before the send.
5. `newsletter:not-consented` remains incompatible with any nurture workflow trigger.
6. The message contains no legal advice, no outcome promise, no confidential-info request, and no implication of attorney-client relationship.
7. A rollback/evidence plan exists for accidental queueing or send errors.

Tech GC internal QA decision: **Do not use for the first internal QA default.** It should remain an attorney/privacy/deliverability review item for later.

### Option 3 — Internal attorney-review task for high-fit non-subscribers

Definition: The system does not send the non-subscriber an outbound message. Instead, completion can create or stage an internal review task for Jeff/attorney review when the user appears high-fit, subject to consent, privacy, conflicts, suppression, and approval rules.

Possible policy language:

> Non-subscriber activity may be used only for internal triage if the user provided the information through an approved public form, the data remains categorical/non-confidential, and the record is marked no-send. Any attorney-review task must be internal-only, must not trigger outreach, and must require a later human decision before any contact.

Tradeoff table:

| Dimension | Assessment |
| --- | --- |
| Privacy | Moderate. Less risky than outbound email, but it still stores and operationalizes user-provided data. Requires data minimization and retention discipline. |
| Legal marketing / ethics | Moderate to high. Internal review is safer than auto-send, but using non-subscriber data to prompt future contact can become sensitive without explicit consent and conflicts/suppression review. |
| Deliverability | Low direct deliverability risk because no outbound send occurs. |
| HighLevel implementation | Moderate. Could be implemented as an internal task/note only, but must not enroll the contact or create external action paths. Existing missing fields and guard evidence still block live reliance. |
| User value | Indirect. The user does not receive additional value unless later approved contact occurs. |
| Business-development fit | Useful for high-fit routing only after guardrails. It should not replace the user-facing value promise. |
| Primary risk | Internal task becomes a backdoor outreach queue for people who did not consent. |

Minimum approval gates before using this option:

1. Jeff defines exact high-fit criteria for Tech GC, using categorical/non-confidential fields only.
2. Attorney review approves what can be stored and how long it can be used.
3. Conflicts/adverse-party, suppression, DND, unsubscribe, and `ops:no-auto-send` rules are explicit.
4. Task text says internal review only and no outreach without later approval.
5. No workflow enrollment, message step, campaign tag, SMS, social, LinkedIn, ad, or Clio action is connected to the task.
6. The private dashboard/index can evidence the task path without exposing raw sensitive details.

Tech GC internal QA decision: **Not the initial default.** Use later only if Jeff wants an internal review queue and approves exact criteria and no-outreach safeguards.

### Option 4 — No outbound delivery and no material on-page value beyond generic confirmation

Definition: If the user does not opt in, nothing is sent and the app withholds most or all result value, perhaps showing only a generic message like “thanks” or “opt in to receive your report.”

Tradeoff table:

| Dimension | Assessment |
| --- | --- |
| Privacy | Strong from a data-use standpoint, especially if no CRM write occurs. |
| Legal marketing / ethics | Low external risk because little is communicated. |
| Deliverability | No risk because no message is sent. |
| HighLevel implementation | Simple: no trigger, no sequence, no live write required. |
| User value | Weak. The user did work but receives little practical payoff unless they subscribe. |
| Business-development fit | Poor. It contradicts the trust-building role of a lead magnet by making basic educational value dependent on opt-in. |
| Primary risk | Low conversion trust; feels like a gated email capture rather than a useful diagnostic. |

Tech GC internal QA decision: **Do not use as the product default.** It can remain as a temporary safety fallback if the app cannot yet show useful on-page results, but it should be treated as a UX/product gap, not as the target policy.

## Side-by-side decision matrix

Scores: 5 = strongest / lowest risk / best fit; 1 = weakest / highest risk / poor fit.

| Option | Privacy | Legal-marketing safety | Deliverability safety | HighLevel simplicity | User value | BD/trust fit | Internal QA recommendation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 1. On-page-only value | 5 | 5 | 5 | 5 | 4 | 5 | **Default** |
| 2. One-time transactional email | 3 | 2 | 3 | 2 | 5 | 3 | Later review only |
| 3. Internal attorney-review task | 3 | 3 | 5 | 3 | 2 | 3 | Later high-fit enhancement only |
| 4. No outbound / no material value | 5 | 5 | 5 | 5 | 1 | 1 | Safety fallback only |

## Recommended Tech GC internal QA policy

Adopt this default for the first Tech GC controlled-QA lane:

1. The lead magnet must provide meaningful on-page educational value before marketing opt-in.
2. Email nurture remains optional and requires affirmative opt-in.
3. Non-subscribers do not receive email/SMS/DM/social/LinkedIn/ad follow-up.
4. Non-subscribers are not enrolled in HighLevel workflows.
5. Non-subscriber routing must remain no-send/no-auto-send.
6. High-fit productized review CTAs can be shown on-page as educational next-step copy, but any human review/contact path requires separate consent, conflicts/suppression checks, attorney review, and Jeff approval.

Recommended Jeff decision wording:

> For Tech GC internal QA, approve on-page-only non-subscriber fulfillment. The checklist may show a useful readiness snapshot in the browser without requiring marketing consent. If the user does not opt into email, do not send a report email, do not trigger nurture, do not enroll a workflow, and do not create an external-action task. Keep any preview/record payload marked `newsletter:not-consented`, `consent_basis = no_email_opt_in`, and `approval_status = no-auto-send`. Revisit one-time transactional email and internal attorney-review tasks only after separate legal/privacy/deliverability/HighLevel implementation approval.

## Product and implementation notes for downstream workers

These are planning notes only; they do not authorize implementation.

### Frontend / product copy

If the Tech GC UI is revised, separate the states clearly:

- Pre-consent browser result: show readiness band, top gaps, and suggested next step.
- Optional email opt-in: “Send me the full report and related educational follow-up” or another attorney-approved version.
- Non-opted confirmation: “No email sequence will be triggered unless you opt in.”
- Avoid copy that says “we’ll send your report” when the user has not consented to email fulfillment.

### API / routing

Preserve these expectations for non-opted Tech GC submissions in preview tests:

- `campaignKey = tech-gc`
- `contact.subscribe = false` or absent
- `campaignRouting.triggerTag = null`
- `campaignRouting.emailSequence = []`
- No `workflow:*` tag
- No `newsletter:ai`
- Include `newsletter:not-consented` if payload tags are generated
- `consent_basis = no_email_opt_in`
- `approval_status = no-auto-send`

### HighLevel

Do not create a separate HighLevel message workflow for non-subscriber fulfillment during Tech GC internal QA. Any future one-time fulfillment email should be specified as a distinct attorney-reviewed transactional path, with separate suppression checks and no nurture trigger.

### Attorney-review tasks

Do not create automatic attorney-review tasks for non-subscribers during initial Tech GC QA. If Jeff later wants this, create a separate approval packet specifying:

- exact high-fit criteria;
- permitted stored fields;
- task title/body;
- retention/evidence rules;
- conflict/suppression checks;
- no-outreach default;
- required human approval before any contact.

## Launch-gate effect

If Jeff accepts the recommended default, the non-subscriber fulfillment blocker can be marked **closed for local/preview/internal QA planning only** with this condition:

- non-subscriber fulfillment is browser/on-page only;
- no outbound delivery is approved;
- HighLevel remains Draft/Off;
- no live CRM write occurs without separate test-record approval;
- public production and activation remain blocked by the existing HighLevel field, workflow guard, legal/copy, privacy, deliverability, and Jeff approval gates.

This does **not** approve public launch, production credentials, live HighLevel activation, contact enrollment, external sends, public publishing, social/LinkedIn/ad action, or Clio activity.

## Decision log

| Decision | Recommendation | Rationale | Open approval |
| --- | --- | --- | --- |
| Non-subscriber default | On-page-only value | Best balance of trust-building, privacy, legal-marketing safety, deliverability, and implementation simplicity. | Jeff/Whiteford approve policy wording. |
| Transactional email | Hold | Useful later, but needs exact sender/copy/footer/suppression/transactional-vs-marketing approval. | Separate legal/privacy/deliverability/HighLevel approval packet. |
| Internal attorney-review task | Hold for later high-fit enhancement | Could help route high-fit users, but should not become backdoor outreach. | Separate task criteria and no-outreach approval. |
| No value beyond generic confirmation | Reject as target | Safe but weak lead magnet; does not solve the narrow problem. | Use only as temporary fallback if on-page result is not available. |

## Immediate next action

Jeff should approve, edit, or reject the recommended wording above. If approved, a downstream product/frontend worker can update Tech GC copy and QA cases so the internal pilot treats on-page-only value as the non-subscriber fulfillment path and continues to block outbound delivery unless separate approvals are completed.
