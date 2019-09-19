BUILD=docker build -t iampeterbanjo/hapi .
REBUILD=docker build --no-cache -t iampeterbanjo/hapi .
EXEC=docker exec -it iampeterbanjo-app /bin/bash
REMOVE=docker rm iampeterbanjo-app
RUN=docker run --network=host --env-file .env -d -it -p 8080:8080 --name iampeterbanjo-app iampeterbanjo/hapi
START=docker start iampeterbanjo-app
STOP=docker stop iampeterbanjo-app
LOGS=docker logs iampeterbanjo-app
INSTALL=cd packages/{css,data,server}; npm install
SERVER-NPM=cd packages/server; npm
WATCH-TEST=cd packages/server; npm run watch-test

.PHONY: build
build: ## build docker image
	$(BUILD)

.PHONY: exec
exec: # enter the container
	$(EXEC)

.PHONY: logs
logs: # container logs
	$(LOGS)

.PHONY: reload
reload: # stop, rm, build, run
	$(STOP) && $(REMOVE) && $(REBUILD) && $(RUN)

.PHONY: rm
rm: # remove image
	$(REMOVE)

.PHONY: run
run: ## run docker image
	$(RUN)

.PHONY: start
start: # start image
	$(START)

.PHONY: stop
stop: # stop image
	$(STOP)

.PHONY: install
install: # install packages
	$(INSTALL)

.PHONY: server-npm
server-npm: # run commands in server directory
	@echo $(SERVER-NPM) $(filter-out $@,$(MAKECMDGOALS))
%:
	@:

.PHONY: watch-test
watch-test: # run commands in server directory
	$(WATCH-TEST)

.PHONY: help
help:
@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
