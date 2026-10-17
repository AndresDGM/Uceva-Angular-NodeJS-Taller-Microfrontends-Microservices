import { CustomError } from './custom.error';
import { HandleError } from './handle.error';

describe('CustomError', () => {
  it('debería crear errores HTTP de dominio', () => {
    expect(CustomError.badRequest('bad').statusCode).toBe(400);
    expect(CustomError.notFound('missing').statusCode).toBe(404);
    expect(CustomError.internalServer('down').statusCode).toBe(500);
  });

  it('debería responder errores desconocidos como error interno', () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    HandleError.error(new Error('unexpected'), res as never);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server error' });
  });
});
