import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const exists = (relativePath) => fs.existsSync(path.join(root, relativePath));

const requiredFiles = [
  "src/app/client-portal/page.tsx",
  "src/app/portal/page.tsx",
  "src/app/portal/messages/page.tsx",
  "src/app/portal/messages/new/page.tsx",
  "src/app/portal/documents/page.tsx",
  "src/app/portal/documents/upload/page.tsx",
  "src/app/portal/schedule/page.tsx",
  "src/app/portal/schedule/new/page.tsx",
  "src/app/portal/onboarding/page.tsx",
  "src/app/portal/agenda/page.tsx",
  "src/app/portal/attorneys/page.tsx",
  "src/lib/portal/types.ts",
  "src/lib/portal/tags.ts",
  "src/lib/portal/attorneys.ts",
  "src/lib/portal/mock-data.ts",
  "src/lib/portal/routing.ts",
  "src/components/portal/guardrail-callout.tsx",
  "src/components/portal/tag-selector.tsx",
  "src/components/portal/attorney-tag-guide.tsx",
  "src/components/portal/portal-shell.tsx",
  "src/components/portal/portal-dashboard.tsx",
  "src/components/portal/conversation-composer.tsx",
  "src/components/portal/document-upload-panel.tsx",
  "src/components/portal/scheduling-request-form.tsx",
  "src/components/portal/onboarding-assistant.tsx",
  "src/components/portal/monthly-agenda-board.tsx",
  "docs/client-portal/2026-05-14_phase_0_portal_static_routes_implementation_note.md",
];

for (const file of requiredFiles) {
  if (!exists(file)) {
    throw new Error(`Missing required portal prototype file: ${file}`);
  }
}

const attorneySource = read("src/lib/portal/attorneys.ts");
const attorneyCount = (attorneySource.match(/attorney\("/g) ?? []).length;
if (attorneyCount < 23) {
  throw new Error(`Expected at least 23 draft attorney seed records, found ${attorneyCount}.`);
}
for (const requiredAttorneyGuardrail of [
  "isDraftRoster: true",
  'availabilityMode: "request-only"',
  "Internal draft roster only",
  "does not guarantee review, assignment, availability, or representation",
]) {
  if (!attorneySource.includes(requiredAttorneyGuardrail)) {
    throw new Error(`Attorney seeds missing required draft/request-only guardrail: ${requiredAttorneyGuardrail}`);
  }
}
for (const unsafeAttorneyPosture of ['availabilityMode: "bookable"', "guaranteed availability", "guaranteed representation"]) {
  if (attorneySource.toLowerCase().includes(unsafeAttorneyPosture.toLowerCase())) {
    throw new Error(`Phase 0 attorney seed data contains unsafe posture: ${unsafeAttorneyPosture}`);
  }
}

const tagsSource = read("src/lib/portal/tags.ts");
const expectedIssueTags = [
  "#ai-governance",
  "#ai-contracts",
  "#ip-patents",
  "#trade-secrets",
  "#open-source-software",
  "#commercial-contracts",
  "#privacy-security",
  "#employment-contractors",
  "#corporate-governance",
  "#financing-investor-readiness",
  "#ma-exit-readiness",
  "#litigation-disputes",
  "#gov-contracts-defense",
  "#real-estate-facilities",
  "#tax-structure",
  "#monthly-gc-call",
  "#urgent-triage",
  "#board-investor-sensitive",
];
for (const tag of expectedIssueTags) {
  if (!tagsSource.includes(tag)) {
    throw new Error(`Missing predefined issue tag ${tag}.`);
  }
}
if (!tagsSource.includes("portalIssueTags.find((tag) => tag.slug === slug)")) {
  throw new Error("getTagBySlug must return only existing predefined tags, not synthesize arbitrary tags.");
}
if (!tagsSource.includes("portalIssueTags.some((tag) => tag.slug === slug)")) {
  throw new Error("isPortalIssueTagSlug must validate against the predefined taxonomy.");
}
for (const unsafeTagFactoryPattern of ["createTag", "newTag", "customTag", "arbitraryTag"]) {
  if (tagsSource.includes(unsafeTagFactoryPattern)) {
    throw new Error(`Tag taxonomy must not expose arbitrary tag creation helper: ${unsafeTagFactoryPattern}`);
  }
}

const routingSource = read("src/lib/portal/routing.ts");
if (!routingSource.includes("issueTags: PortalIssueTagSlug[]")) {
  throw new Error("Attorney suggestion helper must accept only predefined PortalIssueTagSlug values.");
}

const visibleAttorneyRosterSource = [
  "src/app/portal/attorneys/page.tsx",
  "src/components/portal/attorney-tag-guide.tsx",
].map(read).join("\n").toLowerCase();
for (const requiredVisibleRosterCaveat of [
  "internal draft seed data",
  "request-only routing prototypes",
  "current whiteford availability",
  "conflicts",
  "engagement scope",
  "attorney approval",
  "jeff&apos;s highlevel/referral-list",
  "before any production, client-facing, or broader demo use",
]) {
  if (!visibleAttorneyRosterSource.includes(requiredVisibleRosterCaveat)) {
    throw new Error(`Visible attorney roster missing currentness/approval caveat: ${requiredVisibleRosterCaveat}`);
  }
}

const guardedFiles = [
  "src/app/client-portal/page.tsx",
  "src/app/portal/page.tsx",
  "src/components/portal/conversation-composer.tsx",
  "src/components/portal/document-upload-panel.tsx",
  "src/components/portal/scheduling-request-form.tsx",
  "src/components/portal/onboarding-assistant.tsx",
];
const guardedText = guardedFiles.map(read).join("\n").toLowerCase();

for (const phrase of [
  "does not create a new attorney-client relationship",
  "portal messages are not an emergency channel",
  "prototype only",
  "no live messages",
  "no legal advice",
  "no conflicts clearance",
  "no matter acceptance",
  "no autonomous attorney assignment",
  "no guaranteed response",
]) {
  if (!guardedText.includes(phrase)) {
    throw new Error(`Missing required guardrail phrase: ${phrase}`);
  }
}

for (const unsafe of [
  "guaranteed booking",
  "guaranteed review",
  "upload to s3",
  "send calendar invite",
  "attorney-client relationship is created",
]) {
  if (guardedText.includes(unsafe)) {
    throw new Error(`Unsafe production-like portal claim found: ${unsafe}`);
  }
}

console.log("client portal static guardrails passed");
