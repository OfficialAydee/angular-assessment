import { Component, computed, inject, signal } from '@angular/core';
import { CompanyWithVacanciesModel } from '../../../core/models/company/company-with-vacancies.model';
import { CompanyModel } from '../../../core/models/company/company.model';
import { VacancyModel } from '../../../core/models/vacancy/vacancy.model';
import { CompanyService } from '../../../core/services/company.service';
import { VacancyService } from '../../../core/services/vacancy.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-job-overview',
  imports: [RouterLink],
  templateUrl: './job-overview.html',
  styleUrl: './job-overview.scss',
})
export class JobOverview {
  private readonly companyService = inject(CompanyService);
  private readonly vacancyService = inject(VacancyService);

  private readonly authService = inject(AuthService);

  companies = signal<CompanyModel[]>([]);
  vacancies = signal<VacancyModel[]>([]);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  companiesWithActiveVacancies = computed<CompanyWithVacanciesModel[]>(() => {
    return this.companies()
      .map((company) => {
        const activeVacancies = this.vacancies().filter(
          (vacancy) => vacancy.companyId === company.id && vacancy.isActive,
        );
        return {
          ...company,
          vacancies: activeVacancies,
        };
      })
      .filter((company) => company.vacancies.length > 0);
  });

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.companyService.getCompanies().subscribe({
      next: (companies) => {
        this.companies.set(companies);
        this.loadVacancies();
      },

      error: () => {
        this.errorMessage.set('Bedrijven konden niet worden geladen.');
        this.isLoading.set(false);
      },
    });
  }

  private loadVacancies() {
    this.vacancyService.getVacancies().subscribe({
      next: (vacancies) => {
        this.vacancies.set(vacancies);
        this.isLoading.set(false);
      },

      error: () => {
        this.errorMessage.set('Vacatures konden niet worden geladen.');
        this.isLoading.set(false);
      },
    });
  }

  canCreateVacancy(companyId: string): boolean {
    return this.authService.canManageCompany(companyId);
  }
}
