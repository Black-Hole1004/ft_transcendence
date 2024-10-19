from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.contrib.auth.models import BaseUserManager



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
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=30)
    new_password = models.CharField(max_length=30, default='')
    confirm_password = models.CharField(max_length=30, default='')
    mobile_number = models.CharField(max_length=10, default='', blank=True)
    display_name = models.CharField(max_length=30, default='')
    bio = models.TextField(default='', blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', default='profile_pictures/avatar.jpg')
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email