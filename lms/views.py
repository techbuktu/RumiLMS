from django.shortcuts import render
from django.http import HttpResponse 

# Create your views here.

def home(request):
    """
    Placeholder home page.
    """
    return HttpResponse("RumiLMS: We are here to revolutionized EdTech forever. Join us! :)")
