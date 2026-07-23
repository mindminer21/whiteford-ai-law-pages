# Source-Access Recovery Smoke-Test Harness — 2026-05-09

Task: `t_351638c9`
Related blocker packet: `docs/nightly-lead-research/source_access_recovery_and_fallback_plan_2026-05-09.md`
Related source-block report: `docs/nightly-lead-research/runs/2026-05-09/source_unavailable_report.md`
Status: internal-only runbook/report template. This document authorizes only neutral source-tool smoke tests after Firecrawl credits are restored or Jeff approves a replacement search/extraction backend.

## 0. Absolute guardrails

Do not use this harness to discover, name, score, enrich, stage, sync, contact, tag, move, or draft for any prospect.

Forbidden during this smoke test:

- Prospect discovery queries.
- Candidate/company/person naming beyond neutral public test targets listed here.
- CRM, HighLevel, Supabase, Clio, Apollo, LinkedIn, social, email/SMS, ad, workflow, or public-site mutations.
- Outreach drafts or named-company awareness drafts.
- Paywall/login bypass, captcha evasion, or terms-unsafe scraping.
- Secrets, API keys, tokens, or credential screenshots in any report.

Allowed during this smoke test:

- Confirming that the approved source backend can perform a neutral search.
- Confirming that the approved source backend can extract neutral public pages.
- Recording pass/fail output in the report template below.
- Stopping immediately on first failure.

## 1. Preconditions before running anything

Complete these checkboxes before any live tool call:

- [ ] Jeff/operator has restored Firecrawl credits or approved a specific replacement search/extraction backend.
- [ ] A fresh Hermes session, gateway, or worker has been started if required for credential/config reload.
- [ ] The operator can verify quota/credit status without exposing secrets in docs or Kanban.
- [ ] No one has changed HighLevel workflows, CRM records, Supabase data/schema, Clio, LinkedIn/social, email/SMS, ads, or public pages as part of source recovery.
- [ ] The operator is ready to stop after the neutral smoke tests and before any candidate discovery.

If any checkbox is false, stop and keep the 2026-05-09 nightly run on HOLD.

## 2. Neutral test targets only

Use only these neutral, non-prospect targets for this smoke test:

| Purpose | Target | Why allowed |
| --- | --- | --- |
| Search smoke test | `example domain` or `example.com` | Neutral internet plumbing query, not a prospect lane. |
| Extraction smoke test 1 | `https://example.com` | Stable public example page. |
| Extraction smoke test 2 | `https://www.iana.org/domains/reserved` | Public documentation page about reserved domains. |

Do not substitute industry, geography, funding, hiring, legal, AI, patent, compliance, M&A, venture, or company-discovery queries. Those belong only to a future approved nightly prospect rerun after this harness passes.

## 3. Smoke-test commands for a Hermes operator

Run in a fresh internal Hermes session after source backend recovery. These are tool-level checks, not shell commands.

### Test A — neutral search

Request:

```text
Use web_search for the neutral query: example domain
Limit results to 3. Do not search for prospects or companies.
```

Expected PASS shape:

```text
PASS web_search
- returned_at: <timestamp>
- query: example domain
- result_count: 1 or more
- first_result_url: a neutral public page such as example.com, iana.org, or related documentation
- no prospect/company-discovery query used: yes
```

Expected FAIL shape:

```text
FAIL web_search
- returned_at: <timestamp>
- query: example domain
- failure_class: credits | quota | auth | network | empty_results | other
- raw_error_excerpt: <short non-secret excerpt, e.g. Payment Required: Insufficient credits>
- stop_condition_triggered: yes
```

Stop condition: if Test A fails for any reason, do not run any extraction test and do not start nightly prospecting. Record the failure in Section 6 and keep the run on HOLD.

### Test B — neutral extraction: example.com

Request:

```text
Use web_extract for this neutral public URL only: https://example.com
Do not extract prospect, company, social, CRM, or lead-source URLs.
```

Expected PASS shape:

```text
PASS web_extract_example
- returned_at: <timestamp>
- url: https://example.com
- title_or_heading_detected: Example Domain
- readable_content_detected: yes
- no prospect/company URL used: yes
```

Expected FAIL shape:

```text
FAIL web_extract_example
- returned_at: <timestamp>
- url: https://example.com
- failure_class: credits | quota | auth | network | extraction_error | empty_content | other
- raw_error_excerpt: <short non-secret excerpt>
- stop_condition_triggered: yes
```

Stop condition: if Test B fails for any reason, do not run Test C and do not start nightly prospecting. Record the failure in Section 6 and keep the run on HOLD.

### Test C — neutral extraction: IANA reserved domains page

Request:

```text
Use web_extract for this neutral public URL only: https://www.iana.org/domains/reserved
Do not extract prospect, company, social, CRM, or lead-source URLs.
```

