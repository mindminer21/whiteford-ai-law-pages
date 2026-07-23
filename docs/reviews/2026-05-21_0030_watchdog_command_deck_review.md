# Review — 2026-05-21 00:30 watchdog command deck

Task: `t_319219ec`
Parent tasks: `t_06e3f1e5` action brief and `t_685181b7` command deck
Tenant: `whiteford-mountain-west`

Reviewed assets:
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/decision-packets/2026-05-21_0030_watchdog_action_brief.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/decision-packets/2026-05-21_0030_watchdog_command_deck.html`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/decision-packets/2026-05-21_0030_watchdog_command_deck_note.md`

## Verdict

PASS-with-constraints for private/internal Jeff + Whiteford decision prep only.

This review does not authorize public/client-facing use, legal advice, confidential intake, publication, outreach, email/SMS/DM/newsletter/social/LinkedIn/YouTube/ad action, HighLevel/CRM/Supabase/Clio mutation, workflow/campaign activation, workflow enrollment, contact/opportunity/tag/field changes, Supabase DDL/sync/backfill, source-provider restoration, prospect expansion, or prospect contact. Any outward or live-system action still requires a separate exact approval packet naming channel, recipient/audience, final copy, payload/scope, operator, timing, stop rule, rollback/suppression posture, source-currentness/legal/ethics/privacy/brand/deliverability gates, suppression/conflicts posture, and Jeff approval.

No deterministic cleanup is required before Jeff uses the deck as a private decision aid or before a QMD refresh. If any text, labels, screenshots, slide copy, decision boxes, or paths are adapted into public copy, client/prospect-facing content, HighLevel assets, social posts, lead magnets, workflows, CRM checklists, or execution instructions, the adapted artifact must receive a separate exact-copy review and approval packet.

## Scope and method

Review focus:
- legal-advice implication, attorney-client/confidential-information risk, and legal advertising posture
- privacy, data minimization, no-confidential-intake posture, and sensitive-fact handling
- consent/opt-in boundaries, unsubscribe/preference/DND/suppression implications, and final-magnet handling
- source-currentness caveats and treatment of old docs, QMD/RAG memory, and source-access blockers
- no execute controls, no public/client-facing posture, no live HighLevel/CRM/Supabase/Clio/social/email action
- exact human approval gates and whether any deterministic internal cleanup is needed

Checks performed:
- Read the 2026-05-21 action brief, implementation note, and HTML command deck.
- Compared the deck against the parent handoff for `t_685181b7` and this review task's acceptance criteria.
- Ran local static HTML parsing and string checks.
- Extracted the inline JavaScript and ran `node --check`; it passed.
- Queried QMD against the `whiteford-ai-law-pages` collection for current-window 2026-05-21 watchdog/Supabase/HighLevel terms; no results were returned, consistent with the parent note that the new current-window deck/review chain had not yet been embedded.
- Queried the private business-development corpus for diagnostic lead-magnet/narrow-value/opt-in principles and used only synthesis, not copied book text. Strongest hits were `100M Leads` pp. 49-54 and `Lead Funnels` p. 8.

## Findings

### 1. Private/internal-only and no-live-action posture is preserved

PASS.

The action brief, implementation note, and deck repeatedly frame the materials as private/local/internal Jeff + Whiteford decision prep only. The deck cover says it does not approve public launch, live-system mutation, outreach, social activity, workflow enrollment, DDL, sync, backfill, or client/prospect-facing use. The no-live-action boundary slide says to stop if an action leaves private review or changes a live system.

The reviewed assets keep these categories on HOLD unless separately approved: public route/page deployment, email/SMS/newsletter/DM send, LinkedIn/social/YouTube/ad action, HighLevel contact/opportunity/tag/field/campaign/sequence/workflow mutation, workflow activation/enrollment, Supabase DDL/sync/backfill, Clio writes, source-provider restoration, prospect expansion, prospect contact, confidential intake, and client/prospect-facing use.

### 2. Static HTML safety checks pass

PASS.

Local HTML checks found:
- 9 deck slide articles.
- 0 `<form>` tags.
- 2 buttons, both local slide-navigation controls with `type="button"`.
- 1 `href`, the internal fragment `#slide-1`.
- 0 `http://`, `https://`, protocol-relative, `mailto:`, or `tel:` links.
- 0 external `src`, `href`, or `action` attributes.
- 0 `fetch(`, `XMLHttpRequest`, `sendBeacon`, `navigator.sendBeacon`, `gtag(`, production API calls, hidden delivery mechanisms, or form actions.
- Visible `1 / 9` slide count seed, keyboard navigation handlers, print media fallback, local scale-to-fit behavior, and current-slide `localStorage` only.
- Inline JavaScript syntax passed `node --check`.

The text mentions HighLevel, LeadConnector, and Supabase only as blocker/evidence labels, not as executable endpoints or controls. The only interactive behavior is local slide navigation, URL-hash updates, and current-slide persistence. For a private local deck, that does not create CRM, marketing, tracking, outreach, or delivery risk.

### 3. Legal-advice, attorney-client, and legal advertising posture is acceptable for internal review

