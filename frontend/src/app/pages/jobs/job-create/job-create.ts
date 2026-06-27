import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { VacancyService } from '../../../core/services/vacancy.service';
import { VacancyForm } from '../../../shared/components/vacancy-form/vacancy-form';
import { VacancyModel } from '../../../core/models/vacancy/vacancy.model';

type VacancyFormData = Omit<VacancyModel, 'id' | 'companyId'>;

@Component({
  selector: 'app-job-create',
  imports: [RouterLink, VacancyForm],
  templateUrl: './job-create.html',
  styleUrl: './job-create.scss',
})
export class JobCreate {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly vacancyService = inject(VacancyService);

  readonly companyId = this.route.snapshot.paramMap.get('companyId') ?? '';

  createVacancy(value: VacancyFormData) {
    this.vacancyService
      .createVacancy({
        id: '',
        companyId: this.companyId,
        ...value,
        isActive: true,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/jobs']);
        },
      });
  }

  cancel() {
    this.router.navigate(['/jobs']);
  }
}
