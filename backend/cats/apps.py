from django.apps import AppConfig
from django.db.models.signals import post_migrate


DEFAULT_BREEDS = (
    "Сиамская",
    "Мейн-кун",
    "Британская",
    "Дворовая",
    "Сфинкс",
    "Персидская",
)


def ensure_default_breeds(sender, **kwargs):
    # Import inside signal handler to avoid touching models before app loading.
    from .models import Breed

    for name in DEFAULT_BREEDS:
        Breed.objects.get_or_create(name=name)


class CatsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend.cats'

    def ready(self):
        post_migrate.connect(
            ensure_default_breeds,
            sender=self,
            dispatch_uid="cats.ensure_default_breeds",
        )