# QMD local knowledge search repair — 2026-05-07

Task: `t_989889ac`
Workspace: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages`
Repair time observed by system clock: 2026-05-06 23:55:52 MDT

## Summary

QMD was installed and on PATH, but `qmd status` and `qmd search` failed because the global `@tobilu/qmd` package's nested `better-sqlite3` native module had been compiled for Node `NODE_MODULE_VERSION 137`. The current runtime is Node `v25.9.0`, which requires `NODE_MODULE_VERSION 141`.

A top-level global rebuild reported success but did not replace the stale nested `better_sqlite3.node` binary. Rebuilding `better-sqlite3` from inside `/Users/jeff/.local/lib/node_modules/@tobilu/qmd` repaired the mismatch. After the targeted rebuild, both `qmd status` and `qmd search HighLevel -n 3 --line-numbers` completed successfully.

No CRM, Supabase, HighLevel, public site, email, LinkedIn, Clio, ads, or business data mutations were performed.

## Before state

Commands run from the project workspace unless otherwise noted:

```bash
pwd
node -v
node -p 'process.versions.modules'
npm -v
which qmd
qmd --version
npm root -g
npm list -g @tobilu/qmd better-sqlite3 --depth=2 || true
qmd status
qmd search HighLevel
```

Observed versions/paths before repair:

```text
Workspace: /Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages
Node.js: v25.9.0
NODE_MODULE_VERSION: 141
npm: 11.12.1
qmd binary: /Users/jeff/.local/bin/qmd -> ../lib/node_modules/@tobilu/qmd/bin/qmd
npm global prefix: /Users/jeff/.local
npm global root: /Users/jeff/.local/lib/node_modules
qmd package: @tobilu/qmd@2.1.0
better-sqlite3 package: better-sqlite3@12.8.0 nested under @tobilu/qmd
```

Failure seen before repair:

```text
Error: The module '/Users/jeff/.local/lib/node_modules/@tobilu/qmd/node_modules/better-sqlite3/build/Release/better_sqlite3.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION 137. This version of Node.js requires
NODE_MODULE_VERSION 141. Please try re-compiling or re-installing
the module (for instance, using `npm rebuild` or `npm install`).
code: 'ERR_DLOPEN_FAILED'
Node.js v25.9.0
```

## Repair commands

First attempt:

```bash
npm rebuild -g @tobilu/qmd 2>&1
```

Result:

```text
rebuilt dependencies successfully
```

Verification immediately after that still failed with the same `NODE_MODULE_VERSION 137` versus `141` `better-sqlite3` error, so the global package rebuild did not refresh the nested native binary QMD loads at runtime.

Successful targeted repair:

```bash
cd /Users/jeff/.local/lib/node_modules/@tobilu/qmd
npm rebuild better-sqlite3 --build-from-source --verbose 2>&1
```

Relevant successful output:

```text
npm info using npm@11.12.1
npm info using node@v25.9.0
npm info run better-sqlite3@12.8.0 install node_modules/better-sqlite3 prebuild-install || node-gyp rebuild --release
npm info run better-sqlite3@12.8.0 install { code: 0, signal: null }
rebuilt dependencies successfully
```

Native module file after repair:

```text
/Users/jeff/.local/lib/node_modules/@tobilu/qmd/node_modules/better-sqlite3/build/Release/better_sqlite3.node
mtime: May 6 23:55:24 2026
size: 1897824 bytes
type: Mach-O 64-bit bundle arm64
```

## After state and verification

Post-repair version check:

```bash
node -v
node -p 'process.versions.modules'
npm -v
qmd --version
npm list -g @tobilu/qmd better-sqlite3 --depth=2 || true
```

Observed after repair:

```text
Node.js: v25.9.0
NODE_MODULE_VERSION: 141
npm: 11.12.1
qmd: qmd 2.1.0
@tobilu/qmd: 2.1.0
better-sqlite3: 12.8.0
```

`qmd status` verification:

```text
QMD Status

Index: /Users/jeff/.cache/qmd/index.sqlite
Size:  12.7 MB

Documents
  Total:    17 files indexed
  Vectors:  1278 embedded
  Updated:  1d ago

Collections
  whiteford-ai-law-pages (qmd://whiteford-ai-law-pages/)
    Pattern:  **/*.md
    Files:    11 (updated 1d ago)
  business-development-books (qmd://business-development-books/)
    Pattern:  **/*.md
    Files:    6 (updated 1d ago)
```

Note: `qmd status` also printed a non-fatal node-llama-cpp Metal shader message:

```text
[node-llama-cpp] ggml_metal_library_init_from_source: error compiling source
```

The command continued and printed device/model/status information. This task only targeted the SQLite native-module load failure; if future vector/rerank/generation commands fail because of Metal/node-llama-cpp, create a separate task.

`qmd search` verification:

```bash
qmd search HighLevel -n 3 --line-numbers
```

Result: command succeeded and returned three results:

```text
qmd://whiteford-ai-law-pages/schellip-90-day-ai-authority-recording-calendar.md
qmd://whiteford-ai-law-pages/highlevel-ai-authority-funnel-map.md
qmd://whiteford-ai-law-pages/seo-legal-ethics-risk-review-t-8d12a1ee.md
```

## Operational note for future Node upgrades

If Homebrew Node is upgraded again and QMD starts failing with another `NODE_MODULE_VERSION` mismatch, run the targeted rebuild from the QMD package directory:

```bash
cd /Users/jeff/.local/lib/node_modules/@tobilu/qmd
npm rebuild better-sqlite3 --build-from-source --verbose
qmd status
qmd search HighLevel -n 3 --line-numbers
```

If the targeted rebuild fails, capture `/Users/jeff/.npm/_logs/<timestamp>-debug-0.log` and check Xcode command-line tools/node-gyp availability before reinstalling `@tobilu/qmd`.
