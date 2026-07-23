# Pre-Wake Whiteford / Schell IP Action Brief — 2026-05-13

Task: `t_0813b2e5`
Tenant: `whiteford-mountain-west`
Status: INTERNAL JEFF/WHITEFORD DECISION PREP ONLY / NO LIVE-SYSTEM OR EXTERNAL ACTION AUTHORIZED

This brief does not authorize or perform Supabase DDL/sync/backfill, HighLevel/CRM contact or opportunity mutation, workflow activation/test/enrollment, trigger tags, email/SMS/DM/LinkedIn/social/YouTube posting, ads, public publishing, source/prospecting tests, SQLite mutation, Clio writes, credential guessing, or client/prospect-facing action. Public/live/client-facing action remains HOLD unless Jeff gives exact current approval naming the operator, scope, timing, evidence path, and stop rules.

For avoidance of doubt: public/live/client-facing action remains HOLD unless Jeff gives exact current approval.

## 1. One-screen executive summary

Recommended pre-wake posture: HOLD all public/live/client-facing work; allow only private/internal review and one optional local/no-token QA lane.

1. Supabase remains the controlling infrastructure blocker. `t_fa6eb9c1` is still blocked on human/admin DDL access for project `yidxnmxvtohaldkbypcv`; prepared SQL exists at `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql`, but agents should not retry DDL or force downstream tasks.
2. HighLevel Agent Targeting remains human/API-access blocked. `t_7884ab57` has read-only probe failures for location `tm68WWMrcAa3TqQbEAMa` with 401/403/location/Cloudflare denial variants; safe next step is token refresh plus read-only probe and dry-run only, not live sync.
3. Source access and prospecting remain HOLD. Firecrawl/source access failed before candidate discovery in the latest runs, so QMD, local memory, and prior artifacts cannot substitute for current public-source proof.
4. Gated Supabase mirror/backfill tasks (`t_7d361e6b`, `t_cf8c4471`, `t_77403651`, `t_53d470c6`) should stay dependency-gated behind verified expanded-schema completion; do not unlink or force-start them.
5. Safe progress, if Jeff wants one lane today: Tech Company Legal Health Checklist local/no-token QA with synthetic `.invalid` inputs and no production credentials, no real leads, no HighLevel/Supabase/CRM/Clio writes, and no workflow/send/social/public action.
6. Lead-magnet and authority copy should stay attorney-review-only. Apply the business-development principle as internal strategy only: solve one narrow diagnostic problem first, deliver useful value before asking for consultation, and keep legal-services follow-up opt-in-only, non-confidential, non-hypey, and attorney-review-gated.
7. Dashboard/QMD visibility is safe as internal memory and private/local decision support only. `/approval-command-center#exact-unblock-visibility` and QMD can help Jeff see blockers, but they are not approval records, source-current proof, CRM/Supabase/HighLevel state, or execution authority.

PASS now: private Jeff/Whiteford review, internal planning, attorney/legal/ethics/privacy/source-current review, and local/no-token prototype/QA scoping with synthetic data.

HOLD now: public pages, live CRM/HighLevel/Supabase/SQLite/Clio mutation, source/prospecting tests, sends, workflow actions, social/LinkedIn/YouTube, ads, client/prospect-facing use, and any action requiring refreshed credentials or production systems.

## 2. Decision boxes

### Box A — Supabase DDL human/admin gate

Owner: Jeff or a named authorized Supabase admin/operator.

Exact manual unblock or safe internal next action:
- If Jeff chooses to unblock, the authorized operator reviews and runs exactly `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql` in Supabase project `yidxnmxvtohaldkbypcv` using SQL Editor or another approved DDL-capable path.
- Capture non-secret evidence showing project ref, successful SQL execution, and all 33 expanded phase 6-11 mirror tables present.
- Only after verification, complete/unblock `t_fa6eb9c1` and let Kanban dependencies promote mirror/backfill tasks normally.

Hard stop:
- Stop if the operator is not authenticated to the correct project, the SQL differs from the prepared file, DDL errors occur, verification cannot prove expanded tables exist, or credentials are not DDL-capable.

Not authorized:
- No agent credential guessing, service-role DDL attempt, unrelated schema edits, Supabase sync/backfill before verification, forced downstream task start, HighLevel/CRM/Clio/workflow/email/social/public/client-facing action.

Decision:
```text
[ ] HOLD Supabase DDL/sync/backfill.
[ ] APPROVE authorized human/admin DDL review/install only.
Operator: ____________________________
Evidence path: _______________________
```

### Box B — HighLevel token/location gate

Owner: Jeff or named HighLevel operator with access to the Whiteford Schell IP location.

