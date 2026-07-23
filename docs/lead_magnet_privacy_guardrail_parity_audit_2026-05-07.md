# Lead Magnet Privacy / Consent Guardrail Parity Audit

Task: `t_c465ccd4`
Date: 2026-05-07
Status: internal audit only; no public changes, HighLevel mutations, workflow activation, sends, enrollments, social posts, or CRM record writes performed.

## Executive verdict

The AI Compliance Gameplan Builder is the current guardrail benchmark after task `t_3c73e787`. The remaining lead magnets have partial opt-in-only routing parity through `/api/leads`, but they do not yet have frontend privacy/consent/UI parity with the AI Compliance implementation.

Priority order for remediation:

1. Tech Company Legal Health Checklist / Colorado Tech GC: highest priority because it is intended as the broad first-built app and is already embedded in `/colorado-tech-general-counsel`.
2. AI Patent Strategy Scorecard: high-risk subject matter because patent/inventorship facts can become confidential or matter-specific quickly.
3. Founder M&A Readiness Checklist: high-risk subject matter because transaction timing, counterparties, disputes, financials, employment, and diligence materials can become sensitive quickly.
4. Colorado Startup M&A Lawyer landing page fallback form: should not route generic M&A lead-magnet submissions without the interactive M&A checklist guardrails.

## Strategy and source basis

Docs inspected:

- `docs/lead_magnet_opt_in_and_app_strategy.md`
- `docs/highlevel_campaign_implementation_plan.md`
- `docs/KANBAN_DELIVERABLE_INDEX.md`
- `docs/tech_company_legal_health_checklist_app_spec.md`
- `docs/plans/tech_company_legal_health_checklist_app_spec.md`
- `docs/highlevel_workflow_email_best_practices_synthesis.md` via search result snippets
- `docs/highlevel_ops_research_synthesis.md` via search result snippets
- `docs/production_highlevel_live_capture_smoke_test_2026-05-06.md` via search result snippets

Source/code files inspected:

- `src/components/gameplan-builder.tsx`
- `src/components/patent-scorecard.tsx`
- `src/components/founder-ma-readiness-checklist.tsx`
- `src/components/tech-gc-legal-health-checklist.tsx`
- `src/components/quick-lead-form.tsx`
- `src/components/landing.tsx`
- `src/app/api/leads/route.ts`
- `src/app/ai-patent-strategy-scorecard/page.tsx`
- `src/app/founder-ma-readiness-checklist/page.tsx`
- `src/app/colorado-tech-general-counsel/page.tsx`
- `src/app/colorado-startup-ma-lawyer/page.tsx`

Business-development synthesis used:

- Local RAG command used with explicit index path: `python3 /Users/jeff/.hermes/knowledge/business-development/search_business_dev.py "lead magnet complete solution fulfill promised result before nurture narrow problem email sequence" --index /Users/jeff/.hermes/knowledge/business-development/business_dev_index.sqlite -k 6`.
- Relevant returned sources included `100M Leads` pages 49-54 and `Lead Funnels` page 8.
- Applied principle, in original Whiteford-appropriate terms: each lead magnet should solve one narrow, non-confidential problem completely enough to be useful before a sales conversation; the first fulfillment email should deliver the promised report/checklist first; later nurture should educate and qualify into a bounded offer rather than pressure a generic consultation.

QMD status:

- QMD was checked with `HOME=/Users/jeff /Users/jeff/.local/bin/qmd collection list`; collections exist for `whiteford-ai-law-pages` and `business-development-books`.
- `qmd search "lead magnet"` returned Whiteford and business-development corpus hits.
- A narrower query for privacy/consent returned no results. I therefore relied on direct file inspection plus the local business-development RAG result for the required synthesis.
- Do not use the older Node v24 override for QMD on this machine right now; the installed QMD native module is compiled for Node module version 141 and works under the default Node v25 path when `HOME=/Users/jeff` is set.

## Current benchmark: AI Compliance Gameplan Builder

Inspected file: `src/components/gameplan-builder.tsx`.

Benchmark guardrails present:

