FROM docker.elastic.co/elasticsearch/elasticsearch:8.14.3

COPY ./conf/elasticsearch.yml /usr/share/elasticsearch/config/elasticsearch.yml

COPY ./fetchSecrets.sh /usr/share/elasticsearch/fetchSecrets.sh

USER root
RUN chmod +x /usr/share/elasticsearch/fetchSecrets.sh

ENTRYPOINT ["/usr/share/elasticsearch/fetchSecrets.sh"]