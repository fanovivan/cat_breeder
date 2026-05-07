from django.db import migrations


def seed_breeds(apps, schema_editor):
    Breed = apps.get_model("cats", "Breed")
    for name in (
        "Сиамская",
        "Мейн-кун",
        "Британская",
        "Дворовая",
        "Сфинкс",
        "Персидская",
    ):
        Breed.objects.get_or_create(name=name)


def unseed(apps, schema_editor):
    Breed = apps.get_model("cats", "Breed")
    Breed.objects.all().delete()


class Migration(migrations.Migration):
    dependencies = [
        ("cats", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_breeds, unseed),
    ]
