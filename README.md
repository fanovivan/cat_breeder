# Cat Breeder Service

Простой сервис для заводчиков котов с регистрацией, CRUD‑котов и WebSocket‑чатом.

## Технологии

- Бэкенд: Django 4.2, Django REST Framework, JWT, Django Channels.
- Фронтенд: Angular 8+.
- БД: PostgreSQL.
- Кеширование/WS: Redis.
- Упаковка: Docker.

## Запуск локально

1. Установи Docker и Docker Compose.
2. Создай `.env`‑файл (пример в `settings.py` выше).
3. В корне проекта:

```bash
docker-compose up --build
```

Бэкенд: `http://localhost:8000`  
Фронтенд: `http://localhost`

## API‑конечные точки

- `POST /api/register/` — регистрация заводчика.
- `GET /api/cats/` — список котов текущего пользователя.
- `POST /api/cats/` — создание кота (только свои).
- `PUT /api/cats/<id>/` — редактирование.
- `DELETE /api/cats/<id>/` — удаление.

## WebSocket

- `ws://localhost:8000/ws/chat/` — общий чат заводчиков (сообщения сохраняются в БД).

##

cat_breeder/
├── backend/                  # Django + DRF + Channels
│   ├── cats/
│   ├── breeders/
│   └── messages/
├── frontend/                 # Angular 8+
├── docker-compose.yml
├── Dockerfile.backend
├── Dockerfile.frontend
└── requirements.txt