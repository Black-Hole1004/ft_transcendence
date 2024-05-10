from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.utils.translation import gettext as _

class CustomUser(AbstractUser):
    # Add custom fields if needed
    is_tabi3a = models.BooleanField(default=False)
    # Add more fields as needed

    class Meta:
        verbose_name = 'Custom User'
        verbose_name_plural = 'Custom Users'

    groups = models.ManyToManyField(
        Group,
        verbose_name=_('groups'),
        blank=True,
        help_text=_('The groups this user belongs to. A user will get all permissions granted to each of their groups.'),
        related_query_name='custom_user_groups',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_query_name='custom_user_permissions',
    )
