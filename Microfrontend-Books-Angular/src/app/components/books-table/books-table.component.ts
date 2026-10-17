import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { Book, BookGenre } from '../../interfaces/books.interface';

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  imports: [BadgeAtom]
})
export class BooksTableComponent {
  @Input() books: Book[] = [];
  readonly genreMap: Record<BookGenre, BadgeType> = {
    Fiction: 'primary',
    'Non-Fiction': 'secondary',
    Mystery: 'dark',
    Romance: 'danger',
    'Science Fiction': 'info',
    Fantasy: 'success',
    Biography: 'warning',
    History: 'secondary',
    'Self-Help': 'primary',
    Children: 'success'
  };

}