PASS-with-constraints.

The reviewed assets do not offer legal advice, invite confidential facts, promise legal outcomes, state that counsel has reviewed or cleared any action, or imply attorney-client formation. They function as an internal triage aid for admin/access repair, source-currentness gates, attorney/privacy review, and local product QA.

Constraint: the HTML deck itself does not include exact public-facing phrases such as "not legal advice," "no attorney-client relationship," or "no guarantee." That is acceptable only because this is a private/internal deck and the deck prohibits client/prospect-facing use. If any slide copy is reused externally, exact no-legal-advice, no-attorney-client, no-confidential-info, no-guarantee, attorney-review, conflicts/intake, jurisdiction, and advertising-review caveats must be added and reviewed in the public context.

### 4. Privacy, data minimization, and no-confidential-intake posture is strong

PASS.

The materials contain no named prospect contact data, individualized outreach payloads, private client facts, credentials, API tokens, matter details, privileged content, confidential intake fields, live submission mechanics, tracking pixels, external assets, or public forms. They include internal task IDs, local file paths, blocker descriptions, and the known Whiteford Schell IP HighLevel location ID; that is acceptable for private/internal decision prep.

The deck expressly prohibits collecting confidential, privileged, trade-secret, customer, vendor, security, personnel, cap-table, transaction, matter-specific, or regulated facts through public channels. That is the correct data-minimization posture for AI law, AI patent strategy, tech outside general counsel, and M&A-readiness materials.

### 5. Consent/opt-in and final-magnet handling remain properly gated

PASS.

The action brief and deck treat final-magnet consent routing and browser-value planning as internal review/QA surfaces, not public-launch approval. They preserve the key rule that non-opted users should receive useful browser-only educational value without newsletter subscription, workflow tags, email sequences, report fulfillment email, owner assignment, pipeline movement, auto-send status, or live-system mutation.

The reviewed materials also keep opted-in handling tied to literal `subscribe === true` and make clear that even an opt-in preview does not authorize workflow/email-sequence enrollment without separate approval. This is consistent with the business-development synthesis that a diagnostic asset should solve one narrow problem and earn engaged time/trust before any consultation or follow-up ask; in legal services, that follow-up must remain explicit-opt-in-only, attorney/privacy-gated, and suppression/conflicts-aware.

### 6. Source-currentness caveats are conservative

PASS.

The deck does not make detailed public legal, market, or company-specific claims. It states that source/prospect expansion remains on HOLD until neutral live-source smoke tests pass. It also separates a source-access smoke test from any authorization for outreach, named-company copy, enrichment, HighLevel sync, public copy, or company-specific legal/market claims.

Constraint: if Jeff later approves any public route, social post, newsletter, lead magnet, landing page, prospect list, or company-specific claim, the next artifact must include fresh source evidence as of the intended publication/use date and separate attorney/legal-marketing/source-currentness review. QMD, RAG, old digests, and prior Kanban handoffs are useful internal memory, not source-current proof for public claims.

### 7. Human approval gates are exact enough for private decision prep

PASS.

The action brief and deck include bounded decision lanes for:
- Supabase expanded-schema DDL/admin unblock: `HOLD / GO ADMIN DDL ONLY / REVISE`.
- HighLevel read-only token/location/API access repair: `HOLD / GO READ-ONLY ACCESS REPAIR ONLY / REVISE`.
- Source-access restoration and prospect expansion: `HOLD PROSPECT EXPANSION / GO SOURCE ACCESS SMOKE TEST ONLY / GO NARROW PROSPECT RERUN AFTER PASS / REVISE`.
- Vorto/LinkedIn exact-copy cleanup: `HOLD / GO INTERNAL EXACT-COPY CLEANUP ONLY / REVISE`.
- Final-magnet attorney/privacy and browser-value QA: `HOLD / GO ATTORNEY-PRIVACY REDLINE ONLY / GO LOCAL NO-TOKEN PRODUCT QA ONLY / GO BOTH INTERNAL LANES / REVISE`.

These are manual decision prompts, not execution controls. They name narrow scope, required verification evidence, stop conditions, and non-approved actions. The deck contains no submit controls, external links, send buttons, activate/enroll buttons, API calls, production credentials, or hidden delivery mechanisms.

### 8. No public/client-facing posture is maintained

PASS.

The deck is framed as a visual decision aid and the action brief remains the controlling source. It does not present itself as a public landing page, legal advisory memo to clients, product promise, campaign asset, social draft, outreach copy, or HighLevel execution checklist. The recommendation order favors admin/read-only evidence repair and internal review/QA before any content or prospecting motion.

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

Jeff may use the HTML command deck as a private 2026-05-21 watchdog decision aid only. If Jeff wants operational motion, choose exactly one internal lane: Supabase admin DDL/table verification, HighLevel read-only access repair, neutral source-access smoke test before any prospect rerun, Vorto internal exact-copy cleanup, or final-magnet attorney/privacy redline plus local/no-token browser-value QA. Any public or live-system action requires a separate exact approval packet and explicit Jeff approval.
