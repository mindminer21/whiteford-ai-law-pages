import type { Metadata } from "next";
import { InvestorOutreachKanban } from "@/components/investor-outreach-kanban";

export const metadata: Metadata = {
  title: "Confirm Investor Outreach Email",
  description: "Confirm your email before building the investor outreach plan.",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams?: Promise<{
    email?: string | string[];
    token?: string | string[];
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const emailParam = Array.isArray(params?.email) ? params?.email[0] : params?.email;
  const tokenParam = Array.isArray(params?.token) ? params?.token[0] : params?.token;

  return (
    <main className="learn-directory investor-outreach-page investor-flow-page">
      <InvestorOutreachKanban view="confirm" confirmedEmail={emailParam} confirmationToken={tokenParam} />
    </main>
  );
}
