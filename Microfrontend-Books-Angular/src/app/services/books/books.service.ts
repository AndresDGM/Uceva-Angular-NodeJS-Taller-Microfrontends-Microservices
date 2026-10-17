import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../interfaces/books.interface';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3003/api/books';

  getAllBooks(countBooks: number): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.apiUrl}/${countBooks}`);
  }
}
