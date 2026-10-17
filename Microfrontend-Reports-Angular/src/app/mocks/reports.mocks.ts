import { Report } from '../interfaces/reports.interface';

export const REPORTS_MOCK: Report[] = [
  {
    id: 'report-1',
    name: 'Usuarios de octubre',
    type: 'USERS_SUMMARY',
    filters: { count: 10 },
    requestedBy: '1',
    status: 'COMPLETED',
    format: 'PDF',
    fileUrl: '/api/reports/report-1/download',
    errorMessage: null,
    startedAt: '2026-10-16T12:00:00.000Z',
    completedAt: '2026-10-16T12:00:01.000Z',
    createdAt: '2026-10-16T12:00:00.000Z',
    updatedAt: '2026-10-16T12:00:01.000Z',
  },
  {
    id: 'report-2',
    name: 'Actividad',
    type: 'ACTIVITY',
    filters: { count: 5 },
    requestedBy: '1',
    status: 'PROCESSING',
    format: 'CSV',
    fileUrl: null,
    errorMessage: null,
    startedAt: '2026-10-16T12:01:00.000Z',
    completedAt: null,
    createdAt: '2026-10-16T12:01:00.000Z',
    updatedAt: '2026-10-16T12:01:00.000Z',
  },
];
