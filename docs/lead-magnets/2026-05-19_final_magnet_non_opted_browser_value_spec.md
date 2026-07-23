# Final-magnet non-opted browser-value product spec — 2026-05-19

Task: `t_29de8332`
Tenant: `whiteford-mountain-west`
Status: INTERNAL / PRIVATE PRODUCT SPEC ONLY. This file does not approve public launch, deployment, HighLevel/CRM/Supabase/Clio mutation, workflow activation, email/SMS/social send, source/prospect work, or client/prospect-facing use.

## 1. Controlling decision context

Parent decision packet: `docs/lead-magnets/2026-05-19_final_magnet_attorney_privacy_decision_packet.md`.

Controlling invariant:

- Non-opted submissions must not receive newsletter/workflow/email-sequence/auto-send routing.
- Opted-in handling is gated only by a literal unchecked checkbox that becomes `subscribe === true`; opt-in still does not authorize workflow activation, email sequence enrollment, or any live follow-up without separate approval.
- Browser-only value must fulfill the promised diagnostic value before any consultation ask and before any email follow-up request.
- The product path stays educational, categorical, non-hypey, attorney-review-gated, and no-confidential-info.

Recommended posture: build this only as local/no-token product QA until Jeff/Whiteford attorney/privacy approval exists for the exact UX copy, payload semantics, and deployment scope.

## 2. Source inspection performed

Actual app/source files inspected before writing this spec:

- `src/components/lead-magnet-flow.tsx`
  - Current client component uses `useState`, `useMemo`, `useRef`, and `fetch("/api/leads")`.
  - Current `ContactPermissionBlock` combines report/playbook delivery with related educational communications in one required checkbox.
  - Current `AssessmentResultView` already supports on-page score, tier, visual result, prioritized actions, PDF data URL if returned, schedule button, and compliance text.
  - Current `DownloadFlow` confirmation implies email delivery and shows Cal embed after successful submission.
- `src/app/api/leads/route.ts`
  - Current final-magnet validation requires `permission_acknowledged === true`, requires compact non-HTML strings, and treats `payload.subscribe === true` as the only email opt-in.
  - Current final-magnet response adds no workflow trigger tag or email sequence and returns `campaignRouting.emailSequence: []`.
  - Current no-token mode returns preview payload when `GHL_PRIVATE_INTEGRATION_TOKEN` or `GHL_LOCATION_ID` are missing.
- `src/lib/magnets/finalization.ts`
  - Current compliance copy says the tool is informational only, no attorney-client relationship, no confidential/privileged/trade-secret information, conflicts check and engagement letter required, attorney advertising, and no guaranteed similar outcome.
  - Current final magnets are `ai-risk-triage`, `patent-moat-scorecard`, `governance-plan`, and `outside-counsel-playbook`.
- `src/app/globals.css`
  - Current design tokens include `--ink #003756`, `--accent #632ddd`, `--paper`, `--paper-soft`, `--line`, `--risk-high`, `--display`, `--body`, and `--mono`.
  - Current UI classes use `learn-report-card`, `learn-report-kicker`, `learn-report-fields`, `learn-report-option`, `learn-report-consent`, `learn-report-submit`, `learn-result-card`, `learn-result-visual`, and `learn-result-compliance` patterns.
- Next.js docs read under `node_modules/next/dist/docs/`:
  - `01-app/03-api-reference/01-directives/use-client.md`: interactive UI with state/event handlers/browser APIs belongs behind a top-of-file `"use client"` boundary and client props must be serializable.
  - `01-app/03-api-reference/03-file-conventions/route.md`: route handlers use Web `Request`/`Response` APIs and support `POST`; implementation guidance below keeps route handler changes explicit and testable.

Business-development corpus/qmd grounding:

- Business-development RAG search returned `100M Leads` pp.49-51 and `Lead Funnels` pp.8, 13 as the strongest matches. Synthesis only: a lead magnet should solve one narrow problem completely, fulfill the promised value promptly, and earn engaged time/trust before asking for consultation or follow-up.
- QMD search found prior Whiteford guidance for non-opted browser-only value: no workflow tag, no `newsletter:ai`, `campaignRouting.triggerTag = null`, `campaignRouting.emailSequence = []`, `consent_basis = no_email_opt_in`, and `approval_status = no-auto-send`.

