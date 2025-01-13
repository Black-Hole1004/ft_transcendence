FROM ghcr.io/openappsec/smartsync-tuning:1.1.20

USER root
RUN apk update && apk add curl jq bash

COPY fetchDBCreds.sh /usr/local/bin/fetchDBCreds.sh

RUN chmod +x /usr/local/bin/fetchDBCreds.sh

USER appuser
ENTRYPOINT ["/usr/local/bin/fetchDBCreds.sh"]