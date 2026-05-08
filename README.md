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
```bash
cp .env.example .env
docker compose up -d --build
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
- `ws://localhost:8000/ws/chat/?token=<access_token>`

## Локальная разработка
### Backend
```bash
cd .
python -m venv venv
source venv/bin/activate  # Linux/macOS
# .\venv\Scripts\Activate.ps1  # Windows PowerShell
pip install -r backend/requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Деплой на VPS (домен + SSL)
1. Купите домен у любого регистратора и создайте `A`-запись на IP сервера.
2. На сервере установите nginx и certbot:
   ```bash
   sudo apt update
   sudo apt install -y nginx certbot python3-certbot-nginx
   ```
3. Скопируйте nginx-конфиг из репозитория:
   ```bash
   sudo cp deploy/nginx/cat-breeder-remote.conf /etc/nginx/sites-available/cat-breeder
   sudo ln -sf /etc/nginx/sites-available/cat-breeder /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```
4. Выпустите сертификат Let's Encrypt:
   ```bash
   sudo certbot --nginx -d your-domain.ru -d www.your-domain.ru
   ```
5. В backend-переменных укажите домен:
   - `ALLOWED_HOSTS=your-domain.ru,www.your-domain.ru`
   - `CORS_ALLOWED_ORIGINS=https://your-domain.ru,https://www.your-domain.ru`
   - `CSRF_TRUSTED_ORIGINS=https://your-domain.ru,https://www.your-domain.ru`
6. Перезапустите контейнеры после правок `.env`:
   ```bash
   docker compose up -d --build backend frontend
   ```
