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
