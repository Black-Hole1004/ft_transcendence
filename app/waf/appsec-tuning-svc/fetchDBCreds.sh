#!/bin/bash

VAULT_ADDR="http://vault:8200"
VAULT_TOKEN=$(head -n 1 /tmp/token.txt)
SECRET_PATH="secret/data/appsec"
# Fetch the required secrets from Vault
export QUERY_DB_PASSWORD=$(curl -s -H "X-Vault-Token: $VAULT_TOKEN" \
  $VAULT_ADDR/v1/$SECRET_PATH | jq -r .data.data.QUERY_DB_PASSWORD)

export QUERY_DB_HOST=$(curl -s -H "X-Vault-Token: $VAULT_TOKEN" \
  $VAULT_ADDR/v1/$SECRET_PATH | jq -r .data.data.QUERY_DB_HOST)

export QUERY_DB_USER=$(curl -s -H "X-Vault-Token: $VAULT_TOKEN" \
  $VAULT_ADDR/v1/$SECRET_PATH | jq -r .data.data.QUERY_DB_USER)


# Start the Docker Compose services
QUERY_DB_PASSWORD=$QUERY_DB_PASSWORD QUERY_DB_HOST=$QUERY_DB_HOST QUERY_DB_USER=$QUERY_DB_USER exec /go/bin/app "$@"