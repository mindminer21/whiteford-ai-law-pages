import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs, FoundersShell } from "@/components/founders/chrome";

export const metadata: Metadata = {
  title: "Startup Financing Documents, Explained",
  description:
    "What Y Combinator's SAFEs, the NVCA model documents and the Series Seed forms each do, when you need them, and where to get the publisher's current version.",
};

type Doc = { name: string; what: string; when: string };
type Family = {
  id: string;
  publisher: string;
  title: string;
  intro: string;
  license: string;
  link: { href: string; label: string };
  docs: Doc[];
  tool?: { href: string; label: string };
};

const families: Family[] = [
  {
    id: "yc-safe",
    publisher: "Y Combinator",
    title: "Post-money SAFEs",
    intro:
      "The most common way to raise a first round without setting a price. Each investor's ownership is fixed at the valuation cap, so later SAFEs dilute founders, not earlier SAFE holders.",
    license:
      "Y Combinator publishes these forms under a Creative Commons Attribution-NoDerivatives 4.0 license. Download them from Y Combinator. YC permits edits for use in your own transaction but asks that modified versions not be shared publicly without its permission, so we link to the originals rather than host copies.",
    link: { href: "https://www.ycombinator.com/safe/", label: "Get the forms from Y Combinator" },
    tool: { href: "/founders/safe-calculator", label: "Model your SAFEs" },
    docs: [
      { name: "SAFE: valuation cap, no discount", what: "Converts at the lower of the cap price or the round price.", when: "The default for most pre-seed and seed SAFEs." },
      { name: "SAFE: discount, no valuation cap", what: "Converts at a fixed percentage off the next round's price, with no ceiling.", when: "When investors accept upside tied to the next round instead of a cap." },
      { name: "SAFE: uncapped MFN", what: "No cap or discount; the holder can adopt better terms you later give other SAFE investors.", when: "Early friends-and-family or strategic money before terms are set." },
      { name: "Pro rata side letter", what: "Gives a SAFE investor the right to buy into the priced round to keep their percentage.", when: "Usually only for larger or lead SAFE investors." },
      { name: "SAFE user guide", what: "YC's explanation of the forms, with sample conversion math.", when: "Read it before you sign your first SAFE." },
      { name: "Non-U.S. versions (Canada, Cayman Islands, Singapore)", what: "Valuation-cap SAFEs adapted for companies formed in those jurisdictions.", when: "Only for companies incorporated there, with local counsel's review." },
    ],
  },
  {
    id: "nvca",
    publisher: "National Venture Capital Association",
    title: "NVCA model documents",
    intro:
      "The industry-standard starting point for priced venture rounds (Series A and later, and many seed rounds). Investors' counsel usually drafts from these, so knowing what each covers speeds up negotiation.",
    license:
      "NVCA offers these as free downloads intended as a starting point to be tailored. Get the current versions from NVCA; they are updated periodically.",
    link: { href: "https://nvca.org/model-legal-documents/", label: "Get the documents from NVCA" },
    tool: { href: "/founders/term-sheet-decoder", label: "Decode a term sheet" },
    docs: [
      { name: "Certificate of incorporation", what: "Creates the preferred stock and its rights: liquidation preference, anti-dilution, voting and protective provisions.", when: "Filed with the state at closing." },
      { name: "Stock purchase agreement", what: "The investors buy the shares; the company makes representations about itself.", when: "Signed at closing, with a disclosure schedule." },
      { name: "Investors' rights agreement", what: "Information rights, registration rights and pro rata rights in future rounds.", when: "Signed at closing." },
      { name: "Voting agreement", what: "Who elects the board, plus drag-along obligations for a sale.", when: "Signed at closing by investors and key common holders." },
      { name: "Right of first refusal and co-sale agreement", what: "Controls founders' ability to sell their shares and lets investors tag along.", when: "Signed at closing by founders and investors." },
      { name: "Management rights letter", what: "Gives certain fund investors consultation rights they need for regulatory reasons.", when: "When a fund investor asks for it." },
      { name: "Indemnification agreement", what: "Protects directors, including investor directors, against claims arising from board service.", when: "For each director, usually at closing." },
      { name: "Model legal opinion", what: "The form of opinion company counsel may give investors on the company's authority and the shares' validity.", when: "Only if the investors require an opinion at closing." },
    ],
  },
  {
    id: "series-seed",
    publisher: "Originally Fenwick & West",
    title: "Series Seed documents",
    intro:
      "A shorter, simpler set of seed-stage preferred stock documents, with an option to defer some investor rights to the next round. Also available in a convertible-note version.",
    license:
      "The Series Seed documents were released under an open-source license. Confirm the current license and version with the publisher before you use them.",
    link: { href: "https://en.wikipedia.org/wiki/Series_Seed_Documents", label: "Background on the Series Seed documents" },
    docs: [
      { name: "Term sheet", what: "A one-page summary of seed preferred terms.", when: "To agree on a small priced seed round." },
      { name: "Charter and stock investment agreement", what: "Creates the seed preferred stock and documents the purchase in a compact form.", when: "At closing." },
      { name: "Convertible note package", what: "Notes and a term sheet for a seed round that converts later.", when: "When a note fits the investors better than a SAFE." },
    ],
  },
];

