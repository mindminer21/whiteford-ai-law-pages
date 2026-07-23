# Whiteford / Schell IP Growth OS Watchdog Action Brief — 2026-05-21 00:30 MDT

Status: PRIVATE / INTERNAL Jeff + Whiteford decision prep only.
Prepared: 2026-05-21 00:34 MDT

No live action authorized: no email/SMS/newsletter/DM send, no workflow activation/enrollment, no HighLevel/CRM/Supabase/Clio mutation, no Supabase DDL/sync/backfill, no LinkedIn/social/YouTube/ad action, no public route/page deployment, no source/prospect expansion, and no client/prospect-facing use.

## One-screen summary

Default posture: HOLD external/live work. The overnight watchdog found no new safe live-action lane; it found durable human/admin gates plus dependency-gated Supabase mirror tasks that should remain gated.

Human-blocked now:
- Supabase expanded schema `t_fa6eb9c1`: read-only probe still shows core `prospects` 200 OK, but expanded tables still return 404/PGRST205: `source_evidence`, `suppression_checks`, `outreach_drafts`, `crm_sync_batches`, `ghl_sync_links`, and `content_topics`. Local DDL execution remains unavailable: no Supabase CLI, no psql, no DDL env keys. Prepared SQL remains at `/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql`.
- HighLevel / LeadConnector `t_7884ab57`: read-only `/workflows` probe for location `tm68WWMrcAa3TqQbEAMa` still returns HTTP 403 Cloudflare / LeadConnector Error 1010. No mutation was attempted and none is safe.
- Source/prospect expansion: May 20 digest still shows Firecrawl/source-blocked zero-candidate posture. No prospect expansion, enrichment, named-company copy, HighLevel sync, or outreach should restart until source access passes neutral smoke tests.
- Vorto/LinkedIn exact-copy cleanup: the 2026-05-20 Vorto draft is PASS for internal attorney/Jeff/Whiteford review only, with required pre-post cleanup. It is not approved for posting, tagging, outreach, LinkedIn automation, or public use.
- Final-magnet/browser-value/internal QA: consent routing and browser-value planning have internal PASS/review artifacts, but public/live use still needs attorney/privacy and Jeff decisions. Local/no-token QA is the only potentially safe product lane.

Already completed internal no-op/draft/review work:
- 2026-05-20 nightly prospect validation and HighLevel Agent Targeting sync completed as local no-ops because there were zero validated candidates / zero Agent Targeting work items.
- 2026-05-20 daily digest and QMD refresh are available as internal memory/search support; direct source files and Kanban handoffs remain controlling.
- Final-magnet consent-routing work remains review-ready but not launch-approved.
- May 20 AI Diligence Room and Vorto content assets remain draft/review assets only; content assets are not publish-approved.

Safe next action order:
1. Jeff/admin chooses the Supabase DDL/admin unblock path.
2. Jeff/operator repairs HighLevel read-only token/location/API/browser access, then verifies read-only probes only.
3. Jeff chooses HOLD/GO on source-access restoration smoke tests; prospecting remains HOLD until smoke tests pass.
4. Jeff chooses whether Vorto exact-copy cleanup should proceed as internal copy revision only.
5. Jeff/Whiteford chooses attorney/privacy redline and/or local no-token browser-value QA for the final magnet.

Business-development principle applied: the next decision asset or lead magnet should solve one narrow diagnostic problem, earn trust by delivering useful in-browser value before asking for a consultation, and keep follow-up opt-in-only plus attorney-review-gated.

## Decision box 1 — Supabase expanded-schema DDL/admin unblock

```text
DECISION: [HOLD / GO ADMIN DDL ONLY / REVISE]

Scope approved if GO ADMIN DDL ONLY:
Jeff/admin may apply the prepared phase 6-11 Growth OS schema SQL to the Supabase project through an admin-approved DDL-capable path such as Supabase SQL Editor, direct Postgres access, or another privileged operator path.

Prepared SQL:
/Users/jeff/.openclaw/projects/mountain-west-growth-os/supabase/phase6-11-combined-growth-os-schema.sql

Current evidence:
- Core `prospects` table read-only probe: 200 OK.
- Expanded tables still missing / schema-cache unavailable: `source_evidence`, `suppression_checks`, `outreach_drafts`, `crm_sync_batches`, `ghl_sync_links`, `content_topics` returned 404/PGRST205.
- No local DDL path available to the agent: no Supabase CLI, no psql, no DDL env keys.

Verification required before unblocking mirror/backfill:
1. Confirm expanded tables exist through non-secret read-only evidence.
2. Refresh Supabase schema cache if needed.
3. Then unblock/promote the dependency-gated mirror/backfill chain normally; do not force-start child tasks before table verification.

Not approved:
Agent-executed DDL without admin credentials, Supabase row mutation, mirror sync, backfill, public dashboard completeness claims, HighLevel/CRM mutation, workflow activation, sends, social action, Clio write, outreach, or client/prospect-facing use.

Reason / constraint notes: [insert]
```

