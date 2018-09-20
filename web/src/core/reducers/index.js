import { combineReducers } from 'redux';

import donations from './donations';
import events from './events';

export default combineReducers({
  donations,
  events,
});
