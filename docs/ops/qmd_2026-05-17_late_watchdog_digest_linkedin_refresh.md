# QMD Refresh Report — Late 2026-05-17 Watchdog Digest + LinkedIn Handoffs

Task: `t_11ffae90`
Collection: `whiteford-ai-law-pages`
Report path: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/ops/qmd_2026-05-17_late_watchdog_digest_linkedin_refresh.md`
Scope: internal QMD Markdown collection maintenance only.

## Safety / authority statement

QMD is internal memory/search support only. QMD search results are not public-source proof, do not replace source-currentness checks, do not approve legal/ethics/privacy/brand review, and do not authorize live action.

No email sends, workflow activation/enrollment, HighLevel/CRM/Supabase/SQLite/Clio mutation beyond local QMD/index/docs, LinkedIn/social/public/ad/webinar action, contact tagging/messaging, public publishing, prospect/client-facing action, or legal approval was performed.

## Commands run

Before status:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd status
```

Before smoke searches:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd query "2026-05-17_daily_digest" --files -n 10 --no-rerank
PATH="/opt/homebrew/bin:$PATH" qmd search "2026-05-17_daily_digest" --files -n 10
PATH="/opt/homebrew/bin:$PATH" qmd query "True Anomaly LinkedIn awareness t_2d875dde" --files -n 10 --no-rerank
PATH="/opt/homebrew/bin:$PATH" qmd search "True Anomaly LinkedIn awareness t_2d875dde" --files -n 10
PATH="/opt/homebrew/bin:$PATH" qmd query "AI Launch Legal Operating System content packet 2026-05-17" --files -n 10 --no-rerank
PATH="/opt/homebrew/bin:$PATH" qmd search "AI Launch Legal Operating System content packet 2026-05-17" --files -n 10
```

Refresh:

```bash
PATH="/opt/homebrew/bin:$PATH" qmd update
PATH="/opt/homebrew/bin:$PATH" qmd embed --max-docs-per-batch 50 --max-batch-mb 10
```

After verification searches used the same six smoke-search commands as the before run.

## Before status

`qmd status` before refresh reported:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 54.4 MB
- Total documents: 427 files indexed
- Vectors: 10,178 embedded
- Updated: 18h ago
- `whiteford-ai-law-pages`: 421 Markdown files, updated 18h ago
- `business-development-books`: 6 Markdown files, updated 11d ago
- AST chunking active for TypeScript, TSX, JavaScript, Python, Go, Rust
- QMD emitted the recurring node-llama-cpp Metal compile warning: `ggml_metal_library_init_from_source: error compiling source`; searches and embeddings still completed.

## Before smoke-search results

### `2026-05-17_daily_digest`

- `qmd query ... --files -n 10 --no-rerank`: missed the fresh 2026-05-17 daily digest. Top results were older/stale or adjacent files, including:
  - `qmd://whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-13-colorado-ai-delay-vendor-readiness-content-packet.md`
  - `qmd://whiteford-ai-law-pages/docs/daily-content/2026-05-13/whiteford-ai-authority-packet-for-herb-2026-05-13-source.md`
  - `qmd://whiteford-ai-law-pages/docs/digests/2026-05-16-daily-digest.md`
  - `qmd://whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-17-ai-vendor-legal-ops-diagnostic-derivative.md`
- `qmd search ... --files -n 10`: no output.

Conclusion: missing before refresh.

### `True Anomaly LinkedIn awareness t_2d875dde`

- `qmd query ... --files -n 10 --no-rerank`: missed the fresh 2026-05-17 True Anomaly review/draft. Top results were older LinkedIn awareness or index files, including:
  - `qmd://whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-12/2026-05-12-albedo-linkedin-awareness-draft.md`
  - `qmd://whiteford-ai-law-pages/docs/digests/2026-05-07-daily-digest.md`
  - `qmd://whiteford-ai-law-pages/docs/highlevel-agent-targeting-hygiene-approval-checklist-2026-05-08.md`
  - `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`
- `qmd search ... --files -n 10`: no output.

Conclusion: missing before refresh.

### `AI Launch Legal Operating System content packet 2026-05-17`

- `qmd query ... --files -n 10 --no-rerank`: partially stale/noisy. It found related 2026-05-17 AI vendor/legal-ops material but not the exact AI Launch Legal Operating System content packet. Top results included:
  - `qmd://whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-17-ai-vendor-legal-ops-diagnostic-derivative.md`
  - `qmd://whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-17-ai-vendor-legal-ops-source-currentness-gate.md`
  - `qmd://whiteford-ai-law-pages/docs/decision-packets/2026-05-17-sunday-morning-ai-vendor-intake-decision-brief.md`
  - `qmd://whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-16-ai-vendor-legal-ops-content-packet.md`
  - `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`
- `qmd search ... --files -n 10`: returned adjacent 2026-05-17 AI vendor/legal-ops and index rows, but not the exact AI Launch packet.

Conclusion: partially stale/noisy before refresh.

## Refresh results

`qmd update` reported:

