import type { LearnPageContent } from "@/lib/learn/types";

type LearnHtmlPageProps = {
  content: LearnPageContent;
};

export function LearnHtmlPage({ content }: LearnHtmlPageProps) {
  return (
    <main aria-label={content.title}>
      <style dangerouslySetInnerHTML={{ __html: content.style }} />
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: content.markup }} />
    </main>
  );
}
