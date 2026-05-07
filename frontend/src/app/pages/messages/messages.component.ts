import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WebsocketService, ChatPayload } from '../../services/websocket';
import { MessageService, MessageRecord } from '../../services/message.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit, OnDestroy {
  text = '';
  messages: ChatPayload[] = [];
  private sub?: Subscription;

  constructor(
    private ws: WebsocketService,
    private messageApi: MessageService
  ) {}

  ngOnInit(): void {
    this.messageApi.list().subscribe((rows) => {
      this.messages = rows.map((r) => ({
        text: r.text,
        sender_id: r.sender,
        sender_username: r.sender_username
      }));
    });

    this.ws.connect();
    this.sub = this.ws.messages().subscribe((msg) => this.messages.push(msg));
  }

  send(): void {
    const t = this.text.trim();
    if (!t) {
      return;
    }
    this.ws.sendText(t);
    this.text = '';
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.ws.disconnect();
  }
}
