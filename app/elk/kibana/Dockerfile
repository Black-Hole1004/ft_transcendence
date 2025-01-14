FROM docker.elastic.co/kibana/kibana:8.14.3

COPY ./conf/kibana.yml /usr/share/kibana/config/kibana.yml

COPY fetchSecrets.sh /usr/share/kibana/fetchSecrets.sh

USER root
RUN chmod +x /usr/share/kibana/fetchSecrets.sh

ENTRYPOINT ["/usr/share/kibana/fetchSecrets.sh"]