import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { VacancyModel } from '../models/vacancy/vacancy.model';

@Injectable({
  providedIn: 'root',
})
export class Vacancy {
  private readonly http = inject(HttpClient);

  getVacancies() {
    return this.http.get<VacancyModel[]>(`${environment.apiUrl}/vacancies`);
  }

  createVacancy(vacancy: VacancyModel) {
    return this.http.post<VacancyModel>(
      `${environment.apiUrl}/vacancies`,

      vacancy,
    );
  }

  updateVacancy(vacancy: VacancyModel) {
    return this.http.put<VacancyModel>(
      `${environment.apiUrl}/vacancies/${vacancy.id}`,

      vacancy,
    );
  }

  deleteVacancy(id: string) {
    return this.http.delete(`${environment.apiUrl}/vacancies/${id}`);
  }
}
