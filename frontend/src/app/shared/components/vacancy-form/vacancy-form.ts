import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VacancyModel } from '../../../core/models/vacancy/vacancy.model';

export type VacancyFormData = Omit<VacancyModel, 'id' | 'companyId'>;

@Component({
  selector: 'app-vacancy-form',
  imports: [ReactiveFormsModule],
  exportAs: 'app-vacancy-form',
  templateUrl: './vacancy-form.html',
  styleUrl: './vacancy-form.scss',
})
export class VacancyForm {
  private readonly fb = inject(FormBuilder);

  readonly vacancy = input<VacancyModel | null>(null);
  readonly submitLabel = input('Opslaan');
  readonly showActiveField = input(true);

  readonly formSubmit = output<VacancyFormData>();
  readonly cancel = output<void>();

  readonly vacancyForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    location: [''],
    salary: [''],
    description: ['', Validators.required],
    isActive: [true],
  });

  constructor() {
    effect(() => {
      const vacancy = this.vacancy();

      if (!vacancy) {
        return;
      }

      this.vacancyForm.patchValue({
        title: vacancy.title,
        location: vacancy.location,
        salary: vacancy.salary,
        description: vacancy.description,
        isActive: vacancy.isActive,
      });
    });
  }

  submit() {
    if (this.vacancyForm.invalid) {
      this.vacancyForm.markAllAsTouched();
      return;
    }
    this.formSubmit.emit(this.vacancyForm.getRawValue());
  }

  onCancel() {
    this.cancel.emit();
  }
}
