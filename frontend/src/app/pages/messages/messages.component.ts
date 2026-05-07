import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebsocketService, ChatMessage } from '../../services/websocket';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit, OnDestroy {
  senderId = 1;
  text = '';
  messages: ChatMessage[] = [];

  constructor(private ws: WebsocketService) {}

  ngOnInit(): void {
    this.ws.connect();
    this.ws.messages().subscribe(msg => this.messages.push(msg));
  }

  send(): void {
    this.ws.sendMessage({
      sender_id: this.senderId,
      text: this.text
    });
    this.text = '';
  }

  ngOnDestroy(): void {
    this.ws.disconnect();
  }
}