# Source-Access Replacement Preflight Packet — 2026-05-10

Task: `t_04298456`
Tenant: `whiteford-mountain-west`
Status: INTERNAL JEFF/WHITEFORD DECISION PACKET ONLY / NO LIVE PROSPECTING OR EXTERNAL ACTION AUTHORIZED

This packet helps Jeff decide whether to restore Firecrawl, approve a replacement source backend, approve a limited manual official-source workflow, or keep nightly prospecting on hold. It does not run web prospecting, score companies, infer named candidates, stage prospects, mutate CRM/Supabase/HighLevel, write to Clio, send email/SMS, post to LinkedIn/social, launch ads, publish public pages, or create any client/prospect-facing communication.

## 1. Executive decision summary

The 2026-05-10 nightly prospecting run remains source-blocked. Both Firecrawl-backed `web_search` and `web_extract` failed with Payment Required / insufficient credits before any candidate discovery, so the correct operational posture is:

1. Keep prospect discovery, scoring, enrichment, staging, CRM/Supabase/HighLevel sync, outreach, LinkedIn/social, Clio, and public/client-facing action on HOLD.
2. Choose exactly one source-access path: Firecrawl restore, approved replacement backend, approved manual official-source seed workflow, or continued hold.
3. Run neutral source-access smoke tests before any candidate discovery.
4. Treat a smoke-test PASS only as source-tool readiness, not as approval to prospect, stage, sync, or contact anyone.
5. Require a later separate nightly prospect rerun approval under Gates 1-7 before any source-backed candidate work resumes.

Recommended default: continue HOLD unless Jeff is ready to approve either Firecrawl restoration or a specific replacement backend/operator/evidence path. If Jeff wants progress without broad web search, approve only a manual official-source seed queue, with no candidate scoring until extraction passes.

## 2. Controlling evidence from 2026-05-10 artifacts

| Artifact | Evidence | Decision impact |
| --- | --- | --- |
| `docs/nightly-lead-research/runs/2026-05-10/source_unavailable_report.md` | `web_search` and `web_extract` both failed with Payment Required / insufficient Firecrawl credits; prospects researched = 0; contacts/evidence/drafts/approval items/CRM/Supabase/external outreach = 0. | Gate 1 failed before discovery. No named-company work can be inferred. |
| `docs/nightly-lead-research/runs/2026-05-10/digest.md` | Run status stopped at Gate 1; QMD/business-development RAG were available for internal strategy but cannot replace live-source verification. | Local memory/context is not live proof. |
| `docs/nightly-lead-research/runs/2026-05-10/validation_report.md` | Store dry-run and apply ran as a local no-op against zero candidates; zero Agent Targeting work items created. | There is no staged candidate object to approve, sync, or enrich. |
| `docs/nightly-lead-research/runs/2026-05-10/nightly_qwen_prospect_digest_review_t_b4382197.md` | Reviewer verdict: HOLD / no launch / no outreach; packet is safe only as internal source-blocked no-op record. | Reviewer hold remains controlling until source access and later gate review pass. |
| `docs/digests/2026-05-10_overnight_followup_decision_register.md` | Source access remains a separate decision lane; Firecrawl/source-access recovery must happen before any prospect rerun; QMD/RAG are internal memory only. | Source recovery must not be bundled with prospect scoring/staging/outreach. |

## 3. Non-negotiable separation rule

Source-access smoke testing is a tooling preflight, not prospecting.

Allowed in this packet:

- Internal documentation and decision support.
- Confirming the chosen source backend path.
- Running only neutral smoke tests after Jeff/operator resolves source access.
- Recording pass/fail evidence using non-secret excerpts.

Not allowed in this packet:

- Prospect discovery queries or offer-lane search queries.
- Candidate/company/person naming beyond neutral test targets and any Jeff-provided official seed queue labels.
- Prospect scoring, fit classification, enrichment, source-evidence staging, outreach drafting, social drafting, or named-company inference.
- CRM, HighLevel, Supabase, Clio, Apollo, LinkedIn, email/SMS, ad, workflow, public-site, or client/prospect-facing action.
- Paywall/login bypass, captcha evasion, terms-unsafe scraping, or credential exposure.

Smoke-test PASS means only: the source backend can perform neutral search/extraction. It does not authorize a nightly prospect rerun, live-system writes, public action, outreach, workflow activation, or named-company use.

## 4. Decision options

### Option A — Restore Firecrawl

Use when Jeff wants to keep the existing Hermes `web_search` / `web_extract` path unchanged.

Manual owner: Jeff or authorized Hermes/tooling operator.

Preconditions:

