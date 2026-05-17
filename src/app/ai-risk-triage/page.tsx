import type { Metadata } from "next";
import { LearnHtmlPage } from "@/components/learn-html-page";
import { aiRiskTriageContent } from "@/lib/learn/ai-risk-triage";
import { magnetConfigs } from "@/lib/magnets/finalization";

export const metadata: Metadata = {
  title: "AI Legal Risk Triage",
  description: aiRiskTriageContent.description,
  openGraph: {
    title: "AI Legal Risk Triage",
    description: aiRiskTriageContent.description,
    url: "/ai-risk-triage",
    images: ["/logos/whiteford-white-on-navy-full.png"],
  },
};

export default function Page() {
  return <LearnHtmlPage content={aiRiskTriageContent} magnet={magnetConfigs["ai-risk-triage"]} />;
}
