import type { Metadata } from "next";
import { AttorneyTagGuide } from "@/components/portal/attorney-tag-guide";
import { PortalShell } from "@/components/portal/portal-shell";

export const metadata: Metadata = { title: "Attorney Tag Guide" };

export default function AttorneysPage() {
  return <PortalShell title="Draft attorney tag guide"><AttorneyTagGuide /></PortalShell>;
}
