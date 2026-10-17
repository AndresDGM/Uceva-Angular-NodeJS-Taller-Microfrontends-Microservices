import { Report } from '../../../domain/interfaces/report.interface';
import { ReportGenerator } from './report.generator';

const report = (format: Report['format']): Report => ({
  id: 'report-id',
  name: 'Resumen de usuarios',
  type: 'USERS_SUMMARY',
  filters: {},
  requestedBy: '1',
  status: 'PROCESSING',
  format,
  fileUrl: null,
  errorMessage: null,
  startedAt: new Date(),
  completedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const rows = [
  { id: 1, name: 'Ana', age: 22 },
  { id: 2, name: 'Luis', age: 25 },
];

describe('ReportGenerator', () => {
  const generator = new ReportGenerator();

  it('debería generar un CSV', async () => {
    const file = await generator.generate(report('CSV'), rows);

    expect(file.fileName).toBe('resumen-de-usuarios.csv');
    expect(file.contentType).toBe('text/csv');
    expect(file.content.toString()).toContain('id,name,age');
  });

  it('debería generar un XLSX', async () => {
    const file = await generator.generate(report('XLSX'), rows);

    expect(file.fileName).toBe('resumen-de-usuarios.xlsx');
    expect(file.contentType).toContain('spreadsheetml');
    expect(file.content.length).toBeGreaterThan(0);
  });

  it('debería generar un PDF', async () => {
    const file = await generator.generate(report('PDF'), rows);

    expect(file.fileName).toBe('resumen-de-usuarios.pdf');
    expect(file.contentType).toBe('application/pdf');
    expect(file.content.subarray(0, 4).toString()).toBe('%PDF');
  });

  it('debería usar un nombre predeterminado para reportes sin nombre válido', async () => {
    const unnamed = { ...report('CSV'), name: '---' };
    const file = await generator.generate(unnamed, []);

    expect(file.fileName).toBe('report.csv');
  });
});
