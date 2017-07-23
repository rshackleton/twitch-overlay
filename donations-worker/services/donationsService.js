const moment = require('moment');
const request = require('request-promise-native');
const winston = require('winston');

const dbService = require('./dbService');

function fetchDonations() {
  const appId = process.env.JUSTGIVING_APP_ID || '';
  const pageShortName = process.env.JUSTGIVING_PAGE || 'example';

  const donationsUrl = `https://api.justgiving.com/v1/fundraising/pages/${pageShortName}/donations`;

  winston.info(`Fetching ${donationsUrl}`);

  return request
    .get(donationsUrl, { json: true, headers: { 'x-api-key': appId} })
    .then(data => cleanDonations(data.donations))
    .then(donations => storeDonations(donations))
    .catch(function (err) {
      winston.error(err.message);
      return err;
    });
}

function cleanDonations(donations) {
  return donations.map(cleanDonation);
}

function cleanDonation(donation) {
  const cleaned = Object.assign(donation, {
    donationDate: moment(donation.donationDate).toDate(),
    externalId: donation.id
  });

  delete cleaned.id;

  return cleaned;
}

function storeDonations(donations) {
  return donations.map(function (donation) {
    return dbService.saveDonation(donation);
  });
}

module.exports = { fetchDonations };
