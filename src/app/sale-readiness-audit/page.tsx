import type { Metadata } from "next";
import { SearchMagnetFlow } from "@/components/search-magnet-flow";
import { getSearchMagnetConfig } from "@/lib/search-magnets/configs";

const slug = "sale-readiness-audit";
const config = getSearchMagnetConfig(slug);

export const metadata: Metadata = {
  title: "Sale & Investor Readiness Audit",
  description:
    "Map diligence friction before a sale, investor round, or strategic transaction starts moving.",
  openGraph: {
    title: "Sale & Investor Readiness Audit",
    description:
      "Map diligence friction before a sale, investor round, or strategic transaction starts moving.",
    url: `/${slug}`,
    images: ["/logos/whiteford-white-on-navy-full.png"],
  },
};

export default function Page() {
  return <SearchMagnetFlow slug={slug} config={config} />;
}
