# HighLevel Hygiene Packet — Unverified Nightly Agent Targeting Placeholders

Task: `t_ce9e4292`
Prepared for: Jeff / Whiteford Schell IP
Prepared by: highlevel-ops
Date: 2026-05-06 nightly batch review
HighLevel location: Whiteford Schell IP (`tm68WWMrcAa3TqQbEAMa`)
Pipeline: Whiteford Schell IP Pipeline (`Tbx4tA6wHv5lTwZPSHyZ`)
Current stage: Agent Targeting (`fd569cf4-979b-43b8-bd0f-78e807e80ff1`)
Mode: APPROVAL ONLY — no live CRM mutations performed by this packet

## Executive decision

Keep the three HighLevel records only as quarantined internal research placeholders until Jeff approves remediation and conflict/suppression clearance. The parent review verified that the records are currently safe in the narrow operational sense: company-level DND contacts, open Agent Targeting opportunities, no tags, no sends, no workflow enrollment, and no LinkedIn actions. They are not outreach-ready because source, contact, domain/entity, suppression, and conflicts validation are incomplete or failed.

Recommended immediate action for Jeff: approve internal-only HighLevel hygiene updates that visibly mark each opportunity/contact as `UNVERIFIED NIGHTLY RESEARCH — source/contact/domain remediation required before outreach` and create a manual research-remediation task on each opportunity. Do not add marketing tags, workflow triggers, personal emails/phones, named-recipient outreach drafts, or Targeting Packet Ready movement.

## Records requiring hygiene markings

| Company | Prospect ID | HighLevel contact ID | HighLevel opportunity ID | Current status | Primary issue |
| --- | --- | --- | --- | --- | --- |
| Rigetti Computing | `prospect_d249372d03e9b2df1dd67726` | `u8I3Yr7RTDSHJlpp7WyS` | `lG8g7kmVJ6JXx7tD4NES` | Open in Agent Targeting | Staged leadership/contact data does not match current official management evidence. |
| Nexar | `prospect_c542c95f73995e2dbd2a15c3` | `W4Nl8orLw9XRbxuqFSvu` | `NzoQ2XJ4biAJWiUhKHgT` | Open in Agent Targeting | Domain/entity ambiguity: staged `nexar.com` conflicts with fleet/dashcam business appearing under `getnexar.com` / `fleet.getnexar.com`. |
| Kodiak Robotics | `prospect_c6c776b4596056a65d055c7c` | `U9kfeAN9w8ZRLj5nXIz8` | `JbzdcCHJaBgpIJyt7ccc` | Open in Agent Targeting | Staged about URL and leadership/contact assumptions are stale or mismatched. |

Source artifacts used for this packet:
- Parent review: `docs/nightly-lead-research/runs/2026-05-06/nightly_qwen_prospect_digest_review_t_d488fbc9.md`
- HighLevel sync report: `docs/nightly-lead-research/runs/2026-05-06/highlevel_agent_targeting_sync.json`
- HighLevel verification: `docs/nightly-lead-research/runs/2026-05-06/highlevel_agent_targeting_sync_verify.json`
- Validation report: `docs/nightly-lead-research/runs/2026-05-06/validation_report.md`

## Approval packet: exact internal-only notes

If Jeff approves live hygiene writes, add one internal note to the corresponding opportunity and/or contact. These notes are deliberately internal, non-marketing, and do not authorize external action.

### Rigetti Computing

Target IDs:
- Contact: `u8I3Yr7RTDSHJlpp7WyS`
- Opportunity: `lG8g7kmVJ6JXx7tD4NES`

Proposed internal note:

```text
UNVERIFIED NIGHTLY RESEARCH — source/contact/domain remediation required before outreach.

Nightly 2026-05-06 Agent Targeting placeholder only. Do not send, enroll, tag for marketing, move to Targeting Packet Ready, add personal contact details, or draft named-recipient outreach until Jeff approves remediation. Parent review found Rigetti leadership/contact mismatch: staged contact data did not match current official management evidence reviewed for Dr. Subodh Kulkarni, David Rivas, and Jeffrey Bertelsen. Required next steps: verify current public-source evidence, confirm Mountain West relevance, re-run suppression/duplicate-prior-touch/opt-out checks, run Whiteford conflicts clearance, and rewrite any draft using only verified facts.
```

