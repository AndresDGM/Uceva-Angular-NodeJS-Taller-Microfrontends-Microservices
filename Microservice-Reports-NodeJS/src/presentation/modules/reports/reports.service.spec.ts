import { GeneratedFile, Report, ReportRow } from '../../../domain/interfaces/report.interface';
import { ReportGenerator } from './report.generator';
import { ReportsDataProvider } from './reports.data-provider';
import { ReportsRepository } from './reports.repository';
import { ReportsService } from './reports.service';

const input = {
  name: 'Reporte de prueba',
  type: 'USERS_SUMMARY' as const,
  format: 'CSV' as const,
  filters: { count: 1 },
  requestedBy: '1',
};

const file: GeneratedFile = {
  content: Buffer.from('id,name\n1,Ana'),
  fileName: 'reporte.csv',
  contentType: 'text/csv',
};

class FakeProvider implements ReportsDataProvider {
  constructor(private readonly rows: ReportRow[] = [{ id: 1, name: 'Ana' }]) {}

  getData(): Promise<ReportRow[]> {
    return Promise.resolve(this.rows);
  }
}

class FakeGenerator extends ReportGenerator {
  override generate(): Promise<GeneratedFile> {
    return Promise.resolve(file);
  }
}

describe('ReportsService', () => {
  it('debería validar y solicitar reportes', () => {
    const service = new ReportsService(new ReportsRepository(), new FakeProvider(), new FakeGenerator());
    const report = service.requestReport(input);

    expect(report.status).toBe('PENDING');
    expect(() => service.requestReport(null as never)).toThrow('nombre');
    expect(() => service.requestReport({ ...input, name: '' })).toThrow('nombre');
    expect(() => service.requestReport({ ...input, name: 'x'.repeat(151) })).toThrow('150');
    expect(() => service.requestReport({ ...input, type: 'UNKNOWN' as never })).toThrow('tipo');
    expect(() => service.requestReport({ ...input, format: 'TXT' as never })).toThrow('formato');
    expect(() => service.requestReport({ ...input, requestedBy: '' })).toThrow('solicitante');
    expect(() => service.requestReport({ ...input, filters: null as never })).toThrow('filtros');
    expect(() => service.requestReport({ ...input, filters: [] as never })).toThrow('filtros');
  });

  it('debería completar, listar, descargar y eliminar reportes', async () => {
    const repository = new ReportsRepository();
    const service = new ReportsService(repository, new FakeProvider(), new FakeGenerator());
    const pending = repository.create(input);
    const completed = await service.processReport(pending.id);

    expect(completed.status).toBe('COMPLETED');
    expect(service.getFile(pending.id)).toEqual(file);
    expect(service.listReports({ status: 'COMPLETED' }).items).toHaveLength(1);
    expect(service.getReport(pending.id).fileUrl).toContain('/download');
    service.deleteReport(pending.id);
    expect(() => service.getReport(pending.id)).toThrow('no encontrado');
  });

  it('debería marcar como fallido un error de generación', async () => {
    const repository = new ReportsRepository();
    const provider: ReportsDataProvider = { getData: jest.fn().mockRejectedValue(new Error('servicio caído')) };
    const service = new ReportsService(repository, provider, new FakeGenerator());
    const pending = repository.create(input);
    const failed = await service.processReport(pending.id);

    expect(failed.status).toBe('FAILED');
    expect(failed.errorMessage).toBe('servicio caído');
    expect(() => service.getFile(pending.id)).toThrow('todavía no está disponible');
  });

  it('debería fallar el procesamiento de un reporte inexistente', async () => {
    const service = new ReportsService(new ReportsRepository(), new FakeProvider(), new FakeGenerator());

    await expect(service.processReport('missing')).rejects.toThrow('no encontrado');
  });

  it('debería rechazar paginación, filtros y reportes inexistentes', () => {
    const service = new ReportsService(new ReportsRepository(), new FakeProvider(), new FakeGenerator());

    expect(() => service.listReports({ page: 0 })).toThrow('paginación');
    expect(() => service.listReports({ limit: 101 })).toThrow('paginación');
    expect(() => service.listReports({ status: 'UNKNOWN' as never })).toThrow('estado');
    expect(() => service.listReports({ type: 'UNKNOWN' as never })).toThrow('tipo');
    expect(() => service.getReport('missing')).toThrow('no encontrado');
    expect(() => service.deleteReport('missing')).toThrow('no encontrado');
  });
});
