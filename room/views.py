from re import T
import re
from django.contrib.auth.models import User
from django.db import reset_queries
from django.shortcuts import render
from rest_framework import serializers
from rest_framework import response
from rest_framework.decorators import action,api_view
import time
from mysite.views import room_home
from .models import Rooms
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import REDIRECT_FIELD_NAME, login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import Room_Creating_Serializer,Room_Detail_serializer
from rest_framework.exceptions import ValidationError
from.forms import SignupForm



@api_view(['POST'])
def room_validator(request):
    print(request.POST)
    if request.method  == "POST":
        input_passcode = request.POST["password"]
        input_room_name = request.POST["room-value"]
        real_room = Rooms.objects.filter(name=input_room_name).first()
        if real_room == True:
            if real_room["password"] ==input_passcode:
                real_room.members.add(request.user)
                return Response({} , status = 200)
            else:
                return Response({"message":"room_name does not match with password"} , status=404)
        else:
            return Response({"message":"room does not exist"} , status= 404)

@login_required
@api_view(['POST'])
def room_creating_api(request):
    if request.method  == "POST":
        serializer  = Room_Creating_Serializer(data =request.data)
        if serializer.is_valid(raise_exception= True):
            serializer.save(owner = request.user)
            return Response({} , status=201)    
        if not serializer.is_valid():
             raise ValidationError(serializer.errors)
    else:
        return Response({} , status= 403)



@login_required
@api_view(["POST"])
def remove_user_from_room(request):
    room_name = request.POST["room-name"]
    room = Rooms.objects.filter(name=room_name)
    room.members.remove(request.user)
    Response({}, status=202)

    

@api_view(['POST'])
def logins(request):
    if not request.user.is_authenticated ==True:
        fm = AuthenticationForm(request=request,data=request.data)
        if fm.is_valid():
            username  = fm.cleaned_data['username']
            password = fm.cleaned_data['password']
            user = authenticate(username = username,password =password)
            login(request,user)
            return Response({} , status=202)
        if not fm.is_valid():
            raise ValidationError(fm.errors)
    else:
        return Response({} , status=406)

@api_view(["POST"])
def logout_view(request, *args, **kwargs):
    if request.method == "POST":
        logout(request)
        Response({} , status=202)
    else:
        return Response({} ,status=403)

@api_view(["POST"])
def register_account(request):
    if not request.user.is_authenticated ==True:
        if request.method =="POST":
            print(request.data)
            form = SignupForm(request.data)
            if form.is_valid():
                user = form.save(commit=True)
                user.set_password(form.cleaned_data["password1"])
                login(request ,user)
                return Response({} ,status=201)
            elif not form.is_valid():
                raise ValidationError(form.errors)
        else:
            return Response({} , status=403)
    else:
       return Response({} , status=406)


#@login_required
@api_view(['GET'])
def Room_detail(request):
    user= User.objects.filter(username="devashish").first()   # for development service only 
    room_name = Rooms.objects.filter(owner = user) or user.Room_Members.all()
    room_name = room_name.first()
    if room_name != None:
        serializer = Room_Detail_serializer(room_name)
        serializers = serializer.data
        serializers.update({"your_username" :user.username})
        return Response(serializers ,status=200)
    else:
        return Response({}, status= 404)
        

@api_view(["POST"])
def Username_Changer(request):
     new_username = request.POST["new-username"]
     new_username = new_username.replace(" ", "")
     if len(new_username) <15:
        owner = User.objects.get (id=request.user.id)
        owner.username = new_username
        owner.save()   
        return Response({request.user.username}, status=200)
     else:
        return Response({"message":"username should be less than 15 characters"}, status=404)


   




        






        
    



    

                    



    
    


