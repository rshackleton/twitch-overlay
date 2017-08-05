import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';

import { FETCH_DONATION, fetchDonationFulfilled } from 'actions';

// api
const api = {
  fetchDonations: () => {
    const request = fetch('http://overlay-api.rshackleton.local/donations')
      .then(res => res.json());
    return Observable.from(request);
  },
};

// epic
const fetchDonationEpic = action$ =>
  action$.ofType(FETCH_DONATION)
    .mergeMap(() =>
      api.fetchDonations()
        .map(response => fetchDonationFulfilled(response)),
    );

export default combineEpics(
  fetchDonationEpic,
);
