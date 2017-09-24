// action types
export const FETCH_DONATIONS_FULFILLED = 'FETCH_DONATIONS_FULFILLED';
export const STREAM_DONATIONS_FULFILLED = 'STREAM_DONATIONS_FULFILLED';
export const SHOW_NEW_DONATION = 'SHOW_NEW_DONATION';

// action creators
export const fetchDonationsFulfilled =
  donations => ({ type: FETCH_DONATIONS_FULFILLED, payload: { donations } });

export const streamDonationsFulfilled =
  donations => ({ type: STREAM_DONATIONS_FULFILLED, payload: { donations } });

export const showNewDonation =
  donation => ({ type: SHOW_NEW_DONATION, payload: { donation } });
