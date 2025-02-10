from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


class CustomUserAdmin(UserAdmin):
    list_display = ("email", "username", "is_active", "is_staff")
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("username", "first_name", "last_name", "bio")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser")}),
    )


admin.site.register(User, CustomUserAdmin)
