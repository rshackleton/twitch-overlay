import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import donations from './donations';
import events from './events';

export default combineReducers({
  router: routerReducer,
  donations,
  events,
});
