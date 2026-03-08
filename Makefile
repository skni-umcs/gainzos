SHELL := /bin/bash

ROOT_DIR := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))
SERVER_DIR := $(ROOT_DIR)apps/server
WEB_DIR := $(ROOT_DIR)apps/web
SERVER_ENV_FILE := $(SERVER_DIR)/.env
WEB_ENV_FILE := $(WEB_DIR)/.env

COMPOSE_FILE := $(ROOT_DIR)docker-compose.yml
COMPOSE := docker compose -f $(COMPOSE_FILE)
COMPOSE_PROJECT ?= gainzos
DB_VOLUME ?= $(COMPOSE_PROJECT)_pgdata
MASTER_CHANGELOG := classpath:db/changelog/db.changelog-master.yaml

.PHONY: db\:start db\:stop db\:migrate db\:reset dev\:web dev\:server dev\:server\:watch build

db\:start:
	$(COMPOSE) up -d db

db\:stop:
	$(COMPOSE) stop db

db\:reset:
	$(COMPOSE) stop db || true
	$(COMPOSE) rm -f db || true
	docker volume rm -f $(DB_VOLUME) || true
	$(COMPOSE) up -d db

dev\:web:
	set -a; source $(WEB_ENV_FILE); set +a; cd $(WEB_DIR) && npm run dev

dev\:server:
	set -a; source $(SERVER_ENV_FILE); set +a; \
	cd $(SERVER_DIR) && ./gradlew -t compileJava &
	set -a; source $(SERVER_ENV_FILE); set +a; cd $(SERVER_DIR) && ./gradlew bootRun

build:
	cd $(SERVER_DIR) && ./gradlew clean build
	set -a; source $(WEB_ENV_FILE); set +a; cd $(WEB_DIR) && npm run build
