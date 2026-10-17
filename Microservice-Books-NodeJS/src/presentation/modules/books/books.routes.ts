import { Router } from 'express';
import { BooksController } from './books.controller';

export class BooksRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new BooksController();

    /**
     * @openapi
     * /api/books/{countBooks}:
     *   get:
     *     summary: Obtener listado de libros
     *     description: Retorna la cantidad solicitada de libros generados con Faker.js.
     *     tags: [Books]
     *     parameters:
     *       - in: path
     *         name: countBooks
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de libros a generar
     *     responses:
     *       201:
     *         description: Lista de libros generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Book'
     *       400:
     *         description: Parámetro inválido
     */
    router.get('/:countBooks', controller.getAllBooks);

    return router;
  }
}
