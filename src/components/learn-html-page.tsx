import { LearnHtmlWithFlow } from "@/components/learn-html-with-flow";
import type { LearnPageContent } from "@/lib/learn/types";
import type { MagnetConfig } from "@/lib/magnets/finalization";

type LearnHtmlPageProps = {
  content: LearnPageContent;
  magnet?: MagnetConfig;
};

export function LearnHtmlPage({ content, magnet }: LearnHtmlPageProps) {
  return (
    <main aria-label={content.title}>
      <style dangerouslySetInnerHTML={{ __html: content.style }} />
      <LearnHtmlWithFlow content={content} magnet={magnet} />
    </main>
  );
}
