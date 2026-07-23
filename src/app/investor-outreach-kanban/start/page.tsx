import type { Metadata } from "next";
import { InvestorOutreachKanban } from "@/components/investor-outreach-kanban";

export const metadata: Metadata = {
  title: "Investor Outreach Contact Capture",
  description:
    "Capture contact details before sending the investor outreach confirmation link.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main className="learn-directory investor-outreach-page investor-flow-page">
      <InvestorOutreachKanban view="contact" />
    </main>
  );
}
