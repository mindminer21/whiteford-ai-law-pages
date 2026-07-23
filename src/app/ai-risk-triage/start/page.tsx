import type { Metadata } from "next";
import { LeadMagnetStartPage } from "@/components/lead-magnet-start-page";
import { magnetConfigs } from "@/lib/magnets/finalization";

export const metadata: Metadata = {
  title: "Start AI Legal Risk Triage",
  description: "Run the AI Legal Risk Triage and receive a customized AI legal risk profile.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LeadMagnetStartPage
      config={magnetConfigs["ai-risk-triage"]}
      backHref="/ai-risk-triage"
      backLabel="Back to AI Legal Risk Triage"
    />
  );
}
