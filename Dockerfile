FROM node:10.14.2

ARG GITHUB_REGISTRY_AUTH_TOKEN
RUN echo "GITHUB_REGISTRY_AUTH_TOKEN: $GITHUB_REGISTRY_AUTH_TOKEN"

# Create app directory
RUN mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app
WORKDIR /usr/src/app

# update the repository sources list
# and install dependencies
RUN apt-get update \
	&& apt-get install -y curl \
	&& apt-get -y autoclean

USER node
# A wildcard is used to ensure both pnpm lock and workspace files are copied
COPY package*.json ./
COPY .npmrc ./

# Bundle app source
COPY --chown=node:node . .

RUN npm install --production=true

EXPOSE 8080

CMD [ "npm", "start" ]