## Decision box 2 — HighLevel read-only token/location/API access repair

```text
DECISION: [HOLD / GO READ-ONLY ACCESS REPAIR ONLY / REVISE]

Scope approved if GO READ-ONLY ACCESS REPAIR ONLY:
Jeff/operator may repair the Whiteford Schell IP HighLevel/LeadConnector access path for location `tm68WWMrcAa3TqQbEAMa`, including a valid location-bound Private Integration token, required scopes, and API/browser/IP access that is not blocked by Cloudflare / LeadConnector Error 1010.

Current evidence:
- Harmless read-only `/workflows` probe still returns HTTP 403 Cloudflare / LeadConnector Error 1010.
- No mutation was attempted.
- Prior HighLevel stage state cannot be treated as current live truth until read-only access is repaired.

Required first checks after repair:
1. Run harmless read-only `/workflows` probe for location `tm68WWMrcAa3TqQbEAMa`.
2. Run exact-record dry-run verification only.
3. Re-run the 37-field guardrail verifier before any workflow, email, or field-reliant lead capture reliance.
4. Stop on any 401, 403, Cloudflare Error 1010, wrong location, missing field/user, or scope mismatch.

Not approved:
Live contact/opportunity creation or linking, tag application, owner assignment, pipeline movement, workflow activation/enrollment, test send, email/SMS/social/LinkedIn outreach, Clio write, public/client-facing action, or any mutation before Jeff separately approves exact destination, payload, operator, timing, suppression/rollback posture, and no-send/no-enrollment/no-trigger-tag rules.

Reason / constraint notes: [insert]
```

## Decision box 3 — Source-access restore / prospect expansion HOLD-GO

```text
DECISION: [HOLD PROSPECT EXPANSION / GO SOURCE ACCESS SMOKE TEST ONLY / GO NARROW PROSPECT RERUN AFTER PASS / REVISE]

Scope approved if GO SOURCE ACCESS SMOKE TEST ONLY:
Restore Firecrawl credits or approve an alternate live-source provider, then run neutral `web_search` and `web_extract` smoke tests with pass/fail evidence. This does not restart prospecting by itself.

Scope approved only after source smoke test PASS:
Run one narrow 1-3 prospect expansion through source-current evidence, validation, suppression/conflicts/prior-touch checks, local no-live-action staging, and review gates.

Current evidence:
- 2026-05-20 digest confirms another source-blocked zero-candidate run.
- QMD smoke found the 2026-05-20 digest and QMD refresh; no current-window 2026-05-21 00:30 action brief existed before this file.

Default HOLD conditions:
Keep prospect expansion, named-company claims, enrichment, outreach drafts, LinkedIn/social use, HighLevel sync, and public copy on HOLD if source access is still Payment Required, Cloudflare-blocked, unavailable, unapproved, or not verified by neutral smoke tests.

Not approved:
Contacting prospects, sending email/SMS/DM, posting/tagging/commenting on LinkedIn/social, HighLevel/CRM/Clio mutation, workflow enrollment, ads, public pages, or source-current legal/market claims without current evidence and attorney/source review.

Reason / target source provider: [insert]
```

## Decision box 4 — Vorto / LinkedIn exact-copy cleanup

```text
DECISION: [HOLD / GO INTERNAL EXACT-COPY CLEANUP ONLY / REVISE]

Scope approved if GO INTERNAL EXACT-COPY CLEANUP ONLY:
Revise the 2026-05-20 Vorto LinkedIn awareness draft into an internal no-tag/no-placeholder review copy with approved caveats, an exact CTA URL or CTA-hold note, source-currentness notes, and conflicts/suppression/prior-touch checklist placeholders.

Current evidence:
- Vorto review is PASS for internal attorney/Jeff/Whiteford review only.
- Required cleanup before any manual use: remove public-copy tag placeholders unless expressly approved, add/preserve public caveats, approve an absolute CTA URL, re-verify source currency, complete conflicts/suppression/prior-touch review, avoid unverified numerical/customer claims, and remove stale Kanban status language.

Not approved:
Posting, scheduling, commenting, tagging people or companies, LinkedIn automation, Social Planner scheduling, outreach, CRM/HighLevel/Supabase/Clio mutation, workflow enrollment, ad action, public/client-facing use, or any claim that sources/conflicts/suppression are cleared before fresh evidence and attorney/Jeff approval.

Reason / copy posture: [insert]
```

