const donationsService = require('./services/donationsService');

const delay = process.env.POLL_INTERVAL || (1000 * 60 * 5);
const interval = setInterval(donationsService.fetchDonations, delay);
