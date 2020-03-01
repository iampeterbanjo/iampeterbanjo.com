FROM node:12.14.0

ENV HOST 0.0.0.0
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Create app directory
RUN mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app
WORKDIR /usr/src/app

# update the repository sources list
# and install dependencies
RUN apt-get update \
	&& apt-get install -y --no-install-recommends curl=7.64.1 \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/*

USER node
# A wildcard is used to ensure both pnpm lock and workspace files are copied
COPY package*.json ./

# Bundle app source
COPY --chown=node:node . .

RUN npm install --production=true

EXPOSE 8080

CMD [ "npm", "start" ]
