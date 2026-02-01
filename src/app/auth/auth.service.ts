import { Injectable } from '@angular/core';

const AUTH_KEY = 'mytel-cms-auth';
const VALID_USERNAME = 'admin';
const VALID_PASSWORD = '12345';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuthenticated(): boolean {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  }

  login(username: string, password: string): boolean {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem(AUTH_KEY);
  }
}
