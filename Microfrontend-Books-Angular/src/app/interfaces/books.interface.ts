export type BookGenre =
  | 'Fiction' | 'Non-Fiction' | 'Mystery' | 'Romance' | 'Science Fiction'
  | 'Fantasy' | 'Biography' | 'History' | 'Self-Help' | 'Children';

export type BookLanguage =
  | 'English' | 'Spanish' | 'French' | 'German' | 'Italian'
  | 'Portuguese' | 'Chinese' | 'Japanese' | 'Korean' | 'Russian';

export interface Book {
  id: number;
  title: string;
  authorId: number;
  isbn: string;
  publicationYear: string;
  publisher: string;
  pages: number;
  description: string;
  language: BookLanguage;
  genre: BookGenre;
  coverImageUrl: string;
  pdfUrl: string;
}
