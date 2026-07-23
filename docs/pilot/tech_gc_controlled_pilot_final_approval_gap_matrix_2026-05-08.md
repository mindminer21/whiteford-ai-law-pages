# Tech GC Controlled-Pilot Final Approval Gap Matrix — 2026-05-08

Task: `t_3511f34a`
Tenant: `whiteford-mountain-west`
Audience: Jeff / Whiteford internal approval prep
Status: internal/local/preview QA only. This matrix does not approve launch, public publication, HighLevel activation, contact enrollment, email/SMS/DM/social send, LinkedIn action, Clio write, Supabase DDL, CRM mutation, paid ads, production credential changes, or client/prospect-facing use.

## Executive no-launch verdict

Current approval posture: **revise / fill final-approval gaps before any live or public Tech GC controlled pilot.**

Tech Company Legal Health Checklist remains the preferred first controlled-pilot lane only for internal local/preview QA. The lane is useful because it fulfills a narrow diagnostic promise with non-confidential categorical inputs, gives practical on-page value before marketing consent, and routes only high-fit, opted-in users toward a bounded Tech Company OGC Launchpad review CTA.

Do not treat this as approval to use the public page with real prospects or clients. Final Whiteford/legal/privacy/ethics/copy approval still requires exact URL references, exact sender/footer/unsubscribe settings for any later nurture, newsletter consent scope, route/domain/UTM verification, HighLevel 31-field remediation plus 37/37 verification, and Supabase expanded-schema unblock if expanded evidence/approval/contact mirroring will be relied upon.

## Decision boxes for Jeff

Jeff should mark one choice per gate. Default recommendations are bolded.

### A. Pilot lane and mode

- [ ] Approve Tech GC for internal local/preview QA only; no live HighLevel writes, no production credentials, no public launch.
- [ ] Select AI Compliance instead, with separate current-law/copy review before QA expansion.
- [ ] Hold both lanes.

Default: **Approve Tech GC for internal local/preview QA only.**

### B. Non-subscriber fulfillment policy

- [ ] Approve browser/on-page educational value for non-subscribers; no outbound report email, no nurture, no workflow trigger.
- [ ] Request edits to the on-page value policy.
- [ ] Request a separate one-time transactional email approval packet.
- [ ] Hold non-subscriber fulfillment until legal/privacy/deliverability review.

Default: **Approve browser/on-page educational value only.**

### C. HighLevel field remediation

- [ ] Approve manual UI creation of only the 31 missing Contact custom fields listed in `docs/highlevel_31_field_dry_run_approval_packet_2026-05-08.md`, then require read-only 37/37 verification.
- [ ] Request edits to labels/types/generated-key expectations.
- [ ] Request a separate dry-run-first creation-script packet.
- [ ] Hold all HighLevel remediation.

Default: **Approve the narrow manual UI path, then require 37/37 read-only verification before any reliance.**

### D. Route/domain/UTM approval

- [ ] Approve a final production/canonical URL for the Tech GC route and lead-magnet anchor.
- [ ] Keep `https://whiteford-ai-law-pages.vercel.app/colorado-tech-general-counsel` labeled preview/internal only.
- [ ] Hold URL approval until deployment/domain/UTM policy is decided.

Default: **Hold public URL approval until exact final domain, route, anchor, and UTM policy are verified.**

### E. Nurture/email scope

- [ ] Approve exact sender identity, reply-to, postal footer, unsubscribe/preference handling, attorney-advertising review, and suppression/DND checks for a later opt-in-only nurture.
- [ ] Request edits to nurture copy and footer/sender terms.
- [ ] Hold all nurture and email work.

Default: **Hold all nurture/email work until exact email, sender, footer, unsubscribe, and consent-basis language is approved.**

### F. Supabase expanded schema

- [ ] Approve/perform the expanded-schema DDL installation path and later sync verification.
- [ ] Keep expanded Supabase mirror/evidence features in local/core-artifact mode.
- [ ] Hold until a separate database operator approval packet exists.

Default: **Keep Tech GC controlled-pilot QA independent of expanded Supabase reliance until schema is installed and verified.**

## Redlined/final-approval gap matrix

