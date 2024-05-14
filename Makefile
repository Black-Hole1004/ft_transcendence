all: up

up:
	docker-compose up --build

build:
	docker-compose build

updetached:
	docker-compose up -d

down:
	docker-compose down

prune:
	docker system prune -af --volumes --force

scan: build
	docker scan ft_transcendence-pingpong

.PHONY: up down prune