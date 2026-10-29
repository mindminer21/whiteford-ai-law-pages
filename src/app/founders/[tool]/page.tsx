import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs, FoundersShell } from "@/components/founders/chrome";
import { FounderTool } from "@/components/founders/founder-tool";
import { getTool, stages, tools } from "@/lib/founders/registry";

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((tool) => ({ tool: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const tool = getTool((await params).tool);
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.description,
    openGraph: { title: `${tool.title} | Founder Library`, description: tool.description, url: `/founders/${tool.slug}`, images: ["/logos/whiteford-white-on-navy-full.png"] },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ tool: string }> }) {
  const tool = getTool((await params).tool);
  if (!tool) notFound();
  const stage = stages.find((item) => item.key === tool.stage);

  return (
    <FoundersShell>
      <section className="directory-hero fl-tool-hero">
        <div className="container">
          <Breadcrumbs items={[{ href: "/founders", label: "Founder Library" }, { href: `/founders#${tool.stage}`, label: stage?.title ?? "Tools" }, { label: tool.title }]} />
          <div className="directory-eyebrow">{tool.meta}</div>
          <h1>
            {tool.titleParts[0]} <em>{tool.titleParts[1]}</em>
          </h1>
          <p>{tool.description}</p>
        </div>
      </section>

      <section className="fl-tool-section">
        <div className="container fl-tool-layout">
          <div className="fl-tool-main" id="tool">
            <FounderTool slug={tool.slug} />
          </div>
          <aside className="fl-tool-aside">
            <div className="fl-aside-block">
              <h2>{tool.explainer.heading}</h2>
              {tool.explainer.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <div className="fl-aside-block">
              <h3>What you get</h3>
              <ul className="fl-checks">
                {tool.outputs.map((output) => (
                  <li key={output}>{output}</li>
                ))}
              </ul>
            </div>
            {tool.sources.length ? (
            <div className="fl-aside-block fl-sources">
              <h3>Sources</h3>
              <ul>
                {tool.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} rel="noopener noreferrer" target="_blank">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            ) : null}
          </aside>
        </div>
      </section>
    </FoundersShell>
  );
}
