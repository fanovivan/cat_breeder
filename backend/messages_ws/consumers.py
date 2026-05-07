import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import AnonymousUser

from .models import Message


@database_sync_to_async
def persist_message(sender_id, text):
    return Message.objects.create(sender_id=sender_id, text=text)


class ChatConsumer(AsyncWebsocketConsumer):
    room_group_name = "chat_breeders"

    async def connect(self):
        user = self.scope.get("user")
        if isinstance(user, AnonymousUser) or not getattr(user, "is_authenticated", False):
            await self.close(code=4001)
            return

        self.user = user

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        payload = json.loads(text_data)
        text = (payload.get("text") or "").strip()
        if not text:
            return

        await persist_message(self.user.pk, text)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat.message",
                "text": text,
                "sender_id": self.user.pk,
                "sender_username": self.user.get_username(),
            },
        )

    async def chat_message(self, event):
        await self.send(
            text_data=json.dumps(
                {
                    "text": event["text"],
                    "sender_id": event["sender_id"],
                    "sender_username": event["sender_username"],
                }
            )
        )
