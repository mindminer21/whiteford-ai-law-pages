# AI Vendor Intake Snapshot opt-in QA prototype note — 2026-05-17

Task: `t_45b95165`  
Tenant: `whiteford-mountain-west`  
Status: PRIVATE / LOCAL DESIGN ARTIFACT / ATTORNEY-REVIEW-ONLY / NO-LIVE-ACTION

## Deliverable

Prototype:

`/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-17-ai-vendor-intake-snapshot-optin-qa-prototype.html`

This is a self-contained local HTML artifact modeling the request, thank-you, and delivery states for the AI Vendor Intake Snapshot. It is not a route, not a public page, and not an implementation authorization.

Copy-alignment revision note for task `t_bb4b9b41`:

`/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-17-ai-vendor-intake-snapshot-prototype-copy-alignment-note.md`

Revision summary: the two internal prototype warning instances now use the controlling worksheet asset's “trade-secret” wording instead of the prior “trade-sensitive” phrase, with the no-confidential-intake/no-legal-advice/no-attorney-client/no-live-action posture preserved.

## Controlling copy used

Primary controlling source:

`/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-17_ai_vendor_intake_snapshot_worksheet_thank_you_asset.md`

Parent task `t_c7da6557` stated that the worksheet/thank-you asset is private/internal attorney-review-only and that all public, client/prospect-facing, email/social/ad, HighLevel/CRM/Clio/Supabase/workflow/outreach/live action remains on HOLD.

The prototype preserves the controlling posture by making these elements visible:

- private/local and no-live-action status;
- no-confidential-intake warning near the request and delivery states;
- blank-by-default marketing opt-in copy, with delivery not conditioned on marketing consent;
- delivery promise before any service bridge;
- seven worksheet fields;
- visible attorney/ethics/privacy/brand/source-currentness/technical review checklist;
- PASS/HOLD/REVISE launch gate;
- hard boundary against public page, publishing, send, CRM, HighLevel, workflow, social, ad, webinar, contact-tagging, client/prospect-facing, or legal-advice use.

## Business-development and QMD context

Business-development corpus query run:

`python3 /Users/jeff/.hermes/knowledge/business-development/search_business_dev.py "lead magnet opt in thank you page delivery before offer legal services worksheet no confidential intake" --index /Users/jeff/.hermes/knowledge/business-development/business_dev_index.sqlite -k 6`

Relevant synthesis applied: a lead magnet should solve one narrow problem, fulfill the promised value on the thank-you/delivery step, and earn engaged time before a larger service ask. The prototype therefore makes the worksheet delivery state primary and keeps the AI Compliance Gameplan / Colorado Tech General Counsel bridge after fulfillment only.

QMD query run:

`HOME=/Users/jeff /opt/homebrew/bin/node /Users/jeff/.local/lib/node_modules/@tobilu/qmd/dist/cli/qmd.js search "AI Vendor Intake Snapshot opt-in thank-you delivery" --collection whiteford-ai-law-pages --limit 5`

Relevant QMD hits confirmed the prior derivative/review posture: narrow diagnostic problem, no premature consultation ask, and no live/public implementation approval.

## Implementation choices

- Single static HTML file with inline CSS and system fonts.
- No JavaScript.
- No external links, CDN assets, tracking pixels, analytics snippets, or network-dependent resources.
- No real data-entry controls or submit mechanics; field rows and buttons are static visual labels only.
- Restrained Whiteford/Schell IP design posture aligned with recent AI authority prototypes: cream paper background, deep blue, muted gold, sage/rust status accents, and document-like panels.
- No fake metrics, testimonials, guarantees, urgency claims, compliance claims, or public-source assertions beyond the internal review checklist.

## QA checklist

Required checks for this task:

- [x] `test -f` prototype HTML.
- [x] `test -f` QA note.
- [x] Parse HTML with Python `html.parser`.
- [x] Scan the HTML for prohibited implementation constructs and sensitive terms.
- [x] Verify required copy sections are present.
- [x] Update `docs/KANBAN_DELIVERABLE_INDEX.md`.
- [x] Leave standard Kanban deliverable comment.

Verification details are recorded in the Kanban handoff metadata.

## Launch posture

Current decision: HOLD for every external action.

Next action: Jeff/Whiteford attorney, ethics, privacy, brand, source-currentness, and technical reviewers should inspect this exact local artifact and the controlling worksheet/thank-you asset. Any public route, request page, delivery mechanism, HighLevel setup, email, social, webinar, ad, CRM mutation, workflow, or client/prospect-facing use requires a separate exact approval packet.
