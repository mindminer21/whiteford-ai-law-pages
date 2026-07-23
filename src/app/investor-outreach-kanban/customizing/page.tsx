import type { Metadata } from "next";
import { InvestorOutreachKanban } from "@/components/investor-outreach-kanban";

export const metadata: Metadata = {
  title: "Customizing Investor List",
  description: "Customizing and populating the investor outreach board.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main className="learn-directory investor-outreach-page investor-flow-page">
      <InvestorOutreachKanban view="customizing" />
    </main>
  );
}
