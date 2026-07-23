import type { Metadata } from "next";
import { SearchMagnetFlow } from "@/components/search-magnet-flow";
import { getSearchMagnetConfig } from "@/lib/search-magnets/configs";

const slug = "colorado-non-compete-checker";
const config = getSearchMagnetConfig(slug);

export const metadata: Metadata = {
  title: "Colorado Non-Compete Checker",
  description:
    "Run a 5-minute Colorado restrictive-covenant exposure check from Whiteford and Schell IP.",
  openGraph: {
    title: "Colorado Non-Compete Checker",
    description:
      "Run a 5-minute Colorado restrictive-covenant exposure check from Whiteford and Schell IP.",
    url: `/${slug}`,
    images: ["/logos/whiteford-white-on-navy-full.png"],
  },
};

export default function Page() {
  return <SearchMagnetFlow slug={slug} config={config} />;
}
