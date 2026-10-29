import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, FoundersShell } from "@/components/founders/chrome";
import { mountainWestSteps, mountainWestStates } from "@/lib/founders/mountain-west";
import { BOOKING_URL } from "@/lib/founders/registry";

const description =
  "Where Colorado and Utah founders register a business, find free counseling, university programs, accelerators, IP help and non-dilutive funding.";

export const metadata: Metadata = {
  title: "Starting a Business in the Mountain West",
  description,
  openGraph: { title: "Starting a Business in the Mountain West", description, url: "/founders/mountain-west", images: ["/logos/whiteford-white-on-navy-full.png"] },
};

export default function MountainWestPage() {
  return (
    <FoundersShell>
      <section className="directory-hero fl-tool-hero">
        <div className="container">
          <Breadcrumbs items={[{ href: "/founders", label: "Founder Library" }, { label: "Starting a business in the Mountain West" }]} />
          <div className="directory-eyebrow">Guide · Colorado · Utah · Wyoming · Idaho</div>
          <h1>
            Starting a business <em>in the Mountain West</em>
          </h1>
          <p>{description}</p>
        </div>
      </section>

      <section className="fl-tool-section">
        <div className="container fl-about">
          <div>
            <h2>The first five steps</h2>
            <div className="fl-mw-intro">
              {mountainWestSteps.map((step, index) => (
                <div className="fl-mw-step" key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>
                    {step.body}
                    {step.tool ? (
                      <>
                        {" "}
                        <Link href={step.tool.href}>{step.tool.label} &rarr;</Link>
                      </>
                    ) : null}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <nav className="fl-mw-state-nav" aria-label="States">
            {mountainWestStates.map((state) => (
              <a key={state.id} href={`#${state.id}`}>
                {state.name}
              </a>
            ))}
          </nav>

          {mountainWestStates.map((state) => (
            <article className="fl-mw-state" id={state.id} key={state.id}>
              <h2>{state.name}</h2>
              <p>{state.intro}</p>
              {state.groups.map((group) => (
                <div className="fl-mw-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul className="fl-mw-list">
                    {group.items.map((item) => (
                      <li key={item.url}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          {item.name}
                        </a>
                        <p>{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </article>
          ))}

          <div className="fl-about-contact">
            <div>
              <h2>Starting something?</h2>
              <p>
                We help founders across Colorado and the Mountain West choose the right structure, protect their IP and raise their
                first money. A short conversation early is usually the cheapest legal work you&apos;ll ever buy.
              </p>
            </div>
            <div className="fl-about-actions">
              <a className="learn-report-submit fl-button" href={BOOKING_URL}>
                Book a Free Consultation
              </a>
              <Link className="fl-button-secondary" href="/founders/entity-chooser">
                Try the Entity Chooser &rarr;
              </Link>
            </div>
          </div>

          <p className="fl-license">
            Listings are provided for information only and are not endorsements; Whiteford is not affiliated with these
            organizations unless stated. Programs, fees and eligibility change, so confirm details with each organization. Last
            reviewed October 2026. Attorney advertising.
          </p>
        </div>
      </section>
    </FoundersShell>
  );
}
