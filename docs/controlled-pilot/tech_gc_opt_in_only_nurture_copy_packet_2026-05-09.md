# Tech GC Opt-In-Only Nurture Copy Packet — Attorney Review Draft

Task: `t_333ea4b5`
Date: 2026-05-09
Tenant: `whiteford-mountain-west`
Status: Draft copy only for Jeff, attorney, ethics, privacy/CRM, brand, source-current, and deliverability review. Do not publish, send, activate, enroll, tag, sync, import, upload to HighLevel, or use externally without separate approval.

Primary lane: Tech Company Legal Health Checklist
Primary route / CTA route: `/colorado-tech-general-counsel`
Recommended offer: Tech Company OGC Launchpad
HighLevel draft workflow name: `WF - Whiteford - Tech GC Launchpad - Draft`
Controlling rule: fulfill the narrow browser diagnostic first; send report or nurture email only after affirmative Tech GC email opt-in and suppression review.

This packet does not authorize any HighLevel workflow edit, email send, enrollment, SMS, DM, social post, LinkedIn action, public publish, ad, Clio write, Supabase write, CRM mutation, or live-system test.

## 1. Source grounding and synthesis

Inputs reviewed:

- `docs/highlevel_campaign_implementation_plan.md`, Tech Company Legal Health Checklist section.
- `docs/controlled-pilot/tech_gc_local_no_token_qa_harness_plan_2026-05-09.md`.
- `docs/tech_gc_non_subscriber_on_page_copy_packet_2026-05-08.md`.
- `docs/tech_gc_legal_health_checklist_fulfillment_nurture_copy_2026-05-07.md` for prior lane language and field/tag mapping.

Business-development corpus retrieval used for synthesis:

```bash
python3 /Users/jeff/.hermes/knowledge/business-development/search_business_dev.py "lead magnet diagnostic value before opt in educational follow up consent professional services funnel" -k 6
```

Applied synthesis, without reproducing source passages:

- A lead magnet should solve one narrow, useful problem before asking for a deeper next step.
- The Tech GC checklist should deliver an on-page legal operating snapshot even when the user does not opt into email.
- Follow-up should be short, consent-based, educational, and tied to a bounded next step rather than urgency or broad claims.
- Copy should help an operator interpret the checklist, choose one cleanup workstream, and decide whether a scoped OGC Launchpad review may be worth discussing.

## 2. Controlling copy posture

Use these rules across the emails, browser-only copy, and HighLevel notes:

- Educational information only; not legal advice.
- No attorney-client relationship from the checklist, browser result, report request, email receipt, CTA click, or scheduling inquiry.
- No confidential information should be submitted through public forms or email replies unless representation is established after conflicts checks and written engagement terms.
- No statement that a company is compliant, noncompliant, protected, fundable, acquirable, customer-ready, diligence-ready, safe, or legally exposed.
- No guarantee of outcome, timing, risk reduction, customer acceptance, financing, diligence, transaction success, compliance, or representation.
- No scarcity, panic, or pressure language.
- No silent enrollment in adjacent AI Patent, AI Compliance, M&A, newsletter, LinkedIn, SMS, or social workflows.
- No automatic follow-up for non-opted users.
- All public-facing use requires legal, ethics, privacy/CRM, brand, source-current, deliverability, route, sender/footer, unsubscribe, and suppression review.

Recommended universal disclaimer / footer:

> This email and the related checklist are educational information only and are not legal advice. Using the checklist, submitting a form, receiving a report, reading these emails, or clicking a scheduling link does not create an attorney-client relationship. Please do not send confidential information unless and until conflict checks, scope confirmation, and a separate written engagement agreement are complete.

Recommended consent footer:

> You are receiving this because you affirmatively requested the Tech Company Legal Health Checklist report and related educational emails from Whiteford/Schell IP. You can unsubscribe at any time.

## 3. HighLevel lane mapping for attorney/deliverability review

HighLevel location:

- Whiteford Schell IP: `tm68WWMrcAa3TqQbEAMa`.

