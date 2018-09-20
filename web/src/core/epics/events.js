import { of } from 'rxjs';
import { bufferTime, concatAll, delay, filter, map, mergeMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { STREAM_EVENTS_FULFILLED, showNewEvent } from 'actions';

// handle displaying new events
const newEventEpic = action$ =>
  action$.pipe(
    // filter to specific action
    ofType(STREAM_EVENTS_FULFILLED),
    // select events array
    map(action => action.payload.events),
    // buffer and merge arrays together
    bufferTime(500),
    // ignore empty buffers
    filter(buffer => buffer.length),
    // flatten buffer and add one null item
    map(buffer => buffer.reduce((a, b) => a.concat(b)).concat(null)),
    // create delayed observable for each event
    mergeMap(events =>
      events.map((event, i) => {
        if (i === 0) {
          return of(event);
        }
        return of(event).pipe(delay(20000));
      }),
    ),
    // concatenate all delayed observables
    concatAll(),
    // emit action for each event
    map(event => showNewEvent(event)),
  );

export default combineEpics(newEventEpic);