Exact manual unblock or safe internal next action:
- Refresh `/Users/jeff/.openclaw/secrets/ghl-whiteford-schell-ip.json` with a current Private Integration token for location `tm68WWMrcAa3TqQbEAMa` with contact/opportunity read-write scope, without exposing token values in docs, Kanban, chat, screenshots, or commits.
- Run only the read-only `/workflows` probe first.
- If read-only probe passes, run the documented dry-run only for Agent Targeting and confirm `live=false`, zero contacts/opportunities created or linked, no tags, no sends, no workflow enrollment, and expected location/pipeline/stage values.

Hard stop:
- Stop on any 401, 403, Cloudflare 1010, wrong location, missing scope, ambiguous location binding, exposed token, or dry-run output that implies mutation.

Not authorized:
- No `--live` run, contact/opportunity/tag/task/note/pipeline/workflow mutation, workflow publish/activate/test/manual start/enrollment, sends, LinkedIn/social, outreach, public publishing, ads, Supabase, Clio, or client/prospect-facing action.

Decision:
```text
[ ] HOLD HighLevel Agent Targeting work.
[ ] APPROVE token refresh + read-only probe + dry-run only.
Operator: ____________________________
Dry-run evidence path: _______________
```

### Box C — Source-access / prospecting hold

Owner: Jeff for source-backend choice; future source/research operator only after exact approval.

Exact manual unblock or safe internal next action:
- Choose exactly one decision path: continue HOLD, restore Firecrawl credits/key/plan, approve a named replacement public-source backend, or prepare a manual official-source seed queue for later smoke testing.
- If a source path is approved, run only neutral smoke tests first against non-target examples such as `example.com` and IANA reserved-domain pages, saving non-secret evidence.
- Seek separate exact approval before any named-company prospect discovery, source extraction, enrichment, scoring, or rerun.

Hard stop:
- Stop on quota/payment/auth/network errors, empty/ambiguous extraction, paywall/login/captcha/platform restriction, stale source evidence, or any attempt to infer target-company facts from memory.

Not authorized:
- No prospect discovery, named-company research, source extraction on targets, scoring, enrichment, contact validation, LinkedIn lookup, outreach drafts, CRM/HighLevel/Supabase/SQLite/Clio writes, workflow action, social/email/public/client-facing action, or bypass of paywalls/logins/captchas/platform rules.

Decision:
```text
[ ] Continue HOLD.
[ ] Restore Firecrawl for neutral smoke testing only.
[ ] Approve replacement backend for neutral smoke testing only: __________________
[ ] Prepare manual official-source seed queue only.
Operator/evidence path: ____________________________
```

### Box D — Tech GC local/no-token QA lane

Owner: Jeff for approval; future app/QA worker for execution only if separately tasked.

Exact manual unblock or safe internal next action:
- Approve a separate local/no-token QA task for `/colorado-tech-general-counsel` / Tech Company Legal Health Checklist using synthetic TEST company names, `.invalid` emails, non-confidential inputs, preview/local routes, and no production credentials.
- Evidence should confirm browser-visible value, separated optional opt-in, no-confidential-information warnings, no-attorney-client disclaimers, opt-in-only workflow-tag behavior in preview/no-token mode, and no live-system writes.

Hard stop:
- Stop if a real person/company/lead is used, production credentials are present, the route would submit to live HighLevel/CRM, consent is prechecked or bundled, disclaimers are missing, or QA requires public deploy/live tokens.

Not authorized:
- No public route change, production deploy, real lead submission, HighLevel token use, CRM/HighLevel/Supabase/SQLite/Clio mutation, workflow activation/test/enrollment, email/SMS/social/LinkedIn, ads, outreach, or client/prospect-facing use.

Decision:
```text
[ ] HOLD Tech GC QA.
[ ] APPROVE separate local/no-token synthetic QA task only.
Preferred evidence path: ____________________________
```

### Box E — Lead-magnet / authority next copy lane

Owner: Jeff/attorney reviewer for topic and final copy approval; future copy/reviewer workers only after separate tasking.

Exact manual unblock or safe internal next action:
- Choose one narrow internal copy lane: Tech GC result-state copy refinement, AI Patent Scorecard authority/CTA draft, AI Compliance source-current script outline, Founder M&A readiness copy, or one @SchellIP recording topic.
- Apply the corpus-backed principle internally: deliver a complete useful answer to one narrow diagnostic problem before asking for consultation; keep all legal-services follow-up opt-in-only, non-confidential, non-hypey, educational, and attorney-review-gated.
- Route any draft through attorney/legal/ethics/privacy/source-current/brand review before external use.