Tags from implementation plan:

| Tag | HighLevel id | Use |
| --- | --- | --- |
| `whiteford-mountain-west` | `UgFtJxRzDJuuXzwv0O7d` | Project/location marker. |
| `workflow:tech-gc-launchpad` | `JUG30WwG9bNmdUzT2Tn9` | Trigger tag for the draft/off Tech GC nurture workflow, only after affirmative opt-in. |
| `leadmagnet:tech-gc-checklist` | `J5hcj9jHgrmkTlfAz9AX` | Lead magnet source tag. |
| `interest:tech-ogc` | `U3IETGpVAAUsCA2GAdX4` | Interest segmentation for Tech OGC. |
| `newsletter:ai` | `DWMSyc3Cw4jH1JuzGF23` | Email/newsletter consent marker, only after affirmative opt-in. |
| `newsletter:not-consented` | `PuS7pqcwDAgU9CzjjgCD` | Explicit non-consent/no-nurture marker. |

Shared contact fields from the implementation plan:

| Field | App/API key | HighLevel key/id | Recommended value |
| --- | --- | --- | --- |
| Campaign Key | `campaign_key` | `contact.campaign_key` / `Qz7tTt2gHbiIKEuOKf9Q` | `tech-gc` |
| Campaign Label | `campaign_label` | `contact.campaign_label` / `ktyUD9eDp9A3v5WVNzvu` | `Tech GC Launchpad Nurture` |
| Authority Pillar | `authority_pillar` | `contact.authority_pillar` / `UQ78yAPlH4UAIZ8juHR0` | `Tech Outside General Counsel` |
| Source Page | `source_page` | `contact.source_page` / `INEppd3YGJBDLfHerE9a` | `/colorado-tech-general-counsel#lead-magnet` or approved equivalent |
| Source Channel | `source_channel` | `contact.source_channel` / `qBbuCGIureBlrA5sHmRf` | `website`, `local-no-token-harness`, or other approved source |
| Lead Magnet | `lead_magnet` | `contact.lead_magnet` / `e3SJHNsUNdW67ouLWFYQ` | `Tech Company Legal Health Checklist` |
| Recommended Offer | `recommended_offer` | `contact.recommended_offer` / `edel6dKsWHAFFUlB2mBM` | `Tech Company OGC Launchpad` |
| Role | `role` | `contact.role` / `bDDyFlZKHlwIULA2OqgJ` | Submitted role, if provided |

Additional guardrail fields referenced in the QA harness / app logic and requiring confirmation before production use:

- `consent_basis`.
- `approval_status`.
- `privacy_guardrail_version`.
- `public_form_input_type`.
- `tech_legal_health_score`.
- `tech_legal_health_band`.
- `tech_legal_health_lowest_category`.
- `tech_legal_health_top_actions`.
- `tech_legal_health_branch_signals`.
- `tech_legal_health_report_version`.

## 4. Consent and suppression rules before any email is sent

### Opted-in path required conditions

Send these emails only when all conditions below are true:

1. The user affirmatively opted in to receive the Tech Company Legal Health Checklist report and related educational emails.
2. Opt-in checkbox was unchecked by default and checked by the user.
3. `consent_basis` starts with `lead_magnet_email_opt_in:tech-gc`.
4. `newsletter:ai` is present.
5. `workflow:tech-gc-launchpad` is present only because the approved Tech GC source and opt-in conditions passed.
6. `leadmagnet:tech-gc-checklist`, `interest:tech-ogc`, and `whiteford-mountain-west` are present as source/segmentation tags.
7. `newsletter:not-consented` is absent.
8. `approval_status` is not `no-auto-send`, `suppressed`, `revise`, or any equivalent hold state.
9. DND, unsubscribe, bounce, suppression, internal hold, conflicts hold, privacy hold, and deliverability holds all pass.
10. Workflow remains draft/off until Jeff approves QA and activation separately.
11. Sender identity, firm footer/address, unsubscribe/preference handling, and approved CTA URL are configured and reviewed.
12. No SMS, voicemail, DM, LinkedIn, social, ad, Clio, Supabase, or cross-lane workflow action is attached.

