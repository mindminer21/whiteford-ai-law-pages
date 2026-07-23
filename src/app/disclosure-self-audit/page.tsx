import type { Metadata } from "next";
import { LearnHtmlPage } from "@/components/learn-html-page";
import { disclosureSelfAuditContent } from "@/lib/learn/disclosure-self-audit";
import { magnetConfigs } from "@/lib/magnets/finalization";

export const metadata: Metadata = {
  title: "The Disclosure Self-Audit",
  description: disclosureSelfAuditContent.description,
  openGraph: {
    title: "The Disclosure Self-Audit",
    description: disclosureSelfAuditContent.description,
    url: "/disclosure-self-audit",
    images: ["/logos/whiteford-white-on-navy-full.png"],
  },
};

export default function Page() {
  return <LearnHtmlPage content={disclosureSelfAuditContent} magnet={magnetConfigs["disclosure-self-audit"]} />;
}
