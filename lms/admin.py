from django.contrib import admin
from lms.models import (
    Student, Class 
)
# Register your models here.
admin.site.register(Student, admin.ModelAdmin)
admin.site.register(Class, admin.ModelAdmin)
