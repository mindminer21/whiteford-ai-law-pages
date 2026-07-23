import type { Metadata } from "next";
import { ConversationComposer } from "@/components/portal/conversation-composer";
import { PortalShell } from "@/components/portal/portal-shell";

export const metadata: Metadata = { title: "New Portal Message" };

export default function NewMessagePage() {
  return <PortalShell title="New tagged legal question"><ConversationComposer /></PortalShell>;
}
