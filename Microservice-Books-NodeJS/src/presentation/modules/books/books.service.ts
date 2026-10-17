import { faker } from '@faker-js/faker';
import { BOOK_GENRES, BOOK_LANGUAGES, Book, BookGenre } from '../../../domain/interfaces/book.interface';

export class BooksService {
  public async getAllBooks(countBooks: number): Promise<Book[]> {
    const books: Promise<Book>[] = [];

    for (let i = 1; i <= countBooks; i++) {
      books.push(this.generateBook(i));
    }

    return Promise.all(books);
  }

  private generateBook(id: number): Promise<Book> {
    return Promise.resolve({
      id,
      title: faker.book.title(),
      authorId: faker.number.int({ min: 1, max: 100 }),
      isbn: faker.string.numeric(13),
      publicationYear: faker.date.past({ years: 20 }).toISOString(),
      publisher: faker.company.name(),
      pages: faker.number.int({ min: 50, max: 1000 }),
      description: faker.lorem.paragraph(),
      language: faker.helpers.arrayElement(BOOK_LANGUAGES),
      genre: faker.helpers.arrayElement(BOOK_GENRES) as BookGenre,
      coverImageUrl: `https://picsum.photos/seed/book-${id}/400/600`,
      pdfUrl: 'https://samplepdf.org/files/sample.pdf',
    });
  }
}