## 3. Product goal

Create a final-magnet experience where a user can finish a categorical diagnostic and receive useful on-page/browser-only educational output even if they do not opt into email delivery or educational follow-up.

The browser-only result should be complete enough to stand alone:

- Score or posture band.
- One visual or structured diagnostic summary.
- Three prioritized educational next actions.
- Clear caveats and no-confidential-info warning.
- A non-opted confirmation explaining that no report email, newsletter, workflow, or follow-up was requested.

The opted-in state can additionally confirm requested email/report delivery if attorney/privacy-approved copy exists. It still must not imply workflow authorization, attorney review, conflicts clearance, or engagement.

## 4. State model

### State A — Internal preview / no-token posture

Purpose: local QA and review without live CRM mutation.

Entry conditions:

- Local dev or preview environment has no usable `GHL_PRIVATE_INTEGRATION_TOKEN` or no usable `GHL_LOCATION_ID`.
- No production credentials are introduced for this task.

UI requirements:

- Show an internal-only banner: `Internal preview: no token, no CRM write, no email send.`
- If a preview payload is displayed, redact or use sample values only.
- Make explicit that preview mode is not a public launch and not a privacy/legal approval.

Payload/route requirements:

- If local preview route logic is exercised, returned mode must remain `preview`.
- No HighLevel, Supabase, Clio, email, SMS, social, workflow, or source-provider call.

Suggested copy:

> Internal preview only. This screen uses sample/no-token data to QA browser-only value and consent-state copy. It does not write to HighLevel, send email, enroll workflows, publish a route, or approve public use.

### State B — Unsafe confidential-info warning / blocked start

Purpose: stop users from submitting sensitive matter facts or thinking the tool is legal advice.

Entry conditions:

- User has not acknowledged the no-confidential-info/legal disclaimer.
- User attempts to submit freeform confidential details if any future freeform field exists.
- User attempts to proceed without required categorical answers.

UI requirements:

- Keep the current categorical-only posture.
- Show the warning before the questionnaire and again near result/confirmation.
- Do not collect adverse-party names, unpublished invention details, exact claim charts, transaction counterparty names, sensitive financial/employment details, or matter-specific facts.

Suggested error copy:

> Please use only the categorical choices in this tool. Do not submit confidential, privileged, trade-secret, adverse-party, claim-chart, transaction-counterparty, or other matter-specific information. This tool provides general educational information only and does not create an attorney-client relationship.

### State C — Non-opted browser-only result/value

Purpose: fulfill the lead magnet promise inside the browser without email follow-up.

Entry conditions:

- User completes the categorical assessment.
- User does not check the email/report/follow-up opt-in checkbox.
- User has acknowledged the no-confidential-info/legal disclaimer if that separate acknowledgement is retained.

UI requirements:

- Show `Your result` with score/tier/visual/actions, reusing `AssessmentResultView` patterns where possible.
- Remove or disable PDF/email delivery language unless a browser-generated local file is separately approved.
- Show no calendar embed as the primary next step. A lower-prominence educational CTA may say Jeff can review the result only after conflicts/intake and attorney approval, but the safer default is no scheduling widget in the non-opted state.
- Show a distinct no-opt-in confirmation.

Suggested no-opted confirmation copy:

> Your browser-only result is shown above. Because you did not opt into email delivery or educational follow-up, Whiteford/Schell IP should not send a report, subscribe you to a newsletter, enroll you in a workflow, or route this submission to an auto-send sequence. If you want follow-up later, use a separately approved opt-in path.

Required non-opted routing semantics if any payload is represented in local preview:

- Tags must include `newsletter:not-consented`.
- Tags must not include `newsletter:ai`.
- Tags must not include any `workflow:*` trigger tag.
- Custom fields must include `consent_basis = no_email_opt_in`.
- Custom fields must include `approval_status = no-auto-send`.
- `campaignRouting.triggerTag = null`.
- `campaignRouting.emailSequence = []`.
- No report fulfillment email.
- No newsletter/campaign/sequence enrollment.
- No owner assignment, pipeline movement, stale-opportunity logic, internal sales task, or HighLevel workflow activation.

