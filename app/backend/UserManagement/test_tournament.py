# test_tournament.py

from UserManagement.models import User, Tournament, Match

def run_test():
    # 1. Create 4 test users
    users = []
    for i in range(4):
        user = User.objects.create(
            username=f'testuser{i}',
            email=f'test{i}@test.com',
            password='test123'
        )
        users.append(user)
    print("Created 4 test users")
    
    # 2. Create tournament
    tournament = Tournament.objects.create(name='Test Tournament')
    tournament.status = 'IN_PROGRESS'
    tournament.save()
    print(f"\nCreated tournament: {tournament.name}")
    
    # 3. Create semi-finals
    semi1 = Match.objects.create(
        tournament=tournament,
        player1=users[0],
        player2=users[3],
        round_number=1,
        status='IN_PROGRESS'
    )
    
    semi2 = Match.objects.create(
        tournament=tournament,
        player1=users[1],
        player2=users[2],
        round_number=1,
        status='IN_PROGRESS'
    )
    print("\nCreated semi-final matches:")
    print(f"Semi 1: {semi1.player1.username} vs {semi1.player2.username}")
    print(f"Semi 2: {semi2.player1.username} vs {semi2.player2.username}")
    
    return tournament, users