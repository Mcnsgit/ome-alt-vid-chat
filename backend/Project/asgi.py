import os
import django
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from api.middleware import JWTAuthMiddleware
from channels.auth import AuthMiddlewareStack
from videochat import routings as video_routing

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Project.settings")

# Initialize Django and set up the app registry
django.setup()  # This ensures that the apps are fully loaded before proceeding

# Now it's safe to import middleware and other Django-dependent modules

django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket": AllowedHostsOriginValidator(
            JWTAuthMiddleware(
                AuthMiddlewareStack(URLRouter(video_routing.websocket_urlpatterns))
            )
        ),
    }
)
