import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { LoanStatus, Loan } from '../../interfaces/loans.interface';

/**
 * Componente de tabla de loans.
 *
 * Se utiliza para mostrar un listado de loans en una tabla,
 * mostrando información como id, usuario, libro, fechas,
 * estado y monto, junto con un badge visual que indica el estado de cada loan.
 *
 * @remarks
 * Este componente recibe los loans desde un componente padre
 * a través del Input `loans` y utiliza el mapeo `statusMap`
 * para asignar colores a los badges según el estado.
 *
 * Forma parte de la capa de presentación de la aplicación y se considera
 * un **organismo** dentro del sistema de diseño atómico.
 *
 * @example
 * ```html
 * <app-loans-table [loans]="loansList"></app-loans-table>
 * ```
 */
@Component({
  selector: 'app-loans-table',
  templateUrl: './loans-table.component.html',
  imports: [BadgeAtom],
})
export class LoansTableComponent {
  /**
   * Listado de loans que se mostrarán en la tabla.
   * @type {Loan[]}
   * @remarks
   * Este Input permite pasar un array de loans desde un componente padre,
   * generalmente `LoansPage`. Cada loan debe cumplir la interfaz `Loan`.
   */
  @Input() loans: Loan[] = [];
  /**
   * Mapeo de estados de loans a tipos de Badge.
   * @type {Record<LoanStatus, BadgeType>}
   * @remarks
   * Se utiliza para asignar colores de badges a cada estado:
   * - 'ACTIVE' → 'info' (azul claro)
   * - 'RETURNED' → 'success' (verde)
   * - 'OVERDUE' → 'danger' (rojo)
   *
   * Esto permite que en la tabla cada loan tenga un badge visual que indique su estado
   * de forma clara para el usuario.
   */
  statusMap: Record<LoanStatus, BadgeType> = {
    'ACTIVE' : 'info',
    'RETURNED': 'success',
    'OVERDUE': 'danger'
  }
}