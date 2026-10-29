import type { Field, FieldPage, FieldValue, RowField, RowValue, ShowIf, Values } from "./types";

/** Today's date as YYYY-MM-DD in the visitor's local time. */
export function todayIso(now = new Date()) {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function defaultFor(field: Field | RowField): FieldValue {
  switch (field.kind) {
    case "number":
      return field.default ?? (field.optional ? "" : field.min);
    case "choice":
      return field.default ?? "";
    case "multi":
      return field.default ?? [];
    case "date":
      return field.default === "today" ? todayIso() : "";
    case "text":
      return field.default ?? "";
    case "rows":
      return field.defaultRows.map((row) => ({ ...row }));
  }
}

export function initialValues(pages: FieldPage[]): Values {
  const values: Values = {};
  for (const page of pages) for (const field of page.fields) values[field.id] = defaultFor(field);
  return values;
}

export function isVisible(showIf: ShowIf | undefined, scope: Record<string, unknown>) {
  if (!showIf) return true;
  const current = scope[showIf.field];
  return typeof current === "string" && showIf.in.includes(current);
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function validDate(value: string) {
  if (!DATE_RE.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  const year = date.getUTCFullYear();
  return !Number.isNaN(date.getTime()) && year >= 1990 && year <= 2100;
}

function checkScalar(field: RowField, raw: unknown, where: string): { value: FieldValue } | { error: string } {
  switch (field.kind) {
    case "number": {
      if ((raw === "" || raw === undefined || raw === null) && field.optional) return { value: "" };
      const n = typeof raw === "number" ? raw : typeof raw === "string" && raw.trim() !== "" ? Number(raw) : NaN;
      if (!Number.isFinite(n)) return { error: `${where}: enter a number.` };
      if (n < field.min || n > field.max) return { error: `${where}: enter a value from ${field.min.toLocaleString("en-US")} to ${field.max.toLocaleString("en-US")}.` };
      return { value: n };
    }
    case "choice": {
      if (typeof raw !== "string" || !field.options.some((option) => option.value === raw)) {
        return { error: `${where}: choose one of the options.` };
      }
      return { value: raw };
    }
    case "date": {
      if (typeof raw !== "string" || !validDate(raw)) return { error: `${where}: enter a valid date.` };
      return { value: raw };
    }
    case "text": {
      const text = typeof raw === "string" ? raw.trim() : "";
      if (!text && field.optional) return { value: "" };
      if (!text) return { error: `${where}: required.` };
      if (text.length > field.maxLength || /[<>\r\n]/.test(text)) {
        return { error: `${where}: keep it under ${field.maxLength} characters, plain text only.` };
      }
      return { value: text };
    }
  }
}

/**
 * Validates raw values against the tool's pages. Hidden fields (showIf not met) are dropped.
 * Returns clean values or the first error. Used by the server for every submission.
 */
export function validateValues(pages: FieldPage[], raw: unknown): { values: Values } | { error: string } {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return { error: "Answers are missing." };
  const input = raw as Record<string, unknown>;
  const fields = pages.flatMap((page) => page.fields);
  const known = new Set(fields.map((field) => field.id));
  if (Object.keys(input).some((key) => !known.has(key))) return { error: "Answers include an unknown field." };

  const values: Values = {};
  for (const field of fields) {
    if (!isVisible(field.showIf, input)) continue;
    const rawValue = input[field.id];
    if (field.kind === "multi") {
      if (!Array.isArray(rawValue) || rawValue.length > field.options.length) return { error: `${field.label}: invalid selection.` };
      const allowed = new Set(field.options.map((option) => option.value));
      if (!rawValue.every((item) => typeof item === "string" && allowed.has(item))) {
        return { error: `${field.label}: invalid selection.` };
      }
      values[field.id] = Array.from(new Set(rawValue as string[]));
      continue;
    }
    if (field.kind === "rows") {
      if (!Array.isArray(rawValue) || rawValue.length < field.min || rawValue.length > field.max) {
        return { error: `${field.label}: add between ${field.min} and ${field.max} ${field.itemLabel.toLowerCase()}s.` };
      }
      const rows: RowValue[] = [];
      for (const [index, rawRow] of rawValue.entries()) {
        if (typeof rawRow !== "object" || rawRow === null || Array.isArray(rawRow)) return { error: `${field.label}: invalid row.` };
        const rowInput = rawRow as Record<string, unknown>;
        const rowKnown = new Set(field.fields.map((sub) => sub.id));
        if (Object.keys(rowInput).some((key) => !rowKnown.has(key))) return { error: `${field.label}: invalid row.` };
        const row: RowValue = {};
        for (const sub of field.fields) {
          if (!isVisible(sub.showIf, rowInput)) continue;
          const checked = checkScalar(sub, rowInput[sub.id], `${field.itemLabel} ${index + 1}, ${sub.label}`);
          if ("error" in checked) return checked;
          row[sub.id] = checked.value as string | number;
        }
        rows.push(row);
      }
      values[field.id] = rows;
      continue;
    }
    const checked = checkScalar(field, rawValue, field.label);
    if ("error" in checked) return checked;
    values[field.id] = checked.value;
  }
  return { values };
}

/** Validates one page for the browser's Next button. */
export function validatePage(page: FieldPage, values: Values): string | null {
  const subset: Record<string, unknown> = {};
  for (const field of page.fields) subset[field.id] = values[field.id];
  const result = validateValues([page], { ...subset });
  return "error" in result ? result.error : null;
}

// Typed readers for compute() functions. Values are already validated.
export function num(values: Values | RowValue, id: string, fallback = 0): number {
  const value = values[id];
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

export function str(values: Values | RowValue, id: string, fallback = ""): string {
  const value = values[id];
  return typeof value === "string" ? value : fallback;
}

export function list(values: Values, id: string): string[] {
  const value = values[id];
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? (value as string[]) : [];
}

export function rows(values: Values, id: string): RowValue[] {
  const value = values[id];
  return Array.isArray(value) && value.every((item) => typeof item === "object" && item !== null)
    ? (value as RowValue[])
    : [];
}