- Confirm which Firecrawl account/API key backs Hermes source tools.
- Restore credits, upgrade the plan, or rotate to an approved funded key.
- Do not alter campaigns, HighLevel workflows, CRM records, Supabase schema/data, Clio, LinkedIn/social, email/SMS, ads, public pages, or prospect packets while restoring source access.
- Restart the Hermes session/gateway/worker if required for credential or quota reload.
- Verify quota/credit status without putting secrets in docs, logs, Kanban comments, or screenshots.

Required proof before any prospect rerun:

- Neutral `web_search` PASS.
- Neutral `web_extract` on `https://example.com` PASS.
- Neutral `web_extract` on `https://www.iana.org/domains/reserved` PASS.
- Non-secret smoke-test report saved to the next run notes or an internal docs path.

Stop conditions specific to Firecrawl restore:

- Firecrawl returns Payment Required, insufficient credits, quota, auth, network, empty, extraction, or ambiguous output.
- Operator cannot verify the active Firecrawl-backed tool path.
- Tool output would expose API keys, tokens, account secrets, billing secrets, private URLs, or credential screenshots.
- Any step attempts prospect discovery before all neutral smoke tests pass.
- Any step requests CRM/HighLevel/Supabase/Clio/workflow/social/email/public mutation.

### Option B — Configure approved replacement source backend

Use when Firecrawl recovery is delayed, unreliable, or Jeff wants a more resilient source path.

Manual owner: Jeff plus authorized Hermes/tooling operator.

Minimum approval details required before configuration:

- Backend/tool name:
- Search function covered: yes/no
- Extraction function covered: yes/no
- Owner/operator:
- Credential/quota owner:
- Evidence folder/report path:
- Configuration surface: Hermes config / reviewed tool change / approved environment variable / other:
- Restart/reload step required: yes/no/unknown

Backend requirements:

| Requirement | Must be true before use |
| --- | --- |
| Public-source only | Backend accesses public pages without login bypass, paywall circumvention, captcha evasion, or terms-unsafe scraping. |
| Search + extraction coverage | Backend covers both discovery and page extraction, or pairs cleanly with another approved tool that covers the missing function. |
| Source URL retention | It preserves final URL, title/source name, retrieval timestamp, and extract status for each evidence row. |
| Quota/credit visibility | Operator can verify quota or rate limits before nightly runs without exposing secrets. |
| Reproducibility | Neutral queries/pages can be rerun and logged for reviewer evidence. |
| No CRM side effects | Backend does not create contacts, prospects, tags, opportunities, Supabase rows, messages, workflow actions, or public posts. |
| Reviewability | Failure classes are clear enough for a stop/go decision. |

Required proof before any prospect rerun:

- Neutral source-discovery test equivalent to `web_search(query="example domain", limit=3)` returns non-empty neutral results.
- Neutral page extraction equivalent to `web_extract(["https://example.com"])` returns readable Example Domain content.
- Neutral IANA extraction equivalent to `web_extract(["https://www.iana.org/domains/reserved"])` returns readable reserved-domain content.
- Evidence logging test captures URL, title/heading, timestamp, backend name, pass/fail result, and no-secret error excerpt if failed.
- A reviewer can tell that no prospect-discovery query or candidate/company target was used.

Stop conditions specific to replacement backend:

- Backend identity, operator, credential owner, or config surface is unclear.
- Backend cannot perform either search or extraction, unless Jeff explicitly approves a paired tool and both tools pass neutral tests.
- Backend requires login bypass, paywall bypass, captcha evasion, terms-unsafe scraping, or credential sharing in docs.
- Backend creates, updates, syncs, tags, stages, sends, posts, enriches, or stores prospect/contact records outside the approved internal evidence log.
- Backend returns non-reproducible, unlogged, no-URL, no-title, stale, or ambiguous evidence that cannot support Gate 1.
- Any operator tries to use offer-lane, industry, geography, legal, patent, compliance, M&A, hiring, funding, or company-discovery queries during smoke testing.

### Option C — Manual official-source seed queue only

Use when Jeff already has 1-3 company names and official public URLs and wants a controlled queue for a later source-restored rerun.

Important: manual seeds are not prospects. They are queue notes only until live extraction passes and the nightly workflow reruns under Gates 1-7.

Allowed seed fields:

- Company legal/common name as provided by Jeff.
- Canonical official website URL.
- 2+ public official-source URLs per company where possible: about/product page, press/news page, leadership/team page, investor/portfolio page, USPTO/public filing page, or other official public source.
- Desired lane: AI Patent, AI Compliance, Tech GC, or M&A Readiness.
- Jeff note explaining why the seed should be queued.

