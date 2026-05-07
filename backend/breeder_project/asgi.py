import os

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application

from backend.breeder_project.jwt_websocket_middleware import JWTWebsocketMiddleware
from backend.breeder_project import routing as ws_routing

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.breeder_project.settings")

django_application = get_asgi_application()

application = ProtocolTypeRouter(
    {
        "http": django_application,
        "websocket": AllowedHostsOriginValidator(
            JWTWebsocketMiddleware(URLRouter(ws_routing.websocket_urlpatterns))
        ),
    }
)