- Defines a contact model with `roleCategory` instead of open-ended role-only intake.
- Default marketing opt-in is `subscribe: false`.
- Adds explicit reusable notices:
  - no confidential, proprietary, employee/applicant/customer/patient-specific, trade-secret, privileged, or matter-specific facts;
  - source-current/staging note;
  - conflicts and engagement caveat.
- Requires an educational-use / no-confidential-information / no-attorney-client checkbox before requesting the report.
- Disables answer controls until the disclaimer gate is accepted.
- Uses categorical answer buttons only.
- Labels the output as a non-diagnostic readiness preview.
- Separates transactional report request from optional marketing nurture language in confirmation copy.
- Sends a minimized payload with score, band, tags, maturity level, and report version; it does not transmit the full question-answer record from the frontend.

This is the parity standard the other lead magnets should match.

## Shared server-side routing audit

Inspected file: `src/app/api/leads/route.ts`.

Parity strengths:

- Server-side gating is in place for every known campaign key.
- Workflow trigger tags are added only if `payload.contact?.subscribe === true`.
- Assessment-provided tags are sanitized so client payloads cannot inject `workflow:*` tags.
- Non-consented submissions receive `newsletter:not-consented`, `Consent Basis = no_email_opt_in`, and `Approval Status = no-auto-send`.
- Opted-in submissions receive `newsletter:ai`, `Consent Basis = lead_magnet_email_opt_in:<campaignKey>`, `Approval Status = pending`, and the lane-specific workflow trigger tag.
- `campaignRouting.emailSequence` is empty when not opted in.

Shared server-side gaps:

1. The endpoint still accepts broad `contact.role` free text for the non-AI-Compliance apps.
2. The endpoint does not require a separate disclaimer acknowledgment field; the AI Compliance disclaimer gate is frontend-only, and the other apps do not send such a field.
3. The endpoint has rich custom fields for AI Compliance, AI Patent, and M&A, but Tech GC currently sends generic `readinessChecks` and `selectedUseCases` into AI fields rather than dedicated Tech Legal Health fields.
4. The endpoint can receive and store `maReadiness.answers` and patent check lists. These are categorical today, but should be explicitly constrained to non-confidential enums and compact report outputs.
5. The endpoint returns preview payloads that are useful for QA but should remain internal; do not expose preview payloads containing contact data in public debug surfaces.

Recommended shared API changes:

- Add `disclaimerAccepted?: true` and `reportRequested?: true` to the payload type, and reject report requests for interactive apps when the disclaimer flag is absent.
- For app-specific payloads, accept only known enum values and compact result objects; discard unknown free-text or unexpected object fields.
- Add a `privacy_guardrail_version` custom field per submission, e.g. `lead-magnet-guardrail-v2`.
- Add a shared `input_sensitivity` or `public_form_input_type` custom field with value `categorical_non_confidential`.
- Add Tech GC-specific custom-field mapping rather than overloading AI fields.
- Keep the workflow tag sanitizer; it is a critical cross-lane control.

## Lead magnet gap list and recommended changes

### 1. AI Patent Strategy Scorecard

Primary route/component inspected:

- Route: `/ai-patent-strategy-scorecard`
- Page: `src/app/ai-patent-strategy-scorecard/page.tsx`
- Component: `src/components/patent-scorecard.tsx`
- Campaign lane: `workflow:ai-patent-strategy`

What works now:

- The page metadata and page copy frame the tool as non-confidential.
- The USPTO anchor section states the scorecard does not determine inventorship, patentability, or eligibility.
- The component uses checklist-style categories rather than open-text invention disclosure fields.
- The default opt-in checkbox is unchecked (`subscribe: false`).
- Submission is disabled unless email and subscribe are present.
- `/api/leads` will only add `workflow:ai-patent-strategy` if subscribe is true.
- Footer copy says educational only, no patentability assessment, no legal advice, no attorney-client relationship, and do not submit confidential facts.

Parity gaps:

