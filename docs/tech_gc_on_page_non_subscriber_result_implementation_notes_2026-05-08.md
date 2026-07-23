# Tech GC On-Page Non-Subscriber Result Implementation Notes

Task: `t_b06f9df8`
Date: 2026-05-08
Tenant: `whiteford-mountain-west`
Status: internal draft / static prototype only. This document does not authorize production deployment, public publishing, live HighLevel/Supabase/Clio/CRM writes, workflow activation, contact enrollment, external sends, LinkedIn/social action, ads, or any client/prospect-facing change.

## Deliverables

- Static prototype: `docs/tech_gc_on_page_non_subscriber_result_prototype_2026-05-08.html`
- Implementation notes: `docs/tech_gc_on_page_non_subscriber_result_implementation_notes_2026-05-08.md`

## Purpose

Prototype the Tech Company Legal Health Checklist result state for a visitor who completes the checklist but does not affirmatively opt into email updates. The intended policy is on-page-only basic fulfillment: the visitor gets a useful browser result, while email nurture and HighLevel workflow routing remain off.

The business-development principle applied here is narrow-promise fulfillment before nurture. The checklist should give enough immediate educational value to build trust: readiness band, category map, top gaps, and a practical next step. Optional follow-up can be offered, but basic educational fulfillment should not be held hostage to marketing consent.

## Source grounding used

Inputs inspected:

- `docs/lead_magnet_non_subscriber_fulfillment_policy_options_2026-05-08.md`
- `docs/tech_gc_local_no_token_qa_evidence_2026-05-08.md`
- `src/components/tech-gc-legal-health-checklist.tsx`
- `src/app/api/leads/route.ts`

Business-development retrieval run:

```bash
python3 /Users/jeff/.hermes/knowledge/business-development/search_business_dev.py "lead magnet opt in consent trust narrow diagnostic follow up" --index /Users/jeff/.hermes/knowledge/business-development/business_dev_index.sqlite -k 6
```

Relevant synthesized principles, expressed in original Whiteford/Schell IP terms:

- A useful lead magnet should solve or illuminate a narrow problem, not merely tease value.
- The fulfillment moment is where trust is earned; provide the promised diagnostic value promptly.
- Follow-up sequences should be consent-gated, especially for professional-services/legal contexts.
- A high-fit CTA can invite a later review, but it should not imply legal advice, automatic attorney review, outreach, or attorney-client relationship.

QMD check:

```bash
HOME=/Users/jeff /Users/jeff/.nvm/versions/node/v24.15.0/bin/node /Users/jeff/.local/lib/node_modules/@tobilu/qmd/dist/cli/qmd.js search "Tech GC non-subscriber fulfillment on-page value no workflow" --collection whiteford-ai-law-pages --limit 5
```

Result: no direct qmd hits for that exact phrasing. Source grounding therefore relied on the named project docs and the business-development vector retrieval above.

## Prototype state summary

The static prototype shows:

1. Readiness band: `Good foundation with visible gaps`.
2. Readiness score: `66`.
3. Category map: Contract Stack, IP Ownership, Workforce, Data + AI, Financing + Deals.
4. Top gaps:
   - Refresh the contract stack and create a simple intake path for nonstandard terms.
   - Assign contract ownership and define approval rules before renewals or enterprise deals pile up.
   - Close assignment gaps across founders, employees, advisors, and contractors.
   - Put lightweight AI guardrails around confidentiality, human review, vendor terms, and records.
5. Suggested next step: pick one 30-day operating fix, starting with sales paper and contract approval thresholds.
6. Explicit no-email/no-workflow copy for non-subscribers.
7. Separate optional opt-in module that remains unchecked by default.

## Recommended UI separation

### Basic on-page educational fulfillment

This area should be visible after the user completes the checklist and accepts the educational/no-confidential-information gate, regardless of marketing opt-in status:

- readiness band;
- numerical score or score range;
- category scores;
- lowest category / top gaps;
- suggested next step;
- legal/ethics/privacy caveats;
- print/save option.

Recommended non-subscriber fulfillment copy:

> Basic fulfillment is complete on this page. You can review the readiness band, top gaps, and a suggested next step without subscribing to marketing emails. No report email or nurture sequence will be sent unless you affirmatively opt in.

### Optional opt-in module

Keep this visually and operationally separate from the result:

> Optional and unchecked: Send me the full report and related educational follow-up from Whiteford/Schell IP. I can unsubscribe at any time. I understand this form is not for confidential information and does not create an attorney-client relationship.

Recommended non-opt-in confirmation copy:

> You have not requested email follow-up. Your basic educational result remains visible on this page. No email sequence will be triggered unless you choose the optional opt-in path.

Avoid copy such as:

- `We'll send your report` when `contact.subscribe` is false.
- `Your report is on the way` for non-subscribers.
- `A lawyer will review this` unless a separate attorney-review workflow has been approved.
- `We'll follow up` unless the user has affirmatively opted in and all legal/privacy/suppression gates are satisfied.

