import type { Metadata } from "next";
import { SearchMagnetFlow } from "@/components/search-magnet-flow";
import { getSearchMagnetConfig } from "@/lib/search-magnets/configs";

const slug = "patent-readiness";
const config = getSearchMagnetConfig(slug);

export const metadata: Metadata = {
  title: "Patent Readiness Check",
  description:
    "Run a 5-minute patent-readiness check before a disclosure, demo, sale, or filing decision.",
  openGraph: {
    title: "Patent Readiness Check",
    description:
      "Run a 5-minute patent-readiness check before a disclosure, demo, sale, or filing decision.",
    url: `/${slug}`,
    images: ["/logos/whiteford-white-on-navy-full.png"],
  },
};

export default function Page() {
  return <SearchMagnetFlow slug={slug} config={config} />;
}
