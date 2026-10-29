import type { Metadata } from "next";
import { LearnHtmlPage } from "@/components/learn-html-page";
import { saleReadinessAuditContent } from "@/lib/learn/sale-readiness-audit";

export const metadata: Metadata = {
  title: "Sale & Investor Readiness Audit",
  description: saleReadinessAuditContent.description,
  openGraph: {
    title: "Sale & Investor Readiness Audit",
    description: saleReadinessAuditContent.description,
    url: "/sale-readiness-audit",
    images: ["/logos/whiteford-white-on-navy-full.png"],
  },
};

export default function Page() {
  return <LearnHtmlPage content={saleReadinessAuditContent} />;
}
