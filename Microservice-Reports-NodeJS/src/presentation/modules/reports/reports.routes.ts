import { Router } from 'express';
import { ReportsController } from './reports.controller';

export class ReportsRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ReportsController();

    /**
     * @openapi
     * /api/reports:
     *   post:
     *     summary: Solicitar la generación de un reporte
     *     tags: [Reports]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [name, type, format, filters, requestedBy]
     *             properties:
     *               name: { type: string, example: Resumen de usuarios }
     *               type: { type: string, enum: [USERS_SUMMARY, ACTIVITY, CUSTOM] }
     *               format: { type: string, enum: [PDF, XLSX, CSV] }
     *               filters: { type: object, example: { count: 10 } }
     *               requestedBy: { type: string, example: '1' }
     *     responses:
     *       202: { description: Reporte aceptado para generación }
     *       400: { description: Solicitud inválida }
     */
    router.post('/', controller.create);

    /**
     * @openapi
     * /api/reports:
     *   get:
     *     summary: Listar el historial de reportes
     *     tags: [Reports]
     *     parameters:
     *       - { in: query, name: page, schema: { type: integer, minimum: 1, default: 1 } }
     *       - { in: query, name: limit, schema: { type: integer, minimum: 1, maximum: 100, default: 10 } }
     *       - { in: query, name: status, schema: { type: string, enum: [PENDING, PROCESSING, COMPLETED, FAILED] } }
     *       - { in: query, name: type, schema: { type: string, enum: [USERS_SUMMARY, ACTIVITY, CUSTOM] } }
     *     responses:
     *       200: { description: Historial paginado }
     */
    router.get('/', controller.list);

    /**
     * @openapi
     * /api/reports/{id}:
     *   get:
     *     summary: Consultar el estado y los metadatos de un reporte
     *     tags: [Reports]
     *     parameters:
     *       - { in: path, name: id, required: true, schema: { type: string, format: uuid } }
     *     responses:
     *       200: { description: Reporte encontrado }
     *       404: { description: Reporte no encontrado }
     */
    router.get('/:id', controller.getById);

    /**
     * @openapi
     * /api/reports/{id}/download:
     *   get:
     *     summary: Descargar un reporte completado
     *     tags: [Reports]
     *     parameters:
     *       - { in: path, name: id, required: true, schema: { type: string, format: uuid } }
     *     responses:
     *       200: { description: Archivo generado }
     *       400: { description: El reporte aún no está listo }
     *       404: { description: Reporte no encontrado }
     */
    router.get('/:id/download', controller.download);

    /**
     * @openapi
     * /api/reports/{id}:
     *   delete:
     *     summary: Eliminar un reporte del historial
     *     tags: [Reports]
     *     parameters:
     *       - { in: path, name: id, required: true, schema: { type: string, format: uuid } }
     *     responses:
     *       204: { description: Reporte eliminado }
     *       404: { description: Reporte no encontrado }
     */
    router.delete('/:id', controller.delete);

    return router;
  }
}