### Nexar

Target IDs:
- Contact: `W4Nl8orLw9XRbxuqFSvu`
- Opportunity: `NzoQ2XJ4biAJWiUhKHgT`

Proposed internal note:

```text
UNVERIFIED NIGHTLY RESEARCH — source/contact/domain remediation required before outreach.

Nightly 2026-05-06 Agent Targeting placeholder only. Do not send, enroll, tag for marketing, move to Targeting Packet Ready, add personal contact details, or draft named-recipient outreach until Jeff approves remediation. Parent review found material domain/entity ambiguity: staged `nexar.com` appears inconsistent with the fleet/dashcam business that appears under `getnexar.com` / `fleet.getnexar.com`; staged contact data also included duplicate/unclear contact references. Required next steps: decide the intended Nexar entity, correct website/domain/source URLs, dedupe contacts, verify leadership through non-scraped public sources, re-run suppression/duplicate-prior-touch/opt-out checks, run Whiteford conflicts clearance, and rewrite any draft using only verified facts.
```

### Kodiak Robotics

Target IDs:
- Contact: `U9kfeAN9w8ZRLj5nXIz8`
- Opportunity: `JbzdcCHJaBgpIJyt7ccc`

Proposed internal note:

```text
UNVERIFIED NIGHTLY RESEARCH — source/contact/domain remediation required before outreach.

Nightly 2026-05-06 Agent Targeting placeholder only. Do not send, enroll, tag for marketing, move to Targeting Packet Ready, add personal contact details, or draft named-recipient outreach until Jeff approves remediation. Parent review found stale source URLs and leadership/contact mismatch: staged `https://www.kodiak.ai/about` moved/not-found, current reviewed pages are `kodiak.ai/company` and `kodiak.ai/technology`, and staged CEO/CTO names did not match current company-page evidence identifying Don Burnette as Founder & CEO. Required next steps: replace stale source references, verify current technical/business decision-makers, confirm any Mountain West/freight-corridor claims, re-run suppression/duplicate-prior-touch/opt-out checks, run Whiteford conflicts clearance, and rewrite any draft using only verified facts.
```

## Approval packet: exact internal HighLevel tasks

If Jeff approves live hygiene writes, create one internal task per opportunity. Suggested task owner: Jeff or the approved HighLevel/Growth OS operator. Suggested priority: high. Suggested due date: next business day or before any prospecting review session, whichever is earlier.

### Rigetti Computing task

```text
Task title: Remediate UNVERIFIED NIGHTLY RESEARCH — Rigetti Computing
Related contact ID: u8I3Yr7RTDSHJlpp7WyS
Related opportunity ID: lG8g7kmVJ6JXx7tD4NES
Task body: Verify current Rigetti source evidence and leadership/contact records before any outreach. Parent review flagged staged contact mismatch versus current official management evidence. Confirm Mountain West relevance, rerun suppression/duplicate-prior-touch/opt-out checks, obtain Whiteford conflicts clearance, then rewrite any draft using only verified facts. No send, workflow enrollment, marketing tag, Targeting Packet Ready movement, or named-recipient enrichment until Jeff approves.
```

### Nexar task

```text
Task title: Remediate UNVERIFIED NIGHTLY RESEARCH — Nexar
Related contact ID: W4Nl8orLw9XRbxuqFSvu
Related opportunity ID: NzoQ2XJ4biAJWiUhKHgT
Task body: Resolve Nexar entity/domain before any outreach. Parent review flagged staged `nexar.com` as potentially the wrong entity for the fleet/dashcam business, which appears under `getnexar.com` / `fleet.getnexar.com`, plus duplicate/unclear contact data. Decide intended entity, correct domain/source URLs, dedupe and verify contacts through non-scraped public sources, rerun suppression/duplicate-prior-touch/opt-out checks, obtain Whiteford conflicts clearance, then rewrite any draft using only verified facts. No send, workflow enrollment, marketing tag, Targeting Packet Ready movement, or named-recipient enrichment until Jeff approves.
```

### Kodiak Robotics task

```text
Task title: Remediate UNVERIFIED NIGHTLY RESEARCH — Kodiak Robotics
Related contact ID: U9kfeAN9w8ZRLj5nXIz8
Related opportunity ID: JbzdcCHJaBgpIJyt7ccc
Task body: Replace stale Kodiak source evidence and verify current leadership/contact records before any outreach. Parent review flagged staged `https://www.kodiak.ai/about` as moved/not-found and staged CEO/CTO assumptions as mismatched; current reviewed pages include `kodiak.ai/company` and `kodiak.ai/technology`, with Don Burnette identified as Founder & CEO. Confirm any technical decision-maker and Mountain West/freight-corridor claims, rerun suppression/duplicate-prior-touch/opt-out checks, obtain Whiteford conflicts clearance, then rewrite any draft using only verified facts. No send, workflow enrollment, marketing tag, Targeting Packet Ready movement, or named-recipient enrichment until Jeff approves.
```

## Safe cleanup options for Jeff

These options are ordered from safest/least destructive to most destructive. None should be executed without Jeff's explicit current approval for the exact write.

1. Preferred: keep current DND company-level placeholders in Agent Targeting and add only the internal notes/tasks above.
   - Pros: preserves audit trail and prevents accidental duplicate re-creation.
   - Conditions: keep DND on; keep tags empty; do not enroll workflows; do not add personal emails/phones; do not move stages.

2. Add a visible opportunity-name prefix such as `[UNVERIFIED] Rigetti Computing — Agent Targeting`.
   - Pros: warning is visible in pipeline board/list views even before a user opens the notes.
   - Cons: mutates live opportunity names and may need cleanup after remediation.
   - Approval needed: exact opportunity names and IDs.

3. Create a dedicated internal custom field such as `Growth OS Research Status = Unverified Nightly Research` or `Source Verification Status = Remediation Required`.
   - Pros: cleaner reporting and safer than tags/workflows if it does not trigger automations.
   - Cons: custom-field creation/configuration must be checked for workflow dependencies first.
   - Approval needed: field name, allowed values, and confirmation that no automations trigger from the field.

4. Move the records to a quarantine stage only if Jeff wants a new pipeline stage.
   - Pros: creates clear board separation between validated Agent Targeting records and unverified placeholders.
   - Cons: stage creation and movement affect pipeline reporting; existing stage conventions may be preferable.
   - Approval needed: new stage name/order plus exact opportunity IDs to move.

5. Delete the placeholders only if Jeff decides they create more risk than audit value.
   - Pros: eliminates accidental use risk.
   - Cons: loses live CRM audit continuity and may cause future nightly systems to recreate duplicates unless dedupe logic is updated.
   - Approval needed: exact contact/opportunity IDs, export/readback first, and confirmation whether linked local Growth OS records should remain.

## Explicitly not recommended now

- Do not add marketing or workflow-trigger tags.
- Do not enroll any workflow, campaign, newsletter, SMS, or nurture sequence.
- Do not add personal email addresses, phone numbers, or LinkedIn profile URLs.
- Do not move any of the three to Targeting Packet Ready.
- Do not assign any human salesperson to perform outreach.
- Do not prepare named-recipient copy until source and recipient validation are repaired.
- Do not treat suppression, opt-out, duplicate-prior-touch, or Whiteford conflicts as cleared; current status remains not checked / required before send / not cleared.

## Jeff approval checklist

Before any HighLevel write, Jeff should approve one of these exact scopes:

- `APPROVE INTERNAL NOTES ONLY for Rigetti/Nexar/Kodiak IDs listed in t_ce9e4292 packet.`
- `APPROVE INTERNAL NOTES AND TASKS for Rigetti/Nexar/Kodiak IDs listed in t_ce9e4292 packet.`
- `APPROVE OPPORTUNITY NAME PREFIX ONLY with exact final names.`
- `DO NOT MUTATE HIGHLEVEL; remediate locally first.`
- `DELETE/ARCHIVE PLACEHOLDERS` only after export/readback and a separate exact-delete confirmation.

Recommended approval: internal notes + tasks only, with no tags, no sends, no workflows, no stage movement, and no personal contact enrichment.
