import uniqBy from 'lodash/uniqBy';
import {
  FETCH_DONATIONS_FULFILLED,
  STREAM_DONATIONS_FULFILLED,
} from 'actions';

const initialState = {
  items: [],
  total: 0,
  top: null,
};

/** Remove duplicates and sort by date. */
function cleanDonations(items) {
  return uniqBy(items, 'externalId')
    .map(a => ({ ...a, amount: parseFloat(a.amount, 10) }))
    .sort((a, b) => { // eslint-disable-line arrow-body-style
      return a.donationDate < b.donationDate ? 1 : -1;
    });
}

/** Calculate donation total. */
function getTotal(items) {
  return [...items]
    .map(a => a.amount)
    .reduce((a, b) => a + b, 0);
}

/** Calculate donation total. */
function getTop(items) {
  const sorted = [...items]
    .sort((a, b) => { // eslint-disable-line arrow-body-style
      return a.amount < b.amount ? 1 : -1;
    });

  return sorted[0];
}

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
        top: getTop(items),
        total: getTotal(items),
      };
    }
    default: {
      return state;
    }
  }
};

export default donations;
