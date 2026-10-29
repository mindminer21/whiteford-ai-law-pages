import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, FoundersShell } from "@/components/founders/chrome";
import { BOOKING_URL } from "@/lib/founders/registry";

const description =
  "Whiteford | Schell IP is Whiteford, Taylor & Preston's Denver practice for founders and growth companies: patents and IP strategy, AI counsel, outside general counsel, financings and sell-side M&A.";

export const metadata: Metadata = {
  title: "About Whiteford | Schell IP",
  description,
  openGraph: { title: "About Whiteford | Schell IP", description, url: "/founders/about", images: ["/logos/whiteford-white-on-navy-full.png"] },
};

const services = [
  {
    title: "Patents & IP strategy",
    body: "Patent applications and portfolio strategy, trademark clearance and filings, IP ownership cleanup, and licensing, built around how the company will raise money or sell.",
  },
  {
    title: "AI counsel",
    body: "AI governance, data rights, model and output ownership, and the contract terms that come with building on or selling AI products.",
  },
  {
    title: "Outside general counsel",
    body: "Day-to-day legal support for startups and growth companies: formation, equity, commercial contracts, employment questions and board matters.",
  },
  {
    title: "Financings",
    body: "SAFEs, convertible notes and priced rounds for companies, from the first term sheet through closing and the securities filings that follow.",
  },
  {
    title: "Sell-side M&A",
    body: "Preparing companies for a sale, running diligence and negotiating the deal, with IP and technology issues handled by the same team.",
  },
];


export default function AboutPage() {
  return (
    <FoundersShell>
      <section className="directory-hero fl-tool-hero">
        <div className="container">
          <Breadcrumbs items={[{ href: "/founders", label: "Founder Library" }, { label: "About" }]} />
          <div className="directory-eyebrow">About</div>
          <h1>
            Whiteford <span className="fl-about-pipe">|</span> <em>Schell IP</em>
          </h1>
          <p>
            A Denver practice for founders and growth companies, combining patent and technology work with the corporate,
            financing and M&amp;A support of a full-service national firm.
          </p>
        </div>
      </section>

      <section className="fl-tool-section">
        <div className="container fl-about">
          <div className="fl-about-grid">
            <div className="fl-about-copy">
              <h2>Who we are</h2>
              <p>
                Whiteford | Schell IP is the Denver office of Whiteford, Taylor &amp; Preston LLP. Jeff Schell founded Schell IP in
                Denver as an AI-native, patent-focused practice for technology startups and growth-stage companies. In May 2026 he
                joined Whiteford to open and lead the firm&apos;s Denver office.
              </p>
              <p>
                Whiteford was founded in 1933 and is a full-service firm with a national footprint, providing business law and
                litigation services to clients from start-ups to Fortune 100 companies.
              </p>
              <p>
                For founders, that combination means one team can handle the patent strategy, the financing documents and, later,
                the sale, with the firm&apos;s litigation, transactional and outside general counsel capabilities behind it when a
                matter needs them.
              </p>
            </div>

            <aside className="fl-about-person">
              <img src="/logos/jeff-schell.jpg" alt="Jeffrey R. Schell" width={160} height={160} />
              <h3>Jeffrey R. Schell</h3>
              <p className="fl-about-title">Managing Partner, Mountain West</p>
              <ul>
                <li>Patent attorney and founder of Schell IP</li>
                <li>Founded and exited two patent-driven medtech companies</li>
                <li>Venture Partner, Erez Capital</li>
                <li>Former President, TiE Denver</li>
                <li>Lecturer at the University of Colorado; mentor at Techstars and Boomtown</li>
              </ul>
              <p className="fl-about-edu">
                J.D., DePaul University College of Law · M.S., Medical Informatics, and B.E., Industrial Engineering &amp;
                Management, Northwestern University · Admitted in Colorado and Michigan and before the U.S. Patent and Trademark
                Office
              </p>
              <a className="fl-about-bio" href="https://www.whitefordlaw.com/professionals/jeffrey-r-schell" target="_blank" rel="noopener noreferrer">
                Full bio on whitefordlaw.com &rarr;
              </a>
            </aside>
          </div>

          <div className="fl-about-services">
            <h2>What we do for founders</h2>
            <div className="fl-about-service-grid">
              {services.map((service) => (
                <div className="fl-about-service" key={service.title}>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="fl-about-why">
            <h2>Why we built the Founder Library</h2>
            <p>
              Most early legal questions have a practical answer that founders can work out themselves if the rules are explained
              plainly: what a SAFE stack really costs, when an 83(b) is due, whether a Colorado non-compete holds up. The library
              puts those answers in tools you can use for free. When a question goes beyond what a tool can answer, we&apos;re glad
              to talk it through.
            </p>
          </div>

          <div className="fl-about-contact">
            <div>
              <h2>Talk with us</h2>
              <p>
                Whiteford, Taylor &amp; Preston LLP
                <br />
                2128 W. 32nd Ave., Suite 200
                <br />
                Denver, CO 80211
              </p>
            </div>
            <div className="fl-about-actions">
              <a className="learn-report-submit fl-button" href={BOOKING_URL}>
                Book a Free Consultation
              </a>
              <Link className="fl-button-secondary" href="/founders/mountain-west">
                Starting a business in the Mountain West &rarr;
              </Link>
            </div>
          </div>

          <p className="fl-license">
            Attorney advertising. Prior results do not guarantee a similar outcome. Contacting us or using the Founder Library does
            not create an attorney-client relationship; any engagement is subject to a conflicts check and a written engagement
            letter.
          </p>
        </div>
      </section>
    </FoundersShell>
  );
}
