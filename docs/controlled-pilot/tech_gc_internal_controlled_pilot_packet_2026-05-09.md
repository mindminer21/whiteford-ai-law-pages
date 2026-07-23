# Tech GC Internal Controlled-Pilot Decision Packet

Task: `t_f45fa8a3`
Date: 2026-05-09
Tenant: whiteford-mountain-west
HighLevel location: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`)
Selected lane: Tech Company Legal Health Checklist / Tech GC Launchpad
Status: internal decision packet only. This does not authorize activation, external sends, contact enrollment, workflow publication, public/client-facing changes, HighLevel live mutation, Supabase mutation, Clio writes, LinkedIn/social action, paid ads, or outreach.

## 1. Decision requested

Jeff should approve or reject a tightly bounded internal pilot for the Tech Company Legal Health Checklist / Tech GC Launchpad lane.

Recommended decision:

- Approve local/no-token internal QA for Tech GC using synthetic Jeff-owned TEST payloads only.
- Hold live HighLevel TEST-record writes until Jeff separately approves the exact environment, inboxes, record labels, time window, rollback owner, and evidence folder.
- Keep all HighLevel workflows Draft/Off.
- Keep production HighLevel credentials absent/disabled for this packet.
- Do not activate, enroll, send, publish, post, sync to Clio, launch ads, or touch real prospects/clients.

Why Tech GC remains the safest first lane:

- It is broad and educational: a legal-operating-readiness checklist for technology companies.
- It uses non-confidential categorical inputs and avoids legal conclusions.
- It naturally routes to a bounded Tech Company OGC Launchpad review rather than a generic consultation.
- It can surface branch signals for AI Compliance, AI Patent, and Founder M&A without applying those other workflow trigger tags.
- Prior launch-gate work recommends Tech GC as the lower-risk first controlled-pilot lane.

Business-development retrieval note:

- The local business-development corpus was queried for controlled lead magnet, opt-in, trust, legal-services checklist, nurture, and qualification principles.
- Applied principle: fulfill the promised diagnostic value first, build trust before nurture, and use opt-in follow-up to qualify toward a bounded next-step offer. No book text is reproduced here.

## 2. Source evidence used

Primary source docs required by this task:

1. `docs/final_pilot_readiness_report_t_8640b54c.md`
2. `docs/lead_magnet_opt_in_and_app_strategy.md`
3. `docs/highlevel_manual_consent_gate_fields_t_b2909eb8.md`
4. `docs/highlevel_campaign_implementation_plan.md`
5. `docs/lead_magnet_pilot_hardening_launch_gate_review_2026-05-07.md`

Additional directly relevant Tech GC sources reviewed:

- `docs/controlled_pilot_approval_packet_tech_gc_default_2026-05-07.md`
- `docs/tech_company_legal_health_checklist_app_spec.md`
- `docs/KANBAN_DELIVERABLE_INDEX.md`

Key inherited constraints:

- Final readiness verdict: ready for internal controlled pilot QA only; not ready for live activation or external outreach.
- Production lead capture is safety-positive preview-only while live HighLevel env vars are absent.
- HighLevel workflows remain Draft/Off.
- Manual HighLevel consent-gate fields remain incomplete; UI edits must not be attempted by this packet.
- Non-subscriber handling remains a policy decision; default safe path is browser/on-page value only with no outbound email.

## 3. Exact environment scope

### Approved by this packet if Jeff signs the local/no-token option

Environment: local developer or preview app only, with HighLevel write credentials absent or explicitly disabled.

Allowed routes:

- App/browser route: `/colorado-tech-general-counsel` with the Tech Company Legal Health Checklist section or anchor.
- API route: `POST /api/leads`.
- Private evidence/dashboard route if available: `/pilot-readiness`.

Allowed campaign metadata:

- `campaignKey`: `tech-gc`
- Lead magnet: `Colorado Tech Company Legal Health Checklist`
- Recommended offer: `Tech Company OGC Launchpad`
- Source channel for internal QA: `jeff-controlled-pilot-tech-gc`
- Guardrail version: `lead-magnet-guardrail-v2`
- Public form input type: `categorical_non_confidential`
- Report requested: `true`
- Disclaimer accepted: `true` for valid report-request tests

Allowed system behavior:

- Browser/local app review.
- Local/no-token API matrix tests.
- Preview JSON evidence capture.
- Read-only HighLevel evidence review if performed by an approved operator.
- No live HighLevel mutation.
- No production env var changes.
- No sends.

### Not approved by this packet

This packet does not approve:

- Adding or changing `GHL_PRIVATE_INTEGRATION_TOKEN` or `GHL_LOCATION_ID` in production, Vercel, or any live environment.
- Activating, publishing, or starting HighLevel workflow `dee4450a-1b7b-4597-9fa4-9c7b7423b848`.
- Creating, updating, importing, tagging, or enrolling real HighLevel contacts.
- Creating or updating HighLevel opportunities.
- Sending email, SMS, voicemail drops, DMs, LinkedIn messages, social posts, ads, or any external communication.
- Writing to Clio.
- Mutating Supabase.
- Publishing public/client-facing pages or changing production copy.
- Using researched prospects, imported lists, existing clients, or third-party contacts.

### Optional future live-test scope requiring separate approval

A future live HighLevel TEST-record write may be considered only after Jeff approves a separate live-test block that states:

- Exact environment: staging/preview or production.
- Exact env vars to enable, where, and for how long.
- Exact Jeff-owned test inboxes.
- Exact record names, company label, tags, and source channel.
- Workflow remains Draft/Off.
- No sends/no enrollment/no external actions.
- Rollback owner and rollback deadline.
- Evidence folder path.

## 4. Proposed Jeff-owned TEST records only

These are proposed record definitions for planning and payload/evidence naming. Do not create or update them in HighLevel unless Jeff separately approves a live-test scope.

| Record ID | Purpose | Contact name | Email | Company | Owner/label | Allowed use in this packet | Expected HighLevel write status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `TG-OPTIN-001` | Valid Tech GC opt-in path | `TEST - Jeff-owned Tech GC Opt-In` | `jeff+whiteford-tech-gc-optin-test@schellip.com` | `TEST - Jeff Growth OS Pilot` | Jeff-owned internal QA only | Local/no-token synthetic payload and JSON evidence | Not approved for live write |
| `TG-NOOPT-001` | Non-opted/no-send path | `TEST - Jeff-owned Tech GC No Opt-In` | `jeff+whiteford-tech-gc-nooptin-test@schellip.com` | `TEST - Jeff Growth OS Pilot` | Jeff-owned internal QA only | Local/no-token synthetic payload and JSON evidence | Not approved for live write |
| `TG-MALICIOUS-001` | Client-tag injection negative path | `TEST - Jeff-owned Tech GC Malicious Tag Strip` | `jeff+whiteford-tech-gc-malicious-test@schellip.com` | `TEST - Jeff Growth OS Pilot` | Jeff-owned internal QA only | Local/no-token negative test only | Not approved for live write |
| `TG-SUPPRESS-001` | Suppression/no-send guard review | `TEST - Jeff-owned Tech GC Suppression Guard` | `jeff+whiteford-tech-gc-suppressed-test@schellip.com` | `TEST - Jeff Growth OS Pilot` | Jeff-owned internal QA only | Planning/read-only guard checklist only | Not approved for live write |

If any `jeff+...@schellip.com` alias is not confirmed usable, Jeff must substitute a Jeff-owned address before any future live test-record write.

Forbidden record sources:

- No prospects.
- No imported lists.
- No researched/nightly leads.
- No existing clients.
- No third-party contacts.
- No personal contacts unless Jeff explicitly designates them as Jeff-owned TEST records.

## 5. Consent and routing invariants

The selected Tech GC invariant:

- The workflow trigger tag `workflow:tech-gc-launchpad` may be emitted only after affirmative Tech GC lead-magnet opt-in.

Opted-in behavior, `contact.subscribe === true`:

- Add `newsletter:ai`.
- Add `workflow:tech-gc-launchpad`.
- Add `leadmagnet:tech-gc-checklist`.
- Add `interest:tech-ogc`.
- Add `whiteford-mountain-west`.
- Set `consent_basis = lead_magnet_email_opt_in:tech-gc`.
- Set `approval_status = pending`.
- Preview Tech GC email sequence locally/no-token only.
- Do not add other lane workflow tags.

Non-opted behavior, `contact.subscribe !== true`:

- Add `newsletter:not-consented` in preview/server output where a record object is produced.
- Set `consent_basis = no_email_opt_in`.
- Set `approval_status = no-auto-send`.
- Do not add `newsletter:ai`.
- Do not add `workflow:tech-gc-launchpad`.
- Do not add any `workflow:*` trigger tag.
- Do not preview or send an email sequence.

Malicious/client-supplied tag behavior:

- Client-supplied `workflow:*` tags must be stripped/ignored by the server.
- A Tech GC payload must not generate `workflow:ai-compliance-readiness`, `workflow:ai-patent-strategy`, `workflow:ma-readiness`, or `workflow:malicious-client-tag`.
- Branch signals may be stored only as non-trigger data after approval; they must not silently enroll the user in other lanes.

## 6. No-token/local vs live-test decision matrix

| Decision point | Local/no-token internal QA | Live HighLevel TEST-record write | Limited external pilot |
| --- | --- | --- | --- |
| Recommended now? | Yes, if Jeff signs this packet | No; separate approval required | No |
| HighLevel credentials | Absent or explicitly disabled | Enabled only in exact approved env/time window | Separate launch approval required |
| Contact records | Synthetic Jeff-owned TEST payloads only | Exact Jeff-owned TEST contacts only | Separate recipient/legal/privacy approval required |
| Workflow state | Draft/Off; no activation | Draft/Off; no activation | Not approved here |
| Email/SMS/social/ad/Clio | None | None | Not approved here |
| API evidence | Preview JSON response artifacts | Live response + redacted HighLevel screenshot for TEST records only | Separate evidence plan required |
| Risk level | Low if credentials absent and no public change | Medium; live CRM mutation risk even with test records | High; requires full launch packet |
| Required blockers closed first | Jeff approves local/no-token scope | Jeff approves env vars, exact records, rollback, evidence folder; HighLevel 31/37 fields and UI guards verified | Legal/ethics/privacy/copy/footer/unsubscribe/conflicts/suppression/activation approvals |
| Rollback need | None beyond deleting local artifacts if desired | Required: remove/mark test tags, disable env, preserve evidence | Full public rollback plan required |
| Pass condition | Expected preview matrix passes and no live mutations occur | Exact TEST records have correct tags/fields; no sends/enrollments; workflow remains Draft/Off | Not in scope |
| Fail/stop condition | Wrong workflow tag, missing guardrail rejection, or preview indicates send/enrollment | Any unexpected tag/send/enrollment/active workflow/env drift | Any external action without approval |

Default decision: approve only local/no-token internal QA now.

## 7. Pass/fail evidence plan

If Jeff approves local/no-token QA, create a dated evidence folder before testing, for example:

- `docs/controlled-pilot/evidence/2026-05-09-tech-gc-local-no-token/`

Required evidence files:

| Evidence item | File suggestion | Pass criteria |
| --- | --- | --- |
| Environment statement | `00_scope_and_env.md` | States no HighLevel credentials, no production env changes, no sends, no live CRM/Supabase/Clio mutation |
| Route screenshot or notes | `01_route_review.md` | Tech GC app is internal/local/preview, asks non-confidential categorical questions, opt-in unchecked by default |
| Opt-in API response | `02_tg-optin-001_preview_response.json` | Only Tech GC workflow tag appears; consent basis is `lead_magnet_email_opt_in:tech-gc`; approval status `pending` |
| Non-opt API response | `03_tg-noopt-001_preview_response.json` | No workflow tag; no `newsletter:ai`; `newsletter:not-consented`; consent basis `no_email_opt_in`; approval status `no-auto-send` |
| Malicious tag response | `04_tg-malicious-001_preview_response.json` | Client-supplied workflow tags stripped; no other lane trigger tag |
| Guardrail negative responses | `05_guardrail_negative_responses.json` | Missing disclaimer/wrong guardrail/free-text or oversized payload rejects before HighLevel branch |
| No-send certification | `06_no_send_no_mutation_certification.md` | Confirms no email/SMS/DM/social/ad/Clio, no HighLevel write, no enrollment, no workflow activation, no public publish |
| Decision log | `07_decision_log.md` | Records Jeff approval/rejection, observed pass/fail, and whether a later live-test packet is warranted |

Minimum test cases:

1. `TG-OPTIN-001`: valid Tech GC opt-in preview.
2. `TG-NOOPT-001`: valid non-opted/no-send preview.
3. `TG-MALICIOUS-001`: malicious client-supplied workflow tags stripped.
4. Missing/false `disclaimerAccepted` with `reportRequested=true`: reject before HighLevel branch.
5. Wrong `privacyGuardrailVersion`: reject before HighLevel branch.
6. Oversized/free-text/non-allowlisted payload: reject or sanitize before HighLevel branch.

Pass definition:

- Every preview response matches expected tags, custom fields, and campaign routing.
- No response indicates a live HighLevel write when credentials are absent/disabled.
- No workflow activation, contact enrollment, external send, public publish, Clio write, Supabase mutation, or social/ad action occurs.

Fail/stop definition:

- Any non-opted or malicious case produces a `workflow:*` trigger tag.
- Any opted-in Tech GC case produces a non-Tech-GC workflow trigger tag.
- Any guardrail-negative case reaches a live/write branch.
- Any workflow is active/published or any message is queued/sent.
- Any real prospect/client/third-party contact is touched.

## 8. Rollback and suppression checklist

### Local/no-token rollback

No CRM rollback should be needed if the test is truly local/no-token.

If local artifacts are wrong:

- Stop the QA run.
- Preserve failing JSON and notes.
- Mark the evidence folder as failed.
- Do not proceed to live-test approval.
- Create a follow-up engineering/review card if code or copy changes are required.

### Future live TEST-record rollback, only if separately approved

Before live TEST writes:

- Confirm exact env vars and scope are approved.
- Confirm workflow `dee4450a-1b7b-4597-9fa4-9c7b7423b848` is Draft/Off.
- Confirm no SMS/social/LinkedIn/ad/Clio/webhook-to-send actions are enabled.
- Confirm exact Jeff-owned test emails and labels.
- Confirm evidence folder and rollback owner.

Immediately after a live TEST write:

- Capture API response payload.
- Capture redacted HighLevel contact screenshot/DOM evidence.
- Confirm no email/SMS/social/DM/ad/Clio action was queued or sent.
- Confirm no workflow enrollment occurred or, if Draft/Off shows a pending path, stop and document.
- Confirm no non-test records changed.

Rollback actions if anything unexpected occurs:

1. Pause/disable the relevant workflow if any active/queued path is visible.
2. Remove unexpected workflow tags from the Jeff-owned TEST record only.
3. Add/confirm `ops:no-auto-send` and/or `outreach:do-not-send` on the TEST record if needed for suppression evidence.
4. Disable/remove any temporarily enabled HighLevel env vars after the test window.
5. Preserve screenshots, payloads, and timestamps before cleanup.
6. Block further testing for human/attorney review.

Suppression conditions that must be verified before any future message step can be approved:

- Contact is not DND.
- Contact is not unsubscribed, bounced, or suppressed.
- `newsletter:not-consented` absent.
- `outreach:do-not-send` absent.
- `ops:no-auto-send` absent for external-action paths.
- `Approval Status` is an explicitly allowed state, preferably `pending` for internal review; not `no-auto-send`, `suppressed`, `revise`, `rejected`, blank, or unknown.
- `consent_basis` starts with `lead_magnet_email_opt_in:tech-gc`.
- `disclaimer_acknowledged = true`.
- `privacy_guardrail_version = lead-magnet-guardrail-v2`.
- `public_form_input_type = categorical_non_confidential`.
- No conflicts/adverse-party/firm-review hold exists.

## 9. Non-subscriber handling options

Default recommendation for this packet:

- Use browser/on-page value only for non-subscribers during local/no-token QA.
- Do not send a one-time transactional email.
- Do not create a live CRM contact for non-subscribers.
- If a preview payload is produced for test coverage, it must show `newsletter:not-consented`, `consent_basis = no_email_opt_in`, `approval_status = no-auto-send`, no workflow tag, and no email sequence.

Decision options for Jeff/Whiteford:

| Option | Description | Pros | Risks / blockers | Recommendation now |
| --- | --- | --- | --- | --- |
| A. Browser/on-page value only | Non-subscriber sees useful result in-browser; no outbound email and no live CRM write | Safest consent posture; fulfills value without forcing marketing consent | Less CRM analytics; no saved delivery path | Recommended default |
| B. One-time transactional report email | Non-subscriber can request one non-marketing report email | Better fulfillment record | Requires exact content, sender, footer, suppression checks, privacy/legal review, and implementation proof | Hold |
| C. Internal attorney-review task only | Non-subscriber creates internal review item but no outward message | Could triage high-fit hand raisers without marketing | Still creates live record/task; requires conflicts/privacy and operational approval | Hold |
| D. No outbound/no stored value | Non-subscriber gets only pre-gate preview and no submit | Maximal safety | Lower user value; may undermine lead magnet promise | Acceptable fallback if legal/privacy prefers |

## 10. Required approvals before any next step

### Approvals needed for local/no-token internal QA

Jeff approval required:

- Tech GC selected as first controlled-pilot lane.
- Local/no-token QA only.
- Synthetic Jeff-owned TEST payloads above are acceptable for local/preview evidence naming.
- No production env changes.
- No live HighLevel writes.
- No workflow activation/enrollment/sends.
- Evidence folder path accepted.

Attorney/legal/privacy/brand review should confirm before any public or live action, but local/no-token QA can proceed only if copy is treated as internal review material and no public/client-facing change is made.

### Approvals needed before any live HighLevel TEST-record write

Separate approval required:

- Exact environment and credential scope.
- Exact Jeff-owned test records and inboxes.
- Confirmation HighLevel missing fields/guards are sufficient for the test objective.
- Workflow remains Draft/Off.
- No-send/no-enrollment/no-external-action wall.
- Rollback owner, rollback deadline, and evidence folder.
- Human operator who will perform and monitor the test.

### Approvals needed before any external/public pilot

Not requested here. A later packet must include:

- Final app/report/email copy.
- Legal/ethics/privacy/current-law review.
- Sender identity, firm footer/address, unsubscribe/preference handling.
- Conflicts/adverse-party checks.
- Suppression checks.
- Domain/route/CTA/UTM verification.
- HighLevel 37/37 field verification and UI guard evidence.
- Workflow activation owner and rollback plan.
- Exact recipients and channel/timing.

## 11. Explicit forbidden-action wall

Until a later packet explicitly approves otherwise, do not:

- Create, update, import, tag, or enroll real HighLevel contacts.
- Create or update HighLevel opportunities.
- Activate, publish, or manually start workflows.
- Send email, SMS, voicemail drops, DMs, LinkedIn messages, social posts, or ads.
- Publish or change public/client-facing pages, forms, posts, campaigns, or ads.
- Add production HighLevel credentials.
- Sync or mutate Supabase.
- Write to Clio.
- Use researched/imported prospects, clients, third-party contacts, or Agent Targeting placeholders.
- Add cross-lane workflow trigger tags from Tech GC branch signals.

## 12. Copy/paste approval block for Jeff

Jeff can copy/paste one of the decision blocks below into the Kanban task or approval thread.

### Option 1 — Approve recommended local/no-token QA only

```text
APPROVED: Tech GC / Tech Company Legal Health Checklist is approved as the first internal controlled-pilot lane for local/no-token QA only.

