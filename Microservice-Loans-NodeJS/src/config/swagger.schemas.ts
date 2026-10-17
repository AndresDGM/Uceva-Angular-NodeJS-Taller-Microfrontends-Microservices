/**
 * @openapi
 * components:
 *   schemas:
 *     Loan:
 *       type: object
 *       description: Representa un préstamo del sistema de biblioteca
 *       required:
 *         - id
 *         - userId
 *         - userName
 *         - bookId
 *         - bookTitle
 *         - loanDate
 *         - returnDate
 *         - status
 *         - amount
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         userId:
 *           type: number
 *           example: 101
 *         userName:
 *           type: string
 *           example: Carlos Ramírez
 *         bookId:
 *           type: number
 *           example: 51
 *         bookTitle:
 *           type: string
 *           example: Clean Code
 *         loanDate:
 *           type: string
 *           format: date
 *           example: '2026-10-10'
 *         returnDate:
 *           type: string
 *           format: date
 *           example: '2026-10-20'
 *         status:
 *           type: string
 *           enum:
 *             - ACTIVE
 *             - RETURNED
 *             - OVERDUE
 *           example: ACTIVE
 *         amount:
 *           type: number
 *           example: 5000
 */
export {};