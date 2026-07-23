# Source-Access Recovery and Fallback Plan — Nightly Prospecting 2026-05-09

Task: `t_4c104b17`
Related reviewer hold: `t_5d629e41`
Run directory: `docs/nightly-lead-research/runs/2026-05-09/`
Status: internal decision packet only — no prospecting, outreach, CRM mutation, LinkedIn/social action, Clio activity, ad action, or public/client-facing change is authorized by this document.

## 1. Executive decision

The 2026-05-09 nightly prospecting run should remain on HOLD until live public-source access is restored or an approved replacement source backend is configured and verified. The run produced a safe internal no-op packet, but it did not satisfy Gate 1 because it could not perform live-source extraction.

Default recommendation: restore or replace the `web_search` / `web_extract` backend first, then rerun the nightly prospect workflow from scratch under Gates 1-7. Do not infer prospects from intended search lanes, local memory, QMD, or prior runs.

Business-development principle applied: the lead magnet / diagnostic promise is only valuable if the system can fulfill the narrow diagnostic with current, sourced facts before asking for any next step. For Whiteford/Schell IP legal-services growth work, this means educational, restrained, opt-in-only, attorney-review-gated research with current source evidence, not hype, unsupported targeting, or automated outreach.

## 2. Exact blocker evidence

Source files reviewed:

- `docs/nightly-lead-research/runs/2026-05-09/source_unavailable_report.md`
- `docs/nightly-lead-research/runs/2026-05-09/digest.md`
- `docs/nightly-lead-research/runs/2026-05-09/prospect_candidates.json`
- `docs/nightly-lead-research/runs/2026-05-09/nightly_qwen_prospect_digest_review_t_5d629e41.md`

Evidence table:

| Artifact | Evidence | Decision impact |
| --- | --- | --- |
| `source_unavailable_report.md` lines 3-5 | Status is `BLOCKED — no live-source extraction possible`; all material claims require at least two independently accessible public URLs per Gate 1; neither `web_search` nor `web_extract` succeeded. | Gate 1 failed; no prospect staging allowed. |
| `source_unavailable_report.md` lines 9-13 | `web_search` failed with `Payment Required: Insufficient credits (firecrawl.dev)` on 3 attempts; `web_extract` failed with the same error on 2 attempts; curl only provided limited connectivity signals and no prospect data. | Firecrawl/web-source backend is the controlling blocker. |
| `digest.md` lines 5-7 | The run was blocked at Gate 1; both tools failed with Firecrawl credit exhaustion; no prospects were discovered, scored, or staged; no outreach, live CRM writes, workflow activation, or LinkedIn action occurred. | The packet is a no-op record, not an approvable target list. |
| `digest.md` lines 13-21 | Intended source targets included Crunchbase, CB Insights, TechCrunch, Denver Business Journal, and a Whiteford profile page, but source access failed or was blocked; basic HTTP probes were insufficient. | Intended lanes cannot substitute for verified source evidence. |
| `digest.md` lines 115-123 | Gate 1: FAIL; Gates 2-6: N/A; Gate 7: BLOCKED because Gate 1 failure forces research-only. | Do not run downstream validation, scoring, CRM sync, or outreach from this packet. |
| `prospect_candidates.json` lines 6-17 | `web_search` failed after 3 attempts; `web_extract` failed after 2 attempts; Gate 1 reason states both returned `Payment Required` and no prospect staging is possible without live-source extraction. | Structured packet confirms zero candidates and live-source dependency. |
| `prospect_candidates.json` lines 30-37 | Empty `prospects`, `contacts`, `source_evidence`, `outreach_drafts`, `approval_items`, `suppression_checks`, `crm_sync_records`, and `supabase_sync_records`. | There is no data object to approve, enrich, or sync. |
| Reviewer `t_5d629e41` lines 7-12 | Verdict: HOLD / no launch / no outreach; safe only as an internal source-blocked no-op record. | Reviewer hold remains in force. |
| Reviewer `t_5d629e41` lines 41-47 | Do not create, enrich, sync, move stages, tag, publish, or infer companies from intended lanes; rerun must force every candidate through Gates 1-7. | Hard no-prospect/no-outreach guardrails. |
| Reviewer `t_5d629e41` lines 49-54 | Reviewer notes local RAG/QMD status in the packet appears stale/tool-context-specific; live-source Firecrawl issue is the controlling blocker. | Do not treat QMD/RAG as the primary unblock for Gate 1. |

## 3. Recovery options for Jeff / manual operator

### Option A — Restore Firecrawl credits or plan access

Best when Jeff wants to keep the current Hermes `web_search` / `web_extract` path unchanged.

Manual owner: Jeff or authorized Hermes/tooling operator.

Steps:

1. Confirm which Firecrawl account/API key backs Hermes `web_search` and `web_extract`.
2. Restore credits, upgrade the plan, or rotate to an approved funded Firecrawl key.
3. Do not change campaign, CRM, HighLevel, Supabase, or outreach settings while doing this.
4. Start a fresh Hermes session or restart the worker/gateway if credential reload is required.
5. Run the verification checks in Section 6 before rerunning nightly prospecting.

Acceptance signal:

- `web_search` returns normal search results for a neutral test query.
- `web_extract` returns normal content for a neutral public page such as `https://example.com`.
- A source-access smoke test records success in the next run directory before any candidate scoring begins.

### Option B — Swap or add an approved search/extraction backend

Best when Firecrawl recovery is delayed or credits are unreliable.

Manual owner: Jeff plus Hermes/tooling operator.

Allowed decision shape:

- Pick one approved replacement source backend for search and extraction.
- Configure it through Hermes-supported config/tooling rather than ad hoc scraping.
- Keep all legal-marketing guardrails unchanged.
- Require a fresh Gate 1 smoke test before running candidate discovery.

Backend requirements:

| Requirement | Must be true before use |
| --- | --- |
| Public-source only | The backend can access public web pages without login bypass, paywall circumvention, captcha evasion, or terms-unsafe scraping. |
| Source URL retention | It preserves final URL, title, publication/source name, retrieval timestamp, and extract status for each evidence row. |
| Search + extraction coverage | It can perform both discovery search and page extraction, or pairs cleanly with another approved tool that covers the missing function. |
| Rate/credit visibility | The operator can verify quota/credit status before nightly runs. |
| Reproducibility | The same query/page can be rerun and logged for reviewer evidence. |
| No CRM side effects | It does not create prospects, contacts, tags, HighLevel records, Supabase rows, or outreach messages directly. |

Hermes configuration reminder:

- Use Hermes configuration/tooling surfaces (`hermes config`, `hermes tools`, `.env`, provider-specific setup, or a reviewed Hermes tool change) rather than editing live campaigns.
- Tool changes may require a fresh session or gateway restart to take effect.
- Do not put secrets in docs, Kanban summaries, or comments.

### Option C — Manual official-source seed packet, then agent rerun

Best when Jeff already knows 1-3 candidate companies and wants a controlled restart without broad search.

Manual owner: Jeff.

Allowed input:

- Company legal/common name.
- Canonical official website URL.
- 2+ public official-source URLs per company where possible: company about/product page, press/news page, leadership/team page, investor/portfolio page, regulatory or USPTO/public filing page.
- Desired lane: AI Patent, AI Compliance, Tech GC, or M&A Readiness.

Rules:

- Manual seeds are not approved prospects.
- The agent must still extract and cite live sources, validate domains, confirm current pages, and run Gates 1-7.
- If live extraction remains unavailable, manual seeds stay as a queue note only; they do not become research records.

### Option D — QMD / business-development RAG context only

Allowed use: strategy, rubric language, lead-magnet framing, and internal synthesis.

Not allowed use: satisfying Gate 1, naming prospects, asserting current company facts, validating contacts, or approving outreach.

Decision:

- QMD/business-development RAG can help keep copy educational and restrained.
- QMD/business-development RAG cannot replace live public-source evidence.
- Reviewer `t_5d629e41` found the RAG status note in the qwen packet likely stale/tool-context-specific; either way, live-source access remains the blocker.

## 4. Safe interim fallback lanes

These are allowed only while live source access is blocked.