### Non-opted path required behavior

If the user does not affirmatively opt in, or if `contact.subscribe` is omitted:

- Fulfill the narrow diagnostic in the browser/on-page result.
- Do not send a report email.
- Do not send this nurture sequence.
- Do not add `workflow:tech-gc-launchpad`.
- Do not add `newsletter:ai`.
- Add or preserve `newsletter:not-consented` if the app generates tags.
- Set or preserve `consent_basis = no_email_opt_in`.
- Set or preserve `approval_status = no-auto-send`.
- Keep `campaignRouting.triggerTag = null`.
- Keep `campaignRouting.emailSequence = []`.
- Do not create any automatic attorney-review task, outbound follow-up, newsletter sequence, SMS, social/LinkedIn action, or adjacent-lane nurture.

## 5. Non-opted browser-only copy guardrails

Use this copy posture for people who complete the checklist but do not opt into email:

### Browser result status note

Your browser snapshot is available on this page. Because you did not opt into email, no Tech GC report email, nurture sequence, SMS, DM, social message, LinkedIn action, or automatic outbound follow-up should be triggered from this checklist.

### Save/print note

If you want to keep the snapshot, save or print this page before leaving. The browser result is the fulfillment path unless you affirmatively request the emailed report and related educational follow-up.

### Optional later opt-in note

If you later decide you want the report and short educational follow-up, you can opt in before leaving this page. Email follow-up is optional and should remain subject to approved workflow, suppression, unsubscribe, privacy, and attorney-review guardrails.

### Do-not-use phrases for non-opted users

Do not use:

- “Your report is on the way.”
- “Check your inbox.”
- “We’ll email your report.”
- “Watch for follow-up.”
- “A lawyer will review your answers.”
- “We’ll contact you about your results.”
- “You have a legal risk.”
- “You are ready / not ready for financing, enterprise sales, or acquisition.”
- “We can fix this.”
- “Guaranteed 30-day cleanup.”
- “Send contracts, invention details, source code, employee issues, customer disputes, security incidents, or confidential facts.”

## 6. Email sequence overview

Sequence status: Draft for attorney review only.

Recommended timing, subject to deliverability and workflow review:

1. Email 1: Immediate, only after opt-in — fulfill the promised report and explain how to use it.
2. Email 2: Day 2 — interpret the score as a business-milestone triage tool, not a legal conclusion.
3. Email 3: Day 5 or Day 6 — choose one cleanup workstream and assign ownership.
4. Email 4: Day 9 or Day 12 — offer the Tech Company OGC Launchpad as a bounded next step.

Every email CTA should route to `/colorado-tech-general-counsel` unless Jeff approves a separate scheduling URL or UTM route.

## 7. Email draft 1 — Immediate fulfillment

Purpose: Deliver the promised report first, set expectations, and avoid turning the first touch into a sales pitch.

Subject options:

1. Your Tech Company Legal Health Checklist report
2. Your legal health snapshot is ready
3. Your checklist report for the next operating milestone

Preview text options:

1. Start with the score band, then choose one cleanup workstream.
2. A practical way to read the category map without treating it as legal advice.
3. Contracts, IP ownership, hiring, privacy, AI/data, and diligence in one operating view.

Body draft:

Hi {{contact.first_name}},

Here is your Tech Company Legal Health Checklist report:

{{custom.report_link_or_summary}}

The checklist is meant to help a growing technology company spot where legal operating cleanup may deserve attention before the next business milestone. It looks across contracts, IP ownership, hiring and contractor records, privacy/security, AI/data governance, corporate records, and diligence readiness.

A practical way to use the report:

1. Start with the overall score band.
2. Look at the lowest-scoring category.
3. Compare that category to the next business event in front of the company: enterprise sales, hiring, financing, AI/data expansion, partnership, or diligence.
4. Choose one cleanup workstream for the next 10 days.

