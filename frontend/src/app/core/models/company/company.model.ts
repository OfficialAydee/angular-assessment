export interface CompanyModel {
  id: string;
  name: string;
  websiteUrl: string;
  street: string;
  houseNumber: string;
  houseNumberAddition?: string;
  postalCode: string;
  city: string;
  country: string;
}
