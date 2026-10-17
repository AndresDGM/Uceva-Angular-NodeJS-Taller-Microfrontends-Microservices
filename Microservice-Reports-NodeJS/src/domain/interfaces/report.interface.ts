export const REPORT_TYPES = ['USERS_SUMMARY', 'ACTIVITY', 'CUSTOM'] as const;
export const REPORT_STATUSES = ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'] as const;
export const REPORT_FORMATS = ['PDF', 'XLSX', 'CSV'] as const;

export type ReportType = (typeof REPORT_TYPES)[number];
export type ReportStatus = (typeof REPORT_STATUSES)[number];
export type ReportFormat = (typeof REPORT_FORMATS)[number];
export type ReportFilters = Record<string, string | number | boolean>;

export interface Report {
  id: string;
  name: string;
  type: ReportType;
  filters: ReportFilters;
  requestedBy: string;
  status: ReportStatus;
  format: ReportFormat;
  fileUrl: string | null;
  errorMessage: string | null;
  startedAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateReportInput {
  name: string;
  type: ReportType;
  filters: ReportFilters;
  requestedBy: string;
  format: ReportFormat;
}

export interface ReportQuery {
  status?: ReportStatus | undefined;
  type?: ReportType | undefined;
  page: number;
  limit: number;
}

export interface ReportRow {
  [key: string]: string | number;
}

export interface GeneratedFile {
  content: Buffer;
  fileName: string;
  contentType: string;
}
