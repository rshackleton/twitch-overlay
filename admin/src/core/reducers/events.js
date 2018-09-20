import { FETCH_EVENTS_FULFILLED, STREAM_EVENTS_FULFILLED, UPDATE_EVENTS } from 'actions';

const initialState = {
  items: [],
  newItems: [],
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_FULFILLED: {
      const items = [...state.items, ...action.payload.events];
      return {
        ...state,
        items,
      };
    }
    case STREAM_EVENTS_FULFILLED: {
      const newItems = [...state.newItems, ...action.payload.events];
      return {
        ...state,
        newItems,
      };
    }
    case UPDATE_EVENTS: {
      const items = [...state.items, ...state.newItems];
      return {
        ...state,
        items,
        newItems: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default events;
