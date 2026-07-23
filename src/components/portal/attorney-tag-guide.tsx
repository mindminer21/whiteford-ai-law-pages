import { portalAttorneys } from "@/lib/portal/attorneys";

export function AttorneyTagGuide() {
  return (
    <div className="space-y-4">
      <section className="border border-[#b99057] bg-[#fffaf0] p-4 text-sm leading-6 text-[#354054]">
        <h2 className="text-base font-semibold text-[#121827]">Internal draft roster caveat</h2>
        <p className="mt-2">
          Attorney names and practice signals on this page are internal draft seed data for request-only routing prototypes. They must be reconciled with current Whiteford availability, conflicts, engagement scope, attorney approval, and Jeff&apos;s HighLevel/referral-list before any production, client-facing, or broader demo use.
        </p>
      </section>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {portalAttorneys.map((attorney) => (
          <article key={attorney.id} className="border border-[#d8d0c3] bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-[#121827]">{attorney.displayName}</h3>
                <div className="mt-1 text-sm font-semibold text-[#213f77]">{attorney.hashtag}</div>
              </div>
              <span className="border border-[#b99057] px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-[#7a5728]">request-only</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#354054]">{attorney.roleSummary}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {attorney.practiceTags.slice(0, 4).map((tag) => <span key={tag} className="bg-[#f7f5ef] px-2 py-1 text-[11px] text-[#354054]">{tag}</span>)}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