const filings: Doc[] = [
  { name: "SEC Form D", what: "Notice that you relied on Regulation D. Filed online in EDGAR; no SEC fee.", when: "Within 15 days after the first investor is irrevocably committed." },
  { name: "Colorado Regulation D notice filing", what: "Colorado's notice filing for Rule 506 offerings, made through NASAA's Electronic Filing Depository with a $50 fee.", when: "Due when the SEC filing is due, if Colorado investors participate." },
  { name: "IRS Form 15620 (83(b) election)", what: "The IRS form for an 83(b) election. It can be filed online through the IRS website or by mail.", when: "Within 30 days after restricted stock is transferred to you." },
];

export default function FinancingDocumentsPage() {
  return (
    <FoundersShell>
      <section className="directory-hero fl-tool-hero">
        <div className="container">
          <Breadcrumbs items={[{ href: "/founders", label: "Founder Library" }, { label: "Financing documents" }]} />
          <div className="directory-eyebrow">Raise funds</div>
          <h1>
            Startup financing documents, <em>explained</em>
          </h1>
          <p>
            What each standard form does, when you&apos;ll need it, and where to get the publisher&apos;s current version. These
            forms are starting points; the deal terms and your company&apos;s facts decide what they should say.
          </p>
        </div>
      </section>
      <section className="fl-tool-section">
        <div className="container fl-docs">
          <nav className="fl-docs-nav" aria-label="Document families">
            {families.map((family) => (
              <a key={family.id} href={`#${family.id}`}>
                {family.title}
              </a>
            ))}
            <a href="#filings">Government filings</a>
          </nav>
          {families.map((family) => (
            <article className="fl-doc-family" id={family.id} key={family.id}>
              <div className="fl-doc-head">
                <div>
                  <div className="directory-meta">{family.publisher}</div>
                  <h2>{family.title}</h2>
                  <p>{family.intro}</p>
                </div>
                <div className="fl-doc-actions">
                  <a className="learn-report-submit fl-button" href={family.link.href} target="_blank" rel="noopener noreferrer">
                    {family.link.label}
                  </a>
                  {family.tool ? (
                    <a className="fl-button-secondary" href={family.tool.href}>
                      {family.tool.label} &rarr;
                    </a>
                  ) : null}
                </div>
              </div>
              <div className="fl-table-scroll">
                <table className="fl-table fl-doc-table">
                  <thead>
                    <tr>
                      <th>Document</th>
                      <th>What it does</th>
                      <th>When you need it</th>
                    </tr>
                  </thead>
                  <tbody>
                    {family.docs.map((doc) => (
                      <tr key={doc.name}>
                        <td>{doc.name}</td>
                        <td>{doc.what}</td>
                        <td>{doc.when}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="fl-license">{family.license}</p>
            </article>
          ))}
          <article className="fl-doc-family" id="filings">
            <div className="fl-doc-head">
              <div>
                <div className="directory-meta">SEC · Colorado Division of Securities · IRS</div>
                <h2>Government filings that come with a raise</h2>
                <p>Filings founders most often miss around a financing or founder stock issuance.</p>
              </div>
              <div className="fl-doc-actions">
                <Link className="fl-button-secondary" href="/founders/exempt-offering-checklist">
                  Build your filing checklist &rarr;
                </Link>
                <Link className="fl-button-secondary" href="/founders/83b-election">
                  Prepare your 83(b) &rarr;
                </Link>
              </div>
            </div>
            <div className="fl-table-scroll">
              <table className="fl-table fl-doc-table">
                <thead>
                  <tr>
                    <th>Filing</th>
                    <th>What it is</th>
                    <th>Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {filings.map((doc) => (
                    <tr key={doc.name}>
                      <td>{doc.name}</td>
                      <td>{doc.what}</td>
                      <td>{doc.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="fl-license">
              Sources:{" "}
              <a href="https://www.sec.gov/resources-small-businesses/exempt-offerings/filing-form-d-notice" target="_blank" rel="noopener noreferrer">
                SEC
              </a>
              ,{" "}
              <a href="https://securities.colorado.gov/division-of-securities-forms-and-fees" target="_blank" rel="noopener noreferrer">
                Colorado Division of Securities
              </a>
              ,{" "}
              <a href="https://www.irs.gov/pub/irs-pdf/f15620.pdf" target="_blank" rel="noopener noreferrer">
                IRS Form 15620
              </a>
              .
            </p>
          </article>
        </div>
      </section>
    </FoundersShell>
  );
}
