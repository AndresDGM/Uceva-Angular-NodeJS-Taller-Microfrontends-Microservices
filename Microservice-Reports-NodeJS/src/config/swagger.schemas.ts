/**
 * @openapi
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       required: [id, name, type, filters, requestedBy, status, format, createdAt, updatedAt]
 *       properties:
 *         id: { type: string, format: uuid }
 *         name: { type: string, example: Resumen de usuarios de octubre }
 *         type: { type: string, enum: [USERS_SUMMARY, ACTIVITY, CUSTOM] }
 *         filters: { type: object, additionalProperties: true }
 *         requestedBy: { type: string, example: '1' }
 *         status: { type: string, enum: [PENDING, PROCESSING, COMPLETED, FAILED] }
 *         format: { type: string, enum: [PDF, XLSX, CSV] }
 *         fileUrl: { type: string, nullable: true }
 *         errorMessage: { type: string, nullable: true }
 *         startedAt: { type: string, format: date-time, nullable: true }
 *         completedAt: { type: string, format: date-time, nullable: true }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 */
export {};
