import { Component, inject, signal } from '@angular/core';
import { CompanyModel } from '../../../core/models/company/company.model';
import { CompanyService } from '../../../core/services/company.service';

@Component({
  selector: 'app-companies',
  imports: [],
  templateUrl: './companies.html',
  styleUrl: './companies.scss',
})
export class Companies {
  private readonly companyService = inject(CompanyService);

  companies = signal<CompanyModel[]>([]);

  ngOnInit() {
    this.companyService.getCompanies().subscribe({
      next: (response) => {
        this.companies.set(response);
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
