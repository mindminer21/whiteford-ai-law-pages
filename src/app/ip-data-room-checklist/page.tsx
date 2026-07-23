import type { Metadata } from "next";
import { LearnHtmlPage } from "@/components/learn-html-page";
import { ipDataRoomChecklistContent } from "@/lib/learn/ip-data-room-checklist";
import { magnetConfigs } from "@/lib/magnets/finalization";

export const metadata: Metadata = {
  title: "The IP Data Room Checklist",
  description: ipDataRoomChecklistContent.description,
  openGraph: {
    title: "The IP Data Room Checklist",
    description: ipDataRoomChecklistContent.description,
    url: "/ip-data-room-checklist",
    images: ["/logos/whiteford-white-on-navy-full.png"],
  },
};

export default function Page() {
  return <LearnHtmlPage content={ipDataRoomChecklistContent} magnet={magnetConfigs["ip-data-room-checklist"]} />;
}
