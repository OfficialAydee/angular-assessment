import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { VacancyService } from '../../../../core/services/vacancy.service';

@Component({
  selector: 'app-vacancy-edit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './vacancy-edit.html',
  styleUrl: './vacancy-edit.scss',
})
export class VacancyEdit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly vacancyService = inject(VacancyService);

  companyId = '';
  vacancyId = '';
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  vacancyForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    location: ['', Validators.required],
    salary: ['', Validators.required],
    isActive: [true],
  });

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
        this.vacancyForm.patchValue({
          title: vacancy.title,
          description: vacancy.description,
          location: vacancy.location,
          salary: vacancy.salary,
          isActive: vacancy.isActive,
        });
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Unable to load vacancy.');
        this.isLoading.set(false);
      },
    });
  }

  submit() {
    if (this.vacancyForm.invalid) {
      this.vacancyForm.markAllAsTouched();
      return;
    }

    this.vacancyService
      .updateVacancy({
        id: this.vacancyId,
        companyId: this.companyId,
        ...this.vacancyForm.getRawValue(),
      })
      .subscribe({
        next: () => {
          this.router.navigate([
            '/backoffice/companies',
            this.companyId,
            'vacancies',
            this.vacancyId,
          ]);
        },
      });
  }
}
