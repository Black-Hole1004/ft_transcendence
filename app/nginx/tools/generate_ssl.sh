#!/bin/bash

# Create directory for SSL certificates
path=etc/nginx/ssl
mkdir -p $path

echo "Generate SSL certificates in $path"
# Generate self-signed certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout  $path/certif.key \
    -out $path/certif.crt \
    -subj "/C=Ma/ST=Khouribga/L=Khouribga/O=Organization/CN=localhost"
# apk add python3 augeas-libs
# python3 -m venv /opt/certbot/
# /opt/certbot/bin/pip install --upgrade pip

# /opt/certbot/bin/pip install certbot certbot-nginx

# ln -s /opt/certbot/bin/certbot /usr/bin/certbot
# rm -rf /etc/letsencrypt/live/starserve.me
# certbot certonly --nginx --non-interactive --agree-tos --email blackhoole1@proton.me --no-eff-email -d starserve.me
# echo "0 0,12 * * * root /opt/certbot/bin/python -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew -q" | tee -a /etc/crontab > /dev/null
# echo 'hereeeee -----------------------------' 
# nginx -s stop
# cp -f /etc/letsencrypt/live/starserve.me/fullchain.pem /etc/nginx/ssl/certif.crt
# cp -f /etc/letsencrypt/live/starserve.me/privkey.pem /etc/nginx/ssl/certif.key
apk add python3

# sleep 160
cd /app/staticfiles/
python3 -m http.server 8000 &
