from django.core.management.base import BaseCommand
from UserManagement.models import User

class Command(BaseCommand):
    help = 'Creates a superuser and 4 test users for tournament testing'

    def handle(self, *args, **kwargs):
        # Create superuser
        superuser = User.objects.create_superuser(
            username='admin',
            email='admin@admin.com',
            password='admin12345'
        )
        self.stdout.write(self.style.SUCCESS(
            f'Created superuser: {superuser.username} (id: {superuser.id})'
        ))

        # Create test users
        test_users = [
            {
                'username': 'player1',
                'email': 'player1@test.com',
                'password': 'test@test',
            },
            {
                'username': 'player2',
                'email': 'player2@test.com',
                'password': 'test@test',
            },
            {
                'username': 'player3',
                'email': 'player3@test.com',
                'password': 'test@test',
            },
            {
                'username': 'player4',
                'email': 'player4@test.com',
                'password': 'test@test',
            },
        ]

        for user_data in test_users:
            user = User.objects.create_user(
                username=user_data['username'],
                email=user_data['email'],
                password=user_data['password']
            )
            self.stdout.write(self.style.SUCCESS(
                f'Created test user: {user.username} (id: {user.id})'
            ))
        
        self.stdout.write(self.style.SUCCESS(
            '\nSuperuser credentials:'
            '\nUsername: admin'
            '\nEmail: ahaloui@gmail.com'
            '\nPassword: test@test'
            '\n\nTest users credentials:'
            '\nUsername: player1-4'
            '\nEmail: player1-4@test.com'
            '\nPassword: test@test'
        ))