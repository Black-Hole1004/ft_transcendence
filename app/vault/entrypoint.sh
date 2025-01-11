#!/bin/sh

# Start Vault server in the background (without the need to wait)
# apt-get update
# apt-get install -y jq curl
export VAULT_TOKEN=root
mkdir -p /vault/data
nohup vault server -config=/etc/vault.d/vault-config.hcl &

# Wait for Vault to start up (it can take a moment)
sleep 5
# while true; do
#   vault status > /dev/null 2>&1
#   if [ $? -eq 0 ]; then
#     break
#   fi
#   sleep 1
# done

# Initialize Vault (this will output unseal keys and the root token)
echo "Initializing Vault..."
vault operator init -key-shares=3 -key-threshold=3 > /tmp/vault-init.log

# Capture the unseal key and root token from the initialization output
UNSEAL_KEY1=$(grep 'Key 1:' /tmp/vault-init.log | awk '{print $NF}')
UNSEAL_KEY2=$(grep 'Key 2:' /tmp/vault-init.log | awk '{print $NF}')
UNSEAL_KEY3=$(grep 'Key 3:' /tmp/vault-init.log | awk '{print $NF}')
ROOT_TOKEN=$(grep 'Initial Root Token' /tmp/vault-init.log | awk '{print $NF}')

# Print the unseal key and root token to the console for further use
echo "Unseal Key: $UNSEAL_KEY1"
echo "Unseal Key: $UNSEAL_KEY2"
echo "Unseal Key: $UNSEAL_KEY3"
echo "Root Token: $ROOT_TOKEN"

# Unseal Vault using the unseal key
# and fix terminal issue
# vault operator unseal 

# Set the root token as an environment variable
export VAULT_TOKEN=$ROOT_TOKEN

# unseal the vault
vault operator unseal $UNSEAL_KEY1
vault operator unseal $UNSEAL_KEY2
vault operator unseal $UNSEAL_KEY3

# Enable KV secrets engine (if not already enabled)
VAULT_TOKEN=$VAULT_TOKEN vault secrets enable -path=secret kv-v2
VAULT_TOKEN=$VAULT_TOKEN vault kv put --mount=secret django SECRET_KEY=$DJANGO_SECRET_KEY
VAULT_TOKEN=$VAULT_TOKEN vault kv put --mount=secret waf_api_key AGENT_TOKEN=$WAF_API_KEY

# Kill the Vault server running in the background (it was started earlier in nohup)
# pkill vault
echo $ROOT_TOKEN > /tmp/token.txt
# Run Vault in the foreground (this is required for the container to keep running)
# vault server -config=/etc/vault.d/vault-config.hcl

tail -f /dev/null
