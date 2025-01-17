# Use the official HashiCorp Vault image as the base
FROM hashicorp/vault:latest

# Set environment variables for Vault
ENV VAULT_ADDR=http://127.0.0.1:8200
ENV CONSUL_ADDR=http://127.0.0.1:8500

#todo: remove it when using docker-compose

COPY vault-config.hcl /etc/vault.d/vault-config.hcl

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose Vault's default port
EXPOSE 8200

ENTRYPOINT ["/entrypoint.sh"]