The score is an educational triage signal. It is not a legal opinion, compliance determination, diligence finding, or statement that the company is ready or not ready for a transaction, customer review, financing, or launch.

If several categories appear connected, the next useful step may be sequencing rather than trying to fix everything at once. The Tech Company OGC Launchpad is a bounded review path for turning the checklist into a practical legal operating plan, subject to conflict checks, scope fit, and separate engagement terms.

CTA: Review the Tech Company OGC Launchpad
CTA route: `/colorado-tech-general-counsel`

Best,

Jeff Schell
Whiteford / Schell IP

Consent footer:

You are receiving this because you affirmatively requested the Tech Company Legal Health Checklist report and related educational emails from Whiteford/Schell IP. You can unsubscribe at any time.

Required disclaimer:

This email and the related checklist are educational information only and are not legal advice. Using the checklist, submitting a form, receiving a report, reading these emails, or clicking a scheduling link does not create an attorney-client relationship. Please do not send confidential information unless and until conflict checks, scope confirmation, and a separate written engagement agreement are complete.

Personalization placeholders to verify before use:

- `{{contact.first_name}}`
- `{{custom.report_link_or_summary}}`
- `{{custom.tech_legal_health_score}}`
- `{{custom.tech_legal_health_band}}`
- `{{custom.tech_legal_health_lowest_category}}`
- `{{custom.tech_legal_health_top_actions}}`

## 8. Email draft 2 — How to read the score

Purpose: Teach interpretation. Reinforce that the score is useful only when tied to a business event.

Subject options:

1. How to read your legal health score
2. The useful question behind the score
3. Match the checklist to your next milestone

Preview text options:

1. The most important category is often the one tied to the next business event.
2. The score is a triage tool, not a legal conclusion.
3. Use the category map to choose the first operating workstream.

Body draft:

Hi {{contact.first_name}},

A legal health score is most useful when it is connected to the next business event in front of the company.

For a technology company, the priority can shift quickly:

- Enterprise sales often put pressure on contract templates, security exhibits, DPAs, privacy answers, and product claims.
- Hiring or contractor growth often puts pressure on confidentiality, assignment, contributor, onboarding, and offboarding records.
- AI/data expansion often puts pressure on vendor terms, data use, human review, documentation, and customer-facing statements.
- Financing, acquisition, or diligence conversations often put pressure on IP ownership, corporate approvals, customer contracts, employment records, and records organization.

That is why the checklist should not be read as “good” or “bad.” A more useful question is:

Which category, if left unowned or stale, is most likely to slow the next milestone?

If one category clearly matches the next business event, start there. If several categories are connected, build a simple owner map: what exists, who owns it, where it lives, what is stale, and what questions should be reviewed with counsel if they are material.

CTA: Compare the checklist to the Tech Company OGC Launchpad
CTA route: `/colorado-tech-general-counsel`

Best,

Jeff Schell
Whiteford / Schell IP

Consent footer:

You are receiving this because you affirmatively requested the Tech Company Legal Health Checklist report and related educational emails from Whiteford/Schell IP. You can unsubscribe at any time.

Required disclaimer:

Educational information only. Not legal advice. No attorney-client relationship is formed by using the checklist, submitting a form, receiving this email, or clicking a CTA. Please do not reply with confidential information unless representation is established after conflict checks and a written engagement agreement.

## 9. Email draft 3 — Choose one cleanup workstream

Purpose: Help the reader turn the diagnostic into a manageable internal operating step.

Subject options:

1. Choose one legal operating workstream
2. The next step is not to fix everything
3. A 10-day cleanup map for the category that matters most

Preview text options:

1. Pick one category, assign an owner, and make the next review visible.
2. Contracts, IP, hiring, privacy, AI/data, or diligence — start where the milestone is.
3. A short inventory often beats a rushed rewrite.

Body draft:

Hi {{contact.first_name}},

The most useful follow-up to the checklist is usually not a broad legal reset. It is a visible first workstream.

Choose the category most connected to the company’s next milestone and make a short 10-day inventory:

