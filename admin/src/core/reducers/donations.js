import uniqBy from 'lodash/uniqBy';
import {
  FETCH_DONATIONS_FULFILLED,
  STREAM_DONATIONS_FULFILLED,
  UPDATE_DONATIONS,
} from 'actions';

const initialState = {
  items: [],
  newItems: [],
};

/** Remove duplicates and sort by date. */
function cleanDonations(items) {
  return uniqBy(items, 'externalId')
    .sort((a, b) => { // eslint-disable-line arrow-body-style
      return a.donationDate < b.donationDate ? 1 : -1;
    });
}

const donations = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DONATIONS_FULFILLED: {
      const items = cleanDonations([
        ...state.items,
        ...action.payload.donations,
      ]);
      return {
        ...state,
        items,
      };
    }
    case STREAM_DONATIONS_FULFILLED: {
      const newItems = cleanDonations([
        ...state.newItems,
        ...action.payload.donations,
      ]);
      return {
        ...state,
        newItems,
      };
    }
    case UPDATE_DONATIONS: {
      const items = cleanDonations([
        ...state.items,
        ...state.newItems,
      ]);
      return {
        ...state,
        items,
        newItems: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default donations;
