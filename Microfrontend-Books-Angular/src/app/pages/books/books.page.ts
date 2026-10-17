import { Component, inject } from '@angular/core';
import { AlertComponent } from '../../components/alert/alert.component';
import { BooksTableComponent } from '../../components/books-table/books-table.component';
import { Book } from '../../interfaces/books.interface';
import { State } from '../../interfaces/state.interface';
import { BooksService } from '../../services/books/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  imports: [BooksTableComponent, AlertComponent]
})
export class BooksPage {
  books: Book[] = [];
  state: State = 'init';

  private readonly booksService = inject(BooksService);

  ngOnInit(): void {
    this.state = 'loading';
    this.booksService.getAllBooks(10).subscribe({
      next: (books) => {
        this.books = books;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.state = 'error';
      }
    });
  }
}
