import Image from "next/image";
import Link from "next/link";
import { LeadMagnetFlow } from "@/components/lead-magnet-flow";
import { complianceText, type MagnetConfig } from "@/lib/magnets/finalization";

type LeadMagnetStartPageProps = {
  config: MagnetConfig;
  backHref: string;
  backLabel: string;
};

export function LeadMagnetStartPage({
  config,
  backHref,
  backLabel,
}: LeadMagnetStartPageProps) {
  return (
    <main
      className={`learn-start-page ${config.kind === "download" ? "learn-start-page-download" : ""}`}
      aria-label={`${config.title} start`}
    >
      <header className="learn-start-brand" aria-label="Whiteford and Schell IP">
        <Link href="/" className="learn-start-lockup">
          <Image
            className="learn-start-logo-whiteford"
            src="/logos/whiteford-white-on-navy.png"
            alt="Whiteford Taylor Preston"
            width={900}
            height={270}
          />
          <span aria-hidden="true" />
          <Image
            className="learn-start-logo-schellip"
            src="/logos/schellip-white.png"
            alt="Schell IP"
            width={982}
            height={149}
          />
        </Link>
        <Link href={backHref} className="learn-start-back">
          {backLabel}
        </Link>
      </header>

      <section className="learn-start-shell">
        <div className="learn-start-form-frame">
          <LeadMagnetFlow config={config} />
        </div>
        <p className="learn-start-disclaimer">{complianceText}</p>
      </section>
    </main>
  );
}
