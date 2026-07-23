import type { Metadata } from "next";
import { PortalShell } from "@/components/portal/portal-shell";
import { PortalDashboard } from "@/components/portal/portal-dashboard";

export const metadata: Metadata = { title: "Portal Dashboard" };

export default function PortalPage() {
  return <PortalShell title="Client portal dashboard"><PortalDashboard /></PortalShell>;
}
