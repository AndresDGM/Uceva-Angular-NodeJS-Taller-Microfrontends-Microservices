import { Request, Response } from "express";
import { HandleError } from "../../../domain/erros/handle.error";
import { LoansService } from "./loans.service";

/**
 * Controlador de loans.
 *
 * @remarks
 * Esta clase maneja las peticiones HTTP relacionadas con loans,
 * delegando la lógica de negocio al `LoansService`.
 */
export class LoansController {

  /**
   * Servicio de loans.
   */
  private readonly loansService = new LoansService();

  /**
   * Maneja la petición HTTP para obtener un listado de loans.
   *
   * @remarks
   * El número de loans a generar se obtiene desde los
   * parámetros de la ruta.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /loans/10
   * ```
   */
  getAllLoans = (req: Request, res: Response): void => {
    const { countLoans } = req.params;

    setTimeout(() => {
      this.loansService
      .getAllLoans(Number(countLoans))
      .then((loans) => res.status(201).json(loans))
      .catch((error) => HandleError.error(error, res));
    }, 1000);
  };
}