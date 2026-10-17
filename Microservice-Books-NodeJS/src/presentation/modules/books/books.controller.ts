import { Request, Response } from 'express';
import { HandleError } from '../../../domain/erros/handle.error';
import { BooksService } from './books.service';

export class BooksController {
  private readonly booksService = new BooksService();

  getAllBooks = (req: Request, res: Response): void => {
    const { countBooks } = req.params;

    setTimeout(() => {
      this.booksService
        .getAllBooks(Number(countBooks))
        .then((books) => res.status(201).json(books))
        .catch((error) => HandleError.error(error, res));
    }, 1000);
  };
}
