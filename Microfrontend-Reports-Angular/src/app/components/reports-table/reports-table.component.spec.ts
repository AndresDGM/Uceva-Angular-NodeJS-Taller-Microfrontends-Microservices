import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { REPORTS_MOCK } from '../../mocks/reports.mocks';
import { ReportsTableComponent } from './reports-table.component';

describe('ReportsTableComponent', () => {
  let fixture: ComponentFixture<ReportsTableComponent>;
  let component: ReportsTableComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ReportsTableComponent] }).compileComponents();
    fixture = TestBed.createComponent(ReportsTableComponent);
    component = fixture.componentInstance;
    component.reports = REPORTS_MOCK;
    fixture.detectChanges();
  });

  it('debería mostrar los reportes y sus estados', () => {
    expect(fixture.debugElement.queryAll(By.css('tbody tr'))).toHaveLength(2);
    expect(fixture.nativeElement.textContent).toContain('Usuarios de octubre');
    expect(component.statusClass('COMPLETED')).toBe('text-bg-success');
    expect(component.statusClass('FAILED')).toBe('text-bg-danger');
    expect(component.statusClass('PENDING')).toBe('text-bg-secondary');
    expect(component.statusClass('PROCESSING')).toBe('text-bg-primary');
    expect(component.statusClass('UNKNOWN' as never)).toBe('');
  });

  it('debería emitir las acciones de descarga y eliminación', () => {
    const download = jest.spyOn(component.download, 'emit');
    const remove = jest.spyOn(component.remove, 'emit');
    const buttons = fixture.debugElement.queryAll(By.css('button'));

    buttons[0].triggerEventHandler('click');
    buttons[1].triggerEventHandler('click');

    expect(download).toHaveBeenCalledWith(REPORTS_MOCK[0]);
    expect(remove).toHaveBeenCalledWith(REPORTS_MOCK[0]);
  });

  it('debería mostrar el estado vacío', () => {
    component.reports = [];
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No hay reportes');
  });
});
