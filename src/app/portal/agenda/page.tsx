import type { Metadata } from "next";
import { MonthlyAgendaBoard } from "@/components/portal/monthly-agenda-board";
import { PortalShell } from "@/components/portal/portal-shell";

export const metadata: Metadata = { title: "Monthly Legal Operating Plan" };

export default function AgendaPage() {
  return <PortalShell title="Monthly legal operating plan"><MonthlyAgendaBoard /></PortalShell>;
}
