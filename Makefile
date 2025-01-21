.PHONY: all up build updetached down prune scan re

HOSTNAME := localhost
PWD = $(shell pwd)
all: up

up:
	echo $(HOSTNAME)
	sed -i '' 's#://[^/]*#://$(HOSTNAME)#g' app/frontend/.env
	sed -i '' 's#HOSTNAME_ENV=.*#HOSTNAME_ENV=$(HOSTNAME)#g' app/backend/.env
	sed -i '' 's#device: .*#devicde: $(PWD)/app/vault#g' docker-compose.yml
	echo "Creating vault files"
	touch app/vault/token.txt app/vault/unseal_key{1..3}.txt
	@# cat app/frontend/.env
	@rm -rf $(ls app/waf/ | grep -Ev 'local|advanced|tuning|tools|db' | sed 's|^|app/waf/|')
	@rm -rf ./app/db/postgres
	@rm -rf $(ls app/backend/UserManagement/migrations/ | grep -Ev '0001_initial.py' | sed 's|^|app/backend/UserManagement/migrations/|')
	docker-compose up --build

re: down up

ssl:
	bash app/nginx/tools/generate_ssl.sh

updetached:
	docker-compose up -d

down:
	docker-compose down

prune:
	docker system prune -af --volumes
	@rm -rf ./app/db/postgres
	@rm -rf ./app/data/*
	@find . -path "/migrations/.py" -not -name "init.py" -delete
	@find . -path "/migrations/.pyc" -delete

scan: build
	docker scan ft_transcendence-pingpong