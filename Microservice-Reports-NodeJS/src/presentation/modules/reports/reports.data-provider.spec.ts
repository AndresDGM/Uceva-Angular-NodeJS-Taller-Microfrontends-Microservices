import { HttpReportsDataProvider } from './reports.data-provider';

describe('HttpReportsDataProvider', () => {
  const provider = new HttpReportsDataProvider();
  let fetchSpy: jest.SpyInstance;

  beforeEach(() => {
    fetchSpy = jest.spyOn(global, 'fetch');
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it('debería consumir Users para un resumen de usuarios', async () => {
    fetchSpy.mockResolvedValue(new Response(JSON.stringify([{ id: 1, name: 'Ana', lastName: 'Gómez', age: 22, email: 'ana@test.com', engineering: 'Sistemas' }]), { status: 200 }));

    await expect(provider.getData('USERS_SUMMARY', { count: 2 })).resolves.toEqual([
      { id: 1, name: 'Ana Gómez', age: 22, email: 'ana@test.com', category: 'Sistemas' },
    ]);
    expect(fetchSpy).toHaveBeenCalledWith('http://localhost:3001/api/users/2');
  });

  it('debería consumir Products para actividad', async () => {
    fetchSpy.mockResolvedValue(new Response(JSON.stringify([{ id: 1, name: 'Libro', category: 'Books', price: 10 }]), { status: 200 }));

    await expect(provider.getData('ACTIVITY', {})).resolves.toEqual([
      { id: 1, name: 'Libro', category: 'Books', price: 10 },
    ]);
  });

  it('debería combinar Users y Products para un reporte custom', async () => {
    fetchSpy
      .mockResolvedValueOnce(new Response(JSON.stringify([]), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify([]), { status: 200 }));

    await expect(provider.getData('CUSTOM', { count: 1 })).resolves.toEqual([]);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it('debería informar errores HTTP del proveedor', async () => {
    fetchSpy.mockResolvedValue(new Response('error', { status: 503 }));

    await expect(provider.getData('USERS_SUMMARY', {})).rejects.toThrow('503');
  });
});
