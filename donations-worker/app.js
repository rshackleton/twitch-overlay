const winston = require('winston');
require('winston-loggly-bulk');

const donationsService = require('./services/donationsService');

winston.add(winston.transports.Loggly, {
  subdomain: process.env.LOGGLY_SUBDOMAIN,
  token: process.env.LOGGLY_TOKEN,
  json: true,
  tags: ['twitch-overlay', 'donation-worker'],
});

winston.info('JustGiving API Worker Started');

const delay = process.env.POLL_INTERVAL || (1000 * 60 * 5);
const interval = setInterval(donationsService.fetchDonations, delay);
