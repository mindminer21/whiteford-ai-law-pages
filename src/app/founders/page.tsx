import Link from "next/link";
import type { Metadata } from "next";
import { FoundersShell } from "@/components/founders/chrome";
import { glossary } from "@/lib/founders/glossary";
import { externalTools, stages, tools } from "@/lib/founders/registry";

const description =
  "Free legal tools for Colorado and Mountain West founders: model SAFEs, prepare an 83(b), check a non-compete, size an option pool and get diligence-ready.";

export const metadata: Metadata = {
  title: "Founder Library",
  description,
  openGraph: { title: "Founder Library | Whiteford · Schell IP", description, url: "/founders", images: ["/logos/whiteford-white-on-navy-full.png"] },
};

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export default function FoundersHome() {
  return (
    <FoundersShell>
      <section className="directory-hero fl-hero">
        <div className="container">
          <div className="directory-eyebrow">The Founder Library · Whiteford · Schell IP</div>
          <h1>
            Legal tools for founders, <em>from formation to exit.</em>
          </h1>
          <p>
            Model your SAFEs, prepare your 83(b), check a Colorado non-compete, size your option pool and get diligence-ready.
            Each tool gives you an answer in minutes and emails you a report you can share with your co-founders, your board or
            your counsel.
          </p>
          <div className="fl-hero-links">
            <a href="#raise">Raising money</a>
            <a href="#start">Just starting</a>
            <a href="#sell">Thinking about a sale</a>
            <Link href="/founders/mountain-west">Starting a business in the Mountain West</Link>
            <Link href="/founders/financing-documents">Financing documents</Link>
            <Link href="/founders/glossary">Glossary</Link>
            <Link href="/founders/about">About Whiteford | Schell IP</Link>
          </div>
        </div>
      </section>

      {stages.map((stage) => {
        const stageTools = tools.filter((tool) => tool.stage === stage.key);
        const outside = externalTools.filter((tool) => tool.stage === stage.key);
        const terms = glossary.filter((term) => term.stage === stage.key).slice(0, 6);
        if (!stageTools.length && !outside.length) return null;
        return (
          <section className="fl-stage" id={stage.key} key={stage.key}>
            <div className="container">
              <div className="fl-stage-head">
                <span className="fl-stage-number">{stage.number}</span>
                <div>
                  <h2>{stage.title}</h2>
                  <p>{stage.blurb}</p>
                </div>
              </div>
              <div className="directory-grid fl-tool-grid">
                {stageTools.map((tool) => (
                  <a className="directory-card fl-tool-card" href={`/founders/${tool.slug}`} key={tool.slug}>
                    <div className="directory-card-content">
                      <div className="directory-meta">{tool.meta}</div>
                      <h3>
                        {tool.titleParts[0]} <em>{tool.titleParts[1]}</em>
                      </h3>
                      <p>{tool.description}</p>
                      <div className="directory-card-action">
                        Open the tool <span><Arrow /></span>
                      </div>
                    </div>
                  </a>
                ))}
                {outside.map((tool) => (
                  <a className="directory-card fl-tool-card" href={tool.href} key={tool.href}>
                    <div className="directory-card-content">
                      <div className="directory-meta">{tool.meta}</div>
                      <h3>{tool.title}</h3>
                      <p>{tool.description}</p>
                      <div className="directory-card-action">
                        Open the tool <span><Arrow /></span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              {terms.length ? (
                <div className="fl-terms">
                  <span>Key terms</span>
                  {terms.map((term) => (
                    <a key={term.slug} href={`/founders/glossary#${term.slug}`}>
                      {term.term}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        );
      })}

      <section className="fl-stage" id="mountain-west">
        <div className="container">
          <div className="fl-stage-head">
            <span className="fl-stage-number">MW</span>
            <div>
              <h2>Building in the Mountain West</h2>
              <p>Where to register, where to find free help and capital, and who we are.</p>
            </div>
          </div>
          <div className="directory-grid fl-tool-grid fl-pair-grid">
            <Link className="directory-card fl-tool-card" href="/founders/mountain-west">
              <div className="directory-card-content">
                <div className="directory-meta">Guide · Colorado &amp; Utah</div>
                <h3>
                  Starting a business in <em>the Mountain West</em>
                </h3>
                <p>
                  The state filings, free counseling, university programs, accelerators, IP resources and funding programs for
                  founders in Colorado and Utah, with notes for Wyoming and Idaho.
                </p>
                <div className="directory-card-action">
                  Read the guide <span><Arrow /></span>
                </div>
              </div>
            </Link>
            <Link className="directory-card fl-tool-card" href="/founders/about">
              <div className="directory-card-content">
                <div className="directory-meta">About</div>
                <h3>
                  Whiteford <em>| Schell IP</em>
                </h3>
                <p>
                  Whiteford, Taylor &amp; Preston&apos;s Denver practice for founders: patents and IP strategy, AI counsel, outside
                  general counsel, financings and sell-side M&amp;A.
                </p>
                <div className="directory-card-action">
                  About us <span><Arrow /></span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="fl-band">
        <div className="container fl-band-grid">
          <div>
            <div className="directory-eyebrow">Financing documents</div>
            <h2>
              The standard forms, <em>explained.</em>
            </h2>
            <p>
              Y Combinator&apos;s SAFEs, the NVCA model documents and the Series Seed forms are the starting point for most early
              financings. We explain what each one does and link you to the publisher&apos;s current version.
            </p>
          </div>
          <Link className="learn-report-submit fl-button" href="/founders/financing-documents">
            Browse financing documents
          </Link>
        </div>
      </section>
    </FoundersShell>
  );
}
