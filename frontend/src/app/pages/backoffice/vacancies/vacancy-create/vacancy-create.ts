import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VacancyService } from '../../../../core/services/vacancy.service';
import {
  VacancyForm,
  VacancyFormData,
} from '../../../../shared/components/vacancy-form/vacancy-form';

@Component({
  selector: 'app-vacancy-create',
  imports: [RouterLink, VacancyForm],
  templateUrl: './vacancy-create.html',
  styleUrl: './vacancy-create.scss',
})
export class VacancyCreate {
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
      })

      .subscribe({
        next: () => {
          this.router.navigate(['/backoffice/companies', this.companyId]);
        },
      });
  }

  cancel() {
    this.router.navigate(['/backoffice/companies', this.companyId]);
  }
}
