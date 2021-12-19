from django.contrib import admin
from .views import room_validator, logins,register_account,logout_view,Room_detail,Username_Changer
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("room-checker/", room_validator),
     path("login/" , logins),
     path("register/" ,register_account),
     path("logout/", logout_view),
     path("room-detail/",Room_detail),
     path("username-changer/",Username_Changer)

     ]