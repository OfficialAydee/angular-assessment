import { Component, inject, signal } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { VacancyModel } from '../../../core/models/vacancy/vacancy.model';
import { VacancyService } from '../../../core/services/vacancy.service';
import { VacancyForm, VacancyFormData } from '../../../shared/components/vacancy-form/vacancy-form';

@Component({
  selector: 'app-job-edit',
  imports: [RouterLink, VacancyForm],
  templateUrl: './job-edit.html',
  styleUrl: './job-edit.scss',
})
export class JobEdit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly vacancyService = inject(VacancyService);

  companyId = '';
  vacancyId = '';

  vacancy = signal<VacancyModel | null>(null);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get('companyId') ?? '';
    this.vacancyId = this.route.snapshot.paramMap.get('vacancyId') ?? '';
    this.loadVacancy();
  }

  private loadVacancy() {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.vacancyService.getVacancy(this.vacancyId).subscribe({
      next: (vacancy) => {
        this.vacancy.set(vacancy);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Vacature kon niet worden geladen.');
        this.isLoading.set(false);
      },
    });
  }

  updateVacancy(value: VacancyFormData) {
    this.vacancyService
      .updateVacancy({
        id: this.vacancyId,
        companyId: this.companyId,
        ...value,
        isActive: true,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/jobs', this.companyId, 'vacancies', this.vacancyId]);
        },
      });
  }

  cancel() {
    this.router.navigate(['/jobs', this.companyId, 'vacancies', this.vacancyId]);
  }
}