### State D — Explicit opted-in confirmation

Purpose: confirm an affirmative request for report/email delivery if attorney/privacy-approved copy exists.

Entry conditions:

- Checkbox is unchecked by default.
- User affirmatively checks the exact approved opt-in copy.
- Route receives `subscribe === true` literally.

UI requirements:

- Confirmation must distinguish: requested report/educational email delivery is consent; it is not workflow authorization or attorney-client formation.
- Confirmation must retain unsubscribe/preference, no legal advice, no attorney-client relationship, no confidential info, no guarantees, conflicts/intake caveats.
- Confirmation should not say the user is enrolled in a sequence, assigned to a lawyer, cleared for consultation, or added to a pipeline.

Suggested opted-in confirmation copy:

> You requested the report/email follow-up using the checked consent box. This request does not create an attorney-client relationship, authorize workflow enrollment by itself, or mean Whiteford has cleared conflicts or accepted a matter. Any later external follow-up still needs suppression, unsubscribe/preference, prior-touch, conflicts/intake, and attorney-review gates.

Allowed opted-in routing semantics in local preview only:

- `subscribe === true`.
- `newsletter:ai` may appear as a consent tag.
- `consent_basis = lead_magnet_email_opt_in:<magnet_slug>`.
- `approval_status = pending`.
- Still no final-magnet `workflow:*` trigger tag from this branch.
- Still `campaignRouting.emailSequence = []` unless a separate future task explicitly approves a specific workflow/email sequence.

### State E — No-opt-in confirmation

Purpose: distinguish non-opted completion from an error.

Entry conditions:

- User intentionally leaves the report/email/follow-up checkbox unchecked and completes browser-only result.

UI requirements:

- Do not shame or block the user.
- Do not imply a report is “on its way.”
- Do not hide the result behind email capture.
- Offer a calm explanation of what will not happen.

Suggested copy:

> No email requested. You can use the on-page result now. We should not send the report by email, subscribe you to educational follow-up, or trigger an automated workflow unless you choose a separately approved opt-in path.

## 5. Recommended UX architecture

### Separate acknowledgements

Current UI has one required checkbox that combines email/report/follow-up consent with legal/no-confidential-info acknowledgement. For browser-only value, separate these concepts:

1. Required legal/no-confidential-info acknowledgement:
   - Required before assessment.
   - Does not equal email consent.
   - Suggested state name: `legalAcknowledged`.
2. Optional email/report/follow-up opt-in:
   - Unchecked by default.
   - Not required for browser-only result.
   - Suggested state name: `emailOptIn`.
   - Maps to `subscribe: emailOptIn === true` only.

Implementation note: if production code is later changed, avoid reusing `permissionAcknowledged` as both legal acknowledgement and subscription consent. That ambiguity is the main source of unsafe UX semantics.

### Browser-only completion path

Recommended sequence:

1. Contact step collects only minimum fields needed for local QA/product logic, or for a future approved lead record. Keep fields compact and non-HTML.
2. Required disclaimer checkbox acknowledges no legal advice/no attorney-client/no confidential info.
3. Optional email opt-in checkbox controls report/email follow-up and `subscribe` only.
4. Assessment questions remain categorical radio groups.
5. Submit computes result locally in the browser where feasible or via a no-token/local route that cannot mutate live systems.
6. Result page renders the same score/tier/actions visual for both consent states.
7. Consent-state confirmation appears directly under the result.

### API posture options for a later implementation task

Safer local-only option:

- Add a local browser computation path that uses existing `scoreAssessment` logic client-side or through a no-mutation local route.
- Do not call `/api/leads` for non-opted browser-only value.
- This avoids representing a non-opted browser-only result as a lead capture event.

If a route is required for QA:

- Add an explicit preview-only field such as `delivery_mode: "browser_only"` or `browser_value_only: true`.
- Keep route handler deterministic and no-token in local QA.
- In `handleFinalMagnetSubmission`, do not require `permission_acknowledged` to equal email consent; require legal acknowledgement separately.
- Never call `upsertHighLevel` for non-opted browser-only mode unless a future exact approval authorizes a live CRM write.

