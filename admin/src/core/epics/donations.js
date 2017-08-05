/* global API_HOST:false, API_PROTOCOL:false */
import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';

import {
  FETCH_DONATIONS,
  fetchDonationsFulfilled,
} from 'actions';

// api
const api = {
  fetchDonations: () => {
    const request = fetch(`${API_PROTOCOL}://${API_HOST}/donations`)
      .then(res => res.json());
    return Observable.from(request);
  },
};

// epic
const fetchDonationEpic = action$ =>
  action$.ofType(FETCH_DONATIONS)
    .mergeMap(() =>
      api.fetchDonations()
        .map(response => fetchDonationsFulfilled(response)),
    );

export default combineEpics(
  fetchDonationEpic,
);
