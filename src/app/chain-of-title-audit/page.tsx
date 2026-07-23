import type { Metadata } from "next";
import { LearnHtmlPage } from "@/components/learn-html-page";
import { chainOfTitleAuditContent } from "@/lib/learn/chain-of-title-audit";
import { magnetConfigs } from "@/lib/magnets/finalization";

export const metadata: Metadata = {
  title: "The Chain-of-Title Audit",
  description: chainOfTitleAuditContent.description,
  openGraph: {
    title: "The Chain-of-Title Audit",
    description: chainOfTitleAuditContent.description,
    url: "/chain-of-title-audit",
    images: ["/logos/whiteford-white-on-navy-full.png"],
  },
};

export default function Page() {
  return <LearnHtmlPage content={chainOfTitleAuditContent} magnet={magnetConfigs["chain-of-title-audit"]} />;
}
