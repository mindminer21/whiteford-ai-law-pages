import json, re, shutil, sqlite3, hashlib, subprocess
from pathlib import Path
from datetime import datetime, timezone

WORKDIR = Path('/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages')
RUN_DIR = WORKDIR / 'docs/nightly-lead-research/runs/2026-06-03'
SOURCE = RUN_DIR / 'prospect_candidates.json'
NORMALIZED = RUN_DIR / 'prospect_candidates.normalized_for_store.json'
DRY = RUN_DIR / 'store_dry_run.json'
OUT = RUN_DIR / 'store_output.json'
VERIFY = RUN_DIR / 'store_verification.json'
REPORT = RUN_DIR / 'validation_report.md'
WORK_ITEMS_DIR = RUN_DIR / 'agent-targeting-work-items'
PACKETS_DIR = RUN_DIR / 'agent-targeting-packets'
DB = Path('/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite')
BACKUP = RUN_DIR / 'growth-os.before_t_2aff8ce4.sqlite'
INDEX = WORKDIR / 'docs/KANBAN_DELIVERABLE_INDEX.md'
TASK_ID = 't_2aff8ce4'
RUN_DATE = '2026-06-03'

WORK_ITEMS_DIR.mkdir(parents=True, exist_ok=True)
PACKETS_DIR.mkdir(parents=True, exist_ok=True)

