from lms.models import Class, Student 
from rest_framework import serializers


class StudentSerializer(serializers.HyperlinkedModelSerializer):
    """
    An API serializer for the lms.Student model.
    """
    classes = serializers.HyperlinkedRelatedField(
        queryset = Class.objects.all(),
        view_name = 'lms_api:class_detail',
        lookup_field = 'link',
        many=True
    )
    class Meta:
        model = Student 
        fields = ('first_name', 'last_name', 'link', 'classes')

class ClassSerializer(serializers.HyperlinkedModelSerializer):
    """
    A Serializer for the lms.Class model's API endpoint.
    """
    students = serializers.HyperlinkedRelatedField(
        many=True,
        queryset = Student.objects.all(),
        lookup_field = 'link',
        view_name = 'lms_api:student_detail'
    )
    class Meta:
        model = Class 
        fields = ('name', 'desc','link','students')
