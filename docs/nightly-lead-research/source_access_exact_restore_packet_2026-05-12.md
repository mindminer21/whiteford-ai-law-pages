# Source-Access Exact-Restore Smoke-Test Packet — 2026-05-12

Task: `t_7fb8b283`  
Tenant: `whiteford-mountain-west`  
Status: INTERNAL JEFF/WHITEFORD DECISION PACKET ONLY / NO LIVE PROSPECTING OR EXTERNAL ACTION AUTHORIZED  
Prepared for: the fifth consecutive source-blocked nightly run

This packet is a no-mutation decision aid. It does not run source tests, consume Firecrawl credits, browse prospects, discover companies, score leads, stage prospects, mutate CRM/Supabase/HighLevel/Clio, activate workflows, send email/SMS/DM, post to LinkedIn/social/YouTube, launch ads, publish pages, or create any client/prospect-facing communication.

## 1. Executive decision summary

The 2026-05-12 nightly prospecting tranche remains on HOLD because Gate 1 live public-source access failed before any candidate discovery. Both `web_search` and `web_extract` returned `402 Payment Required: Insufficient credits` from the Firecrawl-backed source path. The run therefore produced zero prospects, zero contacts, zero source-evidence rows, zero drafts, zero approval items, zero Agent Targeting work items, and a documented HighLevel no-op.

Jeff should choose exactly one narrow source-access path:

1. Restore Firecrawl credits / plan access for the existing Hermes `web_search` and `web_extract` backend.
2. Approve a specific replacement source backend for public-source search and extraction.
3. Approve a manual official-source seed queue only, with no prospect status until live extraction later passes.
4. Continue HOLD.

Recommended default: continue HOLD unless Jeff is ready to approve Firecrawl restoration or a named replacement backend/operator/evidence path. If source access is restored, run only the neutral smoke-test checklist below before any candidate discovery. A smoke-test PASS means only that source tools are available; it does not approve prospecting, CRM/Supabase/HighLevel writes, outreach, social, public action, or client/prospect-facing use.

## 2. Controlling evidence from current artifacts

| Artifact | Evidence | Decision impact |
| --- | --- | --- |
| `docs/nightly-lead-research/runs/2026-05-12/source_unavailable_report.md` | `web_search` and `web_extract` both failed with Payment Required / insufficient Firecrawl credits; prospect staging stopped; no companies researched; no contacts, evidence, or outreach drafts created. | Gate 1 failed before discovery. There is no source-backed candidate list to approve. |
| `docs/reviews/2026-05-12_nightly_noop_qmd_dashboard_refresh_review.md` | Reviewer PASS only for internal/private status visibility and QMD-memory refresh; HOLD for every live, external, CRM, HighLevel, Supabase, workflow, social, email/SMS/DM, LinkedIn, ad, public, Clio, client-facing, or prospect-facing action. | The no-action wall remains controlling. |
| Same reviewer report | QMD and business-development RAG may support internal context only; they cannot replace current public-source evidence. | Local memory cannot satisfy Gate 1 or support named-company action. |
| Same reviewer report | Zero prospects, contacts, evidence rows, drafts, approval items, and Agent Targeting work items; HighLevel sync remains no-op. | There is no object to enrich, sync, contact, publish, or move. |
| `source_access_recovery_and_fallback_plan_2026-05-09.md` | Existing recovery options already separate Firecrawl restore, replacement backend, manual official-source queue, QMD-only context, and continued HOLD. | Use the same separation, now dated to the fifth consecutive blocked run. |
| `source_access_recovery_smoke_test_harness_2026-05-09.md` | Neutral smoke-test targets are `example domain`, `https://example.com`, and `https://www.iana.org/domains/reserved`, with stop-on-first-failure rules. | Any source verification must be neutral, read-only, and non-prospecting. |

## 3. Business-development principle applied

A lead magnet or diagnostic decision asset should solve one narrow useful problem before asking for the next step. The local business-development corpus search for `lead magnet solve one narrow useful problem diagnostic value before next step opt in non hype` surfaced the principle that a good lead magnet is a complete solution to a narrow problem and earns engagement by helping first.

Applied to Whiteford/Schell IP Growth OS:

- The narrow useful problem here is not `find prospects anyway`; it is `prove whether the source backend can safely produce current public-source evidence`.
- The diagnostic value comes from a clean pass/fail source-access smoke test and a clear Jeff decision record.
- Legal-services follow-up remains opt-in-only, restrained, non-hypey, attorney-review-gated, and source-current.
- No prospect should be inferred from memory, prior intended lanes, QMD, RAG, or model knowledge while Gate 1 is blocked.

