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
        path: 'backoffice/companies',
        title: 'Companies | Vacaturepunt',
        loadComponent: () =>
          import('./pages/backoffice/companies/company-overview/company-overview').then(
            (m) => m.CompanyOverview,
          ),
      },
      {
        path: 'backoffice/companies/create',
        title: 'Create company | Vacaturepunt',
        loadComponent: () =>
          import('./pages/backoffice/companies/company-create/company-create').then(
            (m) => m.CompanyCreate,
          ),
      },
      {
        path: 'backoffice/companies/:companyId',
        title: 'Company detail | Vacaturepunt',
        loadComponent: () =>
          import('./pages/backoffice/companies/company-details/company-details').then(
            (m) => m.CompanyDetails,
          ),
      },
      {
        path: 'backoffice/companies/:companyId/edit',
        title: 'Edit company | Vacaturepunt',
        loadComponent: () =>
          import('./pages/backoffice/companies/company-edit/company-edit').then(
            (m) => m.CompanyEdit,
          ),
      },
      {
        path: 'backoffice/companies/:companyId/vacancies/create',
        title: 'Create vacancy | Vacaturepunt',
        loadComponent: () =>
          import('./pages/backoffice/vacancies/vacancy-create/vacancy-create').then(
            (m) => m.VacancyCreate,
          ),
      },
      {
        path: 'backoffice/companies/:companyId/vacancies/:vacancyId',
        title: 'Vacancy details | Vacaturepunt',
        loadComponent: () =>
          import('./pages/backoffice/vacancies/vacancy-details/vacancy-details').then(
            (m) => m.VacancyDetails,
          ),
      },
      {
        path: 'backoffice/companies/:companyId/vacancies/:vacancyId/edit',
        title: 'Edit vacancy | Vacaturepunt',
        loadComponent: () =>
          import('./pages/backoffice/vacancies/vacancy-edit/vacancy-edit').then(
            (m) => m.VacancyEdit,
          ),
      },
      {
        path: 'jobs',
        title: 'Jobs | Vacaturepunt',
        loadComponent: () =>
          import('./pages/jobs/job-overview/job-overview').then((m) => m.JobOverview),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'jobs',
  },
];
