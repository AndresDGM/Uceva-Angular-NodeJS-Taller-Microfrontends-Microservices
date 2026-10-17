# Microservicio de libros

Microservicio Node.js con Express, TypeScript, Faker.js y Swagger para el módulo de libros.

## Ejecución

```bash
npm install
npm run start
```

El servicio inicia en `http://localhost:3003` por defecto. Se puede cambiar el puerto con la variable `PORT`.

## API

- `GET /api/books/:countBooks`: generar la cantidad solicitada de libros simulados.
- `GET /api/docs`: abrir la documentación Swagger.

Los datos se generan con Faker.js en cada solicitud, siguiendo el patrón del microservicio de productos.
