import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let fixture: ComponentFixture<AlertComponent>;
  let component: AlertComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AlertComponent] }).compileComponents();
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
  });

  it('debería mostrar una alerta de carga', () => {
    component.alertState = 'loading';
    component.text = 'Cargando';
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.spinner-border'))).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Cargando');
    expect(component.getClass()).toContain('alert-primary');
  });

  it('debería mostrar una alerta de error', () => {
    component.alertState = 'error';
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.spinner-border'))).toBeFalsy();
    expect(component.getClass()).toContain('alert-danger');
  });
});
