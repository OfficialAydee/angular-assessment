import { Component, inject, signal } from '@angular/core';
import { CompanyModel } from '../../../../core/models/company/company.model';
import { CompanyService } from '../../../../core/services/company.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-company-overview',
  imports: [RouterLink],
  templateUrl: './company-overview.html',
  styleUrl: './company-overview.scss',
})
export class CompanyOverview {
  private readonly companyService = inject(CompanyService);

  companies = signal<CompanyModel[]>([]);

  isLoading = signal(false);

  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.loadCompanies();
  }

  private loadCompanies() {
    this.isLoading.set(true);

    this.errorMessage.set(null);

    this.companyService.getCompanies().subscribe({
      next: (companies) => {
        this.companies.set(companies);

        this.isLoading.set(false);
      },

      error: () => {
        this.errorMessage.set('Unable to load companies.');

        this.isLoading.set(false);
      },
    });
  }
}
