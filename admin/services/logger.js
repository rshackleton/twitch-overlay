const winston = require('winston');
require('winston-loggly-bulk');

winston.emitErrs = true;

const logger = new winston.Logger({
  transports: [
    new winston.transports.Loggly({
      level: 'info',
      subdomain: process.env.LOGGLY_SUBDOMAIN,
      token: process.env.LOGGLY_TOKEN,
      json: true,
      tags: ['twitch-overlay', 'admin'],
    }),
    new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    }),
  ],
  exitOnError: false
});

logger.stream = {
  write: function(message, encoding){
    logger.info(message);
  }
};

module.exports = logger;
