import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../../core/services/company.service';

@Component({
  selector: 'app-company-edit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './company-edit.html',
  styleUrl: './company-edit.scss',
})
export class CompanyEdit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly companyService = inject(CompanyService);

  companyId = '';
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
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

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get('companyId') ?? '';
    this.loadCompany();
  }

  private loadCompany() {
    this.isLoading.set(true);

    this.companyService.getCompany(this.companyId).subscribe({
      next: (company) => {
        this.companyForm.patchValue(company);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Unable to load company.');
        this.isLoading.set(false);
      },
    });
  }

  submit() {
    if (this.companyForm.invalid) {
      this.companyForm.markAllAsTouched();
      return;
    }

    this.companyService
      .updateCompany({
        id: this.companyId,
        ...this.companyForm.getRawValue(),
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/backoffice/companies', this.companyId]);
        },
      });
  }
}
