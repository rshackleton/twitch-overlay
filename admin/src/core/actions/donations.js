// action types
export const FETCH_DONATION = 'FETCH_DONATION';
export const FETCH_DONATION_FULFILLED = 'FETCH_DONATION_FULFILLED';

// action creators
export const fetchDonations =
  fromId => ({ type: FETCH_DONATION, payload: { fromId } });

export const fetchDonationFulfilled =
  donations => ({ type: FETCH_DONATION_FULFILLED, payload: { donations } });
