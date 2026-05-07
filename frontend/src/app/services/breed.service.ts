import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Breed {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class BreedService {
  private readonly url = '/api/breeds/';

  constructor(private http: HttpClient) {}

  list(): Observable<Breed[]> {
    return this.http.get<Breed[]>(this.url);
  }
}
