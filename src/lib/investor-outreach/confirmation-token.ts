import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

export type InvestorConfirmationContact = {
  name: string;
  email: string;
  company: string;
  role: string;
  sourcePage?: string;
  sourceChannel?: string;
};

type ConfirmationTokenPayload = {
  contact: InvestorConfirmationContact;
  expiresAt: string;
  issuedAt: string;
  purpose: "investor-outreach-confirmation";
};

const tokenVersion = "v1";
const tokenTtlMs = 7 * 24 * 60 * 60 * 1000;

function base64UrlEncode(value: Buffer) {
  return value.toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url");
}

function confirmationSecret() {
  return (
    process.env.INVESTOR_CONFIRMATION_SECRET ??
    process.env.GHL_PRIVATE_INTEGRATION_TOKEN ??
    "local-investor-confirmation-development-secret"
  );
}

function encryptionKey() {
  return createHash("sha256").update(confirmationSecret()).digest();
}

export function buildInvestorConfirmationUrl(contact: InvestorConfirmationContact) {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://learn.schellip.com").replace(/\/$/, "");
  const token = createInvestorConfirmationToken(contact);
  return `${siteUrl}/investor-outreach-kanban/confirm?token=${encodeURIComponent(token)}`;
}

export function createInvestorConfirmationToken(contact: InvestorConfirmationContact) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const payload: ConfirmationTokenPayload = {
    contact,
    issuedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + tokenTtlMs).toISOString(),
    purpose: "investor-outreach-confirmation",
  };
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(payload), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [tokenVersion, base64UrlEncode(iv), base64UrlEncode(tag), base64UrlEncode(encrypted)].join(".");
}

export function readInvestorConfirmationToken(token: string): InvestorConfirmationContact {
  const [version, encodedIv, encodedTag, encodedEncrypted] = token.split(".");
  if (version !== tokenVersion || !encodedIv || !encodedTag || !encodedEncrypted) {
    throw new Error("The confirmation link is invalid.");
  }

  const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), base64UrlDecode(encodedIv));
  decipher.setAuthTag(base64UrlDecode(encodedTag));
  const decrypted = Buffer.concat([decipher.update(base64UrlDecode(encodedEncrypted)), decipher.final()]);
  const payload = JSON.parse(decrypted.toString("utf8")) as ConfirmationTokenPayload;

  if (payload.purpose !== "investor-outreach-confirmation") {
    throw new Error("The confirmation link is invalid.");
  }
  if (new Date(payload.expiresAt).getTime() < Date.now()) {
    throw new Error("The confirmation link has expired. Please start again.");
  }
  if (!payload.contact?.name || !payload.contact?.email || !payload.contact?.company || !payload.contact?.role) {
    throw new Error("The confirmation link is missing contact details.");
  }

  return payload.contact;
}
