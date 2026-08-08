#!/bin/bash
set -euo pipefail

cd /var/www/novia
git fetch origin
git reset --hard origin/main

cp /var/www/novia/deploy/gunicorn-novia.service /etc/systemd/system/gunicorn-novia.service

cd /var/www/novia/frontend
npm ci
npm run build

systemctl daemon-reload
systemctl restart gunicorn-novia.service
nginx -t
systemctl reload nginx

curl -s -o /dev/null -w "frontend:%{http_code}\n" http://127.0.0.1/ -H "Host: 46.225.56.35"
curl -s -X POST http://127.0.0.1/api/gate/unlock/ \
  -H "Host: 46.225.56.35" \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Silvia","password":"salsa"}'
echo
echo UPDATE_OK
