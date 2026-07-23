import type { Metadata } from "next";
import { SearchMagnetFlow } from "@/components/search-magnet-flow";
import { getSearchMagnetConfig } from "@/lib/search-magnets/configs";

const slug = "trademark-brand-precheck";
const config = getSearchMagnetConfig(slug);

export const metadata: Metadata = {
  title: "Trademark & Brand Pre-Check",
  description:
    "Check brand-protection readiness before investing further in a name, launch, or rebrand.",
  openGraph: {
    title: "Trademark & Brand Pre-Check",
    description:
      "Check brand-protection readiness before investing further in a name, launch, or rebrand.",
    url: `/${slug}`,
    images: ["/logos/whiteford-white-on-navy-full.png"],
  },
};

export default function Page() {
  return <SearchMagnetFlow slug={slug} config={config} />;
}
