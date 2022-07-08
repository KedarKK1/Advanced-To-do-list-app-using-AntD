from django.db import models
from django.contrib.auth.models import User

STATUS_CHOICES = (
    ('OPEN', 'OPEN'),
    ('WORKING', 'WORKING'),
    ('DONE', 'DONE'),
    ('OVERDUE', 'OVERDUE'),
)
class Task(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=1000, default=" ")
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    birthdayDate = models.DateField(
        null=True, blank=True, verbose_name="dueDate")
    complete = models.CharField(
        max_length=7, choices=STATUS_CHOICES, default='OPEN')
    tag = models.CharField(max_length=1000, default="")
    owner = models.ForeignKey(
        User, related_name="todos", on_delete=models.CASCADE, null=True, default=1)
    objects = models.Manager()

    def __str__(self):
        return f" {self.id}. {self.title} => {self.birthdayDate}"
