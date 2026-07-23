# Lead Magnet Privacy / Consent Guardrail Parity Launch-Gate Review

Task: `t_775076c9`
Parent implementation: `t_d36fd046`
Reviewed at: 2026-05-07 00:58 MDT
Status: review only. No publish, deploy, HighLevel activation, enrollment, email/SMS/DM/social send, live CRM mutation, LinkedIn action, ad action, tag write, comment, or Clio write was performed.

## Executive launch-gate verdict

Verdict: **FAIL / NOT APPROVED for public production use, public pilot, or live HighLevel activation.**

The parent patch materially improves the AI Patent Strategy Scorecard, Founder M&A Readiness Checklist, Tech Company Legal Health Checklist, and fallback form posture. It adds stronger no-confidential notices, disclaimer gates, optional unchecked marketing consent, minimized/versioned payload metadata, Tech GC-specific API fields, and preserves the critical opt-in-only workflow tag gate.

However, the remaining launch blockers are still important enough to stop any public pilot or production use until Jeff/Whiteford approve exact copy and the engineering/HighLevel safety gates below are closed. The code is acceptable only for internal/local/staging review at this point.

## Sources and evidence reviewed

### Parent and prior review docs

- `docs/lead_magnet_privacy_guardrail_parity_patch_2026-05-07.md`
- `docs/lead_magnet_privacy_guardrail_parity_audit_2026-05-07.md`
- `docs/highlevel_workflow_email_best_practices_synthesis.md` snippets on suppression/DND/unsubscribe gates
- `docs/highlevel_draft_off_workflow_implementation_packets.md` snippets on draft/off workflow requirements
- QMD search: `HOME=/Users/jeff /Users/jeff/.local/bin/qmd search "lead magnet privacy consent attorney client confidential HighLevel" --collection whiteford-ai-law-pages --limit 8`
  - Returned prior SEO/legal-ethics risk review noting launch-readiness risk around attorney advertising/firm approval, current-law framing, and diagnostic-looking scorecard outputs.
- Business-development RAG: `python3 /Users/jeff/.hermes/knowledge/business-development/search_business_dev.py "lead magnet complete solution opt in consent email sequence narrow problem" --index /Users/jeff/.hermes/knowledge/business-development/business_dev_index.sqlite -k 6`
  - Returned sources including `100M Leads` pp. 49-54 and `Lead Funnels` pp. 8, 13.
  - Applied only as synthesized principle: the lead magnet should fulfill a narrow educational promise before nurture and should not force marketing consent as the price of basic promised value.

### Code reviewed

- `src/components/lead-magnet-guardrails.tsx`
- `src/components/patent-scorecard.tsx`
- `src/components/founder-ma-readiness-checklist.tsx`
- `src/components/tech-gc-legal-health-checklist.tsx`
- `src/components/quick-lead-form.tsx`
- `src/components/landing.tsx`
- `src/components/gameplan-builder.tsx`
- `src/app/api/leads/route.ts`
- `src/lib/campaigns.ts`
- `tests/verify_lead_magnet_api_consent.mjs`
- `tests/test_lead_magnet_apps_static.py`

### Verification commands

Run from `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`:

1. `npm run lint`
   - Result: passed.
2. `npm run test:leads`
   - Result: passed in no-token preview mode.
   - Coverage shown by test output: four campaigns x opted-in/non-opted/missing subscribe, malicious workflow tags, invalid campaign fallback, expected email sequence lengths, and no workflow tags without opt-in.
   - Existing warning: Node module type warning for TypeScript route import.
3. `npm run build`
   - Result: passed. Next.js 16.2.4 compiled and generated expected routes.
4. `python3 -m pytest -q tests/test_lead_magnet_apps_static.py`
   - Result: not executable because this Python environment lacks `pytest`.
5. Direct Python execution of the static assertions in `tests/test_lead_magnet_apps_static.py`
   - Result: failed at `test_ai_compliance_gameplan_has_roadmap_payload_and_consent_copy` because `src/components/gameplan-builder.tsx` does not contain the expected `tenDayFixes` token.
   - This is a QA blocker because the documented benchmark/test expectation no longer matches the AI Compliance frontend payload.

## Launch-gate checklist

