import { Injectable, signal } from '@angular/core';

export type UserRole = 'web' | 'backoffice';

export interface CurrentUser {
  id: string;
  name: string;
  role: UserRole;
  companyId: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly currentUser = signal<CurrentUser>({
    id: '1',
    name: 'Demo Web User',
    role: 'web',
    companyId: '1',
  });

  canManageCompany(companyId: string): boolean {
    const user = this.currentUser();

    return user.role === 'web' && user.companyId === companyId;
  }
}
