# -*- coding: utf-8 -*-
# Generated by Django 1.10.1 on 2016-09-06 03:22
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='chinese_name',
            field=models.CharField(max_length=100, unique=True, verbose_name='\u59d3\u540d'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='group_name',
            field=models.CharField(max_length=100, verbose_name='\u7ec4\u522b'),
        ),
    ]
