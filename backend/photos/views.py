from rest_framework.generics import ListAPIView

from .models import Photo
from .serializers import PhotoSerializer


class PhotoListView(ListAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = PhotoSerializer

    def get_queryset(self):
        return Photo.objects.filter(is_active=True)
