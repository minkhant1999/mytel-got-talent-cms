import { Injectable } from '@angular/core';

const AUTH_KEY = 'mytel-cms-auth';
const VALID_USERNAME = 'cms-admin-new-got-talent';
const VALID_PASSWORD = 'CmsGotTalent2026@AdmiNnew';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuthenticated(): boolean {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  }

  login(username: string, password: string): boolean {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      localStorage.setItem('username', VALID_USERNAME);
      localStorage.setItem('password', VALID_PASSWORD);
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem(AUTH_KEY);
  }
}
