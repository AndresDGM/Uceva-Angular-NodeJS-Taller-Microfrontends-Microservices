import { AppRoutes } from './routes';

describe('AppRoutes', () => {
  it('debería registrar las rutas de reportes', () => {
    expect(AppRoutes.routes).toBeTruthy();
  });
});
