import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterData {
  username: string;
  password: string;
  password2?: string;
  email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BreederService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  register(data: RegisterData): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/`, data);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/token/`, { username, password });
  }

  refresh(refresh: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/token/refresh/`, { refresh });
  }
}
