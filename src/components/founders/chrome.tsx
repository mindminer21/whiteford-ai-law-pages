import type { ReactNode } from "react";
import { BOOKING_URL } from "@/lib/founders/registry";

export function BrandBar() {
  return (
    <div className="brand-bar">
      <div className="container">
        <a className="brand-lockup" href="/founders" aria-label="Founder Library home">
          <img className="brand-logo-whiteford" src="/logos/whiteford-navy-on-light.png" alt="Whiteford Taylor Preston" width={886} height={205} />
          <span className="brand-divider" aria-hidden="true" />
          <img className="brand-logo-schellip" src="/logos/schellip-color.png" alt="Schell IP" width={982} height={149} />
        </a>
        <a className="brand-bar-cta" href={BOOKING_URL}>
          <span className="brand-bar-cta-lead">Book a</span>Free Consultation
        </a>
      </div>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav className="fl-breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={item.label}>
          {index > 0 ? <span aria-hidden="true"> / </span> : null}
          {item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="directory-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-lockup">
              <img className="footer-logo-whiteford" src="/logos/whiteford-white-on-navy.png" alt="Whiteford Taylor Preston" width={900} height={270} />
              <span className="footer-divider" aria-hidden="true" />
              <img className="footer-logo-schellip" src="/logos/schellip-white.png" alt="Schell IP" width={982} height={149} />
            </div>
            <p className="footer-disclaimer">
              The Founder Library is general information, not legal, tax or financial advice, and using it does not create an
              attorney-client relationship. Tool results are estimates based on what you enter and on general rules that change;
              confirm them with counsel before acting. Do not submit confidential, privileged or trade-secret information. Any
              engagement is subject to a conflicts check and a written engagement letter. Third-party forms linked here belong to
              their publishers and are offered under their own terms.
            </p>
          </div>
          <div>
            <p className="footer-meta">LEARN.SCHELLIP.COM/FOUNDERS</p>
            <p className="footer-meta">DENVER · MOUNTAIN WEST</p>
            <p>
              <a className="footer-meta" href="/founders/glossary">
                GLOSSARY
              </a>
            </p>
            <p>
              <a className="footer-meta" href="/founders/financing-documents">
                FINANCING DOCUMENTS
              </a>
            </p>
            <p>
              <a className="footer-meta" href="/">
                ALL LEGAL READINESS TOOLS
              </a>
            </p>
          </div>
        </div>
        <p className="footer-meta">© 2026 Whiteford, Taylor &amp; Preston LLP · All rights reserved · Attorney advertising</p>
      </div>
    </footer>
  );
}

export function FoundersShell({ children }: { children: ReactNode }) {
  return (
    <main className="learn-directory fl-page">
      <BrandBar />
      {children}
      <SiteFooter />
    </main>
  );
}
