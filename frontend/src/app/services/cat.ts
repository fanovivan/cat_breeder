import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cat {
  id: number;
  name: string;
  age: number;
  breed: number | null;
  hairiness: string;
  breeder?: number;
  breeder_username?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private readonly baseUrl = '/api/cats/';

  constructor(private http: HttpClient) {}

  getCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>(this.baseUrl);
  }

  createCat(cat: Partial<Cat>): Observable<Cat> {
    return this.http.post<Cat>(this.baseUrl, cat);
  }

  updateCat(id: number, cat: Partial<Cat>): Observable<Cat> {
    return this.http.patch<Cat>(`${this.baseUrl}${id}/`, cat);
  }

  deleteCat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}/`);
  }
}
