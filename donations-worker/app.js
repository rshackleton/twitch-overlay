const donations = require('./services/donations');
const logger = require('./services/logger');

const delay = process.env.POLL_INTERVAL || (1000 * 60 * 5);
const interval = setInterval(donations.fetch, delay);

logger.debug(`Twitch overlay worker started with interval ${delay}`);

donations.fetch();
