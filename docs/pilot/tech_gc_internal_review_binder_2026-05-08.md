# Tech GC Internal Review Binder — 2026-05-08

Task: `t_59f7ac2e`
Tenant: `whiteford-mountain-west`
Audience: Jeff / Whiteford legal, ethics, privacy, brand, HighLevel, product/web reviewers
Status: INTERNAL REVIEW BINDER ONLY. This file authorizes no public launch, external delivery, CRM/HighLevel mutation, workflow activation, Supabase work, Clio write, social action, ad action, email/SMS/DM, or client/prospect-facing use.

## 1. Executive verdict

Decision posture: GO for internal attorney/Jeff review and local/preview prep only; NO-GO for launch, live-system reliance, external delivery, CRM movement, HighLevel field/workflow reliance, Supabase expanded-schema reliance, public URL circulation, UTM use, email/SMS/DM/social/LinkedIn/ad action, Clio write, or client/prospect-facing action.

The latest artifacts are coherent enough for an internal controlled-pilot decision. Tech GC remains the safer first pilot lane because the lead magnet can solve a narrow educational problem in-browser, provide value before any follow-up, and convert only after explicit consent and attorney-reviewed guardrails. However, the package is still an approval-prep binder, not an activation packet.

Recommended internal disposition:

- Jeff may route this binder and the linked artifacts to Whiteford legal, ethics, privacy, brand, product/web, and HighLevel reviewers.
- Jeff may decide whether Tech GC should proceed as the first internal local/preview QA lane.
- No worker or operator should treat this binder as permission to publish, send, mutate, enroll, create fields, activate workflows, use public URLs, create UTMs, or rely on Supabase expanded tables.

## 2. Jeff decision boxes

### Decision box A — pilot lane

- [ ] Approve Tech GC as the first internal local/preview QA lane only.
- [ ] Select AI Compliance instead.
- [ ] Hold all controlled-pilot lane work.

Recommended default: approve Tech GC for internal local/preview QA only, because it can deliver browser-only educational value without forcing email opt-in.

### Decision box B — non-subscriber fulfillment policy

- [ ] Approve browser-only educational value with no outbound report, no nurture, no workflow trigger, and no automatic attorney-review task.
- [ ] Request edits to browser-only result copy.
- [ ] Request a separate transactional-email approval packet.
- [ ] Hold non-subscriber fulfillment.

Recommended default: browser-only educational value. Do not infer marketing consent from checklist completion.

### Decision box C — consent scope

- [ ] Approve opt-in copy for report plus related educational follow-up/newsletter.
- [ ] Narrow consent to report-only email.
- [ ] Hold all email/report delivery.

If consent is report-only, `newsletter:ai` and any ongoing nurture/newsletter sequence remain prohibited unless a separate approved consent option is presented and selected.

### Decision box D — route, URL, CTA, and UTM

- [ ] Approve final production/canonical route, anchor behavior, footer visibility, privacy/terms placement, reviewed-as-of/source-current display, and no-PII UTM policy.
- [ ] Keep `/colorado-tech-general-counsel` and `/colorado-tech-general-counsel#lead-magnet` labeled preview/internal only.
- [ ] Hold all route/CTA/UTM decisions.

Current required label: preview/internal only. Do not invent or approve public URLs, public CTAs, final domains, or UTM parameters from this binder.

### Decision box E — HighLevel fields

- [ ] Approve manual UI creation of exactly the 31 missing Contact custom fields listed in the no-mutation manifest, in six batches, by an authorized HighLevel operator.
- [ ] Request edits to the 31-field manifest.
- [ ] Request a separate dry-run-first script packet.
- [ ] Hold all HighLevel field remediation.

Current blocker: HighLevel has 6 of 37 expected guardrail/mapped fields present; 31 Contact fields are missing. Live reliance remains blocked until the exact 31-field manual UI scope is approved, completed by an authorized operator, and read-only verification returns `expectedCount=37`, `presentCount=37`, `missingCount=0`, `typeMismatchCount=0`, `fieldKeyRiskCount=0`, `pass=true`.

### Decision box F — HighLevel workflow evidence

- [ ] Approve read-only Draft/Off guard inspection only.
- [ ] Request a later exact-scope workflow activation/test/enrollment packet.
- [ ] Hold all workflow work.

Current blocker: workflows must remain Draft/Off. No save, publish, activation, test, manual start, contact enrollment, email asset loading, campaign launch, or workflow reliance is authorized.

### Decision box G — Supabase expanded schema

- [ ] Approve separate database-operator work for blocker `t_fa6eb9c1`: phase 6-11 expanded-schema installation, sync rerun, and verification.
- [ ] Explicitly exclude expanded Supabase tables from this pilot's launch reliance.
- [ ] Hold Supabase decision.

