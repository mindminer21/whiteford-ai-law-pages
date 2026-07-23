import type { Metadata } from "next";
import { LeadMagnetStartPage } from "@/components/lead-magnet-start-page";
import { magnetConfigs } from "@/lib/magnets/finalization";

export const metadata: Metadata = {
  title: "Start AI Governance Plan",
  description: "Build a customized AI governance readiness plan.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LeadMagnetStartPage
      config={magnetConfigs["governance-plan"]}
      backHref="/governance-plan"
      backLabel="Back to AI Governance Plan"
    />
  );
}
