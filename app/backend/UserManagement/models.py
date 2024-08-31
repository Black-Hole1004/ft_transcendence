from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=30)
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = BaseUserManager()

    def __str__(self):
        return self.email