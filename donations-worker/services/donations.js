import firebase from 'firebase';
import 'firebase/firestore';
import moment from 'moment';
import { get } from 'request-promise-native';

import logger from './logger';

// Initialise firebase reference.
firebase.initializeApp({
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
});

// Initialise firestore reference.
var db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

/** Fetch donations from Just Giving API. */
export async function fetch() {
  try {
    // Get new donations from api.
    let newDonations = await getDonations();

    logger.info(`Fetched ${newDonations.length} donations.`);

    // Get existing donations from db.
    const collection = db.collection('donations');
    const existingDonations = await collection.get();

    // Filter out donations that already exist in db.
    newDonations = newDonations.filter(
      d1 => !existingDonations.docs.some(d2 => d1.externalId === d2.data().externalId),
    );

    logger.info(`Adding ${newDonations.length} new donations.`);

    // Add all new donations.
    newDonations.forEach(donation => collection.add(donation));
  } catch (error) {
    logger.error(error);
  }
}

/** Get latest donations from JustGiving. */
async function getDonations() {
  const donationsUrl = getDonationsUrl();
  logger.info(`Fetching ${donationsUrl}`);

  const appId = process.env.JUSTGIVING_APP_ID || '';
  const data = await get(donationsUrl, {
    headers: { 'x-api-key': appId },
    json: true,
  });

  const newDonations = data.donations.map(clean);
  return newDonations;
}

/** Get JustGiving API URL. */
function getDonationsUrl() {
  const pageShortName = process.env.JUSTGIVING_PAGE || 'example';
  const donationsUrl = `https://api.justgiving.com/v1/fundraising/pages/${pageShortName}/donations?pageNum=1&pageSize=100`;
  return donationsUrl;
}

/** Clean JSON data. */
function clean(donation) {
  const cleaned = Object.assign(donation, {
    donationDate: moment(donation.donationDate).toDate(),
    externalId: donation.id,
  });

  delete cleaned.id;

  return cleaned;
}
