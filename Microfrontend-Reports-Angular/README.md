# Microfrontend Reports

Microfrontend Angular expuesto como `./ReportsPage` mediante Module Federation.

## Ejecución

```bash
npm install --legacy-peer-deps
npm run start
```

El remote se sirve en `http://localhost:4204` y publica `remoteEntry.js`.
La aplicación consume `Microservice-Reports-NodeJS` en `http://localhost:3004`.

## Verificación

```bash
npm run build -- --configuration development
npm run test:coverage -- --runInBand
npm run compodoc
```