1. No standalone disclaimer gate before using or submitting the scorecard.
2. No source-current or staging/re-check notice near the report output.
3. No conflict-check / written-engagement caveat near the report gate.
4. Opt-in copy says “related educational emails” but does not expressly mention Whiteford/Schell IP or unsubscribe availability.
5. Submit button requires marketing opt-in to receive the scorecard; this is safe for workflow gating but blurs transactional fulfillment with marketing consent.
6. Role is open text. That is acceptable for a minimal form, but role-category enum would be more data-minimizing and easier to segment.
7. Some answer labels can invite users to think about actual invention records. The UI warns not to submit confidential facts, but the warning should appear before the checklist and adjacent to the report gate.
8. Payload sends `patent.checks`, `aiPatentDocumentationGapMap`, and `aiPatentOwnershipGapMap`. These are currently categorical/derived, but they need a guardrail version and validation so no user-supplied confidential invention details are stored later.

Recommended copy/UI changes:

- Add a pre-question guardrail notice:
  “Use categorical answers only. Do not include invention disclosures, claim charts, source code, unpublished product details, customer names, trade secrets, or facts you would expect counsel to treat as confidential.”
- Add a required checkbox before submission, independent from marketing opt-in:
  “I understand this tool is educational only, uses non-confidential categorical inputs, does not determine inventorship, patentability, eligibility, or filing strategy, and does not create an attorney-client relationship.”
- Update opt-in copy:
  “I agree to receive the AI Patent Strategy Scorecard results and related educational emails from Whiteford/Schell IP. I can unsubscribe at any time. I understand this form is not for confidential information and does not create an attorney-client relationship.”
- Add conflicts caveat near the form:
  “Whiteford can provide legal advice only after conflicts review and a written engagement.”
- Consider allowing a print/save path without email and keeping emailed report delivery opt-in-only until Jeff approves separate transactional email rules.

Recommended data-minimization changes:

- Keep stage as an enum.
- Convert role to `roleCategory` enum.
- Store only score, stage enum, selected checklist keys, score band, and derived gaps; do not store any future open-text invention description unless inside a secure attorney intake after conflicts review.
- Add `ai_patent_report_version = ai-patent-scorecard-privacy-guardrail-v2` and `privacy_guardrail_version = lead-magnet-guardrail-v2`.

HighLevel implications:

- Existing fields in `docs/highlevel_campaign_implementation_plan.md` cover `ai_patent_score`, `ai_patent_stage`, `ai_patent_score_band`, and `ai_patent_checks`.
- Recommended additional fields:
  - `ai_patent_report_version`
  - `ai_patent_privacy_guardrail_version`
  - `public_form_input_type`
  - `disclaimer_acknowledged`
  - optional `role_category`
- Workflow trigger remains `workflow:ai-patent-strategy` only after `lead_magnet_email_opt_in:ai-patent` and `newsletter:ai` are present.

### 2. Founder M&A Readiness Checklist

Primary route/component inspected:

- Standalone route: `/founder-ma-readiness-checklist`
- Page: `src/app/founder-ma-readiness-checklist/page.tsx`
- Component: `src/components/founder-ma-readiness-checklist.tsx`
- Related landing page: `/colorado-startup-ma-lawyer`
- Landing page file: `src/app/colorado-startup-ma-lawyer/page.tsx` via `OfferLandingPage`
- Campaign lane: `workflow:ma-readiness`

What works now:

- Standalone page metadata and hero copy describe a non-confidential readiness checklist.
- Questions are categorical buttons rather than open-text diligence facts.
- The result preview provides a buyer diligence risk map and 60-day cleanup plan before opt-in.
- The result disclaimer states it is not a valuation opinion, deal prediction, legal advice, or attorney-client relationship.
- Default opt-in checkbox is unchecked.
- Submission is disabled unless email and subscribe are present.
- `/api/leads` adds `workflow:ma-readiness` only after subscribe is true.
- Footer warns not to submit confidential facts and avoids transaction outcome guarantees.

Parity gaps:

