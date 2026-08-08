#!/bin/bash
set -euo pipefail

echo "==> Ensure repo"
if [ -d /var/www/novia/.git ]; then
  cd /var/www/novia
  git fetch origin
  git reset --hard origin/main
else
  rm -rf /var/www/novia
  git clone https://github.com/lemussistemas/novia.git /var/www/novia
fi

echo "==> Backend venv + deps"
cd /var/www/novia/backend
python3 -m venv venv
./venv/bin/pip install --upgrade pip
./venv/bin/pip install -r requirements.txt
DJANGO_DEBUG=0 DJANGO_ALLOWED_HOSTS=46.225.56.35,localhost,127.0.0.1 \
  ./venv/bin/python manage.py migrate --noinput
DJANGO_DEBUG=0 DJANGO_ALLOWED_HOSTS=46.225.56.35,localhost,127.0.0.1 \
  ./venv/bin/python manage.py collectstatic --noinput
mkdir -p media
chmod -R 755 media

echo "==> Frontend build"
cd /var/www/novia/frontend
npm ci
npm run build

echo "==> Backup nginx pollo config"
cp /etc/nginx/sites-available/proyecto-pollo "/etc/nginx/sites-available/proyecto-pollo.bak.$(date +%Y%m%d%H%M%S)"

echo "==> Install systemd + nginx for novia only"
cp /var/www/novia/deploy/gunicorn-novia.service /etc/systemd/system/gunicorn-novia.service
cp /var/www/novia/deploy/nginx.example.conf /etc/nginx/sites-available/proyecto-pollo
systemctl daemon-reload
systemctl enable gunicorn-novia.service
systemctl restart gunicorn-novia.service
nginx -t
systemctl reload nginx

echo "==> Health"
sleep 1
curl -s -o /dev/null -w "frontend:%{http_code}\n" http://127.0.0.1/ -H "Host: 46.225.56.35"
curl -s -o /dev/null -w "api:%{http_code}\n" http://127.0.0.1/api/photos/ -H "Host: 46.225.56.35"
systemctl is-active gunicorn-novia.service nginx.service cemh-gunicorn.service gunicorn-taller.service
echo "DEPLOY_OK"
