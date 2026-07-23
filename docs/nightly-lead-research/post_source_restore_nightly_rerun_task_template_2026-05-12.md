# Dormant Post-Source-Restore Nightly Rerun Kanban Task Template — 2026-05-12

Task source: `t_5fd0b267`  
Tenant: `whiteford-mountain-west`  
Status: DORMANT TEMPLATE ONLY / DO NOT CREATE OR LAUNCH FROM THIS DOCUMENT  
Intended future use: first fresh nightly prospecting rerun after Jeff restores Firecrawl or approves a replacement source backend, neutral source smoke tests pass, and Jeff approves exact rerun scope.

This file is a copy/paste template for a future Kanban execution task. It is not an approval, not a launched task, and not a prospecting run. The worker who created this template did not create the execution task, did not run source tests, did not run prospecting, did not mutate Growth OS/HighLevel/Supabase/SQLite/Clio, did not publish, did not contact anyone, and did not perform any external or client/prospect-facing action.

## 1. Dormant use rule

Use this template only after all prerequisites below are satisfied and recorded in a human-readable evidence packet.

Required before creating the future rerun task:

1. Jeff/operator selects exactly one source path: restored Firecrawl or a named approved replacement source backend.
2. Credential/quota/source-access status is checked without exposing secrets.
3. A fresh Hermes session/gateway/worker restart is completed if required by the source restore.
4. Neutral source-access smoke tests PASS:
   - `web_search` or equivalent neutral query: `example domain`, limit 3.
   - `web_extract` or equivalent extraction: `https://example.com`.
   - `web_extract` or equivalent extraction: `https://www.iana.org/domains/reserved`.
5. Smoke-test report is saved to a non-secret internal docs path.
6. Supabase DDL/backfill status is resolved or explicitly held out of scope for the rerun.
7. HighLevel token/location access is verified in read-only/dry-run mode or explicitly held out of scope for the rerun.
8. Conflicts, suppression, prior-touch, opt-out, and Clio gates are defined before any record can move beyond `research_only`.
9. Attorney-review and Jeff-approval gates are preserved for any future CRM movement, social copy, outreach, public use, or legal-service follow-up.
10. Jeff gives exact written approval to create the future rerun Kanban task.

If any prerequisite is missing, do not create the task. Continue HOLD or create a separate approval/blocker packet only.

## 2. Source anchors for the future worker

The future worker must read these before acting:

- `docs/nightly_qwen_prospect_research_prompt.md`
- `docs/nightly-lead-research/source_access_exact_restore_packet_2026-05-12.md`
- `docs/nightly-lead-research/runs/2026-05-12/source_unavailable_report.md`
- `docs/nightly-lead-research/runs/2026-05-12/digest.md`
- `docs/nightly-lead-research/runs/2026-05-12/validation_report.md`
- `docs/nightly-lead-research/runs/2026-05-12/highlevel_agent_targeting_sync_noop_report.md`
- The saved neutral source-access smoke-test report path supplied by Jeff/operator.
- Any current Supabase DDL/backfill, HighLevel token/location, conflicts/suppression/Clio, and attorney-review approval packets supplied by Jeff/operator.

Controlling business-development principle: a lead magnet or diagnostic decision asset should solve one narrow useful problem before asking for the next step. The future rerun must create diagnostic value first through source-current, public-evidence-backed lead-magnet fit assessment. Legal-services follow-up remains opt-in-only, non-hypey, source-current, and attorney-review-gated.

## 3. Copy/paste Kanban task shell

Copy only after the dormant use rule is satisfied. Replace every bracketed placeholder before task creation.