Current blocker: Supabase expanded-schema evidence remains blocked by `t_fa6eb9c1`. Core/local file-backed artifacts may be reviewed internally, but expanded Growth OS/Supabase dashboard evidence must not be relied on for launch until separate authorized DDL/sync/verification is complete.

### Decision box H — legal, ethics, privacy, and brand

- [ ] Approve the no-advice/no-ACR/no-confidential-information/no-guarantee/conflicts/written-engagement/attorney-advertising posture and final placement.
- [ ] Redline exact wording.
- [ ] Hold all external use.

Current blocker: final Whiteford legal/ethics/privacy/brand approval is still required before any public or client/prospect-facing use.

## 3. Exact unresolved approvals

1. Privacy and terms references
   - Exact Privacy Policy URL or approved route-level privacy text.
   - Exact Terms/Disclaimer URL or approved route-level disclaimer block.
   - Data minimization, retention, storage, HighLevel handling, suppression handling, and report-link behavior.

2. Legal/ethics copy and placement
   - No legal advice.
   - No attorney-client relationship.
   - No confidential information.
   - No guarantee / prior results do not guarantee similar outcome.
   - Conflicts, scope, fees, and written engagement caveat.
   - Attorney-advertising/footer language and placement.
   - Source-current/review-date posture.

3. Consent and follow-up scope
   - Whether opt-in covers report plus related educational follow-up/newsletter, or report-only.
   - Whether `newsletter:ai` is permitted; it is prohibited unless final opt-in copy expressly covers related educational follow-up/newsletter scope.
   - Unchecked opt-in default and no-opt-in path with no report email, no nurture, no workflow trigger, and no auto-send.

4. Public route, CTA, and UTM
   - Production/canonical URL and HTTPS/domain approval.
   - Anchor behavior for `/colorado-tech-general-counsel#lead-magnet`.
   - Public CTA language and footer visibility.
   - No-PII UTM policy and final UTM examples.
   - Current labels remain preview/internal for `/colorado-tech-general-counsel` and `/colorado-tech-general-counsel#lead-magnet`.

5. HighLevel 31-field / 37-field blocker
   - Jeff approval of exact 31 missing Contact custom fields in the manifest.
   - Manual UI creation by an authorized operator only, if approved.
   - Post-creation read-only verification must show 37/37 present with no missing fields, no type mismatches, and no generated-key risks.
   - Until then, HighLevel reliance is blocked.

6. HighLevel workflow blocker
   - Draft/Off guard evidence may be reviewed read-only.
   - No workflow save/publish/test/manual-start/enrollment is approved.
   - No email asset loading or message send/test send is approved.

7. Supabase expanded-schema blocker
   - Blocker `t_fa6eb9c1` remains open for phase 6-11 expanded schema installation, sync rerun, and verification.
   - Do not rely on missing expanded tables or run Supabase DDL/sync/row mutation from this binder.

8. Sender, footer, unsubscribe, and deliverability
   - Exact sender identity, reply-to, firm/entity line, postal address/footer, attorney-advertising footer, unsubscribe/preference mechanism, suppression/DND/bounce/no-auto-send evidence.

9. Future TEST-record scope
   - Any live or Jeff-owned TEST-record work requires a separate exact-scope packet naming records, environment, time window, rollback, screenshots/API evidence, no-send safeguards, and stop conditions.

10. Named-company or external awareness
   - No LinkedIn, social, ad, DM, SMS, email, public page, public CTA circulation, named-company action, or prospect/client-facing use is approved.

## 4. Artifacts and evidence table