1. What documents, policies, approvals, records, or templates already exist?
2. Who owns them internally?
3. Where are they stored?
4. What appears stale, inconsistent, missing, or hard to explain?
5. What questions should be reviewed with counsel if they are material to the business?

Examples:

- If enterprise sales is the milestone, start with customer paper, security/privacy answers, DPA status, contract fallback positions, and approval thresholds.
- If product or AI/data expansion is the milestone, start with tool/vendor review, data use, human review, customer-facing statements, and records.
- If financing or diligence is the milestone, start with IP ownership, corporate approvals, major contracts, contributor records, and an organized diligence folder.

The goal is not to create a legal conclusion from the checklist. The goal is to make the first operating gap visible enough to decide what needs company-specific review.

CTA: Learn how the OGC Launchpad sequences the first 30 days
CTA route: `/colorado-tech-general-counsel`

Best,

Jeff Schell
Whiteford / Schell IP

Consent footer:

You are receiving this because you affirmatively requested the Tech Company Legal Health Checklist report and related educational emails from Whiteford/Schell IP. You can unsubscribe at any time.

Required disclaimer:

Educational information only. Not legal advice. No attorney-client relationship is formed. Do not send confidential contracts, employee facts, invention details, customer disputes, regulated data, security incidents, or other confidential information unless representation is established after conflict checks and a written engagement agreement.

## 10. Email draft 4 — Bounded OGC Launchpad invitation

Purpose: Offer a restrained, practical next step after value and education have been delivered.

Subject options:

1. Turning the checklist into a 30-day legal operating plan
2. When a legal health snapshot needs sequencing
3. A bounded next step after the checklist

Preview text options:

1. If several categories are connected, the next step may be sequencing.
2. The OGC Launchpad is designed to organize legal operating work around the next milestone.
3. A practical review path, subject to conflicts, scope fit, and engagement terms.

Body draft:

Hi {{contact.first_name}},

If the checklist surfaced one clear category, the next step may be simple: inventory the records, assign an owner, and decide what needs review before the next milestone.

If it surfaced several connected categories, sequencing may be more useful.

The Tech Company OGC Launchpad is designed as a bounded review for technology-company operators who want to align legal infrastructure with the business event in front of them. Depending on scope and fit, the review may focus on items such as:

- contract stack and approval workflow;
- IP ownership and contributor records;
- hiring, contractor, confidentiality, and assignment documentation;
- privacy/security and customer assurance materials;
- AI/data governance intake and vendor review;
- corporate records and financing/diligence readiness.

The purpose is practical sequencing: what to address first, what can wait, what needs an owner, and what should become repeatable.

This is not a promise that any review will eliminate risk, produce a particular business outcome, or result in representation. Any representation would require conflict checks, scope confirmation, and a separate written engagement agreement.

CTA: Review the Tech Company OGC Launchpad
CTA route: `/colorado-tech-general-counsel`

Best,

Jeff Schell
Whiteford / Schell IP

Consent footer:

You are receiving this because you affirmatively requested the Tech Company Legal Health Checklist report and related educational emails from Whiteford/Schell IP. You can unsubscribe at any time.

Required disclaimer:

Educational information only. Not legal advice. No attorney-client relationship is formed by using the checklist, receiving this email, clicking a CTA, or requesting information. Representation, if any, would require conflict checks, scope confirmation, and a separate written engagement agreement.

## 11. CTA language library

Use CTA language that routes to `/colorado-tech-general-counsel` unless Jeff approves a separate scheduling URL.

Primary CTA:

- Button: Review the Tech Company OGC Launchpad
- Helper: A bounded review path for turning legal operating gaps into a practical plan, subject to conflicts checks, scope fit, and separate engagement terms.

Softer CTA:

- Button: Learn about the OGC Launchpad
- Helper: Educational next step only. No legal advice, attorney-client relationship, or outcome guarantee.

Report-based CTA:

- Button: Compare my checklist to the OGC Launchpad
- Helper: Use the checklist as a starting point for deciding whether a scoped legal operating review may be useful.

