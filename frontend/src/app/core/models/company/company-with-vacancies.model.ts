import { CompanyModel } from './company.model';
import { VacancyModel } from '../vacancy/vacancy.model';

export interface CompanyWithVacanciesModel extends CompanyModel {
  vacancies: VacancyModel[];
}
