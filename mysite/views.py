from django.shortcuts import render

def room_home(request):
    return render(request,"index.html")