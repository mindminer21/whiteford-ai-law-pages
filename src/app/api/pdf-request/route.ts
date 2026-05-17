const outsideCounselMagnet = "outside-counsel-playbook";
const outsideCounselCampaignTag = "campaign-4-patent-forward-ogc";
const outsideCounselPdfPath = "/pdfs/outside-counsel-playbook.pdf";

type PdfRequestPayload = {
  email?: unknown;
  magnet?: unknown;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function getPublicPdfUrl(request: Request) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
  return new URL(outsideCounselPdfPath, siteUrl).toString();
}

export async function POST(request: Request) {
  let payload: PdfRequestPayload;

  try {
    payload = (await request.json()) as PdfRequestPayload;
  } catch {
    return Response.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";

  if (payload.magnet !== outsideCounselMagnet) {
    return Response.json({ error: "Unsupported PDF magnet" }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return Response.json({ error: "A valid email is required" }, { status: 400 });
  }

  const pdfUrl = getPublicPdfUrl(request);
  const conceptWebhookUrl = process.env.CONCEPT_WEBHOOK_URL;
  const conceptApiKey = process.env.CONCEPT_API_KEY;
  const conceptPayload = {
    email,
    tags: [outsideCounselCampaignTag, outsideCounselMagnet],
    custom_fields: {
      magnet: outsideCounselMagnet,
      pdf_url: pdfUrl,
      source_page: "/outside-counsel-playbook",
      source_type: "single_step_pdf_request",
      supabase_write_status: "deferred_until_backend_milestone",
    },
  };

  if (!conceptWebhookUrl) {
    return Response.json({
      ok: true,
      mode: "preview",
      pdf_url: pdfUrl,
      concept: "skipped_missing_CONCEPT_WEBHOOK_URL",
      supabase: "deferred",
    });
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (conceptApiKey) {
    headers.Authorization = `Bearer ${conceptApiKey}`;
  }

  try {
    const response = await fetch(conceptWebhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(conceptPayload),
    });

    if (!response.ok) {
      const detail = await response.text();
      return Response.json(
        { error: "Concept webhook failed", detail },
        { status: 502 },
      );
    }
  } catch (error) {
    return Response.json(
      {
        error: "Concept webhook failed",
        detail: error instanceof Error ? error.message : "Unknown network error",
      },
      { status: 502 },
    );
  }

  return Response.json({
    ok: true,
    mode: "live",
    pdf_url: pdfUrl,
    concept: "sent",
    supabase: "deferred",
  });
}
