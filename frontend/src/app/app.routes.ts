import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        redirectTo: 'jobs',
        pathMatch: 'full',
      },
      {
        path: 'jobs',
        loadComponent: () => import('./pages/jobs/jobs').then((m) => m.Jobs),
      },
      {
        path: 'create-vacancy',
        loadComponent: () =>
          import('./pages/create-vacancy/create-vacancy').then((m) => m.CreateVacancy),
      },
      {
        path: 'backoffice/companies',
        loadComponent: () =>
          import('./pages/backoffice/companies/companies').then((m) => m.Companies),
      },
      {
        path: 'backoffice/vacancies',
        loadComponent: () =>
          import('./pages/backoffice/vacancies/vacancies').then((m) => m.Vacancies),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'jobs',
  },
];
