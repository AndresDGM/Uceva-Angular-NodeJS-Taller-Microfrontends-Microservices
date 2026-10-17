import cors from 'cors';
import express, { Application } from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../config/swagger';
import { ServerOptions } from '../domain/interfaces/book.interface';

export class Server {
  public readonly app: Application = express();

  constructor(private readonly options: ServerOptions) {}

  start(): void {
    const { port, publicPath, routes } = this.options;

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static(publicPath));
    this.app.use(routes);
    this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.app.use((_req, res) => {
      res.sendFile(path.join(__dirname, `../../${publicPath}/index.html`));
    });

    this.app.listen(port, () => {
      console.log(`Microservice Books Running on Port ${port}`);
    });
  }
}
