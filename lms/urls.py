from django.urls import path 
from lms import views

app_name ="lms"

urlpatterns = [
    path('', views.home, name="home")
]