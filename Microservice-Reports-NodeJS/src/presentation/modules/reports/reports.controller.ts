import { Request, Response } from 'express';
import { HandleError } from '../../../domain/errors/handle.error';
import {
  REPORT_STATUSES,
  REPORT_TYPES,
} from '../../../domain/interfaces/report.interface';
import { ReportsService } from './reports.service';

export class ReportsController {
  constructor(private readonly reportsService = new ReportsService()) {}

  create = (req: Request, res: Response): void => {
    try {
      const report = this.reportsService.requestReport(req.body);
      res.status(202).json(report);
    } catch (error) {
      HandleError.error(error, res);
    }
  };

  list = (req: Request, res: Response): void => {
    try {
      const result = this.reportsService.listReports({
        page: this.queryNumber(req.query.page, 1),
        limit: this.queryNumber(req.query.limit, 10),
        status: this.queryEnum(req.query.status, REPORT_STATUSES),
        type: this.queryEnum(req.query.type, REPORT_TYPES),
      });
      res.status(200).json(result);
    } catch (error) {
      HandleError.error(error, res);
    }
  };

  getById = (req: Request, res: Response): void => {
    try {
      res.status(200).json(this.reportsService.getReport(this.param(req.params.id)));
    } catch (error) {
      HandleError.error(error, res);
    }
  };

  download = (req: Request, res: Response): void => {
    try {
      const file = this.reportsService.getFile(this.param(req.params.id));
      res.setHeader('Content-Type', file.contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${file.fileName}"`);
      res.status(200).send(file.content);
    } catch (error) {
      HandleError.error(error, res);
    }
  };

  delete = (req: Request, res: Response): void => {
    try {
      this.reportsService.deleteReport(this.param(req.params.id));
      res.status(204).send();
    } catch (error) {
      HandleError.error(error, res);
    }
  };

  private queryNumber(value: unknown, defaultValue: number): number {
    if (value === undefined) {
      return defaultValue;
    }

    return Number(value);
  }

  private param(value: string | string[] | undefined): string {
    return Array.isArray(value) ? value[0] ?? '' : value ?? '';
  }

  private queryEnum<T extends string>(value: unknown, allowed: readonly T[]): T | undefined {
    if (value === undefined) {
      return undefined;
    }

    return String(value) as T;
  }
}
