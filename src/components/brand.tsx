import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import { navLinks } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#d8d0c3]/80 bg-[#fffdf8]/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3 sm:gap-4" aria-label="Home">
          <span className="flex items-center gap-2">
            <Image
              src="/brand/schellip-wordmark.png"
              alt="Schell IP"
              width={96}
              height={17}
              className="h-auto w-20 object-contain sm:w-24"
              priority
            />
            <span className="h-8 w-px bg-[#d8d0c3]" aria-hidden="true" />
            <Image
              src="/brand/whiteford-logo.png"
              alt="Whiteford"
              width={40}
              height={40}
              className="h-9 w-9 object-contain sm:h-10 sm:w-10"
              priority
            />
          </span>
          <div className="hidden leading-tight sm:block">
            <div className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#213f77]">
              Schell IP + Whiteford
            </div>
            <div className="text-[12px] text-[#5d6678]">
              Mountain West AI law
            </div>
          </div>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-[#354054] lg:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[#213f77]">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/ai-compliance-gameplan"
          className="hidden h-10 items-center gap-2 border border-[#121827] bg-[#121827] px-4 text-sm font-semibold text-white transition hover:bg-[#213f77] md:flex"
        >
          Start assessment
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <Link
          href="/ai-compliance-gameplan"
          className="flex h-10 w-10 items-center justify-center border border-[#d8d0c3] text-[#121827] md:hidden"
          aria-label="Open assessment"
        >
          <Menu size={18} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[#d8d0c3] bg-[#121827] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b99057]">
            Whiteford Mountain West
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#d8dde8]">
            Public educational material only. No attorney-client relationship is
            formed by using these pages, submitting a form, or receiving an
            automated report. Do not submit confidential information through the
            assessment or landing-page forms.
          </p>
        </div>
        <div className="text-sm leading-6 text-[#d8dde8] lg:text-right">
          <p>Jeffrey Schell, patent lawyer</p>
          <p>Schell IP trust bridge, Whiteford institutional bench</p>
          <p className="mt-3 text-[#b99057]">
            Whiteford logo asset added for design preview.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function WhitefordMark() {
  return (
    <div className="inline-flex items-center gap-4 border-l-4 border-[#b99057] pl-4">
      <Image
        src="/brand/whiteford-logo.png"
        alt="Whiteford"
        width={58}
        height={58}
        className="h-14 w-14 object-contain shadow-[0_10px_30px_rgba(0,65,90,0.18)]"
        priority
      />
      <div>
        <div className="text-xl font-semibold tracking-[0.08em] text-[#121827]">
          Whiteford
        </div>
        <div className="text-xs uppercase tracking-[0.22em] text-[#6b7280]">
          Mountain West
        </div>
      </div>
    </div>
  );
}
