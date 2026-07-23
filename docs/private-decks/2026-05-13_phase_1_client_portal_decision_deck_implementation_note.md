# Phase 1 OGC client portal decision deck implementation note

Date: 2026-05-13  
Task: t_b395b770  
Status: Private/local Jeff/Whiteford decision prep only

## Deliverable

- HTML deck: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/private-decks/2026-05-13_phase_1_client_portal_decision_deck.html`

## Source basis

- Phase 1 approval matrix: `docs/client-portal/2026-05-13_phase_1_client_portal_approval_matrix.md`
- Phase 0 implementation note: `docs/client-portal/2026-05-13_phase_0_mock_ogc_client_portal_implementation_note.md`
- Phase 0 PASS review: `docs/reviews/2026-05-13_client_portal_phase0_review.md`
- PRD: `docs/prds/2026-05-13_client_portal_lawyer_chat_documents_scheduling_prd.md`
- Offer draft: `docs/offers/2026-05-13_whiteford_tech_company_ogc_ai_compliance_package.md`
- QMD internal-memory smoke search for the approval-matrix/portal handoff.
- Business-development corpus search for managed-access/outside-GC service framing; used only for synthesis, not quoted or reproduced.

## What the deck contains

The deck is a self-contained 16:9 static HTML presentation with eight slides:

1. Cover / posture: architecture approval, not live operation.
2. Decision map: HOLD, approve internal architecture only, or request revisions.
3. System boundary: allowed local/static planning vs reviewable architecture vs not-authorized live operation.
4. Risk gates: identity, data, action, external systems, professional-responsibility, and business-development boundaries.
5. Dependency ladder: posture choice, architecture packet, named approvals, dry-run evidence, then lane-specific implementation tasks.
6. Hard holds: systems and people/external-use prohibitions.
7. Architecture packet checklist: system/data boundary, entity/permission model, controls/no-op plan.
8. Next action checklist: manual Jeff decision prompts and non-authorization reminder.

## Design and safety choices

- Sparse Whiteford-appropriate palette reused from recent private deck patterns: navy, cream, gold, sage, red, and amber.
- Fixed 1920x1080 deck canvas scales to fit the viewport.
- Keyboard navigation supports ArrowLeft, ArrowRight, PageUp, PageDown, Home, End, and Space.
- Visible slide count and hash-based slide deep links are included; slide state is not persisted to localStorage, sessionStorage, cookies, IndexedDB, or any other browser storage.
- No forms, inputs, submit controls, external services, remote fonts, API calls, live data, fake metrics, secrets, tracking, or mutation paths are included.
- Decision boxes are plain text prompts only; they are not approval records and do not execute anything.
- The deck preserves the matrix default: HOLD all live/client-facing changes until separately approved by named owners.

## Verification

Verification performed from the project root:

```bash
python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path
p = Path('docs/private-decks/2026-05-13_phase_1_client_portal_decision_deck.html')
assert p.exists()
HTMLParser().feed(p.read_text())
print('html parse ok')
PY

python3 - <<'PY'
from pathlib import Path
import re
html = Path('docs/private-decks/2026-05-13_phase_1_client_portal_decision_deck.html').read_text()
script = re.search(r'<script>(.*?)</script>', html, re.S).group(1)
Path('/tmp/phase1_portal_deck_script.js').write_text(script)
print('/tmp/phase1_portal_deck_script.js')
PY
node --check /tmp/phase1_portal_deck_script.js
```

Result: PASS. Additional static inspection confirmed 8 slides, no `http://`/`https://` remote references, no `<form>`/`<input>` elements, no `fetch(` calls, and no browser storage API usage (`localStorage`, `sessionStorage`, cookies, or IndexedDB).

Browser verification limitation: local browser verification was attempted with the browser tool against the `file://` URL, but the browser tool blocked the private/internal local file URL. Validation therefore relied on file existence, HTML parser check, JavaScript syntax check, static no-remote/no-form/no-fetch inspection, and source inspection rather than live browser visual/console QA.

## Non-authorization

This deck does not authorize launch, public/client-facing use, deployment, auth setup, storage setup, calendar setup, HighLevel/CRM mutation, Supabase/Clio/DMS mutation, notifications, AI calls, attorney assignments, conflicts clearance, matter acceptance, real client data storage, or engagement-scope expansion.
