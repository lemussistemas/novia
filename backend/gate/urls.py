from django.urls import path

from .views import UnlockView

urlpatterns = [
    path("unlock/", UnlockView.as_view(), name="gate-unlock"),
]
