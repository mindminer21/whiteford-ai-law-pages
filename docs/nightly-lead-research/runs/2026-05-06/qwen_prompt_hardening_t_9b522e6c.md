# Qwen Nightly Prompt Hardening Report — 2026-05-06

Task: `t_9b522e6c`
Owner: pm
Scope: Harden the reusable nightly Qwen prospect-research prompt after the 2026-05-06 validation and remediation failures.

## Inputs reviewed

- `docs/nightly-lead-research/runs/2026-05-06/nightly_qwen_prospect_digest_review_t_d488fbc9.md`
- `docs/nightly-lead-research/runs/2026-05-06/validation_remediation_t_013447b0.md`
- `docs/plans/qwen_nightly_prospecting_agent_plan.md`
- `docs/nightly_qwen_prospect_research_prompt.md`

## Problem to prevent

The 2026-05-06 run safely preserved downstream no-send/no-workflow gates, but the upstream research prompt still allowed low-quality records to be staged for Rigetti, Nexar, and Kodiak. The specific failure modes were:

1. Live-source unavailability was not treated as a hard stop for staging.
2. Entity/domain ambiguity was not resolved before creating company records, especially Nexar (`nexar.com` vs fleet/AI Nexar domains).
3. Stale or guessed first-party URLs were accepted, especially Kodiak's old `/about` URL.
4. Garbled or fake contact names were allowed, especially Rigetti's `Subcool` / `Sub cool` issue.
5. Contact-level LinkedIn evidence was not distinguished from company LinkedIn/company profile URLs.
6. Mountain West/localization claims could be used without direct public support.
7. Failed source/contact/conflicts gates did not clearly force `research_only`, `external_action_allowed=false`, and remediation instead of outreach vectors.

## Prompt patch applied

Edited: `docs/nightly_qwen_prospect_research_prompt.md`

Added a new section: `Source Validation Hard Gates added after 2026-05-06 failures`.

The new section adds seven mandatory gates:

1. Live-source extraction required
   - Model memory, snippets alone, and old notes are not verification.
   - If live extraction/search is unavailable, the agent must stop prospect staging and write a `source_unavailable_report.md` only.
   - Every material fact needs source URL, accessed date, source type, extracted quote/summary, and confidence.
   - Company-level prospects need at least two accessible public URLs unless downgraded to `research_only`; at least one should be first-party or official when available.

2. Domain and entity canonicalization
   - Resolve the canonical entity before creating or updating a prospect.
   - Mark `entity_ambiguity=true` and hold as `research_only` when same-name or adjacent-domain ambiguity exists.
   - Do not store ambiguous/rejected domains as the primary domain.
   - Explicit Nexar failure example added.

3. Current URL and stale-page checks
   - Open every first-party URL before citation.
   - Reject 404, moved, empty, blocked, stale, or unrelated redirects as supporting evidence.
   - Prefer current company/team/leadership/technology/product/news/investor/filing pages over guessed `/about` URLs.
   - Explicit Kodiak stale-URL failure example added.

4. Contact/person validation
   - Do not stage a contact unless name and title are supported by current public source evidence.
   - Reject garbled, phonetic, nickname-only, autocomplete, or model-generated names.
   - Deduplicate contacts by normalized name, title, source URL, and company.
   - Contact confidence below 75 blocks named-person outreach and recipient-level CRM enrichment.
   - Explicit Rigetti `Subcool` / `Sub cool` failure example added.

5. LinkedIn URL hygiene
   - `contact.linkedin_url` must be a public person profile that appears to match the verified individual.
   - Company pages, search result URLs, school pages, Sales Navigator URLs, login placeholders, and unrelated profiles are barred from person contact fields.
   - Company LinkedIn pages may be stored only as company-level evidence.
   - No LinkedIn scraping or actions.

6. Mountain West and jurisdictional claim support
   - No Colorado/Denver/Boulder/Mountain West claim without a current public source supporting headquarters, office, facility, operations, market focus, hiring, funding ecosystem, corridor/route, event, regulatory exposure, or Whiteford service-jurisdiction rationale.
   - Unsupported geography becomes `geo_relevance_unverified` and cannot be used in copy, urgency scoring, or LinkedIn drafts.
   - National companies must be framed without invented Mountain West facts.

7. Outreach and CRM readiness consequences
   - Any hard-gate failure forces `outreach_readiness_status=research_only`, `external_action_allowed=false`, and no named-recipient draft.
   - Held prospects require a remediation checklist instead of an outreach vector.
   - The checklist must identify the failed gate, missing proof, replacement source candidates, and blocked fields.

## Final-response requirements tightened

The prompt now requires every nightly run's final response to include a validation-gate summary covering:

- source extraction status;
- canonical domain status;
- current first-party URLs;
- contact confidence;
- LinkedIn URL hygiene;
- Mountain West/geographic support;
- suppression/conflicts/prior-touch status.

If any hard gate fails, the Qwen agent must say the prospect remains `research_only` and list remediation before attorney review or CRM progression.

## Acceptance criteria for next nightly Qwen run

The next run should be rejected or held for remediation if it does not satisfy all of these checks:

- No prospect is staged from model memory or snippets alone.
- Every material company/contact/outreach fact has source evidence with URL and accessed date.
- Every prospect has a resolved canonical domain, or else `entity_ambiguity=true` and `research_only`.
- No stale first-party URL is used as active support.
- No contact is staged unless the name and title are verified from a current public source.
- No company LinkedIn URL is stored as a person LinkedIn URL.
- No local/Mountain West claim is used unless supported by public evidence.
- Failed source/contact/domain/geo/conflicts gates prevent outreach vectors, recipient-level enrichment, Targeting Packet Ready movement, and live sync progression.

## Explicit non-actions

No net-new prospect expansion was performed. No outreach was sent. No HighLevel, Supabase, CRM, Clio, LinkedIn, social, workflow, paid-ad, or public/client-facing mutation was performed.

## Deliverables

- Prompt patch: `docs/nightly_qwen_prospect_research_prompt.md`
- This hardening report: `docs/nightly-lead-research/runs/2026-05-06/qwen_prompt_hardening_t_9b522e6c.md`