Not allowed from manual seeds alone:

- Prospect scoring or `fit_score` assignment.
- Contact/person validation.
- LinkedIn URL validation or tag suggestions.
- Outreach drafts, social drafts, emails, nurture copy, targeting packets, or awareness posts.
- HighLevel, CRM, Supabase, Clio, Apollo, workflow, email/SMS, LinkedIn/social, ad, or public-site action.

Required proof before seed use:

- Neutral source smoke tests pass first.
- Each seed's official URLs are extracted live and logged after smoke-test PASS.
- Gate 1 evidence rows are independently accessible and current enough for review.
- Gates 2-7 still run from scratch.

Stop conditions specific to manual source workflow:

- Jeff has not provided official URLs.
- Live extraction remains blocked.
- Source URLs are paywalled, login-gated, stale, ambiguous, or unofficial with no official corroboration.
- The operator starts inferring contacts, titles, company facts, geography, funding, urgency, or legal need from memory/QMD/RAG/model knowledge.
- Any seed is treated as an approved prospect, staged record, outreach target, LinkedIn awareness target, or CRM/HighLevel action item before Gates 1-7 pass and reviewer/Jeff approvals exist.

### Option D — Continue hold

Use when source funding/configuration is not ready or Jeff does not want a source-tool decision today.

Allowed while held:

- Internal docs.
- Blocker tracking.
- Source-access planning.
- Review of existing already-staged records only under their own prior guardrails.
- QMD/business-development RAG for internal strategy/rubric/copy-quality memory only.

Not allowed while held:

- New prospect discovery, scoring, enrichment, staging, source-evidence creation, outreach drafting, CRM movement, HighLevel mutation, Supabase prospect/evidence writes, Clio writes, social/LinkedIn action, email/SMS, ads, public publishing, or named-company inference.

## 5. Exact neutral smoke-test checklist

Use this checklist only after Jeff/operator has approved Firecrawl restore, replacement backend, or manual workflow source verification. Stop on first failure.

### Preconditions

- [ ] Jeff/operator selected one source path: Firecrawl restored / replacement backend / manual official-source workflow.
- [ ] Operator and evidence path are named.
- [ ] Credential/quota/credit status was checked without exposing secrets.
- [ ] Fresh Hermes session, gateway, or worker restart completed if required.
- [ ] No HighLevel, CRM, Supabase, Clio, Apollo, LinkedIn/social, email/SMS, ad, workflow, public page, or prospect packet mutation occurred as part of source recovery.
- [ ] Operator agrees to run only neutral tests and stop before candidate discovery.

### Test A — neutral source discovery

Tool/action: `web_search` or approved replacement equivalent.

Request shape:

```text
Use the approved source backend for the neutral query: example domain
Limit results to 3. Do not search for prospects, companies, industries, legal needs, funding, hiring, geography, patents, compliance, M&A, or offer-lane terms.
```

PASS requires all of:

- [ ] Result returned without credit/quota/auth/network/error failure.
- [ ] Result count is 1 or more.
- [ ] First result is a neutral public page such as `example.com`, `iana.org`, or reserved-domain documentation.
- [ ] No prospect/company/person/offer-lane query was used.
- [ ] Backend name and timestamp were recorded.

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
- [ ] Backend name and timestamp were recorded.

FAIL / stop if any of:

- [ ] Payment Required, insufficient credits, quota, auth, network, extraction, empty-content, or ambiguous output.
- [ ] Extracted URL differs unexpectedly and cannot be explained.
- [ ] Content is unreadable, missing, or no final URL/title is available.
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
- [ ] Backend name and timestamp were recorded.

FAIL / stop if any of:

- [ ] Payment Required, insufficient credits, quota, auth, network, extraction, empty-content, or ambiguous output.
- [ ] Content is unreadable, missing, stale in a way that blocks confidence, or no final URL/title is available.
- [ ] Output includes or requires secrets.

### Overall smoke-test PASS

The source backend is considered ready for a later rerun only if all are true:

- [ ] Test A PASS.
- [ ] Test B PASS.
- [ ] Test C PASS.
- [ ] No prospect-discovery query, candidate/company/person target, lead-source URL, social profile, CRM URL, or offer-lane search was used.
- [ ] No CRM, HighLevel, Supabase, Clio, Apollo, LinkedIn/social, email/SMS, ad, workflow, public-page, or outreach side effect occurred.
- [ ] Operator recorded a non-secret smoke-test report.
- [ ] Jeff separately approves a fresh nightly prospect rerun before candidate discovery begins.

### Overall smoke-test FAIL

