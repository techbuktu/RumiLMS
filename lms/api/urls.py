from django.urls import path 

#Import the format_suffix_patterns() to dynamically-accept requests for all
# content type API data response formats: JSON, XML, etc.
from rest_framework.urlpatterns import format_suffix_patterns
from lms.api import views 

app_name = 'lms_api'
urlpatterns = format_suffix_patterns(
    [
        path('students/', views.StudentListView.as_view(), name='student_list'),
        path('classes/', views.ClassListView.as_view(), name='class_list'),
        path('students/<slug:link>/', views.StudentDetailView.as_view(), name='student_detail'),
        path('classes/<slug:link>/', views.ClassDetailView.as_view(), name='class_detail'),
        path('', views.lms_api_root, name='lms_api_root'),

    ]
)