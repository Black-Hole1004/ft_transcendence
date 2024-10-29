from django.db import migrations

def populate_gamemode(apps, schema_editor):
    GameMode = apps.get_model('game', 'GameMode')
    game_modes_data = [
        {"mode": "1VS1", "description": "One vs One"},
        {"mode": "TOURNAMENT", "description": "Tournament Mode"},
        {"mode": "TRAINING", "description": "Training Mode"},
    ]

    for mode in game_modes_data:
        # Use get_or_create to prevent integrity issues
        GameMode.objects.get_or_create(
            mode=mode["mode"],
            defaults={"description": mode["description"]},
        )

def reverse_populate_gamemode(apps, schema_editor):
    GameMode = apps.get_model('game', 'GameMode')
    GameMode.objects.all().delete()

class Migration(migrations.Migration):
    dependencies = [
        ('game', '0001_initial'),  # Ensure this matches the initial migration
    ]

    operations = [
        migrations.RunPython(populate_gamemode, reverse_populate_gamemode),
    ]
