// action types
export const FETCH_DONATIONS = 'FETCH_DONATIONS';
export const FETCH_DONATIONS_FULFILLED = 'FETCH_DONATIONS_FULFILLED';
export const STREAM_DONATIONS_FULFILLED = 'STREAM_DONATIONS_FULFILLED';

// action creators
export const fetchDonations =
  fromId => ({ type: FETCH_DONATIONS, payload: { fromId } });

export const fetchDonationsFulfilled =
  donations => ({ type: FETCH_DONATIONS_FULFILLED, payload: { donations } });

export const streamDonationsFulfilled =
  donations => ({ type: STREAM_DONATIONS_FULFILLED, payload: { donations } });
