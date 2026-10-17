import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LOANS_MOCK } from '../../mocks/loans.mocks';
import { LoansTableComponent } from './loans-table.component';

describe('LoansTableComponent', () => {
  let component: LoansTableComponent;
  let fixture: ComponentFixture<LoansTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoansTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoansTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar una tabla', () => {
    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();
  });

  it('debería renderizar una fila por cada loan', () => {
    component.loans = LOANS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(component.loans.length);
  });

  it('debería mostrar los datos del loan en cada columna', () => {
    component.loans = LOANS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const loan = component.loans[index];

      expect(columns[0].nativeElement.textContent.trim()).toBe(String(loan.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(loan.userName);
      expect(columns[2].nativeElement.textContent.trim()).toBe(loan.bookTitle);
      expect(columns[3].nativeElement.textContent.trim()).toBe(loan.loanDate);
      expect(columns[4].nativeElement.textContent.trim()).toBe(loan.returnDate);
    });
  });

  it('debería mapear cada estado a su BadgeType correcto', () => {
    expect(component.statusMap['ACTIVE']).toBe('info');
    expect(component.statusMap['RETURNED']).toBe('success');
    expect(component.statusMap['OVERDUE']).toBe('danger');
  });
  
});