| # | Reviewer-required edit / gap | Current evidence | Final approval requirement | Owner / approver | Status | No-launch caveat |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | Exact privacy-policy reference | Reviewed packets name privacy posture generally. Local file search found no dedicated public `privacy` page or final Privacy Policy URL in the app; footer only says educational/no-confidential-info. | Jeff/Whiteford must name the exact Privacy Policy URL or approved footer/legal text that governs the Tech GC form, report, storage, retention, HighLevel handling, and any later report link. Add the exact reference to public page/report/email approval packets before public use. | Jeff + Whiteford privacy/legal review | Open | No public route, report delivery, CRM reliance, or email approval until the exact privacy reference is approved. |
| 2 | Exact terms/disclaimer reference | App has in-page disclaimer gates and footer caveats; local file search found no dedicated `terms` page. Tech GC component states educational only, no legal advice, no compliance/patentability/transaction-readiness determination, no attorney-client relationship, and no confidential/sensitive facts. | Jeff/Whiteford must approve either a dedicated Terms/Disclaimer URL or exact route-level disclaimer block for the Tech GC intake/report path. Approval must cover no legal advice, no attorney-client relationship, no confidential information, no current-law/compliance determination, no guarantee, conflicts/engagement caveat, and attorney-advertising posture. | Jeff + Whiteford ethics/legal review | Open | Internal/local QA can rely on existing caveats as review evidence only; do not publish or promote externally. |
| 3 | Sender identity for any later nurture | Controlled-pilot review requires exact sender identity and reply-to. Authority follow-up packet has draft email sequence only and says not to load/send without sender/footer/unsubscribe/suppression approval. | Before any opt-in nurture is loaded, tested, or sent, approve exact From name, From email/domain, reply-to inbox, responsible firm/entity identity, and deliverability authentication assumptions. | Jeff + deliverability/privacy/legal reviewer | Open | No HighLevel email asset loading, test sends, workflow activation, or sequence enrollment. |
| 4 | Postal footer / address / attorney-advertising language | Draft footers say educational only, not legal advice, no attorney-client relationship, unsubscribe anytime, do not send confidential information; exact Whiteford postal/footer/address language is not approved. | Approve exact firm postal address, jurisdictional/attorney-advertising language if required, co-branding line, no-ACR/no-legal-advice language, no-confidential-info line, unsubscribe/preference text, and any required legal-marketing disclaimers. | Whiteford legal/ethics + Jeff | Open | Draft copy remains attorney-review-only; no email can be loaded or sent. |
| 5 | Unsubscribe/preference handling | Draft copy says users can unsubscribe. Executable unsubscribe/preference, DND, suppression, bounce, and no-auto-send guard evidence remains incomplete. | Approve exact unsubscribe/preference mechanism and verify it is present in every later email; verify suppression/DND/unsubscribe/bounce/no-auto-send checks before any message step can execute. | HighLevel campaign operator + legal/privacy review | Open | No nurture test or activation until executable guard evidence exists. |
| 6 | Newsletter consent scope / `newsletter:ai` | Current decision packet allows `newsletter:ai` after opt-in; reviewer requires clarification that it applies only if opt-in copy expressly covers newsletter/educational follow-up. Tech GC UI copy says: “Yes, send me the Tech Company Legal Health Checklist report and related educational emails.” | Approve final opt-in copy. If copy covers only report delivery, do not add `newsletter:ai`; use a narrower report-only basis. If copy covers related educational follow-up, `newsletter:ai` may be applied only with `workflow:tech-gc-launchpad`, `Consent Basis` prefix, unsubscribe/preference handling, and suppression checks. | Jeff + Whiteford privacy/legal + product | Open | Do not infer newsletter consent from report request, form completion, or non-subscriber browser result. |
| 7 | Non-subscriber policy | Non-subscriber memo recommends on-page-only value: readiness band, top gaps, next step; no email, no nurture, no workflow trigger. Tech GC component now shows browser result and warns no outbound follow-up when not opted in. | Jeff must approve on-page-only value policy wording. Acceptance: non-opted users get useful browser value; no email/SMS/DM/social/LinkedIn/ad/Clio action; `campaignRouting.triggerTag = null`; `campaignRouting.emailSequence = []`; no `workflow:*`; no `newsletter:ai`; `newsletter:not-consented`, `consent_basis = no_email_opt_in`, `approval_status = no-auto-send` if payload exists. | Jeff + product/privacy review | Pending Jeff decision | Do not use one-time transactional email or internal attorney-review task without a separate approval packet. |
| 8 | Final public route/domain/anchor verification | Packets reference `/colorado-tech-general-counsel#lead-magnet`. Authority packet still includes preview URL `https://whiteford-ai-law-pages.vercel.app/colorado-tech-general-counsel`; reviewer says replace with final approved production URL or label preview/internal. | Verify exact canonical production domain, route, `#lead-magnet` anchor behavior, HTTPS, page load, no unintended preview label, footer/disclaimer visibility, and approved CTA destination immediately before public copy approval. | Product/web owner + Jeff | Open | Keep all route references internal/preview until exact public domain and anchor are approved. |
| 9 | UTM policy | Reviewer requires final public route/domain/UTM verification. No final UTM naming policy appears in reviewed artifacts. | Approve UTM policy before public/social/email use: allowed source/medium/campaign names, no PII in UTMs, canonical untracked fallback, and final URL examples for LinkedIn, YouTube, email, and direct route. | Jeff + marketing ops/privacy | Open | No public CTA, LinkedIn/social copy, email CTA, ad, or tracking link goes live until UTM policy is approved. |
| 10 | HighLevel 31-field creation gate | Read-only evidence: 37 expected Contact custom fields, 6 present, 31 missing, 0 type mismatches, 0 generated-key risks in present fields. Dry-run-first packet lists exact missing fields and manual UI creation path. | Jeff must approve exact manual UI creation wording before any operator creates fields. Scope: Whiteford Schell IP location only; Contact fields only; 31 listed fields only; no workflow/contact/opportunity/tag/message/social/ad/Clio/Supabase/env/public-page changes. | Jeff + authorized HighLevel operator | Open | Live-field reliance and workflow guard reliance remain blocked while fields are missing. |
| 11 | HighLevel 37/37 verification gate | Dry-run packet specifies post-creation read-only verifier and pass criteria: 37/37 present, 0 missing, 0 type mismatches, 0 generated-key risks, exact `contact.<api_key>` keys, no duplicates. | After approved manual creation, run read-only verification only. Save redacted JSON/Markdown evidence in `docs/`, update index, and stop on any mismatch. Do not proceed to smoke tests or workflow reliance until pass is true. | HighLevel operator + reviewer | Blocked until #10 complete | No live-field smoke test, workflow activation/test/enrollment, or contact writes before pass. |
| 12 | HighLevel workflow guard evidence | Workflow is safety-positive because Draft/Off and linked to `workflow:tech-gc-launchpad`, but executable guard evidence remains incomplete for DND/suppression/unsubscribe, `ops:no-auto-send`, `newsletter:not-consented`, approval status, consent-basis prefix, disclaimer/version/input-type, and conflicts/adverse-party hold. | Approve read-only Draft/Off UI evidence gathering only after field verification if needed. Verify selected workflow remains Draft/Off and every message/action branch blocks unless opt-in, consent basis, suppression clearance, approved disclaimer/version/input-type/source-route, and approval status all pass. | HighLevel campaign operator + reviewer | Open | No save/publish/test/manual start/enrollment while guard evidence is incomplete. |
| 13 | Supabase expanded-schema blocker | Morning review and dashboard packet state expanded Growth OS evidence/approval/contact mirroring is blocked until phase 6-11 expanded tables are installed and sync is rerun/verified. | Authorized database operator must approve/perform DDL installation and verification separately if expanded Supabase evidence will be used. Until then, rely only on local/core artifacts and file-backed evidence for approval records. | Jeff + authorized Supabase/database operator | Blocked | This matrix does not approve running SQL, syncing Supabase, or relying on expanded tables. |
| 14 | Legal/ethics/privacy/copy final review | Current copy is directionally safer, but external use still needs Whiteford confirmation of attorney-advertising posture, disclaimers, co-branding, conflicts language, engagement-process language, source-current posture, and no unsupported claims. | Approve exact public page, form, report, thank-you, email, CTA, footer, and any social/YouTube copy before external use. Approval must preserve educational/no-advice/no-ACR/no-confidential-info/no-guarantee caveats. | Jeff + Whiteford attorney/privacy/brand review | Open | No client/prospect-facing action without exact-copy approval. |
| 15 | Productized review CTA routing | Decision packet says route interested opted-in users to Tech Company OGC Launchpad after value. Tech GC component has a “Recommended service path” block. | CTA must remain bounded and educational: invite a review only after value is delivered; no urgency/hype/guarantee; representation requires conflicts, scope fit, and written engagement; do not contact non-subscribers from the CTA alone. | Jeff + product/legal review | Pending final copy approval | CTA can appear in internal local/preview QA only until public copy is approved. |

