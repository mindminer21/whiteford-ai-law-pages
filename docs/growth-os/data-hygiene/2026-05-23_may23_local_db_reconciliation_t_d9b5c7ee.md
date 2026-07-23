# May 23 local Growth OS DB reconciliation — task t_d9b5c7ee

Status: completed local/internal SQLite reconciliation only. No Supabase mirror/backfill, HighLevel/CRM sync, contact/opportunity/tag/field mutation outside the local SQLite DB, workflow activation/enrollment, email/SMS/DM, LinkedIn/social/ad action, Clio write, public publishing, prospect contact, or client-facing action was performed.

Prepared: 2026-05-24T04:43:23Z

## Scope

Controlling artifacts read first:

- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/digests/2026-05-23_daily_digest.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/digest.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/correction_report_t_ae1d6444.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/nightly_qwen_prospect_digest_re_review_t_417dd89d.md`
- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/nightly-lead-research/runs/2026-05-23/prospect_candidates.normalized_for_store.json`

SQLite DB reconciled:

- `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite`

Patch/control rule applied:

- Josh.ai remains the only supportable Denver/HQ prospect in the packet, internal-only and attorney-review-required.
- AKASA must not appear as Denver HQ; corrected to South San Francisco HQ with Denver/Colorado hub/coworking-only HOLD posture.
- Deepwatch must not remain in the Denver/Mountain-West queue; corrected to Tampa/no-current-Mountain-West-nexus HOLD posture.
- Tim Gill must not carry the Josh.ai company LinkedIn URL as a person-level LinkedIn URL.
- Pending CRM/Supabase/HighLevel sync rows for these May 23 records must not be interpreted as cleared.

## Backup

Backup created before any write:

- `/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/backups/growth-os.sqlite.20260524T044049Z.pre_t_d9b5c7ee_reconciliation.bak`

Backup command used:

```bash
DB='/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite'
BACKUP_DIR='/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/backups'
mkdir -p "$BACKUP_DIR"
TS=$(date -u +%Y%m%dT%H%M%SZ)
BACKUP="$BACKUP_DIR/growth-os.sqlite.${TS}.pre_t_d9b5c7ee_reconciliation.bak"
cp -p "$DB" "$BACKUP"
python3 - <<PY
import sqlite3, pathlib
src=pathlib.Path('$DB')
bak=pathlib.Path('$BACKUP')
for p in [src,bak]:
    conn=sqlite3.connect(str(p))
    ok=conn.execute('pragma integrity_check').fetchone()[0]
    conn.close()
    print(p, 'bytes', p.stat().st_size, 'integrity_check', ok)
PY
```

Backup verification output:

```text
/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/growth-os.sqlite bytes 3276800 integrity_check ok
/Users/jeff/.openclaw/projects/mountain-west-growth-os/data/backups/growth-os.sqlite.20260524T044049Z.pre_t_d9b5c7ee_reconciliation.bak bytes 3276800 integrity_check ok
```

## Script / exact mutation source

Script written and run:

- `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-23_may23_local_db_reconciliation_t_d9b5c7ee.py`

Machine-readable snapshots:

- Before rows: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-23_may23_local_db_reconciliation_t_d9b5c7ee_before.json`
- After rows: `/Users/jeff/Documents/Codex/2026-05-05/i-want-to-install-hermes-agent/whiteford-ai-law-pages/docs/growth-os/data-hygiene/2026-05-23_may23_local_db_reconciliation_t_d9b5c7ee_after.json`

Important SQL operations performed by the script:

```sql
UPDATE prospects
SET source_note='Nightly Qwen public-source research run 2026-05-23, patched by t_ae1d6444 and re-reviewed by t_417dd89d; local/internal staging only; no external action authorized.',
    updated_at=?
WHERE prospect_id IN ('prospect_c6b77ec2cbafac9396d2dae4','prospect_2b8b3cc887bb4779073633a5','prospect_902418419fe01ca4f3c36f4b');

UPDATE prospects
SET location='South San Francisco, CA (HQ); Denver/Colorado hub/coworking presence only',
    pipeline_stage='research_hold',
    risk_level='attorney_review_required',
    suppression_status='consent_gap_no_auto_send',
    conflicts_status='required_before_send',
    notes=?,
    updated_at=?
WHERE prospect_id='prospect_2b8b3cc887bb4779073633a5';

