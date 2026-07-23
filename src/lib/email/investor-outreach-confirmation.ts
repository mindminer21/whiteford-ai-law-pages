type SendInvestorOutreachConfirmationEmailArgs = {
  to: string;
  name: string;
  confirmationUrl: string;
};

type EmailDeliveryResult =
  | { mode: "sent"; provider: "resend"; id: string | undefined }
  | { mode: "preview"; provider: "resend"; confirmationUrl: string }
  | { mode: "failed"; provider: "resend"; detail: string };

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function confirmationHtml({ name, confirmationUrl }: SendInvestorOutreachConfirmationEmailArgs) {
  const safeName = escapeHtml(name || "there");
  const safeUrl = escapeHtml(confirmationUrl);
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.55; color: #003756; max-width: 620px;">
      <p>Hi ${safeName},</p>
      <p>Please confirm your email address to continue building your customized investor outreach plan.</p>
      <p>
        <a href="${safeUrl}" style="background: #003756; color: #ffffff; display: inline-block; padding: 14px 18px; text-decoration: none;">
          Confirm my email
        </a>
      </p>
      <p>If the button does not work, copy and paste this link into your browser:</p>
      <p><a href="${safeUrl}">${safeUrl}</a></p>
      <p>This confirmation is sent by Learn Schell IP, not HighLevel. Your contact details are sent to HighLevel only after you confirm.</p>
    </div>
  `;
}

export async function sendInvestorOutreachConfirmationEmail(args: SendInvestorOutreachConfirmationEmailArgs): Promise<EmailDeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { mode: "preview", provider: "resend", confirmationUrl: args.confirmationUrl };
  }

  const from = process.env.INVESTOR_CONFIRMATION_FROM_EMAIL ?? "Learn Schell IP <noreply@learn.schellip.com>";
  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: args.to,
        subject: "Confirm your investor outreach plan",
        text: [
          `Hi ${args.name || "there"},`,
          "",
          "Please confirm your email address to continue building your customized investor outreach plan.",
          args.confirmationUrl,
          "",
          "This confirmation is sent by Learn Schell IP, not HighLevel. Your contact details are sent to HighLevel only after you confirm.",
        ].join("\n"),
        html: confirmationHtml(args),
      }),
    });
  } catch (error) {
    return {
      mode: "failed",
      provider: "resend",
      detail: error instanceof Error ? error.message : "Resend request failed.",
    };
  }

  const data = (await response.json().catch(() => null)) as { id?: string; message?: string } | null;
  if (!response.ok) {
    return { mode: "failed", provider: "resend", detail: data?.message ?? `Resend returned HTTP ${response.status}` };
  }

  return { mode: "sent", provider: "resend", id: data?.id };
}
