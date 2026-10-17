import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { REPORTS_MOCK } from '../../mocks/reports.mocks';
import { ReportsService } from './reports.service';

describe('ReportsService', () => {
  let service: ReportsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportsService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ReportsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debería crear el servicio', () => expect(service).toBeTruthy());

  it('debería crear un reporte', () => {
    const body = { name: 'Usuarios', type: 'USERS_SUMMARY' as const, format: 'PDF' as const, requestedBy: '1', filters: { count: 1 } };
    service.createReport(body).subscribe((report) => expect(report).toEqual(REPORTS_MOCK[0]));

    const request = httpMock.expectOne('http://localhost:3003/api/reports');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(body);
    request.flush(REPORTS_MOCK[0]);
  });

  it('debería listar y consultar reportes', () => {
    service.listReports().subscribe((page) => expect(page.items).toEqual(REPORTS_MOCK));
    const listRequest = httpMock.expectOne((request) => request.url === 'http://localhost:3003/api/reports');
    expect(listRequest.request.params.get('page')).toBe('1');
    expect(listRequest.request.params.get('limit')).toBe('10');
    listRequest.flush({ items: REPORTS_MOCK, total: 2, page: 1, limit: 10, pages: 1 });

    service.getReport('report-1').subscribe((report) => expect(report.id).toBe('report-1'));
    const getRequest = httpMock.expectOne('http://localhost:3003/api/reports/report-1');
    getRequest.flush(REPORTS_MOCK[0]);
  });

  it('debería descargar y eliminar reportes', () => {
    service.downloadReport('report-1').subscribe((file) => expect(file).toBeInstanceOf(Blob));
    const downloadRequest = httpMock.expectOne('http://localhost:3003/api/reports/report-1/download');
    expect(downloadRequest.request.responseType).toBe('blob');
    downloadRequest.flush(new Blob(['pdf']));

    service.deleteReport('report-1').subscribe();
    const deleteRequest = httpMock.expectOne('http://localhost:3003/api/reports/report-1');
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush(null);
  });
});
