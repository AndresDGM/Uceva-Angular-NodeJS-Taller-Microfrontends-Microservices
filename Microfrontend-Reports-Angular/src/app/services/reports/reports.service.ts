import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateReport, Report, ReportsPage } from '../../interfaces/reports.interface';

@Injectable({ providedIn: 'root' })
export class ReportsService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3004/api/reports';

  createReport(report: CreateReport): Observable<Report> {
    return this.httpClient.post<Report>(this.apiUrl, report);
  }

  listReports(page = 1, limit = 10): Observable<ReportsPage> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.httpClient.get<ReportsPage>(this.apiUrl, { params });
  }

  getReport(id: string): Observable<Report> {
    return this.httpClient.get<Report>(`${this.apiUrl}/${id}`);
  }

  downloadReport(id: string): Observable<Blob> {
    return this.httpClient.get(`${this.apiUrl}/${id}/download`, { responseType: 'blob' });
  }

  deleteReport(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
