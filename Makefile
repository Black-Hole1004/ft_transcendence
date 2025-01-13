.PHONY: all up build updetached down prune scan

HOSTNAME := localhost
all: up

up:
	echo $(HOSTNAME)
	sed -i '' 's#://[^/]*#://$(HOSTNAME)#g' app/frontend/.env
	cat app/frontend/.env
	@rm -rf $( ls | grep -v local | grep -v advanced)
	docker-compose up --build 

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
	@rm -rf ./app/data
	@rm -rf ./app/nginx/ssl_certificates
	@rm -rf ./app/nginx/logs/access.log
	@rm -rf ./app/nginx/logs/error.log

scan: build
	docker scan ft_transcendence-pingpong