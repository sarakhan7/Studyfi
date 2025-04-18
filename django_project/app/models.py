from django.db import models

class UserInput(models.Model):
    input_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Response(models.Model):
    user_input = models.ForeignKey(UserInput, on_delete=models.CASCADE)
    response_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)