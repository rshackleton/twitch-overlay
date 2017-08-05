import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';

import history from './history';
import rootEpic from './epics';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(
    createLogger(),
    createEpicMiddleware(rootEpic),
    routerMiddleware(history),
  ),
);

export default store;
