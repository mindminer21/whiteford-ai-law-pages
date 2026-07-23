"use client";

import { useMemo, useState } from "react";
import { portalIssueTags } from "@/lib/portal/tags";
import type { PortalIssueTagSlug } from "@/lib/portal/types";
import { suggestAttorneysForIssueTags } from "@/lib/portal/routing";

export function TagSelector({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState<PortalIssueTagSlug[]>(["#monthly-gc-call"]);
  const suggested = useMemo(() => suggestAttorneysForIssueTags(selected), [selected]);
  function toggle(slug: PortalIssueTagSlug) {
    setSelected((current) => current.includes(slug) ? current.filter((tag) => tag !== slug) : [...current, slug]);
  }
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {portalIssueTags.map((tag) => (
          <button
            key={tag.slug}
            type="button"
            onClick={() => toggle(tag.slug)}
            className={selected.includes(tag.slug) ? "border border-[#213f77] bg-[#213f77] px-3 py-2 text-xs font-semibold text-white" : "border border-[#d8d0c3] bg-white px-3 py-2 text-xs font-semibold text-[#354054] hover:border-[#213f77]"}
          >
            {tag.slug}
          </button>
        ))}
      </div>
      {!compact ? (
        <div className="border border-[#d8d0c3] bg-[#fffdf8] p-4">
          <div className="text-sm font-semibold text-[#121827]">Suggested lawyer routing metadata</div>
          <p className="mt-2 text-xs leading-5 text-[#5d6678]">Tagging a lawyer requests routing; it does not guarantee review, assignment, availability, or representation. No notification is sent in Phase 0.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {suggested.map((attorney) => <span key={attorney.id} className="border border-[#d8d0c3] bg-white px-3 py-1 text-xs text-[#121827]">{attorney.hashtag}</span>)}
          </div>
        </div>
      ) : null}
    </div>
  );
}
