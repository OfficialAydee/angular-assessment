import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CompanyModel } from '../../../../core/models/company/company.model';
import { VacancyModel } from '../../../../core/models/vacancy/vacancy.model';
import { CompanyService } from '../../../../core/services/company.service';
import { VacancyService } from '../../../../core/services/vacancy.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-company-details',
  imports: [RouterLink],
  templateUrl: './company-details.html',
  styleUrl: './company-details.scss',
})
export class CompanyDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly modalService = inject(NgbModal);
  private readonly companyService = inject(CompanyService);
  private readonly vacancyService = inject(VacancyService);

  company = signal<CompanyModel | null>(null);
  vacancies = signal<VacancyModel[]>([]);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  companyId = '';

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get('companyId') ?? '';
    this.loadCompany();
    this.loadVacancies();
  }

  private loadCompany() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.companyService.getCompany(this.companyId).subscribe({
      next: (company) => {
        this.company.set(company);
        this.isLoading.set(false);
      },

      error: () => {
        this.errorMessage.set('Unable to load company.');
        this.isLoading.set(false);
      },
    });
  }

  private loadVacancies() {
    this.vacancyService.getVacanciesByCompany(this.companyId).subscribe({
      next: (vacancies) => {
        this.vacancies.set(vacancies);
      },

      error: () => {
        this.errorMessage.set('Unable to load vacancies.');
      },
    });
  }

  deleteCompany() {
    const company = this.company();

    if (!company) {
      return;
    }

    const modalRef = this.modalService.open(ConfirmDialog, {
      centered: true,
    });

    modalRef.componentInstance.title = 'Bedrijf verwijderen';
    modalRef.componentInstance.message = `Weet je zeker dat je ${company.name} wilt verwijderen?`;

    modalRef.closed.subscribe(() => {
      this.companyService.deleteCompany(company.id).subscribe({
        next: () => this.router.navigate(['/backoffice/companies']),
      });
    });
  }
}
