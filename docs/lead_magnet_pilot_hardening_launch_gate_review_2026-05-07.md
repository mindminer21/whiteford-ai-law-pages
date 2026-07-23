# Lead Magnet Pilot Hardening Launch-Gate Review

Task: `t_41db31aa`
Reviewed at: 2026-05-07 05:57 MDT
Status: internal review only. No external/public action, email/SMS/DM/social/LinkedIn/ad send, HighLevel activation, workflow enrollment, live CRM mutation, production environment change, Clio write, or public/client-facing publication was performed.

## Executive verdict

Verdict: **PASS for internal controlled pilot QA preparation only; NOT APPROVED for public production, live HighLevel activation, external outreach, or live CRM writes.**

The hardening tranche materially improves the system since the prior privacy/guardrail parity review. The two core engineering blockers from the prior review are now closed for local/staging review: `/api/leads` enforces server-side disclaimer/version/schema gates before the preview/live HighLevel branch, and AI Compliance now uses shared `lead-magnet-guardrail-v2` parity with runnable static tests.

However, the HighLevel layer is still not field-complete or UI-verified. Read-only HighLevel evidence confirms all four lane workflows are still `draft`, which is safety-positive, but only 6 of 37 required guardrail/mapped custom fields currently exist and step-level suppression/DND/unsubscribe/consent/disclaimer/version guards are not API-readable. The system is therefore ready only for local/no-token internal QA and approval-packet review. It remains blocked for public pilot, production env credential enablement, live HighLevel activation, external sends, contact enrollment, and any client/prospect-facing action.

Recommended first lane if Jeff later approves internal QA: **Tech GC / Tech Company Legal Health Checklist**, because it is the broadest and lower-risk educational operating-readiness lane. Even that lane must remain local/preview only until HighLevel missing fields and UI guard evidence are closed.

## Sources and evidence inspected

### Parent and tranche deliverables

- `docs/api_leads_server_guardrail_hardening_2026-05-07.md`
- `docs/ai_compliance_guardrail_test_parity_2026-05-07.md`
- `docs/ai_compliance_gameplan_fulfillment_nurture_copy_2026-05-07.md`
- `docs/highlevel_guardrail_v2_field_workflow_verification_2026-05-07.md`
- `docs/highlevel_guardrail_v2_api_probe_2026-05-07.json`
- `docs/controlled_pilot_approval_packet_tech_gc_default_2026-05-07.md`
- Prior launch-gate review: `docs/lead_magnet_privacy_guardrail_parity_review_2026-05-07.md`
- Deliverable index: `docs/KANBAN_DELIVERABLE_INDEX.md`

### Code and test evidence inspected

- `src/app/api/leads/route.ts`
  - Confirms approved constants `lead-magnet-guardrail-v2` and `categorical_non_confidential`.
  - Confirms known interactive report requests require `disclaimerAccepted === true` and approved guardrail version before payload construction proceeds.
  - Confirms `publicFormInputType` is checked when present.
  - Confirms shared guardrail/report fields are mapped into custom fields after validation.
  - Confirms client-supplied routing tags are not relied on for workflow enrollment; tests verify malicious client tags are stripped/discarded.
- `src/components/gameplan-builder.tsx`
  - Confirms AI Compliance now imports shared guardrail metadata.
  - Confirms default `subscribe: false`.
  - Confirms disclaimer gate state and disabled report button until disclaimer acceptance.
  - Confirms AI Compliance submits `disclaimerAccepted`, `reportRequested: true`, `privacyGuardrailVersion`, `publicFormInputType`, `readinessHeatMap`, `tenDayFixes`, `roadmap306090`, and `ai-compliance-gameplan-privacy-guardrail-v2`.
- `tests/verify_lead_magnet_static_guardrails.mjs`
- `tests/verify_lead_magnet_api_consent.mjs`
- `tests/test_lead_magnet_apps_static.py` as documented legacy direct-execution coverage.

### Retrieval grounding

- Business-development corpus query run:
  - `python3 /Users/jeff/.hermes/knowledge/business-development/search_business_dev.py "legal lead magnet privacy consent data minimization email nurture professional services" --index /Users/jeff/.hermes/knowledge/business-development/business_dev_index.sqlite -k 4`
  - Results included `Lead Funnels` and `100M Leads` entries. Applied only as synthesized principle: deliver the promised educational value narrowly and build trust before nurture; do not force marketing consent as the price of the basic lead-magnet value.
- QMD project retrieval run:
  - `HOME=/Users/jeff /Users/jeff/.local/bin/qmd search "lead magnet privacy consent HighLevel guardrail" --collection whiteford-ai-law-pages --limit 5`
  - Returned Whiteford HighLevel funnel material reinforcing suppression and non-consented handling.