If any test fails:

- [ ] Record only a short non-secret error excerpt.
- [ ] Do not run remaining tests after the first failure.
- [ ] Do not run or resume candidate discovery.
- [ ] Do not infer prospects from intended lanes, prior runs, local memory, QMD, business-development RAG, or model knowledge.
- [ ] Keep the 2026-05-10 source-blocked no-op posture in force.
- [ ] Return to Option A, B, C, or D for a new Jeff decision.

## 6. QMD and business-development RAG rule

QMD and the business-development corpus are internal memory/context only.

Allowed uses:

- Strategy synthesis.
- Rubric wording.
- Lead-magnet promise quality checks.
- Educational, restrained, non-hypey legal-services copy principles.
- Internal decision packet organization.

Not allowed uses:

- Satisfying Gate 1 public-source extraction.
- Naming prospects or companies.
- Validating current company facts, contacts, titles, LinkedIn URLs, funding, hiring, geography, urgency, or legal need.
- Scoring candidate fit.
- Approving outreach, CRM movement, HighLevel sync, Clio action, social/LinkedIn action, public publishing, or any client/prospect-facing action.

Operational phrase for future packets:

```text
local_rag_available_for_strategy_only; cannot satisfy Gate 1 live-source evidence
```

## 7. Copy/paste decision boxes

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
- No prospect discovery, candidate inference, scoring, enrichment, staging, outreach drafting, CRM/HighLevel/Supabase prospect writes, Clio, LinkedIn/social, email/SMS, ads, workflow activation, contact enrollment, public publishing, or named-company action.
- No use of the source-blocked 2026-05-10 output for prospect inference.

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
- No prospect discovery, candidate inference, scoring, enrichment, staging, outreach drafting, CRM/HighLevel/Supabase prospect writes, Clio, LinkedIn/social, email/SMS, ads, workflow activation, contact enrollment, public publishing, or named-company action.

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

### Decision Box 4 — Continue hold

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
- No new prospect discovery, scoring, enrichment, staging, outreach drafts, CRM movement, HighLevel mutation, Supabase prospect/evidence writes, Clio, LinkedIn/social, email/SMS, ads, workflow activation, public publishing, named-company action, or source-current claims.

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
- No reliance on the source-blocked 2026-05-10 output for prospect inference.
- All candidates must have current public-source evidence before scoring.
- Reviewer gate required before CRM movement, outreach, social, or any external action.

Not approved:
- No HighLevel workflow activation, email/SMS, LinkedIn/social posting, Clio writes, ads, public publishing, contact enrollment, live outreach, or prospect-facing action.
- No CRM/HighLevel/Supabase writes beyond a separately approved internal staging/sync scope.

Approver:
Date:
Smoke-test report path:
Operator:
Notes:
```

## 8. Recommended next manual sequence

1. Jeff chooses Decision Box 1, 2, 3, or 4.
2. If Box 1 or 2 is approved, the named operator restores/configures the source backend without touching CRM/HighLevel/Supabase/Clio/public/outreach systems.
3. Operator runs the neutral smoke-test checklist and records a no-secret report.
4. If the smoke test fails, stay on HOLD and do not prospect.
5. If the smoke test passes, Jeff may separately sign Decision Box 5 for a fresh nightly prospect rerun.
6. The rerun must start from scratch under Gates 1-7; all outputs remain `research_only`, DND/default-hold, opt-in-only/no-auto-send, attorney-review-gated, and no-external-action until reviewer and Jeff approvals exist.

## 9. Source anchors

- `docs/digests/2026-05-10_overnight_followup_decision_register.md`
- `docs/nightly-lead-research/source_access_recovery_and_fallback_plan_2026-05-09.md`
- `docs/nightly-lead-research/source_access_recovery_smoke_test_harness_2026-05-09.md`
- `docs/nightly-lead-research/qwen_tool_preflight_hardening_2026-05-09.md`
- `docs/nightly-lead-research/runs/2026-05-10/source_unavailable_report.md`
- `docs/nightly-lead-research/runs/2026-05-10/digest.md`
- `docs/nightly-lead-research/runs/2026-05-10/validation_report.md`
- `docs/nightly-lead-research/runs/2026-05-10/nightly_qwen_prospect_digest_review_t_b4382197.md`

## 10. Bottom line

Do not resume prospecting from the 2026-05-10 source-blocked packet. First choose and verify the source-access path with neutral smoke tests. QMD and business-development RAG remain useful internal memory for educational, narrow, non-hypey, opt-in-only, attorney-review-gated legal-services strategy, but they are not live source proof and cannot support named-company action.
