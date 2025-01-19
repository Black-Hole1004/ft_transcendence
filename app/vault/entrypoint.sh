#!/bin/bash

# Start Vault server in the background (without the need to wait)
apk update
apk add jq curl
export VAULT_TOKEN=root
mkdir -p /vault/data
nohup vault server -config=/etc/vault.d/vault-config.hcl &

# Wait for Vault to start up (it can take a moment)
sleep 5

initialize_vault() {
  echo "Initializing Vault..."
  vault operator init -key-shares=3 -key-threshold=3 > /tmp/vault-init.log

  # Check if Vault is already initialized
  if grep -q "Vault is already initialized" /tmp/vault-init.log; then
    echo "Vault is already initialized. Exiting..."
    return 0
  fi

  # Capture keys and tokens from the init output
  UNSEAL_KEY1=$(grep 'Key 1:' /tmp/vault-init.log | awk '{print $NF}')
  UNSEAL_KEY2=$(grep 'Key 2:' /tmp/vault-init.log | awk '{print $NF}')
  UNSEAL_KEY3=$(grep 'Key 3:' /tmp/vault-init.log | awk '{print $NF}')
  ROOT_TOKEN=$(grep 'Initial Root Token' /tmp/vault-init.log | awk '{print $NF}')

  # Check if keys and tokens are successfully extracted
  if [[ -z $UNSEAL_KEY1 || -z $UNSEAL_KEY2 || -z $UNSEAL_KEY3 || -z $ROOT_TOKEN ]]; then
    echo "Error: Failed to extract unseal keys or root token. Retrying..."
    return 1
  fi

  # Unseal Vault using the keys
  echo "Unsealing Vault..."
  vault operator unseal $UNSEAL_KEY1
  vault operator unseal $UNSEAL_KEY2
  vault operator unseal $UNSEAL_KEY3

  # Login and set up secrets
  export VAULT_TOKEN=$ROOT_TOKEN
  echo "Setting up secrets..."
  vault login $VAULT_TOKEN
  vault secrets enable -path=secret kv-v2 || echo "KV secrets engine already enabled."
  vault kv put --mount=secret django SECRET_KEY=$DJANGO_SECRET_KEY SOCIAL_AUTH_GOOGLE_OAUTH2_KEY=$SOCIAL_AUTH_GOOGLE_OAUTH2_KEY SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET=$SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET SOCIAL_AUTH_INTRA42_KEY=$SOCIAL_AUTH_INTRA42_KEY SOCIAL_AUTH_INTRA42_SECRET=$SOCIAL_AUTH_INTRA42_SECRET
  vault kv put --mount=secret waf_api_key AGENT_TOKEN=$WAF_API_KEY
  vault kv put --mount=secret postgres POSTGRES_DB=$POSTGRES_DB POSTGRES_USER=$POSTGRES_USER POSTGRES_PASSWORD=$POSTGRES_PASSWORD POSTGRES_HOST=$POSTGRES_HOST POSTGRES_PORT=$POSTGRES_PORT
  vault kv put --mount=secret elasticsearch ELASTIC_PASSWORD=$ELASTIC_PASSWORD KIBANA_PASSWORD=$KIBANA_PASSWORD
  vault kv put --mount=secret appsec APPSEC_DB_PASSWORD=$APPSEC_DB_PASSWORD APPSEC_DB_USER=$APPSEC_DB_USER APPSEC_DB_HOST=$APPSEC_DB_HOST

  # Save keys and token for future use
  echo $ROOT_TOKEN > /tmp/token.txt
  echo $UNSEAL_KEY1 > /tmp/unseal_key1.txt
  echo $UNSEAL_KEY2 > /tmp/unseal_key2.txt
  echo $UNSEAL_KEY3 > /tmp/unseal_key3.txt

  echo "Vault setup completed successfully."
  return 0
}

# Retry logic
MAX_RETRIES=3
for ((i = 1; i <= $MAX_RETRIES; i++)); do
  echo "Attempt $i to initialize Vault..."
  if initialize_vault; then
    echo "Vault initialized successfully."
    break
  else
    echo "Vault initialization failed. Retrying in 5 seconds..."
    sleep 5
  fi

  # Exit after maximum retries
  if [[ $i -eq $MAX_RETRIES ]]; then
    echo "Error: Vault initialization failed after $MAX_RETRIES attempts."
    exit 1
  fi
done

# Keep the container running
tail -f /dev/null
