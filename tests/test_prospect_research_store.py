import json
import sqlite3
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


REPO = Path(__file__).resolve().parents[1]
SCRIPT = REPO / "scripts" / "prospect_research_store.py"


def make_db(path: Path):
    conn = sqlite3.connect(path)
    conn.executescript(
        """
        CREATE TABLE prospects (
          prospect_id TEXT PRIMARY KEY,
          company_name TEXT NOT NULL,
          domain TEXT,
          website_url TEXT,
          location TEXT,
          state_region TEXT,
          industry TEXT,
          segment TEXT,
          source_type TEXT,
          source_url TEXT,
          source_note TEXT,
          pipeline_stage TEXT DEFAULT 'identified',
          fit_score REAL,
          urgency_score REAL,
          risk_level TEXT DEFAULT 'unknown',
          suppression_status TEXT,
          conflicts_status TEXT,
          owner TEXT,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          notes TEXT
        );
        CREATE TABLE contacts (
          contact_id TEXT PRIMARY KEY,
          prospect_id TEXT,
          name TEXT,
          title TEXT,
          role_category TEXT,
          email TEXT,
          linkedin_url TEXT,
          phone TEXT,
          source_type TEXT,
          source_url TEXT,
          confidence REAL,
          permission_basis TEXT,
          suppression_status TEXT,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );
        CREATE TABLE opportunities (
          opportunity_id TEXT PRIMARY KEY,
          prospect_id TEXT NOT NULL,
          contact_id TEXT,
          campaign_id TEXT,
          offer_id TEXT,
          stage TEXT NOT NULL,
          estimated_value REAL,
          probability REAL,
          expected_close_date TEXT,
          owner TEXT,
          source TEXT,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );
        CREATE TABLE source_evidence (
          evidence_id TEXT PRIMARY KEY,
          prospect_id TEXT,
          source_url TEXT NOT NULL,
          accessed_at TEXT NOT NULL,
          source_type TEXT NOT NULL,
          fact_classification TEXT NOT NULL,
          evidence_snippet TEXT NOT NULL,
          supported_fact TEXT NOT NULL,
          confidence TEXT NOT NULL,
          corroboration TEXT NOT NULL,
          safe_for_outreach TEXT NOT NULL,
          safe_fact_for_copy TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE approval_items (
          approval_item_id TEXT PRIMARY KEY,
          item_type TEXT NOT NULL,
          related_id TEXT,
          title TEXT NOT NULL,
          content_path TEXT,
          content_excerpt TEXT,
          channel TEXT,
          recipient_or_class TEXT,
          risk_level TEXT DEFAULT 'unknown',
          approval_status TEXT DEFAULT 'pending',
          checklist_path TEXT,
          reviewer TEXT,
          decision_at TEXT,
          approval_language TEXT,
          revision_notes TEXT,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );
        CREATE TABLE outreach_drafts (
          draft_id TEXT PRIMARY KEY,
          prospect_id TEXT,
          segment TEXT,
          draft_type TEXT NOT NULL,
          title TEXT NOT NULL,
          channel TEXT NOT NULL DEFAULT 'manual',
          subject TEXT,
          body TEXT NOT NULL,
          source_facts TEXT,
          source_urls TEXT,
          prompt_version TEXT NOT NULL,
          draft_version TEXT NOT NULL DEFAULT 'v1',
          status TEXT NOT NULL DEFAULT 'drafted',
          risk_level TEXT DEFAULT 'unknown',
          compliance_status TEXT DEFAULT 'needs_review',
          approval_item_id TEXT,
          external_action_allowed INTEGER DEFAULT 0,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          external_body_candidate TEXT,
          internal_review_notes TEXT,
          source_evidence_ids TEXT,
          final_copy_hash TEXT,
          solicitation_classification TEXT NOT NULL DEFAULT 'attorney_review_only',
          brand_block_id TEXT NOT NULL DEFAULT 'APPROVED_WHITEFORD_SCHELL_IP_BRAND_BLOCK_REQUIRED'
        );
        CREATE TABLE suppression_checks (
          check_id TEXT PRIMARY KEY,
          prospect_id TEXT,
          draft_id TEXT,
          local_suppression_status TEXT NOT NULL DEFAULT 'not_checked',
          local_clio_precheck_status TEXT NOT NULL DEFAULT 'not_checked',
          whiteford_conflicts_status TEXT NOT NULL DEFAULT 'required_before_send',
          opt_out_status TEXT NOT NULL DEFAULT 'not_checked',
          duplicate_prior_touch_status TEXT NOT NULL DEFAULT 'not_checked',
          evidence_path TEXT,
          checked_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          checked_by TEXT NOT NULL DEFAULT 'MegaWhiz',
          final_clearance TEXT NOT NULL DEFAULT 'not_cleared',
          notes TEXT
        );
        CREATE TABLE crm_sync_records (
          sync_record_id TEXT PRIMARY KEY,
          batch_id TEXT,
          local_table TEXT NOT NULL,
          local_id TEXT NOT NULL,
          crm_object TEXT NOT NULL,
          crm_object_id TEXT,
          action TEXT NOT NULL DEFAULT 'upsert_staging',
          eligibility_status TEXT NOT NULL DEFAULT 'not_checked',
          sync_status TEXT NOT NULL DEFAULT 'pending',
          block_reason TEXT,
          payload_path TEXT,
          response_path TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        """
    )
    conn.commit()
    conn.close()


