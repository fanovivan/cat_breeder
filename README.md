# Cat Breeder Service

Простейший сервис для заводчиков котов на Django + DRF + Angular + WebSocket.

## Стек
- Backend: Django 4.2, Django REST Framework, JWT
- WebSocket: Django Channels
- Frontend: Angular
- Database: PostgreSQL
- Cache/Channels layer: Redis
- Containerization: Docker, Docker Compose

## Функционал
- Регистрация пользователя как заводчика
- JWT-авторизация
- Создание, редактирование, удаление котов
- Видимость только своих котов
- Раздел сообщений по WebSocket

## Запуск в Docker
```bashcd
docker compose up --build
```

После запуска:
- Frontend: http://localhost:4200
- Backend API: http://localhost:8000

## Основные API
- POST `/api/auth/register/`
- POST `/api/token/`
- POST `/api/token/refresh/`
- GET/POST `/api/cats/`
- GET/PATCH/DELETE `/api/cats/<id>/`
- GET `/api/breeds/`
- GET `/api/messages/`

## WebSocket
- `ws://localhost:8000/ws/chat/`

## Локальная разработка
### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
ng serve
```
