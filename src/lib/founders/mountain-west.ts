/**
 * Content for /founders/mountain-west. Every resource listed in mountainWestStates must be verified
 * against the organization's official site before it is added (see the page footer's review date).
 */

export type MwResource = { name: string; url: string; description: string };
export type MwGroup = { title: string; items: MwResource[] };
export type MwState = { id: string; name: string; intro: string; groups: MwGroup[] };

export const mountainWestSteps: { title: string; body: string; tool?: { href: string; label: string } }[] = [
  {
    title: "Pick the entity and the state",
    body: "Decide between an LLC and a corporation, and whether to form in your home state or Delaware. Venture-backed companies usually form a Delaware C corporation and register in the state where they operate.",
    tool: { href: "/founders/entity-chooser", label: "Entity Chooser" },
  },
  {
    title: "Form and register",
    body: "File with the Secretary of State or Division of Corporations, get an EIN from the IRS, and register for state taxes and, once you hire, unemployment insurance.",
  },
  {
    title: "Issue founder equity cleanly",
    body: "Issue founder stock with vesting, assign the founders' existing IP to the company, and file any 83(b) elections within 30 days.",
    tool: { href: "/founders/83b-election", label: "83(b) Prep Sheet" },
  },
  {
    title: "Lock down IP ownership",
    body: "Get confidentiality and invention assignment agreements from everyone who builds anything, including contractors, before the work starts.",
    tool: { href: "/founders/ip-ownership-audit", label: "IP Ownership Audit" },
  },
  {
    title: "Use the free help",
    body: "Small Business Development Centers, SCORE mentors, university programs and state economic development offices offer free counseling and, in some cases, grants. The lists below are a starting point.",
  },
];

/** Filled from verified research; empty until each listing is confirmed. */
export const mountainWestStates: MwState[] = [];
