import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Reports Service API',
      version: '1.0.0',
      description: 'API para generar, consultar, descargar y eliminar reportes.',
    },
    servers: [{ url: 'http://localhost:3004' }],
  },
  apis: [
    './src/presentation/modules/**/*.routes.ts',
    './src/config/swagger.schemas.ts',
  ],
});
