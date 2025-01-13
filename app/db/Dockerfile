# Use the official PostgreSQL image as the base
FROM postgres:14

# Install necessary dependencies for retrieving secrets from Vault
RUN apt update && \
    apt install curl jq bash -y

# Copy the script that retrieves credentials from Vault
COPY setup.sh /usr/local/bin/setup.sh

# Ensure the script is executable
RUN chmod +x /usr/local/bin/setup.sh

# Set entrypoint to the script that fetches secrets and then starts PostgreSQL
# ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh", "postgres"]
EXPOSE 5432
ENTRYPOINT ["/usr/local/bin/setup.sh"]
