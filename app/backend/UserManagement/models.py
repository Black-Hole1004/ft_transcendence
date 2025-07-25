from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.contrib.auth.models import BaseUserManager
from django.core.validators import RegexValidator
from django.contrib.auth import get_user_model

from django.db.models import F, Sum
from django.db.models.functions import TruncDate
from django.db.models import ExpressionWrapper, fields
from django.core.validators import MaxLengthValidator

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
        {
            'name': 'NOVICE ASTRONAUT',
            'xp': 0,
            'image': '/badges/novice.png',
            'title': 'Welcome aboard, Novice Astronaut!',
            'body': 'Your journey begins on Venus, where the cosmos eagerly awaits your exploration. Strap in and prepare for an adventure beyond the stars!',
        },
        {
            'name': 'COSMIC EXPLORER',
            'xp': 2000,
            'image': '/badges/cosmic.png',
            'title': 'Greetings, Cosmic Explorer!',
            'body': 'Level 2 brings you to Jupiter, the king of planets, where vast storms and boundless mysteries await your exploration. Blaze a trail through the cosmos and leave your mark among the stars.',
        },
        {
            'name': 'STELLAR VOYAGER',
            'xp': 4000,
            'image': '/badges/stellar.png',
            'title': 'Ahoy, Stellar Voyager!',
            'body': 'As you ascend to Level 3, Saturn\'s majestic rings beckon you to new realms of discovery. Navigate the cosmos with grace and curiosity, for the stars themselves await your presence.',
        },
        {
            'name': 'GALACTIC TRAILBLAZER',
            'xp': 6000,
            'image': '/badges/galactic.png',
            'title': 'Salutations, Galactic Trailblazer!',
            'body': 'Here on Earth, the universe unfolds before your eyes, offering endless wonders to discover. Embrace the journey ahead as you chart new territories and unlock the secrets of our celestial home.',
        },
        {
            'name': 'CELESTIAL MASTER',
            'xp': 8000,
            'image': '/badges/celestial.png',
            'title': 'Congratulations, Celestial Master!',
            'body': 'You\'ve ascended to the highest echelons of cosmic mastery, basking in the brilliance of the Sun itself. As a true luminary of the cosmos, your journey knows no bounds. Shine on, and may your light guide others to new celestial heights!',
        }
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
        for i in range(len(thresholds) - 1):
            if thresholds[i] <= xp < thresholds[i+1]:
                current_threshold = thresholds[i]
                next_threshold = thresholds[i + 1]
                break
        # If no interval found (xp >= 10000)
        else:
            current_threshold = thresholds[-2]
            next_threshold = thresholds[-1]
        # Calculate progress
        progress = xp - current_threshold
        total_range = (next_threshold - current_threshold)
        progress_percentage = 100 if current_threshold == next_threshold else (progress / total_range) * 100

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
    first_name = models.CharField(max_length=20, blank=True)
    last_name = models.CharField(max_length=20, blank=True)
    status = models.CharField(max_length=8, choices=status_choices, default='offline')
    is_staff = models.BooleanField(default=False)
    username = models.CharField(max_length=25, unique=True)
    mobile_number = models.CharField(max_length=15, default='', blank=True,
    validators=[RegexValidator(regex='^\+?1?\d{9,15}$', message='Phone number must be entered in the format: +999999999. Up to 15 digits allowed.')])
    bio = models.TextField(max_length=150, default='', blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', default='profile_pictures/avatar.jpg')
    date_joined = models.DateField(auto_now_add=True)
    # added by tabi3a
    xp = models.IntegerField(default=0)
    
    # Game statistics
    won_games_count = models.IntegerField(default=0)
    lost_games_count = models.IntegerField(default=0)
    total_games_count = models.IntegerField(default=0)
    
    is_logged_with_oauth = models.BooleanField(default=False)
    is_logged_with_oauth_for_2fa = models.BooleanField(default=False)
    
    has_custom_username = models.BooleanField(default=False)
    has_custom_profile_picture = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    is_2fa_enabled = models.BooleanField(default=False)

    # 2fa fields
    otp_secret = models.IntegerField(default=0)  # Store OTP secret
    otp_expiry = models.DateTimeField(blank=True, null=True)  # OTP expiry time
    otp_attempts = models.IntegerField(default=0)  # Track OTP attempts
    otp_verified = models.BooleanField(default=False)  # Track OTP verification status

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
        print(f"Saving UserSession: {self}")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Session for {self.user.email} from {self.login_time} to {self.logout_time}"

    # Attach the custom manager to the model
    objects = UserSessionManager()


class FriendShip(models.Model):
    user_from = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='user_from')
    user_to = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='user_to')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user_from', 'user_to']
    
    def __str__(self):
        return f"Friendship between {self.user_from.username} and {self.user_to.username}"

class FriendShipRequest(models.Model):
    user_from = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='sent_request')
    user_to = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='received_request')
    status = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]
    status = models.CharField(max_length=8, choices=status, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"Friendship request from {self.user_from.username} to {self.user_to.username} with status {self.status}"

class Notification(models.Model):
    sender = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='receiver')
    message = models.TextField(max_length=50)
    is_read =  models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification from {self.sender.username} to {self.receiver.username}: {self.message}"



