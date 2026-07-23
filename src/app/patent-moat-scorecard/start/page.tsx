import type { Metadata } from "next";
import { LeadMagnetStartPage } from "@/components/lead-magnet-start-page";
import { magnetConfigs } from "@/lib/magnets/finalization";

export const metadata: Metadata = {
  title: "Start Patent Moat Scorecard",
  description: "Run the Patent Moat Scorecard and receive a customized patent moat report.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LeadMagnetStartPage
      config={magnetConfigs["patent-moat-scorecard"]}
      backHref="/patent-moat-scorecard"
      backLabel="Back to Patent Moat Scorecard"
    />
  );
}
