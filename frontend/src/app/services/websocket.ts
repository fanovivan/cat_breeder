import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';

export interface ChatPayload {
  text: string;
  sender_id?: number;
  sender_username?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: WebSocket | null = null;
  private readonly messagesSubject = new Subject<ChatPayload>();

  constructor(private auth: AuthService) {}

  connect(): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      return;
    }

    const token = this.auth.accessToken;
    if (!token) {
      return;
    }

    const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const url = `${proto}//${window.location.host}/ws/chat/?token=${encodeURIComponent(token)}`;

    this.socket = new WebSocket(url);

    this.socket.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data as string) as ChatPayload;
      this.messagesSubject.next(data);
    };

    this.socket.onclose = () => {
      this.socket = null;
    };
  }

  sendText(text: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ text }));
    }
  }

  messages(): Observable<ChatPayload> {
    return this.messagesSubject.asObservable();
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}
