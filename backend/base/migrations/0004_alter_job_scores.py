# Generated by Django 4.2.4 on 2024-05-27 19:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_alter_job_scores'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='scores',
            field=models.JSONField(null=True),
        ),
    ]