| Area | Gate result | Review notes |
| --- | --- | --- |
| Legal-marketing claims | Conditional / needs approval | Patched copy mostly uses educational, readiness, scorecard/checklist, and counsel-review framing. Public copy still needs Jeff/Whiteford review because score/band labels, service-path CTAs, and source-current wording can still read as diagnostic if displayed without final disclaimers and attorney-advertising review. |
| No-confidential prompts | Improved but not launch-ready | The patched AI Patent, M&A, Tech GC, and fallback forms have visible no-confidential prompts and disabled inputs until disclaimer acceptance. Server-side validation still does not reject or scrub unexpected open-text/object fields, so the backend remains too trusting for production. |
| No attorney-client relationship | Improved but approval-required | The UI includes no-attorney-client language and conflicts/written-engagement caveats. Exact public-facing wording still needs Jeff/Whiteford approval before publication. |
| Data minimization | Improved but blocker remains | Frontends now send compact scores, enums/categories, answer keys, report versions, and guardrail metadata. The API still accepts broad JSON objects and arbitrary strings for several payload areas and custom fields; it does not enforce known enums, size limits, or field allowlists beyond the fields it chooses to map. |
| Consent separation | Frontend pass / backend partial | Patched frontends allow report/checklist request without marketing opt-in and keep marketing boxes unchecked. `/api/leads` adds workflow tags and email sequences only when `contact.subscribe === true`. But transactional report-delivery rules for non-subscribers are still undefined and should not be assumed approved. |
| HighLevel tag/workflow safety | Preview pass / production not approved | The test verifies workflow tag stripping and opt-in-only trigger tags in preview mode. Live HighLevel workflow state, field availability, suppression exits, DND checks, and draft/off message-step status still need manual verification before any production use. |
| Unsubscribe / suppression assumptions | Not approved for external sends | UI opt-in copy mentions unsubscribe. No unsubscribe/preference link implementation, physical footer, sender identity, DND/suppression exit, or HighLevel live workflow execution path was validated in this task. |
| QA evidence | Mixed | `lint`, `test:leads`, and `build` pass. Static lead-magnet app test is not runnable via pytest in this environment and fails when called directly due to AI Compliance benchmark drift. Add/update runnable tests before launch. |
| Jeff/Whiteford approval | Required | Approval remains required for exact copy, public deployment, production HighLevel env use, workflows, fields, sends, transactional email rules, and any external/public action. |

## Blocking findings before any public pilot

### 1. `/api/leads` records but does not enforce the disclaimer gate

File: `src/app/api/leads/route.ts`

The patched frontends send `disclaimerAccepted` and `reportRequested`, and the API maps `disclaimer_acknowledged` / `report_requested` custom fields when present. But the API still accepts a report request without `disclaimerAccepted === true`.

Why this blocks launch: a public endpoint should not rely only on client-side UI gates for no-confidential/no-attorney-client guardrails. A crafted request can bypass the frontend and still create/update a HighLevel contact if production HighLevel credentials are present.

Required before launch:

- For known interactive lead magnets, reject `reportRequested === true` unless `disclaimerAccepted === true` and `privacyGuardrailVersion` matches the approved version.
- Return a safe 400 error without upserting to HighLevel.
- Add API tests for missing disclaimer, false disclaimer, missing guardrail version, and unexpected version.

### 2. The API remains too permissive for data minimization

File: `src/app/api/leads/route.ts`

The endpoint maps many compact fields, but it does not validate payload shape, known enum values, object sizes, string lengths, or unexpected content. It also still accepts arbitrary `assessment.tags` except `workflow:*` tags, and broad object values for items such as category scores, gap maps, answers JSON, selected use cases, readiness checks, and recommended next steps.

Why this blocks launch: the public-facing privacy promise depends on categorical, non-confidential inputs. Without server-side schema enforcement, a user or script can still submit sensitive facts inside accepted JSON fields or long string values that may be stored in HighLevel.

Required before launch:

- Add per-campaign schemas/allowlists for known enum keys and value ranges.
- Cap string and array lengths.
- Discard or reject unexpected object keys.
- Restrict client-supplied tags to approved non-workflow signal/tag prefixes, or stop accepting client tags entirely except derived server-side tags.
- Add tests proving confidential-looking free text is not stored in preview custom fields.

### 3. AI Compliance benchmark/payload drift is now a QA blocker

File: `src/components/gameplan-builder.tsx`

The prior audit treated AI Compliance Gameplan Builder as the guardrail benchmark. But current static test expectations do not match the component:

- `tests/test_lead_magnet_apps_static.py` expects `tenDayFixes`, `roadmap306090`, and `readinessHeatMap` in the component.
- Direct execution fails because `tenDayFixes` is missing.
- The component computes `roadmap306090`, but the submit payload only sends `maturityLevel` and `reportVersion` inside `aiComplianceGameplan`; it does not send disclaimer/guardrail fields in the same shared way as the newer patched apps.

Why this blocks launch: the system cannot use AI Compliance as the parity benchmark while the benchmark app and its test expectations are inconsistent.

Required before launch:

- Decide whether AI Compliance should be updated to the new shared `lead-magnet-guardrail-v2` metadata and richer minimized payload, or whether tests/docs should be revised to the actual approved payload.
- Make the static tests runnable in the local environment or convert them into an npm script.
- Add regression tests across all four interactive apps for disclaimer gate, unchecked opt-in, submit allowed without marketing opt-in, guardrail version, and compact payload shape.

### 4. Live HighLevel mutation path is not launch-approved

File: `src/app/api/leads/route.ts`

When `GHL_PRIVATE_INTEGRATION_TOKEN` and `GHL_LOCATION_ID` are present, `/api/leads` performs a HighLevel contact upsert. That may be intended for production lead capture, but for this launch gate the live mutation path was not tested or approved.