## Final approval checklist

### Privacy / terms / disclaimer references

- [ ] Exact Privacy Policy URL or approved privacy/footer text is named for Tech GC intake/report path.
- [ ] Exact Terms/Disclaimer URL or route-level disclaimer text is approved.
- [ ] Public page, report, thank-you state, and any email all include no legal advice, no attorney-client relationship, no confidential information, no guarantee, conflicts/engagement caveat, and attorney-advertising posture approved by Whiteford.
- [ ] Data minimization, retention, report-link/storage behavior, and HighLevel field use are approved.

### Consent / newsletter / non-subscriber value

- [ ] Basic educational browser value is available without requiring marketing opt-in.
- [ ] Marketing/newsletter opt-in is optional and unchecked by default.
- [ ] `newsletter:ai` is applied only when final opt-in copy expressly covers related educational follow-up/newsletter scope.
- [ ] Report-only consent, if used later, is separated from newsletter/nurture consent.
- [ ] Non-subscribers remain no-send/no-auto-send/no-workflow-trigger.
- [ ] High-fit CTAs route only opted-in/high-fit users to bounded productized review paths after value is delivered.

### Route / domain / UTM

- [ ] Final canonical public URL for Tech GC is approved.
- [ ] `/colorado-tech-general-counsel#lead-magnet` loads on the approved domain and scrolls/anchors correctly.
- [ ] Preview/internal URL is not used in public copy unless explicitly labeled preview/internal.
- [ ] UTM examples are approved for LinkedIn, YouTube, email, and direct use; no PII in UTMs.
- [ ] Footer/disclaimer remains visible on final public route.

