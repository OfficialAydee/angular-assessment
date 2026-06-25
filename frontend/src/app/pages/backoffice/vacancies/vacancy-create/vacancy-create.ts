import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VacancyService } from '../../../../core/services/vacancy.service';

@Component({
  selector: 'app-vacancy-create',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './vacancy-create.html',
  styleUrl: './vacancy-create.scss',
})
export class VacancyCreate {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly vacancyService = inject(VacancyService);

  companyId = this.route.snapshot.paramMap.get('companyId') ?? '';

  vacancyForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    isActive: [true],
  });

  submit() {
    if (this.vacancyForm.invalid) {
      this.vacancyForm.markAllAsTouched();
      return;
    }

    this.vacancyService
      .createVacancy({
        id: '',
        companyId: this.companyId,
        ...this.vacancyForm.getRawValue(),
      })

      .subscribe({
        next: () => {
          this.router.navigate(['/backoffice/companies', this.companyId]);
        },
      });
  }
}
