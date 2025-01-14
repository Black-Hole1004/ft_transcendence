#!/bin/bash

# Vault address and token
apt-get update -qq
apt-get install jq curl -y -qq
VAULT_ADDR="http://vault:8200"
VAULT_TOKEN=$(head -n 1 /tmp/token.txt)

echo "Retrieving AGENT_TOKEN from Vault..."
echo $VAULT_TOKEN

# Secret path to retrieve AGENT_TOKEN (adjust path to your needs)
SECRET_PATH="secret/data/elasticsearch"

# ELASTIC_PASSWORD=test@test
# KIBANA_PASSWORD=test@test

# Retrieve the secret from Vault
ELASTIC_PASSWORD=$(curl -s -H "X-Vault-Token: $VAULT_TOKEN" -X GET $VAULT_ADDR/v1/$SECRET_PATH | jq -r '.data.data.ELASTIC_PASSWORD')
KIBANA_PASSWORD=$(curl -s -H "X-Vault-Token: $VAULT_TOKEN" -X GET $VAULT_ADDR/v1/$SECRET_PATH | jq -r '.data.data.KIBANA_PASSWORD')
# Set the AGENT_TOKEN as an environment variable
export ELASTIC_PASSWORD=$ELASTIC_PASSWORD
export KIBANA_PASSWORD=$KIBANA_PASSWORD

# echo "ELASTIC_PASSWORD: $ELASTIC_PASSWORD"
# echo "KIBANA_PASSWORD: $KIBANA_PASSWORD"

# Start the application
# ENTRYPOINT ["/bin/tini", "--", "/usr/local/bin/docker-entrypoint.sh"]
# # Dummy overridable parameter parsed by entrypoint
# CMD ["eswrapper"]
echo "Starting the application..."
# change user to 1000:0
# getent passwd | grep ':1000:'
su - elasticsearch -c "ELASTIC_PASSWORD=$ELASTIC_PASSWORD KIBANA_PASSWORD=$KIBANA_PASSWORD /bin/tini -s -- /usr/local/bin/docker-entrypoint.sh eswrapper"