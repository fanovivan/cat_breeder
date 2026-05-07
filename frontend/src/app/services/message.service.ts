import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MessageRecord {
  id: number;
  sender: number;
  sender_username: string;
  text: string;
  created_at: string;
}

@Injectable({ providedIn: 'root' })
export class MessageService {
  private readonly url = '/api/messages/';

  constructor(private http: HttpClient) {}

  list(): Observable<MessageRecord[]> {
    return this.http.get<MessageRecord[]>(this.url);
  }
}
