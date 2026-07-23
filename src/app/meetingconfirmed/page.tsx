import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Meeting Confirmed",
  description:
    "Booking confirmed for your Learn Schell IP patent-law consultation.",
  openGraph: {
    title: "Meeting Confirmed",
    description:
      "Booking confirmed for your Learn Schell IP patent-law consultation.",
    url: "/meetingconfirmed",
    images: ["/logos/whiteford-white-on-navy-full.png"],
  },
};

export default function MeetingConfirmedPage() {
  return (
    <main className="meeting-confirmed-page">
      <section className="meeting-confirmed-card" aria-labelledby="meeting-confirmed-heading">
        <Link href="/" aria-label="Learn Schell IP home" className="meeting-confirmed-logo">
          <Image
            src="/logos/whiteford-white-on-navy-full.png"
            alt="Whiteford | Schell IP"
            width={560}
            height={111}
            priority
          />
        </Link>
        <div className="meeting-confirmed-kicker">Booking Confirmed</div>
        <h1 id="meeting-confirmed-heading">This meeting is scheduled.</h1>
        <p>
          A calendar invitation with the meeting details has been sent. I look
          forward to speaking with you.
        </p>
        <div className="meeting-confirmed-actions">
          <Link href="/" className="meeting-confirmed-button">
            Return to Learn Schell IP
          </Link>
          <Link href="/calendar" className="meeting-confirmed-link">
            Schedule another time
          </Link>
        </div>
      </section>
      <Script id="meeting-confirmed-conversion" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "meeting_confirmed",
          conversion_page: "/meetingconfirmed",
          conversion_name: "cal_booking_confirmed"
        });
      `}</Script>
    </main>
  );
}
