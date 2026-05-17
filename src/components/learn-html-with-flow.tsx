"use client";

import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { LeadMagnetFlow } from "@/components/lead-magnet-flow";
import type { LearnPageContent } from "@/lib/learn/types";
import type { MagnetConfig } from "@/lib/magnets/finalization";

export function LearnHtmlWithFlow({
  content,
  magnet,
}: {
  content: LearnPageContent;
  magnet?: MagnetConfig;
}) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    setContainer(node);
  }, []);
  const mountNode = magnet
    ? container?.querySelector(`[data-learn-report-slot="${magnet.slug}"]`) ?? null
    : null;

  return (
    <>
      <div
        ref={setContainerRef}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: content.markup }}
      />
      {magnet && mountNode ? createPortal(<LeadMagnetFlow config={magnet} />, mountNode) : null}
    </>
  );
}