| Lane | Allowed interim work | Not allowed |
| --- | --- | --- |
| Official-source/manual-seed lane | Jeff may provide official public URLs for candidate companies to queue for a future source-restored rerun. | Do not create prospect records, contact records, outreach drafts, HighLevel contacts/opportunities, Supabase prospect rows, or LinkedIn/social drafts from seeds alone. |
| QMD-only context lane | Use local corpus/QMD for offer strategy, educational lead-magnet quality checks, restrained legal copy principles, and review checklists. | Do not use QMD to satisfy Gate 1 or to assert current market/company/contact facts. |
| Prior-run hygiene lane | Review existing already-staged records for source-current gaps, suppression/conflicts needs, DND posture, and attorney-review status. | Do not expand the prospect list, enrich contacts, move opportunities, create tasks in live CRM, or trigger workflows. |
| Internal docs lane | Update blocker docs, rerun checklists, approval packets, and Kanban dependency maps. | Do not send/publish/enroll/post/advertise/import. |

## 5. No-prospect / no-outreach guardrails

Until Gate 1 is restored and the nightly workflow reruns successfully:

1. Do not create or enrich any live prospect record from the 2026-05-09 packet.
2. Do not infer companies from intended search lanes.
3. Do not create contacts, LinkedIn URLs, email addresses, phone numbers, or titles from memory or model knowledge.
4. Do not write prospect/contact/evidence/outreach rows to Supabase or any CRM.
5. Do not create, link, tag, move, or enroll HighLevel contacts/opportunities/workflows.
6. Do not write to Clio or initiate conflicts checks as if the candidates exist.
7. Do not send, queue, schedule, or draft-to-public any email/SMS/LinkedIn/social/ad/public content based on this blocked run.
8. Keep all future researched/imported records `research_only`, `lead_magnet_consented: false`, DND/default-hold, and `ops:no-auto-send` unless Jeff and attorney review explicitly approve a narrower action.
9. Require source-current review, conflicts/suppression/prior-touch checks, CTA/UTM approval, and exact-copy approval before any manual external use.
10. Treat the 2026-05-09 run as an evidence-backed no-op, not as a failed-but-usable target list.

## 6. Rerun checklist

Run this after Jeff/operator resolves source access. Stop on first failure.

### Preflight

- [ ] Confirm no one has mutated HighLevel, Supabase, Clio, Apollo, LinkedIn, email/SMS, ads, or public pages as part of source recovery.
- [ ] Confirm source backend choice: Firecrawl restored OR approved replacement backend selected.
- [ ] Confirm credentials/credits/quota without exposing secrets in docs.
- [ ] Start a fresh Hermes session or restart gateway/worker if required for config reload.
- [ ] Record source-backend decision in the nightly run notes.

### Source smoke tests

- [ ] `web_search` neutral test returns non-empty results.
- [ ] `web_extract` neutral test on `https://example.com` returns readable page content.
- [ ] One official company page extraction succeeds.
- [ ] One news/press source extraction succeeds, or failure is logged with a replacement source path.
- [ ] Rate/credit status is sufficient for the four intended lanes.

### Nightly prospect rerun gates

- [ ] Rerun all four lanes: AI Patent, AI Compliance, Tech GC, M&A Readiness.
- [ ] Limit to 1-3 high-fit candidates unless Jeff changes the run directive.
- [ ] For each candidate, capture at least two independently accessible public URLs before scoring.
- [ ] Gate 1: live-source extraction PASS.
- [ ] Gate 2: entity/domain canonicalization PASS.
- [ ] Gate 3: current URL / stale-page checks PASS.
- [ ] Gate 4: contact/person validation PASS or contact omitted.
- [ ] Gate 5: LinkedIn URL hygiene PASS or LinkedIn omitted.
- [ ] Gate 6: Mountain West / geo relevance support PASS or label national/international watchlist only.
- [ ] Gate 7: outreach/CRM readiness stays HOLD unless reviewer and Jeff approve.

### Post-run review

- [ ] Generate `prospect_candidates.json`, `digest.md`, and validation report.
- [ ] Keep all candidates `research_only` until reviewer gate.
- [ ] Verify zero sends, zero workflow activations, zero LinkedIn actions, zero public posts, zero Clio writes.
- [ ] Run reviewer task before any CRM movement or outreach decision.
- [ ] If source access fails again, regenerate `source_unavailable_report.md` and do not stage prospects.

## 7. Dependency map and owners

