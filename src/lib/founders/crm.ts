/**
 * HighLevel (LeadConnector) contact upsert for the Founder Library. Preview mode without keys.
 *
 * Tags are added with the contact tags endpoint after the upsert, so tags from earlier tools are
 * kept rather than replaced.
 */

const API = "https://services.leadconnectorhq.com";

export type CrmContact = {
  email: string;
  name: string;
  company: string;
  website?: string | null;
  tags: string[];
  customFields?: { key: string; field_value: unknown }[];
};

function splitName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return { firstName: parts[0] ?? "", lastName: parts.slice(1).join(" ") };
}

function headers(token: string) {
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json", Version: "2021-07-28" };
}

export async function upsertContact(contact: CrmContact) {
  const token = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const { firstName, lastName } = splitName(contact.name);
  const tags = Array.from(new Set(contact.tags));
  // Empty values are left out so a tag-only update never blanks an existing name or company.
  const payload = {
    locationId,
    ...(firstName ? { firstName } : {}),
    ...(lastName ? { lastName } : {}),
    email: contact.email,
    ...(contact.company ? { companyName: contact.company } : {}),
    ...(contact.website ? { website: contact.website } : {}),
    customFields: (contact.customFields ?? []).filter(
      (field) => field.field_value !== undefined && field.field_value !== null && field.field_value !== "",
    ),
  };

  if (!token || !locationId) return { mode: "preview" as const, payload: { ...payload, tags } };

  try {
    const response = await fetch(`${API}/contacts/upsert`, { method: "POST", headers: headers(token), body: JSON.stringify(payload) });
    if (!response.ok) {
      console.error("HighLevel founder upsert failed", { status: response.status, detail: (await response.text()).slice(0, 300) });
      return { mode: "failed" as const };
    }
    const data = (await response.json().catch(() => ({}))) as { contact?: { id?: string } };
    const contactId = data.contact?.id;
    if (contactId && tags.length) {
      const tagged = await fetch(`${API}/contacts/${encodeURIComponent(contactId)}/tags`, {
        method: "POST",
        headers: headers(token),
        body: JSON.stringify({ tags }),
      });
      if (!tagged.ok) console.error("HighLevel founder tags failed", { status: tagged.status });
    }
    return { mode: "live" as const, contactId };
  } catch (error) {
    console.error("HighLevel founder upsert failed", { detail: error instanceof Error ? error.message : error });
    return { mode: "failed" as const };
  }
}