### Verification commands run in this review

From `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`:

1. `npm run test:lead-static`
   - Result: passed.
   - Output: four-app static guardrail parity passed for disclaimer gates, unchecked optional marketing consent, report request without opt-in, shared guardrail metadata, compact payload tokens, and no frontend workflow trigger tags.
2. `npm run test:leads`
   - Result: passed in no-token preview mode.
   - Output: API guardrail behavior passed for disclaimer/version gates, payload schema rejection, malicious tag stripping, campaign fallback, opt-in-only workflows, and non-opt-in routing.
   - Note: existing Node `MODULE_TYPELESS_PACKAGE_JSON` warning remains non-failing.
3. `npm run lint`
   - Result: passed.
4. `npm run build`
   - Result: passed. Next.js 16.2.4 compiled expected routes including `/ai-compliance-gameplan`, `/api/leads`, `/ai-patent-strategy-scorecard`, `/founder-ma-readiness-checklist`, and `/colorado-tech-general-counsel`.

## Prior blockers status

| Prior blocker from `lead_magnet_privacy_guardrail_parity_review_2026-05-07.md` | Current status | Evidence and notes |
| --- | --- | --- |
| 1. `/api/leads` records but does not enforce disclaimer gate | **Closed for local/staging/internal QA** | `docs/api_leads_server_guardrail_hardening_2026-05-07.md` and `npm run test:leads` confirm known report requests require disclaimer acceptance and approved guardrail version before preview/live branch construction. Still requires Jeff approval before production env credentials or live writes. |
| 2. API too permissive for data minimization | **Closed for local/staging/internal QA; production approval still pending** | Server hardening added compact schema checks, string/array/object caps, approved keys, score ranges, and client-tag removal. Negative API tests passed. Public production still requires final privacy review and live-field mapping verification. |
| 3. AI Compliance benchmark/payload drift | **Closed** | AI Compliance now adopts shared `lead-magnet-guardrail-v2`; `npm run test:lead-static`, `npm run test:leads`, lint, and build pass. |
| 4. Live HighLevel mutation path not launch-approved | **Still open / blocking live HighLevel use** | The API is safer, but production HighLevel credentials, non-subscriber CRM creation/update policy, Jeff-owned TEST-record scope, and rollback still require explicit Jeff approval. No live CRM writes were performed in this review. |
| 5. HighLevel custom fields and workflow guards assumed, not verified | **Partially closed / still blocking** | Read-only API verifies all four workflows are `draft`, but only 6 of 37 required fields exist. Step-level workflow guards are not exposed by the read-only API and require UI screenshot/DOM verification. |
| 6. Non-subscriber transactional handling unresolved | **Still open / policy approval required** | Non-opted preview behavior keeps no workflow trigger and `Approval Status = no-auto-send`; this is safe for no-send QA. Jeff/Whiteford still must decide whether non-subscribers receive only on-page value, one-time transactional email, internal attorney-review task, or no outbound delivery. |

## HighLevel launch-gate status

| Area | Status | Review finding |
| --- | --- | --- |
| Workflow activation state | **Pass for safety; not enough for launch** | API evidence confirms all four workflows are `draft`: AI Compliance `682ada5f-fa1e-4411-97d6-a1e019139614`, AI Patent `8dbff7fd-caa0-49b3-ba16-bd46b4a1f1d7`, Founder M&A `4be5ea96-b497-4149-be72-f38aa136da35`, Tech GC `dee4450a-1b7b-4597-9fa4-9c7b7423b848`. |
| Custom field readiness | **Fail / blocker** | HighLevel field verification found 6 existing and 31 missing guardrail/mapped fields. Live-field smoke testing and workflow activation must wait until approved field creation and re-verification. |
| Step-level workflow guards | **Unverified / blocker** | Public/read-only workflow APIs do not expose full branch/message-step logic. UI evidence is required for DND, unsubscribe, suppression, consent basis, newsletter tags, approval status, disclaimer, guardrail version, input type, source route, and no-send exits before any external action. |
| Copy packet readiness | **Draft-only / attorney review required** | AI Compliance copy packet is comprehensive and safety-conscious but explicitly marked draft/attorney-review-only. Tech GC is recommended as first QA lane; exact public copy and email/report copy still require Jeff/Whiteford approval. |
| Internal controlled QA readiness | **Conditionally ready for local/no-token QA only** | Local/no-token tests can continue. Realistic live-field smoke testing is blocked until missing fields exist and Jeff approves exact TEST records/env scope. |
| Public production/live activation | **Blocked** | Missing fields, missing UI guard evidence, non-subscriber policy, sender/footer/unsubscribe/preference approval, current-law/legal-marketing review, and Jeff activation approval are all outstanding. |