```text
Title: Fresh nightly prospecting rerun after source smoke-test PASS — [YYYY-MM-DD]

Assignee: [recommended: qwen-local / growth-research / exact specialist profile approved by Jeff]
Workspace kind: dir
Workspace path: /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages
Priority: [suggested 80-90 only after Jeff approval]
Parents:
- [source-access restore/smoke-test approval task id]
- [Supabase DDL/backfill gate task id or HOLD-out-of-scope approval task id]
- [HighLevel token/location dry-run gate task id or HOLD-out-of-scope approval task id]
- [conflicts/suppression/Clio gate task id]
- [attorney-review/Jeff approval task id]
Idempotency key: whiteford-nightly-post-source-restore-rerun-[YYYY-MM-DD]-[source-backend]-research-only

Body:
Objective: run one fresh internal nightly prospecting rerun only after source-access smoke tests PASS and Jeff approves this exact scope. Start from scratch under Gates 1-7. Do not rely on the source-blocked 2026-05-12 zero-candidate output for prospect inference.

Approved source path:
- Source backend: [Firecrawl restored / replacement backend name]
- Smoke-test report path: [absolute internal path]
- Smoke-test verdict: PASS for neutral discovery, example.com extraction, and IANA reserved-domain extraction
- Operator: [name/profile]
- Approval reference: [task id / packet path]

Run directory:
- Create: docs/nightly-lead-research/runs/[YYYY-MM-DD]/
- If rerunning the same date, create a unique suffix: docs/nightly-lead-research/runs/[YYYY-MM-DD]-post-source-restore-[short-task-id]/
- Save every generated artifact under that run directory.
- Required minimum artifacts: nightly_run_prompt.md, digest.md, prospect_candidates.json, source-access preflight note, validation_report.md/json if validation is in scope, source_unavailable_report.md if any source gate fails, and a non-secret final handoff note.

Scope approved:
- Internal research-only public-source prospecting under Gates 1-7.
- Maximum new companies: [default 10 unless Jeff gives smaller/larger exact approval].
- Maximum contacts: [default 2 per company].
- Maximum attorney-review-only outreach vectors or LinkedIn awareness draft candidates: [default 5].
- Use only public, accessible, source-current information.
- Match each candidate to one narrow lead-magnet lane: AI Patent Strategy Scorecard, AI Compliance Gameplan Builder, Tech Company Legal Health Checklist, or Founder M&A Readiness Checklist.
- Every candidate remains research_only / no-auto-send / opt-in-only until later review and exact approval.

Not approved:
- No email, SMS, DM, LinkedIn message, LinkedIn connection, social post, YouTube/public post, ad, public page publish, workflow activation, sequence enrollment, or client/prospect-facing communication.
- No live HighLevel, Supabase, Clio, Apollo, CRM, SQLite, or Growth OS mutation unless an exact separate approval in this task names the system, records, fields, and mutation scope.
- No workflow trigger tags on researched/imported prospects.
- No legal advice, no attorney-client relationship language, no claim that a prospect has a legal problem, no hype, no guarantees.

Required final response and Kanban comment:
- State exactly what was researched.
- State counts for prospects, contacts, evidence records, drafts, approval items, CRM/sync records, and mutations.
- State that no external outreach, live CRM write, workflow activation, social action, public publishing, Clio action, or client/prospect-facing action occurred unless separately approved and evidenced.
- Provide digest path and run directory path.
- Leave the standard deliverable comment:
  Deliverable: [absolute path or URL]
  Summary: [one sentence describing what Jeff can use it for]
  Next action: [what Jeff or the next worker should do]
```

## 4. Seven validation gates to preserve verbatim in the future task

The future task body must keep these gates as execution requirements and acceptance criteria.

### Gate 1 — Live-source extraction required

- Live `web_search` and `web_extract`, or Jeff-approved equivalents, must be available before prospect discovery.
- Model memory, QMD, snippets alone, old notes, local RAG, prior runs, or business-development corpus content cannot verify current company facts.
- Every material fact used in scoring, outreach vectors, LinkedIn draft candidates, CRM fields, or review notes must have a source URL, accessed date, source type, extracted quote/summary, and confidence.
- At least two independently accessible public URLs are required for a company-level prospect unless downgraded to `research_only`; at least one should be first-party or official where available.

Stop if: credit/quota/auth/network/extraction errors occur; source output is empty, ambiguous, secret-bearing, prospect-inferred from memory, or not reproducible. Write `source_unavailable_report.md` and no-op artifacts only.

### Gate 2 — Domain and entity canonicalization

- Resolve canonical entity before creating or updating any candidate packet.
- Compare official website, product pages, investor pages, legal/privacy pages, and company profile references.
- If multiple companies share a name or adjacent domains, set `entity_ambiguity=true`, keep `outreach_readiness_status=research_only`, and do not create named-contact drafts.

Stop if: canonical domain cannot be confirmed from current public sources.

### Gate 3 — Current URL and stale-page checks

- Open every first-party URL before relying on it.
- Prefer current company, team, leadership, technology, product, news, investor, SEC/state, USPTO, or press pages over guessed URLs.
- Record rejected stale, moved, unrelated, or broken URLs as rejected evidence, not supporting proof.

Stop if: a material fact depends on a stale, broken, moved, unrelated, blocked, or unextractable URL.

### Gate 4 — Contact/person validation

