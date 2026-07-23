# Lead API Opt-In Gating Audit — t_f4abf859

Generated: 2026-05-06
Scope: `src/app/api/leads/route.ts`, `src/components/quick-lead-form.tsx`, `src/components/gameplan-builder.tsx`, `src/components/patent-scorecard.tsx`, and `src/lib/campaigns.ts`.
Safety: no external sends, no HighLevel writes, no contact enrollment, no workflow activation.

## Verdict

PASS after one defensive API fix.

The website lead API now enforces opt-in-only workflow trigger routing at the server boundary. A direct API caller cannot obtain a `workflow:*` trigger tag from client-supplied `assessment.tags`; the only workflow trigger tag that can be added is the server-selected campaign lane tag, and only when `contact.subscribe === true`.

## Code fix made

File changed: `src/app/api/leads/route.ts`

Fix:
- Added `isWorkflowTriggerTag(tag)` to identify `workflow:*` tags case-insensitively.
- Added `assessmentTags` sanitization so client-supplied `payload.assessment.tags` excludes all workflow trigger tags before tags are merged.

Why it was required:
- Before the fix, non-consented direct API submissions did not receive `campaign.triggerTag`, but a malicious or buggy client could still include `assessment.tags: ["workflow:ai-patent-strategy"]` and the API would pass it through to HighLevel.
- That violated the hard rule that non-consented submissions must not receive any `workflow:*` trigger tag.

Current relevant behavior:
- `hasEmailOptIn` is true only when `payload.contact?.subscribe === true`.
- `campaign.triggerTag` is included only under `hasEmailOptIn`.
- `newsletter:ai` is included only under `hasEmailOptIn`.
- `newsletter:not-consented` is included when not opted in.
- `consent_basis` is `lead_magnet_email_opt_in:${campaignKey}` only when opted in; otherwise `no_email_opt_in`.
- `approval_status` is `pending` when opted in; otherwise `no-auto-send`.
- `campaignRouting.emailSequence` is `campaign.emails` only when opted in; otherwise `[]`.

## Findings

### Critical / blocking

None remaining after the API sanitizer fix.

### Warnings

1. UI forms currently disable lead submission unless the opt-in checkbox is checked.
   - Files: `quick-lead-form.tsx`, `gameplan-builder.tsx`, `patent-scorecard.tsx`.
   - This is safe for automation because non-opted browser users cannot submit into HighLevel from the UI.
   - It means `newsletter:not-consented` / `no-auto-send` behavior is primarily a direct API safety path, not a normal browser lead-capture path.
   - If Jeff wants to capture non-subscribed downloads or assessment events for analytics/CRM review, the UI should allow submit without opt-in while labeling the action as no email consent. That should be a separate product decision.

2. Browser success messages still say the nurture path should be triggered after live submit.
   - Files: `quick-lead-form.tsx`, `patent-scorecard.tsx`, `gameplan-builder.tsx`.
   - Because buttons require opt-in, the current messages are not false for normal UI submits.
   - If UI later permits non-opt-in submissions, messages must branch on `data.campaignRouting.triggerTag` and avoid implying nurture trigger for non-consented records.

### Looks good

- All checked lead-capture components default opt-in to unchecked (`subscribe: false`).
- All checked lead-capture buttons require the opt-in checkbox before browser submission.
- The four campaign lanes contain the expected server-side trigger tags:
  - AI Compliance Gameplan Builder -> `workflow:ai-compliance-readiness`
  - AI Patent Strategy Scorecard -> `workflow:ai-patent-strategy`
  - Tech Company Legal Health Checklist -> `workflow:tech-gc-launchpad`
  - Founder M&A Readiness Checklist -> `workflow:ma-readiness`
- The API uses preview mode when HighLevel credentials are absent and does not send email itself.
- The legal/privacy copy in the interactive components uses educational-only / no attorney-client / no confidential information language.

## Exact QA test cases

Use preview/dry-run mode only. Do not include real HighLevel credentials while running these tests unless Jeff explicitly approves a live CRM write.

### API tests