### HighLevel / CRM

- [ ] Jeff approves exact 31-field manual UI creation scope.
- [ ] Authorized operator creates only approved Contact custom fields; no contacts/opportunities/workflows/messages/tags/social/ads/Clio/env/public pages changed.
- [ ] Read-only verifier shows 37/37 expected fields present, 0 missing, 0 type mismatches, 0 generated-key risks, exact expected keys, and no duplicates.
- [ ] All four intake workflows remain Draft/Off.
- [ ] Tech GC workflow guard evidence proves consent/suppression/no-auto-send/disclaimer/version/input-type/source-route/approval-status gates before any message step.
- [ ] No live smoke test or Jeff-owned TEST record occurs without a separate exact-scope packet.

### Supabase / evidence

- [ ] Expanded-schema DDL is either installed and verified by an authorized operator or explicitly excluded from launch reliance.
- [ ] If installed later, `sync-sqlite-to-supabase.mjs` rerun and verification are documented.
- [ ] Approval evidence remains file-backed/local until Supabase expanded schema is verified.

## Manual approval sequence

1. Jeff chooses Tech GC as internal local/preview QA lane, or holds/selects AI Compliance.
2. Jeff approves on-page-only non-subscriber value policy or requests edits.
3. Jeff/Whiteford approves privacy/terms/disclaimer reference approach for the Tech GC route and report path.
4. Jeff approves or holds the 31-field manual HighLevel creation path.
5. Authorized HighLevel operator creates approved fields only, then runs read-only 37/37 verification and stops on mismatch.
6. Product/web owner verifies final route/domain/anchor and UTM policy, or labels preview URL internal-only.
7. Whiteford legal/ethics/privacy/brand approves exact page/report/CTA/email/footer/sender/unsubscribe copy.
8. Only after all above pass, create a separate activation or Jeff-owned TEST-record packet naming exact records, environment, time window, rollback, no-send safeguards, and evidence artifacts.

## Explicit no-authorization statement

This matrix authorizes no external or live-system action. It does not authorize sending email/SMS/DM, publishing or posting, tagging or commenting on LinkedIn/social, activating/testing/enrolling HighLevel workflows, creating/updating HighLevel/CRM/Clio/Supabase records, running Supabase DDL, deploying or publishing public pages, launching ads, changing production credentials, or contacting clients/prospects.

## Grounding sources

- `docs/whiteford_growth_os_morning_review_2026-05-08.md`
- `docs/reviews/controlled_pilot_tranche_review_2026-05-08.md`
- `docs/pilot/controlled_lead_magnet_pilot_decision_packet_2026-05-08.md`
- `docs/highlevel_31_field_dry_run_approval_packet_2026-05-08.md`
- `docs/lead_magnet_non_subscriber_fulfillment_policy_options_2026-05-08.md`
- `src/components/tech-gc-legal-health-checklist.tsx`
- `src/components/brand.tsx`
- Business-development corpus retrieval run locally for lead-magnet / trust / opt-in / diagnostic principles; applied only as synthesis and not quoted.
