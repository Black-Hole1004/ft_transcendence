.PHONY: all up build updetached down prune scan re

HOSTNAME := localhost
all: up

up:
	echo $(HOSTNAME)
	sed -i '' 's#://[^/]*#://$(HOSTNAME)#g' app/frontend/.env
	sed -i '' 's#HOSTNAME_ENV=.*#HOSTNAME_ENV=$(HOSTNAME)#g' app/backend/.env
	@# cat app/frontend/.env
	@rm -rf $(ls app/waf/ | grep -Ev 'local|advanced|tuning|tools|db' | sed 's|^|app/waf/|')
	@rm -rf ./app/db/postgres
	docker-compose up --build

re: down up

ssl:
	bash app/nginx/tools/generate_ssl.sh

updetached:
	docker-compose up -d

down:
	docker-compose down
	@rm -rf ./app/data/*

prune:
	docker system prune -af --volumes --force
	@rm -rf ./app/data
	@rm -rf ./app/nginx/ssl_certificates
	@rm -rf ./app/nginx/logs/access.log
	@rm -rf ./app/nginx/logs/error.log

scan: build
	docker scan ft_transcendence-pingpong