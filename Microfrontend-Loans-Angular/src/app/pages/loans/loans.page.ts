import { Component, inject } from '@angular/core';
import { LoansTableComponent } from '../../components/loans-table/loans-table.component';
import { Loan } from '../../interfaces/loans.interface';
import { LoansService } from '../../services/loans/loans.service';
import { State } from '../../interfaces/state.interface';
import { AlertComponent } from '../../components/alert/alert.component';

/**
 * Componente contenedor de loans.
 *
 * Se utiliza para gestionar y mostrar un listado de loans
 * utilizando el componente `LoansTableComponent`.
 *
 * @remarks
 * Este componente se encarga de consumir el servicio `LoansService`
 * para obtener los loans y pasarlos al componente de tabla.
 * Forma parte de la capa de presentación de la aplicación.
 *
 */
@Component({
  selector: 'app-loans',
  templateUrl: './loans.page.html',
  imports: [LoansTableComponent, AlertComponent],
})
export class LoansPage {
  /**
   * Listado de loans obtenidos desde el servicio.
   * @type {Loan[]}
   */
  loans: Loan[] = [];
  /**
   * Estado actual del componente.
   *
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Servicio para obtener loans.
   * @remarks
   * Se inyecta utilizando la función `inject()` de Angular.
   */
  private loansService = inject(LoansService);

  /**
   * Inicializa el componente y carga los loans.
   * @remarks
   * Se suscribe al método `getAllLoans()` del servicio y
   * asigna los datos recibidos a la propiedad `loans`.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.loansService.getAllLoans(10).subscribe({
      next: (loans) => {
        this.loans = loans;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error)
        this.state = 'error';
      },
    })
  }
}