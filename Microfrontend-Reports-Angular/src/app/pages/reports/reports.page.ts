import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from '../../components/alert/alert.component';
import { ReportsTableComponent } from '../../components/reports-table/reports-table.component';
import {
  REPORT_FORMATS,
  REPORT_TYPES,
  CreateReport,
  Report,
} from '../../interfaces/reports.interface';
import { State } from '../../interfaces/state.interface';
import { ReportsService } from '../../services/reports/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrl: './reports.page.scss',
  imports: [ReactiveFormsModule, AlertComponent, ReportsTableComponent],
})
export class ReportsPage implements OnInit {
  readonly reportTypes = REPORT_TYPES;
  readonly reportFormats = REPORT_FORMATS;
  reports: Report[] = [];
  state: State = 'init';
  message = '';
  messageState: 'loading' | 'error' = 'error';

  private readonly reportsService = inject(ReportsService);
  private readonly formBuilder = inject(FormBuilder);

  readonly reportForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(150)]],
    type: ['USERS_SUMMARY' as (typeof REPORT_TYPES)[number], Validators.required],
    format: ['PDF' as (typeof REPORT_FORMATS)[number], Validators.required],
    requestedBy: ['1', Validators.required],
    count: [10, [Validators.required, Validators.min(1), Validators.max(100)]],
  });

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.state = 'loading';
    this.reportsService.listReports().subscribe({
      next: (page) => {
        this.reports = page.items;
        this.state = 'success';
      },
      error: () => {
        this.state = 'error';
        this.message = 'No fue posible cargar el historial de reportes.';
        this.messageState = 'error';
      },
    });
  }

  submitReport(): void {
    if (this.reportForm.invalid) {
      this.reportForm.markAllAsTouched();
      return;
    }

    const values = this.reportForm.getRawValue();
    const report: CreateReport = {
      name: values.name,
      type: values.type,
      format: values.format,
      requestedBy: values.requestedBy,
      filters: { count: values.count },
    };

    this.state = 'loading';
    this.reportsService.createReport(report).subscribe({
      next: () => {
        this.message = 'Solicitud aceptada. Actualiza el historial para consultar su estado.';
        this.messageState = 'loading';
        this.reportForm.patchValue({ name: '' });
        this.loadReports();
      },
      error: () => {
        this.state = 'error';
        this.message = 'No fue posible solicitar el reporte.';
        this.messageState = 'error';
      },
    });
  }

  downloadReport(report: Report): void {
    this.reportsService.downloadReport(report.id).subscribe({
      next: (file) => {
        const url = URL.createObjectURL(file);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `${report.name}.${report.format.toLowerCase()}`;
        anchor.click();
        URL.revokeObjectURL(url);
      },
      error: () => {
        this.message = 'No fue posible descargar el reporte.';
        this.messageState = 'error';
      },
    });
  }

  deleteReport(report: Report): void {
    this.reportsService.deleteReport(report.id).subscribe({
      next: () => this.loadReports(),
      error: () => {
        this.message = 'No fue posible eliminar el reporte.';
        this.messageState = 'error';
      },
    });
  }
}
