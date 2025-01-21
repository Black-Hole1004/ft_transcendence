#!/bin/bash

# Create directory for SSL certificates
path=etc/nginx/ssl
mkdir -p $path

echo "Generate SSL certificates in $path"
# Generate self-signed certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout  $path/certif.key \
    -out $path/certif.crt \
    -subj "/C=Ma/ST=Khouribga/L=Khouribga/O=Organization/CN=e3r1p5.1337.ma"

# echo "here is the certificate"
# cat $path/certif.crt
# echo "here is the key"
# cat $path/certif.key
