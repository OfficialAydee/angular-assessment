import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VacancyModel } from '../../../../core/models/vacancy/vacancy.model';
import { VacancyService } from '../../../../core/services/vacancy.service';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-vacancy-details',
  imports: [RouterLink],
  templateUrl: './vacancy-details.html',
  styleUrl: './vacancy-details.scss',
})
export class VacancyDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly modalService = inject(NgbModal);
  private readonly vacancyService = inject(VacancyService);

  companyId = '';
  vacancyId = '';
  vacancy = signal<VacancyModel | null>(null);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get('companyId') ?? '';
    this.vacancyId = this.route.snapshot.paramMap.get('vacancyId') ?? '';
    this.loadVacancy();
  }

  private loadVacancy() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.vacancyService.getVacancy(this.vacancyId).subscribe({
      next: (vacancy: VacancyModel) => {
        this.vacancy.set(vacancy);
        this.isLoading.set(false);
      },

      error: () => {
        this.errorMessage.set('Unable to load vacancy.');
        this.isLoading.set(false);
      },
    });
  }

  deleteVacancy() {
    const vacancy = this.vacancy();
    if (!vacancy) {
      return;
    }

    const modalRef = this.modalService.open(ConfirmDialog, {
      centered: true,
    });

    modalRef.componentInstance.title = 'Vacature verwijderen';
    modalRef.componentInstance.message = `Weet je zeker dat je "${vacancy.title}" wilt verwijderen?`;

    modalRef.closed.subscribe(() => {
      this.vacancyService.deleteVacancy(vacancy.id).subscribe({
        next: () => {
          this.router.navigate(['/backoffice/companies', this.companyId]);
        },
      });
    });
  }
}
