# Correction Report — 2026-05-23 Nightly Prospect Packet Patch

Task: `t_ae1d6444`  
Reviewer artifact: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/nightly_qwen_prospect_digest_review_t_b86e59af.md`  
Run folder: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23`

## Verdict

Patched for internal re-review. No external or live-system action is authorized. All prospects remain `research_only`, `attorney_review_required`, `external_action_allowed=false`, no-send, manual/no-post, and blocked from HighLevel/Supabase/CRM/workflow/outreach/social/LinkedIn/Clio/public/client-facing actions.

## Corrections Applied

### Josh.ai

- Removed `https://www.linkedin.com/company/joshai` from Tim Gill's person-level `linkedin_url` field in both source and normalized payloads plus the Agent Targeting input.
- Retained the company LinkedIn URL only as company-level external-directory evidence.
- Added `https://josh.ai/patents/` as explicit first-party evidence.
- Reworded patent activity from “actively producing/filing AI patents” to source-exact wording: the public patent page lists numerous provisional patent applications plus listed utility/design patents.

### AKASA

- Replaced unsupported `Denver, CO (HQ)` with `South San Francisco, CA (HQ); Denver/Colorado hub/coworking presence only`.
- Added source checks:
  - `https://akasa.com/careers/` — first-party careers page supports Bay Area/NYC/Denver hubs.
  - `https://www.builtinsf.com/company/akasa/offices` — current directory evidence supports South San Francisco HQ and Denver coworking hub/office.
- Downgraded Mountain West geography from passed to partial/hold.
- Set outreach readiness to `hold_geography_needs_corroboration`.
- Removed LinkedIn-only Benjamin Beadle-Ryby URL as primary contact evidence and marked it for non-LinkedIn/manual human verification before named-recipient targeting.

### Deepwatch

- Removed `Denver, CO` and “rapidly scaling from Denver” from the packet and Agent Targeting input.
- Changed geography to `Tampa, FL per Crunchbase 2023; no current Denver/Mountain West nexus verified`.
- Corrected founding/funding to `2019` and `$256M total raised per Crunchbase News`; noted the $180M 2023 financing did not break out debt/equity.
- Added first-party 2024 CEO source: `https://www.deepwatch.com/deepwatch-names-john-dilullo-as-chief-executive-officer/`.
- Corrected CEO evidence: Crunchbase 2023 article names Charlie Thomas then; first-party 2024 source names John DiLullo CEO effective July 2, 2024 and based in Silicon Valley.
- Removed Deepwatch from the Denver/Mountain West queue unless a new current reliable source supports a Colorado nexus.

### Social / LinkedIn Drafts

- Removed all `@` tags from social draft candidates in the digest.
- Preserved attorney-review-only, manual/no-post posture.
- No LinkedIn/social action was performed.

## Files Patched

- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/digest.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/prospect_candidates.json`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/prospect_candidates.normalized_for_store.json`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/validation_report.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/store_verification.json`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/agent-targeting-work-items/josh-ai.json`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/agent-targeting-work-items/akasa.json`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/agent-targeting-work-items/deepwatch.json`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/KANBAN_DELIVERABLE_INDEX.md`

## Verification Performed

- Live/current source checks via web search/extract for AKASA HQ/hub status and Deepwatch CEO/founding/funding/geography facts.
- JSON parse/serialization for source, normalized, and Agent Targeting payloads.
- Static text checks for forbidden `@joshai` / `@akasahealth` tags and person-level company LinkedIn leakage.
- Guardrail checks confirming `external_action_allowed=false` and attorney-review/manual/no-post/no-send posture remains documented.

## Remaining Blockers

- AKASA: hold for Mountain-West-specific queue until first-party/reliable current review clears exactly how Denver hub/coworking presence may be used.
- Deepwatch: hold/remove from Mountain West queue unless a current reliable source supports a Colorado nexus.
- All prospects: attorney review, conflicts check, suppression/opt-out check, source-current verification, and exact Jeff approval are required before any external use.
