FROM mhart/alpine-node:latest

ENV NODE_ENV production
ENV PORT 3000

ADD package.json /tmp/package.json
RUN cd /tmp && yarn --production=false
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app

WORKDIR /opt/app

ADD . /opt/app

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "start"]
