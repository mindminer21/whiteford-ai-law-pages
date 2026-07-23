# HighLevel workflow editing API research

Date: 2026-05-06

## Question

Does an authenticated/private endpoint exist for editing HighLevel workflows programmatically?

## Short answer

Probably yes in the sense that the HighLevel browser UI must call internal authenticated endpoints to read/save workflow nodes, triggers, actions, draft/publish state, etc. Public reports also say people have reverse-engineered those browser/internal endpoints.

But there is no supported public API for workflow creation/update/delete as of this research, and the best public evidence says the internal approach may violate HighLevel terms of service and carries account/support risk.

## Evidence checked

### Official HighLevel API documentation

Official public docs repository:

- `GoHighLevel/highlevel-api-docs`
- File found: `apps/workflows.json`
- Paths listed: only `GET /workflows/`

The official OpenAPI spec for workflows exposes only the workflow listing endpoint. It does not expose workflow detail, nodes, triggers, actions, create, update, delete, draft/publish, or cloning endpoints.

Observed from the OpenAPI file:

- `/workflows/` supports `GET`
- summary: `Get Workflow`

### Live API probes against Whiteford location

Known working public API endpoint:

- `GET /workflows/?locationId=tm68WWMrcAa3TqQbEAMa`
- Result: 200, returns workflow id/name/status/version timestamps only.

Tested likely detail/edit path shapes with GET only:

- `/workflows/{workflowId}?locationId=...` -> 404
- `/workflows/{workflowId}` -> 404
- `/locations/{locationId}/workflows/{workflowId}` -> 404
- `/automation/workflows/{workflowId}` -> 404
- `/automation/workflows/{workflowId}?locationId=...` -> 404
- `/automations/workflows/{workflowId}?locationId=...` -> 404
- `/workflows/{workflowId}/versions?locationId=...` -> 404
- `/workflows/{workflowId}/steps?locationId=...` -> 404

No supported workflow editing endpoint was found via public API path probing.

### HighLevel ideas/roadmap evidence

HighLevel ideas page: `REST API — Workflow POST/PUT Endpoint for Creating and Updating Workflows`

Relevant public text:

> Currently, there is no way to modify a Workflow using the API. I'm forced to return to something like Selenium to automate those tasks.

Status shown: under review.

HighLevel ideas page: `API endpoints: POST/PUT/DEL for workflows`

Relevant public text:

> The platform API is read-only for workflows ... There are no write endpoints available to create workflows ... Every one of these must be built manually in the UI.

This supports the conclusion that public supported workflow editing is not currently available.

### Public reverse-engineering reports

Reddit thread: `I cracked GoHighLevel Workflow API!!!`

Relevant public text from the post:

> the public workflow API is gutted. Name, status, ID. No nodes, no SMS bodies, no triggers, no conditions.

The poster says they built tooling for bulk edits, version control, AI-assisted edits, JSON snapshots, etc., but later added:

> After reading GHL’s TOS carefully, what I built clearly violates it. Taking the repo down soon — not risking my agency account over this.

A comment claims the method is basically browser-network reverse engineering:

> copy curl Network GET/POST request + response to learn how to create your own new skills

Another comment says the private/internal endpoint is stable because it is what GHL itself calls, but the poster also acknowledges maintenance burden and undocumented changes.

## Conclusion

There appears to be an authenticated internal/browser workflow API, but not a supported or documented public API. Using it would likely require an authenticated browser session/token/cookies and reverse-engineering the HighLevel UI's network traffic. Public reports suggest this may violate HighLevel's terms and could risk account access/support.

For Whiteford/Schell IP, the safest operational path is:

1. Use supported public API for what it supports:
   - list workflows
   - create draft email assets
   - enroll contacts only after explicit approval
2. Build/edit workflow automation logic manually in the HighLevel UI, or by supervised browser automation after Jeff logs in.
3. Keep all workflows draft/off until attorney/business approval.
4. Avoid undocumented internal workflow edit endpoints unless Jeff explicitly accepts ToS/support/account-risk after reviewing the issue.

## Recommended next step

Use the created draft email campaign assets and manually wire them in HighLevel UI into four draft workflows:

- WF | Intake | Whiteford | AI Patent Strategy Scorecard | Draft
- WF | Intake | Whiteford | AI Compliance Gameplan | Draft
- WF | Intake | Whiteford | Tech GC Launchpad | Draft
- WF | Intake | Whiteford | Founder M&A Readiness | Draft

If UI automation is desired, have Jeff log into HighLevel in the browser and use supervised browser automation to create/edit workflow steps through the UI, not through private endpoints.