| Artifact | Source task / role | Review status | What it proves | Remaining blocker |
| --- | --- | --- | --- | --- |
| `docs/reviews/tech_gc_pilot_copy_prototype_manifest_review_2026-05-08.md` | `t_71518c32` launch-gate review | Pass for internal decision prep; fail/no-go for public/live action | Copy packet, local review hub, and no-mutation manifest are coherent and conservative for internal review. | Exact approvals still required for privacy/terms, consent, URL/UTM, HighLevel 31/37, workflows, Supabase, and external use. |
| `docs/reviews/tech_gc_controlled_pilot_final_prep_review_2026-05-08.md` | `t_106cd8d3` final prep review | Go for internal/local/preview QA planning only | Tech GC is the safest first controlled-pilot lane; no launch/live reliance authorized. | Same unresolved blockers; requires separate exact-scope approval for activation or delivery. |
| `docs/pilot/tech_gc_controlled_pilot_consent_terms_copy_packet_2026-05-08.md` | `t_4c7bbbca` copy packet | Draft / attorney-review-only | Provides non-confidential warning, no-advice/no-ACR/no-guarantee/conflicts/written-engagement/attorney-advertising placeholders, browser-only path, opt-in copy, footer placeholders, and route mapping. | Final Whiteford legal/ethics/privacy/brand approval and exact privacy/terms/sender/footer/unsubscribe details. |
| `docs/pilot/tech_gc_controlled_pilot_review_hub_notes_2026-05-08.md` | `t_50fa906d` prototype notes | Internal/local/private prototype notes | Review hub is self-contained local HTML with no remote dependencies, no API/form behavior, no external action, and no public use. | Jeff must open/review locally; prototype is not a public page or live lead form. |
| `docs/pilot/tech_gc_controlled_pilot_review_hub_prototype_2026-05-08.html` | `t_50fa906d` local prototype | Local/private only | Gives a browser-openable review surface for status cards, decision gates, blockers, and evidence links. | Do not publish or deploy. |
| `docs/highlevel_guardrail_v2_no_mutation_field_manifest_2026-05-08.md` | `t_8c69caa2` manifest | Operator-ready for Jeff/HighLevel review only | Lists the 31 missing Contact fields in six batches with labels, keys, types, safe defaults, verification commands, and rollback/no-activation boundaries. | Jeff approval and authorized manual UI creation required; no script/live mutation authorized by manifest. |
| `docs/highlevel_guardrail_v2_no_mutation_field_manifest_2026-05-08.json` | `t_8c69caa2` machine-readable manifest | Internal companion evidence | Supports exact 31-field validation and expected generated key review. | Still no HighLevel mutation or reliance without approval and 37/37 read-only verification. |
| `docs/KANBAN_DELIVERABLE_INDEX.md` | Standing deliverable index | Updated by this task | Human-facing locator for completed Kanban artifacts. | Keep updated when new artifacts are created. |

## 5. What can be reviewed internally now

- This binder and all listed source artifacts.
- The Tech GC lane choice for internal local/preview QA only.
- Browser-only non-subscriber value policy.
- Draft legal/ethics/privacy/brand language and placement.
- Draft opt-in/report/follow-up consent language.
- Preview/internal route and anchor labels for `/colorado-tech-general-counsel` and `/colorado-tech-general-counsel#lead-magnet`.
- No-mutation HighLevel 31-field manual UI manifest as an approval checklist only.
- Read-only HighLevel workflow Draft/Off guard evidence planning.
- Whether Supabase expanded tables are required for launch reliance or excluded until blocker `t_fa6eb9c1` is resolved.
- Future exact-scope approval packets for field remediation, workflow verification, TEST-record QA, or public launch.

## 6. What is forbidden from this binder

This binder does not authorize and must not be used to perform any of the following:

- Public page publish/deploy or production credential change.
- Public URL, public CTA, public preview link, or UTM circulation.
- Email, SMS, voicemail, DM, LinkedIn message, LinkedIn post/comment/tag, social post/comment/tag, ad, paid amplification, newsletter, campaign, or external delivery.
- HighLevel field creation/update, contact/opportunity/tag/task/note/campaign/message mutation, workflow save/publish/test/manual-start/enrollment/activation, email asset loading, or test send.
- Supabase DDL, sync rerun, row mutation, expanded-schema assumption, or launch reliance on missing expanded tables.
- Clio write, conflicts lookup write, client/prospect-facing action, or named-company outreach.
- Use of confidential, privileged, sensitive personal, trade secret, customer-specific, employee-specific, dispute-specific, invention-disclosure, contract-text, source-code, security-incident, or regulated data in public forms.
- Any claim that the checklist provides legal advice, creates an attorney-client relationship, determines compliance/protection/fundability/readiness, guarantees outcomes, or promises attorney review/contact.

## 7. Legal / ethics / privacy caveat section

Use these as review requirements, not final approved copy:

- No legal advice: the checklist, browser result, report, and related educational materials must be general educational information only.
- No attorney-client relationship: use of the checklist, form, result, report, email, CTA, scheduling link, or related workflow must not create an attorney-client relationship.
- No confidential information: users must be warned not to submit confidential, privileged, sensitive personal, trade secret, source-code, security-incident, regulated, contract-specific, employee-specific, customer-specific, invention-disclosure, dispute-specific, or other sensitive details.
- No guarantees: copy must avoid guaranteed outcomes and avoid determining whether a company is compliant, protected, fundable, transaction-ready, customer-ready, patent-ready, or free from legal risk.
- Conflicts and written engagement: representation, if any, requires conflicts checks, scope and fee agreement, and a separate written engagement agreement.
- Attorney-advertising/footer placeholders: final attorney-advertising language, firm/entity line, postal address/footer, unsubscribe/preference mechanism, privacy policy, terms/disclaimer links, and source-current/review-date placement require Whiteford approval before public use.

