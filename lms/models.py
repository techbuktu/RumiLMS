from django.db import models
from django.utils.text import slugify 

# Create your models here.
class Student(models.Model):
    first_name = models.CharField(max_length=100, verbose_name="First Name")
    last_name = models.CharField(max_length=100, verbose_name="Last Name")
    link = models.SlugField(max_length=115, blank=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return "%s %s" % (self.first_name, self.last_name)

    def save(self, *args, **kwargs):
        if not self.link:
            self.link = slugify(self.first_name + ' ' + self.last_name)
        super(Student, self).save(*args, **kwargs)


