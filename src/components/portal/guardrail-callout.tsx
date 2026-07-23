export const portalRequiredGuardrail = "This portal is for approved Whiteford/Schell IP client communication and matter coordination. Portal use does not create a new attorney-client relationship, expand an existing engagement, or confirm that a lawyer is available for a specific matter. Do not submit confidential or time-sensitive information unless your engagement and conflicts procedures authorize portal use for that matter. Portal messages are not an emergency channel.";

export function GuardrailCallout({
  title = "Approved-client prototype guardrails",
  children,
  variant = "warning",
}: {
  title?: string;
  children?: React.ReactNode;
  variant?: "info" | "warning" | "urgent";
}) {
  const classes = {
    info: "border-[#213f77] bg-[#eef3fb] text-[#121827]",
    warning: "border-[#b99057] bg-[#fff8e8] text-[#121827]",
    urgent: "border-[#9f1d1d] bg-[#fff1f1] text-[#121827]",
  }[variant];
  return (
    <aside className={`border-l-4 p-4 ${classes}`}>
      <div className="text-sm font-semibold uppercase tracking-[0.16em]">{title}</div>
      <p className="mt-2 text-sm leading-6">{portalRequiredGuardrail}</p>
      {children ? <div className="mt-3 text-sm leading-6">{children}</div> : null}
    </aside>
  );
}