def slug(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

def stable(prefix, *parts):
    raw = '|'.join(str(p or '').strip().lower() for p in parts)
    return prefix + '_' + hashlib.sha256(raw.encode()).hexdigest()[:24]

def note_join(parts):
    return '\n'.join(str(x).strip() for x in parts if x not in (None, '', [], {}))

def lane_offer(lane):
    return {
        'ai-patent': ('AI Patent Strategy Scorecard', 'AI IP Protection & Patent Strategy'),
        'ai-compliance': ('AI Compliance Gameplan Builder', 'AI Compliance / Governance Readiness'),
        'tech-gc': ('Tech GC Legal Health Checklist', 'Fractional Tech GC Readiness'),
        'ma-readiness': ('Founder M&A Readiness Checklist', 'Founder M&A Readiness'),
    }.get(lane, ('Whiteford/Schell IP attorney-review resource', 'Attorney-review growth resource'))

def source_type(raw):
    if raw == 'company_website':
        return 'first-party_website'
    if raw == 'press_release':
        return 'techcrunch_article'
    return raw or 'public_web'

src = json.loads(SOURCE.read_text())
prospects = src.get('prospects') or src.get('candidates') or []
if len(prospects) != 3:
    raise SystemExit(f'Expected 3 prospects, found {len(prospects)}')

warnings = []
candidates = []
for p in prospects:
    comp = p['company']
    name = comp['name']
    sl = slug(name)
    prospect_id = f'prospect_{sl.replace("-", "_")}_{RUN_DATE.replace("-", "")}'
    lane = p.get('lane_classification', {}).get('primary_lane') or 'ai-patent'
    if lane not in {'ai-patent', 'ai-compliance', 'tech-gc', 'ma-readiness'}:
        warnings.append(f'{name}: invalid primary lane {lane!r}; normalized to ai-patent')
        lane = 'ai-patent'
    lead, rec = lane_offer(lane)
    scores = p.get('scores') or {}

    contacts = []
    for c in p.get('contacts') or []:
        cname = c.get('name')
        if not cname or cname.lower().startswith('not specified') or (c.get('confidence') or 0) < 60:
            warnings.append(f'{name}: held out placeholder/low-confidence contact {cname!r}; company-level only until leadership verified.')
            continue
        linkedin = c.get('linkedin_url')
        if linkedin:
            warnings.append(f'{name}: personal LinkedIn URL for {cname} not independently verified; retained in notes only and not promoted as a verified contact field.')
        contacts.append({
            'contact_id': stable('contact', prospect_id, cname, c.get('title')),
            'name': cname,
            'title': c.get('title'),
            'role_category': c.get('role_category'),
            'email': None,
            'linkedin_url': None,
            'phone': None,
            'source_type': 'public_source_or_client_input',
            'source_url': c.get('source_url'),
            'confidence': c.get('confidence'),
            'permission_basis': 'public-source research; attorney review required before outreach; no email opt-in; no auto-send',
            'suppression_status': 'consent_gap_no_auto_send',
            'notes': note_join([c.get('notes'), f'Unverified LinkedIn candidate held out of contact.linkedin_url: {linkedin}' if linkedin else None]),
        })
    if not contacts:
        warnings.append(f'{name}: no person-level contact staged; Gate 4 requires leadership/contact remediation before any named outreach.')

    evs = []
    for e in p.get('evidence') or []:
        url = e.get('url') or e.get('source_url')
        fact = e.get('supports_fact') or e.get('supported_fact')
        evs.append({
            'evidence_id': stable('evidence', prospect_id, url, fact),
            'source_url': url,
            'accessed_at': e.get('accessed_date') or e.get('accessed_at') or RUN_DATE,
            'source_type': source_type(e.get('source_type')),
            'fact_classification': 'public',
            'evidence_snippet': fact,
            'supported_fact': fact,
            'confidence': 'medium_high' if e.get('confident') is True else 'medium',
            'corroboration': 'parent qwen-local browser-fallback research; source-current refresh required before external use',
            'safe_for_outreach': 'conditional',
            'safe_fact_for_copy': fact,
        })

    key_facts = [e['supported_fact'] for e in evs]
    contact_note = 'Named contacts staged for attorney-review-only internal research: ' + ', '.join([f"{c['name']} ({c['title']})" for c in contacts]) if contacts else 'No named contact staged; company-level research only until leadership/contact verification.'
    remediation = p.get('remediation_gate_checklist') or []
    outreach = p.get('outreach') or {}
    next_action = p.get('next_action') or {}
    source_note = note_join([
        comp.get('product_service_summary'),
        comp.get('ai_relevance'),
        'Urgency signals: ' + '; '.join(p.get('urgency_signals_applied') or []),
        'Gate status: BROWSER_FALLBACK_RESUMED from parent qwen-local research; ops staging did not perform live enrichment or external source refresh.',
    ])
    notes = note_join([
        'Research-only nightly candidate. No outreach authorization; attorney review, conflicts, suppression, source-current checks, contact validation, and Jeff exact approval required before external use.',
        f'Outreach readiness: {outreach.get("status") or "research_only"}; consent basis: no_email_opt_in; approval status: no-auto-send.',
        contact_note,
        'Key facts: ' + '; '.join(key_facts),
        'Next action: ' + (next_action.get('notes') or next_action.get('recommended') or 'attorney_review'),
        'Remediation before outreach: ' + '; '.join(remediation),
        'Mountain West relevance: none claimed — national/international prospect scope only.',
        'Validation caveat: parent research used browser fallback after Firecrawl/search/extract quota failures; source-current checks remain required before external use.',
    ])
    draft_body = note_join([
        'ATTORNEY REVIEW ONLY — DO NOT SEND/POST.',
        'Target: ' + (', '.join([f"{c['name']} ({c['title']})" for c in contacts]) if contacts else 'role to verify before outreach (CEO/CTO/GC/Head of IP or equivalent; no named decision maker verified).'),
        f'Prospect: {name}',
        f'Internal hypothesis: {outreach.get("outreach_hypothesis")}',
        f'Suggested lead magnet: {outreach.get("suggested_lead_magnet") or lead}',
        '',
        'Upstream draft marker retained for review context only; no final copy approved:',
        p.get('linkedin_awareness_post_draft', p.get('linkedin_awarement_post_draft', {})).get('draft_text'),
        '',
        'Required before any external use: source-current verification, named contact/LinkedIn validation, conflicts check, suppression/opt-out/prior-touch checks, attorney review, and Jeff exact approval.',
    ])
    cand = {
        'prospect_id': f'{sl}-{RUN_DATE.replace("-", "")}',
        'company': {
            'prospect_id': prospect_id,
            'name': name,
            'domain': comp.get('domain'),
            'website_url': comp.get('website'),
            'company_linkedin_url': None,
            'location': comp.get('location_hq'),
            'state_region': None,
            'industry': comp.get('industry'),
            'segment': lane,
            'primary_offer_lane': lane,
            'source_type': 'nightly_public_source_research',
            'source_url': evs[0]['source_url'] if evs else None,
            'source_note': source_note,
            'pipeline_stage': 'research_staged',
            'scores': {
                'fit_score': scores.get('fit_score'),
                'urgency_score': scores.get('urgency_score'),
                'value_potential_score': scores.get('value_potential_score'),
                'combined_priority_score': scores.get('combined_priority_score'),
            },
            'lead_magnet': outreach.get('suggested_lead_magnet') or lead,
            'recommended_offer': rec,
            'risk_level': 'attorney_review_required',
            'suppression_status': 'consent_gap_no_auto_send',
            'conflicts_status': 'required_before_send',
            'owner': 'qwen-local',
            'notes': notes,
        },
        'contacts': contacts,
        'evidence': evs,
        'outreach_drafts': [{
            'draft_type': 'educational',
            'channel': 'manual_email_review',
            'title': f'{lead} attorney-review angle: {name}',
            'subject': f'Attorney-review-only {lead} angle for {name}',
            'body': draft_body,
            'source_facts': key_facts,
            'source_urls': [e['source_url'] for e in evs],
            'risk_level': 'attorney_review_required',
            'internal_review_notes': 'Not approved for sending or posting. Research-only local staging; requires attorney review, conflicts, suppression, source-current checks, contact validation, and Jeff exact approval before external use.',
        }],
        'validation_gates': {
            'gate_1_live_source': 'PARENT_BROWSER_FALLBACK_PAYLOAD_ONLY',
            'source_status': 'curl RSS + browser article extraction from parent qwen-local research; Firecrawl credits exhausted',
            'contact_validation': 'passed for named contacts only; Cyera company-level only' if contacts else 'failed/held: no named decision maker staged',
            'linkedin_validation': 'pending; no verified personal LinkedIn promoted to contact field',
            'outreach_readiness': 'attorney-review-only research_only; no external action authorized',
        },
        'consent_gating': p.get('consent_gating') or {'ops_no_auto_send': True, 'consent_basis': 'no_email_opt_in', 'approval_status': 'no-auto-send', 'workflow_trigger_tags': [], 'suppression_tags': ['newsletter:not-consented']},
        'source_candidate_path': str(SOURCE),
        'normalized_store_path': str(NORMALIZED),
        'source_packet_prospect_id': f'{sl}-{RUN_DATE.replace("-", "")}',
        'local_growth_os_prospect_id': prospect_id,
        'task': 'prepare_internal_attorney_review_agent_targeting_packet',
        'guardrails': {
            'external_action_allowed': False,
            'approval_required': True,
            'no_outreach_no_workflows_no_social_no_clio_no_live_sync': True,
            'required_before_external_use': ['Jeff exact approval', 'attorney review', 'conflicts check', 'suppression/opt-out/prior-touch check', 'source-current verification', 'named decision-maker/contact and LinkedIn validation'],
        },
    }
    candidates.append(cand)

NORMALIZED.write_text(json.dumps({'candidates': candidates}, indent=2, ensure_ascii=False) + '\n')

if not BACKUP.exists():
    shutil.copy2(DB, BACKUP)

for args, dest in [(['python3', 'scripts/prospect_research_store.py', '--dry-run', str(NORMALIZED)], DRY), (['python3', 'scripts/prospect_research_store.py', str(NORMALIZED)], OUT)]:
    proc = subprocess.run(args, cwd=WORKDIR, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    dest.write_text((proc.stdout or '') + (('\nSTDERR:\n' + proc.stderr) if proc.stderr else ''))
    if proc.returncode != 0:
        raise SystemExit(f'{args} failed: {proc.stderr}')

conn = sqlite3.connect(DB)
conn.row_factory = sqlite3.Row
now = datetime.now(timezone.utc).isoformat(timespec='seconds')
with conn:
    for cand in candidates:
        comp = cand['company']
        name = comp['name']
        sl = slug(name)
        priority = int(comp['scores'].get('combined_priority_score') or comp['scores'].get('fit_score') or 50)
        wi_id = stable('work_nightly_agent_targeting_20260603', comp['prospect_id'], comp['primary_offer_lane'])
        input_path = WORK_ITEMS_DIR / f'{sl}.json'
        output_path = PACKETS_DIR / f'{sl}-agent-targeting-packet.md'
        enriched = dict(cand)
        enriched.update({
            'work_item_id': wi_id,
            'input_path': str(input_path),
            'output_path': str(output_path),
            'remediation_checklist': ['Attorney review required before external use.', 'Named decision-maker/contact and LinkedIn validation required before any outreach.', 'Conflicts, suppression/opt-out, prior-touch, and source-current checks required before any outreach.', 'Do not send, post, tag, trigger workflows, sync live CRM/Supabase, or write Clio without Jeff exact approval.'],
        })
        input_path.write_text(json.dumps(enriched, indent=2, ensure_ascii=False) + '\n')
        conn.execute("""insert or replace into work_items (work_item_id, work_type, title, stage, priority, assigned_model, input_path, output_path, risk_level, approval_required, external_action_allowed, blocker, created_at, updated_at)
        values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, coalesce((select created_at from work_items where work_item_id=?), ?), ?)""",
        (wi_id, 'agent_targeting_packet', f'Prepare attorney-review Agent Targeting packet: {name}', 'queued', priority, 'qwen3.6:35b-a3b', str(input_path), str(output_path), 'attorney_review_required', 1, 0, 'No external action allowed; attorney review, conflicts/suppression, source-current and contact validation, and Jeff exact approval required.', wi_id, now, now))

counts = {}
for t in ['prospects', 'contacts', 'opportunities', 'source_evidence', 'outreach_drafts', 'approval_items', 'crm_sync_records', 'suppression_checks', 'work_items']:
    counts[t] = conn.execute(f'select count(*) from {t}').fetchone()[0]
row_checks = []
for cand in candidates:
    comp = cand['company']
    pid = comp['prospect_id']
    wi_id = stable('work_nightly_agent_targeting_20260603', pid, comp['primary_offer_lane'])
    row_checks.append({
        'company': comp['name'],
        'prospect_id': pid,
        'prospect_rows': conn.execute('select count(*) from prospects where prospect_id=?', (pid,)).fetchone()[0],
        'contact_rows': conn.execute('select count(*) from contacts where prospect_id=?', (pid,)).fetchone()[0],
        'evidence_rows': conn.execute('select count(*) from source_evidence where prospect_id=?', (pid,)).fetchone()[0],
        'draft_rows': conn.execute('select count(*) from outreach_drafts where prospect_id=?', (pid,)).fetchone()[0],
        'approval_rows': conn.execute('select count(*) from approval_items where related_id in (select draft_id from outreach_drafts where prospect_id=?)', (pid,)).fetchone()[0],
        'suppression_rows': conn.execute('select count(*) from suppression_checks where prospect_id=?', (pid,)).fetchone()[0],
        'sync_rows': conn.execute('select count(*) from crm_sync_records where local_table="prospects" and local_id=?', (pid,)).fetchone()[0],
        'work_item_rows': conn.execute('select count(*) from work_items where work_item_id=?', (wi_id,)).fetchone()[0],
        'external_action_allowed_sum': conn.execute('select coalesce(sum(external_action_allowed),0) from outreach_drafts where prospect_id=?', (pid,)).fetchone()[0] + conn.execute('select coalesce(sum(external_action_allowed),0) from work_items where work_item_id=?', (wi_id,)).fetchone()[0],
    })
verification = {
    'counts': counts,
    'row_checks': row_checks,
    'inserted_or_replaced_work_item_rows': len(candidates),
    'safety_external_action_allowed_total': sum(r['external_action_allowed_sum'] for r in row_checks),
    'warnings': warnings,
    'artifacts': {
        'source': str(SOURCE),
        'normalized': str(NORMALIZED),
        'dry_run': str(DRY),
        'store_output': str(OUT),
        'verification': str(VERIFY),
        'backup': str(BACKUP),
        'work_items_dir': str(WORK_ITEMS_DIR),
        'validation_report': str(REPORT),
    },
}
VERIFY.write_text(json.dumps(verification, indent=2, ensure_ascii=False) + '\n')
apply_json = json.loads(OUT.read_text().split('\nSTDERR:\n')[0])
dry_json = json.loads(DRY.read_text().split('\nSTDERR:\n')[0])

lines = []
lines += [f'# 2026-06-03 nightly prospect validation/staging', '', f'- Task: `{TASK_ID}`', f'- Source payload: `{SOURCE}`', f'- Normalized payload: `{NORMALIZED}`', f'- Store dry run: `{DRY}`', f'- Store apply output: `{OUT}`', f'- Verification: `{VERIFY}`', f'- Backup: `{BACKUP}`', f'- Agent-targeting work item directory: `{WORK_ITEMS_DIR}`', '', '## Result', '', f'Validated `{len(prospects)}` upstream prospects and normalized/staged `{len(candidates)}` candidates into the `candidates` shape required by `scripts/prospect_research_store.py`. The local Growth OS store dry run reported {dry_json.get("candidates")} candidates; apply completed with counts `{json.dumps(apply_json.get("counts", {}), sort_keys=True)}`. All records remain local/internal and attorney-review-only; no live sync or external action was performed.', '', '## Staged prospects', '']
for cand in candidates:
    c = cand['company']
    lines.append(f'- {c["name"]} (`{c["prospect_id"]}`), lane `{c["primary_offer_lane"]}`, stage `{c["pipeline_stage"]}`, fit score {c["scores"].get("fit_score")}, priority {c["scores"].get("combined_priority_score")}')
lines += ['', '## Agent-targeting work items', '']
for cand in candidates:
    c = cand['company']
    item_path = WORK_ITEMS_DIR / f'{slug(c["name"])}.json'
    lines.append(f'- {c["name"]} priority {c["scores"].get("combined_priority_score")}: `{item_path}`')
lines += ['', '## Verification', '', 'Current local Growth OS SQLite counts after apply:', '', '| Table | Count |', '|---|---:|']
for t, v in counts.items():
    lines.append(f'| `{t}` | {v} |')
lines += ['', 'Row checks:', '', '| Company | Prospect rows | Contact rows | Evidence rows | Draft rows | Work item rows | External action allowed sum |', '|---|---:|---:|---:|---:|---:|---:|']
for r in row_checks:
    lines.append(f'| {r["company"]} | {r["prospect_rows"]} | {r["contact_rows"]} | {r["evidence_rows"]} | {r["draft_rows"]} | {r["work_item_rows"]} | {r["external_action_allowed_sum"]} |')
lines += ['', '## Safety', '', 'Local/internal attorney-review-only staging. No outreach, workflow activation/enrollment, trigger tags, LinkedIn/social action, Clio writes, public/client-facing changes, prospect contact, or live CRM/Supabase/HighLevel sync authorized. Supabase mirror and HighLevel sync remain gated by existing blockers.', '', '## Warnings', '']
for w in warnings + ['All staged outreach vectors are attorney-review-only and must not be sent, posted, tagged, synced live, or enrolled in workflows.', 'Parent research used browser fallback after Firecrawl/search/extract quota failure; source-current checks remain required before external use.']:
    lines.append(f'- {w}')
REPORT.write_text('\n'.join(lines) + '\n')

entry = f'''
## {TASK_ID} — Validate and stage nightly prospects - 2026-06-03

Deliverable: `{REPORT}`
Summary: Validated and locally staged the 2026-06-03 nightly prospect candidates through prospect_research_store.py; created three internal attorney-review Agent Targeting work items for Coralogix, Layup Parts, and Cyera with external_action_allowed=0.
Next action: Reviewer should inspect the validation report and work items, with Supabase/HighLevel sync still gated by existing blockers and no external action authorized.
'''
idx = INDEX.read_text() if INDEX.exists() else '# Kanban Deliverable Index\n'
if f'## {TASK_ID} — Validate and stage nightly prospects - 2026-06-03' not in idx:
    INDEX.write_text(idx.rstrip() + '\n' + entry)

print(json.dumps({'ok': True, 'report': str(REPORT), 'verification_path': str(VERIFY), 'store_apply': apply_json, 'row_checks': row_checks}, indent=2))
