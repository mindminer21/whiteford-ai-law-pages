# Canonical domain repair — t_c79e98c9

Date: 2026-06-02
Scope: local/internal Growth OS staging rows and local run artifacts only.

## Guardrails

- No prospect contact, outreach, social/LinkedIn action, HighLevel mutation, Supabase live sync, Clio write, workflow activation/enrollment/testing, trigger tags, ads, public/client-facing changes, attorney approval, final-copy approval, or external source-currentness claim was authorized or performed.
- Rows remain research_staged / attorney-review-only / no-auto-send.
- `safe_for_outreach` remains `conditional` for attorney-review-only staged evidence; this is not approval for external use.

## Browser/current verification

- WindBorne Systems
  - Previous staged URL: https://windborne.systems
  - Repair finding: returned HTTP 404 during internal verification.
  - Current first-party URL: https://windbornesystems.com
  - Verification signal: HTTP 200; page title/snippet included “WindBorne | Better Forecasts” and first-party WindBorne content.
  - Local repair: prospect/domain rows, first-party source evidence, draft source URLs/facts, normalized/source JSON, work-item JSON, and digest references now use https://windbornesystems.com.

- Mach Industries
  - Previous staged URL: https://machindustries.ai
  - Repair finding: returned HTTP 404 during internal verification.
  - Current first-party URL: https://machindustries.com
  - Verification signal: HTTP 200; page title/snippet included “Mach Industries” and first-party defense infrastructure positioning.
  - Local repair: prospect/domain rows, first-party source evidence, draft source URLs/facts, normalized/source JSON, work-item JSON, and digest references now use https://machindustries.com.

- Gigascale Capital
  - Previous staged URL: https://gigascale.capital
  - Repair finding: curl followed redirect to https://gigascale.com/ with HTTP 200 and first-party Gigascale content.
  - Local repair: no domain-row change made; report records redirect/canonical behavior. Any external use still needs fresh source-current verification.

## Growth OS staging rows repaired

Database: /Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite
Backup before repair: /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/growth-os.before_t_c79e98c9.sqlite

Updated local/internal rows:

- `prospects`
  - `prospect_windborne_systems_20260602`: domain `windbornesystems.com`, website_url `https://windbornesystems.com`
  - `prospect_mach_industries_20260602`: domain `machindustries.com`, website_url `https://machindustries.com`

- `source_evidence`
  - `evidence_7c34f3c6a84f9abeb36da27f`: source_url corrected to `https://windbornesystems.com`; evidence text now says the old staged URL returned 404 and the current first-party domain loaded.
  - `evidence_063d4849ae9af6b798b1b420`: source_url corrected to `https://machindustries.com`; evidence text now says the old staged URL returned 404 and the current first-party domain loaded.

- `outreach_drafts`
  - WindBorne/Mach `source_urls`, `source_facts`, and `internal_review_notes` updated to use the corrected first-party domains while keeping `external_action_allowed = 0` and `compliance_status = needs_review`.

## Local artifacts repaired

- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/prospect_candidates.json
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/prospect_candidates.normalized_for_store.json
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/agent-targeting-work-items/windborne-systems.json
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/agent-targeting-work-items/mach-industries.json
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/digest.md

Helper script and machine-readable verification retained for auditability:

- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/repair_t_c79e98c9.py
- /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-06-02/canonical_domain_repair_t_c79e98c9.verification.json

## Verification after repair

- JSON syntax passed for `prospect_candidates.json`, `prospect_candidates.normalized_for_store.json`, and the WindBorne/Mach work-item JSON files.
- Growth OS local DB recheck confirmed:
  - WindBorne domain/website now `windbornesystems.com` / `https://windbornesystems.com`.
  - Mach domain/website now `machindustries.com` / `https://machindustries.com`.
  - WindBorne/Mach first-party source evidence source URLs corrected.
  - WindBorne/Mach draft source URLs corrected.
  - All three staged prospects still have contact_rows = 0.
  - All three staged prospect drafts still have external_action_allowed sum = 0.
  - Suppression/conflicts gates remain `consent_gap_no_auto_send` and `required_before_send`.

## Remaining hold

This repair clears the local canonical-domain hygiene issue identified by reviewer t_9ba09079. It does not clear any external use gate. Before sync, outreach, exact-copy packet, public/client-facing use, source-currentness claim, or attorney approval, run a separate fresh source-current/suppression/conflicts/contact-validation review and obtain Jeff’s exact approval.
