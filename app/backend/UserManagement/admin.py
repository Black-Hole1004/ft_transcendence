from django.contrib import admin
from .models import User
from .models import UserSession
from .models import Notification
from .models import FriendShip
from .models import FriendShipRequest


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'is_staff')

@admin.register(UserSession)
class UserSessionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'login_time', 'logout_time', 'duration')

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('id', 'message', 'sender', 'receiver', 'is_read')

@admin.register(FriendShip)
class FriendshipAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_from', 'user_to', 'created_at')

@admin.register(FriendShipRequest)
class FriendShipRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_from', 'user_to', 'status', 'created_at')