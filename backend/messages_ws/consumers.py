from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer

from breeders.models import Breeder
from .models import Message


class ChatConsumer(AsyncJsonWebsocketConsumer):
    group_name = 'global_chat'

    async def connect(self):
        user = self.scope.get('user')
        if not user or not user.is_authenticated:
            await self.close()
            return

        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive_json(self, content, **kwargs):
        sender_id = content.get('sender_id')
        text = (content.get('text') or '').strip()

        if not sender_id or not text:
            await self.send_json({'type': 'error', 'message': 'sender_id и text обязательны'})
            return

        sender = await self.get_sender(sender_id)
        if sender is None:
            await self.send_json({'type': 'error', 'message': 'Пользователь не найден'})
            return

        message = await self.save_message(sender, text)

        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'chat.message',
                'id': message.id,
                'sender_id': sender.id,
                'sender_username': sender.username,
                'text': message.text,
                'created_at': message.created_at.isoformat(),
            }
        )

    async def chat_message(self, event):
        await self.send_json({
            'type': 'message',
            'id': event['id'],
            'sender_id': event['sender_id'],
            'sender_username': event['sender_username'],
            'text': event['text'],
            'created_at': event['created_at'],
        })

    @database_sync_to_async
    def get_sender(self, sender_id):
        try:
            return Breeder.objects.get(id=sender_id)
        except Breeder.DoesNotExist:
            return None

    @database_sync_to_async
    def save_message(self, sender, text):
        return Message.objects.create(sender=sender, text=text)
