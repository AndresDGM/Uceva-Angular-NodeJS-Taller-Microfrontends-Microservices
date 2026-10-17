import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de libros',
      version: '1.0.0',
      description: 'API REST del módulo de libros con datos simulados mediante Faker.js.',
    },
    servers: [{ url: 'http://localhost:3003' }],
  },
  apis: ['./src/presentation/modules/**/*.routes.ts', './src/config/swagger.schemas.ts'],
});
