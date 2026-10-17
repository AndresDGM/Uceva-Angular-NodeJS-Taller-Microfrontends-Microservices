export const BOOK_GENRES = [
  'Fiction',
  'Non-Fiction',
  'Mystery',
  'Romance',
  'Science Fiction',
  'Fantasy',
  'Biography',
  'History',
  'Self-Help',
  'Children',
] as const;

export type BookGenre = (typeof BOOK_GENRES)[number];

export const BOOK_LANGUAGES = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Chinese',
  'Japanese',
  'Korean',
  'Russian',
] as const;

export type BookLanguage = (typeof BOOK_LANGUAGES)[number];

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

export interface ServerOptions {
  port: number;
  publicPath: string;
  routes: import('express').Router;
}
