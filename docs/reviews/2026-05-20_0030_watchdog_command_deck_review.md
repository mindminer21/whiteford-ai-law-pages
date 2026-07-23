# Review — 2026-05-20 00:30 watchdog command deck

Task: `t_bf892071`
Parent task: `t_41c77db2`
Tenant: `whiteford-mountain-west`

Reviewed assets:
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/decision-packets/2026-05-20_0030_watchdog_action_brief.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/decision-packets/2026-05-20_0030_watchdog_command_deck.html`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/decision-packets/2026-05-20_0030_watchdog_command_deck_note.md`

## Verdict

PASS-with-constraints for private/internal Jeff + Whiteford decision prep only.

This review does not authorize public/client-facing use, legal advice, confidential intake, publication, outreach, email/SMS/DM/newsletter/social/LinkedIn/YouTube/ad action, HighLevel/CRM/Supabase/Clio mutation, workflow/campaign activation, workflow enrollment, contact/opportunity/tag/field changes, Supabase DDL/sync/backfill, source-provider restoration, prospect expansion, or prospect contact. Any outward or live-system action still requires a separate exact approval packet naming channel, recipient/audience, final copy, payload/scope, operator, timing, stop rule, rollback/suppression posture, source-currentness/legal/ethics/privacy/brand/deliverability gates, suppression/conflicts posture, and Jeff approval.

No deterministic revision is required before Jeff uses the deck as a private decision aid or before a QMD refresh. If the deck is later adapted into public copy, route copy, social copy, HighLevel assets, or an execution checklist, it must go through a separate exact-copy review.

## Scope and method

Review focus:
- legal-marketing claims and no-legal-advice/no-attorney-client implication
- privacy, data minimization, no-confidential-intake posture, and sensitive-fact handling
- source-currentness caveats and treatment of model/RAG/QMD memory
- consent/opt-in posture, unsubscribe/preference/DND/suppression gates, and final-magnet handling
- explicit manual approval boxes and no-live-action boundaries
- static HTML safety: no forms, external calls, hidden delivery mechanisms, execute controls, or live-system controls
- whether a narrow follow-up is required before approval for private/internal use

Checks performed:
- Read the action brief, implementation note, and HTML deck.
- Compared the deck against parent handoff `t_41c77db2` and this task's acceptance criteria.
- Ran local static HTML parsing and string checks.
- Extracted the inline JavaScript and ran `node --check`; it passed.
- Queried QMD for the exact 2026-05-20 watchdog command-deck phrase; no result was returned, which is expected before this new deck/review chain is embedded. A broader QMD search returned related no-live-action/watchdog/HighLevel/Supabase/final-magnet context from the deliverable index and prior action briefs.
- Queried the private business-development corpus for lead-magnet/diagnostic/opt-in principles and used only synthesized principles, not copied book text. Strongest hits were `100M Leads` pp. 49-54 and `Lead Funnels` p. 2.

## Findings

### 1. Private/internal-only and no-live-action posture is preserved

PASS.

The brief, note, and deck repeatedly frame the artifact as private/local/internal Jeff + Whiteford decision prep only. The deck cover states that it does not approve public launch, live-system mutation, outreach, social activity, workflow enrollment, DDL, sync, backfill, or client/prospect-facing use. Slide 9 adds a clear approval wall: if an action leaves private review or changes a live system, stop.

The reviewed assets keep the following on HOLD unless separately approved: public route/page deployment, email/SMS/newsletter/DM send, LinkedIn/social/YouTube/ad action, HighLevel contact/opportunity/tag/field/campaign/sequence/workflow mutation, workflow activation/enrollment, Supabase DDL/sync/backfill, Clio writes, source-provider restoration, prospect expansion, prospect contact, confidential intake, and client/prospect-facing use.

### 2. Static safety checks pass

PASS.

Local HTML checks found:
- 10 deck slide articles.
- 0 `<form>` tags.
- 2 buttons, both local slide-navigation controls with `type="button"`.
- 1 `href`, the internal fragment `#slide-1`.
- 0 `http://`, `https://`, protocol-relative, `mailto:`, or `tel:` links.
- 0 external `src`, `href`, or `action` attributes.
- 0 `fetch(`, `XMLHttpRequest`, `sendBeacon`, `navigator.sendBeacon`, `gtag(`, LeadConnector host, or Supabase host patterns.
- 1 text-only `analytics` mention inside the no-live-system-mutation wall, not executable analytics code.
- Visible `1 / 10` slide count seed, keyboard navigation handlers, print media fallback, and local scale-to-fit behavior.
- Inline JavaScript syntax passed `node --check`.

The only interactive behavior is local slide navigation, URL-hash updates, and `localStorage` persistence of the current slide number. For a private local deck, that is acceptable and does not create CRM, marketing, tracking, outreach, or delivery risk.

### 3. Legal-marketing, no-legal-advice, and no-attorney-client posture is acceptable for private review

PASS-with-constraints.

The deck is not public legal-marketing copy. It does not offer legal advice, invite confidential facts, promise legal outcomes, state that counsel has reviewed or cleared any action, or imply attorney-client formation. It functions as an internal triage aid for admin/access repair, attorney/privacy review, source-currentness gates, and local product QA.

Constraint: the HTML deck does not use the exact phrase "not legal advice". That is acceptable for this private command deck because the surrounding brief and review packet carry the explicit caveat, the deck is not client/prospect-facing, and slide 9 prohibits client/prospect-facing use and approval claims. If any slide text is reused externally, exact no-legal-advice, no-attorney-client, no-confidential-info, no-guarantee, conflicts/intake, and attorney-review caveats must be added to the public copy.

### 4. Privacy, data minimization, and no-confidential-intake posture is strong

