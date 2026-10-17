import { Request, Response } from 'express';
import { CustomError } from '../../../domain/errors/custom.error';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

const response = (): Response => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    setHeader: jest.fn(),
    send: jest.fn().mockReturnThis(),
  };
  return res as unknown as Response;
};

const request = (values: Partial<Request>): Request => values as Request;

describe('ReportsController', () => {
  it('debería atender creación, consulta, descarga y eliminación', () => {
    const service = {
      requestReport: jest.fn().mockReturnValue({ id: '1' }),
      listReports: jest.fn().mockReturnValue({ items: [], total: 0, page: 1, limit: 10, pages: 0 }),
      getReport: jest.fn().mockReturnValue({ id: '1' }),
      getFile: jest.fn().mockReturnValue({ content: Buffer.from('ok'), fileName: 'a.csv', contentType: 'text/csv' }),
      deleteReport: jest.fn(),
    } as unknown as ReportsService;
    const controller = new ReportsController(service);
    const createResponse = response();

    controller.create(request({ body: {} }), createResponse);
    controller.list(request({ query: { page: '1', limit: '5', status: 'COMPLETED', type: 'CUSTOM' } }), response());
    controller.getById(request({ params: { id: '1' } }), response());
    const downloadResponse = response();
    controller.download(request({ params: { id: '1' } }), downloadResponse);
    const deleteResponse = response();
    controller.delete(request({ params: { id: '1' } }), deleteResponse);

    expect(createResponse.status).toHaveBeenCalledWith(202);
    expect(service.listReports).toHaveBeenCalledWith({ page: 1, limit: 5, status: 'COMPLETED', type: 'CUSTOM' });
    expect(downloadResponse.setHeader).toHaveBeenCalledWith('Content-Type', 'text/csv');
    expect(deleteResponse.status).toHaveBeenCalledWith(204);
  });

  it('debería convertir errores de dominio a respuestas HTTP', () => {
    const service = {
      requestReport: jest.fn().mockImplementation(() => { throw CustomError.badRequest('incorrecto'); }),
    } as unknown as ReportsService;
    const controller = new ReportsController(service);
    const res = response();

    controller.create(request({ body: {} }), res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'incorrecto' });
  });

  it('debería manejar errores en consulta, descarga y eliminación', () => {
    const service = {
      listReports: jest.fn().mockImplementation(() => { throw CustomError.badRequest('consulta'); }),
      getReport: jest.fn().mockImplementation(() => { throw CustomError.badRequest('consulta'); }),
      getFile: jest.fn().mockImplementation(() => { throw CustomError.badRequest('descarga'); }),
      deleteReport: jest.fn().mockImplementation(() => { throw CustomError.badRequest('eliminación'); }),
    } as unknown as ReportsService;
    const controller = new ReportsController(service);

    controller.list(request({ query: {} }), response());
    controller.getById(request({ params: {} }), response());
    controller.getById(request({ params: { id: ['1'] } }), response());
    controller.getById(request({ params: { id: [] } }), response());
    controller.download(request({ params: {} }), response());
    controller.delete(request({ params: {} }), response());

    expect(service.listReports).toHaveBeenCalledWith({ page: 1, limit: 10, status: undefined, type: undefined });
  });
});
