FROM mhart/alpine-node:latest

ENV NODE_ENV production

COPY package.json /tmp/package.json
RUN cd /tmp && yarn --production=false
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app

WORKDIR /opt/app

COPY . /opt/app

CMD ["yarn", "start"]
