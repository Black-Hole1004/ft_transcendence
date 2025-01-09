#!/bin/bash


########## part 1 ##########
if [ -z "${ELASTIC_PASSWORD}" ] || [ -z "${KIBANA_PASSWORD}" ]; then
    echo "Set the ELASTIC_PASSWORD and KIBANA_PASSWORD environment variables in the .env file"
    exit 1
fi

########## part 2 ##########
if [ ! -f config/certs/ca.zip ]; then
    echo "Creating CA"
    bin/elasticsearch-certutil ca --silent --pem -out config/certs/ca.zip
    unzip config/certs/ca.zip -d config/certs
fi

########## part 3 ##########
if [ ! -f config/certs/certs.zip ]; then
    echo "Creating certs"
    cat > config/certs/instances.yml <<EOL
instances:
  - name: elasticsearch
    dns:
      - elasticsearch
      - $HOSTNAME
    ip:
      - 127.0.0.1
  - name: kibana
    dns:
      - kibana
      - $HOSTNAME
    ip:
      - 127.0.0.1
  - name: logstash
    dns:
      - logstash
      - $HOSTNAME
    ip:
      - 127.0.0.1
EOL
    echo "Creating certs for elasticsearch, kibana, and logstash"
    bin/elasticsearch-certutil cert --silent --pem -out config/certs/certs.zip --in \
      config/certs/instances.yml --ca-cert config/certs/ca/ca.crt --ca-key config/certs/ca/ca.key
    unzip config/certs/certs.zip -d config/certs
fi

########## part 4 ##########
echo "Setting file permissions"
chown -R root:root config/certs
find config/certs -type d -exec chmod 750 {} \;
find config/certs -type f -exec chmod 640 {} \;

########## part 5 ##########
echo "Waiting for Elasticsearch availability"
until curl -s --cacert config/certs/ca/ca.crt https://elasticsearch:9200 \
  | grep -q "missing authentication credentials"; do sleep 5; done

########## part 6 ##########
echo "stting Kiabana password"
until curl -s \
  -X POST https://elasticsearch:9200/_security/user/kibana_system/_password \
  --cacert config/certs/ca/ca.crt \
  -u "elastic:${ELASTIC_PASSWORD}" \
  -H "Content-Type: application/json" \
  -d "{\"password\":\"${KIBANA_PASSWORD}\"}" \
  | grep -q "^{}"; do sleep 5; done



########## part 7 ##########
# Path to the ILM policy creation script
ILM_POLICY_SCRIPT="./create_ilm_policy.sh"

# Check if the ILM policy script exists
if [ -f "$ILM_POLICY_SCRIPT" ]; then
    echo "Running ILM Policy Creation Script"
    # Make sure the script is executable
    chmod +x "$ILM_POLICY_SCRIPT"
    
    # Execute the script
    "$ILM_POLICY_SCRIPT"
    
    # Check the exit status
    if [ $? -eq 0 ]; then
        echo "-----------------> ILM Policy created successfully <---------------------"
    else
        echo "-----------------> Failed to create ILM Policy <---------------------"
    fi
fi