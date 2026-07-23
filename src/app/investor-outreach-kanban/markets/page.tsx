import type { Metadata } from "next";
import { InvestorOutreachKanban } from "@/components/investor-outreach-kanban";

export const metadata: Metadata = {
  title: "Investor Outreach Markets",
  description: "Select relationship markets for the investor outreach plan.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main className="learn-directory investor-outreach-page investor-flow-page">
      <InvestorOutreachKanban view="markets" />
    </main>
  );
}