## Preview / no-token non-opt-in test expectations

For a valid local/no-token Tech GC payload with `contact.subscribe: false` or omitted:

| Expected item | Required value |
| --- | --- |
| `campaignKey` | `tech-gc` |
| `disclaimerAccepted` | `true` |
| `privacyGuardrailVersion` | `lead-magnet-guardrail-v2` |
| `publicFormInputType` | `categorical_non_confidential` |
| `campaignRouting.triggerTag` | `null` |
| `campaignRouting.emailSequence` | `[]` |
| Newsletter tag | `newsletter:not-consented` |
| `consent_basis` custom field | `no_email_opt_in` |
| `approval_status` custom field | `no-auto-send` |
| `workflow:*` tag | absent; especially no `workflow:tech-gc-launchpad` |
| `newsletter:ai` tag | absent |
| HighLevel mode when token/location missing | `preview` |

The static prototype includes these expectations in the right-hand QA table.

## Current source behavior alignment

`src/app/api/leads/route.ts` already supports the desired no-send non-opt-in routing pattern:

- `hasEmailOptIn` is true only when `payload.contact?.subscribe === true`.
- `campaign.triggerTag` is included only when `hasEmailOptIn` is true.
- Non-opt-in payloads receive `newsletter:not-consented`.
- `campaignRouting.triggerTag` is `null` for non-opt-in payloads.
- `campaignRouting.emailSequence` is `[]` for non-opt-in payloads.
- `consent_basis` becomes `no_email_opt_in`.
- `approval_status` becomes `no-auto-send`.
- Client-supplied `assessment.tags` are not copied into CRM tags.

`src/components/tech-gc-legal-health-checklist.tsx` already computes the readiness band, category scores, top gaps, branch signals, and top actions in the browser. A future implementation could revise the success/confirmation copy and opt-in module placement without changing API behavior.

## Suggested implementation approach if Jeff approves a code change later

No production behavior was changed in this task. If Jeff later approves local/staging implementation, a frontend worker can:

1. Keep the existing result preview visible as the basic on-page fulfillment state.
2. Replace any non-opt-in wording that implies transactional delivery with explicit no-email/no-workflow wording.
3. Move optional report/email-follow-up copy into a distinct unchecked opt-in module.
4. Keep `contact.subscribe` default `false`.
5. Keep the submit button available for local/no-token preview testing after email and disclaimer acceptance, but do not require marketing opt-in.
6. Add or adjust tests to assert the non-opt-in UI language and API preview routing expectations.

Potential copy patch targets in `src/components/tech-gc-legal-health-checklist.tsx`:

- Preview success message currently says: `Checklist request captured in preview mode. Marketing updates remain off unless the optional updates box was checked.`
- Non-opt-in helper currently says: `Marketing updates are off. The checklist request can still be submitted with only transactional handling.`

A safer on-page-only version would avoid `transactional handling` unless Jeff later approves a transactional fulfillment path:

> Marketing updates are off. Your basic educational checklist result remains on this page only; no report email, nurture workflow, SMS, DM, social message, or other outbound follow-up is triggered unless you opt in and the approved safeguards apply.

## Safety / approval boundaries

This task created internal draft artifacts only. It did not:

- edit production app code;
- deploy public pages;
- send email/SMS/DM/social messages;
- post or comment on LinkedIn;
- enroll contacts in automations;
- activate or edit live HighLevel workflows;
- create/update live HighLevel, Supabase, Clio, or CRM records;
- launch ads;
- use production credentials.

Future external actions remain blocked until Jeff/Whiteford approve exact copy, channel, recipient/scope, timing, suppression/conflicts status, privacy/ethics review, and implementation evidence.

## Verification performed

Commands were run from `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`.

Planned verification for this static-only artifact:

```bash
python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path
html = Path('docs/tech_gc_on_page_non_subscriber_result_prototype_2026-05-08.html').read_text()
class P(HTMLParser):
    pass
P().feed(html)
required = [
    'Good foundation with visible gaps',
    'No email requested',
    'no workflow triggered',
    'campaignRouting.triggerTag',
    'campaignRouting.emailSequence',
    'newsletter:not-consented',
    'no_email_opt_in',
    'no-auto-send',
    'workflow:tech-gc-launchpad',
]
missing = [item for item in required if item not in html]
if missing:
    raise SystemExit(f'Missing expected prototype strings: {missing}')
print('Tech GC non-subscriber prototype static checks passed')
PY
```

No app tests are required because no `.tsx`, API, or production behavior was changed. If a later code patch is approved, run at minimum:

```bash
npm run test:lead-static
npm run test:leads
npm run lint
```

## Recommended next action

Jeff should review the static prototype and decide whether to approve a local/staging frontend copy patch that makes non-subscriber fulfillment explicitly on-page-only while preserving opt-in-only HighLevel routing.
