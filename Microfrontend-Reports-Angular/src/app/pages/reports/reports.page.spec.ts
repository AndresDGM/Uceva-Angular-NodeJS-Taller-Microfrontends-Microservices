import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { REPORTS_MOCK } from '../../mocks/reports.mocks';
import { ReportsService } from '../../services/reports/reports.service';
import { ReportsPage } from './reports.page';

describe('ReportsPage', () => {
  let fixture: ComponentFixture<ReportsPage>;
  let component: ReportsPage;
  let service: ReportsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsPage],
      providers: [provideHttpClient()],
    }).compileComponents();
    fixture = TestBed.createComponent(ReportsPage);
    component = fixture.componentInstance;
    service = TestBed.inject(ReportsService);
  });

  it('debería cargar el historial al iniciar', () => {
    jest.spyOn(service, 'listReports').mockReturnValue(of({ items: REPORTS_MOCK, total: 2, page: 1, limit: 10, pages: 1 }));
    fixture.detectChanges();

    expect(component.reports).toEqual(REPORTS_MOCK);
    expect(component.state).toBe('success');
  });

  it('debería mostrar error al fallar la carga', () => {
    jest.spyOn(service, 'listReports').mockReturnValue(throwError(() => new Error('down')));
    fixture.detectChanges();

    expect(component.state).toBe('error');
    expect(component.message).toContain('cargar');
  });

  it('debería enviar una solicitud válida', () => {
    jest.spyOn(service, 'listReports').mockReturnValue(of({ items: [], total: 0, page: 1, limit: 10, pages: 0 }));
    const create = jest.spyOn(service, 'createReport').mockReturnValue(of(REPORTS_MOCK[0]));
    fixture.detectChanges();
    component.reportForm.patchValue({ name: 'Nuevo reporte', count: 4 });
    component.submitReport();

    expect(create).toHaveBeenCalledWith(expect.objectContaining({ name: 'Nuevo reporte', filters: { count: 4 } }));
  });

  it('debería rechazar el formulario inválido y manejar error de creación', () => {
    jest.spyOn(service, 'listReports').mockReturnValue(of({ items: [], total: 0, page: 1, limit: 10, pages: 0 }));
    const create = jest.spyOn(service, 'createReport').mockReturnValue(throwError(() => new Error('bad')));
    fixture.detectChanges();
    component.submitReport();
    expect(create).not.toHaveBeenCalled();

    component.reportForm.patchValue({ name: 'válido' });
    component.submitReport();
    expect(component.state).toBe('error');
    expect(component.message).toContain('solicitar');
  });

  it('debería descargar y eliminar un reporte', () => {
    jest.spyOn(service, 'listReports').mockReturnValue(of({ items: [], total: 0, page: 1, limit: 10, pages: 0 }));
    jest.spyOn(service, 'downloadReport').mockReturnValue(of(new Blob(['file'])));
    jest.spyOn(service, 'deleteReport').mockReturnValue(of(void 0));
    fixture.detectChanges();
    Object.defineProperty(URL, 'createObjectURL', { value: jest.fn(() => 'blob:test'), configurable: true });
    const anchorClick = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined);

    component.downloadReport(REPORTS_MOCK[0]);
    component.deleteReport(REPORTS_MOCK[0]);

    expect(anchorClick).toHaveBeenCalled();
    expect(service.deleteReport).toHaveBeenCalledWith('report-1');
  });

  it('debería mostrar errores de descarga y eliminación', () => {
    jest.spyOn(service, 'listReports').mockReturnValue(of({ items: [], total: 0, page: 1, limit: 10, pages: 0 }));
    jest.spyOn(service, 'downloadReport').mockReturnValue(throwError(() => new Error('download')));
    jest.spyOn(service, 'deleteReport').mockReturnValue(throwError(() => new Error('delete')));
    fixture.detectChanges();

    component.downloadReport(REPORTS_MOCK[0]);
    expect(component.message).toContain('descargar');
    component.deleteReport(REPORTS_MOCK[0]);
    expect(component.message).toContain('eliminar');
  });
});