Do not implement production code from this spec without separate review.

## 6. Component-level implementation notes for a future task

Suggested refactor boundaries, if Jeff later approves code work:

- In `src/components/lead-magnet-flow.tsx`:
  - Split `ContactState.permissionAcknowledged` into `legalAcknowledged` and `emailOptIn`.
  - Replace `contactReady` / `canSubmit` dependency on opt-in with dependency on `legalAcknowledged` only for browser-only result.
  - Send `subscribe: contact.emailOptIn === true` only for opted-in report/email delivery.
  - Render `ConsentStateConfirmation` under `AssessmentResultView` or inside it.
  - Hide/soften `Download customized PDF report` in non-opted mode unless generated entirely in-browser and attorney/privacy-approved.
  - Replace current immediate `CalInlineEmbed` in download confirmation with a lower-risk next-step block that is consent-state-aware.
- In `src/app/api/leads/route.ts`:
  - Avoid any live `upsertHighLevel` for non-opted browser-only mode unless exact approval exists.
  - Preserve `payload.subscribe === true` as the only email opt-in test.
  - Ensure non-opted response cannot include `newsletter:ai`, any `workflow:*`, or non-empty `campaignRouting.emailSequence`.
- In `src/lib/magnets/finalization.ts`:
  - Update `formDescription` copy that currently says results are “queued to HighLevel for email follow-up” so browser-only value is not misrepresented.
  - Keep `noConfidentialInfoText`, `permissionText`, and `complianceText` attorney-reviewed before public use.
- In `src/app/globals.css`:
  - Reuse existing tokens/classes before adding new styles.
  - New state cards can follow `learn-report-preview`, `learn-report-message.is-error`, and `learn-result-compliance` patterns.

## 7. Prototype artifact

Optional visual artifact created for this task:

`docs/lead-magnets/2026-05-19_final_magnet_non_opted_browser_value_prototype.html`

Prototype properties:

- Self-contained HTML/CSS/JS.
- No external scripts, styles, forms, images, fonts, fetches, iframes, or network calls.
- Uses sample data only.
- Demonstrates five states: internal preview/no-token, unsafe confidential-info warning, non-opted browser-only result/value, explicit opted-in confirmation, and no-opt-in confirmation.
- Uses colors/classes patterned after current `globals.css` tokens and `lead-magnet-flow.tsx` UI structure.

## 8. QA checklist for future implementation

Required deterministic checks before any future code review:

- Static scan: no `workflow:` tag in non-opted payload or response.
- Static scan: non-opted path has no `newsletter:ai`.
- Static scan: non-opted path includes `newsletter:not-consented`, `consent_basis=no_email_opt_in`, and `approval_status=no-auto-send` if any payload is produced.
- Static scan: non-opted path has `campaignRouting.triggerTag = null` and `campaignRouting.emailSequence = []`.
- Unit/API tests for literal-checkbox gating: `subscribe: true` is opted-in; `false`, missing, string, number, null are non-opted.
- UI test or static assertion that the result is visible without checking the email opt-in checkbox.
- UI test or static assertion that no email-delivery copy appears in no-opt-in confirmation.
- Secret/network scan for prototype and local QA artifacts.
- Manual attorney/privacy review of exact public copy before public/client/prospect-facing use.

## 9. Approval boundaries

This spec authorizes no live action. Before any external use, Jeff/Whiteford must separately approve:

1. Exact public UX copy.
2. Exact consent checkbox language and version.
3. Whether non-opted browser-only results may be computed fully client-side or via route handler.
4. Whether any non-opted record may be written anywhere; default is no write.
5. Whether opted-in report delivery may send email and by what system.
6. Whether any HighLevel workflow/campaign/newsletter/tag/pipeline behavior may be activated.
7. Privacy-policy, cookie/tracking, attorney-advertising, conflicts/intake, unsubscribe/preference, suppression/DND, and prior-touch gates.

Recommended next decision: Jeff should approve or revise the local/no-token product QA concept only, with no deployment and no live-system mutation.
