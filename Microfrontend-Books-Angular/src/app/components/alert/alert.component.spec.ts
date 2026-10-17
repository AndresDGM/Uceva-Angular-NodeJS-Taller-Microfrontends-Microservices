import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AlertComponent] }).compileComponents();
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.alertState = 'loading';
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => expect(component).toBeTruthy());
  it('debería aplicar la clase de carga', () => expect(component.getClass()).toContain('alert-primary'));
  it('debería aplicar la clase de error', () => {
    component.alertState = 'error';
    expect(component.getClass()).toContain('alert-danger');
  });
  it('debería mostrar el texto recibido', () => {
    component.text = 'Cargando libros...';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Cargando libros...');
  });
});
