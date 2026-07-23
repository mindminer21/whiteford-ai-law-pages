import {
  complianceText,
  type AssessmentMagnetConfig,
  type AssessmentResult,
} from "./finalization";

export type ReportContact = {
  name: string;
  email: string;
  title: string;
  company: string;
};

export type PdfReportAsset = {
  filename: string;
  content_type: "application/pdf";
  base64: string;
};

const pageWidth = 612;
const pageHeight = 792;
const marginX = 54;
const bottomMargin = 64;
const topY = 738;

type TextOptions = {
  font?: "regular" | "bold" | "italic";
  size?: number;
  leading?: number;
  color?: [number, number, number];
};

type PdfPage = {
  commands: string[];
  y: number;
};

function escapePdfText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function sanitizeText(value: string) {
  return value.replace(/[\r\n<>]/g, " ").replace(/\s+/g, " ").trim();
}

function slugify(value: string) {
  return sanitizeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72) || "company";
}

function fontName(font: TextOptions["font"]) {
  if (font === "bold") return "F2";
  if (font === "italic") return "F3";
  return "F1";
}

function wrapText(text: string, maxChars: number) {
  const words = sanitizeText(text).split(" ").filter(Boolean);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }

  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function newPage(): PdfPage {
  return { commands: [], y: topY };
}

function ensureSpace(pages: PdfPage[], needed: number) {
  let page = pages[pages.length - 1];
  if (!page || page.y - needed < bottomMargin) {
    page = newPage();
    pages.push(page);
  }
  return page;
}

function addText(pages: PdfPage[], text: string, options: TextOptions = {}) {
  const size = options.size ?? 10;
  const leading = options.leading ?? Math.ceil(size * 1.45);
  const maxChars = Math.max(24, Math.floor((pageWidth - marginX * 2) / (size * 0.5)));
  const lines = wrapText(text, maxChars);
  const page = ensureSpace(pages, lines.length * leading);
  const font = fontName(options.font);
  const [r, g, b] = options.color ?? [0, 55, 86];

  for (const line of lines) {
    page.commands.push(`${r} ${g} ${b} rg BT /${font} ${size} Tf ${marginX} ${page.y} Td (${escapePdfText(line)}) Tj ET`);
    page.y -= leading;
  }
}

function addSpacer(pages: PdfPage[], amount: number) {
  const page = ensureSpace(pages, amount);
  page.y -= amount;
}

function addRule(pages: PdfPage[]) {
  const page = ensureSpace(pages, 18);
  page.commands.push(`0.74 0.78 0.81 RG 0.5 w ${marginX} ${page.y} m ${pageWidth - marginX} ${page.y} l S`);
  page.y -= 18;
}

function buildPdf(pages: PdfPage[]) {
  const objects: string[] = [];
  const addObject = (body: string) => {
    objects.push(body);
    return objects.length;
  };

  const catalogId = addObject("<< /Type /Catalog /Pages 2 0 R >>");
  const pagesPlaceholderId = addObject("");
  const fontRegularId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const fontBoldId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  const fontItalicId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>");
  const pageIds: number[] = [];

  for (const page of pages) {
    const stream = page.commands.join("\n");
    const contentId = addObject(`<< /Length ${Buffer.byteLength(stream, "utf8")} >>\nstream\n${stream}\nendstream`);
    const pageId = addObject(
      `<< /Type /Page /Parent ${pagesPlaceholderId} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R /F3 ${fontItalicId} 0 R >> >> /Contents ${contentId} 0 R >>`,
    );
    pageIds.push(pageId);
  }

  objects[pagesPlaceholderId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((body, index) => {
    offsets.push(Buffer.byteLength(pdf, "utf8"));
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xrefOffset = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets.slice(1)) {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return Buffer.from(pdf, "utf8");
}

function resultStatus(config: AssessmentMagnetConfig, result: AssessmentResult, areaKey: string) {
  const area = config.areas.find((item) => item.key === areaKey);
  const score = result.sub_scores[areaKey] ?? 0;
  if (!area) return `${score}`;
  if (config.slug === "governance-plan") {
    return score === 3 ? "Structure" : score === 2 ? "Draft" : "Gap";
  }
  return `${score} / ${area.maxScore}`;
}

export function generateAssessmentReportPdf({
  config,
  result,
  contact,
  completedAt,
}: {
  config: AssessmentMagnetConfig;
  result: AssessmentResult;
  contact: ReportContact;
  completedAt: string;
}): PdfReportAsset {
  const pages = [newPage()];
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(completedAt));

  addText(pages, "WHITEFORD | SCHELL IP", {
    font: "bold",
    size: 10,
    color: [0.388, 0.176, 0.867],
  });
  addSpacer(pages, 10);
  addText(pages, `${config.title} Customized Report`, { font: "bold", size: 24, leading: 30 });
  addText(pages, `Prepared for ${sanitizeText(contact.company)}`, { font: "italic", size: 14, leading: 20 });
  addSpacer(pages, 4);
  addText(
    pages,
    `Contact: ${sanitizeText(contact.name)}, ${sanitizeText(contact.title)} | ${sanitizeText(contact.email)}`,
    { size: 10, color: [0.082, 0.306, 0.451] },
  );
  addText(pages, `Generated: ${dateLabel}`, { size: 10, color: [0.082, 0.306, 0.451] });
  addRule(pages);

  addText(pages, `Result: ${result.score} / ${result.score_max} - ${result.tier.label}`, {
    font: "bold",
    size: 16,
    leading: 22,
  });
  addText(pages, result.tier.headline, { size: 11, leading: 16, color: [0.082, 0.306, 0.451] });
  if (result.mode) {
    addText(pages, `Framing mode: ${result.mode === "investor" ? "Investor" : "Founder"}`, {
      size: 10,
      color: [0.082, 0.306, 0.451],
    });
  }
  addSpacer(pages, 8);

  addText(pages, "Applied Results", { font: "bold", size: 14, leading: 20 });
  for (const area of config.areas) {
    addText(pages, `${area.label}: ${resultStatus(config, result, area.key)}`, {
      font: "bold",
      size: 10,
      leading: 15,
    });
    addText(pages, area.action, { size: 9, leading: 13, color: [0.082, 0.306, 0.451] });
  }

  addSpacer(pages, 8);
  addText(pages, "Prioritized Next Moves", { font: "bold", size: 14, leading: 20 });
  result.actions.forEach((action, index) => {
    addText(pages, `${index + 1}. ${action}`, { size: 10, leading: 15 });
  });

  addSpacer(pages, 10);
  addRule(pages);
  addText(pages, "Compliance Note", { font: "bold", size: 11, leading: 15 });
  addText(pages, complianceText, { size: 8, leading: 12, color: [0.082, 0.306, 0.451] });

  return {
    filename: `${slugify(contact.company)}-${config.slug}-report.pdf`,
    content_type: "application/pdf",
    base64: buildPdf(pages).toString("base64"),
  };
}
