import type { Metadata } from "next";
import { LearnHtmlPage } from "@/components/learn-html-page";
import { patentMoatScorecardContent } from "@/lib/learn/patent-moat-scorecard";
import { magnetConfigs } from "@/lib/magnets/finalization";

export const metadata: Metadata = {
  title: "Patent Moat Scorecard",
  description: patentMoatScorecardContent.description,
  openGraph: {
    title: "Patent Moat Scorecard",
    description: patentMoatScorecardContent.description,
    url: "/patent-moat-scorecard",
    images: ["/logos/whiteford-white-on-navy-full.png"],
  },
};

export default function Page() {
  return <LearnHtmlPage content={patentMoatScorecardContent} magnet={magnetConfigs["patent-moat-scorecard"]} />;
}