1. No required disclaimer gate before answering or submitting.
2. No conflict-check / written-engagement caveat near the report gate.
3. No source-current or staging/re-check notice.
4. Opt-in copy does not mention Whiteford/Schell IP or unsubscribe availability.
5. The `timingOptions` include “Already responding to buyer, investor, or strategic partner requests.” That may be useful as a categorical signal, but it increases the likelihood users will think they should disclose active transaction facts.
6. Page copy promises a “buyer diligence risk map.” That is acceptable if framed as educational readiness, but “risk map” should not read as legal risk scoring or deal advice.
7. Payload stores `maReadiness.answers` JSON. It is categorical now, but it should be explicitly versioned and validated to avoid later drift into sensitive data capture.
8. The `/colorado-startup-ma-lawyer` landing page still renders `QuickLeadForm` in `OfferLandingPage` for the M&A offer, which can route a generic lead magnet request without the richer standalone M&A checklist guardrails.

Recommended copy/UI changes:

- Add a pre-question notice:
  “Use categorical answers only. Do not identify buyers, investors, counterparties, employees, customers, disputes, financial terms, diligence requests, valuation expectations, or confidential transaction facts.”
- Add required disclaimer checkbox before report request:
  “I understand this checklist is educational only, uses non-confidential categorical inputs, does not value the company, predict deal outcomes, provide legal advice, or create an attorney-client relationship.”
- Update the band/output label from “Buyer diligence risk map” to “Buyer diligence readiness map” or “Diligence friction map.”
- Update opt-in copy:
  “I agree to receive the Founder M&A Readiness Checklist results and related educational emails from Whiteford/Schell IP. I can unsubscribe at any time. I understand this form is not for confidential transaction information and does not create an attorney-client relationship.”
- Add conflicts caveat:
  “Whiteford can advise only after conflicts review and a written engagement.”
- On `/colorado-startup-ma-lawyer`, replace generic `QuickLeadForm` fallback with a link to `/founder-ma-readiness-checklist#checklist` or embed the guarded interactive checklist.

Recommended data-minimization changes:

- Keep timing as an enum; consider revising the active-process option to “High-priority preparation need” without inviting active request details.
- Store score, band, timing enum, category scores, top cleanup plan, and categorical answer keys only.
- Do not collect counterparty names, revenue, deal size, transaction timing dates, exact diligence requests, disputes, employee matters, or financial details.
- Add `ma_readiness_report_version = founder-ma-readiness-privacy-guardrail-v2` and shared `privacy_guardrail_version`.

HighLevel implications:

- Existing endpoint already maps M&A score, band, timing, category scores, risk map, 60-day plan, answers JSON, and report version.
- Recommended additional fields:
  - `ma_readiness_privacy_guardrail_version`
  - `ma_readiness_input_type`
  - `disclaimer_acknowledged`
  - optional `role_category`
- Do not create or apply branch workflow tags based on M&A responses without separate opt-in or Jeff’s exact current approval.

### 3. Tech Company Legal Health Checklist / Colorado Tech GC

Primary route/component inspected:

- Landing route: `/colorado-tech-general-counsel`
- Page: `src/app/colorado-tech-general-counsel/page.tsx` via `OfferLandingPage`
- Component: `src/components/tech-gc-legal-health-checklist.tsx`
- Generic landing/form component: `src/components/landing.tsx`
- Campaign lane: `workflow:tech-gc-launchpad`

What works now:

- Embedded app appears in the Tech GC lead-magnet section.
- Questions are categorical and cover contract stack, IP ownership, workforce, data/AI, financing, and deal readiness.
- The page says “without sharing confidential facts.”
- Preview shows score, category scores, top gaps, and a recommended service path before the opt-in gate.
- Default subscribe is false.
- Submission is disabled unless email and subscribe are present.
- `/api/leads` adds `workflow:tech-gc-launchpad` only after subscribe is true.
- Current UI includes some educational/no-attorney-client language.

Parity gaps:

