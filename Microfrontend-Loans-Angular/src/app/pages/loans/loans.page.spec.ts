import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansPage } from './loans.page';
import { provideHttpClient } from '@angular/common/http';
import { LoansService } from '../../services/loans/loans.service';
import { LoansTableComponent } from '../../components/loans-table/loans-table.component';
import { of, throwError } from 'rxjs';
import { LOANS_MOCK } from '../../mocks/loans.mocks';
import { By } from '@angular/platform-browser';

describe('LoansPage', () => {
  let component: LoansPage;
  let fixture: ComponentFixture<LoansPage>;
  let loansService: LoansService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoansPage, LoansTableComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoansPage);
    component = fixture.componentInstance;
    loansService = TestBed.inject(LoansService);
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a getAllLoans al iniciar', () => {
    const spyGetAllLoans = jest.spyOn(loansService, 'getAllLoans').mockReturnValue(of(LOANS_MOCK));
    fixture.detectChanges();
    expect(spyGetAllLoans).toHaveBeenCalled();
  });

  it('debería asignar los loans recibidos del servicio', () => {
    jest.spyOn(loansService, 'getAllLoans').mockReturnValue(of(LOANS_MOCK));
    fixture.detectChanges();
    expect(component.loans).toEqual(LOANS_MOCK);
  });

  it('debería pasar los loans al componente loans-table', () => {
    jest.spyOn(loansService, 'getAllLoans').mockReturnValue(of(LOANS_MOCK));
    fixture.detectChanges();
    const tableComponent = fixture.debugElement
      .query(By.directive(LoansTableComponent))
      .componentInstance;
    expect(tableComponent.loans).toEqual(LOANS_MOCK);
  });

  it('debería manejar el error cuando falla getAllLoans', () => {
    component.loans = [];
    const errorResponse = new Error('Error al cargar loans');

    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(loansService, 'getAllLoans').mockReturnValue(throwError(() => errorResponse));

    fixture.detectChanges();

    expect(loansService.getAllLoans).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(errorResponse);
    expect(component.loans.length).toBe(0);
  });
});