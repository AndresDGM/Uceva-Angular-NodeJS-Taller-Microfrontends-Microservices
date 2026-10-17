/**
 * Interfaz que representa un préstamo del sistema.
 *
 * Contiene la información necesaria para registrar y mostrar
 * un préstamo en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada préstamo debe tener un `id` único, identificación del usuario
 * y del libro, fechas de loan y return, un estado y el monto del préstamo.
 *
 * @example
 * ```ts
 * const prestamo: Loan = {
 *   id: 1,
 *   userId: 101,
 *   userName: 'Carlos Ramírez',
 *   bookId: 51,
 *   bookTitle: 'Clean Code',
 *   loanDate: '2026-10-10',
 *   returnDate: '2026-10-20',
 *   status: 'ACTIVE',
 *   amount: 5000
 * };
 * ```
 */
export interface Loan {
  /** Identificador único del préstamo */
  id: number;

  /** Identificador del usuario que realiza el préstamo */
  userId: number;

  /** Nombre completo del usuario */
  userName: string;

  /** Identificador del libro prestado */
  bookId: number;

  /** Título del libro prestado */
  bookTitle: string;

  /** Fecha de inicio del préstamo */
  loanDate: string;

  /** Fecha de devolución programada */
  returnDate: string;

  /** Estado actual del préstamo */
  status: LoanStatus;

  /** Monto del préstamo */
  amount: number;
}

/**
 * Tipo de estado de un préstamo.
 *
 * @remarks
 * Este tipo restringe los estados a los valores predefinidos:
 * - 'ACTIVE'
 * - 'RETURNED'
 * - 'OVERDUE'
 *
 * Se utiliza principalmente para mapear badges de colores en la UI.
 *
 * @example
 * ```ts
 * const estado: LoanStatus = 'OVERDUE';
 * ```
 */
export type LoanStatus = 'ACTIVE' | 'RETURNED' | 'OVERDUE';