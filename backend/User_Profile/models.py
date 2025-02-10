from django.contrib.auth.models import AbstractUser
from django.db import models


def set_profile_image(instance, filename):
    return f"profile_images/{instance.pk}/profile_image.png"


class User(AbstractUser):
    # Custom fields
    email = models.EmailField(unique=True, verbose_name="email")
    phone = models.CharField(max_length=20, blank=True)
    is_verified = models.BooleanField(default=False)
    bio = models.CharField(max_length=300, null=True, default="Hello")
    prof_image = models.ImageField(
        upload_to=set_profile_image, default="/profile_images/user.png"
    )
    hide_email = models.BooleanField(default=False)
    private_account = models.BooleanField(default=False)

    # Remove username from default fields
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email

    def get_profile_image_name(self):
        return str(self.prof_image).split(f"profile_images/{self.pk}/")[-1]
