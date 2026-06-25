import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CompanyService } from '../../../../core/services/company.service';

@Component({
  selector: 'app-company-create',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './company-create.html',
  styleUrl: './company-create.scss',
})
export class CompanyCreate {
  private readonly fb = inject(FormBuilder);

  private readonly router = inject(Router);

  private readonly companyService = inject(CompanyService);

  companyForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    websiteUrl: [''],
    street: ['', Validators.required],
    houseNumber: ['', Validators.required],
    houseNumberAddition: [''],
    postalCode: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
  });

  submit() {
    if (this.companyForm.invalid) {
      this.companyForm.markAllAsTouched();
      return;
    }

    this.companyService
      .createCompany({
        id: '',
        ...this.companyForm.getRawValue(),
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/backoffice/companies']);
        },
      });
  }
}
