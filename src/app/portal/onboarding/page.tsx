import type { Metadata } from "next";
import { OnboardingAssistant } from "@/components/portal/onboarding-assistant";
import { PortalShell } from "@/components/portal/portal-shell";

export const metadata: Metadata = { title: "Portal Onboarding Prototype" };

export default function OnboardingPage() {
  return <PortalShell title="AI-agent-assisted onboarding prototype"><OnboardingAssistant /></PortalShell>;
}
