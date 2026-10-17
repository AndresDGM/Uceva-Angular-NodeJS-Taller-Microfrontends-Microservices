import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Report } from '../../interfaces/reports.interface';

@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  imports: [DatePipe],
})
export class ReportsTableComponent {
  @Input() reports: Report[] = [];
  @Output() download = new EventEmitter<Report>();
  @Output() remove = new EventEmitter<Report>();

  statusClass(status: Report['status']): string {
    return {
      PENDING: 'text-bg-secondary',
      PROCESSING: 'text-bg-primary',
      COMPLETED: 'text-bg-success',
      FAILED: 'text-bg-danger',
    }[status] ?? '';
  }
}