UPDATE prospects
SET location='Tampa, FL per Crunchbase 2023; no current Denver/Mountain West nexus verified',
    pipeline_stage='research_hold',
    risk_level='attorney_review_required',
    suppression_status='consent_gap_no_auto_send',
    conflicts_status='required_before_send',
    notes=?,
    updated_at=?
WHERE prospect_id='prospect_902418419fe01ca4f3c36f4b';

UPDATE contacts
SET linkedin_url='', updated_at=?
WHERE contact_id='contact_62d789f30018de7f07b7d5dd';

UPDATE contacts
SET linkedin_url='', source_url='', confidence=65,
    permission_basis='Public-source research only; LinkedIn-only person evidence requires manual/human verification; attorney review, conflicts, suppression, and exact approval required before outreach',
    updated_at=?
WHERE contact_id='contact_2efa4e2a8e75466f5b7923ff';

UPDATE contacts
SET source_url='https://www.deepwatch.com/deepwatch-names-john-dilullo-as-chief-executive-officer/',
    permission_basis='Public-source research only; first-party CEO source is not geography clearance; attorney review, conflicts, suppression, and exact approval required before outreach',
    updated_at=?
WHERE contact_id='contact_6431d7f146c2ed5b522e8e73';

INSERT INTO source_evidence (...)
VALUES (...)
ON CONFLICT(evidence_id) DO UPDATE SET
    accessed_at=excluded.accessed_at,
    source_type=excluded.source_type,
    fact_classification=excluded.fact_classification,
    evidence_snippet=excluded.evidence_snippet,
    supported_fact=excluded.supported_fact,
    confidence=excluded.confidence,
    corroboration=excluded.corroboration,
    safe_for_outreach=excluded.safe_for_outreach,
    safe_fact_for_copy=excluded.safe_fact_for_copy;

UPDATE outreach_drafts
SET body=?, source_facts=?, source_urls=?, status=?, compliance_status='needs_review',
    risk_level='attorney_review_required', external_action_allowed=0,
    internal_review_notes=?, updated_at=?
WHERE draft_id=?;

UPDATE approval_items
SET content_excerpt=?, approval_status=?, risk_level='attorney_review_required',
    revision_notes=?, updated_at=?
WHERE approval_item_id=?;

UPDATE crm_sync_records
SET eligibility_status='blocked', sync_status='blocked', block_reason=?, updated_at=?
WHERE sync_record_id IN ('sync_d02ccd0d70cd65ef5a138a3e','sync_587852260c5279c5958bb782','sync_ee7287276abfb914ae76fd83');

UPDATE work_items
SET stage=?, priority=?, blocker=?, external_action_allowed=0,
    approval_required=1, risk_level='attorney_review_required', updated_at=?
WHERE work_item_id=?;

UPDATE suppression_checks
SET final_clearance='not_cleared', whiteford_conflicts_status='required_before_send',
    opt_out_status='not_checked', duplicate_prior_touch_status='not_checked', notes=?, checked_at=?
WHERE prospect_id=?;

INSERT INTO crm_audit_log (...)
VALUES (... 'Local/internal May 23 DB reconciliation ... No external action performed.' ...);
```

Full parameter values are in the script and before/after JSON files above.

## Before / after summary

### Prospects

| Company | Before | After |
|---|---|---|
| Josh.ai | `location=Denver, CO`; notes said `actively producing/filing AI patents`; `pipeline_stage=research_staged`; sync row pending/not_checked | `location=Denver, CO`; notes now use source-exact patent-page wording; `pipeline_stage=research_staged`; all external/live sync blocked unless exact approval and gates clear |
| AKASA | `location=Denver, CO (HQ)`; notes said `draft_ready`, `high`, `verified - Denver CO HQ`; `pipeline_stage=research_staged`; sync row pending/not_checked | `location=South San Francisco, CA (HQ); Denver/Colorado hub/coworking presence only`; notes say HOLD/geography corroboration required; `pipeline_stage=research_hold`; sync row `blocked/blocked` |
| Deepwatch | `location=Denver, CO`; notes said `rapid scaling from Denver`; `pipeline_stage=research_staged`; sync row pending/not_checked | `location=Tampa, FL per Crunchbase 2023; no current Denver/Mountain West nexus verified`; notes say HOLD/removed from Mountain West queue; `pipeline_stage=research_hold`; sync row `blocked/blocked` |

### Contacts

| Contact | Before | After |
|---|---|---|
| Tim Gill | `linkedin_url=https://www.linkedin.com/company/joshai` | `linkedin_url=''`; company LinkedIn remains only in company-level source evidence |
| Benjamin Beadle-Ryby | `linkedin_url=https://www.linkedin.com/in/ben-beadle-ryby`; `source_url` was LinkedIn-only evidence | `linkedin_url=''`; `source_url=''`; permission basis now says LinkedIn-only person evidence requires manual/human verification |
| John DiLullo | source URL pointed to 2023 Crunchbase funding article | source URL points to first-party 2024 CEO announcement; permission basis states this is not geography clearance |

