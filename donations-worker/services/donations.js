const moment = require('moment');
const request = require('request-promise-native');

const logger = require('./logger');
const models = require('../models');

function fetch() {
  const appId = process.env.JUSTGIVING_APP_ID || '';
  const pageShortName = process.env.JUSTGIVING_PAGE || 'example';

  const donationsUrl = `https://api.justgiving.com/v1/fundraising/pages/${pageShortName}/donations`;

  logger.info(`Fetching ${donationsUrl}`);

  return request
    .get(donationsUrl, { json: true, headers: { 'x-api-key': appId} })
    .then(data => data.donations)
    .then(donations => donations.map(clean))
    .then(donations => donations.map(save))
    .catch(function (err) {
      logger.error(err.message);
      return err;
    });
}

function clean(donation) {
  const cleaned = Object.assign(donation, {
    donationDate: moment(donation.donationDate).toDate(),
    externalId: donation.id
  });

  delete cleaned.id;

  return cleaned;
}

function save(donation) {
  // Check for existing donation.
  return models.Donation.findOne({ externalId: donation.externalId }).then(
    (doc) => {
      if (doc) {
        logger.info(`Donation ${donation.externalId} already exists`);
        return null;
      }

      // Create donation model.
      var model = new models.Donation(donation);

      // Save to mongodb.
      return model.save()
        .then((model) => {
          logger.info(`Saved donation ${donation.externalId}`);
          return model;
        })
        .catch((err) => {
          logger.error(err);
          return err;
        });
    },
    (err) => {
      logger.error(err);
      return null;
    }
  );
}

module.exports = { fetch };
