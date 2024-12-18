from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.contrib.auth.models import BaseUserManager
from django.core.validators import RegexValidator
from django.contrib.auth import get_user_model

from django.db.models import F, Sum
from django.db.models.functions import TruncDate
from django.db.models import ExpressionWrapper, fields

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Create and return a regular user with an email and password."""
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and return a superuser."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class Achievement:
    LEVELS = [
        {'name': 'NOVICE ASTRONAUT', 'xp': 0, 'image': '/badges/novice.png'},
        {'name': 'COSMIC EXPLORER', 'xp': 2000, 'image': '/badges/cosmic.png'},
        {'name': 'STELLAR VOYAGER', 'xp': 4000, 'image': '/badges/stellar.png'},
        {'name': 'GALACTIC TRAILBLAZER', 'xp': 6000, 'image': '/badges/galactic.png'},
        {'name': 'CELESTIAL MASTER', 'xp': 8000, 'image': '/badges/celestial.png'}
    ]

    @staticmethod
    def get_badge(xp):
        for level in reversed(Achievement.LEVELS):
            if xp >= level['xp']:
                return level
        return Achievement.LEVELS[0]

    @staticmethod
    def get_badge_progress(xp):
        # Get thresholds
        thresholds = [0, 2000, 4000, 6000, 8000, 10000]
        
        # Find current level
        current_threshold = 0
        next_threshold = 2000
        for i in range(len(thresholds)-1):
            if thresholds[i] <= xp < thresholds[i+1]:
                current_threshold = thresholds[i]
                next_threshold = thresholds[i + 1]
                break

        # Calculate progress
        progress = xp - current_threshold
        total_range = next_threshold - current_threshold
        progress_percentage = (progress / total_range) * 100

        return {
            'current_threshold': current_threshold,
            'next_threshold': next_threshold,
            'progress_percentage': min(progress_percentage, 100)
        }

class User(AbstractBaseUser, PermissionsMixin):

    status_choices = [
        ('online', 'Online'),
        ('offline', 'Offline'),
        ('ingame', 'Ingame'),
    ]

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    status = models.CharField(max_length=8, choices=status_choices, default='offline')
    is_staff = models.BooleanField(default=False)
    username = models.CharField(max_length=30, unique=True)
    mobile_number = models.CharField(max_length=15, default='', blank=True,
        validators=[RegexValidator(regex='^\+?1?\d{9,15}$', message='Phone number must be entered in the format: +999999999. Up to 15 digits allowed.')])
    display_name = models.CharField(max_length=30, default='', blank=True)
    bio = models.TextField(default='', blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', default='profile_pictures/avatar.jpg')

    # added by tabi3a
    xp = models.IntegerField(default=0)
    
    # Game statistics
    won_games_count = models.IntegerField(default=0)    # Instead of games_won
    lost_games_count = models.IntegerField(default=0)   # Instead of games_lost
    total_games_count = models.IntegerField(default=0)  # Track total games
    
    is_logged_with_oauth = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email



# Custom manager for UserSession model
class UserSessionManager(models.Manager):
    def time_spent_per_day(self, user):
        """
        Calculate the total time spent by a user in a day and convert it to seconds.
        """
        sessions = (self.filter(user=user)
                        .annotate(date=TruncDate('login_time'))
                        .values('date')
                        .annotate(total_time_spent=Sum('duration'))
                        .order_by('date'))

        # Convert duration to total seconds in Python, since Django can't handle total_seconds() in the query.
        for session in sessions:
            if session['total_time_spent']:
                session['total_time_spent_seconds'] = session['total_time_spent'].total_seconds()
            else:
                session['total_time_spent_seconds'] = 0  # Handle cases with no duration

            # Optionally, you can also convert the seconds into minutes if you prefer
            session['total_time_spent_minutes'] = session['total_time_spent_seconds'] / 60

        return sessions

# UserSession model to track login/logout and duration
class UserSession(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    login_time = models.DateTimeField(auto_now_add=True)
    logout_time = models.DateTimeField(null=True, blank=True)
    duration = models.DurationField(null=True, blank=True)

    def save(self, *args, **kwargs):
        # Calculate duration when logout_time is set
        if self.logout_time:
            self.duration = self.logout_time - self.login_time
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Session for {self.user.email} from {self.login_time} to {self.logout_time}"

    # Attach the custom manager to the model
    objects = UserSessionManager()