import type { Metadata } from "next";
import { PortalShell } from "@/components/portal/portal-shell";
import { SchedulingRequestForm } from "@/components/portal/scheduling-request-form";

export const metadata: Metadata = { title: "New Meeting Request" };

export default function NewSchedulePage() {
  return <PortalShell title="Request discussion time"><SchedulingRequestForm /></PortalShell>;
}