## 4. Non-negotiable separation rule

Source-access restoration and smoke testing are tooling preflight. They are not prospecting.

Allowed by this packet:

- Internal documentation and Jeff decision support.
- Firecrawl credit/plan restoration if Jeff/operator separately approves it.
- Configuration of a specific replacement backend if Jeff/operator separately approves it.
- Queuing manual official-source seeds as future input notes only if Jeff provides them.
- Neutral read-only smoke-test design and later evidence capture.
- QMD/business-development RAG use for internal strategy, rubric language, and copy-quality guardrails only.

Not allowed by this packet:

- Running live source tests during this task.
- Prospect discovery queries or offer-lane searches.
- Candidate/company/person naming beyond Jeff-provided seed labels and neutral test targets.
- Prospect scoring, enrichment, source-evidence staging, contact validation, LinkedIn lookup, outreach drafting, social drafting, public copy, or named-company inference.
- CRM, HighLevel, Supabase, Clio, Apollo, LinkedIn, email/SMS/DM, ad, workflow, public-site, or client/prospect-facing action.
- Paywall/login bypass, captcha evasion, terms-unsafe scraping, secret exposure, or credential screenshots in docs/Kanban.

## 5. Decision path A — Firecrawl credit restore

Use when Jeff wants to keep the existing Hermes `web_search` / `web_extract` path unchanged.

Manual owner: Jeff or authorized Hermes/tooling operator.

Preconditions before any neutral source test:

- [ ] Confirm which Firecrawl account/API key backs Hermes `web_search` and `web_extract` without exposing secrets.
- [ ] Restore credits, upgrade plan access, or rotate to an approved funded key.
- [ ] Confirm quota/credit status without screenshots or secret values in docs, logs, or Kanban.
- [ ] Restart Hermes session/gateway/worker if credential or quota reload requires it.
- [ ] Confirm no CRM, HighLevel, Supabase, Clio, Apollo, LinkedIn/social, email/SMS/DM, ads, workflows, public pages, or prospect packets were changed as part of restoration.

Required proof before any prospect rerun:

- Neutral search smoke test PASS.
- Neutral `https://example.com` extraction PASS.
- Neutral `https://www.iana.org/domains/reserved` extraction PASS.
- Non-secret smoke-test report saved to an internal docs path or next run notes.
- Jeff separately approves any future prospect rerun after the smoke-test PASS.

Firecrawl-specific stop conditions:

- Payment Required, insufficient credits, quota, auth, network, empty, extraction, or ambiguous output.
- Operator cannot verify that the active backend is the restored Firecrawl path.
- Tool output would expose secrets or billing/account details.
- Any step attempts prospect discovery, offer-lane search, candidate extraction, CRM write, workflow action, or public/client-facing action.

## 6. Decision path B — Approved replacement source backend

Use when Firecrawl recovery is delayed, unreliable, or Jeff wants a separate approved search/extraction path.

Manual owner: Jeff plus authorized Hermes/tooling operator.

Minimum approval details required before configuration or use:

- Backend/tool name:
- Search coverage: yes/no
- Extraction coverage: yes/no
- Owner/operator:
- Credential/quota owner:
- Evidence/report path:
- Configuration surface: Hermes config / reviewed tool change / approved environment variable / other:
- Restart/reload required: yes/no/unknown

Backend requirements:

| Requirement | Must be true before use |
| --- | --- |
| Public-source only | Accesses public pages without login bypass, paywall circumvention, captcha evasion, or terms-unsafe scraping. |
| Search + extraction coverage | Covers both discovery search and page extraction, or pairs cleanly with another approved tool that covers the missing function. |
| Source URL retention | Preserves final URL, title/source name, retrieval timestamp, backend name, and extraction status. |
| Quota/credit visibility | Operator can verify quota or rate limits before runs without exposing secrets. |
| Reproducibility | Neutral queries/pages can be rerun and logged for reviewer evidence. |
| No CRM side effects | Does not create contacts, prospects, tags, opportunities, Supabase rows, messages, workflow actions, or public posts. |
| Reviewability | Failure classes are clear enough for a stop/go decision. |

Required proof before any prospect rerun:

