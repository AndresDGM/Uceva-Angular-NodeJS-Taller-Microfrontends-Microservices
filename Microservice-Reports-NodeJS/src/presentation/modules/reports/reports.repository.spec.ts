import { CreateReportInput } from '../../../domain/interfaces/report.interface';
import { ReportsRepository } from './reports.repository';

const input: CreateReportInput = {
  name: 'Usuarios',
  type: 'USERS_SUMMARY',
  format: 'CSV',
  filters: { count: 2 },
  requestedBy: '1',
};

describe('ReportsRepository', () => {
  it('debería crear y consultar reportes', () => {
    const repository = new ReportsRepository();
    const report = repository.create(input);

    expect(report.id).toEqual(expect.any(String));
    expect(repository.findById(report.id)).toBe(report);
    expect(repository.findAll({ page: 1, limit: 10 }).items).toHaveLength(1);
  });

  it('debería filtrar y paginar reportes', () => {
    const repository = new ReportsRepository();
    repository.create(input);
    repository.create({ ...input, type: 'ACTIVITY', name: 'Actividad' });

    expect(repository.findAll({ page: 1, limit: 1, type: 'ACTIVITY' }).items).toHaveLength(1);
    expect(repository.findAll({ page: 2, limit: 1 }).items).toHaveLength(1);
  });

  it('debería actualizar y eliminar reportes', () => {
    const repository = new ReportsRepository();
    const report = repository.create(input);

    expect(repository.update(report.id, { status: 'COMPLETED' })?.status).toBe('COMPLETED');
    expect(repository.update('missing', { status: 'FAILED' })).toBeUndefined();
    expect(repository.delete(report.id)).toBe(true);
    expect(repository.delete(report.id)).toBe(false);
  });
});
