FROM node:10.16.3

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./
# A wildcard is used to ensure both pnpm lock and workspace files are copied
COPY pnpm-*.yaml ./

# update the repository sources list
# and install dependencies
RUN apt-get update \
	&& apt-get install -y curl \
	&& apt-get -y autoclean

RUN curl -L https://unpkg.com/@pnpm/self-installer | node
RUN pnpm m install --production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "pnpm", "start" ]
