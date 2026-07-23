import type { Metadata } from "next";
import { LeadMagnetStartPage } from "@/components/lead-magnet-start-page";
import { magnetConfigs } from "@/lib/magnets/finalization";

export const metadata: Metadata = {
  title: "Request Outside Counsel Playbook",
  description: "Request the patent-forward outside counsel playbook for technology companies.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LeadMagnetStartPage
      config={magnetConfigs["outside-counsel-playbook"]}
      backHref="/outside-counsel-playbook"
      backLabel="Back to Outside Counsel Playbook"
    />
  );
}
