# 2026-05-21 00:30 Watchdog Command Deck — implementation note

Status: private/internal Jeff + Whiteford decision prep only. No live action is authorized.

Deliverable HTML: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/decision-packets/2026-05-21_0030_watchdog_command_deck.html`

Source brief: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/decision-packets/2026-05-21_0030_watchdog_action_brief.md`

## What the deck contains

- Fixed 1920x1080 16:9 self-contained local HTML deck with scale-to-fit viewport behavior.
- Nine sparse slides covering:
  1. private/HOLD cover posture,
  2. one-screen watchdog state,
  3. two durable human/admin blockers,
  4. currently safe internal handoffs,
  5. decision boxes for Supabase DDL/admin unblock and HighLevel read-only repair,
  6. decision boxes for source-access HOLD-GO, Vorto exact-copy cleanup, and final-magnet attorney/privacy plus browser-value QA,
  7. next internal lane ordering,
  8. hard no-live-action boundary,
  9. source anchors.
- Keyboard navigation: ArrowRight, PageDown, Space, ArrowLeft, PageUp, Home, End.
- Visible slide count and disabled previous/next navigation state.
- `localStorage` persistence of current slide only.
- Print-friendly fallback that renders all slides, hides navigation controls, and preserves readable text sizing.
- Sparse Whiteford/Schell IP private decision-prep visual system using restrained navy, gold, sage, warning, and hold colors.

## Safety posture

The deck intentionally contains no forms, external assets, external network calls, live CRM/HighLevel/Supabase/Clio controls, external action buttons, send/publish/enroll/activate affordances, or client/prospect-facing copy. The only interactive controls are local slide navigation.

All outward or live-system actions remain blocked unless Jeff separately approves the exact recipient/channel/copy/scope/timing/operator/stop-rule and the relevant attorney, ethics, privacy, conflicts, source-current, brand/accessibility, deliverability, and technical gates.

## Business-development synthesis applied

The deck uses Jeff's private business-development corpus only as synthesis: a strong diagnostic or decision asset should solve one narrow problem, fulfill the promised value before asking for consultation or follow-up, earn engaged time/trust, and keep legal-services follow-up explicit-opt-in-only plus attorney-review-gated. No book text was copied into the deck.

## QMD check

A QMD search against the `whiteford-ai-law-pages` collection for the current-window watchdog terms returned no results before this artifact was written, which is consistent with the source brief's note that no current-window 2026-05-21 command deck existed yet. Direct source files and Kanban handoffs remained controlling.

## Verification performed

- File existence checked for the HTML deck and this note.
- HTML parsed with Python `html.parser`.
- Static checks confirmed 9 slides, visible `1 / 9` slide count seed, keyboard-navigation code, print media block, no `<form>` tags, no submit buttons, no external `http://` or `https://` references, no `fetch`, no `XMLHttpRequest`, no `sendBeacon`, no import/module script, no external stylesheet/script/image references, and no form action attributes.
- Inline JavaScript syntax passed `node --check` after extraction from the HTML.
- Browser verification was attempted, but the browser tool blocked direct `file://` access to this private local path; no browser console result is claimed.
- The Kanban deliverable index was updated with the deck and note paths.

## Verification limitations

This is a private/local static HTML artifact. Static parsing and JavaScript syntax checks passed. Browser console verification was not available because direct local `file://` navigation was blocked by the tool. This verification does not constitute legal, ethics, privacy, deliverability, source-current, CRM, HighLevel, Supabase, Clio, public-channel, or client/prospect-facing approval.
