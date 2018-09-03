import { fetch } from './services/donations';
import logger from './services/logger';

const delay = process.env.POLL_INTERVAL || 1000 * 60 * 5;

logger.info(`Twitch overlay worker started with interval ${delay}`);

// Poll for new donations.
setInterval(() => fetch(), delay);

fetch();
