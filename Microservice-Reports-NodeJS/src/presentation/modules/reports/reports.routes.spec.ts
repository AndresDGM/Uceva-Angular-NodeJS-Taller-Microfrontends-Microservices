import { ReportsRoutes } from './reports.routes';

describe('ReportsRoutes', () => {
  it('debería construir el router de reportes', () => {
    expect(ReportsRoutes.routes).toBeTruthy();
  });
});
