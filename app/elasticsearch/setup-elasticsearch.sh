#!/bin/bash

# Set memory map count
sysctl -w vm.max_map_count=262144

# Start elasticsearch
exec /usr/local/bin/docker-entrypoint.sh elasticsearch