Hard stop:
- Stop if the draft needs current legal/company facts that have not been rechecked, implies legal advice or outcome guarantees, requests confidential facts, uses pressure/hype, lacks disclaimers, or would route to live workflow/CRM/social/email/public surfaces.

Not authorized:
- No posting, scheduling, uploading, emailing, workflow/campaign activation, CTA launch, public copy change, LinkedIn tagging/commenting/DM/connection action, HighLevel tags, CRM mutation, ads, Clio, or client/prospect-facing use.

Decision:
```text
[ ] HOLD copy lane.
[ ] Approve one internal attorney-review-only copy lane: ________________________
Reviewer/evidence path: ____________________________
```

### Box F — Dashboard / QMD visibility

Owner: Jeff for interpretation; ops/QMD worker only for separate internal refresh tasks.

Exact manual unblock or safe internal next action:
- Open `/approval-command-center#exact-unblock-visibility` locally and use it only to identify current blockers and choose HOLD or one narrow manual-unblock lane.
- Use QMD via `PATH="/opt/homebrew/bin:$PATH" qmd ...` only as internal memory/search support for prior Whiteford/Schell IP Markdown artifacts.
- If dashboard or QMD content is stale, create a separate internal refresh task; do not treat retrieval as proof of current public-source or live-system state.

Hard stop:
- Stop if dashboard/QMD output conflicts with current Kanban blockers, lacks dated evidence, references HTML only indirectly, surfaces stale/private drafts as source-current facts, or could be mistaken for approval.

Not authorized:
- No live API calls, DDL, sync/backfill, HighLevel/CRM/Clio mutation, source/prospecting tests, workflow/send/social/public action, client/prospect-facing use, or treating QMD as consent/legal approval/source-current proof.

Decision:
```text
[ ] Use dashboard/QMD only for internal review.
[ ] Request separate internal refresh task for stale visibility: __________________
No live action authorized: confirmed [ ]
```

## 3. Current blocker and dependency map

| Lane | Current state | Dependency / next gate |
| --- | --- | --- |
| Supabase expanded schema `t_fa6eb9c1` | BLOCKED on human/admin DDL access; local DDL path unavailable; expanded tables still missing per prior read-only checks. | Jeff/named admin runs exact SQL and captures verification, or HOLD. |
| HighLevel Agent Targeting `t_7884ab57` | BLOCKED on token/location/API access; latest posture shows 401/403/Cloudflare/location denial variants. | Refresh correct token; read-only probe; dry-run only; separate live approval required for any mutation. |
| 2026-05-10 mirror `t_7d361e6b` | TODO, dependency-gated. | Do not force-start; wait for `t_fa6eb9c1` completion. |
| 2026-05-11 mirror `t_cf8c4471` | TODO, dependency-gated. | Do not force-start; wait for `t_fa6eb9c1` completion. |
| 2026-05-12 mirror `t_77403651` | TODO, dependency-gated; upstream validation was source-blocked local no-op with zero prospects. | Do not force-start; wait for schema completion. |
| Consolidated backfill `t_53d470c6` | TODO, dependency-gated for partial 2026-05-06 through 2026-05-09 mirror reports. | Start only after authorized schema install and separate mirror/backfill verification approval. |
| Source/prospecting | HOLD due to Firecrawl/source-access gate; QMD/internal memory cannot replace current public-source proof. | Restore/replace source backend and pass neutral smoke tests before any prospect rerun. |
| Public/campaign/client-facing work | HOLD. | Exact current Jeff + attorney/legal/ethics/privacy/source-current/brand/consent approval required. |

## 4. Recommended pre-wake read order

1. This brief: decide HOLD or exactly one narrow internal/manual-unblock lane.
2. Supabase operator packet if Jeff wants a human/admin DDL action: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/ops/2026-05-11_supabase_schema_human_unblock_operator_packet.md`.
3. HighLevel token dry-run packet if Jeff wants token refresh/read-only probe/dry-run: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/highlevel/2026-05-11_agent_targeting_token_refresh_dry_run_packet.md`.
4. Source-access packet if Jeff wants to choose Firecrawl restore, replacement backend, manual official-source seed queue, or continued HOLD: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/source_access_exact_restore_packet_2026-05-12.md`.
5. Approval Command Center: `/approval-command-center#exact-unblock-visibility` as private/local decision visibility only.

## 5. Final safety statement

Unless Jeff gives exact current approval, public/live/client-facing action remains HOLD. This includes public publishing, source/prospecting tests, CRM/HighLevel/Supabase/SQLite/Clio mutation, workflow activation/test/enrollment, email/SMS/DM, LinkedIn/social/YouTube, ads, outreach, live sync/backfill, and any client/prospect-facing use.