## Legal, marketing, privacy, data-minimization, consent, and suppression caveats

- Legal marketing: keep all public and email copy educational and practical. Do not imply legal advice, compliance determination, certification, specialization, guaranteed outcome, risk elimination, customer/regulator acceptance, deal success, or future-proofing.
- Attorney-client relationship: public forms, scorecards, reports, emails, and calls must state that no attorney-client relationship is formed; representation requires conflicts checks and a separate written engagement agreement.
- Confidentiality: public forms and email replies must continue to prohibit confidential, privileged, proprietary, customer-specific, employee/applicant-specific, patient-specific, regulated, trade-secret, adverse-party, or matter-specific facts.
- Data minimization: keep payloads categorical and compact; preserve server-side schema/allowlists; do not add free-text intake fields or broad JSON storage without a new review.
- Consent separation: report/checklist value must not require marketing opt-in. Marketing nurture can run only after affirmative, specific opt-in with `newsletter:ai`, matching consent basis, and absence of `newsletter:not-consented`.
- Non-subscriber handling: default safe state remains no-send/no-auto-send. Do not send a one-time transactional report email until Jeff approves the exact channel, content, sender, footer, suppression checks, timing, and implementation.
- Suppression/DND/unsubscribe: any future HighLevel message step must exit or skip if DND, unsubscribe, bounce, suppression, `outreach:do-not-send`, `ops:no-auto-send`, `newsletter:not-consented`, disqualifying `Approval Status`, conflicts/adverse-party/firm-review hold, missing consent basis, missing approved copy version, missing disclaimer, or wrong guardrail/input version is present.
- Current-law review: AI Compliance references, Colorado/Mountain West posture, employment/HR AI statements, privacy/security statements, vendor/data claims, and score-band labels require current-law/source review before public use.
- External outreach: no imported, researched, enriched, current-client, third-party, or prospect records may be enrolled in these workflows unless the exact contact separately opted in to the exact lead magnet or Jeff gives a separate, specific, compliant approval.

## Exact Jeff approvals needed next

Jeff should approve or reject the following in order:

1. Missing HighLevel field list in `docs/highlevel_guardrail_v2_field_workflow_verification_2026-05-07.md`.
2. Method for field remediation: manual HighLevel UI creation by an approved operator, or a separately approved safe field-creation script for the exact field list only.
3. UI evidence task for all four workflows, or at minimum the selected first lane, while workflows remain Draft/Off: trigger source, consent, suppression, DND, unsubscribe, approval status, disclaimer/version/input-type, and no external side effects.
4. First internal controlled-QA lane decision: default recommendation is Tech GC; AI Compliance remains the timely backup only if Jeff wants the higher-current-law-sensitivity AI governance lane first.
5. Exact internal QA scope: local/no-token only by default; any live HighLevel TEST-record write requires separate approval of records, env scope, time window, rollback, and evidence capture.
6. Non-subscriber fulfillment policy: on-page only, one-time transactional email, internal attorney-review task, or no outbound delivery.
7. Final copy/legal/ethics/privacy/current-law/brand/deliverability approval for the selected lane before any public-facing use.
8. Separate activation packet before any production env credentials, workflow activation, enrollment, external sends, public publish, social/LinkedIn/ad action, Clio write, or prospect/client-facing change.

## Deliverable index verification

`docs/KANBAN_DELIVERABLE_INDEX.md` was inspected. It already includes entries for the useful hardening artifacts:

- `docs/api_leads_server_guardrail_hardening_2026-05-07.md`
- `docs/ai_compliance_guardrail_test_parity_2026-05-07.md`
- `docs/ai_compliance_gameplan_fulfillment_nurture_copy_2026-05-07.md`
- `docs/highlevel_guardrail_v2_field_workflow_verification_2026-05-07.md`
- `docs/highlevel_guardrail_v2_api_probe_2026-05-07.json`
- `docs/controlled_pilot_approval_packet_tech_gc_default_2026-05-07.md`

This review also updates the index to add the present launch-gate review and correct malformed table pipes on recent entries.

## Final recommendation

Proceed with internal controlled pilot QA planning only. The local/staging engineering gate is substantially improved and tests pass, so the system can support no-token/local QA and Jeff approval review. Do not proceed to public production, live HighLevel activation, workflow enrollment, external outreach, production env credential addition, or live CRM writes until HighLevel missing fields are created/re-verified, UI-level workflow guards are captured, non-subscriber delivery policy is approved, and Jeff signs a separate activation/test-record packet.