- Updated 2 collections.
- `whiteford-ai-law-pages`: indexed 4 new files, 1 updated file, 420 unchanged files, 0 removed files.
- Cleaned up 1 orphaned content hash.
- `business-development-books`: indexed 0 new files, 0 updated files, 6 unchanged files, 0 removed files.
- Final note: 5 unique hashes needed vectors.

`qmd embed --max-docs-per-batch 50 --max-batch-mb 10` reported:

- Model: `hf:ggml-org/embeddinggemma-300M-GGUF/embeddinggemma-300M-Q8_0.gguf`
- Batch cap: 50 docs / 10.0 MB
- Embedded 139 chunks from 5 documents in 3s.
- QMD again emitted the recurring node-llama-cpp Metal compile warning; embedding completed successfully.

## After status

`qmd status` after refresh reported:

- Index: `/Users/jeff/.cache/qmd/index.sqlite`
- Size: 57.2 MB
- Total documents: 431 files indexed
- Vectors: 10,317 embedded
- Updated: 14h ago
- `whiteford-ai-law-pages`: 425 Markdown files, updated 14h ago
- `business-development-books`: 6 Markdown files, updated 11d ago
- AST chunking active for TypeScript, TSX, JavaScript, Python, Go, Rust

Net effect from before status to after status:

- Documents: 427 -> 431 (+4)
- `whiteford-ai-law-pages` Markdown files: 421 -> 425 (+4)
- Embedded vectors/chunks: 10,178 -> 10,317 (+139)
- Index size: 54.4 MB -> 57.2 MB

## After verification-search results

### `2026-05-17_daily_digest`

- `qmd query ... --files -n 10 --no-rerank`: retrieved the 2026-05-17 daily digest in the top 10 as `qmd://whiteford-ai-law-pages/docs/digests/2026-05-17-daily-digest.md` at rank 9 in the displayed URI output.
- `qmd search ... --files -n 10`: no output for the underscore-specific filename query.
- Direct QMD get verification succeeded for the actual file URI: `qmd://whiteford-ai-law-pages/docs/digests/2026-05-17_daily_digest.md`.
- Actual source file verified locally: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/digests/2026-05-17_daily_digest.md`.

Conclusion: daily digest is now retrievable through QMD query and direct QMD get; exact BM25 filename search with underscore remains empty.

### `True Anomaly LinkedIn awareness t_2d875dde`

- `qmd query ... --files -n 10 --no-rerank`: retrieved the exact 2026-05-17 True Anomaly review as rank 1 and the draft as rank 2:
  - `qmd://whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-17/2026-05-17-true-anomaly-linkedin-awareness-review-t-2d875dde.md`
  - `qmd://whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-17/2026-05-17-true-anomaly-linkedin-awareness-draft.md`
  - Also retrieved `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`.
- `qmd search ... --files -n 10`: retrieved the exact review, draft, and deliverable-index row.
- Direct QMD get verification succeeded for the actual review URI: `qmd://whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-17/2026-05-17-true-anomaly-linkedin-awareness-review_t_2d875dde.md`.
- Actual source files verified locally:
  - `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-17/2026-05-17-true-anomaly-linkedin-awareness-review_t_2d875dde.md`
  - `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/linkedin-awareness-drafts/2026-05-17/2026-05-17-true-anomaly-linkedin-awareness-draft.md`

Conclusion: True Anomaly review/draft and deliverable-index row are now retrievable.

### `AI Launch Legal Operating System content packet 2026-05-17`

- `qmd query ... --files -n 10 --no-rerank`: retrieved the exact content packet at rank 2:
  - `qmd://whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-17-ai-launch-legal-operating-system-content-packet.md`
  - Also returned related 2026-05-17 AI vendor/legal-ops material and `qmd://whiteford-ai-law-pages/docs/kanban-deliverable-index.md`.
- `qmd search ... --files -n 10`: retrieved the daily digest, adjacent 2026-05-17 AI vendor/legal-ops files, the exact content packet, and the deliverable-index row. The exact packet appeared as:
  - `qmd://whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-17-ai-launch-legal-operating-system-content-packet.md`
- Actual source file verified locally:
  - `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-17-ai-launch-legal-operating-system-content-packet.md`

Conclusion: AI Launch Legal Operating System content packet and its index context are now retrievable.

## Markdown-only limitation

QMD indexes Markdown files for this collection (`**/*.md`). HTML artifacts are not directly indexed/retrievable through this QMD Markdown collection. For example, the local HTML artifact `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/ai-authority-packets/2026-05-17-ai-launch-legal-operating-system-visual-direction.html` can only be discovered indirectly through Markdown references/index rows unless separately converted to or represented by Markdown.

## Final posture

The late 2026-05-17 digest, True Anomaly LinkedIn review/draft, and AI Launch Legal Operating System content packet are now represented in the refreshed local QMD Markdown collection/search surface. Direct source files and Kanban handoffs remain controlling; QMD is only an internal search/memory convenience and does not authorize any external, live, legal, social, CRM, HighLevel, Supabase, Clio, workflow, outreach, client/prospect-facing, or publishing action.
