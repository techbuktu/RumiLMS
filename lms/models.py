from django.db import models
from django.utils.text import slugify 

# Create your models here.
class Student(models.Model):
    """
    Represents a Student in a Class.
    """
    first_name = models.CharField(max_length=100, verbose_name="First Name")
    last_name = models.CharField(max_length=100, verbose_name="Last Name")
    link = models.SlugField(max_length=115, blank=True, unique=True)
    classes = models.ManyToManyField("Class", related_name="students")

    class Meta:
        ordering = ['id']

    def __str__(self):
        return "%s %s" % (self.first_name, self.last_name)

    def save(self, *args, **kwargs):
        if not self.link:
            self.link = slugify(self.first_name + ' ' + self.last_name)
        super(Student, self).save(*args, **kwargs)


class Class(models.Model):
    """
    Representation of a  Class/Course of study at a school.
    """
    name = models.CharField(max_length=100)
    desc = models.TextField(verbose_name="Description")
    link = models.SlugField(max_length=115, blank=True, unique=True)

    class Meta:
        verbose_name_plural = "Classes"
        ordering = ['name']

    def __str__(self):
        return self.name 

    def save(self, *args, **kwargs):
        if not self.link:
            self.link = slugify(self.name)
        super(Class, self).save(*args, **kwargs)


