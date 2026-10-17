import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BOOKS_MOCK } from '../../mocks/books.mocks';
import { BooksTableComponent } from './books-table.component';

describe('BooksTableComponent', () => {
  let component: BooksTableComponent;
  let fixture: ComponentFixture<BooksTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [BooksTableComponent] }).compileComponents();
    fixture = TestBed.createComponent(BooksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => expect(component).toBeTruthy());

  it('debería renderizar una fila por libro', () => {
    component.books = BOOKS_MOCK;
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('tbody tr')).length).toBe(BOOKS_MOCK.length);
  });

  it('debería mostrar la información principal de cada libro', () => {
    component.books = BOOKS_MOCK;
    fixture.detectChanges();
    const firstRow = fixture.debugElement.query(By.css('tbody tr')).nativeElement as HTMLElement;
    expect(firstRow.textContent).toContain(BOOKS_MOCK[0].title);
    expect(firstRow.textContent).toContain(BOOKS_MOCK[0].publisher);
    expect(firstRow.textContent).toContain(BOOKS_MOCK[0].genre);
  });

  it('debería mapear los géneros a tipos de badge', () => {
    expect(component.genreMap.Fiction).toBe('primary');
    expect(component.genreMap.Fantasy).toBe('success');
    expect(component.genreMap.Romance).toBe('danger');
  });
});
