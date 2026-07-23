#!/usr/bin/env python3
"""Guardrail helper for the 2026-05-23 prospect research artifacts.

The original qwen-local generator for this run was superseded by reviewer-requested
patch task t_ae1d6444. Do not regenerate the stale original packet from this file;
use the patched JSON/Markdown artifacts in this folder as controlling sources.
"""
from __future__ import annotations

import json
from pathlib import Path

RUN_DIR = Path(__file__).resolve().parent
CONTROLLING_FILES = [
    RUN_DIR / "digest.md",
    RUN_DIR / "prospect_candidates.json",
    RUN_DIR / "prospect_candidates.normalized_for_store.json",
    RUN_DIR / "agent-targeting-work-items" / "josh-ai.json",
    RUN_DIR / "agent-targeting-work-items" / "akasa.json",
    RUN_DIR / "agent-targeting-work-items" / "deepwatch.json",
    RUN_DIR / "correction_report_t_ae1d6444.md",
]


def main() -> int:
    for path in CONTROLLING_FILES:
        if not path.exists():
            raise SystemExit(f"missing controlling patched artifact: {path}")
    # Parse JSON payloads so a future operator can run this as a smoke check.
    for name in [
        "prospect_candidates.json",
        "prospect_candidates.normalized_for_store.json",
        "agent-targeting-work-items/josh-ai.json",
        "agent-targeting-work-items/akasa.json",
        "agent-targeting-work-items/deepwatch.json",
    ]:
        with (RUN_DIR / name).open("r", encoding="utf-8") as f:
            json.load(f)
    print("2026-05-23 artifacts are patched by t_ae1d6444; no stale regeneration performed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
