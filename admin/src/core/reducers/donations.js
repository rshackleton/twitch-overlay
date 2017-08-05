import { FETCH_DONATION_FULFILLED } from 'actions';

const donations = (state = [], action) => {
  switch (action.type) {
    case FETCH_DONATION_FULFILLED: {
      return [...action.payload.donations];
    }
    default: {
      return state;
    }
  }
};

export default donations;
