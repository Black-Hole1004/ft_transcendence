.PHONY: all up build updetached down prune scan

all: up

up:
	docker-compose up --build

build:
	docker-compose build

updetached:
	docker-compose up -d

down:
	docker-compose down
	@rm -rf ./app/postgres_data

prune:
	docker system prune -af --volumes --force
	@rm -rf ./app/postgres_data

scan: build
	docker scan ft_transcendence-pingpong