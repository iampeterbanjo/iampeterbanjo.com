FROM node:10.16.3

# Create app directory
RUN mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app
WORKDIR /usr/src/app

# update the repository sources list
# and install dependencies
RUN apt-get update \
	&& apt-get install -y curl \
	&& apt-get install -y direnv \
	&& apt-get -y autoclean

RUN curl -L https://unpkg.com/@pnpm/self-installer | node

USER node
COPY package.json ./
# A wildcard is used to ensure both pnpm lock and workspace files are copied
COPY pnpm-*.yaml ./
COPY .envrc ./

RUN direnv allow
RUN pnpm install

# Bundle app source
COPY --chown=node:node . .

EXPOSE 8080
CMD [ "pnpm", "start" ]
