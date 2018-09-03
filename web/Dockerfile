FROM node:8.11.4-alpine

ENV NODE_ENV=production

ARG PORT=5000
ENV PORT=${PORT}

ARG HOST=0.0.0.0
ENV HOST=${HOST}

# Install dependencies
RUN apk update \
  && apk add yarn

# Create and add permissions for directories
RUN adduser -D -g www www \
  && mkdir /tmp/packages \
  && mkdir /opt/app \
  && chown -R www:www /tmp/packages \
  && chown -R www:www /opt/app

# Switch to nginx user
USER www:www

# Install packages with yarn
COPY package.json /tmp/packages/package.json
COPY yarn.lock /tmp/packages/yarn.lock
RUN cd /tmp/packages \
  && yarn --production=false

# Copy packages to app directory
RUN cp -a /tmp/packages/node_modules /opt/app

# Copy all app files to directory
WORKDIR /opt/app
COPY . /opt/app

# Expose default port
EXPOSE ${PORT}

# Build app and run nginx in foreground
CMD ["yarn", "start"]
