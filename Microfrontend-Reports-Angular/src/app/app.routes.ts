import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/reports/reports.page').then((module) => module.ReportsPage),
  },
];
