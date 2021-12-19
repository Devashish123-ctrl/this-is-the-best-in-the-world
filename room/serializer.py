from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import fields
from django.shortcuts import resolve_url
from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from django.contrib.auth import get_user_model

from room.models import Rooms



class Room_Creating_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Rooms
        fields = ['name' , 'password']

    def validate_name(self, value):
        if len(value)>15:
            raise ValidationError("This Room Name is too Long , Please keep it short")
        if Rooms.objects.filter(name= value) ==True:
            raise ValidationError("Please select another room name this room name has already taken by another user")

    def validate_password(self, value):
        if len(value)  > 16:
            raise ValidationError('Password is too Long')
        if len(value)  < 3:
            raise ValidationError('Password is too Short')
     

class Room_Detail_serializer(serializers.ModelSerializer):
    owner = SerializerMethodField(read_only = True)


    class Meta:
        model = Rooms
        fields = ["name" ,"owner",]

    def get_owner(self,obj):
       return obj.owner.username

    
        
    

         
      