- Do not stage a named contact unless the name is a real person and title is supported by current public source evidence.
- Reject garbled, phonetic, autocomplete, nickname-only, duplicated, or model-generated names.
- Contact confidence below 75 means no named-person outreach draft and no recipient-level CRM enrichment; use role-target guidance only.

Stop if: contact identity or current title cannot be verified.

### Gate 5 — LinkedIn URL hygiene

- A `contact.linkedin_url` must be a public person profile URL matching the verified individual.
- Company pages, search result URLs, school pages, Sales Navigator URLs, login placeholders, and unrelated profile URLs cannot be stored as person LinkedIn URLs.
- Do not scrape LinkedIn or take LinkedIn actions. LinkedIn references remain evidence candidates for attorney review only.

Stop if: LinkedIn URL type or person match is uncertain.

### Gate 6 — Mountain West and jurisdictional claim support

- Do not claim Colorado, Denver, Boulder, or Mountain West relevance unless current public evidence supports headquarters, office, facility, operations, customer/market focus, hiring, funding ecosystem, corridor/route, event, regulatory exposure, or Whiteford service-jurisdiction rationale.
- If relevance is plausible but unsupported, label `geo_relevance_unverified` and do not use it in copy, scoring urgency, or LinkedIn awareness drafts.

Stop if: geography or jurisdictional relevance is unsupported and would affect scoring or copy.

### Gate 7 — Outreach and CRM readiness consequences

Any one of these conditions forces `outreach_readiness_status=research_only`, `external_action_allowed=false`, and no named-recipient draft:

- Live extraction unavailable.
- Canonical domain unresolved.
- Stale or broken source URL supports a material fact.
- Contact is unverified, garbled, duplicated, or unsupported.
- Contact LinkedIn URL is non-person or mismatched.
- Mountain West/localization claim is unsupported.
- Suppression, conflicts, prior-touch, opt-out, or Clio status is not cleared.

When a prospect is held by these gates, create a remediation checklist instead of an outreach vector. The checklist must name the failed gate, missing proof, candidate replacement source URLs, and exact fields blocked from staging.

## 5. Required smoke-test evidence packet for future rerun task creation

The future task creator must paste or link evidence showing:

```text
SOURCE ACCESS SMOKE-TEST EVIDENCE
Date/time:
Operator:
Backend tested:
Approval reference:
Evidence path:
Credential/quota checked without secrets: yes/no
Fresh session/restart completed if required: yes/no/not required

Test A — neutral discovery
- Query: example domain
- Backend/tool:
- Result: PASS
- Result count:
- First neutral URL/title:
- Timestamp:

Test B — neutral extraction
- URL: https://example.com
- Backend/tool:
- Result: PASS
- Expected Example Domain content found: yes
- Timestamp:

Test C — neutral extraction
- URL: https://www.iana.org/domains/reserved
- Backend/tool:
- Result: PASS
- Reserved-domain/IANA content found: yes
- Timestamp:

Guardrail confirmation:
- Prospect discovery queries used during smoke test: no
- Candidate/company/person targets used during smoke test: no
- Offer-lane, industry, legal, patent, compliance, M&A, funding, hiring, or geography queries used during smoke test: no
- CRM/HighLevel/Supabase/Clio/Apollo/SQLite/Growth OS mutations attempted during smoke test: no
- Email/SMS/DM/LinkedIn/social/ad/public actions attempted: no
- Secrets included in report: no
```

If any line cannot be completed honestly, do not create the future rerun task.

## 6. Manual approval gates that must remain exact

These gates cannot be inferred from prior runs or general approval language.

### Firecrawl/source restore gate

Required evidence:

- Firecrawl credits/plan/access restored or replacement source backend approved by name.
- Active backend identity is clear.
- Neutral smoke-test report PASS exists.
- No secret values are pasted into docs/Kanban.

If failed: no prospect discovery; write source-unavailable/no-op docs only.

### Supabase DDL/backfill gate

Required evidence before any Supabase write/backfill:

- Human/admin approval packet names project, SQL path/hash or migration path, expected schema change, backfill scope, and rollback/stop conditions.
- Dry-run or read-only verification is recorded where possible.
- Jeff/admin gives exact approval for the specific DDL/backfill.

Default if absent: Supabase remains out of scope; no Supabase mutation.

### HighLevel token/location gate

Required evidence before any HighLevel mutation:

- Correct Whiteford Schell IP location and pipeline verified.
- Token/location access checked in read-only or dry-run mode.
- Exact records, field mappings, stage, tags, DND/no-auto-send posture, and mutation scope are approved.

Default if absent: HighLevel remains out of scope; no contacts, opportunities, tags, workflows, enrollments, or sends.

