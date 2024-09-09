from django.db import models

from django.contrib.auth.models import AbstractUser



# Create your models here.
class CustomUser(AbstractUser):
    is_hr = models.BooleanField(default=False)
    resume = models.FileField(upload_to='static/resumes', null = True)

class Job(models.Model):
    position = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    desc= models.TextField(blank = True)
    url = models.CharField(max_length=100, null = True)
    duration= models.DurationField()
    scores = models.JSONField(null = True)
    




