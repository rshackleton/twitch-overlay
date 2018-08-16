import Rx from 'rxjs';
import faker from 'faker';

import db from './db';
import logger from './logger';

/** Get all donations, most recent first. */
async function all() {
  try {
    return await db
      .collection('donations')
      .orderBy('donationDate', 'desc')
      .get()
      .then(res => res.docs.map(doc => doc.data()));
  } catch (error) {
    logger.error(error);
  }
}

/** Create test donation. */
async function insertTest() {
  try {
    const amount = faker.finance.amount();

    const donation = {
      amount: amount,
      charityId: 2116,
      currencyCode: 'GBP',
      donationDate: new Date(),
      donationRef: null,
      donorDisplayName: faker.name.findName(),
      donorLocalAmount: amount,
      donorLocalCurrencyCode: 'GBP',
      estimatedTaxReclaim: amount * 0.25,
      externalId: faker.random.number({ min: 100000000, max: 999999999 }),
      image: 'https://www.justgiving.com/content/images/graphics/icons/avatars/facebook-avatar.gif',
      message: faker.lorem.sentence(),
      source: 'SponsorshipDonations',
      thirdPartyReference: null,
    };

    return await db
      .collection('donations')
      .add(donation)
      .then(ref => ref.get())
      .then(doc => doc.data());
  } catch (error) {
    logger.error(error);
  }
}

/** Create observable from firestore subscription. */
function stream() {
  try {
    const observable = Rx.Observable.create(observer => {
      db.collection('donations').onSnapshot(
        snapshot => {
          observer.next(snapshot);
        },
        error => {
          observer.error(error);
        },
      );
    });

    // Skip the first snapshot as that includes all existing donations.
    return observable.skip(1);
  } catch (error) {
    logger.error(error);
  }
}

module.exports = {
  all,
  insertTest,
  stream,
};
