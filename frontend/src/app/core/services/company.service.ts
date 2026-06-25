import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CompanyModel } from '../models/company/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/companies`;

  getCompanies() {
    return this.http.get<CompanyModel[]>(`${this.apiUrl}`);
  }

  getCompany(id: string) {
    return this.http.get<CompanyModel>(`${this.apiUrl}/${id}`);
  }

  createCompany(company: CompanyModel) {
    return this.http.post<CompanyModel>(`${this.apiUrl}`, company);
  }

  updateCompany(company: CompanyModel) {
    return this.http.put<CompanyModel>(`${this.apiUrl}/${company.id}`, company);
  }

  deleteCompany(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
