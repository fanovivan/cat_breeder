import { Injectable } from '@angular/core';

const ACCESS_KEY = 'access';
const REFRESH_KEY = 'refresh';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private accessCache: string | null = null;

  get accessToken(): string | null {
    if (this.accessCache === null) {
      this.accessCache = sessionStorage.getItem(ACCESS_KEY);
    }
    return this.accessCache;
  }

  get refreshToken(): string | null {
    return sessionStorage.getItem(REFRESH_KEY);
  }

  setTokens(access: string, refresh?: string): void {
    sessionStorage.setItem(ACCESS_KEY, access);
    if (refresh) {
      sessionStorage.setItem(REFRESH_KEY, refresh);
    }
    this.accessCache = access;
  }

  clear(): void {
    sessionStorage.removeItem(ACCESS_KEY);
    sessionStorage.removeItem(REFRESH_KEY);
    this.accessCache = null;
  }

  get isLoggedIn(): boolean {
    return !!this.accessToken;
  }
}