- Neutral source-discovery equivalent to `web_search(query="example domain", limit=3)` returns non-empty neutral results.
- Neutral extraction equivalent to `web_extract(["https://example.com"])` returns readable Example Domain content.
- Neutral extraction equivalent to `web_extract(["https://www.iana.org/domains/reserved"])` returns readable reserved-domain content.
- Evidence logging captures backend, URL/title, timestamp, pass/fail, and short no-secret error excerpt if failed.
- Reviewer can tell that no prospect-discovery query or candidate/company/person target was used.

Replacement-backend stop conditions:

- Backend identity, operator, credential owner, configuration surface, or scope is unclear.
- Backend cannot perform either search or extraction, unless Jeff explicitly approves a paired tool and both pass neutral tests.
- Backend requires login bypass, paywall bypass, captcha evasion, terms-unsafe scraping, or credential sharing in docs.
- Backend writes, syncs, tags, stages, sends, posts, enriches, or stores prospect/contact records outside the approved internal evidence log.
- Backend output lacks reproducible URL/title/source/timestamp or cannot support Gate 1.
- Any operator uses offer-lane, industry, geography, legal, patent, compliance, M&A, hiring, funding, or company-discovery queries during smoke testing.

## 7. Decision path C — Manual official-source seed queue

Use only if Jeff already has 1-3 company names and official public URLs and wants a controlled queue for a later source-restored rerun.

Manual seeds are not prospects. They are queue notes only until live extraction passes and the nightly workflow reruns under Gates 1-7.

Allowed seed fields:

- Company legal/common name as provided by Jeff.
- Canonical official website URL.
- Two or more public official-source URLs per company where possible: about/product page, press/news page, leadership/team page, investor/portfolio page, USPTO/public filing page, or other official public source.
- Desired lane: AI Patent, AI Compliance, Tech GC, or M&A Readiness.
- Jeff note explaining why the seed should be queued.

Not allowed from manual seeds alone:

- Fit scoring, company-fact inference, contact/person validation, LinkedIn lookup, tag suggestions, outreach drafts, social drafts, emails, nurture copy, targeting packets, awareness posts, HighLevel/CRM/Supabase/Clio/Apollo action, workflow activation, ads, public-site updates, or client/prospect-facing use.

Required before seed use:

- Neutral source smoke tests pass first.
- Each seed's official URLs are extracted live and logged after smoke-test PASS.
- Gate 1 evidence rows are independently accessible and current enough for review.
- Gates 2-7 run from scratch.
- Reviewer and Jeff approvals exist for any later movement beyond `research_only`.

Manual-seed stop conditions:

- Jeff has not provided official URLs.
- Live extraction remains blocked.
- Source URLs are paywalled, login-gated, stale, ambiguous, unofficial, or uncorroborated.
- Operator starts inferring contacts, titles, company facts, geography, funding, urgency, or legal need from memory/QMD/RAG/model knowledge.
- Any seed is treated as an approved prospect, staged record, outreach target, LinkedIn awareness target, or CRM/HighLevel action item before Gates 1-7 pass.

## 8. Decision path D — Continued HOLD

Use when source funding/configuration is not ready or Jeff does not want a source-tool decision today.

Allowed while held:

- Internal docs.
- Blocker tracking.
- Source-access planning.
- Existing already-staged-record review under each record's prior guardrails only.
- QMD/business-development RAG for internal strategy/rubric/copy-quality memory only.

Not allowed while held:

- New prospect discovery, scoring, enrichment, staging, source-evidence creation, contact validation, outreach drafting, CRM movement, HighLevel mutation, Supabase prospect/evidence writes, Clio writes, LinkedIn/social action, email/SMS/DM, ads, workflow activation, public publishing, named-company action, source-current claims, or client/prospect-facing use.

## 9. Neutral smoke-test commands/checklist

Run this checklist only after Jeff/operator has approved Firecrawl restore or a specific replacement backend. Stop on first failure. These are Hermes tool requests or approved-backend equivalents, not shell commands.

### Preconditions

- [ ] Jeff/operator selected exactly one source path: Firecrawl restored / replacement backend.
- [ ] Operator and evidence path are named.
- [ ] Credential/quota/credit status was checked without exposing secrets.
- [ ] Fresh Hermes session, gateway, or worker restart completed if required.
- [ ] No HighLevel, CRM, Supabase, Clio, Apollo, LinkedIn/social, email/SMS/DM, ad, workflow, public page, or prospect packet mutation occurred as part of source recovery.
- [ ] Operator agrees to run only neutral tests and stop before candidate discovery.

### Test A — neutral source discovery

Tool/action: `web_search` or approved replacement equivalent.

Request shape:

