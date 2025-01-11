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
curl -H "X-Vault-Token: $VAULT_TOKEN" \
  $VAULT_ADDR/v1/$SECRET_PATH 2>&1
json=$(curl -H "X-Vault-Token: $VAULT_TOKEN" \
  $VAULT_ADDR/v1/$SECRET_PATH 2>&1)

echo "json: $json"

# Extract AGENT_TOKEN from JSON response
# AGENT_TOKEN=$(echo $json | jq -r '.data.data.AGENT_TOKEN')
AGENT_TOKEN=cp-b1569b5c-ec41-44ce-b352-f49e08f6136057daf27e-ff4e-4bf2-832f-fd793878166d
# if [ -z "$AGENT_TOKEN" ]; then
#   echo "Error: AGENT_TOKEN not found in Vault"
#   exit 1
# fi

# Set the AGENT_TOKEN as an environment variable
export AGENT_TOKEN

# Now run the appsec-agent with the retrieved AGENT_TOKEN
ls -la $HOME/
/cp-nano-agent