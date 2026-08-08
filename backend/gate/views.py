from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


def _norm(value: str) -> str:
    return " ".join((value or "").strip().lower().split())


class UnlockView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        first_name = _norm(request.data.get("first_name", ""))
        password = _norm(request.data.get("password", ""))

        expected_name = _norm(settings.GATE_FIRST_NAME)
        expected_password = _norm(settings.GATE_PASSWORD)

        errors = {}
        if first_name != expected_name:
            errors["first_name"] = "Ese no es el nombre correcto."
        if password != expected_password:
            errors["password"] = "Esa no es la respuesta correcta."

        if errors:
            return Response(
                {
                    "ok": False,
                    "message": "Algo no coincide… inténtalo de nuevo.",
                    "errors": errors,
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        return Response(
            {
                "ok": True,
                "message": "Bienvenida.",
                "token": "silvia-unlocked",
            }
        )
