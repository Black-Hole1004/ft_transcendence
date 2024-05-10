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
	docker system prune --volumes --force

.PHONY: up down prune