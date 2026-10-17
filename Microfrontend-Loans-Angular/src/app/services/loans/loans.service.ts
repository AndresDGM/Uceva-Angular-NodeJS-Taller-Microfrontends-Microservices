import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../../interfaces/loans.interface';

/**
 * Servicio encargado de la gestión de loans.
 *
 * Proporciona métodos para obtener información de loans
 * desde la API REST.
 *
 * @example
 * ```ts
 * constructor(private loansService: LoansService) {}
 *
 * this.loansService.getAllLoans(10).subscribe(loans => {
 *   console.log(loans);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class LoansService {

  /**
   * Cliente HTTP de Angular para realizar peticiones a la API.
   * Se inyecta usando la función `inject`.
   */
  private httpClient = inject(HttpClient);

  /**
   * Obtiene una lista de loans desde el backend.
   *
   * @param countLoans Número de loans a obtener.
   * @returns Observable que emite un array de loans.
   *
   * @example
   * ```ts
   * this.loansService.getAllLoans(5).subscribe(loans => {
   *   console.log(loans);
   * });
   * ```
   */
  getAllLoans(countLoans: number): Observable<Loan[]> {
    return this.httpClient.get<Loan[]>(`http://localhost:3003/api/loans/${countLoans}`);
  }
}