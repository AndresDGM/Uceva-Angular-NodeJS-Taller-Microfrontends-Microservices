export const REPORT_TYPES = ['USERS_SUMMARY', 'ACTIVITY', 'CUSTOM'] as const;
export const REPORT_FORMATS = ['PDF', 'XLSX', 'CSV'] as const;
export const REPORT_STATUSES = ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'] as const;

export type ReportType = (typeof REPORT_TYPES)[number];
export type ReportFormat = (typeof REPORT_FORMATS)[number];
export type ReportStatus = (typeof REPORT_STATUSES)[number];

export interface ReportFilters {
  count?: number;
  from?: string;
  to?: string;
  [key: string]: string | number | undefined;
}

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
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReport {
  name: string;
  type: ReportType;
  format: ReportFormat;
  requestedBy: string;
  filters: ReportFilters;
}

export interface ReportsPage {
  items: Report[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}
