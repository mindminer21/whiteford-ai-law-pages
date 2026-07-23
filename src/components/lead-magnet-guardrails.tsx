type GuardrailNoticeProps = {
  title: string;
  body: string;
};

export const privacyGuardrailVersion = "lead-magnet-guardrail-v2";
export const publicFormInputType = "categorical_non_confidential";

export const sharedSourceCurrentNotice =
  "Public-source guidance may change. Confirm current law before acting.";

export const sharedConflictEngagementNotice =
  "No attorney-client relationship is created. Legal advice requires conflicts clearance and a written engagement.";

export const roleCategoryOptions = [
  "Founder / CEO",
  "Legal / compliance",
  "Product / engineering",
  "Operations / finance",
  "Investor / board",
  "Other / not sure",
];

export function GuardrailNotice({ title, body }: GuardrailNoticeProps) {
  return (
    <div className="mt-4 border border-[#d8d0c3] bg-white p-3 text-sm leading-6 text-[#354054]">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#683ab7]">
        {title}
      </div>
      <p className="mt-2">{body}</p>
    </div>
  );
}
