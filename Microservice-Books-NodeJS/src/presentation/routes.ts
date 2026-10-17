import { Router } from 'express';
import { BooksRoutes } from './modules/books/books.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/books', BooksRoutes.routes);
    return router;
  }
}
