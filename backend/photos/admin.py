from django.contrib import admin

from .models import Photo


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "order", "is_active", "created_at")
    list_editable = ("order", "is_active")
    search_fields = ("title", "caption")
