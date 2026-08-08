from rest_framework import serializers

from .models import Photo


class PhotoSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = ["id", "title", "caption", "order", "image_url"]

    def get_image_url(self, obj: Photo) -> str:
        request = self.context.get("request")
        if not obj.image:
            return ""
        url = obj.image.url
        if request:
            return request.build_absolute_uri(url)
        return url
