from django.shortcuts import render
from django.views.decorators.clickjacking import xframe_options_exempt

@xframe_options_exempt
def room_home(request):
    return render(request,"index.html")