1. This is the largest parity gap among the three because it is supposed to be the broad, low-risk first-priority app but has fewer guardrails than the AI Compliance benchmark.
2. No required disclaimer gate before answering or submitting.
3. No explicit conflict-check / written-engagement caveat.
4. No source-current/staging re-check notice.
5. Opt-in copy does not mention Whiteford/Schell IP or unsubscribe availability.
6. Footer says educational material only and no attorney-client relationship, but does not explicitly say no legal advice, no compliance/patentability/transaction outcome guarantees, or no confidential/sensitive facts in the same robust way as the spec.
7. Message after live submission says “The Tech GC nurture path should now be triggered.” This is operationally true after opt-in, but safer copy should emphasize consent-gated routing and report delivery rather than workflow triggering.
8. The component currently sends `readinessChecks` and `selectedUseCases` through generic/AI-oriented endpoint fields. The Tech GC app spec recommends dedicated `techLegalHealth` payload and custom fields, which are not implemented in `/api/leads`.
9. No branch recommendation display currently warns that AI Compliance, AI Patent, or M&A signals are optional separate diagnostics and must not create workflow enrollment.
10. The `QuickLeadForm` fallback still appears elsewhere in `OfferLandingPage` for non-Tech and non-AI-Compliance offers and has weaker consent copy.

Recommended copy/UI changes:

- Add pre-question guardrail notice:
  “Use categorical answers only. Do not include customer names, employee issues, disputes, contract language, financial details, trade secrets, source code, private diligence requests, or other confidential facts.”
- Add required disclaimer checkbox before report request:
  “I understand this checklist is educational only, uses non-confidential categorical inputs, is not legal advice, is not a compliance/patentability/transaction-readiness determination, and does not create an attorney-client relationship.”
- Update opt-in copy to the spec’s stronger version:
  “I agree to receive the Tech Company Legal Health Checklist results and related educational emails from Whiteford/Schell IP. I can unsubscribe at any time. I understand this form is not for confidential information and does not create an attorney-client relationship.”
- Update live success copy:
  “Report request submitted with consent-gated Tech GC routing. Marketing nurture remains limited to the optional educational email path you requested.”
- Add branch note under the preview:
  “If the lowest category is AI/data, invention records, or transaction readiness, consider the matching separate diagnostic. This checklist does not enroll you into another workflow.”

Recommended data-minimization changes:

- Implement the `techLegalHealth` payload described in `docs/plans/tech_company_legal_health_checklist_app_spec.md`.
- Store only score, band, company moment enum, category scores, lowest category, top actions/gaps, branch signals, categorical answer keys, report version, and consent metadata.
- Add sourcePage value `colorado-tech-general-counsel#lead-magnet` for precision.
- Avoid putting Tech GC values into `ai_use_cases` / `ai_readiness_checks` unless intentionally reused for broad reporting; dedicated Tech fields are cleaner.

HighLevel implications:

- Create or verify recommended fields before production use:
  - `tech_legal_health_score`
  - `tech_legal_health_band`
  - `tech_legal_health_next_milestone` or `tech_legal_health_company_moment`
  - `tech_legal_health_lowest_category`
  - `tech_legal_health_top_categories`
  - `tech_legal_health_top_actions`
  - `tech_legal_health_branch_signals`
  - `tech_legal_health_answers_json`
  - `tech_legal_health_report_version`
  - `tech_legal_health_privacy_guardrail_version`
- Use internal signal tags only after approval, e.g. `signal:ai-compliance`, `signal:ai-patent`, `signal:ma-readiness`; never auto-apply other `workflow:*` tags from this app.
- Continue requiring `workflow:tech-gc-launchpad` + `newsletter:ai` + `Consent Basis starts with lead_magnet_email_opt_in:tech-gc` + suppression exclusions before workflow email steps.

### 4. QuickLeadForm fallback forms

Primary files inspected:

- `src/components/quick-lead-form.tsx`
- `src/components/landing.tsx`

Current use:

- In `OfferLandingPage`, `QuickLeadForm` appears for non-AI-Compliance / non-AI-Patent offers in some sections.
- For `/colorado-startup-ma-lawyer`, this means generic M&A lead-magnet capture can still occur outside the richer standalone M&A interactive checklist.
- For `/colorado-tech-general-counsel`, the app is embedded and the meeting panel correctly points back to the checklist rather than using `QuickLeadForm`.

Parity gaps:

1. Consent language is too generic: “Send me this lead magnet and related educational emails.”
2. No Whiteford/Schell IP sender identification in opt-in copy.
3. No unsubscribe language.
4. No required disclaimer acknowledgment beyond a small footer.
5. Generic forms do not fulfill the “complete solution to a narrow problem” standard as well as the interactive apps; they risk becoming a list-building gate rather than a useful advisory tool.
6. Live success copy says “the matching HighLevel nurture path should now be triggered,” which is less user-appropriate than consent-gated report fulfillment language.

