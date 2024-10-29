# from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# from django.db import models
# from django.contrib.auth.models import BaseUserManager



# class CustomUserManager(BaseUserManager):
#     def create_user(self, email, password=None, **extra_fields):
#         """Create and return a regular user with an email and password."""
#         if not email:
#             raise ValueError('The Email field must be set')
#         email = self.normalize_email(email)
#         user = self.model(email=email, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, password=None, **extra_fields):
#         """Create and return a superuser."""
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)

#         if extra_fields.get('is_staff') is not True:
#             raise ValueError('Superuser must have is_staff=True.')
#         if extra_fields.get('is_superuser') is not True:
#             raise ValueError('Superuser must have is_superuser=True.')

#         return self.create_user(email, password, **extra_fields)

# class User(AbstractBaseUser, PermissionsMixin):
#     email = models.EmailField(unique=True)
#     first_name = models.CharField(max_length=30, blank=True)
#     last_name = models.CharField(max_length=30, blank=True)
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)
#     username = models.CharField(max_length=20, unique=True)
#     password = models.CharField(max_length=30)
#     new_password = models.CharField(max_length=30, default='')
#     confirm_password = models.CharField(max_length=30, default='')
#     mobile_number = models.CharField(max_length=10, default='', blank=True)
#     display_name = models.CharField(max_length=30, default='')
#     bio = models.TextField(default='', blank=True)
#     profile_picture = models.ImageField(upload_to='profile_pictures/', default='profile_pictures/avatar.jpg')

#     # added by tabi3a
#     xp = models.IntegerField(default=0)
    
    
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['first_name', 'last_name']

#     objects = CustomUserManager()

#     def __str__(self):
#         return self.email

# backend/core/models.py
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('status', 'ONLINE')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)



class Achievement(models.Model):
    achievement_id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    xp_threshold = models.IntegerField()  # XP needed to unlock this achievement
    avatar = models.URLField(max_length=255)  # URL field for avatar

    class Meta:
        db_table = 'Achievement'

    def __str__(self):
        return f"{self.name} ({self.xp_threshold} XP)"
    

class User(AbstractBaseUser, PermissionsMixin):
    class Status(models.TextChoices):
        ONLINE = 'ONLINE', 'Online'
        OFFLINE = 'OFFLINE', 'Offline'
        IN_GAME = 'IN_GAME', 'In Game'

    class AuthProvider(models.TextChoices):
        GOOGLE = 'GOOGLE', 'Google'
        INTRA = 'INTRA', 'Intra42'
        LOCAL = 'LOCAL', 'Local'

    # Authentication fields
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    new_password = models.CharField(max_length=255, default='', blank=True)
    confirm_password = models.CharField(max_length=255, default='', blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # Personal information
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    display_name = models.CharField(max_length=255, default='')
    mobile_number = models.CharField(max_length=20, blank=True, default='')
    bio = models.TextField(blank=True, default='')

    # Profile and game related fields
    xp = models.IntegerField(default=0)
    current_achievement = models.ForeignKey(
        Achievement,
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='current_achievement'
    )
    
    profile_picture = models.ImageField(
        upload_to='profile_pictures/', 
        default='profile_pictures/avatar.jpg'
    )
    
    # this is to track the time that specific user spent in the game/platform
    last_login = models.DateTimeField(null=True, blank=True)
    
    # Status tracking
    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.OFFLINE
    )
    auth_provider = models.CharField(
        max_length=10,
        choices=AuthProvider.choices,
        default=AuthProvider.LOCAL
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    objects = CustomUserManager()

    class Meta:
        db_table = 'Users'

    def __str__(self):
        return f"{self.username} ({self.email})"

    @property
    def full_name(self):
        """Returns user's full name"""
        return f"{self.first_name} {self.last_name}".strip()


    @property
    def is_online(self):
        return self.status == self.Status.ONLINE

    @property
    def is_in_game(self):
        return self.status == self.Status.IN_GAME

    def update_status(self, new_status):
        """Update user status"""
        if new_status in self.Status.values:
            self.status = new_status
            self.save()

    def increment_xp(self, amount):
        """Add XP to user"""
        self.xp += amount
        self.save()
        return self.xp

    def get_games_played(self):
        """Get number of games played by user"""
        from game.models import GameSessions
        return GameSessions.objects.filter(
            models.Q(player1_id=self.id) | 
            models.Q(player2_id=self.id)
        ).count()

    def get_games_won(self):
        """Get number of games won by user"""
        from game.models import GameSessions
        return GameSessions.objects.filter(winner_id=self.id).count()

    def get_win_ratio(self):
        """Calculate win ratio"""
        games_played = self.get_games_played()
        return 0 if (games_played == 0) else ((self.get_games_won() / games_played) * 100)
    
    def update_xp(self, is_winner):
        """
        Update XP based on game result
        Winners get +100 XP, Losers get +15 XP
        """
        xp_change = 100 if is_winner else 15
        self.xp += xp_change
        self.save()
        
        # Update achievement after XP change
        self.update_current_achievement()
        
        return {
            'xp_gained': xp_change,
            'total_xp': self.xp,
            'current_achievement': self.get_current_achievement_info()
        }

    def update_current_achievement(self):
        """Update user's current achievement based on XP"""
        next_possible = Achievement.objects.filter(
            xp_threshold__lte=self.xp
        ).order_by('-xp_threshold').first()

        if next_possible and (not self.current_achievement or 
            self.current_achievement.xp_threshold < next_possible.xp_threshold):
            self.current_achievement = next_possible
            self.save()
            return True
        return False

    def get_current_achievement_info(self):
        """Get detailed info about current achievement"""
        if not self.current_achievement:
            return None
        
        return {
            'id': self.current_achievement.achievement_id,
            'name': self.current_achievement.name,
            'description': self.current_achievement.description,
            'avatar': self.current_achievement.avatar,
            'xp_threshold': self.current_achievement.xp_threshold
        }
    
    def get_all_achieved_achievements(self):
        """Get all achievements achieved by user"""
        return Achievement.objects.filter(
            xp_threshold__lte=self.xp
        ).order_by('-xp_threshold')
    
    def get_all_achievements():
        """Get all achievements available in the system"""
        return Achievement.objects.all().order_by('xp_threshold')

    def get_next_achievement(self):
        """Get next achievement to be achieved by user"""
        return Achievement.objects.filter(
            xp_threshold__gt=self.xp
        ).order_by('xp_threshold').first()
        
    def get_next_achievement_info(self):
        """Get detailed info about next achievement"""
        if next_achievement := self.get_next_achievement():
            return {
                'id': next_achievement.achievement_id,
                'name': next_achievement.name,
                'description': next_achievement.description,
                'avatar': next_achievement.avatar,
                'xp_threshold': next_achievement.xp_threshold
            }
        else:
            return None