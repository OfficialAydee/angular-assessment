import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CompanyModel } from '../models/company/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private readonly http = inject(HttpClient);

  getCompanies() {
    return this.http.get<CompanyModel[]>(`${environment.apiUrl}/companies`);
  }

  createCompany(company: CompanyModel) {
    return this.http.post<CompanyModel>(
      `${environment.apiUrl}/companies`,

      company,
    );
  }

  updateCompany(company: CompanyModel) {
    return this.http.put<CompanyModel>(
      `${environment.apiUrl}/companies/${company.id}`,

      company,
    );
  }

  deleteCompany(id: string) {
    return this.http.delete(`${environment.apiUrl}/companies/${id}`);
  }
}
