# Microfrontend de libros

Microfrontend Angular que consume el microservicio de libros y presenta los datos simulados en una tabla.

## Ejecución

```bash
npm install
npm run start
```

La aplicación se sirve en `http://localhost:4203` y expone `BooksPage` mediante Module Federation.

El microservicio requerido debe estar disponible en `http://localhost:3003`.
