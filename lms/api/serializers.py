from lms.models import (Student, Class)
from rest_framework import serializers

class StudentSerializer(serializers.HyperlinkedModelSerializer):
    """
    An API serializer for the lms.Student model.
    """
    classes = serializers.HyperlinkedRelatedField(
        queryset = Class.objects.all(),
        view_name = 'lms_api:class_detail',
        lookup_field = 'link'
    )
    class Meta:
        model = Student 
        fields = ('first_name', 'last_name', 'link', 'classes')