FROM mhart/alpine-node:latest

ENV NODE_ENV production

ADD package.json /tmp/package.json
RUN cd /tmp && yarn --production=false
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app

WORKDIR /opt/app

ADD . /opt/app

CMD ["yarn", "start"]
