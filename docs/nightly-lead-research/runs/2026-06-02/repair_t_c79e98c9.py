import datetime
import json
import sqlite3
from pathlib import Path

root = Path('/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages')
run = root / 'docs/nightly-lead-research/runs/2026-06-02'
db = Path('/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite')
now = datetime.datetime.now(datetime.timezone.utc).isoformat(timespec='seconds')

fixes = {
    'prospect_windborne_systems_20260602': {
        'old_domain': 'windborne.systems',
        'old_url': 'https://windborne.systems',
        'new_domain': 'windbornesystems.com',
        'new_url': 'https://windbornesystems.com',
        'evidence_id': 'evidence_7c34f3c6a84f9abeb36da27f',
        'snippet': 'CURRENT FIRST-PARTY DOMAIN CORRECTION: https://windbornesystems.com loaded first-party WindBorne content (WindBorne | Better Forecasts / WindBorne long-duration smart balloon constellation); the previously staged https://windborne.systems returned 404 during 2026-06-02 repair verification.',
        'supported': 'Current canonical first-party website for WindBorne Systems is https://windbornesystems.com for internal attorney-review staging; previously staged https://windborne.systems returned 404.',
        'safe': 'Current first-party domain correction for internal review only: https://windbornesystems.com loaded WindBorne first-party content; previous https://windborne.systems returned 404.',
    },
    'prospect_mach_industries_20260602': {
        'old_domain': 'machindustries.ai',
        'old_url': 'https://machindustries.ai',
        'new_domain': 'machindustries.com',
        'new_url': 'https://machindustries.com',
        'evidence_id': 'evidence_063d4849ae9af6b798b1b420',
        'snippet': 'CURRENT FIRST-PARTY DOMAIN CORRECTION: https://machindustries.com loaded first-party Mach Industries content (Mach Industries / defense infrastructure positioning); the previously staged https://machindustries.ai returned 404 during 2026-06-02 repair verification.',
        'supported': 'Current canonical first-party website for Mach Industries is https://machindustries.com for internal attorney-review staging; previously staged https://machindustries.ai returned 404.',
        'safe': 'Current first-party domain correction for internal review only: https://machindustries.com loaded Mach Industries first-party content; previous https://machindustries.ai returned 404.',
    },
}

evidence_to_fix = {f['evidence_id']: f for f in fixes.values()}


def replace_stale_strings(value):
    if not isinstance(value, str):
        return value
    for f in fixes.values():
        value = value.replace(f['old_url'], f['new_url']).replace(f['old_domain'], f['new_domain'])
    return value


def walk(obj):
    if isinstance(obj, dict):
        pid = obj.get('prospect_id')
        if pid in fixes and 'domain' in obj and 'website_url' in obj:
            f = fixes[pid]
            obj['domain'] = f['new_domain']
            obj['website_url'] = f['new_url']
            note = (
                f"\nCanonical-domain repair t_c79e98c9 ({now}): replaced staged {f['old_url']} with {f['new_url']} "
                "after internal verification found the old URL returned 404 and the new URL loaded first-party content. "
                "Still attorney-review-only; no outreach/live sync/source-current external approval."
            )
            if 'notes' in obj and note not in obj['notes']:
                obj['notes'] += note
        if obj.get('evidence_id') in evidence_to_fix:
            f = evidence_to_fix[obj['evidence_id']]
            obj['source_url'] = f['new_url']
            obj['evidence_snippet'] = f['snippet']
            obj['supported_fact'] = f['supported']
            obj['confidence'] = 'medium_high'
            obj['corroboration'] = '2026-06-02 internal repair verification; old staged URL returned 404; canonical domain loaded first-party content; source-current refresh still required before external use'
            obj['safe_for_outreach'] = 'conditional'
            obj['safe_fact_for_copy'] = f['safe']
        for k, v in list(obj.items()):
            if isinstance(v, str):
                obj[k] = replace_stale_strings(v)
            else:
                walk(v)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            if isinstance(v, str):
                obj[i] = replace_stale_strings(v)
            else:
                walk(v)

paths = [
    run / 'prospect_candidates.normalized_for_store.json',
    run / 'agent-targeting-work-items/windborne-systems.json',
    run / 'agent-targeting-work-items/mach-industries.json',
]
for path in paths:
    data = json.loads(path.read_text())
    walk(data)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + '\n')

con = sqlite3.connect(db)
try:
    for pid, f in fixes.items():
        note = (
            f"\nCanonical-domain repair t_c79e98c9 ({now}): replaced staged {f['old_url']} with {f['new_url']} "
            "after internal verification found the old URL returned 404 and the new URL loaded first-party content. "
            "Still attorney-review-only; no outreach/live sync/source-current external approval."
        )
        con.execute(
            'UPDATE prospects SET domain=?, website_url=?, updated_at=?, notes=COALESCE(notes, "") || ? WHERE prospect_id=?',
            (f['new_domain'], f['new_url'], now, note, pid),
        )
        con.execute(
            '''UPDATE source_evidence
               SET source_url=?, evidence_snippet=?, supported_fact=?, corroboration=?, safe_for_outreach=?, safe_fact_for_copy=?
               WHERE evidence_id=?''',
            (
                f['new_url'],
                f['snippet'],
                f['supported'],
                '2026-06-02 internal repair verification; old staged URL returned 404; canonical domain loaded first-party content; source-current refresh still required before external use',
                'conditional',
                f['safe'],
                f['evidence_id'],
            ),
        )
        row = con.execute(
            'SELECT draft_id, source_facts, source_urls, internal_review_notes FROM outreach_drafts WHERE prospect_id=?',
            (pid,),
        ).fetchone()
        if row:
            draft_id, facts_s, urls_s, notes = row
            facts = [replace_stale_strings(x) for x in json.loads(facts_s)]
            urls = [f['new_url'] if u == f['old_url'] else u for u in json.loads(urls_s)]
            notes = (notes or '') + f"\nCanonical-domain repair t_c79e98c9 ({now}): source URL corrected from {f['old_url']} to {f['new_url']}; remains attorney-review-only/no external action."
            con.execute(
                'UPDATE outreach_drafts SET source_facts=?, source_urls=?, internal_review_notes=?, updated_at=? WHERE draft_id=?',
                (json.dumps(facts), json.dumps(urls), notes, now, draft_id),
            )
    con.commit()
finally:
    con.close()

print(f'updated {now}')
