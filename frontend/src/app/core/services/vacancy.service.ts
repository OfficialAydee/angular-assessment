import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { VacancyModel } from '../models/vacancy/vacancy.model';

@Injectable({
  providedIn: 'root',
})
export class VacancyService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/vacancies`;

  getVacancies() {
    return this.http.get<VacancyModel[]>(`${this.apiUrl}`);
  }

  getVacanciesByCompany(companyId: string) {
    return this.http.get<VacancyModel[]>(`${this.apiUrl}?companyId=${companyId}`);
  }

  createVacancy(vacancy: VacancyModel) {
    return this.http.post<VacancyModel>(`${this.apiUrl}`, vacancy);
  }

  updateVacancy(vacancy: VacancyModel) {
    return this.http.put<VacancyModel>(`${this.apiUrl}/${vacancy.id}`, vacancy);
  }

  deleteVacancy(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