Scheduling-gated CTA, if Jeff later approves a calendar link:

- Button: Request a fit discussion
- Helper: Scheduling or requesting a discussion does not create an attorney-client relationship. Representation would require conflict checks and a separate written engagement agreement.

Do not use CTA language that implies immediate representation, a free legal opinion, guaranteed cleanup, guaranteed readiness, or automatic attorney review.

## 12. HighLevel draft workflow setup notes

Draft workflow name:

- `WF - Whiteford - Tech GC Launchpad - Draft`.

Trigger:

- Contact Tag Added = `workflow:tech-gc-launchpad`.

Required workflow-level filters / if-conditions before any email step:

- Tag `newsletter:ai` is present.
- Tag `newsletter:not-consented` is absent.
- `consent_basis` starts with `lead_magnet_email_opt_in:tech-gc`.
- `approval_status` is not `no-auto-send`, `suppressed`, `revise`, or equivalent hold status.
- Contact is not DND, unsubscribed, bounced, suppressed, or on an internal no-send list.
- Source page is an approved Tech GC checklist route such as `/colorado-tech-general-counsel#lead-magnet`.
- No imported, enriched, researched, manually created, Agent Targeting, Clio, LinkedIn, or non-lead-magnet contacts are enrolled unless they separately opted into this exact Tech GC path and Jeff approves the compliant source.

Suggested internal workflow note:

> Draft/off only. Email steps may run only for affirmative Tech GC report/follow-up opt-ins that pass suppression, unsubscribe, DND, consent-basis, source-page, privacy, and attorney-review gates. Non-opted users must remain browser-only/no-auto-send. No SMS, social, LinkedIn, Clio, Supabase, or adjacent-lane enrollment.

## 13. QA checklist before any HighLevel copy entry or activation

Do not enter, activate, send, or enroll unless all are true:

- Jeff approves the exact copy and route.
- Attorney/legal marketing ethics review approves the copy posture.
- Privacy/CRM review approves data collection, retention, no-confidential warnings, suppression, and consent evidence.
- Deliverability review approves sender identity, physical address/footer, unsubscribe/preference handling, and suppression logic.
- Brand review approves Whiteford/Schell IP naming and tone.
- Source-current review confirms any Colorado, AI/data, privacy/security, and Tech GC references remain current.
- The opt-in checkbox remains unchecked by default.
- Non-opted and subscribe-omitted cases have no workflow tag, no email sequence, no `newsletter:ai`, and no delivery implication.
- Opted-in preview cases show `workflow:tech-gc-launchpad`, `newsletter:ai`, and consent basis only in no-token/local preview until live testing is separately approved.
- Test evidence confirms no live HighLevel send/enrollment occurs during local/no-token QA.
- All HighLevel workflows remain draft/off until a separate activation approval.

## 14. Reviewer notes and open decisions

Open decisions for Jeff/reviewers:

- Confirm whether the sequence should be 3 emails or 4 emails for the first internal pilot.
- Confirm exact timing intervals and whether Email 4 should be held until after initial deliverability testing.
- Confirm final route, UTM policy, and any approved scheduling link.
- Confirm sender identity, signature block, firm footer/address, unsubscribe/preference text, and privacy-policy link.
- Confirm whether any report link/summary token is available before Email 1 is drafted into HighLevel.
- Confirm that HighLevel guardrail fields exist and are readable before activation.

Recommended default for first internal pilot:

- Use Email 1 through Email 3 only for the first local/no-token and controlled QA evidence pass.
- Keep Email 4 as an attorney-reviewed draft until Jeff approves the CTA route, sender/footer, deliverability posture, and OGC Launchpad fit language.

## 15. Final status

This packet is ready for internal attorney, ethics, privacy/CRM, brand, source-current, and deliverability review. It intentionally preserves the browser-only value path for non-opted users, limits email to affirmative Tech GC opt-ins, and avoids legal advice, attorney-client relationship implications, guarantees, scarcity pressure, or live-system authorization.
