#!/bin/bash

# Vault address and token
export VAULT_ADDR="http://vault:8200"
export VAULT_TOKEN=$(head -n 1 /tmp/token.txt)

echo "Retrieving PostgreSQL credentials from Vault..."

# Secret path for PostgreSQL credentials (adjust this path based on your Vault setup)
SECRET_PATH="secret/data/postgres"

# Fetch credentials from Vault
USER=$POSTGRES_USER
PASS=$(curl -s -H "X-Vault-Token: $VAULT_TOKEN" $VAULT_ADDR/v1/$SECRET_PATH)
echo "PASS: $PASS"
PASS=$(echo $PASS | jq -r .data.data.POSTGRES_PASSWORD)

echo "PASS after jq : $PASS"
DB=$POSTGRES_DB

# Check if the variables were retrieved successfully
if [ -z "$USER" ] || [ -z "$PASS" ] || [ -z "$POSTGRES_DB" ]; then
  echo "Error: Could not retrieve PostgreSQL credentials from Vault"
  exit 1
fi

# Set the environment variables
export POSTGRES_PASSWORD=$PASS
# export POSTGRES_USER=$USER
# export POSTGRES_DB=$DB
POSTGRES_PASSWORD=$PASS exec /usr/local/bin/docker-entrypoint.sh "postgres" "$@"
