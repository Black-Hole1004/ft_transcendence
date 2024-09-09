from django.contrib.auth.forms import UserCreationForm
from .models import User

from django import forms

class UserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        # fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2')
        fields = ('username', 'email', 'password1', 'password2')


# class UserProfileForm(forms.ModelForm):
#     class Meta:
#         model = User
#         fields = ('first_name', 'last_name', 'email', 'mobile_number', 'display_name', 'bio', 'profile_picture')