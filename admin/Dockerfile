FROM node:8.11.4-alpine

# Install nginx
RUN apk update \
  && apk add nginx \
  && adduser -D -g 'www' www \
  && mkdir /www \
  && chown -R www:www /var/lib/nginx \
  && chown -R www:www /www

# Create temp folders
RUN mkdir /tmp/packages \
  && mkdir /tmp/app \
  && chown -R www:www /tmp/packages \
  && chown -R www:www /tmp/app

# Install yarn
RUN npm install -g -s --no-progress yarn

# Install packages with yarn
COPY package.json /tmp/packages/package.json
RUN cd /tmp/packages && yarn --production=false

# Copy packages to app directory
RUN mkdir -p /tmp/app && cp -a /tmp/packages/node_modules /tmp/app

# Copy all app files to directory
COPY . /tmp/app

# Compile app
RUN cd /tmp/app && yarn build

# Copy output to www directory
RUN cp -a /tmp/app/dist/. /www/ \
  && chown -R www:www /www

# Copy nginx config
COPY config/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "pid /tmp/nginx.pid; daemon off;"]
