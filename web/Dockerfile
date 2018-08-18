FROM node:8.11.4-alpine

# Install dependencies
RUN apk update \
  && apk add nginx \
  && apk add yarn

# Install packages with yarn
RUN mkdir /tmp/packages
COPY package.json /tmp/packages/package.json
COPY yarn.lock /tmp/packages/yarn.lock
RUN cd /tmp/packages && yarn --production=false

# Copy packages to app directory
RUN mkdir /tmp/app
RUN mkdir -p /tmp/app && cp -a /tmp/packages/node_modules /tmp/app

# Copy all app files to directory
COPY . /tmp/app

# Compile app
RUN cd /tmp/app && yarn build

# Copy output to www directory
RUN mkdir /www \
  && cp -a /tmp/app/dist/. /www/ \
  && adduser -D -g 'www' www \
  && chown -R www:www /www

# Copy nginx config
RUN chown -R www:www /var/lib/nginx
COPY config/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "pid /tmp/nginx.pid; daemon off;"]
