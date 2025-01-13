FROM docker.elastic.co/kibana/kibana:8.14.3

COPY ./conf/kibana.yml /usr/share/kibana/config/kibana.yml

COPY ./fetchSecrets.sh /usr/share/elasticsearch/fetchSecrets.sh

USER root
RUN chmod +x /usr/share/elasticsearch/fetchSecrets.sh

CMD ["/usr/share/elasticsearch/fetchSecrets.sh"]