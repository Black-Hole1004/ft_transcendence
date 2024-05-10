all: up

up:
	docker-compose up

build:
	docker-compose build

updetached:
	docker-compose up -d

down:
	docker-compose down

prune:
	docker system prune -af --volumes --force

.PHONY: up down prune