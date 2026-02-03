import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CmsServiceService } from '../services/cms-service.service';

const AUTH_KEY = 'mytel-cms-auth';
// const VALID_USERNAME = 'cms-admin-new-got-talent';
// const VALID_PASSWORD = 'CmsGotTalent2026@AdmiNnew';
const TOKEN_KEY = 'cms-token';
@Injectable({ providedIn: 'root' })
export class AuthService {
  saveTokens(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem('mytel-cms-auth', 'true');
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.clear();
  }
}
