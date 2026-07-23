import type { Metadata } from "next";
import { LearnHtmlPage } from "@/components/learn-html-page";
import { routingMatrixContent } from "@/lib/learn/routing-matrix";
import { magnetConfigs } from "@/lib/magnets/finalization";

export const metadata: Metadata = {
  title: "The Routing Matrix",
  description: routingMatrixContent.description,
  openGraph: {
    title: "The Routing Matrix",
    description: routingMatrixContent.description,
    url: "/routing-matrix",
    images: ["/logos/whiteford-white-on-navy-full.png"],
  },
};

export default function Page() {
  return <LearnHtmlPage content={routingMatrixContent} magnet={magnetConfigs["routing-matrix"]} />;
}