Why this blocks launch: even non-subscribed contacts may be created/updated in HighLevel with lead-magnet metadata. That is a CRM write, and the task guardrails require approval before external actions or live CRM mutation. It also does not check HighLevel DND/unsubscribe/suppression/conflict state before upsert.

Required before launch:

- Jeff must explicitly approve whether non-subscribed report requests may create/update CRM records and under what privacy notice.
- Confirm production env credentials are off until that approval exists, or add a server-side feature flag that keeps the endpoint preview-only.
- Add a live-smoke-test plan using Jeff-owned/internal test contacts only, with rollback steps.

### 5. HighLevel custom fields and workflow guards are assumed, not verified here

The patch maps new fields such as:

- `privacy_guardrail_version`
- `public_form_input_type`
- `disclaimer_acknowledged`
- `report_requested`
- `ai_patent_privacy_guardrail_version`
- `ma_readiness_privacy_guardrail_version`
- `tech_legal_health_*`

But this review did not verify those fields exist in HighLevel or that workflows require them before any external action.

Required before launch:

- Verify every mapped custom field exists in the Whiteford Schell IP location.
- Confirm all lane workflows remain draft/off or manual-start until approved.
- Confirm external message steps exit or do not run when any of these are true: unsubscribed, DND, suppression, `outreach:do-not-send`, `newsletter:not-consented`, missing `newsletter:ai`, `Approval Status = no-auto-send/suppressed/revise`, missing matching consent basis, missing approved copy version, or missing `disclaimer_acknowledged` / `privacy_guardrail_version`.

### 6. Non-subscriber transactional handling is unresolved

The patched UI tells non-subscribers that the request can be submitted with “transactional handling.” That is safer than forcing marketing opt-in, but the exact delivery mechanism is not approved.

Required before launch:

- Decide whether non-subscribers receive only on-page/printable results, a one-time transactional email, or an internal attorney-review task with no outbound delivery.
- If a one-time transactional email is approved, define sender, footer, unsubscribe/preference handling if applicable, suppression checks, content, timing, and HighLevel implementation separately from marketing nurture.

## Non-blocking but recommended fixes

1. Replace operational copy in `src/components/landing.tsx` that says generic forms route users into a “HighLevel tag-triggered nurture path.” Public-facing copy should say consent-gated report/checklist request and optional educational follow-up.
2. Convert `QuickLeadForm` role from open text to the shared `roleCategoryOptions` enum, or keep QuickLeadForm disabled for all legal lead magnets until a specific guarded use case is approved.
3. Change public source-current wording away from “internal review draft” before launch. It is helpful for staging but not polished public copy.
4. Use “request checklist/report” and “print/save” language consistently; avoid implying that checking the optional marketing box is required to receive useful lead-magnet value.
5. Consider moving approved tag derivation fully server-side by campaign and score band rather than accepting any client-provided non-workflow tags.

## What the parent patch does well

- Adds strong no-confidential-information prompts before intake and again near the result/request section.
- Adds required frontend disclaimer gates for AI Patent, Founder M&A, Tech GC, and QuickLeadForm.
- Keeps marketing opt-in unchecked by default.
- Allows report/checklist request without requiring marketing opt-in.
- Preserves `/api/leads` workflow-trigger tag gating based on `contact.subscribe === true`.
- Strips client-supplied `workflow:*` tags, including case/whitespace variants verified by `npm run test:leads`.
- Adds app-specific Tech GC API fields rather than overloading AI Compliance fields for the Tech GC app.
- Replaces the M&A landing-page generic capture with a route to the guarded standalone M&A checklist.

## Required approval packet before production/public use

Jeff/Whiteford should approve the exact packet below before any public deployment, HighLevel live env enablement, workflow activation, external send, social post, CRM mutation beyond approved capture, or Clio write:

1. Final public copy for each lead magnet, including no-confidential prompts, educational/non-advice language, no-attorney-client disclaimer, conflicts/written-engagement caveat, source-current wording, score/band labels, service-path CTAs, and attorney-advertising/firm-brand posture.
2. Data-handling decision for non-subscribed report requests: on-page only, transactional email, internal task only, or another approved path.
3. Server-side guardrail enforcement for disclaimer/version/payload schema.
4. HighLevel custom-field existence and exact field-key mapping.
5. HighLevel workflow screenshots/evidence showing draft/off/manual-start status and all suppression/DND/unsubscribe/consent/approval exits before any external message step.
6. QA evidence for all four interactive apps and `/api/leads`, including negative tests and Jeff-owned/internal live smoke-test plan only after approval.
7. Rollback plan for production env variables and workflow activation.

## Final recommendation

Do not launch a public pilot yet. Treat the parent patch as a good staging remediation, then run a focused hardening pass on server-side enforcement, AI Compliance benchmark/test parity, HighLevel field/workflow verification, and non-subscriber transactional-delivery policy. After those are closed, Jeff/Whiteford can review an approval packet for a controlled Jeff-owned test-record pilot before any public use.
