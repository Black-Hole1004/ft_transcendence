echo "Creating ILM Policy"
curl -X PUT -u "elastic:${ELASTIC_PASSWORD}" \
--cacert ./config/certs/ca/ca.crt \
-H "Content-Type: application/json" \
https://elasticsearch:9200/_ilm/policy/life_cycle_policy \
-d '{
  "policy": {
    "phases": {
      "hot": {
        "actions": {
          "rollover": {
            "max_size": "50GB",
            "max_age": "30d"
          }
        }
      },
      "warm": {
        "actions": {
          "shrink": {
            "number_of_shards": 1
          }
        }
      },
      "cold": {
        "min_age": "60d",
        "actions": {
          "freeze": {}
        }
      },
      "delete": {
        "min_age": "90d",
        "actions": {
          "delete": {}
        }
      }
    }
  }
}'