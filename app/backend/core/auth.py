from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

# class CustomTokenObtainPairView(TokenObtainPairView):
    # serializer_class = CustomTokenObtainPairSerializer


# this file is created to add the custom token serializer to the token view
# this is done to allow the user to login using the email instead of the username
# this is done by changing the username_field to email
# this is done by changing the serializer_class to the custom token serializer
# so that i can get a token using

# POST /api/token/
# Content-Type: application/json

# {
#     "email": "test@example.com",
#     "password": "test123456"
# }