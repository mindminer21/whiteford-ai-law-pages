# Qwen-local Tool Preflight Hardening — 2026-05-09

Task: `t_2aab3832`
Status: internal operations hardening only. No prospecting, outreach, HighLevel mutation, Supabase mutation, Clio write, LinkedIn/social action, workflow activation, ad action, or public/client-facing change is authorized by this document.

## 1. Decision summary

Future qwen-local nightly prospect runs must report live public-source access and local RAG/context availability as separate preflight dimensions.

Controlling rule: QMD and the business-development RAG may inform strategy, rubric language, lead-magnet framing, and restrained educational copy, but they cannot replace Gate 1 public-source extraction for prospect staging. If `web_search` or `web_extract` fails, the run must stop prospect discovery/scoring and produce only source-blocked no-op artifacts, even when local QMD/RAG indexes are healthy.

Business-development principle applied: a lead magnet should be a complete solution to a narrow problem. For Whiteford/Schell IP, that means the diagnostic/research packet must fulfill its promised value with current, cited public facts before asking for a next step. Legal-services copy stays educational, restrained, opt-in/attorney-review gated, and non-hypey.

## 2. Problem this hardening fixes

The 2026-05-09 packet correctly held all prospect activity because Firecrawl-backed `web_search` and `web_extract` failed with insufficient credits. However, the qwen-local packet also said `qmd_rag` and `business_dev_rag` were not built, while reviewer-side checks showed both QMD collections and the business-development index existed.

The hardening goal is not to make RAG a source substitute. It is to stop future packets from blending two different facts:

| Dimension | Current 2026-05-09 finding | Operational consequence |
| --- | --- | --- |
| Live public-source access | Failing: Firecrawl/web tools return Payment Required | Gate 1 fails; no prospects, contacts, source evidence, drafts, scoring, CRM sync, or external action. |
| Local QMD/business-development context | Available enough for strategy/rubric checks | May help with internal lead-magnet/offer framing only; cannot validate current company/contact facts. |

## 3. Minimal internal patches applied

### Prompt patch

File: `docs/nightly_qwen_prospect_research_prompt.md`

Added a mandatory preflight section before Gate 1 requiring the qwen-local agent to:

1. Run neutral `web_search` and `web_extract` smoke tests before prospect discovery/scoring.
2. Check QMD and business-development corpus availability as separate local context/RAG status.
3. Treat any live source-tool failure as Gate 1 failure regardless of RAG status.
4. Record separate fields instead of collapsing everything into generic RAG/source status.

### Runner script patch

File: `scripts/run_nightly_qwen_prospect_research.sh`

Added a preflight log header before the Hermes qwen-local run. It records:

- repo and prompt path;
- `node -v`;
- `node -p 'process.versions.modules'` for Node ABI;
- platform/arch;
- QMD binary path;
- `HOME=/Users/jeff /Users/jeff/.local/bin/qmd status`;
- QMD search against `business-development-books`;
- `/Users/jeff/.hermes/knowledge/business-development/search_business_dev.py "lead magnet complete solution narrow problem" -k 1`.

The local RAG checks are intentionally non-blocking (`|| true`) so a QMD/RAG issue is logged as context availability, not confused with Gate 1 live-source access. The live source smoke tests remain inside the agent prompt because `web_search` and `web_extract` are Hermes tools, not shell commands.

## 4. Required preflight commands and expected interpretation

Run these from the repository root unless noted otherwise.

### A. QMD/business-development index

```bash
HOME=/Users/jeff /Users/jeff/.local/bin/qmd status
HOME=/Users/jeff /Users/jeff/.local/bin/qmd search HighLevel -n 2 --line-numbers
python3 /Users/jeff/.hermes/knowledge/business-development/search_business_dev.py "lead magnet complete solution narrow problem" -k 3
python3 - <<'PY'
from pathlib import Path
p=Path('/Users/jeff/.hermes/knowledge/business-development/business_dev_index.sqlite')
print('exists=', p.exists())
print('size_bytes=', p.stat().st_size if p.exists() else 'missing')
PY
sqlite3 /Users/jeff/.hermes/knowledge/business-development/business_dev_index.sqlite "select name from sqlite_master where type='table' order by name;"
```

2026-05-09 observed output summary:

- `qmd status` succeeded and reported index `/Users/jeff/.cache/qmd/index.sqlite`, 17 files indexed, 1278 vectors, and collections `whiteford-ai-law-pages` and `business-development-books`.
- `qmd search HighLevel -n 2 --line-numbers` returned hits from `schellip-90-day-ai-authority-recording-calendar.md` and `highlevel-ai-authority-funnel-map.md`.
- Business-development search returned `100M Leads` hits, including the principle that a lead magnet is a complete solution to a narrow problem.
- `/Users/jeff/.hermes/knowledge/business-development/business_dev_index.sqlite` exists with size `12599296` bytes and tables `chunks`, `chunks_fts`, `docs`, and related FTS metadata.

Interpretation: local context/RAG is available enough for strategy/rubric support. It is not a substitute for live current-source extraction.

### B. Node/qmd ABI and native module path

