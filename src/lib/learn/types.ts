export type LearnPageContent = {
  title: string;
  description: string;
  style: string;
  markup: string;
};

export type LearnReportStatusOption = {
  label: string;
  detail: string;
  score: number;
  recommendedNextStep: string;
};

export type LearnReportConfig = {
  campaignKey: "ai-compliance" | "ai-patent";
  sourcePage: string;
  toolName: string;
  reportName: string;
  reportDescription: string;
  buttonLabel: string;
  statusLegend: string;
  statusOptions: LearnReportStatusOption[];
};
