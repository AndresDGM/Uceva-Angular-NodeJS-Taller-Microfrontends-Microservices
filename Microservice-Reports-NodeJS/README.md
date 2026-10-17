# Reports Service

Microservicio Node.js/TypeScript responsable de solicitar, generar, consultar,
descargar y eliminar reportes.

## Ejecución

```bash
npm install
npm run start
```

Por defecto escucha en `http://localhost:3004`. Puede configurarse con:

- `PORT`: puerto HTTP.
- `PUBLIC_PATH`: carpeta de archivos públicos.
- `USERS_SERVICE_URL`: URL base de Users, por defecto `http://localhost:3001`.
- `PRODUCTS_SERVICE_URL`: URL base de Products, por defecto `http://localhost:3002`.

## API

La documentación interactiva está disponible en `/api/docs`.

| Método | Ruta | Descripción |
| --- | --- | --- |
| `POST` | `/api/reports` | Acepta una solicitud y comienza la generación asíncrona. |
| `GET` | `/api/reports` | Lista el historial con `page`, `limit`, `status` y `type`. |
| `GET` | `/api/reports/:id` | Consulta estado y metadatos. |
| `GET` | `/api/reports/:id/download` | Descarga el PDF, XLSX o CSV terminado. |
| `DELETE` | `/api/reports/:id` | Elimina un reporte del historial. |

El cuerpo de `POST` requiere `name`, `type`, `format`, `filters` y `requestedBy`.
Los tipos son `USERS_SUMMARY`, `ACTIVITY` y `CUSTOM`; los formatos son `PDF`,
`XLSX` y `CSV`. Los estados son `PENDING`, `PROCESSING`, `COMPLETED` y `FAILED`.

`USERS_SUMMARY` consulta Users, `ACTIVITY` consulta Products y `CUSTOM` combina
ambos proveedores mediante sus API REST. La implementación conserva metadatos y
archivos en memoria porque los microservicios actuales del repositorio no tienen
una infraestructura PostgreSQL, Redis o almacenamiento de archivos configurada.

## Verificación

```bash
npm run build
npm test -- --runInBand
npm run test:coverage -- --runInBand
```
