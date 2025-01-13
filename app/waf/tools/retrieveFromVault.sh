#!/bin/bash

# Vault address and token
apk update
apk add jq curl
VAULT_ADDR="http://vault:8200"
VAULT_TOKEN=$(head -n 1 /tmp/token.txt)

echo "Retrieving AGENT_TOKEN from Vault..."
echo $VAULT_TOKEN

# Secret path to retrieve AGENT_TOKEN (adjust path to your needs)
SECRET_PATH="secret/data/waf_api_key"

# Fetch AGENT_TOKEN from Vault
api_token=$(curl -s -H "X-Vault-Token: $VAULT_TOKEN" \
  $VAULT_ADDR/v1/$SECRET_PATH | jq .data.data.AGENT_TOKEN)

if [ -z "$api_token" ]; then
  echo "Error: AGENT_TOKEN not found in Vault"
  exit 1
fi

# Set the AGENT_TOKEN as an environment variable
export AGENT_TOKEN=$api_token

# Now run the appsec-agent with the retrieved AGENT_TOKEN
# ls -la $HOME/
AGENT_TOKEN=$api_token exec /cp-nano-agent "$@"