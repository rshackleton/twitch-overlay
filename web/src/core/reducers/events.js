import { FETCH_EVENTS_FULFILLED, STREAM_EVENTS_FULFILLED, SHOW_NEW_EVENT } from 'actions';

const initialState = {
  items: [],
  latest: null,
  new: null,
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_FULFILLED:
    case STREAM_EVENTS_FULFILLED: {
      const items = [...state.items, ...action.payload.events];
      return {
        ...state,
        items,
        latest: items[0],
      };
    }
    case SHOW_NEW_EVENT: {
      return {
        ...state,
        new: action.payload.event ? action.payload.event : null,
      };
    }
    default: {
      return state;
    }
  }
};

export default events;
