from django.shortcuts import render
from django.http import HttpResponse 

# Create your views here.
def home(request):
    return render(request, 'lms/static/lms/rumiLMS/src/index.html')

def index(request):
    """
    Placeholder home page.
    """
    return HttpResponse("RumiLMS: We are here to revolutionized EdTech forever. Join us! :)")
