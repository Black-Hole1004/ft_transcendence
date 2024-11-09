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

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    username = models.CharField(max_length=30, unique=True)
    mobile_number = models.CharField(max_length=15, default='', blank=True,
        validators=[RegexValidator(regex='^\+?1?\d{9,15}$', message='Phone number must be entered in the format: +999999999. Up to 15 digits allowed.')])
    display_name = models.CharField(max_length=30, default='')
    bio = models.TextField(default='', blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', default='profile_pictures/avatar.jpg')
    
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