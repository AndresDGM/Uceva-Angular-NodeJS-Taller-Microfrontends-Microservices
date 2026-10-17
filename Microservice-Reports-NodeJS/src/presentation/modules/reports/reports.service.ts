import {
  CreateReportInput,
  REPORT_FORMATS,
  REPORT_STATUSES,
  REPORT_TYPES,
  Report,
  ReportFormat,
  ReportQuery,
  ReportStatus,
  ReportType,
} from '../../../domain/interfaces/report.interface';
import { CustomError } from '../../../domain/errors/custom.error';
import { ReportGenerator } from './report.generator';
import { ReportsDataProvider, HttpReportsDataProvider } from './reports.data-provider';
import { ReportsRepository, StoredReport } from './reports.repository';

export interface PublicReportPage {
  items: Report[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export class ReportsService {
  constructor(
    private readonly repository = new ReportsRepository(),
    private readonly dataProvider: ReportsDataProvider = new HttpReportsDataProvider(),
    private readonly generator = new ReportGenerator(),
  ) {}

  requestReport(input: CreateReportInput): Report {
    const report = this.repository.create(this.validateInput(input));
    queueMicrotask(() => void this.processReport(report.id));
    return this.toPublicReport(report);
  }

  async processReport(id: string): Promise<Report> {
    const report = this.requireReport(id);
    this.repository.update(id, { status: 'PROCESSING', startedAt: new Date(), errorMessage: null });

    try {
      const rows = await this.dataProvider.getData(report.type, report.filters);
      const file = await this.generator.generate(report, rows);
      const completed = this.repository.update(id, {
        status: 'COMPLETED',
        completedAt: new Date(),
        fileUrl: `/api/reports/${id}/download`,
        generatedFile: file,
        errorMessage: null,
      });

      return this.toPublicReport(completed ?? report);
    } catch (error) {
      const failed = this.repository.update(id, {
        status: 'FAILED',
        completedAt: new Date(),
        errorMessage: error instanceof Error ? error.message : 'No fue posible generar el reporte.',
      });

      return this.toPublicReport(failed ?? report);
    }
  }

  listReports(query: Partial<ReportQuery> = {}): PublicReportPage {
    const normalizedQuery = this.normalizeQuery(query);
    const page = this.repository.findAll(normalizedQuery);

    return {
      ...page,
      items: page.items.map((report) => this.toPublicReport(report)),
      pages: Math.ceil(page.total / page.limit),
    };
  }

  getReport(id: string): Report {
    return this.toPublicReport(this.requireReport(id));
  }

  getFile(id: string): { content: Buffer; fileName: string; contentType: string } {
    const report = this.requireReport(id);

    if (report.status !== 'COMPLETED' || !report.generatedFile) {
      throw CustomError.badRequest('El reporte todavía no está disponible para descargar.');
    }

    return report.generatedFile;
  }

  deleteReport(id: string): void {
    this.requireReport(id);
    this.repository.delete(id);
  }

  private validateInput(input: CreateReportInput): CreateReportInput {
    if (!input || typeof input.name !== 'string' || !input.name.trim()) {
      throw CustomError.badRequest('El nombre del reporte es obligatorio.');
    }

    if (input.name.trim().length > 150) {
      throw CustomError.badRequest('El nombre del reporte no puede superar 150 caracteres.');
    }

    if (!REPORT_TYPES.includes(input.type)) {
      throw CustomError.badRequest('El tipo de reporte no es válido.');
    }

    if (!REPORT_FORMATS.includes(input.format)) {
      throw CustomError.badRequest('El formato de reporte no es válido.');
    }

    if (typeof input.requestedBy !== 'string' || !input.requestedBy.trim()) {
      throw CustomError.badRequest('El usuario solicitante es obligatorio.');
    }

    if (!input.filters || typeof input.filters !== 'object' || Array.isArray(input.filters)) {
      throw CustomError.badRequest('Los filtros deben ser un objeto.');
    }

    return { ...input, name: input.name.trim() };
  }

  private normalizeQuery(query: Partial<ReportQuery>): ReportQuery {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);

    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 100) {
      throw CustomError.badRequest('La paginación debe usar page >= 1 y limit entre 1 y 100.');
    }

    if (query.status && !REPORT_STATUSES.includes(query.status)) {
      throw CustomError.badRequest('El estado de reporte no es válido.');
    }

    if (query.type && !REPORT_TYPES.includes(query.type)) {
      throw CustomError.badRequest('El tipo de reporte no es válido.');
    }

    return {
      page,
      limit,
      ...(query.status ? { status: query.status } : {}),
      ...(query.type ? { type: query.type } : {}),
    };
  }

  private requireReport(id: string): StoredReport {
    const report = this.repository.findById(id);

    if (!report) {
      throw CustomError.notFound('Reporte no encontrado.');
    }

    return report;
  }

  private toPublicReport(report: StoredReport): Report {
    const { generatedFile: _generatedFile, ...publicReport } = report;
    return publicReport;
  }
}