Recommended changes:

- Use `QuickLeadForm` only as a temporary fallback when no interactive app exists.
- For M&A, route the CTA to `/founder-ma-readiness-checklist#checklist` instead of showing generic capture on `/colorado-startup-ma-lawyer`.
- If `QuickLeadForm` remains, update opt-in copy to include Whiteford/Schell IP, unsubscribe availability, no confidential information, no legal advice, no attorney-client relationship, and conflicts/written-engagement caveat.
- Prefer “Request the report/checklist” language over “trigger nurture path.”

## Cross-lane HighLevel field/tag implications

Base tags that remain appropriate:

- `whiteford-mountain-west`
- Lead magnet source tags:
  - `leadmagnet:ai-patent-scorecard`
  - `leadmagnet:tech-gc-checklist`
  - `leadmagnet:ma-readiness-checklist`
- Interest tags:
  - `interest:ai-patent-law`
  - `interest:tech-ogc`
  - `interest:ma-readiness`
- Consent status tags:
  - `newsletter:ai` only after opt-in
  - `newsletter:not-consented` when no opt-in

Workflow tags that must remain opt-in-only:

- AI Patent: `workflow:ai-patent-strategy`
- Tech GC: `workflow:tech-gc-launchpad`
- M&A: `workflow:ma-readiness`

Recommended shared custom fields:

- `privacy_guardrail_version`
- `public_form_input_type`
- `disclaimer_acknowledged`
- `report_requested`
- `role_category`
- `source_page_detail` if HighLevel cannot cleanly store route fragments

Recommended app-specific custom fields:

- AI Patent:
  - `ai_patent_report_version`
  - `ai_patent_privacy_guardrail_version`
- Founder M&A:
  - `ma_readiness_privacy_guardrail_version`
  - `ma_readiness_input_type`
- Tech GC:
  - all `tech_legal_health_*` fields listed above.

Suppression / activation implications:

- Manual HighLevel workflows should remain draft/off until Jeff approves exact copy, timing, fields, and QA evidence.
- Workflow logic should check all of the following before any send:
  - lane workflow tag present;
  - `newsletter:ai` present;
  - `Consent Basis` starts with the exact lane prefix;
  - `newsletter:not-consented` absent;
  - `outreach:do-not-send` absent;
  - no DND, unsubscribe, suppression, or conflict marker;
  - `Approval Status` is not `no-auto-send`, `suppressed`, or `revise`;
  - app-specific `privacy_guardrail_version`/`disclaimer_acknowledged` present after the frontend patch is deployed.

## Recommended QA cases

Run these in local/preview first. Do not use real prospects; use Jeff-owned/internal test records only after Jeff approves live smoke testing.

### API routing cases

1. AI Patent, subscribe false:
   - POST `campaignKey: ai-patent`, `contact.subscribe: false`.
   - Expected: no `workflow:ai-patent-strategy`, has `newsletter:not-consented`, `Consent Basis = no_email_opt_in`, `Approval Status = no-auto-send`.
2. AI Patent, subscribe true:
   - Expected: has `workflow:ai-patent-strategy`, `newsletter:ai`, `Consent Basis = lead_magnet_email_opt_in:ai-patent`, no `newsletter:not-consented`.
3. M&A, subscribe false:
   - Expected: no `workflow:ma-readiness`, has `newsletter:not-consented`, no email sequence in response.
4. M&A, subscribe true:
   - Expected: has `workflow:ma-readiness`, `newsletter:ai`, lane-specific consent basis.
5. Tech GC, subscribe false:
   - Expected: no `workflow:tech-gc-launchpad`, has `newsletter:not-consented`, `Approval Status = no-auto-send`.
6. Tech GC, subscribe true:
   - Expected: has `workflow:tech-gc-launchpad`, `newsletter:ai`, lane-specific consent basis.
