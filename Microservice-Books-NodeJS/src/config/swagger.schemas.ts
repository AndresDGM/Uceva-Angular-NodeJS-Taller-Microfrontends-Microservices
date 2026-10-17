/**
 * @openapi
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       description: Representa un libro del catálogo.
 *       required:
 *         - id
 *         - title
 *         - authorId
 *         - isbn
 *         - publicationYear
 *         - publisher
 *         - pages
 *         - description
 *         - language
 *         - genre
 *         - coverImageUrl
 *         - pdfUrl
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Cien años de soledad
 *         authorId:
 *           type: integer
 *           example: 1
 *         isbn:
 *           type: string
 *           example: 978-3-16-148410-0
 *         publicationYear:
 *           type: string
 *           format: date-time
 *         publisher:
 *           type: string
 *           example: Editorial Sudamericana
 *         pages:
 *           type: integer
 *           example: 400
 *         description:
 *           type: string
 *         language:
 *           type: string
 *           enum: [English, Spanish, French, German, Italian, Portuguese, Chinese, Japanese, Korean, Russian]
 *         genre:
 *           type: string
 *           enum: [Fiction, Non-Fiction, Mystery, Romance, Science Fiction, Fantasy, Biography, History, Self-Help, Children]
 *         coverImageUrl:
 *           type: string
 *           format: uri
 *         pdfUrl:
 *           type: string
 *           format: uri
 */
export {};
