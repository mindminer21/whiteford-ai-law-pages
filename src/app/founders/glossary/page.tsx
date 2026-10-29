import type { Metadata } from "next";
import { Breadcrumbs, FoundersShell } from "@/components/founders/chrome";
import { glossary } from "@/lib/founders/glossary";
import { getTool, stages } from "@/lib/founders/registry";

export const metadata: Metadata = {
  title: "Founder Glossary",
  description: "Plain-English definitions of the startup legal terms founders meet from formation to exit, from 83(b) elections to liquidation preferences.",
};

export default function GlossaryPage() {
  return (
    <FoundersShell>
      <section className="directory-hero fl-tool-hero">
        <div className="container">
          <Breadcrumbs items={[{ href: "/founders", label: "Founder Library" }, { label: "Glossary" }]} />
          <div className="directory-eyebrow">{glossary.length} terms</div>
          <h1>
            Founder <em>glossary</em>
          </h1>
          <p>The legal terms founders run into most, in plain English, with a link to the tool that puts each one to work.</p>
        </div>
      </section>
      <section className="fl-tool-section">
        <div className="container fl-glossary">
          {stages.map((stage) => {
            const terms = glossary.filter((term) => term.stage === stage.key).sort((a, b) => a.term.localeCompare(b.term));
            if (!terms.length) return null;
            return (
              <div className="fl-glossary-group" key={stage.key}>
                <h2>
                  <span>{stage.number}</span> {stage.title}
                </h2>
                <dl>
                  {terms.map((term) => {
                    const tool = term.tool ? getTool(term.tool) : undefined;
                    return (
                      <div className="fl-glossary-item" id={term.slug} key={term.slug}>
                        <dt>{term.term}</dt>
                        <dd>
                          {term.definition}
                          {tool ? (
                            <>
                              {" "}
                              <a href={`/founders/${tool.slug}`}>Try the {tool.title} &rarr;</a>
                            </>
                          ) : null}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            );
          })}
        </div>
      </section>
    </FoundersShell>
  );
}
