import { randomUUID } from 'node:crypto';
import {
  CreateReportInput,
  GeneratedFile,
  Report,
  ReportQuery,
} from '../../../domain/interfaces/report.interface';

export type StoredReport = Report & { generatedFile: GeneratedFile | null };

export interface ReportPage {
  items: StoredReport[];
  total: number;
  page: number;
  limit: number;
}

export class ReportsRepository {
  private readonly reports = new Map<string, StoredReport>();

  create(input: CreateReportInput): StoredReport {
    const now = new Date();
    const report: StoredReport = {
      id: randomUUID(),
      ...input,
      status: 'PENDING',
      fileUrl: null,
      errorMessage: null,
      startedAt: null,
      completedAt: null,
      createdAt: now,
      updatedAt: now,
      generatedFile: null,
    };

    this.reports.set(report.id, report);
    return report;
  }

  findById(id: string): StoredReport | undefined {
    return this.reports.get(id);
  }

  findAll(query: ReportQuery): ReportPage {
    const filtered = [...this.reports.values()]
      .filter((report) => !query.status || report.status === query.status)
      .filter((report) => !query.type || report.type === query.type)
      .sort((first, second) => second.createdAt.getTime() - first.createdAt.getTime());
    const start = (query.page - 1) * query.limit;

    return {
      items: filtered.slice(start, start + query.limit),
      total: filtered.length,
      page: query.page,
      limit: query.limit,
    };
  }

  update(
    id: string,
    changes: Partial<Omit<StoredReport, 'id' | 'createdAt'>>,
  ): StoredReport | undefined {
    const report = this.reports.get(id);

    if (!report) {
      return undefined;
    }

    Object.assign(report, changes, { updatedAt: new Date() });
    return report;
  }

  delete(id: string): boolean {
    return this.reports.delete(id);
  }
}
