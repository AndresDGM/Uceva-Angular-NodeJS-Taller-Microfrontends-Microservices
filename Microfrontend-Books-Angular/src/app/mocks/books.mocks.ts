import { Book } from '../interfaces/books.interface';

export const BOOKS_MOCK: Book[] = [
  {
    id: 1,
    title: 'Cien años de soledad',
    authorId: 1,
    isbn: '9780307474728',
    publicationYear: '1967-05-30T00:00:00.000Z',
    publisher: 'Editorial Sudamericana',
    pages: 400,
    description: 'Una obra de realismo mágico.',
    language: 'Spanish',
    genre: 'Fiction',
    coverImageUrl: 'https://picsum.photos/seed/book-1/400/600',
    pdfUrl: 'https://samplepdf.org/files/sample.pdf'
  },
  {
    id: 2,
    title: 'Dune',
    authorId: 2,
    isbn: '9780441172719',
    publicationYear: '1965-08-01T00:00:00.000Z',
    publisher: 'Chilton Company',
    pages: 688,
    description: 'Una historia de ciencia ficción.',
    language: 'English',
    genre: 'Science Fiction',
    coverImageUrl: 'https://picsum.photos/seed/book-2/400/600',
    pdfUrl: 'https://samplepdf.org/files/sample.pdf'
  }
];
