import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { BOOKS_MOCK } from '../../mocks/books.mocks';
import { BooksService } from '../../services/books/books.service';
import { BooksTableComponent } from '../../components/books-table/books-table.component';
import { BooksPage } from './books.page';

describe('BooksPage', () => {
  let component: BooksPage;
  let fixture: ComponentFixture<BooksPage>;
  let service: BooksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksPage, BooksTableComponent],
      providers: [provideHttpClient()]
    }).compileComponents();
    fixture = TestBed.createComponent(BooksPage);
    component = fixture.componentInstance;
    service = TestBed.inject(BooksService);
  });

  it('debería crear el componente', () => expect(component).toBeTruthy());

  it('debería solicitar diez libros al iniciar', () => {
    const spy = jest.spyOn(service, 'getAllBooks').mockReturnValue(of(BOOKS_MOCK));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(10);
    expect(component.books).toEqual(BOOKS_MOCK);
    expect(component.state).toBe('success');
  });

  it('debería pasar los libros a la tabla', () => {
    jest.spyOn(service, 'getAllBooks').mockReturnValue(of(BOOKS_MOCK));
    fixture.detectChanges();
    const table = fixture.debugElement.query(By.directive(BooksTableComponent)).componentInstance;
    expect(table.books).toEqual(BOOKS_MOCK);
  });

  it('debería manejar errores del servicio', () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    jest.spyOn(service, 'getAllBooks').mockReturnValue(throwError(() => new Error('fallo')));
    fixture.detectChanges();
    expect(component.state).toBe('error');
  });
});