1. Non-opted AI Compliance submission
   - Request: `POST /api/leads` with `campaignKey: "ai-compliance"`, `contact.email`, and `contact.subscribe: false`.
   - Expected `payload.tags`: includes `whiteford-mountain-west`, `leadmagnet:ai-compliance-gameplan`, `interest:ai-compliance`, `newsletter:not-consented`.
   - Expected absent: every tag starting with `workflow:`; `newsletter:ai`.
   - Expected custom fields: `consent_basis = no_email_opt_in`; `approval_status = no-auto-send`.
   - Expected routing: `campaignRouting.triggerTag = null`; `campaignRouting.emailSequence = []`.

2. Opted-in AI Compliance submission
   - Request: same as test 1, but `contact.subscribe: true`.
   - Expected `payload.tags`: includes `newsletter:ai` and `workflow:ai-compliance-readiness`.
   - Expected absent: `newsletter:not-consented`.
   - Expected custom fields: `consent_basis = lead_magnet_email_opt_in:ai-compliance`; `approval_status = pending`.
   - Expected routing: `campaignRouting.triggerTag = workflow:ai-compliance-readiness`; `campaignRouting.emailSequence.length = 4`.

3. Non-opted AI Patent submission
   - Request: `campaignKey: "ai-patent"`, `contact.subscribe: false`.
   - Expected tags: `leadmagnet:ai-patent-scorecard`, `interest:ai-patent-law`, `newsletter:not-consented`.
   - Expected absent: `workflow:ai-patent-strategy`; every other `workflow:*`; `newsletter:ai`.
   - Expected routing: `triggerTag = null`; `emailSequence = []`.

4. Opted-in AI Patent submission
   - Request: `campaignKey: "ai-patent"`, `contact.subscribe: true`.
   - Expected tags: `newsletter:ai`, `workflow:ai-patent-strategy`.
   - Expected routing: `triggerTag = workflow:ai-patent-strategy`; `emailSequence.length = 4`.

5. Non-opted Tech GC submission
   - Request: `campaignKey: "tech-gc"`, `contact.subscribe: false`.
   - Expected tags: `leadmagnet:tech-gc-checklist`, `interest:tech-ogc`, `newsletter:not-consented`.
   - Expected absent: `workflow:tech-gc-launchpad`; every other `workflow:*`; `newsletter:ai`.
   - Expected routing: `triggerTag = null`; `emailSequence = []`.

6. Opted-in Tech GC submission
   - Request: `campaignKey: "tech-gc"`, `contact.subscribe: true`.
   - Expected tags: `newsletter:ai`, `workflow:tech-gc-launchpad`.
   - Expected routing: `triggerTag = workflow:tech-gc-launchpad`; `emailSequence.length = 4`.

7. Non-opted M&A Readiness submission
   - Request: `campaignKey: "ma-readiness"`, `contact.subscribe: false`.
   - Expected tags: `leadmagnet:ma-readiness-checklist`, `interest:ma-readiness`, `newsletter:not-consented`.
   - Expected absent: `workflow:ma-readiness`; every other `workflow:*`; `newsletter:ai`.
   - Expected routing: `triggerTag = null`; `emailSequence = []`.

8. Opted-in M&A Readiness submission
   - Request: `campaignKey: "ma-readiness"`, `contact.subscribe: true`.
   - Expected tags: `newsletter:ai`, `workflow:ma-readiness`.
   - Expected routing: `triggerTag = workflow:ma-readiness`; `emailSequence.length = 4`.

9. Malicious non-opted client-supplied workflow tag
   - Request: `campaignKey: "ai-compliance"`, `contact.subscribe: false`, `assessment.tags: ["workflow:ai-patent-strategy", "ai-use:vendor"]`.
   - Expected tags: includes `ai-use:vendor` and `newsletter:not-consented`.
   - Expected absent: `workflow:ai-patent-strategy`, `workflow:ai-compliance-readiness`, and every other `workflow:*`.
   - Expected routing: `triggerTag = null`; `emailSequence = []`.

10. Malicious opted-in client-supplied wrong workflow tag
    - Request: `campaignKey: "ai-compliance"`, `contact.subscribe: true`, `assessment.tags: ["workflow:ai-patent-strategy", "ai-use:vendor"]`.
    - Expected tags: includes `workflow:ai-compliance-readiness`, `newsletter:ai`, and `ai-use:vendor`.
    - Expected absent: `workflow:ai-patent-strategy`.
    - Expected routing: `triggerTag = workflow:ai-compliance-readiness` only.

