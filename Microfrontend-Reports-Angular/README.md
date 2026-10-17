# Microfrontend Reports

Microfrontend Angular expuesto como `./ReportsPage` mediante Module Federation.

## Ejecución

```bash
npm install --legacy-peer-deps
npm run start
```

El remote se sirve en `http://localhost:4203` y publica `remoteEntry.js`.
La aplicación consume `Microservice-Reports-NodeJS` en `http://localhost:3003`.

## Verificación

```bash
npm run build -- --configuration development
npm run test:coverage -- --runInBand
npm run compodoc
```
