import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

const calNamespace = "talk-to-a-patent-lawyer-meeting-with-jeff-schell-learn.schellip.com";
const calElementId = "my-cal-inline-talk-to-a-patent-lawyer-meeting-with-jeff-schell-learn-schellip-com";
const calLink = "jeffschell/talk-to-a-patent-lawyer-meeting-with-jeff-schell-learn.schellip.com";

export const metadata: Metadata = {
  title: "Talk to a Patent Lawyer",
  description:
    "Schedule a patent-law consultation with Jeff Schell through Learn Schell IP.",
  openGraph: {
    title: "Talk to a Patent Lawyer",
    description:
      "Schedule a patent-law consultation with Jeff Schell through Learn Schell IP.",
    url: "/calendar",
    images: ["/logos/whiteford-white-on-navy-full.png"],
  },
};

export default function CalendarPage() {
  return (
    <main className="calendar-page">
      <header className="calendar-topbar">
        <Link href="/" aria-label="Learn Schell IP home" className="calendar-brand">
          <Image
            src="/logos/whiteford-white-on-navy-full.png"
            alt="Whiteford | Schell IP"
            width={560}
            height={111}
            priority
          />
        </Link>
        <span>learn.schellip.com</span>
      </header>

      <section className="calendar-shell" aria-labelledby="calendar-heading">
        <div className="calendar-intro">
          <div className="calendar-kicker">Patent Analysis Consultation</div>
          <h1 id="calendar-heading">Talk to a patent lawyer.</h1>
          <p>
            Pick a time for a focused conversation with Jeff Schell about patent
            positioning, invention timing, AI/product risk, or investor-readiness
            questions.
          </p>
        </div>
        <div className="calendar-embed-card">
          <div
            id={calElementId}
            className="calendar-inline-embed"
            aria-label="Cal.com scheduling calendar"
          />
        </div>
      </section>

      <Script id="cal-inline-talk-to-a-patent-lawyer" strategy="afterInteractive">{`
        (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
        Cal("init", "${calNamespace}", {origin:"https://app.cal.com"});

        Cal.ns["${calNamespace}"]("inline", {
          elementOrSelector:"#${calElementId}",
          config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"},
          calLink: "${calLink}",
        });

        Cal.ns["${calNamespace}"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
      `}</Script>
    </main>
  );
}
