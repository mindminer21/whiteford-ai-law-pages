import type { Metadata } from "next";
import { LearnHtmlPage } from "@/components/learn-html-page";
import { saleReadinessAuditBeginContent } from "@/lib/learn/sale-readiness-audit";
import { magnetConfigs } from "@/lib/magnets/finalization";

export const metadata: Metadata = {
  title: "Start the Sale & Investor Readiness Audit",
  description: "Score the five areas buyers and investors diligence first.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LearnHtmlPage content={saleReadinessAuditBeginContent} magnet={magnetConfigs["sale-readiness-audit"]} />;
}
