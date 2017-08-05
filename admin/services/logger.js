const winston = require('winston');
require('winston-loggly-bulk');

winston.emitErrs = true;

const transports = [];

if (process.env.LOGGLY_SUBDOMAIN && process.env.LOGGLY_TOKEN) {
  transports.push(new winston.transports.Loggly({
    level: 'info',
    subdomain: process.env.LOGGLY_SUBDOMAIN,
    token: process.env.LOGGLY_TOKEN,
    json: true,
    tags: ['twitch-overlay', 'admin'],
  }));
}

transports.push(new winston.transports.Console({
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
}));

const logger = new winston.Logger({
  exitOnError: false,
  transports,
});

logger.stream = {
  write: function(message, encoding){
    logger.info(message);
  }
};

module.exports = logger;
