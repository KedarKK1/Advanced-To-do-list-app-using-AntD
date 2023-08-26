from rest_framework import serializers, validators
from .models import Task
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class TaskSerializer(serializers.ModelSerializer):
    # username = serializers.SerializerMethodField("get_username")

    # def get_username(self, obj):
    #     return obj.owner.username

    class Meta:
        model = Task
        # fields = '__all__'
        # fields = ('title','birthdayDate')
        fields = ['id','title','description','birthdayDate','tag','complete','owner','created_at']
        # read_only_fields = ('id',)
        # owner = serializers.Field(source='owner.username')

# if you want to extend something you create def
    def createIt(self, validated_data):
        title = validated_data['title']
        description = validated_data['description']
        birthdayDate = validated_data['birthdayDate']
        complete = validated_data['complete']
        tag = validated_data['tag']
        owner = self.context["author"]
        username = username

        task = Task.objects.create(title=title, tag=tag, description=description, birthdayDate=birthdayDate, complete=complete,owner=owner)
        return task
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise