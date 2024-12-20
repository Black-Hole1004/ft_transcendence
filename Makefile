.PHONY: all up build updetached down prune scan

all: ssl up

up:
	docker-compose up 

ssl:
	bash app/nginx/tools/generate_ssl.sh

build:
	docker-compose up --build

updetached:
	docker-compose up -d

down:
	docker-compose down
	@rm -rf ./app/postgres_data/*

prune:
	docker system prune -af --volumes --force
	@rm -rf ./app/postgres_data
	@rm -rf ./app/nginx/ssl_certificates
	@rm -rf ./app/redis_data
	@rm -rf ./app/elesticsearch_data

scan: build
	docker scan ft_transcendence-pingpong