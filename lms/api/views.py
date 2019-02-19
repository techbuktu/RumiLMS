from lms.models import Student, Class 
from lms.api.serializers import (StudentSerializer, ClassSerializer)


def lms_api_root():
    return "This is the API root with docs and links to main endpoints."