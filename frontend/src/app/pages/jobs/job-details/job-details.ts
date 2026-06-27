import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CompanyModel } from '../../../core/models/company/company.model';
import { VacancyModel } from '../../../core/models/vacancy/vacancy.model';
import { CompanyService } from '../../../core/services/company.service';
import { VacancyService } from '../../../core/services/vacancy.service';

@Component({
  selector: 'app-job-details',
  imports: [RouterLink],
  templateUrl: './job-details.html',
  styleUrl: './job-details.scss',
})
export class JobDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly companyService = inject(CompanyService);
  private readonly vacancyService = inject(VacancyService);

  companyId = '';
  vacancyId = '';
  company = signal<CompanyModel | null>(null);
  vacancy = signal<VacancyModel | null>(null);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get('companyId') ?? '';
    this.vacancyId = this.route.snapshot.paramMap.get('vacancyId') ?? '';
    this.loadData();
  }

  private loadData() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.companyService.getCompany(this.companyId).subscribe({
      next: (company) => {
        this.company.set(company);
        this.loadVacancy();
      },
      error: () => {
        this.errorMessage.set('Informatie kon niet worden geladen.');
        this.isLoading.set(false);
      },
    });
  }

  private loadVacancy() {
    this.vacancyService.getVacancy(this.vacancyId).subscribe({
      next: (vacancy) => {
        if (!vacancy.isActive) {
          this.errorMessage.set('Deze vacature is niet meer actief.');
          this.isLoading.set(false);
          return;
        }
        this.vacancy.set(vacancy);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Vacature kon niet worden geladen.');
        this.isLoading.set(false);
      },
    });
  }
}
