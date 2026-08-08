# Para Silvia

Sitio romántico con puerta de entrada secreta, corazón animado y carrusel de fotos.

## Stack

- Backend: Django + Django REST Framework
- Frontend: React + Vite (TypeScript)

## Credenciales del gate

| Campo | Valor por defecto |
| --- | --- |
| Primer nombre | `Silvia` |
| Ritmo / contraseña | `salsa` |

## Desarrollo local

### Backend

```powershell
.\.venv\Scripts\Activate.ps1
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 0.0.0.0:8000
```

Sube fotos en: http://127.0.0.1:8000/admin/ → Photos

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

Abre http://127.0.0.1:5173

Vite hace proxy de `/api` y `/media` hacia Django (`:8000`).

## Variables de entorno (opcional)

```text
GATE_FIRST_NAME=Silvia
GATE_PASSWORD=salsa
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,46.225.56.35
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://46.225.56.35
```

## Producción en tu servidor (46.225.56.35)

1. Build del frontend: `cd frontend && npm run build`
2. Sirve `frontend/dist` con nginx (o similar) en el puerto 80
3. Proxy `/api` y `/media` hacia Gunicorn/Django en `:8000`
4. `ALLOWED_HOSTS` debe incluir `46.225.56.35`
