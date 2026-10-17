import { Loan, LoanStatus } from "../../../domain/interfaces/loan.interface";
import { faker } from '@faker-js/faker';

/**
 * Servicio encargado de la generación y gestión de loans.
 *
 * @remarks
 * Este servicio utiliza la librería `faker` para generar loans
 * ficticios, principalmente con fines de prueba o demostración.
 */
export class LoansService {

  /**
   * Estados disponibles para los loans.
   *
   * @remarks
   * Se utilizan para asignar aleatoriamente un estado
   * a cada loan generado.
   */
  private loanStatuses: LoanStatus[] = [
    'ACTIVE',
    'RETURNED',
    'OVERDUE',
  ];

  /**
   * Obtiene un listado de loans generados dinámicamente.
   *
   * @param countLoans Cantidad de loans a generar
   * @returns Promesa que resuelve un arreglo de loans
   *
   * @example
   * ```ts
   * const loans = await loansService.getAllLoans(5);
   * ```
   */
  public async getAllLoans(countLoans: number): Promise<Loan[]> {
    const loans: Promise<Loan>[] = [];

    for (let i = 1; i <= countLoans; i++) {
      loans.push(this.generateLoan(i));
    }

    return Promise.all(loans);
  }

  /**
   * Genera un loan ficticio.
   *
   * @param id Identificador único del loan
   * @returns Promesa que resuelve un loan generado
   */
  private generateLoan(id: number): Promise<Loan> {
    const loanDate = faker.date.past({ years: 1 }) ?? new Date();
    const returnDate = faker.date.future({ years: 1 }) ?? new Date();

    const loanDateStr = loanDate.toISOString().split('T')[0] ?? '';
    const returnDateStr = returnDate.toISOString().split('T')[0] ?? '';

    return Promise.resolve({
      id,
      userId: faker.number.int({ min: 1, max: 999 }),
      userName: faker.person.fullName(),
      bookId: faker.number.int({ min: 1, max: 999 }),
      bookTitle: faker.book.title(),
      loanDate: loanDateStr,
      returnDate: returnDateStr,
      status: faker.helpers.arrayElement(this.loanStatuses),
      amount: Number(
        faker.commerce.price({ min: 1000, max: 50000, dec: 0 })
      ),
    });
  }
}