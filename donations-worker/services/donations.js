const moment = require('moment');
const request = require('request-promise-native');

const logger = require('./logger');
const db = require('./rethinkdb');

/** Fetch donations from Just Giving API. */
function fetch() {
  const appId = process.env.JUSTGIVING_APP_ID || '';
  const pageShortName = process.env.JUSTGIVING_PAGE || 'example';

  const donationsUrl = `https://api.justgiving.com/v1/fundraising/pages/${pageShortName}/donations?pageNum=1&pageSize=100`;

  logger.info(`Fetching ${donationsUrl}`);

  return db.initialise().then(() => request
    .get(donationsUrl, { json: true, headers: { 'x-api-key': appId} })
    .then(data => data.donations)
    .then(donations => donations.map(clean))
    .then(donations => donations.map(save))
    .catch((err) => {
      logger.error(err.message);
      return err;
    }));
}

/** Clean JSON data. */
function clean(donation) {
  const cleaned = Object.assign(donation, {
    donationDate: moment(donation.donationDate).toDate(),
    externalId: donation.id
  });

  delete cleaned.id;

  return cleaned;
}

/** Insert donation. */
function save(donation) {
  return db.retrieveDonation(donation.externalId).then(
    (arr) => {
      if (arr && arr.length) {
        logger.info(`Donation ${donation.externalId} already exists`);
        return null;
      }

      return db.insertDonation(donation).then(
        () => logger.info(`Saved donation ${donation.externalId}`)
      );
    }
  );
}

module.exports = { fetch };
