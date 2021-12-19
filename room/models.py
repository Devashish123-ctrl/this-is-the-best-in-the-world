from typing_extensions import TypeGuard
from django.db import models
from django.db.models.base import Model
from django.db.models.deletion import SET_NULL
from django.db.models.expressions import F
from django.conf import settings
from django.db.models.fields.reverse_related import ManyToOneRel
User = settings.AUTH_USER_MODEL

class Rooms(models.Model):
    owner = models.ForeignKey(User , on_delete=models.CASCADE)
    name  = models.CharField(max_length=20, blank=False, null=False)
    password = models.CharField(max_length=8, blank= True, null= True)
    members = models.ForeignKey(User,related_name ="Room_Members" ,null=True ,blank=True,on_delete= models.SET_NULL)
    closed = models.BooleanField(default=False)

    class Meta:
        pass


    @property
    def is_public(self):
        if self.password == None:
            return True
        else :
            return False


    
      
    


    
    
        