### Conflicts/suppression/Clio gate

Required evidence before anything beyond `research_only`:

- Conflicts check path is defined and complete for each named company/person.
- Suppression/opt-out/DND/prior-touch status is clear.
- Clio/client/matter relationship status is cleared by the appropriate human/attorney process.

Default if absent: `research_only`, `external_action_allowed=false`, no named-recipient draft.

### Attorney review gate

Required before public use, outreach, social, website copy, legal-service claim, lead-magnet follow-up, or record movement beyond internal review:

- Attorney/reviewer signs off on source-current facts, legal/ethics framing, disclaimers, non-advice language, opt-in-only posture, and no misleading implication that the prospect has a legal problem.

Default if absent: attorney-review-only internal draft at most.

### Jeff approval gate

Required before task creation and before any future escalation:

- Jeff approval must name the action, date, scope, systems, records or limits, and stop conditions.
- Blanket approvals are not enough for live writes, outreach, public use, workflow tags, HighLevel/Supabase/Clio actions, or rerun scope expansion.

Default if absent: continue HOLD.

## 7. Required run-directory naming and artifact checklist

Preferred run directory for a future first rerun:

```text
docs/nightly-lead-research/runs/[YYYY-MM-DD]-post-source-restore-[short-task-id]/
```

Use plain `docs/nightly-lead-research/runs/[YYYY-MM-DD]/` only if no same-date run already exists and Jeff wants the canonical date directory.

Required artifact checklist:

- `nightly_run_prompt.md` — exact prompt/scope actually used.
- `source_access_preflight.md` — separates live-source availability from QMD/business-development RAG availability.
- `source_smoke_test_reference.md` — path/reference to the PASS smoke-test evidence packet; do not duplicate secrets.
- `prospect_candidates.json` — empty if no candidates pass Gate 1; must preserve schema.
- `digest.md` — human-readable summary with counts and validation-gate summary.
- `validation_report.md` and `validation_report.json` — if local validation/staging is in scope; otherwise note why validation is deferred.
- `source_unavailable_report.md` — required if any source gate fails after task start.
- Optional only with exact approval: dry-run reports for HighLevel or Supabase. No live mutation reports unless separately approved.

## 8. Stop conditions for the future execution worker

Stop immediately, write no-op/source-unavailable evidence, and do not continue discovery if any of these occur:

- Source backend fails, returns quota/auth/payment/network/extraction errors, or cannot produce reproducible URL/title/content evidence.
- Smoke-test PASS evidence is missing, stale, ambiguous, or not tied to the approved backend.
- The task body lacks exact Jeff approval for rerun scope.
- A requested action would mutate HighLevel, Supabase, Clio, CRM, SQLite/Growth OS, Apollo, workflows, tags, public pages, social, LinkedIn, email/SMS/DM, ads, or client/prospect-facing systems without exact separate approval.
- Any candidate relies on memory, QMD, RAG, old notes, snippets alone, or model knowledge for current facts.
- Canonical entity/domain, current URLs, contact identity/title, LinkedIn person URL, Mountain West claim, suppression/conflicts/prior-touch, opt-out, or Clio status fails or is unknown.
- Any draft implies legal advice, an attorney-client relationship, a guaranteed outcome, noncompliance, patentability, deal success, or that Whiteford knows the prospect has a legal problem.
- A source or enrichment path requires login bypass, paywall bypass, captcha evasion, terms-unsafe scraping, secret exposure, or sensitive personal information collection.

## 9. Standard deliverable comment for the future task

The future execution worker must leave this exact comment format with concrete paths:

```text
Deliverable: /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/[RUN-DIR]/digest.md
Summary: Fresh post-source-restore nightly research-only rerun summary with source-access preflight, Gates 1-7 validation status, candidate/contact/evidence/draft counts, and no-external-action confirmation.
Next action: Jeff/reviewer should inspect the digest and validation report; keep all candidates research_only until source evidence, conflicts/suppression/Clio, attorney review, HighLevel/Supabase gates, and exact Jeff approval are complete.
```

If the run stops before candidate discovery, the deliverable should instead point to `source_unavailable_report.md` or the no-op digest and say that the rerun remained blocked.

## 10. Final reminder

This 2026-05-12 document is dormant. It exists so Jeff or a future orchestrator can create a precise, guarded Kanban task later. It does not itself approve source tests, prospect discovery, record staging, CRM/Supabase/HighLevel/Clio writes, workflows, outreach, LinkedIn/social action, public publishing, or legal-services follow-up.
