import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BOOKS_MOCK } from '../../mocks/books.mocks';
import { BooksService } from './books.service';

describe('BooksService', () => {
  let service: BooksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener la cantidad solicitada de libros', () => {
    service.getAllBooks(10).subscribe((books) => expect(books).toEqual(BOOKS_MOCK));

    const request = httpMock.expectOne('http://localhost:3003/api/books/10');
    expect(request.request.method).toBe('GET');
    request.flush(BOOKS_MOCK);
  });

  it('debería propagar los errores HTTP', () => {
    service.getAllBooks(3).subscribe({
      next: () => fail('No debería emitir libros cuando falla la petición'),
      error: (error) => expect(error.status).toBe(500)
    });

    const request = httpMock.expectOne('http://localhost:3003/api/books/3');
    request.flush({ message: 'Error interno' }, { status: 500, statusText: 'Internal Server Error' });
  });
});
