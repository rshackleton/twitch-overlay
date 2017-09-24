import uniqBy from 'lodash/uniqBy';
import {
  FETCH_DONATIONS_FULFILLED,
  STREAM_DONATIONS_FULFILLED,
  SHOW_NEW_DONATION,
} from 'actions';

const initialState = {
  items: [],
  total: 0,
  top: null,
};

const donations = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DONATIONS_FULFILLED:
    case STREAM_DONATIONS_FULFILLED: {
      const items = cleanDonations([
        ...state.items,
        ...action.payload.donations,
      ]);
      return {
        ...state,
        items,
        top: getTopDonation(items),
        total: getDonationTotal(items),
      };
    }
    case SHOW_NEW_DONATION: {
      return {
        ...state,
        new: action.payload.donation ?
          cleanDonation(action.payload.donation) :
          null,
      };
    }
    default: {
      return state;
    }
  }
};

/** De-dupe donations, clean and apply sorting. */
function cleanDonations(items) {
  return uniqBy(items, 'externalId')
    .map(cleanDonation)
    .sort(sortByDate);
}

/** Clean donation. */
function cleanDonation(donation) {
  return {
    ...donation,
    amount: parseFloat(donation.amount, 10),
  };
}

/** Calculate donation total. */
function getDonationTotal(items) {
  return [...items]
    .map(a => a.amount)
    .reduce((a, b) => a + b, 0);
}

/** Calculate donation total. */
function getTopDonation(items) {
  const sorted = [...items]
    .sort(sortByAmount);

  return sorted[0];
}

/** Sort donations by amount. */
function sortByAmount(a, b) {
  return a.amount < b.amount ? 1 : -1;
}

/** Sort donations by date. */
function sortByDate(a, b) {
  return a.donationDate < b.donationDate ? 1 : -1;
}

export default donations;
