from rest_framework import serializers
from djoser.serializers import UserCreateSerializer, UserSerializer
from .models import *


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id','email','username','password','phone','institution','occupation','secteur_activité', 'photo')

"""
from .models import Profile, User

 class RegisterSerializer(serializers.ModelSerializer):

    password_confirm = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['email','username','password','password_confirm','institution', 'occupation']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        user = User(
            email = self.validated_data['email'],
            username = self.validated_data['username'],
            institution = self.validated_data['institution'],
            occupation = self.validated_data['occupation']
        )

        password = self.validated_data['password']
        password_confirm = self.validated_data['password_confirm']

        if password != password_confirm :
            raise serializers.ValidationError({"password": "Passwords must match"})

        user.set_password(password)
        user.save()
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id','user','telephone','photo','secteur_activité','services')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email','institution','occupation')
 """