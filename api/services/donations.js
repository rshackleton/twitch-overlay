const Rx = require('rxjs');
const createObservable = require('rethinkdb-observable')
const faker = require('faker');

const logger = require('./logger');
const db = require('./rethinkdb');

function all() {
  return db.initialise()
    .then(() => db.retrieveDonations())
    .catch((err) => {
      logger.error(err.message);
      return err;
    });
}

function insertTest() {
  const amount = faker.finance.amount();

  const donation = {
    amount: amount,
    charityId: 2116,
    currencyCode: "GBP",
    donationDate: new Date(),
    donationRef: null,
    donorDisplayName: faker.name.findName(),
    donorLocalAmount: amount,
    donorLocalCurrencyCode: "GBP",
    estimatedTaxReclaim: (amount * 0.25),
    externalId: faker.random.number({ min: 100000000, max: 999999999 }),
    image: "https://www.justgiving.com/content/images/graphics/icons/avatars/facebook-avatar.gif",
    message: faker.lorem.sentence(),
    source: "SponsorshipDonations",
    thirdPartyReference: null,
  };

  return db.initialise()
    .then(() => db.insertDonation(donation))
    .catch((err) => {
      logger.error(err.message);
      return err;
    });
}

function stream() {
  return db.initialise()
    .then(() => db.streamDonations())
    .then((cursor) => createObservable(cursor));
}

module.exports = {
  all,
  insertTest,
  stream,
};