7. Malicious client tag injection:
   - Include `assessment.tags: ["workflow:ma-readiness", "workflow:ai-patent-strategy"]` in a Tech GC request.
   - Expected: injected `workflow:*` tags are stripped; only the campaign’s own workflow tag may appear, and only if subscribe is true.
8. Missing email:
   - Expected: 400 with no HighLevel upsert.
9. Unknown campaign key:
   - Expected: defaults are safe, or preferably reject unknown keys after a future hardening patch.

### Frontend UX cases

1. All three apps load with opt-in checkbox unchecked.
2. Report/send button remains disabled until email plus required gates are satisfied.
3. If disclaimer gate is added, answers cannot be submitted before it is accepted.
4. No app asks for open-text legal facts, counterparty names, invention details, financial details, employee facts, customer names, source code, claim charts, or private transaction details.
5. Each app displays “educational only,” “not legal advice,” “no attorney-client relationship,” “do not submit confidential information,” and conflicts/written-engagement caveats near the questions and near the report gate.
6. Each app gives meaningful pre-gate value: score/band, category map or gap map, and top next actions before any email opt-in.
7. Confirmation copy says “consent-gated report/checklist routing,” not “workflow triggered,” and does not imply legal advice or representation.
8. Print/save PDF works without sending external messages.
9. Mobile rendering preserves visibility of disclaimers and opt-in language.
10. Keyboard and screen-reader paths can reach and understand disclaimer and opt-in controls.

### HighLevel workflow QA cases

1. Trigger conditions use the exact lane `workflow:*` tag only.
2. Workflow filters require `newsletter:ai` and exact `Consent Basis` prefix.
3. Workflow filters exclude `newsletter:not-consented`, `outreach:do-not-send`, DND, unsubscribe, suppression, conflicts, and `Approval Status` values `no-auto-send`, `suppressed`, and `revise`.
4. No workflow includes SMS, voicemail drop, DM, LinkedIn action, or social publishing.
5. First email fulfills the promised scorecard/checklist/report before any consult CTA.
6. Every email has truthful sender/subject, firm footer/physical address, unsubscribe/preference handling, and legal/ethics disclaimer.
7. Branch signals never trigger another lane without separate opt-in or Jeff’s exact current approval.
8. Workflows remain draft/off until Jeff approves final activation.

## Legal / ethics caveats

- This audit is an internal operations review, not legal advice to any public user or client.
- Public lead magnets must avoid creating a reasonable impression that a tool result is legal advice, a legal conclusion, patentability opinion, compliance determination, valuation opinion, transaction-readiness guarantee, or attorney-client relationship.
- Public forms must not request confidential facts, privileged facts, trade secrets, customer-specific data, employee/applicant/patient facts, exact claim charts, invention disclosures, source code, adverse-party names, private transaction counterparties, disputes, or financial deal terms.
- Whiteford/Schell IP representation can begin only after conflicts review and a written engagement.
- The content must remain educational and source-current; official legal references should be re-checked before any public launch or recording.
- SMS remains out of scope unless separately approved with documented SMS consent and opt-out language.
- No external outreach, CRM mutation, workflow activation, social publishing, LinkedIn tagging, or enrollment is approved by this audit.

## Remediation packet for Jeff approval

Recommended approval scope for next frontend patch:

1. Bring AI Patent, Founder M&A, and Tech GC components to the AI Compliance guardrail standard.
2. Replace generic M&A `QuickLeadForm` usage on `/colorado-startup-ma-lawyer` with a link/embed to `/founder-ma-readiness-checklist#checklist`.
3. Add shared disclaimer/guardrail components to reduce drift across all lead magnets.
4. Add app-specific `reportVersion` and shared `privacy_guardrail_version` fields.
5. Add Tech GC custom-field support to `/api/leads`.
6. Keep all changes local/staging until Jeff approves public deployment and HighLevel workflow activation.

Recommended next Kanban task:

- Assignee: frontend/web worker.
- Title: “Patch remaining lead magnets for AI Compliance privacy/consent guardrail parity.”
- Acceptance criteria: all gaps above remediated in code, API preview tests pass for subscribe true/false and workflow-tag injection, and no live sends or CRM writes occur.
