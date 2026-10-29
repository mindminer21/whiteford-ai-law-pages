"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
  const [mountNode, setMountNode] = useState<Element | null>(null);
  // Keep the same object across renders: React re-applies innerHTML whenever this object changes,
  // which would replace the report slot and drop the mounted form.
  const markup = useMemo(() => ({ __html: content.markup }), [content.markup]);
  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    setContainer(node);
  }, []);

  // Find the slot after mount, and again if the container's markup is ever replaced, so the form
  // is always portaled into the slot that is actually in the document.
  useEffect(() => {
    if (!container || !magnet) return;
    const find = () => {
      const slot = container.querySelector(`[data-learn-report-slot="${magnet.slug}"]`);
      setMountNode((current) => (current === slot ? current : slot));
    };
    find();
    const observer = new MutationObserver(find);
    observer.observe(container, { childList: true });
    return () => observer.disconnect();
  }, [container, magnet]);

  return (
    <>
      <div
        ref={setContainerRef}
        suppressHydrationWarning
        dangerouslySetInnerHTML={markup}
      />
      {magnet && mountNode && mountNode.isConnected ? createPortal(<LeadMagnetFlow config={magnet} />, mountNode) : null}
    </>
  );
}
