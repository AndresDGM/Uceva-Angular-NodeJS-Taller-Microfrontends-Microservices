import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/books/books.page').then((m) => m.BooksPage) }
];
