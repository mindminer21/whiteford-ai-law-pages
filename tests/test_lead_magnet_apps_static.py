from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(relative_path: str) -> str:
    return (ROOT / relative_path).read_text()


def test_founder_ma_readiness_app_route_and_payload_are_present():
    component = read("src/components/founder-ma-readiness-checklist.tsx")
    route = read("src/app/founder-ma-readiness-checklist/page.tsx")
    assert "campaignKey: \"ma-readiness\"" in component
    assert "sourcePage: \"founder-ma-readiness-checklist#checklist\"" in component
    assert "buyerDiligenceRiskMap" in component
    assert "sixtyDayCleanupPlan" in component
    assert "contact.subscribe" in component
    assert "!contact.subscribe" in component
    assert "FounderMaReadinessChecklist" in route


def test_ai_compliance_gameplan_has_roadmap_payload_and_consent_copy():
    component = read("src/components/gameplan-builder.tsx")
    assert "campaignKey: \"ai-compliance\"" in component
    assert "disclaimerAccepted," in component
    assert "reportRequested: true" in component
    assert "privacyGuardrailVersion" in component
    assert "publicFormInputType" in component
    assert "ai-compliance-gameplan-privacy-guardrail-v2" in component
    assert "tenDayFixes" in component
    assert "roadmap306090" in component
    assert "readinessHeatMap" in component
    assert "contact.subscribe" in component
    assert "!contact.subscribe" in component
    assert "noConfidentialNotice" in component


def test_ai_patent_scorecard_has_gap_map_payload_and_consent_copy():
    component = read("src/components/patent-scorecard.tsx")
    assert "documentationGapMap" in component
    assert "ownershipGapMap" in component
    assert "recommendedNextStep" in component
    assert "contact.subscribe" in component
    assert "!contact.subscribe" in component
    assert "not for confidential information" in component.lower()


def test_lead_api_maps_all_three_app_payloads_to_preview_custom_fields():
    route = read("src/app/api/leads/route.ts")
    for token in [
        "aiComplianceGameplan",
        "maReadiness",
        "aiPatentDocumentationGapMap",
        "ma_readiness_score",
        "ma_readiness_60_day_plan",
        "ai_compliance_roadmap_30_60_90",
        "ai_patent_gap_map",
    ]:
        assert token in route


def test_deliverable_index_references_remaining_three_lead_magnets():
    index = read("docs/KANBAN_DELIVERABLE_INDEX.md")
    assert "t_80df0663" in index
    assert "/ai-compliance-gameplan" in index
    assert "/ai-patent-strategy-scorecard" in index
    assert "/founder-ma-readiness-checklist" in index
