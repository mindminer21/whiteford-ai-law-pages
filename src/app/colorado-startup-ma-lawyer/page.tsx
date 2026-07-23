import type { Metadata } from "next";
import { OfferLandingPage } from "@/components/landing";
import { offers } from "@/lib/site";

const offer = offers.find((item) => item.slug === "colorado-startup-ma-lawyer")!;

export const metadata: Metadata = {
  title: offer.metaTitle,
  description: offer.description,
};

export default function Page() {
  return <OfferLandingPage offer={offer} />;
}