```bash
node -v
node -p 'process.versions.modules'
node -p 'process.platform+"-"+process.arch'
python3 - <<'PY'
import os
p='/Users/jeff/.local/bin/qmd'
print(os.path.realpath(p))
PY
QMD_ROOT=/Users/jeff/.local/lib/node_modules/@tobilu/qmd
find "$QMD_ROOT" \( -path '*better_sqlite3.node' -o -path '*better-sqlite3*' -o -path '*node-llama-cpp*' \) | head -80
```

2026-05-09 observed output summary:

- Node: `v25.9.0`
- Node module ABI: `141`
- Platform/arch: `darwin-arm64`
- QMD real binary: `/Users/jeff/.local/lib/node_modules/@tobilu/qmd/bin/qmd`
- QMD package root: `/Users/jeff/.local/lib/node_modules/@tobilu/qmd`
- Native module tree includes `/Users/jeff/.local/lib/node_modules/@tobilu/qmd/node_modules/better-sqlite3/build/Release/better_sqlite3.node` and QMD nested `node-llama-cpp` tooling.

Observed caveat: `qmd status` printed `[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source` while still returning status/search output. Treat this as a QMD performance/GPU warning to monitor, not as the live-source blocker.

### C. Firecrawl/web tool health

Run inside the Hermes agent/tool context:

```text
web_search(query="example.com neutral smoke test", limit=2)
web_extract(urls=["https://example.com"])
```

2026-05-09 observed output summary:

- `web_search` failed: `Payment Required: Failed to search. Insufficient credits to perform this request ... firecrawl.dev/pricing`.
- `web_extract` failed for `https://example.com`: `Payment Required: Failed to scrape. Insufficient credits to perform this request ... firecrawl.dev/pricing`.

Interpretation: live-source access is still blocked. Gate 1 fails. Do not stage prospects from this state.

## 5. Decision rules for future nightly packets

1. Start every run with separate preflight fields:
   - `live_source_search_status`
   - `live_source_extract_status`
   - `qmd_status`
   - `business_dev_rag_status`
   - `node_qmd_abi_status`
2. If either live source status fails, set:
   - `gate_1_live_source_extraction = fail`
   - `prospects = []`
   - `contacts = []`
   - `source_evidence = []`
   - `outreach_drafts = []`
   - `approval_items = []`
   - `external_action_allowed = false`
3. If QMD/RAG is available while live source fails, write: `local_rag_available_for_strategy_only; cannot satisfy Gate 1`.
4. If QMD/RAG is unavailable while live source works, prospect research may proceed only from live public sources; note RAG unavailable as a strategy-context degradation, not a prospect-evidence blocker.
5. If Node/qmd ABI is mismatched, record the exact Node version, ABI, QMD package root, and native module path. Repair QMD separately, but do not call it a Firecrawl/web-source failure.
6. Never use QMD, business-development books, model memory, snippets, old notes, or prior runs to name new prospects, validate current contacts, assert current company facts, or approve outreach.
7. Every future prospect still requires Gates 1-7: live sources, canonical entity/domain, current URLs, contact validation, LinkedIn hygiene, geo support, and suppression/conflicts/prior-touch review.

## 6. Rollback notes

Rollback is simple because changes are internal docs/script only:

```bash
git checkout -- docs/nightly_qwen_prospect_research_prompt.md scripts/run_nightly_qwen_prospect_research.sh docs/nightly-lead-research/qwen_tool_preflight_hardening_2026-05-09.md docs/KANBAN_DELIVERABLE_INDEX.md
```

If only the runner patch causes trouble, revert just:

```bash
git checkout -- scripts/run_nightly_qwen_prospect_research.sh
```

If the QMD preflight is noisy but still useful, prefer changing the QMD commands from blocking to logged/non-blocking rather than removing the live-source/RAG distinction from the prompt.

## 7. Verification run on 2026-05-09

Commands run:

```bash
bash -n scripts/run_nightly_qwen_prospect_research.sh
HOME=/Users/jeff /Users/jeff/.local/bin/qmd status
HOME=/Users/jeff /Users/jeff/.local/bin/qmd search HighLevel -n 2 --line-numbers
python3 /Users/jeff/.hermes/knowledge/business-development/search_business_dev.py "lead magnet complete solution narrow problem" -k 3
```

Additional diagnostics run through Hermes tools:

```text
web_search(query="example.com neutral smoke test", limit=2)
web_extract(urls=["https://example.com"])
```

Result:

- Script syntax check passed after patch.
- Local QMD and business-development corpus checks returned useful results.
- Firecrawl-backed web search/extract diagnostics still failed for insufficient credits.
- No live prospecting rerun was performed.
- No CRM, HighLevel, Supabase, Clio, outreach, workflow, LinkedIn/social, ads, public publish, or external action was performed.

## 8. Recommended next action

Keep the 2026-05-09 nightly run on source-access hold. Jeff or an authorized operator should restore/replace the Firecrawl-backed source backend, then rerun the neutral web smoke tests before any prospect discovery. The patched prompt and runner will help the next packet accurately report: live source blocked/unblocked separately from local RAG available/unavailable.
