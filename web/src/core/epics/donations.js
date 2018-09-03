import { of } from 'rxjs';
import { bufferTime, concatAll, delay, filter, map, mergeMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { STREAM_DONATIONS_FULFILLED, showNewDonation } from 'actions';

// handle displaying new donations
const newDonationEpic = action$ =>
  action$.pipe(
    // filter to specific action
    ofType(STREAM_DONATIONS_FULFILLED),
    // select donations array
    map(action => action.payload.donations),
    // buffer and merge arrays together
    bufferTime(500),
    // ignore empty buffers
    filter(buffer => buffer.length),
    // flatten buffer and add one null item
    map(buffer => buffer.reduce((a, b) => a.concat(b)).concat(null)),
    // create delayed observable for each donation
    mergeMap(donations =>
      donations.map((donation, i) => {
        if (i === 0) {
          return of(donation);
        }
        return of(donation).pipe(delay(20000));
      }),
    ),
    // concatenate all delayed observables
    concatAll(),
    // emit action for each donation
    map(donation => showNewDonation(donation)),
  );

export default combineEpics(newDonationEpic);
