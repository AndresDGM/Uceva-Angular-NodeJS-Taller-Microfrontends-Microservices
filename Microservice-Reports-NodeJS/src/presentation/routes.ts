import { Router } from 'express';
import { ReportsRoutes } from './modules/reports/reports.routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/api/reports', ReportsRoutes.routes);
    return router;
  }
}
