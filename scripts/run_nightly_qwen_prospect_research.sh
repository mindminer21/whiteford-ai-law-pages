#!/usr/bin/env bash
set -euo pipefail

REPO="/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages"
PROMPT="$REPO/docs/nightly_qwen_prospect_research_prompt.md"
LOG_DIR="$REPO/docs/nightly-lead-research/logs"
RUN_DATE="$(date +%Y-%m-%d)"
LOG_FILE="$LOG_DIR/qwen-prospect-research-$RUN_DATE.log"
mkdir -p "$LOG_DIR"
cd "$REPO"

{
  echo "## qwen-local preflight $RUN_DATE"
  echo "repo=$REPO"
  echo "prompt=$PROMPT"
  echo "node=$(node -v 2>/dev/null || echo missing)"
  echo "node_modules_abi=$(node -p 'process.versions.modules' 2>/dev/null || echo missing)"
  echo "platform_arch=$(node -p 'process.platform+"-"+process.arch' 2>/dev/null || echo missing)"
  echo "qmd_bin=$(command -v qmd || true)"
  if [[ -x /Users/jeff/.local/bin/qmd ]]; then
    HOME=/Users/jeff /Users/jeff/.local/bin/qmd status || true
    HOME=/Users/jeff /Users/jeff/.local/bin/qmd search "lead magnet complete solution narrow problem" -c business-development-books -n 1 --line-numbers || true
  else
    echo "qmd_status=missing"
  fi
  if [[ -f /Users/jeff/.hermes/knowledge/business-development/business_dev_index.sqlite ]]; then
    python3 /Users/jeff/.hermes/knowledge/business-development/search_business_dev.py "lead magnet complete solution narrow problem" -k 1 || true
  else
    echo "business_dev_index=missing"
  fi
  echo "## end qwen-local preflight"
} 2>&1 | tee "$LOG_FILE"

curl -fsS http://localhost:11434/api/tags >/dev/null

hermes -p qwen-local chat \
  --toolsets web,search,browser,terminal,file,skills,session_search \
  -q "$(cat "$PROMPT")" \
  2>&1 | tee -a "$LOG_FILE"
