# AngularStandaloneTemplate

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.9.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4203/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Jest](https://jestjs.io/) test runner, use the following command:

```bash
npm run test
```

To run tests with coverage:

```bash
npm run test:coverage
```

## Compodoc

To generate the documentation using Compodoc:

```bash
npm run compodoc
```

## Module Federation

This microfrontend exposes the `LoansPage` component via Module Federation:

- **Name:** `mf-loans`
- **Remote Entry:** `http://localhost:4203/remoteEntry.js`
- **Exposed module:** `./LoansPage`

The host application loads this remote module using `loadRemoteModule` from `@angular-architects/module-federation`.

## API Connection

This microfrontend consumes the Loans microservice running at:

- **Endpoint:** `http://localhost:3003/api/loans/{countLoans}`
- **Swagger Docs:** `http://localhost:3003/api/docs`

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.