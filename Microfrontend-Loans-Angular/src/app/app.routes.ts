import { Routes } from '@angular/router';
import { LoansPage } from './pages/loans/loans.page';

/**
 * Definición de las rutas principales de la aplicación.
 *
 * @remarks
 * Este archivo contiene la configuración de enrutamiento
 * utilizada por Angular Router para mapear las URLs
 * a los componentes correspondientes.
 *
 * Incluye:
 * - Rutas de navegación principales
 * - Redirección por defecto para rutas no existentes
 *
 * @see {@link LoansPage}
 */
export const routes: Routes = [
  /**
   * Ruta de loans.
   *
   * @remarks
   * Renderiza el componente `LoansPage`, encargado
   * de mostrar y gestionar el listado de loans.
   */
  { path: '', loadComponent: () => import('./pages/loans/loans.page').then((m) => m.LoansPage)},
];