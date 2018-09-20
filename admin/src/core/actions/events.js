import { SCROLL } from 'middleware';

// action types
export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_EVENTS_FULFILLED = 'FETCH_EVENTS_FULFILLED';
export const STREAM_EVENTS_FULFILLED = 'STREAM_EVENTS_FULFILLED';
export const UPDATE_EVENTS = 'UPDATE_EVENTS';

// action creators
export const fetchEvents = fromId => ({ type: FETCH_EVENTS, payload: { fromId } });

export const fetchEventsFulfilled = events => ({
  type: FETCH_EVENTS_FULFILLED,
  payload: { events },
});

export const streamEventsFulfilled = events => ({
  type: STREAM_EVENTS_FULFILLED,
  payload: { events },
});

export const updateEvents = () => ({ type: UPDATE_EVENTS, [SCROLL]: 'top' });
