import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterData {
  username: string;
  password: string;
  password2?: string;
  email?: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root'
})
export class BreederService {
  private readonly api = '/api';

  constructor(private http: HttpClient) {}

  register(data: RegisterData): Observable<unknown> {
    return this.http.post(`${this.api}/auth/register/`, data);
  }

  login(username: string, password: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.api}/token/`, { username, password });
  }

  refresh(refresh: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.api}/token/refresh/`, { refresh });
  }
}
