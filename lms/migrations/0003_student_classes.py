# Generated by Django 2.1.5 on 2019-02-19 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lms', '0002_class'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='classes',
            field=models.ManyToManyField(related_name='students', to='lms.Class'),
        ),
    ]
