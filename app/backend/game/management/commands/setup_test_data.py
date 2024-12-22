from django.core.management.base import BaseCommand
from game.models import GameMode, GameTable

class Command(BaseCommand):
    help = 'Sets up initial game data'

    def handle(self, *args, **options):
        # Create game modes
        modes = [
            ('1VS1', 'One vs One game mode'),
            ('TOURNAMENT', 'Tournament game mode'),
            ('TRAINING', 'Training with AI')
        ]
        
        for mode, description in modes:
            GameMode.objects.get_or_create(
                mode=mode,
                defaults={'description': description}
            )
        
        # Create game tables
        tables = [
            ('Default Table', 'table1.png', 0, True),
            ('Space Table', 'table2.png', 1000, False),
            ('Mars Table', 'table3.png', 2000, False),
        ]
        
        for name, bg_image, xp_req, is_default in tables:
            GameTable.objects.get_or_create(
                name=name,
                defaults={
                    'background_image': bg_image,
                    'xp_required': xp_req,
                    'is_default': is_default
                }
            )

        self.stdout.write(self.style.SUCCESS('Successfully created initial game data'))