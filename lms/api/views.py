from lms.models import Student, Class 
from lms.api.serializers import (StudentSerializer, ClassSerializer)
from django.http import Http404
from rest_framework import generics
from rest_framework.reverse import reverse 
from rest_framework.response import Response 
from rest_framework.decorators import api_view 
#from rest_framework.parsers import JSONParser 

@api_view(['GET'])
def lms_api_root(request, format=None):
    """
    Collects all other API endpoints and serves as the root/"landing page"
    of all the RumiLMS API.
    """
    return Response({
        'students': reverse('lms_api:student_list', request=request, format=format),
        'classes': reverse('lms_api:class_list', request=request, format=format)
    })

class StudentListView(generics.ListCreateAPIView):
    """
    Serves the endpoint that either returns all lms.Student instances (if called via GET)
    or creates a new lms.Student instance if called with POST.
    """
    queryset = Student.objects.all() 
    serializer_class = StudentSerializer 
    lookup_field = 'link'

class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Returns a single matching lms.Student instance.
    """
    queryset = Student.objects.all()
    serializer_class = StudentSerializer 
    lookup_field = 'link'

class ClassListView(generics.ListCreateAPIView):
    """
    View to retrieve a single lms.Class instance when called 
    through the matching API URL endpoint.
    """
    queryset = Class.objects.all()
    serializer_class = ClassSerializer
    lookup_field = 'link'

class ClassDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Returns a single matching lms.Class instance.
    """
    queryset = Class.objects.all()
    serializer_class = ClassSerializer
    lookup_field = 'link'