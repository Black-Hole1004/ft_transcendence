# Use the official PostgreSQL image as the base
FROM postgres:14

# Install necessary dependencies for retrieving secrets from Vault
RUN apt update && \
    apt install curl jq bash -y

COPY fetchData.sh /usr/local/bin/fetchData.sh
# Ensure the script is executable
RUN chmod +x /usr/local/bin/fetchData.sh

# Set entrypoint to the script that fetches secrets and then starts PostgreSQL
# ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh", "postgres"]
ENTRYPOINT ["/usr/local/bin/fetchData.sh"]
