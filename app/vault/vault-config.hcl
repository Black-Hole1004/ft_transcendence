# Enable the listener for HTTP
listener "tcp" {
    address = "0.0.0.0:8200"  # Bind to all interfaces
    cluster_address = "127.0.0.1:8201"  # Same for the Raft cluster
    tls_disable = 1  # Disable TLS (for dev purposes, not recommended for production)
}

# Raft storage backend
storage "raft" {
  path    = "/vault/data"   # Absolute path for data storage
  node_id = "test.test"     # Unique node ID for Raft
}

# Enable the UI (optional)
ui = true

# Enable Key-Value (KV) secrets engine
secrets "kv" {
  path = "secret/"
}

# Disable mlock (optional for development environments)
disable_mlock = true

# API and Cluster addresses
api_addr      = "http://127.0.0.1:8200"
cluster_addr  = "http://127.0.0.1:8201"