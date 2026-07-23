import type { Metadata } from "next";
import { DocumentUploadPanel } from "@/components/portal/document-upload-panel";
import { PortalShell } from "@/components/portal/portal-shell";

export const metadata: Metadata = { title: "Portal Document Upload Prototype" };

export default function UploadPage() {
  return <PortalShell title="Simulated document upload"><DocumentUploadPanel /></PortalShell>;
}
