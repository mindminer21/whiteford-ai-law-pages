import type { Metadata } from "next";
import { LearnHtmlPage } from "@/components/learn-html-page";
import { governancePlanContent } from "@/lib/learn/governance-plan";

export const metadata: Metadata = {
  title: "AI Governance Readiness Plan",
  description: governancePlanContent.description,
  openGraph: {
    title: "AI Governance Readiness Plan",
    description: governancePlanContent.description,
    url: "/governance-plan",
    images: ["/logos/whiteford-white-on-navy-full.png"],
  },
};

export default function Page() {
  return <LearnHtmlPage content={governancePlanContent} />;
}