### Drafts, approval items, work queue, and sync posture

| Area | Before | After |
|---|---|---|
| Outreach drafts | Josh.ai used non-source-exact patent wording; AKASA/Deepwatch contained stale geography/readiness wording | Josh.ai corrected but remains attorney-review-only; AKASA/Deepwatch drafts set `blocked_not_send_ready` with HOLD copy |
| Approval items | all three pending with excerpts copied from stale draft bodies | Josh.ai remains pending for internal attorney review; AKASA/Deepwatch set `blocked_not_send_ready` |
| CRM/Supabase/HighLevel sync records | all three May 23 rows were `eligibility_status=not_checked`, `sync_status=pending` | all three set to `eligibility_status=blocked`, `sync_status=blocked`, with row-specific no-sync reasons |
| Agent Targeting work items | all three queued; AKASA and Deepwatch still had Mountain-West queue implication | Josh.ai remains queued but guarded; AKASA/Deepwatch set `stage=blocked`, `priority=0`, explicit HOLD blockers |
| Suppression checks | `final_clearance=not_cleared`; conflicts required | preserved as `not_cleared` / `required_before_send`; notes now explicitly reflect reconciliation HOLD posture |

## Verification queries and results

### Prospect location and posture

Query:

```sql
SELECT company_name, location, pipeline_stage, suppression_status, conflicts_status, risk_level,
       substr(notes,1,180) AS notes_start
FROM prospects
WHERE company_name IN ('Josh.ai','AKASA','Deepwatch')
ORDER BY company_name;
```

Result:

```json
[
  {
    "company_name": "AKASA",
    "location": "South San Francisco, CA (HQ); Denver/Colorado hub/coworking presence only",
    "pipeline_stage": "research_hold",
    "suppression_status": "consent_gap_no_auto_send",
    "conflicts_status": "required_before_send",
    "risk_level": "attorney_review_required"
  },
  {
    "company_name": "Deepwatch",
    "location": "Tampa, FL per Crunchbase 2023; no current Denver/Mountain West nexus verified",
    "pipeline_stage": "research_hold",
    "suppression_status": "consent_gap_no_auto_send",
    "conflicts_status": "required_before_send",
    "risk_level": "attorney_review_required"
  },
  {
    "company_name": "Josh.ai",
    "location": "Denver, CO",
    "pipeline_stage": "research_staged",
    "suppression_status": "consent_gap_no_auto_send",
    "conflicts_status": "required_before_send",
    "risk_level": "attorney_review_required"
  }
]
```

### LinkedIn hygiene

Query:

```sql
SELECT p.company_name, c.name, c.linkedin_url, c.source_url, c.permission_basis
FROM contacts c JOIN prospects p ON p.prospect_id=c.prospect_id
WHERE c.name IN ('Tim Gill','Benjamin Beadle-Ryby','John DiLullo')
ORDER BY c.name;
```

Result:

```json
[
  {
    "company_name": "AKASA",
    "name": "Benjamin Beadle-Ryby",
    "linkedin_url": "",
    "source_url": "",
    "permission_basis": "Public-source research only; LinkedIn-only person evidence requires manual/human verification; attorney review, conflicts, suppression, and exact approval required before outreach"
  },
  {
    "company_name": "Deepwatch",
    "name": "John DiLullo",
    "linkedin_url": "",
    "source_url": "https://www.deepwatch.com/deepwatch-names-john-dilullo-as-chief-executive-officer/",
    "permission_basis": "Public-source research only; first-party CEO source is not geography clearance; attorney review, conflicts, suppression, and exact approval required before outreach"
  },
  {
    "company_name": "Josh.ai",
    "name": "Tim Gill",
    "linkedin_url": "",
    "source_url": "https://josh.ai/team",
    "permission_basis": "Public-source research only; attorney review, conflicts, suppression, and exact approval required before outreach"
  }
]
```