Scope approved:
- Use only synthetic Jeff-owned TEST payload definitions TG-OPTIN-001, TG-NOOPT-001, TG-MALICIOUS-001, and TG-SUPPRESS-001 for local/preview evidence.
- Keep HighLevel credentials absent or disabled.
- Keep all HighLevel workflows Draft/Off.
- Capture evidence under docs/controlled-pilot/evidence/2026-05-09-tech-gc-local-no-token/ or a dated equivalent.
- Default non-subscriber handling is browser/on-page value only with no outbound email and no live CRM write.

Not approved:
- No live HighLevel contact/opportunity creation or updates.
- No workflow activation, publication, enrollment, or manual start.
- No email, SMS, DM, social, LinkedIn, ad, Clio, Supabase, production env, public publish, or external outreach action.
- No real prospects, clients, imported contacts, researched leads, or third-party contacts.

If any test produces a non-approved workflow tag, send/enrollment indication, live-write indication, or guardrail failure, stop and return a failed evidence packet for review.
```

### Option 2 — Hold pending missing approval items

```text
HOLD: Do not run the Tech GC controlled-pilot QA yet.

Reason for hold:
- [ ] Need attorney/privacy review first.
- [ ] Need exact non-subscriber policy first.
- [ ] Need HighLevel field/guard evidence first.
- [ ] Need confirmed Jeff-owned test inboxes first.
- [ ] Other: ____________________________

All no-external-action guardrails remain in place: no HighLevel mutation, no workflow activation/enrollment, no sends, no production env changes, no Supabase/Clio mutation, no public publish, no social/LinkedIn/ad/outreach.
```

### Option 3 — Request separate live TEST-record write packet

```text
REQUEST SEPARATE PACKET: Prepare a live HighLevel TEST-record write approval packet for Tech GC.

The separate packet must include exact environment, exact env vars, exact Jeff-owned test inboxes, exact record labels/tags, workflow Draft/Off evidence, no-send/no-enrollment controls, rollback owner/deadline, evidence folder, and stop conditions.

This request does not approve the live write itself. It only asks for a more exact approval packet.
```

## 13. Recommended next action

Jeff should choose one of the approval blocks above.

If Option 1 is approved, the next execution task should run only the local/no-token Tech GC evidence matrix and write a dated evidence packet. If Option 2 is chosen, the pilot remains blocked. If Option 3 is chosen, prepare a separate live-test packet; do not mutate HighLevel until that later packet is approved.