| Dependency | Owner | Blocks | Done when |
| --- | --- | --- | --- |
| Source backend credits/config restored or replaced | Jeff / authorized Hermes operator | All Gate 1 prospecting | Search and extraction smoke tests pass. |
| Fresh nightly rerun | Research worker / qwen-local workflow | Candidate discovery and scoring | New run directory contains source-backed candidates or a clean source-block report. |
| Validation/staging gate | Validator worker | Local Growth OS staging | Gates 1-7 reflected in validation report; no external action. |
| Reviewer hold release | Reviewer / attorney-review path | Outreach, CRM movement, named-company social awareness | Written review passes exact artifact scope and states approved next action. |
| Jeff exact approval | Jeff | Any public/client-facing action or live CRM mutation beyond approved internal placeholders | Copy/paste approval box completed with scope, lane, records, and constraints. |

## 8. Copy/paste decision boxes

### Decision Box 1 — Restore Firecrawl

```text
APPROVE FIRECRAWL RESTORE
I approve restoring or funding the Firecrawl-backed source backend used by Hermes web_search/web_extract for internal nightly prospect research only.
Scope: source-access recovery and neutral smoke tests.
Not approved: CRM/HighLevel/Supabase prospect writes, outreach, workflow activation, Clio, LinkedIn/social posting, ads, public publishing, or contact enrollment.
After restore: rerun source smoke tests and rerun the nightly prospect workflow under Gates 1-7 with research_only default.
Approver:
Date:
Notes:
```

### Decision Box 2 — Use replacement source backend

```text
APPROVE REPLACEMENT SOURCE BACKEND
I approve configuring the following replacement source backend for internal nightly prospect research search/extraction:
Backend:
Owner/operator:
Allowed scope: public-source search/extraction and evidence capture only.
Required verification: neutral web_search test, neutral web_extract test, official company page extraction, and source evidence logging before prospect scoring.
Not approved: paywall/login bypass, CRM/HighLevel/Supabase prospect writes, outreach, workflow activation, Clio, LinkedIn/social posting, ads, public publishing, or contact enrollment.
Approver:
Date:
Notes:
```

### Decision Box 3 — Manual official-source seeds only

```text
APPROVE MANUAL OFFICIAL-SOURCE SEED QUEUE
I approve queuing the following company seeds for a future source-restored rerun only:
1.
2.
3.
Official URLs provided:
Lane(s): AI Patent / AI Compliance / Tech GC / M&A Readiness
Constraint: these seeds are not approved prospects and must still pass Gates 1-7 after live extraction is restored.
Not approved: prospect/contact creation, outreach drafts, CRM writes, workflow activation, LinkedIn/social use, Clio writes, or public action.
Approver:
Date:
Notes:
```

### Decision Box 4 — Continue hold

```text
CONTINUE HOLD
I do not approve source-backend changes or manual seed reruns yet.
Keep the 2026-05-09 nightly prospecting packet as an internal source-blocked no-op record.
Allowed work: internal docs, blocker tracking, source-access planning, and safe review of existing already-staged records.
Not approved: new prospect discovery, staging, enrichment, outreach, CRM movement, workflow activation, LinkedIn/social posting, Clio, ads, or public action.
Approver:
Date:
Notes:
```

### Decision Box 5 — Rerun after successful smoke test

```text
APPROVE NIGHTLY PROSPECT RERUN AFTER SOURCE SMOKE TEST
I approve rerunning the nightly prospect workflow after source smoke tests pass.
Scope: internal research_only discovery of 1-3 candidates across AI Patent, AI Compliance, Tech GC, and M&A Readiness, with Gates 1-7 enforced.
Required output: source-backed prospect_candidates.json, digest.md, validation report, and reviewer gate before any external or live CRM action.
Not approved: outreach, HighLevel workflow activation, email/SMS, LinkedIn/social posting, Clio writes, ads, public publishing, or contact enrollment.
Approver:
Date:
Notes:
```

## 9. Recommended next action

Jeff should choose one of the decision boxes above. The safest default is Decision Box 1 if Firecrawl can be restored quickly; otherwise Decision Box 2 if Jeff wants a more reliable approved backend. If neither is ready, use Decision Box 4 and keep prospect expansion on hold.
