import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, IBM_Plex_Mono, Jost, Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-display",
  subsets: ["latin"],
  display: "optional",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "optional",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "optional",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-search-magnet-display",
  subsets: ["latin"],
  display: "optional",
});

const sourceSans = Source_Sans_3({
  variable: "--font-search-magnet-body",
  subsets: ["latin"],
  display: "optional",
});

export const metadata: Metadata = {
  title: {
    default: "Learn Schell IP",
    template: "%s | Learn Schell IP",
  },
  description:
    "Interactive AI, patent, and governance readiness resources from Schell IP and Whiteford.",
  metadataBase: new URL("https://learn.schellip.com"),
  openGraph: {
    title: "Learn Schell IP",
    description:
      "Interactive AI, patent, and governance readiness resources from Schell IP and Whiteford.",
    type: "website",
    images: ["/logos/whiteford-white-on-navy-full.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${dmSans.variable} ${plexMono.variable} ${playfairDisplay.variable} ${sourceSans.variable} antialiased`}
    >
      <head>
        <Script id="google-tag-manager" strategy="beforeInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MMPQNL5Q');
        `}</Script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MMPQNL5Q"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        <Script id="cal-embed" strategy="lazyOnload">{`
          (function () {
            var namespace = "meeting-with-jeff-schell";
            var calLink = "jeffschell/meeting-with-jeff-schell";
            var initialized = false;

            function loadCal(openModal) {
              if (!initialized) {
                initialized = true;
                (function (C, A, L) { var p = function (a, ar) { a.q.push(ar); }; var d = C.document; C.Cal = C.Cal || function () { var cal = C.Cal; var ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { var api = function () { p(api, arguments); }; var namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
                Cal("init", "meeting-with-jeff-schell", { origin: "https://app.cal.com" });
                Cal.ns[namespace]("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
              }

              if (openModal) {
                Cal.ns[namespace]("modal", { calLink: calLink });
              }
            }

            document.addEventListener("click", function (event) {
              var target = event.target;
              if (!target || !target.closest) return;
              var trigger = target.closest('[data-cal-link="' + calLink + '"]');
              if (!trigger) return;

              event.preventDefault();
              loadCal(true);
            });
          })();
        `}</Script>
      </body>
    </html>
  );
}