```text
Use the approved source backend for the neutral query: example domain
Limit results to 3.
Do not search for prospects, companies, industries, legal needs, funding, hiring, geography, patents, compliance, M&A, or offer-lane terms.
```

PASS requires all of:

- [ ] Result returned without credit/quota/auth/network/error failure.
- [ ] Result count is 1 or more.
- [ ] First result is a neutral public page such as `example.com`, `iana.org`, or reserved-domain documentation.
- [ ] No prospect/company/person/offer-lane query was used.
- [ ] Backend name, timestamp, query, result count, and first neutral URL/title were recorded.

FAIL / stop if any of:

- [ ] Payment Required, insufficient credits, quota, auth, network, empty result, or ambiguous output.
- [ ] Results are not reproducible or lack URL/title/source name.
- [ ] Query included prospecting, company discovery, or offer-lane terms.
- [ ] Output includes or requires secrets.

### Test B — neutral extraction: Example Domain

Tool/action: `web_extract` or approved replacement equivalent.

Request shape:

```text
Use the approved source backend to extract this neutral public URL only: https://example.com
Do not extract prospect, company, social, CRM, or lead-source URLs.
```

PASS requires all of:

- [ ] URL extracted without credit/quota/auth/network/error failure.
- [ ] Title or heading includes `Example Domain` or readable equivalent.
- [ ] Readable content is present.
- [ ] No prospect/company/person URL was used.
- [ ] Backend name, timestamp, URL, title/heading, and readable-content result were recorded.

FAIL / stop if any of:

- [ ] Payment Required, insufficient credits, quota, auth, network, extraction, empty-content, or ambiguous output.
- [ ] Extracted URL differs unexpectedly and cannot be explained.
- [ ] Content is unreadable, missing, or lacks final URL/title.
- [ ] Output includes or requires secrets.

### Test C — neutral extraction: IANA reserved domains

Tool/action: `web_extract` or approved replacement equivalent.

Request shape:

```text
Use the approved source backend to extract this neutral public URL only: https://www.iana.org/domains/reserved
Do not extract prospect, company, social, CRM, or lead-source URLs.
```

PASS requires all of:

- [ ] URL extracted without credit/quota/auth/network/error failure.
- [ ] Readable content is present.
- [ ] Content mentions reserved domains or IANA reserved-domain documentation.
- [ ] No prospect/company/person URL was used.
- [ ] Backend name, timestamp, URL, title/heading, and readable-content result were recorded.

FAIL / stop if any of:

- [ ] Payment Required, insufficient credits, quota, auth, network, extraction, empty-content, or ambiguous output.
- [ ] Content is unreadable, missing, stale in a way that blocks confidence, or lacks final URL/title.
- [ ] Output includes or requires secrets.

## 10. Evidence capture template

Copy this into the next run notes or a new internal report after Jeff/operator authorizes and runs the neutral tests.

```text
SOURCE ACCESS EXACT-RESTORE SMOKE TEST REPORT
Date/time:
Operator:
Task/approval reference:
Backend tested: Firecrawl restored / approved replacement backend:
Credential or quota check confirmed without secrets: yes/no
Fresh session or restart performed if required: yes/no/not required
Evidence path:

Guardrail confirmation:
- Prospect discovery queries used: no
- Candidate/company/person targets used: no
- Offer-lane, industry, legal, funding, hiring, geography, patent, compliance, M&A queries used: no
- CRM/HighLevel/Supabase/Clio writes attempted: no
- Email/SMS/DM/LinkedIn/social/ad/public actions attempted: no
- Secrets included in this report: no

Test A — neutral source discovery
- Query: example domain
- Result: PASS/FAIL
- Result count:
- First neutral URL/title:
- Backend/timestamp:
- Error excerpt if failed:
- Stop condition triggered: yes/no

Test B — neutral extraction: example.com
- URL: https://example.com
- Result: PASS/FAIL
- Expected heading/content found: yes/no
- Backend/timestamp:
- Error excerpt if failed:
- Stop condition triggered: yes/no

Test C — neutral extraction: IANA reserved domains
- URL: https://www.iana.org/domains/reserved
- Result: PASS/FAIL
- Readable reserved-domain content found: yes/no
- Backend/timestamp:
- Error excerpt if failed:
- Stop condition triggered: yes/no

Overall verdict:
- PASS — source backend smoke test succeeded; candidate discovery still requires separately approved fresh nightly rerun under Gates 1-7.
- FAIL — source backend remains blocked; keep 2026-05-12 source-blocked no-op posture and do not run candidate discovery.

Next action:
```

