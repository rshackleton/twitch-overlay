import uniqBy from 'lodash/uniqBy';
import {
  FETCH_DONATIONS_FULFILLED,
  STREAM_DONATIONS_FULFILLED,
} from 'actions';

const donations = (state = [], action) => {
  switch (action.type) {
    case FETCH_DONATIONS_FULFILLED: {
      return uniqBy([...action.payload.donations], 'externalId')
        .sort((a, b) => { // eslint-disable-line arrow-body-style
          return a.donationDate < b.donationDate ? 1 : -1;
        });
    }
    case STREAM_DONATIONS_FULFILLED: {
      return uniqBy([...state, ...action.payload.donations], 'externalId')
        .sort((a, b) => { // eslint-disable-line arrow-body-style
          return a.donationDate < b.donationDate ? 1 : -1;
        });
    }
    default: {
      return state;
    }
  }
};

export default donations;