## Decision box 5 — Final-magnet attorney/privacy + browser-value/internal QA

```text
DECISION: [HOLD / GO ATTORNEY-PRIVACY REDLINE ONLY / GO LOCAL NO-TOKEN PRODUCT QA ONLY / GO BOTH INTERNAL LANES / REVISE]

Scope approved if GO ATTORNEY-PRIVACY REDLINE ONLY:
Prepare or route exact final-magnet checkbox/privacy copy for attorney/privacy review. Copy must distinguish required legal/no-confidential-info acknowledgement from optional email/report/follow-up opt-in, be unchecked by default where it controls email/follow-up, be lane-specific and versioned, and preserve no-legal-advice/no-attorney-client/no-confidential-info/no-guarantee caveats.

Scope approved if GO LOCAL NO-TOKEN PRODUCT QA ONLY:
QA a local/private browser-only value path where non-opted users receive useful on-page educational diagnostic value without email delivery, newsletter subscription, workflow tags, email sequences, report fulfillment email, owner assignment, pipeline movement, auto-send status, or live-system mutation.

Required internal QA evidence:
1. Internal preview banner: no token, no CRM write, no email send.
2. Non-opted routing semantics: `newsletter:not-consented`, no `newsletter:ai`, no `workflow:*`, `consent_basis=no_email_opt_in`, `approval_status=no-auto-send`, `campaignRouting.triggerTag=null`, `campaignRouting.emailSequence=[]`.
3. Opted-in preview remains literal `subscribe === true` and still does not authorize workflow/email-sequence enrollment.
4. Static/no-network scan or local test evidence: no external URLs, form actions, fetches to live systems, HighLevel/Supabase/Clio calls, sendBeacon, workflow activation, or production credentials.

Not approved:
Public launch, route deployment, production credentials, live HighLevel/CRM/Supabase/Clio mutation, report email, workflow activation/enrollment, social/LinkedIn/ad action, source/prospect work, consultation booking claims, or client/prospect-facing use.

Reason / review or QA focus: [insert]
```

## Dependency map / why the board should stay gated

- `t_fa6eb9c1` remains the parent gate for Supabase expanded mirror/backfill children: `t_c2333511`, `t_188a1685`, `t_fd629798`, `t_5fb0187c`, `t_4a921ae0`, `t_77403651`, `t_cf8c4471`, `t_7d361e6b`, and `t_53d470c6`. These should remain dependency-gated until expanded tables are verified.
- `t_7884ab57` remains blocked on usable HighLevel/LeadConnector access. Repair read-only access first; do not convert a read-only repair into a mutation lane.
- Source access remains a precondition to any prospect rerun. A source smoke test is not authorization for outreach.
- Content and lead-magnet artifacts remain review surfaces. They are not workflow, publish, send, or social authorization.

## Sources read

- `docs/KANBAN_DELIVERABLE_INDEX.md` top entries, including 2026-05-20 daily digest, Vorto review/QMD refresh, and 2026-05-20 00:30 watchdog action brief/deck/review chain.
- `docs/digests/2026-05-20_daily_digest.md`.
- `docs/reports/2026-05-20-2230-daily-digest-vorto-qmd-refresh.md`.
- `docs/decision-packets/2026-05-20_0030_watchdog_action_brief.md`.
- Kanban blocker `t_fa6eb9c1` for expanded Supabase Growth OS mirror schema.
- Kanban blocker `t_7884ab57` for HighLevel Agent Targeting sync/access.
- Fresh watchdog facts supplied in task body for Supabase read-only probe, HighLevel `/workflows` 403/Error 1010 probe, and QMD current-window no-duplicate check.
- Business-development corpus preflight principle supplied in task body: narrow diagnostic value, engaged time/trust before consultation, opt-in-only follow-up, attorney-review gate.

## Bottom line

Jeff can safely make five internal decisions from this brief. The highest-leverage GO choices are admin/access repair and internal review/QA, not launch. Until those gates pass, keep public, CRM, workflow, source/prospect, send, social, ad, Clio, Supabase mutation/backfill, and client-facing action on HOLD.