11. Missing/falsey subscribe field
    - Request: omit `contact.subscribe`, or set it to `false`, `null`, `"true"`, or `1`.
    - Expected: treated as not opted in because only literal boolean `true` counts.
    - Expected absent: every `workflow:*` tag and `newsletter:ai`.
    - Expected: `newsletter:not-consented`, `consent_basis = no_email_opt_in`, `approval_status = no-auto-send`, `emailSequence = []`.

12. Invalid/missing campaign key
    - Request: `campaignKey: "unknown-lane"`, `contact.subscribe: true`.
    - Expected: safe fallback to `ai-compliance` lane.
    - Expected tags: `workflow:ai-compliance-readiness`, not any other workflow tag.
    - Note: this is safe but should be monitored because a typo silently routes to AI Compliance.

### UI tests

13. QuickLeadForm unchecked checkbox
    - Load a page using `QuickLeadForm`.
    - Enter an email, leave checkbox unchecked.
    - Expected: submit button remains disabled; checkbox is unchecked by default.

14. QuickLeadForm checked checkbox
    - Enter an email, check the opt-in box.
    - Expected: submit button enables; request body includes `contact.subscribe: true`; API returns lane-specific trigger tag.

15. AI Compliance Gameplan Builder unchecked checkbox
    - Load `/ai-compliance-gameplan`, enter email, leave checkbox unchecked.
    - Expected: `Send my gameplan` remains disabled; no `/api/leads` call from the button.

16. AI Compliance Gameplan Builder checked checkbox
    - Check the opt-in box and submit in preview mode.
    - Expected: request includes `contact.subscribe: true`; API returns `workflow:ai-compliance-readiness`, `newsletter:ai`, and four-email sequence preview.

17. AI Patent Scorecard unchecked checkbox
    - Load `/ai-patent-strategy-scorecard`, enter email, leave checkbox unchecked.
    - Expected: `Send my scorecard` remains disabled; no `/api/leads` call from the button.

18. AI Patent Scorecard checked checkbox
    - Check the opt-in box and submit in preview mode.
    - Expected: request includes `contact.subscribe: true`; API returns `workflow:ai-patent-strategy`, `newsletter:ai`, and four-email sequence preview.

## Legal, ethics, and privacy review

- The opt-in checkbox copy is affirmative and lane-specific enough for educational email routing, but the checkbox should remain unchecked by default.
- No SMS routing should be added without a separate SMS consent field, compliant opt-out copy, and Jeff approval.
- HighLevel workflow triggers should independently verify `newsletter:ai`, `Consent Basis starts with lead_magnet_email_opt_in:`, no `newsletter:not-consented`, no suppression/DND/unsubscribe, and `Approval Status` not in blocked states.
- Lead magnet forms should continue to avoid confidential facts, adverse-party names, claim charts, private transaction counterparties, sensitive employment details, and sensitive financial details.
- Tool outputs should remain educational and avoid promises of compliance, patentability, valuation, deal success, or risk elimination.
- Every email asset must have accurate sender/subject, firm footer/address, unsubscribe/preference handling, and attorney-advertising review where applicable before activation.

## Verification performed

- `npm run lint` — PASS.
- `npm run build` — PASS; Next.js compiled and generated all app routes including `/api/leads`.
- Static gating assertion script — PASS: `/Users/jeff/.hermes/kanban/boards/whiteford-mountain-west/workspaces/t_f4abf859/verify_lead_opt_in_gating.py`.
- Code inspection of API route, three lead-capture components, and campaign lane definitions.
- Business-development corpus search completed for lead magnet / opt-in principles; qmd required `HOME=/Users/jeff` to see collections and returned no matching Whiteford docs for the specific opt-in query.

## Next action

Jeff should approve whether non-opted browser users should be capturable as `newsletter:not-consented` / `no-auto-send` CRM review records. If yes, create a follow-up product/frontend task to allow no-opt-in submissions without triggering email sequences and with revised UI confirmation copy.
