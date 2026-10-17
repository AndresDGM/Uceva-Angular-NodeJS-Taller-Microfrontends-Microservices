import ExcelJS from 'exceljs';
import PDFDocument = require('pdfkit');
import { stringify } from 'csv-stringify/sync';
import {
  GeneratedFile,
  Report,
  ReportRow,
} from '../../../domain/interfaces/report.interface';

export class ReportGenerator {
  async generate(report: Report, rows: ReportRow[]): Promise<GeneratedFile> {
    if (report.format === 'CSV') {
      return {
        content: Buffer.from(stringify(rows, { header: true }), 'utf8'),
        fileName: `${this.fileBaseName(report)}.csv`,
        contentType: 'text/csv',
      };
    }

    if (report.format === 'XLSX') {
      return this.generateExcel(report, rows);
    }

    return this.generatePdf(report, rows);
  }

  private async generateExcel(report: Report, rows: ReportRow[]): Promise<GeneratedFile> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Report');
    const columns = this.columns(rows);

    worksheet.columns = columns.map((key) => ({
      header: key,
      key,
      width: Math.max(key.length + 2, 18),
    }));
    rows.forEach((row) => worksheet.addRow(row));
    worksheet.getRow(1).font = { bold: true };

    return {
      content: Buffer.from(await workbook.xlsx.writeBuffer()),
      fileName: `${this.fileBaseName(report)}.xlsx`,
      contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    };
  }

  private generatePdf(report: Report, rows: ReportRow[]): Promise<GeneratedFile> {
    return new Promise((resolve) => {
      const document = new PDFDocument({ margin: 50 });
      const chunks: Buffer[] = [];

      document.on('data', (chunk: Buffer) => chunks.push(chunk));
      document.on('end', () => resolve({
        content: Buffer.concat(chunks),
        fileName: `${this.fileBaseName(report)}.pdf`,
        contentType: 'application/pdf',
      }));
      document.fontSize(18).text(report.name);
      document.moveDown();
      document.fontSize(10).text(`Tipo: ${report.type} | Registros: ${rows.length}`);
      document.moveDown();

      rows.forEach((row, index) => {
        document.text(`${index + 1}. ${Object.entries(row)
          .map(([key, value]) => `${key}: ${value}`)
          .join(' | ')}`);
      });

      document.end();
    });
  }

  private columns(rows: ReportRow[]): string[] {
    const columns = new Set<string>();
    rows.forEach((row) => Object.keys(row).forEach((key) => columns.add(key)));
    return [...columns];
  }

  private fileBaseName(report: Report): string {
    return report.name.toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'report';
  }
}