PASS.

The reviewed assets contain no named prospect contact data, individualized outreach payloads, private client facts, credentials, API tokens, matter details, privileged content, confidential intake fields, live submission mechanics, tracking pixels, external assets, or public forms. They include internal task IDs, local file paths, known blocker descriptions, and the known Whiteford Schell IP HighLevel location ID, which is acceptable for private/internal decision prep.

Slide 9 expressly prohibits collecting confidential, privileged, trade-secret, customer, vendor, security, personnel, cap-table, transaction, matter-specific, or regulated facts through public channels. This is the right data-minimization posture for AI law, AI patent, tech outside general counsel, and M&A-readiness lead-magnet or intake assets.

### 5. Consent/opt-in and final-magnet handling remain properly gated

PASS.

The brief and deck correctly treat final-magnet consent routing as internally PASS for private review but not public-launch approval. They preserve the key rule that non-consented submissions must not receive newsletter, workflow, email-sequence, report-fulfillment, owner-assignment, pipeline-movement, auto-send, or live CRM routing. Opted-in handling remains literal `subscribe === true` and still does not authorize workflow/email-sequence enrollment.

This matches the relevant business-development synthesis: a diagnostic lead magnet should solve one narrow problem and earn engaged time/trust before asking for follow-up. In this legal-services context, the follow-up ask must be explicit-opt-in-only and attorney/privacy-gated, with unsubscribe/preference, suppression/DND, conflicts/prior-touch, and intake gates decided before any send or CRM action.

### 6. Source-currentness and public-claim posture is conservative

PASS.

The deck does not make detailed public legal or company-specific claims. It states that prospect/source expansion remains on HOLD until neutral live-source smoke tests pass and that a model, memory, or old document is not source-current evidence. It also keeps named-company/prospect claims, enrichment, outreach drafts, LinkedIn/social use, HighLevel sync, public copy, and company-specific legal/market claims on HOLD without current public-source proof and attorney/source review.

Constraint: if Jeff later approves public use for any route, social post, newsletter, lead magnet, or landing-page claim, the next artifact must include fresh source evidence as of the publication date and separate attorney/legal-marketing/source-currentness review.

### 7. Manual approval boxes and no-live-action boundaries are explicit

PASS.

The deck and source brief include bounded decision boxes for:
- Supabase expanded-schema DDL: `HOLD / GO ADMIN DDL ONLY / REVISE`.
- HighLevel access repair: `HOLD / GO READ-ONLY ACCESS REPAIR ONLY / REVISE`.
- Final-magnet attorney/privacy copy review: `HOLD / GO ATTORNEY-PRIVACY REDLINE ONLY / REVISE`.
- Source access/prospect expansion: `HOLD PROSPECT EXPANSION / GO SOURCE ACCESS SMOKE TEST ONLY / GO NARROW PROSPECT RERUN AFTER PASS / REVISE`.
- Local/no-token browser-value QA: `HOLD / GO LOCAL NO-TOKEN PRODUCT QA ONLY / REVISE`.

These are manual decision prompts, not execution controls. They name scope, verification evidence, stop conditions, and non-approved actions. The deck contains no form fields, submit controls, external links, send buttons, activate/enroll buttons, API calls, production credentials, or hidden delivery mechanisms.

### 8. Campaign-lane and workflow-label map remains draft-only

PASS-with-constraints.

Slide 8 references the expected campaign/route lanes and workflow labels:
- `/ai-patent-strategy-scorecard` → `workflow:ai-patent-strategy`
- `/ai-compliance-gameplan` → `workflow:ai-compliance-readiness`
- `/colorado-tech-general-counsel` → `workflow:tech-gc-launchpad`
- `/colorado-startup-ma-lawyer` → `workflow:ma-readiness`
- `/ai-law-youtube`

The slide expressly says routes and workflow names organize review and do not authorize enrollment or publishing. It avoids outcome guarantees and keeps M&A and legal-service claims conservative.

Constraint: any future HighLevel workflow, email sequence, newsletter, social draft, route copy, or CTA derived from these lanes requires exact-copy review for legal advertising, claim substantiation, consent/unsubscribe/preference handling, DND/suppression/conflicts, non-confidential intake, source-currentness, deliverability, brand/accessibility, and Jeff approval.

## Approval status

Approved only for private/internal Jeff/Whiteford decision prep.

Not approved for:
- public/client/prospect-facing use
- legal advice, attorney-client formation, matter acceptance, attorney assignment, conflicts clearance, or client-specific compliance/diligence/patentability/M&A conclusions
- confidential intake or public collection of sensitive facts
- email, SMS, DMs, newsletters, LinkedIn/social posts/comments/tags, YouTube publication, ads, or outreach
- HighLevel/CRM contact, opportunity, tag, field, owner, campaign, sequence, workflow, notification, pipeline-stage, enrollment, activation, or other live mutation
- Supabase DDL, sync, mirror, backfill, schema/dashboard completeness claims, source-provider restoration, prospect expansion, or Clio writes
- route/schema/metadata/sitemap/canonical/FAQ/download-delivery/public page changes
- claim that attorney, ethics, privacy, conflicts, suppression, source-currentness, brand, accessibility, deliverability, technical, or Jeff approval has been granted for any external action

## Required next action

Jeff may use the HTML command deck as a private 2026-05-20 watchdog decision aid only. If Jeff wants operational motion, choose exactly one internal lane: Supabase admin DDL verification, HighLevel read-only access repair, attorney/privacy redline of exact final-magnet consent copy, neutral source-access smoke test before any prospect rerun, or local/no-token browser-value QA. Any public or live-system action requires a separate exact approval packet and explicit Jeff approval.
