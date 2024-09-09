from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from base.models import Job
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username' , 'email', 'password', 'is_hr', 'resume')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        password = make_password(validated_data.get('password'))
        validated_data['password'] = password
        return super().create(validated_data)
    
class JobSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'