## 11. Overall pass/fail criteria

Overall PASS requires all of:

- Test A PASS.
- Test B PASS.
- Test C PASS.
- No prospect-discovery query, candidate/company/person target, lead-source URL, social profile, CRM URL, or offer-lane search was used.
- No CRM, HighLevel, Supabase, Clio, Apollo, LinkedIn/social, email/SMS/DM, ad, workflow, public-page, or outreach side effect occurred.
- Operator recorded a non-secret smoke-test report.
- Jeff separately approves any fresh nightly prospect rerun before candidate discovery begins.

Overall FAIL applies if any test fails or if any guardrail is breached. On FAIL:

- Record only a short non-secret error excerpt.
- Do not run remaining tests after the first failure.
- Do not run or resume candidate discovery.
- Do not infer prospects from intended lanes, prior runs, local memory, QMD, business-development RAG, or model knowledge.
- Keep the 2026-05-12 source-blocked no-op posture in force.
- Return to Firecrawl restore, replacement backend, manual official-source seed queue, or continued HOLD for a new Jeff decision.

## 12. QMD and business-development RAG rule

QMD and business-development RAG are internal memory/context only.

Allowed uses:

- Internal strategy synthesis.
- Rubric wording.
- Lead-magnet promise quality checks.
- Educational, restrained, non-hypey legal-services copy principles.
- Internal decision packet organization.
- Finding historical handoffs, blocker lineage, and prior review decisions.

Not allowed uses:

- Satisfying Gate 1 live public-source extraction.
- Naming prospects or companies.
- Validating current company facts, contacts, titles, LinkedIn URLs, funding, hiring, geography, urgency, or legal need.
- Scoring candidate fit.
- Creating source-evidence rows.
- Approving outreach, CRM movement, HighLevel sync, Clio action, LinkedIn/social action, public publishing, or any client/prospect-facing action.

Operational phrase for future packets:

```text
local_rag_available_for_strategy_only; cannot satisfy Gate 1 live-source evidence
```

## 13. Copy/paste Jeff decision boxes

### Decision Box 1 — Firecrawl restore

```text
APPROVE FIRECRAWL RESTORE FOR INTERNAL SOURCE-ACCESS RECOVERY ONLY

I approve restoring/funding the Firecrawl-backed source backend used by Hermes web_search/web_extract.

Scope approved:
- Restore source-tool access only.
- Verify quota/credits without exposing secrets.
- Restart Hermes/gateway/worker if needed.
- Run only neutral smoke tests: example domain search, https://example.com extraction, and https://www.iana.org/domains/reserved extraction.

Not approved:
- No prospect discovery, candidate inference, scoring, enrichment, staging, outreach drafting, CRM/HighLevel/Supabase prospect writes, Clio, LinkedIn/social, email/SMS/DM, ads, workflow activation, contact enrollment, public publishing, or named-company action.
- No use of the source-blocked 2026-05-12 output for prospect inference.

Approver:
Date:
Operator:
Evidence path:
Notes:
```

### Decision Box 2 — Replacement backend

```text
APPROVE REPLACEMENT SOURCE BACKEND FOR INTERNAL SOURCE-ACCESS RECOVERY ONLY

I approve configuring or using the following replacement source backend for public-source search/extraction and evidence capture only.

Backend/tool:
Owner/operator:
Credential/quota owner:
Evidence path:
Configuration surface:

Required verification before any prospect scoring:
- [ ] Neutral source-discovery test equivalent to web_search(query="example domain", limit=3).
- [ ] Neutral extraction test for https://example.com.
- [ ] Neutral extraction test for https://www.iana.org/domains/reserved.
- [ ] Evidence logging captures backend, URL/title, timestamp, pass/fail, and no-secret error excerpt if failed.

Not approved:
- No paywall/login bypass, captcha evasion, terms-unsafe scraping, or credential exposure.
- No prospect discovery, candidate inference, scoring, enrichment, staging, outreach drafting, CRM/HighLevel/Supabase prospect writes, Clio, LinkedIn/social, email/SMS/DM, ads, workflow activation, contact enrollment, public publishing, or named-company action.

Approver:
Date:
Notes:
```

### Decision Box 3 — Manual official-source seed queue