Expected PASS shape:

```text
PASS web_extract_iana_reserved
- returned_at: <timestamp>
- url: https://www.iana.org/domains/reserved
- readable_content_detected: yes
- content_mentions_reserved_domains: yes
- no prospect/company URL used: yes
```

Expected FAIL shape:

```text
FAIL web_extract_iana_reserved
- returned_at: <timestamp>
- url: https://www.iana.org/domains/reserved
- failure_class: credits | quota | auth | network | extraction_error | empty_content | other
- raw_error_excerpt: <short non-secret excerpt>
- stop_condition_triggered: yes
```

Stop condition: if Test C fails for any reason, do not start nightly prospecting. Record the failure in Section 6 and keep the run on HOLD.

## 4. Overall pass criteria

The source backend is considered recovered only if all are true:

- Test A returns at least one neutral search result.
- Test B returns readable content from `https://example.com`.
- Test C returns readable content from `https://www.iana.org/domains/reserved`.
- No test used a prospect-discovery query or candidate/company/person target.
- No live CRM, HighLevel, Supabase, Clio, LinkedIn/social, email/SMS, ad, workflow, public-page, or outreach side effect occurred.
- The operator recorded a non-secret pass report.

If all pass, the next action is not automatic discovery. The next action is a fresh, separately approved nightly prospect rerun under Gates 1-7, with `research_only` defaults and reviewer hold still in force.

## 5. Hard stop conditions before any candidate discovery

Stop immediately and keep prospecting on HOLD if any of these happen:

1. `web_search` fails, returns `Payment Required`, quota, auth, network, empty, or ambiguous results.
2. `web_extract` fails, returns `Payment Required`, quota, auth, network, extraction, empty-content, or ambiguous output.
3. The operator cannot confirm which backend is active.
4. Any output suggests credentials/secrets would be exposed by logging.
5. Any test accidentally uses a prospect-discovery query, candidate/company URL, social profile, CRM URL, or lead-source URL.
6. Any HighLevel, CRM, Supabase, Clio, LinkedIn/social, email/SMS, ad, workflow, or public-page mutation is requested or attempted.
7. Jeff has not separately approved a fresh nightly prospect rerun after the smoke test.

## 6. Smoke-test report template

Copy this template into the next run notes or a new internal report after running the neutral tests.

```text
SOURCE ACCESS SMOKE TEST REPORT
Date/time:
Operator:
Backend tested: Firecrawl restored / approved replacement backend / other:
Credential or quota check confirmed without secrets: yes/no
Fresh session or restart performed if required: yes/no/not required

Guardrail confirmation:
- Prospect discovery queries used: no
- Candidate/company/person targets used: no
- CRM/HighLevel/Supabase/Clio writes attempted: no
- Email/SMS/LinkedIn/social/ad/public actions attempted: no
- Secrets included in this report: no

Test A — web_search neutral query
- Query: example domain
- Result: PASS/FAIL
- Result count:
- First neutral URL/title:
- Error excerpt if failed:
- Stop condition triggered: yes/no

Test B — web_extract example.com
- URL: https://example.com
- Result: PASS/FAIL
- Expected heading/content found: yes/no
- Error excerpt if failed:
- Stop condition triggered: yes/no

Test C — web_extract IANA reserved domains
- URL: https://www.iana.org/domains/reserved
- Result: PASS/FAIL
- Readable reserved-domain content found: yes/no
- Error excerpt if failed:
- Stop condition triggered: yes/no

Overall verdict:
- PASS — source backend smoke test succeeded; candidate discovery still requires separately approved fresh nightly rerun under Gates 1-7.
- FAIL — source backend remains blocked; keep 2026-05-09 source-blocked no-op posture and do not run candidate discovery.

Next action:
```

## 7. If the smoke test passes

Allowed next internal step:

- Create or run a fresh nightly prospect workflow only if Jeff has approved the rerun after source smoke-test PASS.
- Force every future candidate through Gates 1-7 from scratch.
- Retain `research_only`, no-auto-send, DND/default-hold posture until reviewer and Jeff approvals.

Still not approved by a smoke-test PASS:

- Outreach, external emails, SMS, LinkedIn/social posting, ads, public publishing, Clio writes, workflow activation, contact enrollment, HighLevel opportunity movement, or Supabase prospect/evidence writes outside the approved internal staging/sync process.

## 8. If the smoke test fails

Required internal closeout:

- Record the failure in the report template using only short non-secret excerpts.
- Do not run or resume candidate discovery.
- Do not infer prospects from intended lanes, prior runs, local memory, QMD, or business-development RAG.
- Keep the 2026-05-09 source-blocked packet as the controlling no-op record.
- Return to the recovery options in `source_access_recovery_and_fallback_plan_2026-05-09.md`.
