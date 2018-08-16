import winston from 'winston';
import { Loggly } from 'winston-loggly-bulk';

const logger = new winston.Logger({
  transports: [
    new Loggly({
      json: true,
      subdomain: process.env.LOGGLY_SUBDOMAIN,
      token: process.env.LOGGLY_TOKEN,
      tags: ['twitch-overlay', 'admin'],
    }),
    new winston.transports.Console(),
  ],
});

export default logger;