## 8. One-page Whiteford reviewer checklist

### Legal / ethics

- [ ] No-legal-advice language approved.
- [ ] No-attorney-client language approved.
- [ ] No-confidential-information warning approved and visible before any input.
- [ ] No-guarantee / prior-results language approved.
- [ ] Conflicts, scope, fees, and written-engagement caveat approved.
- [ ] Attorney-advertising language and placement approved.
- [ ] Copy avoids legal conclusions such as compliant/noncompliant, high/low legal risk, protected/unprotected, deal-ready, customer-ready, patent-ready, fundable, guaranteed cleanup, free legal review, or automatic attorney review.

### Privacy / consent

- [ ] Exact Privacy Policy URL or route-level privacy text approved.
- [ ] Exact Terms/Disclaimer URL or route-level disclaimer block approved.
- [ ] Data minimization, retention, storage, report-link behavior, HighLevel handling, suppression/DND, unsubscribe, and preference handling approved.
- [ ] Optional opt-in checkbox remains unchecked by default.
- [ ] Browser-only non-subscriber path triggers no report email, no nurture, no workflow, no `newsletter:ai`, and no auto-send.
- [ ] Consent scope decided: report plus related educational follow-up/newsletter, or report-only.
- [ ] `newsletter:ai` prohibited unless final copy expressly approves related educational follow-up/newsletter.

### Brand / source-current

- [ ] Whiteford/Schell IP naming and co-branding approved.
- [ ] Source-current/review-date language approved.
- [ ] CTA language approved only after the browser result fulfills the checklist promise.
- [ ] No hype, no unsupported superiority claims, no specialist/expert/best/guaranteed language unless separately approved.

### Product / web

- [ ] `/colorado-tech-general-counsel` remains preview/internal until final production/canonical route approval.
- [ ] `/colorado-tech-general-counsel#lead-magnet` remains preview/internal until final anchor, footer, privacy/terms, and UTM approval.
- [ ] Public URL, canonical URL, HTTPS/domain, footer visibility, and no-PII UTM policy approved before any public use.
- [ ] Local/preview QA uses synthetic or internal test data only and no production credentials unless separately approved.

### HighLevel / CRM

- [ ] 31 missing Contact fields reviewed against the no-mutation manifest.
- [ ] If approved, exact manual UI creation scope names only those 31 fields and no other fields/actions.
- [ ] Read-only post-creation verifier must pass 37/37 before any reliance.
- [ ] Workflows remain Draft/Off.
- [ ] No workflow save, publish, test, manual start, enrollment, email asset loading, send, tag/task/note/contact/opportunity mutation, campaign/newsletter launch, or external action from this binder.

### Supabase / Growth OS

- [ ] Decide whether blocker `t_fa6eb9c1` must be resolved before launch reliance or whether expanded Supabase evidence is excluded from this pilot.
- [ ] No Supabase DDL, sync rerun, row mutation, or expanded-table reliance from this binder.

### Final approval gate

- [ ] Jeff chooses pilot lane.
- [ ] Whiteford legal/ethics/privacy/brand approves final public-facing text and placement.
- [ ] HighLevel field and workflow blockers resolved or explicitly excluded from reliance.
- [ ] Supabase blocker `t_fa6eb9c1` resolved or explicitly excluded from reliance.
- [ ] Separate exact-scope activation/delivery packet exists before any public/live/external action.

## 9. Manual unblock sequence if Jeff proceeds

1. Jeff marks Tech GC internal local/preview QA, AI Compliance, or hold.
2. Whiteford reviewers redline or approve legal/ethics/privacy/brand language and final placement.
3. Jeff decides consent scope and non-subscriber browser-only policy.
4. Product/web prepares local-only route/anchor/disclaimer QA without publishing.
5. Jeff either approves exact HighLevel 31-field manual UI remediation or holds it.
6. If field remediation is approved, authorized HighLevel operator creates only the 31 Contact fields manually, preserves workflows Draft/Off, captures evidence, and runs read-only 37/37 verification.
7. Jeff decides whether Supabase blocker `t_fa6eb9c1` must be resolved or excluded from pilot reliance.
8. Only after all required approvals/evidence are complete should a separate exact-scope TEST-record, workflow, delivery, or public-launch approval packet be created.

## 10. Final non-authorization confirmation

This binder is a file-backed internal review artifact only. It does not approve, perform, or imply permission for public launch, external delivery, HighLevel mutation, CRM mutation, workflow activation/test/enrollment, email/SMS/DM/social/LinkedIn/ad action, Supabase DDL/sync/row mutation, Clio write, production credential change, public URL/UTM use, or client/prospect-facing action.
