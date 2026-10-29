/**
 * Shared types for the Founder Library tools at learn.schellip.com/founders.
 *
 * Every tool is declarative: a list of pages of fields (rendered in the browser, validated on the
 * server from the same spec) plus a pure compute() that turns validated values into a report.
 * The server always recomputes the report, so nothing the browser sends is trusted.
 */

export type StageKey = "start" | "protect" | "team" | "raise" | "board" | "sell";

export type Option = { value: string; label: string; hint?: string };

/** Show a field only when another field on the same level has one of these values. */
export type ShowIf = { field: string; in: string[] };

type FieldBase = {
  id: string;
  label: string;
  help?: string;
  showIf?: ShowIf;
};

export type NumberField = FieldBase & {
  kind: "number";
  min: number;
  max: number;
  step?: number;
  unit?: "usd" | "percent" | "shares" | "months" | "years" | "people" | "days";
  default?: number;
  optional?: boolean;
};

export type ChoiceField = FieldBase & {
  kind: "choice";
  options: Option[];
  default?: string;
  display?: "radio" | "select";
};

export type MultiField = FieldBase & {
  kind: "multi";
  options: Option[];
  default?: string[];
};

export type DateField = FieldBase & {
  kind: "date";
  /** "today" fills in the visitor's current date. */
  default?: "today";
};

export type TextField = FieldBase & {
  kind: "text";
  maxLength: number;
  placeholder?: string;
  optional?: boolean;
  default?: string;
};

export type RowField = NumberField | ChoiceField | TextField | DateField;

export type RowsField = FieldBase & {
  kind: "rows";
  min: number;
  max: number;
  addLabel: string;
  itemLabel: string;
  fields: RowField[];
  defaultRows: Record<string, string | number>[];
};

export type Field = NumberField | ChoiceField | MultiField | DateField | TextField | RowsField;

export type FieldPage = { title: string; intro?: string; fields: Field[] };

export type RowValue = Record<string, string | number>;
export type FieldValue = string | number | string[] | RowValue[];
export type Values = Record<string, FieldValue>;

export type ReportMetric = { label: string; value: string; note?: string };
export type ReportTable = { title: string; columns: string[]; rows: string[][]; note?: string };
export type ReportSection = { title: string; items: string[]; tone?: "flag" | "ok" | "info" };

export type ToolReport = {
  /** One sentence the whole report hangs on. */
  headline: string;
  summary: string;
  metrics: ReportMetric[];
  tables: ReportTable[];
  sections: ReportSection[];
  nextSteps: string[];
  /** CRM tags describing what this result says about the company, e.g. "raising:now". */
  signals: string[];
};

export type ToolSpec = {
  slug: string;
  title: string;
  /** Title with one emphasized phrase for headings: [before, emphasized]. */
  titleParts: [string, string];
  stage: StageKey;
  meta: string;
  description: string;
  /** Plain-English explainer shown above the tool (original content). */
  explainer: { heading: string; paragraphs: string[] };
  /** Points shown under "What you get". */
  outputs: string[];
  pages: FieldPage[];
  compute: (values: Values) => ToolReport;
  /** Short phrase used in follow-up emails, e.g. "your SAFE round". */
  followUpTopic: string;
  /** Three tool-specific follow-up angles, used at day 2, day 9 and day 30. */
  followUpAngles: [string, string, string];
  /** Slugs of tools to suggest next. */
  related: string[];
  /** Public sources the tool's rules come from. */
  sources: { label: string; url: string }[];
};
