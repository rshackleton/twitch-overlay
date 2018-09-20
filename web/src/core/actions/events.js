// action types
export const FETCH_EVENTS_FULFILLED = 'FETCH_EVENTS_FULFILLED';
export const STREAM_EVENTS_FULFILLED = 'STREAM_EVENTS_FULFILLED';
export const SHOW_NEW_EVENT = 'SHOW_NEW_EVENT';

// action creators
export const fetchEventsFulfilled = events => ({
  type: FETCH_EVENTS_FULFILLED,
  payload: { events },
});

export const streamEventsFulfilled = events => ({
  type: STREAM_EVENTS_FULFILLED,
  payload: { events },
});

export const showNewEvent = event => ({ type: SHOW_NEW_EVENT, payload: { event } });
