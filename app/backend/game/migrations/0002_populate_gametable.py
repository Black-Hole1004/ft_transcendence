from django.db import migrations, transaction
from django.conf import settings

def populate_gametable(apps, schema_editor):
    GameTable = apps.get_model('game', 'GameTable')
    tables_data = [
        {"table_id": 1, "name": "Table 1", "background_url": f"{settings.TABLES_STATIC_URL}table1.png", "xp_required": 0, "is_default": True},
        {"table_id": 2, "name": "Table 2", "background_url": f"{settings.TABLES_STATIC_URL}table2.png", "xp_required": 100, "is_default": False},
        {"table_id": 3, "name": "Table 3", "background_url": f"{settings.TABLES_STATIC_URL}table3.png", "xp_required": 200, "is_default": False},
        {"table_id": 4, "name": "Table 4", "background_url": f"{settings.TABLES_STATIC_URL}table4.png", "xp_required": 300, "is_default": False},
        {"table_id": 5, "name": "Table 5", "background_url": f"{settings.TABLES_STATIC_URL}table5.png", "xp_required": 400, "is_default": False},
        {"table_id": 6, "name": "Table 6", "background_url": f"{settings.TABLES_STATIC_URL}table6.png", "xp_required": 500, "is_default": False},
        {"table_id": 7, "name": "Table 7", "background_url": f"{settings.TABLES_STATIC_URL}table7.png", "xp_required": 600, "is_default": False},
        {"table_id": 8, "name": "Table 8", "background_url": f"{settings.TABLES_STATIC_URL}table8.png", "xp_required": 700, "is_default": False},
    ]

    for table in tables_data:
        # Use get_or_create to prevent integrity issues
        GameTable.objects.get_or_create (
            table_id=table["table_id"],
            defaults={
                "name": table["name"],
                "background_url": table["background_url"],
                "xp_required": table["xp_required"],
                "is_default": table["is_default"],
            }
        )

def reverse_populate_gametable(apps, schema_editor):
    GameTable = apps.get_model('game', 'GameTable')
    GameTable.objects.all().delete()

class Migration(migrations.Migration):
    dependencies = [
        ('game', '0001_initial'),  # Ensure this matches the initial migration
    ]

    operations = [
        migrations.RunPython(populate_gametable, reverse_populate_gametable, atomic=False),
    ]