```text
APPROVE MANUAL OFFICIAL-SOURCE SEED QUEUE ONLY

I approve queuing the following manual official-source seeds for a future source-restored rerun. These seeds are not approved prospects and cannot be scored, staged, synced, contacted, drafted for, or used externally unless live extraction passes and Gates 1-7 later pass.

Seed 1:
- Company name:
- Official website:
- Official URLs:
- Desired lane:
- Jeff note:

Seed 2:
- Company name:
- Official website:
- Official URLs:
- Desired lane:
- Jeff note:

Seed 3:
- Company name:
- Official website:
- Official URLs:
- Desired lane:
- Jeff note:

Required before use:
- [ ] Neutral source smoke tests pass first.
- [ ] Official URLs are extracted live and logged.
- [ ] Gates 1-7 run from scratch.

Not approved:
- No scoring, contact validation, LinkedIn lookup, outreach drafts, CRM/HighLevel/Supabase writes, Clio, social/email/SMS/ad/public action, workflow activation, or named-company external use from seeds alone.

Approver:
Date:
Operator:
Evidence path:
Notes:
```

### Decision Box 4 — Continue HOLD

```text
CONTINUE HOLD — NO SOURCE BACKEND CHANGE OR PROSPECT RERUN

I do not approve source-backend restoration/configuration, manual seed use, neutral smoke tests, or prospect rerun yet.

Allowed work:
- Internal docs.
- Blocker tracking.
- Source-access planning.
- Existing already-staged-record review under prior guardrails only.
- QMD/business-development RAG for internal strategy only.

Not approved:
- No new prospect discovery, scoring, enrichment, staging, outreach drafts, CRM movement, HighLevel mutation, Supabase prospect/evidence writes, Clio, LinkedIn/social, email/SMS/DM, ads, workflow activation, public publishing, named-company action, source-current claims, or client/prospect-facing use.

Approver:
Date:
Reason / revision requested:
Notes:
```

### Decision Box 5 — Later rerun after smoke-test PASS

```text
APPROVE FRESH NIGHTLY PROSPECT RERUN AFTER SOURCE SMOKE-TEST PASS

This approval is valid only after the neutral source-access smoke-test report shows PASS for source discovery, example.com extraction, and IANA reserved-domain extraction.

Scope approved:
- Fresh internal research_only nightly prospect rerun under Gates 1-7.
- No reliance on the source-blocked 2026-05-12 output for prospect inference.
- All candidates must have current public-source evidence before scoring.
- Reviewer gate required before CRM movement, outreach, social, or any external action.

Not approved:
- No HighLevel workflow activation, email/SMS/DM, LinkedIn/social posting, Clio writes, ads, public publishing, contact enrollment, live outreach, or prospect-facing action.
- No CRM/HighLevel/Supabase writes beyond a separately approved internal staging/sync scope.

Approver:
Date:
Smoke-test report path:
Operator:
Notes:
```

## 14. Recommended next manual sequence

1. Jeff chooses Decision Box 1, 2, 3, or 4.
2. If Box 1 or 2 is approved, the named operator restores/configures the source backend without touching CRM/HighLevel/Supabase/Clio/public/outreach systems.
3. Operator runs the neutral smoke-test checklist and records a no-secret report.
4. If the smoke test fails, stay on HOLD and do not prospect.
5. If the smoke test passes, Jeff may separately sign Decision Box 5 for a fresh nightly prospect rerun.
6. The rerun must start from scratch under Gates 1-7; all outputs remain `research_only`, DND/default-hold, opt-in-only/no-auto-send, attorney-review-gated, and no-external-action until reviewer and Jeff approvals exist.

## 15. Source anchors

- `docs/reviews/2026-05-12_nightly_noop_qmd_dashboard_refresh_review.md`
- `docs/nightly-lead-research/runs/2026-05-12/source_unavailable_report.md`
- `docs/nightly-lead-research/runs/2026-05-12/digest.md`
- `docs/nightly-lead-research/runs/2026-05-12/validation_report.md`
- `docs/nightly-lead-research/runs/2026-05-12/highlevel_agent_targeting_sync_noop_report.md`
- `docs/nightly-lead-research/source_access_recovery_and_fallback_plan_2026-05-09.md`
- `docs/nightly-lead-research/source_access_recovery_smoke_test_harness_2026-05-09.md`
- Business-development corpus search: `lead magnet solve one narrow useful problem diagnostic value before next step opt in non hype`

## 16. Bottom line

Keep the 2026-05-12 zero-candidate packet on HOLD until Jeff chooses a source-access path and neutral smoke tests pass. QMD and business-development RAG remain useful internal memory for educational, narrow, non-hypey, opt-in-only, attorney-review-gated legal-services strategy, but they are not current public-source evidence and cannot replace Gate 1.