def sample_payload():
    return {
        "candidates": [
            {
                "company": {
                    "name": "Example AI Robotics",
                    "domain": "example-ai.test",
                    "website_url": "https://example-ai.test",
                    "location": "Denver, CO",
                    "state_region": "Colorado",
                    "industry": "AI robotics",
                    "segment": "ai-patent",
                    "source_url": "https://example-ai.test/news",
                    "source_note": "Announced AI robotics product launch.",
                    "scores": {
                        "fit_score": 88,
                        "urgency_score": 72,
                        "value_potential_score": 81,
                        "combined_priority_score": 82,
                    },
                    "primary_offer_lane": "ai-patent",
                    "lead_magnet": "AI Patent Strategy Scorecard",
                    "recommended_offer": "AI Patent Strategy Sprint",
                    "notes": "Technical founder and public launch signal.",
                },
                "contacts": [
                    {
                        "name": "Ada Founder",
                        "title": "Founder and CTO",
                        "role_category": "CTO",
                        "email": "ada@example-ai.test",
                        "linkedin_url": "https://www.linkedin.com/in/ada-founder",
                        "phone": "+1-303-555-0100",
                        "source_url": "https://example-ai.test/team",
                        "confidence": 92,
                        "permission_basis": "public-source research; attorney review required before outreach",
                    }
                ],
                "evidence": [
                    {
                        "source_url": "https://example-ai.test/news",
                        "source_type": "company_press_release",
                        "fact_classification": "public",
                        "evidence_snippet": "Example AI Robotics announced a computer-vision robot product.",
                        "supported_fact": "Recent AI robotics product launch suggests potential AI patent strategy need.",
                        "confidence": "high",
                        "corroboration": "official company website",
                        "safe_for_outreach": "yes",
                        "safe_fact_for_copy": "recent public AI robotics product launch",
                    }
                ],
                "outreach_drafts": [
                    {
                        "draft_type": "email",
                        "channel": "manual_email_review",
                        "title": "AI patent scorecard outreach angle",
                        "subject": "AI invention documentation before launch details spread",
                        "body": "I saw your public AI robotics product launch. A useful free starting point may be the AI Patent Strategy Scorecard, which helps founders pressure-test human contribution, ownership, and documentation before deciding whether a patent strategy sprint is worthwhile.",
                        "source_facts": ["recent public AI robotics product launch"],
                        "source_urls": ["https://example-ai.test/news"],
                    }
                ],
            }
        ]
    }


class ProspectResearchStoreTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.db_path = Path(self.tmp.name) / "growth.sqlite"
        self.payload_path = Path(self.tmp.name) / "payload.json"
        make_db(self.db_path)
        self.payload_path.write_text(json.dumps(sample_payload()), encoding="utf-8")

    def tearDown(self):
        self.tmp.cleanup()

    def run_store(self, *args):
        return subprocess.run(
            [sys.executable, str(SCRIPT), "--db", str(self.db_path), *args, str(self.payload_path)],
            cwd=REPO,
            text=True,
            capture_output=True,
        )

    def test_dry_run_does_not_write_records(self):
        result = self.run_store("--dry-run")

        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("dry_run", result.stdout)
        conn = sqlite3.connect(self.db_path)
        self.assertEqual(conn.execute("select count(*) from prospects").fetchone()[0], 0)
        self.assertEqual(conn.execute("select count(*) from contacts").fetchone()[0], 0)

    def test_apply_upserts_company_contact_evidence_draft_and_approval(self):
        result = self.run_store()

        self.assertEqual(result.returncode, 0, result.stderr)
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        prospect = conn.execute("select * from prospects").fetchone()
        self.assertEqual(prospect["company_name"], "Example AI Robotics")
        self.assertEqual(prospect["domain"], "example-ai.test")
        self.assertEqual(prospect["fit_score"], 88)
        self.assertIn("AI Patent Strategy Scorecard", prospect["notes"])
        contact = conn.execute("select * from contacts").fetchone()
        self.assertEqual(contact["name"], "Ada Founder")
        self.assertEqual(contact["email"], "ada@example-ai.test")
        self.assertTrue(contact["linkedin_url"].endswith("ada-founder"))
        self.assertEqual(contact["phone"], "+1-303-555-0100")
        self.assertEqual(conn.execute("select count(*) from source_evidence").fetchone()[0], 1)
        self.assertEqual(conn.execute("select count(*) from outreach_drafts").fetchone()[0], 1)
        self.assertEqual(conn.execute("select count(*) from approval_items").fetchone()[0], 1)
        sync = conn.execute("select * from crm_sync_records").fetchone()
        self.assertEqual(sync["sync_status"], "pending")
        self.assertEqual(sync["eligibility_status"], "not_checked")

    def test_apply_is_idempotent_for_same_domain_and_contact(self):
        self.assertEqual(self.run_store().returncode, 0)
        self.assertEqual(self.run_store().returncode, 0)

        conn = sqlite3.connect(self.db_path)
        self.assertEqual(conn.execute("select count(*) from prospects").fetchone()[0], 1)
        self.assertEqual(conn.execute("select count(*) from contacts").fetchone()[0], 1)


if __name__ == "__main__":
    unittest.main()
