import cors from 'cors';
import express, { Router } from 'express';
import path from 'node:path';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../config/swagger';
import { Options } from '../domain/interfaces/server.interface';

export class Server {
  public readonly app = express();

  constructor(
    private readonly options: Options,
  ) {
    this.configure();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static(this.options.publicPath));
    this.app.use(this.options.routes);
    this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.app.use((req, res) => {
      res.sendFile(path.join(__dirname, `../../${this.options.publicPath}/index.html`));
    });
  }

  start(): void {
    this.app.listen(this.options.port, () => {
      console.log(`Reports Service Running on Port ${this.options.port}`);
    });
  }
}

export type ServerRoutes = Router;