### Sync blockers

Query:

```sql
SELECT p.company_name, s.eligibility_status, s.sync_status, s.block_reason
FROM crm_sync_records s JOIN prospects p ON p.prospect_id=s.local_id
WHERE p.company_name IN ('Josh.ai','AKASA','Deepwatch')
ORDER BY p.company_name;
```

Result: all three rows now have `eligibility_status=blocked` and `sync_status=blocked`.

- AKASA block reason: `Blocked by local DB reconciliation t_d9b5c7ee: AKASA is HOLD for Mountain-West queue; South San Francisco HQ with Denver hub/coworking presence only; no CRM/Supabase/HighLevel sync until geography review clears.`
- Deepwatch block reason: `Blocked by local DB reconciliation t_d9b5c7ee: Deepwatch removed from Denver/Mountain-West queue; no current Colorado nexus verified; no CRM/Supabase/HighLevel sync unless a later current reliable source clears geography.`
- Josh.ai block reason: `Blocked by local DB reconciliation t_d9b5c7ee: Josh.ai remains attorney-review-only; no CRM/Supabase/HighLevel sync without exact Jeff approval, suppression/conflicts/source-current clearance, and final approved copy.`

### Work item posture

Query:

```sql
SELECT title, stage, priority, external_action_allowed, approval_required, blocker
FROM work_items
WHERE title LIKE '%Josh.ai%' OR title LIKE '%AKASA%' OR title LIKE '%Deepwatch%'
ORDER BY title;
```

Result summary:

- AKASA: `stage=blocked`, `priority=0`, `external_action_allowed=0`, blocker says South San Francisco HQ / Denver hub-only HOLD.
- Deepwatch: `stage=blocked`, `priority=0`, `external_action_allowed=0`, blocker says no current Denver/Mountain-West nexus and no Agent Targeting/external/sync action.
- Josh.ai: `stage=queued`, `priority=80`, `external_action_allowed=0`, guarded by attorney review, conflicts, suppression, source-current verification, and exact Jeff approval.

### Suppression / clearance posture

Query:

```sql
SELECT p.company_name, sc.final_clearance, sc.whiteford_conflicts_status, sc.opt_out_status, sc.notes
FROM suppression_checks sc JOIN prospects p ON p.prospect_id=sc.prospect_id
WHERE p.company_name IN ('Josh.ai','AKASA','Deepwatch')
ORDER BY p.company_name;
```

Result summary:

- All three remain `final_clearance=not_cleared`.
- All three remain `whiteford_conflicts_status=required_before_send`.
- All three remain `opt_out_status=not_checked`.
- AKASA and Deepwatch notes now explicitly state HOLD/no-targeting/no-sync posture.

### Stale contradiction scan

Query:

```sql
SELECT 'prospects' AS table_name, company_name AS row_key, location AS field_value
FROM prospects
WHERE (company_name='AKASA' AND location='Denver, CO (HQ)')
   OR (company_name='Deepwatch' AND location='Denver, CO')
UNION ALL
SELECT 'contacts', name, linkedin_url
FROM contacts
WHERE name='Tim Gill' AND linkedin_url='https://www.linkedin.com/company/joshai'
UNION ALL
SELECT 'outreach_drafts', title, body
FROM outreach_drafts
WHERE (title LIKE '%AKASA%' AND body LIKE '%Denver CO HQ%')
   OR (title LIKE '%Deepwatch%' AND body LIKE '%rapidly scaling from Denver%')
   OR (title LIKE '%Josh.ai%' AND body LIKE '%actively producing/filing AI patents%');
```

Result:

```json
[]
```

### Integrity check

Query:

```sql
PRAGMA integrity_check;
```

Result:

```text
ok
```

## Notes / caveats

- No external/live-system API call was made.
- `source_evidence.safe_for_outreach` stayed `conditional`, which is the local enum-compatible value for attorney-review-only source evidence.
- AKASA and Deepwatch are not deleted; they are preserved for auditability but moved into HOLD/quarantine posture locally.
- Josh.ai is still not send-ready; it is internal attorney-review-only and sync-blocked pending exact approval and required gates.
