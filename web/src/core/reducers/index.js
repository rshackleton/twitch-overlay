import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import donations from './donations';

export default combineReducers({
  router: routerReducer,
  donations,
});
