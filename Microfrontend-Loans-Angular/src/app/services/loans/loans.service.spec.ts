import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Loan } from '../../interfaces/loans.interface';
import { LOANS_MOCK } from '../../mocks/loans.mocks';
import { LoansService } from './loans.service';

describe('LoansService', () => {
  let service: LoansService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(LoansService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no queden peticiones HTTP pendientes
    httpMock.verify();
  });

  describe('Creación del servicio', () => {

    it('debería crearse correctamente', () => {
      expect(service).toBeTruthy();
    });

  });

  describe('getAllLoans', () => {

    it('debería realizar una petición GET y retornar una lista de loans', () => {
      const countLoans = 5;
      const mockLoans: Loan[] = LOANS_MOCK;

      service.getAllLoans(countLoans).subscribe((loans) => {
        expect(loans).toEqual(mockLoans);
        expect(loans.length).toBe(mockLoans.length);
      });

      const req = httpMock.expectOne(`http://localhost:3005/api/loans/${countLoans}`);
      expect(req.request.method).toBe('GET');

      req.flush(mockLoans);
    });

    it('debería propagar un error si la petición HTTP falla', () => {
      const countLoans = 3;

      service.getAllLoans(countLoans).subscribe({
        next: () => {
          fail('No debería emitir datos cuando ocurre un error');
        },
        error: (error) => {
          expect(error.status).toBe(500);
        },
      });

      const req = httpMock.expectOne(`http://localhost:3005/api/loans/${countLoans}`);

      req.flush(
        { message: 'Error interno del servidor' },
        { status: 500, statusText: 'Internal Server Error' }
      );
    });

  });

});